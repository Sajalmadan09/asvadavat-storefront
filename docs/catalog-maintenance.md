# Catalog Maintenance

## Update Price List
1. Save latest supplier file in project root or `data/raw/`.
2. Update:
   - `data/seed/products.csv` (if new products)
   - `data/seed/product_prices.csv` (new prices)
3. Update `src/data/catalog-seed.ts` for website fallback data.
4. Re-run checks:
   - `npm run seed:notes`
   - `npm run lint`
   - `npm run typecheck`
5. Re-apply `supabase/seed.sql` in Supabase SQL editor.

## Versioning
- Keep `effective_from` date updated for each price change.
- Never overwrite historical prices in production without backup.

## Data Quality Checklist
- Slug uniqueness
- Hindi names (where available)
- Price value > 0
- Correct category mapping (`tea`/`spices`)
- At least one pack-size price per product
