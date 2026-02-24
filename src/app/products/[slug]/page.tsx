import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPriceSelector } from "@/components/product-price-selector";
import { ProductCarousel } from "@/components/product-carousel";
import { categoryLabels, FSSAI_INFO } from "@/data/catalog-seed";
import { getProductImageBySlug } from "@/data/product-images";
import { getProductBySlug } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.nameEn, description: `${product.nameEn} pricing by pack size.` };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const minPrice = Math.min(...product.prices.map((price) => price.netPriceInr));
  const productImage = getProductImageBySlug(product.slug);
  const catColor = product.category === "tea" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nameEn,
    category: product.category,
    brand: "ASVADAVAT",
    offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: minPrice, offerCount: product.prices.length },
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <nav className="mb-4 flex items-center gap-1.5 text-xs text-olive-500 md:text-sm">
        <Link href="/products" className="font-medium hover:text-green-900">Products</Link>
        <span>&rsaquo;</span>
        <Link href={`/products?category=${product.category}`} className="font-medium hover:text-green-900">{categoryLabels[product.category]}</Link>
        <span>&rsaquo;</span>
        <span className="truncate text-green-900">{product.nameEn}</span>
      </nav>

      <div className="grid gap-5 md:grid-cols-2 md:gap-8">
        <section className="overflow-hidden rounded-2xl border border-olive-200 bg-white shadow-sm">
          <ProductCarousel
            productImage={productImage}
            productName={product.nameEn}
            fssaiInfo={FSSAI_INFO}
            ingredients={product.ingredients}
          />
          <div className="p-5">
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catColor}`}>{categoryLabels[product.category]}</span>
            <h1 className="mt-2 text-2xl font-extrabold text-green-950 md:text-3xl">{product.nameEn}</h1>
            {product.nameHi && <p className="mt-1 text-base text-olive-600">{product.nameHi}</p>}
            <p className="mt-3 text-sm leading-relaxed text-olive-700">{product.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">#{tag}</span>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-green-50 p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-green-700">All Pack Sizes</h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {product.prices.map((price) => (
                  <div key={`${product.id}-${price.packSize}`} className="rounded-lg border border-olive-200 bg-white px-3 py-2 text-center">
                    <p className="text-xs font-medium text-olive-500">{price.packSize}</p>
                    <p className="text-base font-extrabold text-green-950">Rs.&nbsp;{price.netPriceInr}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <ProductPriceSelector product={product} />
          <Link href="/products" className="block rounded-xl border border-olive-200 bg-white px-4 py-3 text-center text-sm font-bold text-green-800 shadow-sm transition-colors hover:bg-green-50 active:bg-green-100">
            &larr; Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
