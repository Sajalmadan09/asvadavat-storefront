import { products } from "@/data/catalog-seed";
import type { CategoryKey, PackSizeLabel, Product } from "@/types/catalog";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category?: CategoryKey): Product[] {
  if (!category) {
    return products;
  }

  return products.filter((product) => product.category === category);
}

export function getAllPackSizes(): PackSizeLabel[] {
  const packSizes = new Set<PackSizeLabel>();
  for (const product of products) {
    for (const price of product.prices) {
      packSizes.add(price.packSize);
    }
  }
  return [...packSizes].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

type ProductFilter = {
  search?: string;
  category?: CategoryKey;
  packSize?: PackSizeLabel;
  maxPrice?: number;
};

export function filterProducts(filter: ProductFilter): Product[] {
  const searchTerm = filter.search?.trim().toLowerCase();
  const maxPrice = filter.maxPrice;

  return products.filter((product) => {
    if (filter.category && product.category !== filter.category) {
      return false;
    }

    if (filter.packSize && !product.prices.some((p) => p.packSize === filter.packSize)) {
      return false;
    }

    if (typeof maxPrice === "number" && !product.prices.some((p) => p.netPriceInr <= maxPrice)) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    const nameHi = product.nameHi ?? "";
    const haystack = `${product.nameEn} ${nameHi} ${product.tags.join(" ")}`.toLowerCase();
    return haystack.includes(searchTerm);
  });
}
