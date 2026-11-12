# Database

Run migrations in filename order in Supabase SQL Editor. Tables are normalized around profile, projects/images, skill categories/skills, education, experience, certifications, services, blog taxonomy/posts, testimonials, contact messages, resume/media, settings, analytics and admin audit logs.

Review and apply `database/policies/001_rls.sql`. Public read policies are limited to portfolio content; private contact, resume, media and admin tables have no public policies. Extend policies and backend authorization together when implementing CRUD.
