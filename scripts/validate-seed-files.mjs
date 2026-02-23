import { readFileSync } from "node:fs";
import path from "node:path";

const files = [
  "data/seed/products.csv",
  "data/seed/product_prices.csv",
  "data/seed/catalog.json",
  "supabase/schema.sql",
  "supabase/seed.sql",
];

let hasFailure = false;

for (const file of files) {
  const absolutePath = path.resolve(process.cwd(), file);
  try {
    const content = readFileSync(absolutePath, "utf8");
    if (!content.trim()) {
      console.error(`Empty file: ${file}`);
      hasFailure = true;
      continue;
    }
    console.log(`OK: ${file}`);
  } catch {
    console.error(`Missing file: ${file}`);
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exit(1);
}

console.log("Seed files are present.");
