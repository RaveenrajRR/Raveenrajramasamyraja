# API Reference

Base path `/api`; JSON responses use `{ data }` or `{ message }`.

## Public
- `GET /health`
- `GET /profile`
- `GET /projects`
- `GET /public/projects|skills|services|experience|certifications|testimonials|blog`
- `GET /public/project/:slug`
- `GET /public/article/:slug`
- `POST /contact`

## Admin
All `/admin/*` routes require `Authorization: Bearer <Supabase access token>` and a matching active row in `admin_users`.
- `GET /admin/resources/:name`
- `POST /admin/resources/:name`
- `PATCH /admin/resources/:name/:id`
- `DELETE /admin/resources/:name/:id`

Core resources: projects, skills, experience, education, certifications, services, blog, testimonials, profile, settings, SEO. Contact enquiries, media and resume are list-only. API validation is server-side; do not trust client-side role flags.
