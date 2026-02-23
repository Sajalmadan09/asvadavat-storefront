import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPriceSelector } from "@/components/product-price-selector";
import { getProductBySlug } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
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
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-amber-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-amber-950">{product.nameEn}</h1>
          {product.nameHi ? <p className="mt-1 text-lg text-amber-800">{product.nameHi}</p> : null}
          <p className="mt-4 text-amber-900">{product.description}</p>
          <ul className="mt-4 space-y-1 text-sm text-amber-900">
            {product.prices.map((price) => (
              <li key={`${product.id}-${price.packSize}`}>
                {price.packSize}: Rs. {price.netPriceInr}
              </li>
            ))}
          </ul>
        </section>

        <ProductPriceSelector product={product} />
      </div>
    </main>
  );
}
