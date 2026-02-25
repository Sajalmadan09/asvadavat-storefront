import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#d6e9dc] bg-gradient-to-b from-[#eff9f2] to-[#e3f3e9] text-[#2b503a]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-extrabold text-[#1d3a2c]">ASVADAVAT</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4c7c62]">
              Premium tea and spices — sourced with care, delivered with love.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#27543d]">Quick Links</h4>
            <nav className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/products" className="text-[#4c7c62] transition-colors hover:text-[#1d3a2c]">
                All Products
              </Link>
              <Link href="/products?category=tea" className="text-[#4c7c62] transition-colors hover:text-[#1d3a2c]">
                Tea Collection
              </Link>
              <Link href="/products?category=spices" className="text-[#4c7c62] transition-colors hover:text-[#1d3a2c]">
                Spices Collection
              </Link>
              <Link href="/enquiry" className="text-[#4c7c62] transition-colors hover:text-[#1d3a2c]">
                Enquiry Basket
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-bold text-[#27543d]">Get in Touch</h4>
            <p className="mt-3 text-sm leading-relaxed text-[#4c7c62]">
              Have questions? Send us an enquiry through the website or reach out on WhatsApp.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-[#cde6d7] pt-5 text-center text-xs text-[#6b977f]">
          &copy; 2025 ASVADAVAT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
