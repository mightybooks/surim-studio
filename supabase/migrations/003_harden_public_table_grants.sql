-- Harden public schema table access.
-- Run this in the Supabase SQL Editor or through your migration workflow.

begin;

alter table if exists public.debug_events enable row level security;
alter table if exists public.admins enable row level security;
alter table if exists public.blog_posts enable row level security;
alter table if exists public.fiction_500_archive enable row level security;
alter table if exists public.users enable row level security;

revoke all privileges on table public.debug_events from anon, authenticated;
revoke all privileges on table public.admins from anon, authenticated;
revoke all privileges on table public.users from anon, authenticated;
grant select on table public.admins to authenticated;

revoke insert, update, delete, truncate on table public.blog_posts from anon, authenticated;
grant select on table public.blog_posts to anon, authenticated;

revoke insert, update, delete, truncate on table public.fiction_500_archive from anon, authenticated;
grant select on table public.fiction_500_archive to anon, authenticated;

revoke all privileges on table public.comments from anon, authenticated;
grant select on table public.comments to anon, authenticated;
grant insert, delete on table public.comments to authenticated;

revoke all privileges on table public.likes from anon, authenticated;
grant select on table public.likes to anon, authenticated;
grant insert, delete on table public.likes to authenticated;

revoke all privileges on table public.contest_submissions from anon, authenticated;
grant select, insert on table public.contest_submissions to authenticated;

revoke all privileges on table public.profiles from anon, authenticated;
grant select, insert, update on table public.profiles to authenticated;

drop policy if exists "Admins can read own admin row" on public.admins;
create policy "Admins can read own admin row"
on public.admins
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
on public.blog_posts
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read fiction 500 archive" on public.fiction_500_archive;
create policy "Public can read fiction 500 archive"
on public.fiction_500_archive
for select
to anon, authenticated
using (true);

commit;
