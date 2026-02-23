import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://asvadavat.example.com";
  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/products`, lastModified: now },
    { url: `${baseUrl}/enquiry`, lastModified: now },
  ];

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: now,
  }));

  return [...coreRoutes, ...productRoutes];
}
