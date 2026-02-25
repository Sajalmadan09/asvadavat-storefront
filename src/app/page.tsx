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
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* ───── Category Quick Links ───── */}
        <section id="categories" className="mt-8 scroll-mt-20 grid grid-cols-2 gap-3 md:mt-10 md:gap-5">
          <Link
            href="/products?category=tea"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#9bd8b9] to-[#7ec8a3] p-5 text-[#1d3a2c] shadow-lg transition-transform active:scale-[0.97] md:p-8 md:hover:scale-[1.02]"
          >
            <span className="absolute right-2 top-2 text-4xl opacity-20 md:text-6xl">{"\u{1F375}"}</span>
            <h3 className="text-lg font-extrabold md:text-2xl">Tea</h3>
            <p className="mt-0.5 text-xs text-[#2f6648] md:text-sm">CTC, Orthodox &amp; Green</p>
            <span className="mt-2 inline-block text-xs font-bold text-[#24543b] group-hover:underline md:text-sm">Explore &rarr;</span>
          </Link>
          <Link
            href="/products?category=spices"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffd8b8] to-[#ffc79a] p-5 text-[#4d2a16] shadow-lg transition-transform active:scale-[0.97] md:p-8 md:hover:scale-[1.02]"
          >
            <span className="absolute right-2 top-2 text-4xl opacity-20 md:text-6xl">{"\u{1F336}\uFE0F"}</span>
            <h3 className="text-lg font-extrabold md:text-2xl">Spices</h3>
            <p className="mt-0.5 text-xs text-[#8b4a27] md:text-sm">Masalas, Powders &amp; Whole</p>
            <span className="mt-2 inline-block text-xs font-bold text-[#7a3f22] group-hover:underline md:text-sm">Explore &rarr;</span>
          </Link>
        </section>

        {/* ───── Brand Meaning ───── */}
        <section className="mt-16 md:mt-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3f8c63]">Introducing Asvadavat</span>
              <h2 className="mt-2 text-2xl font-extrabold leading-snug text-[#1d3a2c] md:text-3xl">
                Spice and Tea company..
              </h2>
              <p className="mt-3 text-base font-semibold leading-relaxed text-[#37684b] md:text-lg">
                The perfect name of purity and taste!
              </p>
              <h3 className="mt-5 text-xl font-extrabold text-[#1d3a2c] md:text-2xl">What Does Asvadavat Mean?</h3>
              <p className="mt-3 text-sm leading-relaxed text-olive-700 md:text-base">
                Asvadavat (आस्वादवत्):(ā-svāda-vat) derived from Sanskrit word ā-svāda meaning having
                a good taste, is what the name suggests.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-olive-700 md:text-base">
                Asvadavat (आस्वादवत्):(ā-svāda-vat) derived from Sanskrit word ā-svāda meaning having
                a good taste, is what the name suggests.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#5aa982] to-[#3f8c63] px-6 py-2.5 text-sm font-bold text-white shadow transition-transform active:scale-95 md:hover:scale-105"
              >
                Explore Our Range
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { slug: "turmeric-powder", bg: "from-yellow-100 to-amber-100" },
                { slug: "red-chilli-powder", bg: "from-red-100 to-orange-100" },
                { slug: "cardamom-elaichi", bg: "from-emerald-100 to-teal-100" },
                { slug: "black-tea-ctc", bg: "from-green-100 to-emerald-100" },
                { slug: "cinnamon-dalchini", bg: "from-orange-100 to-amber-100" },
                { slug: "organic-green-tea-orthodox-leaves", bg: "from-green-100 to-emerald-100" },
              ].map((item) => {
                const img = getProductImageBySlug(item.slug);
                return (
                  <div key={item.slug} className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${item.bg}`}>
                    {img && <Image src={img} alt="" fill className="object-cover p-2" sizes="(max-width: 768px) 30vw, 15vw" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── Stats Bar ───── */}
        <section className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-[#e8f8ee] via-[#dcf4e6] to-[#d1efdd] shadow-lg">
          <div className="grid grid-cols-2 divide-[#c5e5d2] md:grid-cols-4 md:divide-x">
            {[
              { value: `${products.length}`, label: "Products", icon: "\u{1F4E6}" },
              { value: "2", label: "Categories", icon: "\u{1F3F7}\uFE0F" },
              { value: `${packSizeCount}`, label: "Pack Sizes", icon: "\u{1F4CF}" },
              { value: "Instant", label: "WhatsApp Order", icon: "\u{1F4F2}" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center px-4 py-6 text-center md:py-8">
                <span className="text-2xl">{stat.icon}</span>
                <span className="mt-2 text-2xl font-extrabold text-[#1d3a2c] md:text-3xl">{stat.value}</span>
                <span className="mt-0.5 text-xs font-medium text-[#3f8c63] md:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Best Sellers ───── */}
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold text-green-950 md:text-2xl">Best Sellers</h2>
            <Link href="/products" className="text-sm font-bold text-green-700 transition-colors hover:text-green-900">
              View all &rarr;
            </Link>
          </div>
          <div className="mt-5 flex gap-3 overflow-x-auto pb-4 scrollbar-none md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
            {bestSellers.map((product) => {
              const productImage = getProductImageBySlug(product.slug);
              const catColor = product.category === "tea" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700";
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group w-[45vw] shrink-0 overflow-hidden rounded-2xl border border-olive-200 bg-white shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] active:shadow-none md:w-auto"
                >
                  <div className="relative h-36 overflow-hidden bg-gradient-to-b from-olive-50 to-green-50 md:h-48">
                    {productImage ? (
                      <Image src={productImage} alt={product.nameEn} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 45vw, 25vw" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-semibold text-olive-400">Image soon</div>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catColor}`}>{product.category}</span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-bold text-green-950 md:text-base">{product.nameEn}</h3>
                    <p className="mt-1 text-xs font-semibold text-green-700">From Rs.&nbsp;{Math.min(...product.prices.map((p) => p.netPriceInr))}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ───── Why Choose Us ───── */}
        <section className="mt-16">
          <h2 className="text-center text-xl font-extrabold text-green-950 md:text-2xl">Why Choose ASVADAVAT</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {[
              { icon: "\u{2B50}", title: "Premium Quality", desc: "Sourced from trusted farms and estates across India.", bg: "from-green-50 to-emerald-50", border: "border-green-200" },
              { icon: "\u{1F331}", title: "Wide Range", desc: `${products.length} products across teas, masalas, and whole spices.`, bg: "from-emerald-50 to-teal-50", border: "border-emerald-200" },
              { icon: "\u{26A1}", title: "Easy Ordering", desc: "Add to basket, fill your details, and submit in seconds.", bg: "from-orange-50 to-amber-50", border: "border-orange-200" },
              { icon: "\u{1F4AC}", title: "WhatsApp Support", desc: "Reach us directly on WhatsApp for quick responses.", bg: "from-green-50 to-emerald-50", border: "border-green-200" },
            ].map((card) => (
              <div key={card.title} className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm md:p-6 ${card.bg} ${card.border}`}>
                <span className="text-2xl md:text-3xl">{card.icon}</span>
                <h3 className="mt-2 text-sm font-bold text-green-950 md:text-base">{card.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-olive-600 md:text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── How It Works ───── */}
        <section className="mt-16">
          <h2 className="text-center text-xl font-extrabold text-green-950 md:text-2xl">How It Works</h2>
          <div className="mt-6 grid grid-cols-3 gap-2 md:gap-6">
            {[
              { num: "1", label: "Browse", sub: "Search & filter products", bg: "bg-green-100 text-green-700" },
              { num: "2", label: "Add", sub: "Add items to enquiry", bg: "bg-orange-100 text-orange-700" },
              { num: "3", label: "Enquire", sub: "Submit or WhatsApp", bg: "bg-emerald-100 text-emerald-700" },
            ].map((s) => (
              <div key={s.num} className="rounded-xl bg-white p-3 text-center shadow-sm md:p-6">
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-lg font-extrabold md:h-14 md:w-14 md:text-xl ${s.bg}`}>{s.num}</div>
                <h3 className="mt-2 text-sm font-bold text-green-950 md:text-base">{s.label}</h3>
                <p className="mt-0.5 text-[11px] leading-tight text-olive-500 md:text-sm">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ───── WhatsApp CTA Banner ───── */}
      <section className="mt-16 bg-gradient-to-r from-[#d8f3e4] via-[#c9ecd9] to-[#bce4cd] px-4 py-10 text-[#1d3a2c] md:py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center md:flex-row md:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/70 backdrop-blur md:h-20 md:w-20">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9 md:h-11 md:w-11">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold md:text-2xl">Have Questions? We&apos;re on WhatsApp!</h2>
            <p className="mt-1 text-sm text-[#37684b] md:text-base">Need help choosing products or want a custom bulk quote? Message us directly and we&apos;ll respond right away.</p>
          </div>
          {WHATSAPP_NUMBER ? (
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to know more about your tea and spice products.")}`} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-[#3f8c63] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform active:scale-95 md:hover:scale-105">Chat on WhatsApp</a>
          ) : (
            <Link href="/enquiry" className="shrink-0 rounded-full bg-[#3f8c63] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform active:scale-95 md:hover:scale-105">Send an Enquiry</Link>
          )}
        </div>
      </section>

      {/* ───── All Products Preview ───── */}
      <div className="mx-auto w-full max-w-6xl px-4">
        <section className="mt-16 pb-12">
          <h2 className="text-center text-xl font-extrabold text-green-950 md:text-2xl">Our Complete Range</h2>
          <p className="mt-1 text-center text-sm text-olive-500">{products.length} products across {Object.keys(categoryLabels).length} categories</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 md:p-6">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-200 text-lg">{"\u{1F375}"}</span>
                <div>
                  <h3 className="text-base font-extrabold text-emerald-900 md:text-lg">{categoryLabels.tea}</h3>
                  <p className="text-xs text-emerald-600">{teaProducts.length} product{teaProducts.length !== 1 && "s"}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {teaProducts.map((p) => (
                  <li key={p.id}>
                    <Link href={`/products/${p.slug}`} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-100 active:bg-emerald-200">
                      <span className="flex-1">{p.nameEn}</span>
                      <span className="shrink-0 text-xs font-bold text-emerald-600">From Rs.&nbsp;{Math.min(...p.prices.map((pr) => pr.netPriceInr))}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-5 md:p-6">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-200 text-lg">{"\u{1F336}\uFE0F"}</span>
                <div>
                  <h3 className="text-base font-extrabold text-orange-900 md:text-lg">{categoryLabels.spices}</h3>
                  <p className="text-xs text-orange-600">{spiceProducts.length} product{spiceProducts.length !== 1 && "s"}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {spiceProducts.map((p) => (
                  <li key={p.id}>
                    <Link href={`/products/${p.slug}`} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-orange-800 transition-colors hover:bg-orange-100 active:bg-orange-200">
                      <span className="flex-1">{p.nameEn}</span>
                      <span className="shrink-0 text-xs font-bold text-orange-600">From Rs.&nbsp;{Math.min(...p.prices.map((pr) => pr.netPriceInr))}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/products" className="inline-block rounded-full bg-gradient-to-r from-green-700 to-green-900 px-8 py-3 text-sm font-bold text-green-50 shadow-lg transition-transform active:scale-95 md:hover:scale-105">Browse Full Catalog</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
