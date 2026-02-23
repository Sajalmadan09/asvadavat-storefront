const productImageMap: Record<string, string> = {
  "black-tea-ctc": "/product-images/black-tea-ctc.png",
  "black-tea-premium-ctc": "/product-images/black-tea-premium-ctc.png",
  "organic-green-tea-orthodox-leaves": "/product-images/organic-green-tea-orthodox-leaves.png",
  "black-tea-orthodox-leaves": "/product-images/black-tea-orthodox-leaves.png",
  "dry-mango-powder-amchur": "/product-images/dry-mango-powder-amchur.png",
  "black-pepper-powder": "/product-images/black-pepper-powder.png",
};

export function getProductImageBySlug(slug: string): string | null {
  return productImageMap[slug] ?? null;
}
