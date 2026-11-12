# Raveen Raj — Full-Stack Developer Portfolio

Modular React + Vite portfolio with an Express API, Supabase PostgreSQL schema, Supabase Auth-based admin login, content management endpoints, enquiry storage and a lazy-loaded React Three Fiber hero scene.

## Structure
- `frontend/src/pages/public/` — each public route has its own JSX and CSS file.
- `frontend/src/pages/admin/` — each admin route has its own JSX and CSS file.
- `frontend/src/components/` — reusable layout, navigation, 3D and admin components.
- `backend/src/` — Express routes, controllers, middleware, validation and Supabase config.
- `database/` — ordered SQL migrations and RLS policies.
- `docs/` — architecture, API, database, security and deployment guides.

## Local setup
1. Install Node.js 20 or newer.
2. Create a Supabase project.
3. Apply `database/migrations/001_initial_schema.sql`, then `002_updated_at_and_seed.sql`.
4. Review and apply `database/policies/001_rls.sql` and `002_admin_policies.sql`.
5. Copy `frontend/.env.example` to `frontend/.env`; copy `backend/.env.example` to `backend/.env`.
6. Fill Supabase URL + anon key in frontend env, and URL + service role key in backend env.
7. In Supabase Auth, create the owner account. Insert the Auth user UUID into `admin_users`:
   ```sql
   insert into public.admin_users(user_id, role, active)
   values ('YOUR_AUTH_USER_UUID','owner',true);
   ```
8. Start backend: `cd backend && npm install && npm run dev`.
9. Start frontend: `cd frontend && npm install && npm run dev`.

Open `http://localhost:5173`. Admin: `/admin/login`.

## Important
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in a `VITE_` variable.
- Contact enquiries are persisted in Supabase. Email delivery requires configuring Resend and implementing/activating the provider integration; the API does not falsely claim an email was sent.
- Admin CRUD is available for the core text resources. Enquiries, media and resume are read-only in this build; secure file upload, storage bucket policies, resume download tracking and email delivery remain integration tasks.
- Do not publish invented achievements, testimonials, experience or certificates. Add only owner-verified information.
- Run a production build and test against your own Supabase project before deploying.
