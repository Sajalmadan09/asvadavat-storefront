import Link from "next/link";
import { products } from "@/data/catalog-seed";

export default function Home() {
  const featured = products.slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <section className="rounded-2xl bg-amber-900 px-6 py-10 text-amber-50 md:px-10">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-200">ASVADAVAT</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">Tea & Spices Catalog</h1>
        <p className="mt-4 max-w-2xl text-base text-amber-100 md:text-lg">
          Browse product prices by pack size and send a quick enquiry on WhatsApp or form.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-full bg-amber-50 px-5 py-2 font-semibold text-amber-900"
          >
            Browse Products
          </Link>
          <Link href="/enquiry" className="rounded-full border border-amber-200 px-5 py-2">
            Open Enquiry Basket
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-sm font-semibold text-amber-800">
            View all
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <article key={product.id} className="rounded-xl border border-amber-200 bg-white p-4">
              <h3 className="text-lg font-semibold text-amber-950">{product.nameEn}</h3>
              {product.nameHi ? <p className="text-sm text-amber-700">{product.nameHi}</p> : null}
              <p className="mt-2 text-sm text-amber-800">{product.description}</p>
              <p className="mt-3 text-sm font-medium">
                Starts at Rs. {Math.min(...product.prices.map((price) => price.netPriceInr))}
              </p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-4 inline-block rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-amber-50"
              >
                View details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
