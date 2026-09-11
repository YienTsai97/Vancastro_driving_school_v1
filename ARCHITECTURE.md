# Architecture

Technical notes for engineers. Product positioning and contribution scope are in the [README](./README.md). How to click through the hosted demo is in the [Demo Guide](./DEMO_GUIDE.md).

## High-level data flow

```text
Browser
  → Next.js 15 App Router (Vercel, local :3000)
     → Clerk session
     → Server Components / server-side fetchers in frontend/utils
        → Authorization: Bearer <Clerk JWT>
        → Express REST /api/v1 (Render, local :3001)
           → Clerk authentication
           → attachAuthUsers (load PostgreSQL user onto req.authUser)
           → authorizeRoutes (student vs instructor route rules)
           → Controllers
              → Prisma → PostgreSQL (Neon)
              → Intuit OAuth + QuickBooks Online Sandbox
```

The frontend does not use Next.js Route Handlers as the main BFF. Dashboard pages call `NEXT_PUBLIC_API_URL/api/v1/...` from server-side adapters.

## Request pipeline

```text
Express
  → CORS(FRONTEND_URL)
  → JSON body parser
  → /api/v1/oauth          (QuickBooks OAuth; outside Clerk middleware)
  → /api/v1/*              (Clerk)
       → attachAuthUsers
       → authorizeRoutes
       → controller → Prisma / QuickBooks
  → /health                (process liveness)
  → /ready                 (SELECT 1 against PostgreSQL)
```

## Core data model

```text
User
 ├─ Payer → Purchase → PurchaseItem → LessonType
 ├─ Purchase → Invoice → Transaction
 │                  └─ Lesson → Instructor (User)
 ├─ Contract
 └─ Lesson (as student)

TravelTime is a location-pair lookup table (not tied to a specific user)
```

| Entity | Statuses |
| --- | --- |
| Purchase | `PENDING`, then `SENT` after invoicing |
| Invoice | `UNPAID`, `PARTIALLY_PAID`, `PAID` (also `CANCELLED`, `REFUNDED`) |
| Lesson | `PENDING`, `APPROVED`, `CANCELLED` |
| Contract | `ONGOING`, `DONE` |
| Role | `STUDENT`, `INSTRUCTOR` (`ADMIN` exists in schema only) |

## Authorization

- Frontend `middleware.ts` requires login for `/student*`, `/instructor*`, and `/new-user`.
- UI role checks keep students out of instructor pages.
- Backend `createUser` always writes `Role.STUDENT`. Role cannot be changed through `updateUser`.
- Backend route rules restrict invoice listing/create/update/delete and the full user list to instructor/admin. A student may only request their own invoices via `GET /invoices/user/:id`.

Role checks currently cover invoices and the full user list. Next steps: scope purchases and user updates by ownership, and move QuickBooks OAuth behind the Clerk session.

## Availability and time

`User.availability` is stored as UTC ISO ranges. Conversion to the operator’s local clock happens **in the browser**. Converting on the Vercel server used UTC as “local” and shifted demo slots by eight hours.

Instructor and student on the same machine therefore share one local clock, which is the intended demo behavior. Time pickers are 24-hour in 15-minute steps.

## QuickBooks (demo scope)

Implemented on the backend: OAuth connect, token refresh stored on the instructor user, customer and service-item upsert, invoice create/read/update/delete, rollback of the QuickBooks invoice if the local Prisma write fails.

Tokens live in the database, not in the browser, so the same instructor can open Finance in another browser without connecting again (until tokens expire or the database is reset).

Not in this version: QuickBooks Payment / webhook sync. Recording a payment updates the local `Transaction` and invoice status only.

US Sandbox tax codes use `NON`. Invoice line totals are `unitPrice × quantity`; unit price is the catalog price, not a pre-multiplied subtotal.

## Repository layout

```text
.
├─ frontend/                 Next.js app
│  ├─ app/(webpage)/         Public Home, Plans, FAQs, Contact
│  ├─ app/(user-side)/student/**
│  ├─ app/(user-side)/instructor/**
│  ├─ app/new-user/          Post-login profile creation
│  ├─ components/            Marketing, dashboard, forms, UI primitives
│  ├─ utils/                 REST adapters + invoice amount helpers
│  └─ middleware.ts          Clerk route protection
├─ backend/
│  ├─ src/index.ts           Express bootstrap, CORS, /health, /ready
│  ├─ src/routes/            /api/v1 routers
│  ├─ src/middleware/        attachAuthUsers, authorizeRoutes
│  ├─ src/controllers/       Business operations
│  ├─ src/api/               QuickBooks helpers
│  └─ prisma/                schema, migrations, seed (lesson types + travel times)
└─ .github/workflows/ci.yml
```

## Deployed environment

| Service | Role |
| --- | --- |
| Vercel | Next.js frontend, root directory `frontend` |
| Render | Express API, root directory `backend`, `npm run build` then `npm start` |
| Neon | Isolated PostgreSQL; `prisma migrate deploy` then `prisma db seed` |
| Clerk Development | Same test application for local and demo |
| Intuit Development | Redirect URI is the Render callback `/api/v1/oauth/callback` |

This is a **demo deployment**, not a production school tenant.

Health checks:

- [https://vancastro-driving-school-v1-server.onrender.com/health](https://vancastro-driving-school-v1-server.onrender.com/health)
- [https://vancastro-driving-school-v1-server.onrender.com/ready](https://vancastro-driving-school-v1-server.onrender.com/ready)

## Local development

See the [README](./README.md#local-development). Copy `frontend/.env.example` and `backend/.env.example`. Do not commit secrets.

CI on `dev` and `main`: backend `prisma generate` + `tsc` + `/health`; frontend lint, typecheck, and production build.
