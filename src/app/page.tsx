import Image from "next/image";
import Link from "next/link";
import { categoryLabels, products } from "@/data/catalog-seed";
import { getProductImageBySlug } from "@/data/product-images";
import { getAllPackSizes } from "@/lib/catalog";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default function Home() {
  const bestSellers = [
    products.find((p) => p.slug === "black-tea-ctc")!,
    products.find((p) => p.slug === "turmeric-powder")!,
    products.find((p) => p.slug === "mixed-spices-powder-garam-masala")!,
    products.find((p) => p.slug === "organic-green-tea-orthodox-leaves")!,
    products.find((p) => p.slug === "red-chilli-powder")!,
    products.find((p) => p.slug === "cardamom-elaichi")!,
    products.find((p) => p.slug === "chai-masala")!,
    products.find((p) => p.slug === "black-pepper-whole")!,
  ];

  const teaProducts = products.filter((p) => p.category === "tea");
  const spiceProducts = products.filter((p) => p.category === "spices");
  const packSizeCount = getAllPackSizes().length;

  return (
    <main>
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-800 via-amber-900 to-orange-900 px-4 pb-20 pt-14 text-amber-50 md:pb-28 md:pt-24">
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
              Straight From the Source
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-amber-100/80 md:text-lg">
            Discover our curated range of teas and spices. Pick your pack sizes, build an enquiry
            basket, and reach us on WhatsApp in seconds.
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

          {/* Scroll hint */}
          <div className="mt-12 flex justify-center md:mt-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 animate-bounce text-amber-300/60"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4">
        {/* ───── Category Quick Links ───── */}
        <section className="-mt-10 grid grid-cols-2 gap-3 md:gap-5">
          <Link
            href="/products?category=tea"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg transition-transform active:scale-[0.97] md:p-8 md:hover:scale-[1.02]"
          >
            <span className="absolute right-2 top-2 text-4xl opacity-20 md:text-6xl">
              {"\u{1F375}"}
            </span>
            <h3 className="text-lg font-extrabold md:text-2xl">Tea</h3>
            <p className="mt-0.5 text-xs text-emerald-100 md:text-sm">
              CTC, Orthodox &amp; Green
            </p>
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
            <p className="mt-0.5 text-xs text-orange-100 md:text-sm">
              Masalas, Powders &amp; Whole
            </p>
            <span className="mt-2 inline-block text-xs font-bold text-orange-200 group-hover:underline md:text-sm">
              Explore &rarr;
            </span>
          </Link>
        </section>

        {/* ───── Brand Story ───── */}
        <section className="mt-16 md:mt-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                Our Story
              </span>
              <h2 className="mt-2 text-2xl font-extrabold leading-snug text-amber-950 md:text-3xl">
                Rooted in Tradition,
                <br />
                <span className="text-amber-700">Crafted with Care</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-amber-800 md:text-base">
                At ASVADAVAT, we believe every cup of tea and every pinch of spice should carry the
                authentic flavors of India. We source directly from trusted farms and estates,
                ensuring freshness, purity, and unmatched quality in every pack.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-amber-700 md:text-base">
                From the robust CTC blends of Assam to the aromatic whole spices of Kerala, our
                catalog is a celebration of India&apos;s rich culinary heritage &mdash; available at
                transparent, pack-size pricing.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-block rounded-full bg-amber-900 px-6 py-2.5 text-sm font-bold text-amber-50 shadow transition-transform active:scale-95 md:hover:scale-105"
              >
                Explore Our Range
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { slug: "turmeric-powder", bg: "from-yellow-100 to-amber-100" },
                { slug: "red-chilli-powder", bg: "from-red-100 to-orange-100" },
                { slug: "cardamom-elaichi", bg: "from-emerald-100 to-teal-100" },
                { slug: "black-tea-ctc", bg: "from-amber-100 to-orange-100" },
                { slug: "cinnamon-dalchini", bg: "from-orange-100 to-amber-100" },
                { slug: "organic-green-tea-orthodox-leaves", bg: "from-green-100 to-emerald-100" },
              ].map((item) => {
                const img = getProductImageBySlug(item.slug);
                return (
                  <div
                    key={item.slug}
                    className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${item.bg}`}
                  >
                    {img && (
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover p-2"
                        sizes="(max-width: 768px) 30vw, 15vw"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── Stats Bar ───── */}
        <section className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 shadow-xl">
          <div className="grid grid-cols-2 divide-amber-700/40 md:grid-cols-4 md:divide-x">
            {[
              { value: `${products.length}`, label: "Products", icon: "\u{1F4E6}" },
              { value: "2", label: "Categories", icon: "\u{1F3F7}\uFE0F" },
              { value: `${packSizeCount}`, label: "Pack Sizes", icon: "\u{1F4CF}" },
              { value: "Instant", label: "WhatsApp Order", icon: "\u{1F4F2}" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-4 py-6 text-center md:py-8"
              >
                <span className="text-2xl">{stat.icon}</span>
                <span className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-0.5 text-xs font-medium text-amber-300 md:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Best Sellers ───── */}
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold text-amber-950 md:text-2xl">Best Sellers</h2>
            <Link
              href="/products"
              className="text-sm font-bold text-amber-700 transition-colors hover:text-amber-900"
            >
              View all &rarr;
            </Link>
          </div>

          {/* Horizontal scroll on mobile, 4-col grid on desktop */}
          <div className="mt-5 flex gap-3 overflow-x-auto pb-4 scrollbar-none md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
            {bestSellers.map((product) => {
              const productImage = getProductImageBySlug(product.slug);
              const catColor =
                product.category === "tea"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-orange-100 text-orange-700";
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group w-[45vw] shrink-0 overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-shadow hover:shadow-lg active:shadow-none md:w-auto"
                >
                  <div className="relative h-32 overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100/50 md:h-44">
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt={product.nameEn}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 45vw, 25vw"
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

        {/* ───── Why Choose Us ───── */}
        <section className="mt-16">
          <h2 className="text-center text-xl font-extrabold text-amber-950 md:text-2xl">
            Why Choose ASVADAVAT
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {[
              {
                icon: "\u{2B50}",
                title: "Premium Quality",
                desc: "Sourced from trusted farms and estates across India.",
                bg: "from-amber-50 to-yellow-50",
                border: "border-amber-200",
              },
              {
                icon: "\u{1F331}",
                title: "Wide Range",
                desc: `${products.length} products across teas, masalas, and whole spices.`,
                bg: "from-emerald-50 to-green-50",
                border: "border-emerald-200",
              },
              {
                icon: "\u{26A1}",
                title: "Easy Ordering",
                desc: "Add to basket, fill your details, and submit in seconds.",
                bg: "from-orange-50 to-amber-50",
                border: "border-orange-200",
              },
              {
                icon: "\u{1F4AC}",
                title: "WhatsApp Support",
                desc: "Reach us directly on WhatsApp for quick responses.",
                bg: "from-green-50 to-emerald-50",
                border: "border-green-200",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm md:p-6 ${card.bg} ${card.border}`}
              >
                <span className="text-2xl md:text-3xl">{card.icon}</span>
                <h3 className="mt-2 text-sm font-bold text-amber-950 md:text-base">{card.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-amber-700 md:text-sm">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── How It Works ───── */}
        <section className="mt-16">
          <h2 className="text-center text-xl font-extrabold text-amber-950 md:text-2xl">
            How It Works
          </h2>
          <div className="mt-6 grid grid-cols-3 gap-2 md:gap-6">
            {[
              {
                num: "1",
                label: "Browse",
                sub: "Search & filter products",
                bg: "bg-amber-100 text-amber-700",
              },
              {
                num: "2",
                label: "Add",
                sub: "Add items to enquiry",
                bg: "bg-orange-100 text-orange-700",
              },
              {
                num: "3",
                label: "Enquire",
                sub: "Submit or WhatsApp",
                bg: "bg-emerald-100 text-emerald-700",
              },
            ].map((s) => (
              <div key={s.num} className="rounded-xl bg-white p-3 text-center shadow-sm md:p-6">
                <div
                  className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-lg font-extrabold md:h-14 md:w-14 md:text-xl ${s.bg}`}
                >
                  {s.num}
                </div>
                <h3 className="mt-2 text-sm font-bold text-amber-950 md:text-base">{s.label}</h3>
                <p className="mt-0.5 text-[11px] leading-tight text-amber-600 md:text-sm">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ───── WhatsApp CTA Banner (full-width) ───── */}
      <section className="mt-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-4 py-10 text-white md:py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center md:flex-row md:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur md:h-20 md:w-20">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9 md:h-11 md:w-11">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold md:text-2xl">Have Questions? We&apos;re on WhatsApp!</h2>
            <p className="mt-1 text-sm text-green-100 md:text-base">
              Need help choosing products or want a custom bulk quote? Message us directly and we&apos;ll
              respond right away.
            </p>
          </div>
          {WHATSAPP_NUMBER ? (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to know more about your tea and spice products.")}`}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-green-700 shadow-xl transition-transform active:scale-95 md:hover:scale-105"
            >
              Chat on WhatsApp
            </a>
          ) : (
            <Link
              href="/enquiry"
              className="shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-green-700 shadow-xl transition-transform active:scale-95 md:hover:scale-105"
            >
              Send an Enquiry
            </Link>
          )}
        </div>
      </section>

      {/* ───── All Products Preview ───── */}
      <div className="mx-auto w-full max-w-6xl px-4">
        <section className="mt-16 pb-12">
          <h2 className="text-center text-xl font-extrabold text-amber-950 md:text-2xl">
            Our Complete Range
          </h2>
          <p className="mt-1 text-center text-sm text-amber-600">
            {products.length} products across {Object.keys(categoryLabels).length} categories
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Tea */}
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 md:p-6">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-200 text-lg">
                  {"\u{1F375}"}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-emerald-900 md:text-lg">
                    {categoryLabels.tea}
                  </h3>
                  <p className="text-xs text-emerald-600">
                    {teaProducts.length} product{teaProducts.length !== 1 && "s"}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {teaProducts.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-100 active:bg-emerald-200"
                    >
                      <span className="flex-1">{p.nameEn}</span>
                      <span className="shrink-0 text-xs font-bold text-emerald-600">
                        From Rs.&nbsp;{Math.min(...p.prices.map((pr) => pr.netPriceInr))}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spices */}
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-5 md:p-6">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-200 text-lg">
                  {"\u{1F336}\uFE0F"}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-orange-900 md:text-lg">
                    {categoryLabels.spices}
                  </h3>
                  <p className="text-xs text-orange-600">
                    {spiceProducts.length} product{spiceProducts.length !== 1 && "s"}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {spiceProducts.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-orange-800 transition-colors hover:bg-orange-100 active:bg-orange-200"
                    >
                      <span className="flex-1">{p.nameEn}</span>
                      <span className="shrink-0 text-xs font-bold text-orange-600">
                        From Rs.&nbsp;{Math.min(...p.prices.map((pr) => pr.netPriceInr))}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-block rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-8 py-3 text-sm font-bold text-amber-50 shadow-lg transition-transform active:scale-95 md:hover:scale-105"
            >
              Browse Full Catalog
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
