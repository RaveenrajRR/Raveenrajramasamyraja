-- Apply after reviewing. Backend uses the service role only on the server.
alter table public.admin_users enable row level security;
alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.skill_categories enable row level security;
alter table public.skills enable row level security;
alter table public.education enable row level security;
alter table public.experience enable row level security;
alter table public.certifications enable row level security;
alter table public.services enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_messages enable row level security;
alter table public.resume_files enable row level security;
alter table public.media_assets enable row level security;
alter table public.website_settings enable row level security;
alter table public.analytics_events enable row level security;
alter table public.admin_activity_logs enable row level security;

-- Public read access is limited to published/approved portfolio content.
create policy "public read profile" on public.profile for select to anon, authenticated using (true);
create policy "public read published projects" on public.projects for select to anon, authenticated using (published = true);
create policy "public read project images for published projects" on public.project_images for select to anon, authenticated using (exists(select 1 from public.projects p where p.id=project_id and p.published=true));
create policy "public read skills" on public.skills for select to anon, authenticated using (true);
create policy "public read skill categories" on public.skill_categories for select to anon, authenticated using (true);
create policy "public read education" on public.education for select to anon, authenticated using (true);
create policy "public read experience" on public.experience for select to anon, authenticated using (true);
create policy "public read verified certifications" on public.certifications for select to anon, authenticated using (verified=true);
create policy "public read active services" on public.services for select to anon, authenticated using (active=true);
create policy "public read published blog posts" on public.blog_posts for select to anon, authenticated using (status='published');
create policy "public read blog categories" on public.blog_categories for select to anon, authenticated using (true);
create policy "public read blog tags" on public.blog_tags for select to anon, authenticated using (true);
create policy "public read approved testimonials" on public.testimonials for select to anon, authenticated using (approved=true);

-- No public insert/select policies for contact messages, resumes, media, admin users/logs or analytics.
-- Admin mutations are performed through the authenticated backend after server-side role checks.
