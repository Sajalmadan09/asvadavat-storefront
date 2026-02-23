import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPriceSelector } from "@/components/product-price-selector";
import { categoryLabels } from "@/data/catalog-seed";
import { getProductImageBySlug } from "@/data/product-images";
import { getProductBySlug } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.nameEn,
    description: `${product.nameEn} pricing by pack size.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const minPrice = Math.min(...product.prices.map((price) => price.netPriceInr));
  const productImage = getProductImageBySlug(product.slug);
  const catColor =
    product.category === "tea"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-orange-100 text-orange-700";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nameEn,
    category: product.category,
    brand: "ASVADAVAT",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: minPrice,
      offerCount: product.prices.length,
    },
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-amber-600 md:text-sm">
        <Link href="/products" className="font-medium hover:text-amber-900">
          Products
        </Link>
        <span>&rsaquo;</span>
        <Link
          href={`/products?category=${product.category}`}
          className="font-medium hover:text-amber-900"
        >
          {categoryLabels[product.category]}
        </Link>
        <span>&rsaquo;</span>
        <span className="truncate text-amber-900">{product.nameEn}</span>
      </nav>

      <div className="grid gap-5 md:grid-cols-2 md:gap-8">
        {/* Left: Image + info */}
        <section className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
          <div className="relative h-56 bg-gradient-to-b from-amber-50 to-amber-100/30 md:h-72">
            {productImage ? (
              <Image
                src={productImage}
                alt={product.nameEn}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-semibold text-amber-300">
                Product image will be added soon
              </div>
            )}
          </div>
          <div className="p-5">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catColor}`}
            >
              {categoryLabels[product.category]}
            </span>
            <h1 className="mt-2 text-2xl font-extrabold text-amber-950 md:text-3xl">
              {product.nameEn}
            </h1>
            {product.nameHi && <p className="mt-1 text-base text-amber-700">{product.nameHi}</p>}
            <p className="mt-3 text-sm leading-relaxed text-amber-800">{product.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* All prices */}
            <div className="mt-5 rounded-xl bg-amber-50 p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600">
                All Pack Sizes
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {product.prices.map((price) => (
                  <div
                    key={`${product.id}-${price.packSize}`}
                    className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-center"
                  >
                    <p className="text-xs font-medium text-amber-600">{price.packSize}</p>
                    <p className="text-base font-extrabold text-amber-950">
                      Rs.&nbsp;{price.netPriceInr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right: Pack selector */}
        <div className="flex flex-col gap-4">
          <ProductPriceSelector product={product} />

          <Link
            href="/products"
            className="block rounded-xl border border-amber-200 bg-white px-4 py-3 text-center text-sm font-bold text-amber-800 shadow-sm transition-colors hover:bg-amber-50 active:bg-amber-100"
          >
            &larr; Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
