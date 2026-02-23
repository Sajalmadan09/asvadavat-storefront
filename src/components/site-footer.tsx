import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-amber-200 bg-gradient-to-b from-amber-900 to-amber-950 text-amber-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-extrabold text-white">ASVADAVAT</h3>
            <p className="mt-2 text-sm leading-relaxed text-amber-300">
              Premium tea and spices — sourced with care, delivered with love.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-amber-50">Quick Links</h4>
            <nav className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/products" className="text-amber-300 transition-colors hover:text-white">
                All Products
              </Link>
              <Link href="/products?category=tea" className="text-amber-300 transition-colors hover:text-white">
                Tea Collection
              </Link>
              <Link href="/products?category=spices" className="text-amber-300 transition-colors hover:text-white">
                Spices Collection
              </Link>
              <Link href="/enquiry" className="text-amber-300 transition-colors hover:text-white">
                Enquiry Basket
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-bold text-amber-50">Get in Touch</h4>
            <p className="mt-3 text-sm leading-relaxed text-amber-300">
              Have questions? Send us an enquiry through the website or reach out on WhatsApp.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-amber-800 pt-5 text-center text-xs text-amber-400">
          &copy; 2025 ASVADAVAT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
