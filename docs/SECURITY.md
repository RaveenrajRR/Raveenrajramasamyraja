# Security checklist

- Admin uses Supabase Auth; API verifies access tokens and checks `admin_users`.
- Service-role key exists only in backend environment.
- Helmet, CORS allowlist, JSON body size limit and global/contact rate limits are enabled.
- Contact data is validated with Zod before database insertion.
- Public API exposes published projects/articles, active services, verified certifications and approved testimonials only.
- Public RLS has no write policies. Private contact/resume/media/admin tables have no anon read policies.
- Before production: configure HTTPS, strict CSP, CSRF strategy for any cookie-auth flow, upload signature/MIME verification, private storage buckets + signed URLs, password recovery, audit log coverage, retention policy and dependency scanning.
