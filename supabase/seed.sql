-- Local test data only. Every record is fictional and clearly named as a test.
-- Runs after the migrations on `supabase db reset`. Never run against production.
-- These auth users have no password; to sign in locally, set one in the local Studio
-- (Authentication > Users) or create your own user there.

insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-4000-8000-0000000000a1', 'test-admin@techieficial.test', '{"full_name": "Test Admin"}'),
  ('00000000-0000-4000-8000-0000000000a2', 'test-client-a@techieficial.test', '{"full_name": "Test Client User A"}'),
  ('00000000-0000-4000-8000-0000000000a3', 'test-client-b@techieficial.test', '{"full_name": "Test Client User B"}');

insert into public.clients (id, name, country) values
  ('00000000-0000-4000-8000-0000000000c1', 'Test Client A (fictional)', 'Test'),
  ('00000000-0000-4000-8000-0000000000c2', 'Test Client B (fictional)', 'Test');

-- Profiles are created by the on_auth_user_created trigger; link them here.
update public.profiles set role = 'admin' where id = '00000000-0000-4000-8000-0000000000a1';
update public.profiles set client_id = '00000000-0000-4000-8000-0000000000c1' where id = '00000000-0000-4000-8000-0000000000a2';
update public.profiles set client_id = '00000000-0000-4000-8000-0000000000c2' where id = '00000000-0000-4000-8000-0000000000a3';

insert into public.client_projects (id, client_id, name, status, summary) values
  ('00000000-0000-4000-8000-0000000000d1', '00000000-0000-4000-8000-0000000000c1', 'Test Project A', 'build', 'Fictional project for local testing.'),
  ('00000000-0000-4000-8000-0000000000d2', '00000000-0000-4000-8000-0000000000c2', 'Test Project B', 'kickoff', 'Fictional project for local testing.');

insert into public.project_files (project_id, storage_path, file_name, content_type, size_bytes) values
  ('00000000-0000-4000-8000-0000000000d1', 'test-client-a/test-project-a/test-file.txt', 'test-file.txt', 'text/plain', 12);

insert into public.leads (first_name, last_name, email, source, tag, crm_sync_status) values
  ('Test', 'Lead', 'test-lead@techieficial.test', 'contact-form', 'contact-form', 'skipped');
