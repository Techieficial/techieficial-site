-- Techieficial: leads log, client portal and audit log (BUILD_PLAN_V3 Phase 6, PRD F17).
-- Row-level security is on for every table. The service role (used only by the API on the
-- server) bypasses it; anon and authenticated users only get what the policies below allow.

-- gen_random_uuid() is built into Postgres 13 and later; no extension needed.

-- ---------------------------------------------------------------------------
-- Clients (the businesses we build for)
-- ---------------------------------------------------------------------------
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 1 and 200),
  website text,
  country text,
  crm_contact_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Portal users: one profile per auth user, with a role
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'staff', 'admin')),
  client_id uuid references public.clients (id) on delete set null,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index profiles_client_id_idx on public.profiles (client_id);

-- ---------------------------------------------------------------------------
-- Client projects, files and support tickets
-- ---------------------------------------------------------------------------
create table public.client_projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  name text not null check (length(name) between 1 and 200),
  offer_slug text,
  status text not null default 'kickoff' check (status in ('kickoff', 'build', 'review', 'live', 'operate')),
  summary text,
  started_on date,
  live_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index client_projects_client_id_idx on public.client_projects (client_id);

-- Files live in Supabase Storage (bucket "project-files", set up in B4); this table keeps the path only.
create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects (id) on delete cascade,
  storage_path text not null unique check (storage_path !~ '\.\.'),
  file_name text not null,
  content_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  uploaded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index project_files_project_id_idx on public.project_files (project_id);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  project_id uuid references public.client_projects (id) on delete set null,
  created_by uuid not null references auth.users (id) on delete cascade,
  subject text not null check (length(subject) between 1 and 160),
  body text not null check (length(body) between 1 and 5000),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'waiting', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index support_tickets_client_id_idx on public.support_tickets (client_id);

-- ---------------------------------------------------------------------------
-- Leads log: the exact CRM payload keys (docs/CRM_SETUP.md section 3) plus sync status
-- ---------------------------------------------------------------------------
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null default '',
  last_name text not null default '',
  email text not null check (length(email) between 3 and 254),
  phone text not null default '',
  company_name text not null default '',
  source text not null,
  tag text not null check (tag in ('booked-call', 'contact-form', 'demo-callme', 'test-build', 'newsletter', 'academy-waitlist', 'agency-partner', 'engine-builder', 'audit', 'calculator', 'founding-client')),
  business_type text not null default '',
  business_size text not null default '',
  main_goal text not null default '',
  budget_range text not null default '',
  message text not null default '',
  product_interest text not null default '',
  selected_services text not null default '',
  sms_consent boolean not null default false,
  page_url text not null default '',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  utm_content text not null default '',
  utm_term text not null default '',
  crm_sync_status text not null default 'pending' check (crm_sync_status in ('pending', 'sent', 'failed', 'skipped')),
  crm_synced_at timestamptz,
  crm_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_created_at_idx on public.leads (created_at desc);
create index leads_email_idx on public.leads (lower(email));
create index leads_sync_idx on public.leads (crm_sync_status) where crm_sync_status in ('pending', 'failed');

-- ---------------------------------------------------------------------------
-- Audit log: append only, for everyone
-- ---------------------------------------------------------------------------
create table public.audit_logs (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  actor uuid,
  actor_role text,
  action text not null,
  table_name text not null,
  record_id text,
  before jsonb,
  after jsonb
);
create index audit_logs_record_idx on public.audit_logs (table_name, record_id);
create index audit_logs_occurred_at_idx on public.audit_logs (occurred_at desc);

-- ---------------------------------------------------------------------------
-- Helpers used by the policies. SECURITY DEFINER so they can read profiles without
-- triggering profiles' own policies (no recursion). search_path is pinned.
-- ---------------------------------------------------------------------------
create function public.current_app_role() returns text
language sql stable security definer set search_path = public, pg_temp as $$
  select role from public.profiles where id = auth.uid()
$$;

create function public.current_client_id() returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select client_id from public.profiles where id = auth.uid()
$$;

create function public.is_staff() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select coalesce(public.current_app_role() in ('staff', 'admin'), false)
$$;

create function public.is_admin() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select coalesce(public.current_app_role() = 'admin', false)
$$;

revoke all on function public.current_app_role(), public.current_client_id(), public.is_staff(), public.is_admin() from public;
grant execute on function public.current_app_role(), public.current_client_id(), public.is_staff(), public.is_admin() to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Triggers: updated_at, new-user profile, profile guard, audit
-- ---------------------------------------------------------------------------
create function public.set_updated_at() returns trigger
language plpgsql set search_path = public, pg_temp as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger clients_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger client_projects_updated_at before update on public.client_projects for each row execute function public.set_updated_at();
create trigger project_files_updated_at before update on public.project_files for each row execute function public.set_updated_at();
create trigger support_tickets_updated_at before update on public.support_tickets for each row execute function public.set_updated_at();
create trigger leads_updated_at before update on public.leads for each row execute function public.set_updated_at();

-- Every new auth user gets a client profile with no business linked; staff link it.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Only admins (or the service role) may change a role or the linked client.
create function public.guard_profile_changes() returns trigger
language plpgsql set search_path = public, pg_temp as $$
begin
  if (new.role is distinct from old.role or new.client_id is distinct from old.client_id)
     and current_user not in ('service_role', 'postgres', 'supabase_admin')
     and not public.is_admin() then
    raise exception 'only an admin can change role or client' using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger profiles_guard before update on public.profiles for each row execute function public.guard_profile_changes();

-- Writes one audit row per insert, update or delete. Runs as the table owner, so the row is
-- written even though nobody else may insert into audit_logs.
create function public.audit_row_change() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  rec jsonb := case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;
begin
  insert into public.audit_logs (actor, actor_role, action, table_name, record_id, before, after)
  values (
    auth.uid(),
    -- Inside SECURITY DEFINER current_user is the owner, so read the caller's role setting instead.
    coalesce(public.current_app_role(), nullif(current_setting('role', true), 'none'), session_user),
    lower(tg_op),
    tg_table_name,
    rec ->> 'id',
    case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) end,
    case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) end
  );
  return null;
end;
$$;

create trigger clients_audit after insert or update or delete on public.clients for each row execute function public.audit_row_change();
create trigger profiles_audit after insert or update or delete on public.profiles for each row execute function public.audit_row_change();
create trigger client_projects_audit after insert or update or delete on public.client_projects for each row execute function public.audit_row_change();
create trigger project_files_audit after insert or update or delete on public.project_files for each row execute function public.audit_row_change();
create trigger support_tickets_audit after insert or update or delete on public.support_tickets for each row execute function public.audit_row_change();
create trigger leads_audit after insert or update or delete on public.leads for each row execute function public.audit_row_change();

-- Belt and braces: the audit log refuses updates and deletes even from the owner or service role.
create function public.audit_logs_append_only() returns trigger
language plpgsql set search_path = public, pg_temp as $$
begin
  raise exception 'audit_logs is append only' using errcode = '42501';
end;
$$;

create trigger audit_logs_no_update before update or delete on public.audit_logs for each row execute function public.audit_logs_append_only();
create trigger audit_logs_no_truncate before truncate on public.audit_logs for each statement execute function public.audit_logs_append_only();

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.clients enable row level security;
alter table public.profiles enable row level security;
alter table public.client_projects enable row level security;
alter table public.project_files enable row level security;
alter table public.support_tickets enable row level security;
alter table public.leads enable row level security;
alter table public.audit_logs enable row level security;

-- Nothing is readable without signing in.
revoke all on public.clients, public.profiles, public.client_projects, public.project_files, public.support_tickets, public.leads, public.audit_logs from anon;

-- clients
create policy "clients: members read their own business" on public.clients
  for select to authenticated using (id = public.current_client_id() or public.is_staff());
create policy "clients: staff add" on public.clients
  for insert to authenticated with check (public.is_staff());
create policy "clients: staff edit" on public.clients
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "clients: admins delete" on public.clients
  for delete to authenticated using (public.is_admin());

-- profiles
create policy "profiles: read own, staff read all" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_staff());
create policy "profiles: edit own name, admins edit all" on public.profiles
  for update to authenticated using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy "profiles: admins delete" on public.profiles
  for delete to authenticated using (public.is_admin());

-- client_projects
create policy "projects: members read their business's projects" on public.client_projects
  for select to authenticated using (client_id = public.current_client_id() or public.is_staff());
create policy "projects: staff add" on public.client_projects
  for insert to authenticated with check (public.is_staff());
create policy "projects: staff edit" on public.client_projects
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "projects: admins delete" on public.client_projects
  for delete to authenticated using (public.is_admin());

-- project_files
create policy "files: members read their business's files" on public.project_files
  for select to authenticated using (
    public.is_staff()
    or exists (select 1 from public.client_projects p where p.id = project_id and p.client_id = public.current_client_id())
  );
create policy "files: staff add" on public.project_files
  for insert to authenticated with check (public.is_staff());
create policy "files: staff edit" on public.project_files
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "files: staff delete" on public.project_files
  for delete to authenticated using (public.is_staff());

-- support_tickets
create policy "tickets: members read their business's tickets" on public.support_tickets
  for select to authenticated using (client_id = public.current_client_id() or public.is_staff());
create policy "tickets: members open tickets for their business" on public.support_tickets
  for insert to authenticated with check (
    created_by = auth.uid()
    and status = 'open'
    and (client_id = public.current_client_id() or public.is_staff())
    and (project_id is null or exists (select 1 from public.client_projects p where p.id = project_id and p.client_id = support_tickets.client_id))
  );
create policy "tickets: staff edit" on public.support_tickets
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "tickets: admins delete" on public.support_tickets
  for delete to authenticated using (public.is_admin());

-- leads: written by the API with the service role only; staff can read them (Phase 7 leads view).
revoke insert, update, delete, truncate on public.leads from authenticated;
create policy "leads: staff read" on public.leads
  for select to authenticated using (public.is_staff());

-- audit_logs: written by triggers and the service role; admins read; nobody updates or deletes.
revoke all on public.audit_logs from authenticated, service_role;
grant select on public.audit_logs to authenticated;
grant select, insert on public.audit_logs to service_role;
create policy "audit: admins read" on public.audit_logs
  for select to authenticated using (public.is_admin());
