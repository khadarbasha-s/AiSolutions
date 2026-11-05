# InfoDrizzle AI Solutions

A dark, futuristic AI development platform with two connected experiences that share one backend:

1. **Public website**: Home, Platform, AI Capabilities, Solutions, an industry template, Use Cases, Pricing, Docs, About and Contact.
2. **AI Application Studio**: Dashboard, Create Application, project view and Settings. Later pipeline screens show a "coming soon" view.

This is **Phase 1 (product foundation)** of the roadmap. The AI engine (orchestrator, agents, requirement and architecture generation) arrives in Phase 2 as a separate Python FastAPI and LangGraph service.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Router |
| Animation | Framer Motion, GSAP (ScrollTrigger and SplitText), Lenis smooth scroll, Three.js via React Three Fiber and Drei, tsParticles |
| Backend | Express, PostgreSQL (pgvector image), express-session with a Postgres session store, Zod, bcrypt |

## Run locally

```bash
cp .env.example .env          # then set SESSION_SECRET
npm install
npm run db:up                 # PostgreSQL in Docker on port 5433
npm run dev                   # API on :5050, website on :5173
```

Open http://localhost:5173. The API creates its tables on start.

Password reset emails are not wired up yet. The reset link is printed in the API log.

## Production

```bash
npm run build                 # typechecks and builds the site to dist/web
npm start                     # the API serves the built site and /api
```

## Layout

```
server/            Express API: auth, projects, account, contact
shared/types.ts    Types shared by the API and the site
src/components/fx  Animation library (aurora, particles, 3D hero, SplitText reveal, spotlight, tilt, magnetic, agent graph...)
src/components/ui  Buttons, fields, badges, section headings
src/components/layout  Site, auth and studio shells
src/components/sections  Page sections, grouped by page
src/pages/site     Public website pages
src/pages/auth     Login, sign up, password reset
src/pages/studio   Studio pages
src/data           Navigation, industries, pricing, docs, use cases
```

## API

| Method | Path | Purpose |
| --- | --- | --- |
| POST | /api/auth/signup | Create user and workspace |
| POST | /api/auth/login, /api/auth/logout | Session login and logout |
| GET | /api/auth/me | Current user and workspace |
| POST | /api/auth/forgot-password, /api/auth/reset-password | Password reset |
| GET, POST | /api/projects | List (search, status filter) and create |
| GET | /api/projects/stats | Dashboard counts and recent projects |
| GET, PATCH, DELETE | /api/projects/:id | Read, edit, delete |
| PATCH | /api/account/profile, /api/account/workspace | Rename user or workspace |
| POST | /api/account/password | Change password |
| GET | /api/account/workspace/members | Workspace members |
| POST | /api/contact | Contact form |

Every project query is scoped to the signed-in workspace.

## Placeholders to confirm

- Pricing amounts in `src/data/pricing.ts` are placeholders.
- Social links in the footer point to `#`.
