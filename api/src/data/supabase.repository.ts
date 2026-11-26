import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AppConfig } from "../config/env.js";
import type { AuthUser, CrmPayload, CrmSyncStatus, LeadsRepository, NewTicket, PortalRepository, Project, Ticket } from "./types.js";

type ProjectRow = {
  id: string;
  client_id: string;
  name: string;
  status: Project["status"];
  summary: string | null;
  started_on: string | null;
  live_on: string | null;
  updated_at: string;
};

type TicketRow = {
  id: string;
  client_id: string;
  project_id: string | null;
  created_by: string;
  subject: string;
  body: string;
  priority: Ticket["priority"];
  status: Ticket["status"];
  created_at: string;
};

const toProject = (row: ProjectRow): Project => ({
  id: row.id,
  clientId: row.client_id,
  name: row.name,
  status: row.status,
  summary: row.summary,
  startedOn: row.started_on,
  liveOn: row.live_on,
  updatedAt: row.updated_at,
});

const toTicket = (row: TicketRow): Ticket => ({
  id: row.id,
  clientId: row.client_id,
  projectId: row.project_id,
  createdBy: row.created_by,
  subject: row.subject,
  body: row.body,
  priority: row.priority,
  status: row.status,
  createdAt: row.created_at,
});

const projectColumns = "id, client_id, name, status, summary, started_on, live_on, updated_at";

/**
 * Supabase-backed repositories, used when SUPABASE_URL is set.
 * Leads are written with the service role key (the only role allowed to insert them).
 * Portal calls use the anon key plus the user's own token, so row-level security applies.
 */
export class SupabaseStore implements LeadsRepository, PortalRepository {
  private readonly service: SupabaseClient;

  constructor(private readonly config: AppConfig) {
    this.service = createClient(config.SUPABASE_URL!, config.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
  }

  private asUser(user: AuthUser) {
    return createClient(this.config.SUPABASE_URL!, this.config.SUPABASE_ANON_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${user.token}` } },
    });
  }

  async create(payload: CrmPayload, status: CrmSyncStatus) {
    const { data, error } = await this.service
      .from("leads")
      .insert({ ...payload, sms_consent: payload.sms_consent === "true", crm_sync_status: status })
      .select("id")
      .single();
    if (error) throw new Error(`Could not store lead: ${error.message}`);
    return (data as { id: string }).id;
  }

  async setSyncStatus(id: string, status: CrmSyncStatus, crmError?: string) {
    const { error } = await this.service
      .from("leads")
      .update({ crm_sync_status: status, crm_error: crmError ?? null, crm_synced_at: status === "sent" ? new Date().toISOString() : null })
      .eq("id", id);
    if (error) throw new Error(`Could not update lead: ${error.message}`);
  }

  async listProjects(user: AuthUser) {
    const { data, error } = await this.asUser(user).from("client_projects").select(projectColumns).order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as ProjectRow[]).map(toProject);
  }

  async getProject(user: AuthUser, id: string) {
    const { data, error } = await this.asUser(user).from("client_projects").select(projectColumns).eq("id", id).maybeSingle();
    if (error) throw new Error(error.message);
    return data ? toProject(data as ProjectRow) : null;
  }

  async createTicket(user: AuthUser, input: NewTicket) {
    const db = this.asUser(user);
    let clientId: string | null;
    if (input.projectId) {
      const project = await this.getProject(user, input.projectId);
      if (!project) throw new NotFoundException("Project not found");
      clientId = project.clientId;
    } else {
      const { data } = await db.from("profiles").select("client_id").eq("id", user.id).maybeSingle();
      clientId = (data as { client_id: string | null } | null)?.client_id ?? null;
    }
    if (!clientId) throw new ForbiddenException("This account is not linked to a client");
    const { data, error } = await db
      .from("support_tickets")
      .insert({ client_id: clientId, project_id: input.projectId ?? null, created_by: user.id, subject: input.subject, body: input.body, priority: input.priority ?? "normal" })
      .select("id, client_id, project_id, created_by, subject, body, priority, status, created_at")
      .single();
    if (error) throw new ForbiddenException("Ticket was not accepted");
    return toTicket(data as TicketRow);
  }
}
