-- Naser Demiraj portfolio — database schema
-- Run this in the Supabase Dashboard > SQL Editor.

-- ============================================================
--  PROJECTS
-- ============================================================
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text unique not null,
  description   text,
  content       text,
  tech_stack    text[] default '{}',
  image_url     text,
  live_url      text,
  repo_url      text,
  featured      boolean default false,
  sort_order    integer default 0,
  published     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists projects_published_idx on public.projects (published);
create index if not exists projects_featured_idx  on public.projects (featured);

-- ============================================================
--  BLOG POSTS
-- ============================================================
create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text unique not null,
  excerpt       text,
  content       text,
  cover_image   text,
  tags          text[] default '{}',
  published     boolean default false,
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists blog_published_idx on public.blog_posts (published, published_at desc);

-- ============================================================
--  CONTACT MESSAGES
-- ============================================================
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  read        boolean default false,
  ip_address  text,
  created_at  timestamptz default now()
);

create index if not exists contact_created_idx on public.contact_messages (created_at desc);

-- ============================================================
--  updated_at trigger
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists blog_updated_at on public.blog_posts;
create trigger blog_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ============================================================
--  Row Level Security
--  The backend uses the SERVICE ROLE key, which bypasses RLS.
--  We still enable RLS so that the public/anon key cannot read
--  contact messages or unpublished content directly.
-- ============================================================
alter table public.projects         enable row level security;
alter table public.blog_posts       enable row level security;
alter table public.contact_messages enable row level security;

-- Allow anonymous clients to read ONLY published content (optional,
-- in case you ever query Supabase directly from the frontend).
drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects"
  on public.projects for select
  using (published = true);

drop policy if exists "public read published posts" on public.blog_posts;
create policy "public read published posts"
  on public.blog_posts for select
  using (published = true);

-- contact_messages: no anon policies => anon cannot read/write directly.
-- All contact writes go through the backend (service role).
