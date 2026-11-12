create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects for each row execute function public.set_updated_at();
drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();
drop trigger if exists profile_set_updated_at on public.profile;
create trigger profile_set_updated_at before update on public.profile for each row execute function public.set_updated_at();

insert into public.profile(full_name,professional_title,education_summary)
select 'Raveen Raj','Full-Stack Developer','Information Technology Student'
where not exists(select 1 from public.profile);
insert into public.skill_categories(name,sort_order) values
('Frontend Development',1),('Backend Development',2),('Programming Languages',3),
('Database Technologies',4),('Development Tools',5),('Deployment & DevOps',6)
on conflict(name) do nothing;
