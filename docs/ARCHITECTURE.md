# Architecture

- `frontend/`: React SPA, independently routed public/admin pages, shared layout/components, API/auth services.
- `backend/`: Express REST API, validation, rate limiting, Supabase access and admin authorization.
- `database/`: PostgreSQL migrations and RLS policies.
- `docs/`: setup, API, schema, deployment and security notes.

Request flow: Browser → React Router page → API service → Express route → Zod validation/auth middleware → Supabase PostgreSQL.

Admin authentication uses Supabase Auth. The frontend session token must be sent as a Bearer token for admin API calls (the initial API helper will be extended for authenticated admin operations in the next phase). Backend verifies the token with Supabase and checks `admin_users`; never trust a client-supplied role.

3D plan: load React Three Fiber scene with `React.lazy`/`Suspense` only on the home hero; use low-poly geometry, capped DPR, reduced-motion static fallback, intersection/visibility pausing and a mobile quality preset. Do not load the 3D bundle on admin or content pages.
