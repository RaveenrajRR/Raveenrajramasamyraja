# Deployment

## Supabase
Create project; apply migrations in order; apply RLS policies; create Auth owner user; add UUID to `admin_users`.

## Backend
Deploy `backend/` as Node service. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `FRONTEND_ORIGIN`, `NODE_ENV=production`, `PORT`. Keep secrets in host secret manager.

## Frontend
Deploy `frontend/` to Vercel. Set `VITE_API_BASE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Add SPA fallback rewrite for React Router. Configure the exact production frontend origin in backend CORS.

## Before public launch
Implement and verify Resend email, private resume/media storage and signed downloads, sitemap/canonical host, privacy policy review, analytics consent/retention, end-to-end tests, error monitoring and Lighthouse audits.
