-- Recreate public.contest_submissions for the 2027 contest file-submission flow.
-- This SQL is a draft for manual execution by the operator in Supabase SQL Editor.
-- It intentionally removes existing contest_submissions rows.
-- It does not touch auth.users or other Supabase auth tables.
--
-- Important:
-- - This script does NOT use drop table ... cascade.
-- - It only drops/recreates public.contest_submissions.
-- - Authenticated users can insert/read only their own submissions.
-- - Authenticated users cannot update submissions after insert.
-- - Email result updates, if needed, should be handled by a server-only service role client
--   or skipped/logged server-side.

begin;

create extension if not exists "pgcrypto";

drop table if exists public.contest_submissions;

create table public.contest_submissions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users(id) on delete cascade,
  user_email text not null,

  contest_year integer not null default 2027,

  category text not null,
  work_title text not null,
  pen_name text not null,
  reference_link text,

  file_bucket text not null default 'contest-submissions',
  file_path text not null,
  original_file_name text not null,
  file_size_bytes bigint not null,
  file_mime_type text,

  consent_original boolean not null default false,
  consent_no_infringement boolean not null default false,
  consent_publication boolean not null default false,

  submitted_at timestamp with time zone not null default now(),

  status text not null default 'submitted',

  email_sent_at timestamp with time zone,
  email_error text,

  constraint contest_submissions_category_check
    check (category in ('novel', 'poetry', 'essay')),

  constraint contest_submissions_status_check
    check (status in ('submitted', 'reviewed', 'selected', 'not_selected')),

  constraint contest_submissions_file_size_check
    check (file_size_bytes <= 5242880),

  constraint contest_submissions_contest_year_check
    check (contest_year = 2027),

  constraint contest_submissions_file_bucket_check
    check (file_bucket = 'contest-submissions'),

  constraint contest_submissions_consents_check
    check (
      consent_original = true
      and consent_no_infringement = true
      and consent_publication = true
    )
);

create index contest_submissions_user_id_idx
on public.contest_submissions using btree (user_id);

create index contest_submissions_contest_year_idx
on public.contest_submissions using btree (contest_year);

create index contest_submissions_contest_year_category_idx
on public.contest_submissions using btree (contest_year, category);

create index contest_submissions_submitted_at_idx
on public.contest_submissions using btree (submitted_at);

alter table public.contest_submissions enable row level security;

-- Authenticated users can only insert and read their own submissions.
-- Do NOT grant update to authenticated users.
grant select, insert on table public.contest_submissions to authenticated;

create policy "Contest submitters can insert own submissions"
on public.contest_submissions
for insert
to authenticated
with check (user_id = auth.uid());

create policy "Contest submitters can read own submissions"
on public.contest_submissions
for select
to authenticated
using (user_id = auth.uid());

-- Service role clients bypass RLS and can read/update all rows.
-- Keep the service role key server-only; never expose it to client code
-- or NEXT_PUBLIC_* variables.

-- Storage bucket:
-- Create a private bucket named "contest-submissions" manually in Supabase Dashboard.
-- Codex must not execute bucket creation against production.
--
-- Reference SQL only:
--
-- insert into storage.buckets (id, name, public)
-- values ('contest-submissions', 'contest-submissions', false)
-- on conflict (id) do update set public = false;

drop policy if exists "Contest submitters can upload own files" on storage.objects;

create policy "Contest submitters can upload own files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'contest-submissions'
  and (storage.foldername(name))[1] = '2027'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "Contest submitters can read own files" on storage.objects;

create policy "Contest submitters can read own files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'contest-submissions'
  and (storage.foldername(name))[1] = '2027'
  and (storage.foldername(name))[2] = auth.uid()::text
);

commit;