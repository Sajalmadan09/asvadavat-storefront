# ASVADAVAT Catalog Website (Phase 1)

Catalog-first e-commerce site for tea and spices using Next.js + Supabase.

## Features
- Product catalog with search/filter
- Product detail pages with pack-size pricing
- Add-to-enquiry basket with local storage
- Enquiry submission API (Supabase-backed)
- Optional WhatsApp prefilled enquiry
- Seed data and Supabase SQL schema

## Quick Start
1. Install dependencies:
   - `npm install`
2. Configure env:
   - `cp .env.example .env.local`
   - Fill all variables
3. Start dev server:
   - `npm run dev`

## Project Structure
- `src/app/` Next.js routes
- `src/components/` UI components and enquiry store
- `src/data/catalog-seed.ts` fallback product data used by UI
- `data/seed/` normalized seed files from PDF
- `supabase/schema.sql` database schema
- `supabase/seed.sql` SQL seed data
- `docs/` deployment, image pipeline, and maintenance guides

## Useful Commands
- `npm run lint`
- `npm run typecheck`
- `npm run seed:notes`
- `npm run images:prompts`

## Deployment
See `docs/deploy-vercel.md`.
