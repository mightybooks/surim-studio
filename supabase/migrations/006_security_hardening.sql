begin;

-- Payment webhook payloads and event ids are service-role only.
alter table if exists public.payment_webhooks add column if not exists provider_event_id text;
alter table if exists public.payment_webhooks add column if not exists payload_hash text;
alter table if exists public.payment_webhooks add column if not exists processed_at timestamptz;
create unique index if not exists payment_webhooks_provider_event_id_uidx
  on public.payment_webhooks (provider, provider_event_id);
alter table if exists public.payment_webhooks enable row level security;
revoke all privileges on table public.payment_webhooks from anon, authenticated;

-- Users can create and read their own orders, but cannot directly mutate payment,
-- amount, shipping, or status columns. Server routes perform privileged transitions.
alter table if exists public.orders enable row level security;
revoke all privileges on table public.orders from anon, authenticated;
grant select on table public.orders to authenticated;
drop policy if exists "Users can read own orders" on public.orders;
create policy "Users can read own orders" on public.orders
  for select to authenticated using (user_id = (select auth.uid()));

alter table if exists public.profiles enable row level security;
revoke all privileges on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant insert (id, email, display_name, avatar_url) on table public.profiles to authenticated;
grant update (email, display_name, avatar_url) on table public.profiles to authenticated;
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
drop policy if exists "Users can create own profile" on public.profiles;
create policy "Users can create own profile" on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

alter table if exists public.admins enable row level security;
revoke all privileges on table public.admins from anon, authenticated;
grant select on table public.admins to authenticated;
drop policy if exists "Admins can read own admin row" on public.admins;
create policy "Admins can read own admin row" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

alter table if exists public.contest_submissions enable row level security;
revoke all privileges on table public.contest_submissions from anon, authenticated;
grant select on table public.contest_submissions to authenticated;
drop policy if exists "Contest submitters can insert own submissions" on public.contest_submissions;
drop policy if exists "Contest submitters can read own submissions" on public.contest_submissions;
create policy "Contest submitters can read own submissions" on public.contest_submissions
  for select to authenticated using (user_id = (select auth.uid()));

-- Persistent, atomic rate-limit buckets. Only the service role can execute the function.
create table if not exists public.security_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0)
);
alter table public.security_rate_limits enable row level security;
revoke all privileges on table public.security_rate_limits from public, anon, authenticated;

create or replace function public.consume_security_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  current_count integer;
begin
  if length(p_key) <> 64 or p_limit < 1 or p_limit > 1000
     or p_window_seconds < 1 or p_window_seconds > 86400 then
    raise exception 'invalid rate limit parameters';
  end if;

  insert into public.security_rate_limits as limits (key_hash, window_started_at, request_count)
  values (p_key, clock_timestamp(), 1)
  on conflict (key_hash) do update
  set request_count = case
        when limits.window_started_at <= clock_timestamp() - make_interval(secs => p_window_seconds)
          then 1 else limits.request_count + 1 end,
      window_started_at = case
        when limits.window_started_at <= clock_timestamp() - make_interval(secs => p_window_seconds)
          then clock_timestamp() else limits.window_started_at end
  returning request_count into current_count;

  return current_count <= p_limit;
end;
$$;
revoke all on function public.consume_security_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_security_rate_limit(text, integer, integer) to service_role;

commit;
