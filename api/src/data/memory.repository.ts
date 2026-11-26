import { randomUUID } from "node:crypto";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import type {
  AuthUser,
  CrmPayload,
  CrmSyncStatus,
  LeadsRepository,
  NewTicket,
  PortalRepository,
  Profile,
  Project,
  StoredLead,
  Ticket,
} from "./types.js";

/**
 * In-memory store used when SUPABASE_URL is not set (local development and tests).
 * It starts empty and mirrors the row-level security rules in supabase/migrations:
 * clients see only their own client's rows, staff and admin see everything.
 * Data is lost when the process stops.
 */
export class MemoryStore implements LeadsRepository, PortalRepository {
  readonly leads: StoredLead[] = [];
  readonly profiles = new Map<string, Profile>();
  readonly projects: Project[] = [];
  readonly tickets: Ticket[] = [];

  async create(payload: CrmPayload, status: CrmSyncStatus) {
    const id = randomUUID();
    this.leads.push({ ...payload, id, crm_sync_status: status, crm_error: null, created_at: new Date().toISOString() });
    return id;
  }

  async setSyncStatus(id: string, status: CrmSyncStatus, error?: string) {
    const lead = this.leads.find((row) => row.id === id);
    if (lead) Object.assign(lead, { crm_sync_status: status, crm_error: error ?? null });
  }

  private visible(user: AuthUser) {
    const profile = this.profiles.get(user.id);
    if (!profile) return () => false;
    if (profile.role === "staff" || profile.role === "admin") return () => true;
    return (row: { clientId: string }) => row.clientId === profile.clientId;
  }

  async listProjects(user: AuthUser) {
    return this.projects.filter(this.visible(user));
  }

  async getProject(user: AuthUser, id: string) {
    return this.projects.filter(this.visible(user)).find((project) => project.id === id) ?? null;
  }

  async createTicket(user: AuthUser, input: NewTicket) {
    const profile = this.profiles.get(user.id);
    if (!profile) throw new ForbiddenException("No portal profile for this account");
    let clientId = profile.clientId;
    if (input.projectId) {
      const project = await this.getProject(user, input.projectId);
      if (!project) throw new NotFoundException("Project not found");
      clientId = project.clientId;
    }
    if (!clientId) throw new ForbiddenException("This account is not linked to a client");
    const ticket: Ticket = {
      id: randomUUID(),
      clientId,
      projectId: input.projectId ?? null,
      createdBy: user.id,
      subject: input.subject,
      body: input.body,
      priority: input.priority ?? "normal",
      status: "open",
      createdAt: new Date().toISOString(),
    };
    this.tickets.push(ticket);
    return ticket;
  }
}
