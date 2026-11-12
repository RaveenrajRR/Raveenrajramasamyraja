create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','admin','editor')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Raveen Raj',
  professional_title text not null default 'Full-Stack Developer',
  biography text not null default '',
  education_summary text not null default 'Information Technology Student',
  profile_image_url text,
  email text,
  location text,
  github_url text,
  linkedin_url text,
  instagram_url text,
  availability_status text not null default 'open',
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  full_description text not null default '',
  category text not null default 'Web Development',
  cover_image_url text,
  technologies text[] not null default '{}',
  github_url text,
  live_demo_url text,
  status text not null default 'in_progress',
  featured boolean not null default false,
  published boolean not null default false,
  start_date date,
  completion_date date,
  challenges text,
  solutions text,
  key_features text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists projects_published_featured_idx on public.projects(published,featured);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order integer not null default 0
);

create table if not exists public.skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0
);
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.skill_categories(id) on delete set null,
  name text not null,
  description text not null default '',
  learning_status text not null default 'learning' check (learning_status in ('learning','practicing','used_in_project')),
  experience_level text not null default 'beginner' check (experience_level in ('beginner','intermediate','advanced')),
  logo_url text,
  sort_order integer not null default 0
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  qualification text not null,
  field_of_study text,
  start_date date,
  end_date date,
  description text,
  sort_order integer not null default 0
);
create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  organization text not null,
  employment_type text,
  start_date date,
  end_date date,
  description text,
  sort_order integer not null default 0
);
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  issue_date date,
  credential_url text,
  credential_id text,
  verified boolean not null default false
);
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  technologies text[] not null default '{}',
  active boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  featured_image_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);
create table if not exists public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  primary key(post_id,tag_id)
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  person_name text not null,
  role_or_company text,
  content text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  category text not null,
  budget text not null default '',
  message text not null,
  status text not null default 'unread' check (status in ('unread','read','replied','archived')),
  created_at timestamptz not null default now()
);
create table if not exists public.resume_files (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  version_label text not null,
  published boolean not null default false,
  uploaded_at timestamptz not null default now()
);
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null check(size_bytes > 0),
  created_at timestamptz not null default now()
);
create table if not exists public.website_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  project_id uuid references public.projects(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists analytics_events_created_at_idx on public.analytics_events(created_at);
create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references public.admin_users(user_id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
