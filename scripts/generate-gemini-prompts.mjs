import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const sourceFile = path.resolve(process.cwd(), "data/seed/products.csv");
const outputDir = path.resolve(process.cwd(), "data/ai");
const outputFile = path.resolve(outputDir, "image-prompts.json");

const csv = readFileSync(sourceFile, "utf8").trim().split("\n");
const rows = csv.slice(1);

const prompts = rows.map((line) => {
  const cells = line.split(",");
  const id = cells[0];
  const slug = cells[1];
  const nameEn = cells[3];
  const category = cells[2];
  const baseStyle =
    category === "tea"
      ? "premium tea pouch packshot, front view, clean white studio background"
      : "Indian spice pouch packshot, front view, clean white studio background";

  return {
    id,
    slug,
    productName: nameEn,
    prompt: `${nameEn}, ${baseStyle}, photorealistic, no logo, no watermark, high detail`,
  };
});

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, JSON.stringify(prompts, null, 2), "utf8");

console.log(`Generated ${prompts.length} prompts at ${path.relative(process.cwd(), outputFile)}`);
