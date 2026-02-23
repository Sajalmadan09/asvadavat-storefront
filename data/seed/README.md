# ASVADAVAT Seed Data

Source: `ASVADAVAT - PRODUCT LIST - NET. PRICE 05.06.2025.pdf`

This folder contains normalized seed files:
- `products.csv`: one row per product
- `product_prices.csv`: one row per pack-size price

Normalization notes:
- Tea and spices are mapped to two categories: `tea`, `spices`.
- Missing prices (`-` in the PDF) are intentionally omitted.
- Slugs are stabilized in English for URL-safe identifiers.
- Hindi names from brackets are preserved where present.
