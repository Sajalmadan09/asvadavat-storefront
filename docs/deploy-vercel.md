# Deploy on Vercel

## 1) Prerequisites
- Supabase project created
- Schema and seed applied:
  - `supabase/schema.sql`
  - `supabase/seed.sql`
- Vercel account connected to repository

## 2) Environment Variables
Set in Vercel Project Settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (e.g. `919876543210`)

## 3) Build and Deploy
- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Output: default Next.js output

## 4) Post-deploy Checks
- Home page loads
- Product filters work
- Product detail adds to enquiry basket
- Enquiry form submits successfully
- WhatsApp button opens with prefilled message
- `sitemap.xml` and `robots.txt` resolve
