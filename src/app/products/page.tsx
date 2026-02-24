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
  const activeCategory = category ?? "all";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-green-950 md:text-3xl">Product Catalog</h1>
          <p className="mt-1 text-sm text-olive-500">
            {products.length} product{products.length !== 1 && "s"} found
          </p>
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(["all", "tea", "spices"] as const).map((cat) => {
          const isActive = activeCategory === cat;
          const href = cat === "all" ? "/products" : `/products?category=${cat}`;
          const colors = {
            all: isActive ? "bg-green-800 text-white" : "bg-white text-green-800 border-olive-200",
            tea: isActive ? "bg-emerald-600 text-white" : "bg-white text-emerald-700 border-emerald-200",
            spices: isActive ? "bg-orange-600 text-white" : "bg-white text-orange-700 border-orange-200",
          };
          return (
            <Link key={cat} href={href} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-all active:scale-95 ${colors[cat]}`}>
              {cat === "all" ? "All" : categoryLabels[cat]}
            </Link>
          );
        })}
      </div>

      {/* Filters */}
      <details className="mt-4 rounded-2xl border border-olive-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-bold text-green-900">
          <span>{"\u{1F50D}"} Filters &amp; Search</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform [[open]>&]:rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </summary>
        <form className="grid gap-3 border-t border-olive-100 px-4 pb-4 pt-3 md:grid-cols-4">
          <input type="text" name="search" defaultValue={search} placeholder="Search by name..." className="rounded-xl border border-olive-200 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" />
          <select name="category" defaultValue={category ?? ""} className="rounded-xl border border-olive-200 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200">
            <option value="">All categories</option>
            <option value="tea">{categoryLabels.tea}</option>
            <option value="spices">{categoryLabels.spices}</option>
          </select>
          <select name="packSize" defaultValue={packSize ?? ""} className="rounded-xl border border-olive-200 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200">
            <option value="">All pack sizes</option>
            {packSizes.map((size) => (<option key={size} value={size}>{size}</option>))}
          </select>
          <input type="number" name="maxPrice" min={1} defaultValue={maxPriceText ?? ""} placeholder="Max price (INR)" className="rounded-xl border border-olive-200 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" />
          <button type="submit" className="rounded-xl bg-gradient-to-r from-green-700 to-green-900 px-4 py-2.5 text-sm font-bold text-green-50 shadow transition-transform active:scale-[0.98] md:col-span-4">
            Apply Filters
          </button>
        </form>
      </details>

      {/* Product grid */}
      {products.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-4xl">{"\u{1F50D}"}</p>
          <p className="mt-3 text-lg font-bold text-green-900">No products found</p>
          <p className="text-sm text-olive-500">Try adjusting your filters or search term.</p>
          <Link href="/products" className="mt-4 inline-block rounded-full bg-green-800 px-5 py-2 text-sm font-bold text-white">Clear Filters</Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
          {products.map((product) => {
            const productImage = getProductImageBySlug(product.slug);
            const catColor = product.category === "tea" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700";
            const minPrice = Math.min(...product.prices.map((p) => p.netPriceInr));
            return (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-olive-100 bg-white shadow-sm transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative h-44 overflow-hidden bg-gradient-to-b from-olive-50 to-green-50 md:h-56">
                    {productImage ? (
                      <Image src={productImage} alt={product.nameEn} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 1024px) 50vw, 33vw" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-semibold text-olive-400">Image soon</div>
                    )}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-3.5 md:p-4">
                  <span className={`inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catColor}`}>
                    {categoryLabels[product.category]}
                  </span>
                  <Link href={`/products/${product.slug}`}>
                    <h2 className="mt-1.5 line-clamp-2 text-base font-extrabold text-green-950 md:text-lg">{product.nameEn}</h2>
                  </Link>
                  {product.nameHi && <p className="text-xs text-olive-500">{product.nameHi}</p>}
                  <p className="mt-1.5 hidden text-xs leading-relaxed text-olive-600 md:line-clamp-2">{product.description}</p>
                  <p className="mt-2 text-sm font-bold text-green-700">From Rs.&nbsp;{minPrice}</p>
                  <div className="mt-auto flex items-center gap-2 pt-3">
                    <AddToEnquiryButton productId={product.id} productSlug={product.slug} productName={product.nameEn} price={product.prices[0]} />
                    <Link href={`/products/${product.slug}`} className="rounded-lg border border-olive-200 px-3 py-2 text-xs font-bold text-green-800 transition-colors hover:bg-green-50 active:bg-green-100 md:text-sm">
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
