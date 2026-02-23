import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/catalog-seed";
import { getProductImageBySlug } from "@/data/product-images";

export default function Home() {
  const featured = products.slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-800 via-amber-900 to-orange-900 px-4 py-14 text-amber-50 md:py-24">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <span className="inline-block rounded-full border border-amber-400/30 bg-amber-50/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur">
            Premium Quality
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] md:text-6xl">
            Tea &amp; Spices
            <br />
            <span className="bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
              Catalog
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-amber-100/80 md:text-lg">
            Browse product prices by pack size and send a quick enquiry on WhatsApp or through our
            form.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-amber-900 shadow-xl transition-transform active:scale-95 md:hover:scale-105"
            >
              Browse Products
            </Link>
            <Link
              href="/enquiry"
              className="rounded-full border-2 border-amber-300/30 px-6 py-3 text-sm font-semibold text-amber-50 backdrop-blur transition-colors hover:bg-white/10"
            >
              Open Enquiry
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Category Quick Links */}
        <section className="-mt-8 grid grid-cols-2 gap-3 md:gap-5">
          <Link
            href="/products?category=tea"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg transition-transform active:scale-[0.97] md:p-8 md:hover:scale-[1.02]"
          >
            <span className="absolute right-2 top-2 text-4xl opacity-20 md:text-6xl">
              {"\u{1F375}"}
            </span>
            <h3 className="text-lg font-extrabold md:text-2xl">Tea</h3>
            <p className="mt-0.5 text-xs text-emerald-100 md:text-sm">CTC, Orthodox &amp; Green</p>
            <span className="mt-2 inline-block text-xs font-bold text-emerald-200 group-hover:underline md:text-sm">
              Explore &rarr;
            </span>
          </Link>
          <Link
            href="/products?category=spices"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 p-5 text-white shadow-lg transition-transform active:scale-[0.97] md:p-8 md:hover:scale-[1.02]"
          >
            <span className="absolute right-2 top-2 text-4xl opacity-20 md:text-6xl">
              {"\u{1F336}\uFE0F"}
            </span>
            <h3 className="text-lg font-extrabold md:text-2xl">Spices</h3>
            <p className="mt-0.5 text-xs text-orange-100 md:text-sm">Masalas, Powders &amp; Whole</p>
            <span className="mt-2 inline-block text-xs font-bold text-orange-200 group-hover:underline md:text-sm">
              Explore &rarr;
            </span>
          </Link>
        </section>

        {/* How It Works */}
        <section className="mt-12">
          <h2 className="text-center text-xl font-extrabold text-amber-950 md:text-2xl">
            How It Works
          </h2>
          <div className="mt-6 grid grid-cols-3 gap-2 md:gap-6">
            {[
              { num: "1", label: "Browse", sub: "Search & filter products", bg: "bg-amber-100 text-amber-700" },
              { num: "2", label: "Add", sub: "Add items to enquiry", bg: "bg-orange-100 text-orange-700" },
              { num: "3", label: "Enquire", sub: "Submit or WhatsApp", bg: "bg-emerald-100 text-emerald-700" },
            ].map((s) => (
              <div key={s.num} className="rounded-xl bg-white p-3 text-center shadow-sm md:p-6">
                <div
                  className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-lg font-extrabold md:h-14 md:w-14 md:text-xl ${s.bg}`}
                >
                  {s.num}
                </div>
                <h3 className="mt-2 text-sm font-bold text-amber-950 md:text-base">{s.label}</h3>
                <p className="mt-0.5 text-[11px] leading-tight text-amber-600 md:text-sm">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mt-12 pb-10">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold text-amber-950 md:text-2xl">Featured Products</h2>
            <Link
              href="/products"
              className="text-sm font-bold text-amber-700 transition-colors hover:text-amber-900"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {featured.map((product) => {
              const productImage = getProductImageBySlug(product.slug);
              const catColor =
                product.category === "tea"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-orange-100 text-orange-700";
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-shadow hover:shadow-lg active:shadow-none"
                >
                  <div className="relative h-32 overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100/50 md:h-44">
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt={product.nameEn}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-semibold text-amber-300">
                        Image soon
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catColor}`}
                    >
                      {product.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-bold text-amber-950 md:text-base">
                      {product.nameEn}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-amber-700">
                      From Rs.&nbsp;{Math.min(...product.prices.map((p) => p.netPriceInr))}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
