begin;

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  content_markdown text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_posts_status_published_at_idx
on public.news_posts (status, published_at desc);

alter table public.news_posts enable row level security;

revoke insert, update, delete, truncate on table public.news_posts from anon, authenticated;
grant select on table public.news_posts to anon, authenticated;

drop policy if exists "Public can read published news posts" on public.news_posts;
create policy "Public can read published news posts"
on public.news_posts
for select
to anon, authenticated
using (status = 'published');

commit;
