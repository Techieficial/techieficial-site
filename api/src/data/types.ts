/** Shapes shared by the repositories. Column names match supabase/migrations. */

export const roles = ["client", "staff", "admin"] as const;
export type Role = (typeof roles)[number];

/** Delivery pipeline for a client build. */
export const projectStatuses = ["kickoff", "build", "review", "live", "operate"] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

export const ticketPriorities = ["low", "normal", "high", "urgent"] as const;
export type TicketPriority = (typeof ticketPriorities)[number];

export const crmSyncStatuses = ["pending", "sent", "failed", "skipped"] as const;
export type CrmSyncStatus = (typeof crmSyncStatuses)[number];

/** A signed-in portal user, taken from a verified access token. */
export type AuthUser = {
  id: string;
  email?: string;
  /** The raw access token, passed on to the database so row-level security applies. */
  token: string;
};

export type Profile = { id: string; role: Role; clientId: string | null; fullName?: string };

export type Project = {
  id: string;
  clientId: string;
  name: string;
  status: ProjectStatus;
  summary: string | null;
  startedOn: string | null;
  liveOn: string | null;
  updatedAt: string;
};

export type Ticket = {
  id: string;
  clientId: string;
  projectId: string | null;
  createdBy: string;
  subject: string;
  body: string;
  priority: TicketPriority;
  status: "open" | "in_progress" | "waiting" | "closed";
  createdAt: string;
};

export type NewTicket = { projectId?: string; subject: string; body: string; priority?: TicketPriority };

/** The flat CRM payload (docs/CRM_SETUP.md section 3). Every key is always present. */
export type CrmPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  source: string;
  tag: string;
  business_type: string;
  business_size: string;
  main_goal: string;
  budget_range: string;
  message: string;
  product_interest: string;
  selected_services: string;
  sms_consent: "true" | "false";
  page_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

export type StoredLead = CrmPayload & { id: string; crm_sync_status: CrmSyncStatus; crm_error: string | null; created_at: string };

export interface LeadsRepository {
  create(payload: CrmPayload, status: CrmSyncStatus): Promise<string>;
  setSyncStatus(id: string, status: CrmSyncStatus, error?: string): Promise<void>;
}

/**
 * Portal reads and writes always run as the signed-in user, so the database's row-level
 * security decides what they can see. The in-memory version applies the same rules.
 */
export interface PortalRepository {
  listProjects(user: AuthUser): Promise<Project[]>;
  getProject(user: AuthUser, id: string): Promise<Project | null>;
  createTicket(user: AuthUser, input: NewTicket): Promise<Ticket>;
}

export const LEADS_REPOSITORY = Symbol("LEADS_REPOSITORY");
export const PORTAL_REPOSITORY = Symbol("PORTAL_REPOSITORY");
