-- Read-only production audit. Expected healthy results are documented above each query.

-- Expected: every application table is returned with rowsecurity = true.
select n.nspname as schema_name, c.relname as table_name, c.relrowsecurity as rowsecurity
from pg_catalog.pg_class c
join pg_catalog.pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r'
order by c.relname;

-- Expected: no rows for admins, orders, payment_webhooks, contest_submissions,
-- profiles, security_rate_limits except explicitly intended grants described in migration 006.
select table_name, grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public' and grantee in ('anon', 'authenticated')
order by table_name, grantee, privilege_type;

-- Expected: policies restrict private rows to auth.uid(); published content may use true/status predicates.
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_catalog.pg_policies
where schemaname = 'public'
order by tablename, policyname;

-- Expected: every SECURITY DEFINER function has a fixed search_path and narrowly scoped EXECUTE grants.
select n.nspname as schema_name, p.proname, p.prosecdef, p.proconfig,
       pg_catalog.pg_get_function_identity_arguments(p.oid) as arguments
from pg_catalog.pg_proc p
join pg_catalog.pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.prosecdef
order by p.proname;

select routine_name, grantee, privilege_type
from information_schema.role_routine_grants
where routine_schema = 'public' and grantee in ('PUBLIC', 'anon', 'authenticated')
order by routine_name, grantee;

-- Expected: zero rows. Public-sensitive tables must not be exposed through anon grants.
select table_name, grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee = 'anon'
  and table_name in ('admins', 'orders', 'payment_webhooks', 'contest_submissions', 'profiles', 'security_rate_limits');
