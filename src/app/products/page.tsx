import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToEnquiryButton } from "@/components/add-to-enquiry-button";
import { categoryLabels } from "@/data/catalog-seed";
import { getProductImageBySlug } from "@/data/product-images";
import { filterProducts, getAllPackSizes } from "@/lib/catalog";
import type { CategoryKey, PackSizeLabel } from "@/types/catalog";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all ASVADAVAT tea and spice products.",
};

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function asSingleString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const search = asSingleString(params.search) ?? "";
  const category = asSingleString(params.category) as CategoryKey | undefined;
  const packSize = asSingleString(params.packSize) as PackSizeLabel | undefined;
  const maxPriceText = asSingleString(params.maxPrice);
  const maxPrice = maxPriceText ? Number(maxPriceText) : undefined;

  const products = filterProducts({
    search,
    category,
    packSize,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
  });

  const packSizes = getAllPackSizes();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-950">Product Catalog</h1>
      <p className="mt-2 text-sm text-amber-800">Search, filter, and add products to enquiry.</p>

      <form className="mt-6 grid gap-3 rounded-xl border border-amber-200 bg-white p-4 md:grid-cols-4">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name"
          className="rounded-md border border-amber-200 px-3 py-2 text-sm"
        />
        <select
          name="category"
          defaultValue={category ?? ""}
          className="rounded-md border border-amber-200 px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          <option value="tea">{categoryLabels.tea}</option>
          <option value="spices">{categoryLabels.spices}</option>
        </select>
        <select
          name="packSize"
          defaultValue={packSize ?? ""}
          className="rounded-md border border-amber-200 px-3 py-2 text-sm"
        >
          <option value="">All pack sizes</option>
          {packSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="maxPrice"
          min={1}
          defaultValue={maxPriceText ?? ""}
          placeholder="Max price (INR)"
          className="rounded-md border border-amber-200 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="md:col-span-4 rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-amber-50"
        >
          Apply Filters
        </button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const productImage = getProductImageBySlug(product.slug);
          return (
          <article key={product.id} className="rounded-xl border border-amber-200 bg-white p-4">
            <div className="relative mb-3 h-40 overflow-hidden rounded-lg border border-amber-100 bg-amber-50">
              {productImage ? (
                <Image
                  src={productImage}
                  alt={product.nameEn}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs font-semibold tracking-wide text-amber-700">
                  AI image in progress
                </div>
              )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              {categoryLabels[product.category]}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-amber-950">{product.nameEn}</h2>
            {product.nameHi ? <p className="text-sm text-amber-700">{product.nameHi}</p> : null}
            <p className="mt-2 text-sm text-amber-800">{product.description}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {product.prices.map((price) => (
                <li key={`${product.id}-${price.packSize}`}>
                  {price.packSize}: Rs. {price.netPriceInr}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <AddToEnquiryButton
                productId={product.id}
                productSlug={product.slug}
                productName={product.nameEn}
                price={product.prices[0]}
              />
              <Link
                href={`/products/${product.slug}`}
                className="rounded-md border border-amber-300 px-3 py-2 text-sm font-semibold text-amber-900"
              >
                View
              </Link>
            </div>
          </article>
          );
        })}
      </div>
    </main>
  );
}
