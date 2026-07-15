# NORTHLINE

Premium streetwear e-commerce portfolio project built as a real, full-stack commercial storefront. It includes a cinematic responsive storefront, a searchable/filterable 30-product catalog, product detail pages, persistent cart and favorites, validated checkout, customer accounts, order history, credentials authentication, a role-protected admin control room, PostgreSQL persistence and demo seed data.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, React Hook Form, Zod, Framer Motion, Zustand, Lucide and Sonner.

## Local setup

1. The repository already includes a local portfolio `.env`. Replace `AUTH_SECRET` only if this project is ever deployed publicly.
2. Install dependencies: `npm install`.
3. Start PostgreSQL: `docker compose up -d db` (host port `5433`, chosen to avoid common local conflicts).
4. Generate Prisma client and migrate: `npx prisma generate && npx prisma migrate dev --name init`.
5. Load demo data: `npm run db:seed`.
6. Start development: `npm run dev` and open `http://localhost:3100`.

## Demo credentials

- Admin: `admin@northline.local` / `Admin12345!`
- Customer: `user@northline.local` / `User12345!`

Admin is available at `/admin/login`. Payment is intentionally simulated; checkout creates a real order record but never handles card details.

## Useful commands

- `npm run dev` — development server
- `npm run typecheck` — strict TypeScript validation
- `npm run build` — Prisma generation and production build
- `npm run db:migrate` — create/apply a development migration
- `npm run db:seed` — reset and load portfolio demo data
- `docker compose --profile production up --build` — build the complete app and database stack

## Project structure

- `app/` — storefront, account, checkout, API and admin routes
- `components/` — reusable commerce and shell UI
- `store/` — persisted cart/favorites state
- `lib/` — product demo source, validation, Prisma and shared types
- `prisma/` — database schema and seed
- `public/images/` — replaceable editorial/product imagery

Product imagery is deliberately referenced from one centralized product source (`lib/data.ts`) and local files, so production photography can be swapped without touching UI components.
