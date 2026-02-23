"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSyncExternalStore } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";

export function SiteHeader() {
  const { totalLines } = useEnquiryStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const count = isHydrated ? totalLines : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/80 bg-white shadow-sm">
      {/* Top row: logo centered, mobile controls on right */}
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex items-center justify-between py-3 md:justify-center md:py-4">
          {/* Left flourish — desktop only */}
          <div className="hidden flex-1 items-center justify-end pr-4 md:flex" aria-hidden>
            <svg viewBox="0 0 280 80" className="h-14 w-52 lg:h-20 lg:w-64" fill="none">
              {/* Main ornamental vine flowing right to left */}
              <path d="M280 40 C265 40, 258 28, 245 25 C230 22, 222 35, 210 38 C198 41, 190 20, 175 18 C160 16, 155 40, 140 42 C125 44, 118 22, 100 24 C85 26, 78 40, 60 38" stroke="#d4a056" strokeWidth="1.8" strokeLinecap="round" />
              {/* Spiral curl at the end */}
              <path d="M60 38 C50 36, 42 30, 38 24 C34 18, 38 12, 44 14 C50 16, 48 24, 44 28" stroke="#d4a056" strokeWidth="1.6" strokeLinecap="round" />
              {/* Upper decorative branch with curl */}
              <path d="M245 25 C248 14, 255 8, 260 6 C265 4, 268 8, 264 12 C260 16, 253 14, 250 18" stroke="#c87f3a" strokeWidth="1.3" strokeLinecap="round" />
              {/* Leaf cluster at 245 */}
              <path d="M240 22 C234 12, 228 8, 222 10" stroke="#5b8c3e" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M238 20 C230 14, 226 16, 224 20" stroke="#6da34d" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M242 24 C236 16, 230 12, 226 14" stroke="#4a7c31" strokeWidth="1" strokeLinecap="round" fill="#5b8c3e" fillOpacity="0.15" />
              {/* Ornamental curl branch at 175 */}
              <path d="M175 18 C168 8, 160 4, 155 6 C150 8, 152 16, 158 14 C164 12, 162 6, 158 8" stroke="#c87f3a" strokeWidth="1.3" strokeLinecap="round" />
              {/* Leaf pair at 175 */}
              <path d="M172 16 C166 10, 160 12, 164 18" stroke="#5b8c3e" strokeWidth="1.2" fill="#5b8c3e" fillOpacity="0.12" />
              <path d="M178 18 C180 10, 186 8, 184 16" stroke="#6da34d" strokeWidth="1.2" fill="#6da34d" fillOpacity="0.12" />
              {/* Lower decorative branch with curl at 210 */}
              <path d="M210 38 C208 48, 202 56, 196 58 C190 60, 188 54, 192 52 C196 50, 200 54, 198 58" stroke="#c87f3a" strokeWidth="1.3" strokeLinecap="round" />
              {/* Leaf pair at 210 */}
              <path d="M206 42 C200 50, 194 48, 198 42" stroke="#4a7c31" strokeWidth="1.2" fill="#4a7c31" fillOpacity="0.12" />
              <path d="M214 40 C218 50, 214 54, 210 48" stroke="#6da34d" strokeWidth="1.2" fill="#6da34d" fillOpacity="0.12" />
              {/* Curl branch at 140 */}
              <path d="M140 42 C136 52, 128 58, 122 56 C116 54, 118 46, 124 48 C130 50, 126 56, 122 54" stroke="#d4a056" strokeWidth="1.2" strokeLinecap="round" />
              {/* Leaf at 100 */}
              <path d="M98 22 C90 14, 84 16, 88 24" stroke="#5b8c3e" strokeWidth="1.3" fill="#5b8c3e" fillOpacity="0.15" />
              <path d="M104 24 C108 14, 114 12, 110 22" stroke="#6da34d" strokeWidth="1.2" fill="#6da34d" fillOpacity="0.12" />
              {/* Spice dots */}
              <circle cx="245" cy="25" r="4" fill="#e8a832" fillOpacity="0.5" />
              <circle cx="210" cy="38" r="3.5" fill="#e07028" fillOpacity="0.45" />
              <circle cx="175" cy="18" r="4" fill="#d44030" fillOpacity="0.4" />
              <circle cx="140" cy="42" r="3" fill="#e8a832" fillOpacity="0.45" />
              <circle cx="100" cy="24" r="3.5" fill="#5b8c3e" fillOpacity="0.4" />
              <circle cx="60" cy="38" r="3" fill="#c87f3a" fillOpacity="0.45" />
              {/* Tiny accent dots */}
              <circle cx="230" cy="30" r="1.5" fill="#d4a056" fillOpacity="0.3" />
              <circle cx="188" cy="28" r="1.5" fill="#e07028" fillOpacity="0.3" />
              <circle cx="155" cy="32" r="1.5" fill="#d4a056" fillOpacity="0.3" />
              <circle cx="118" cy="34" r="1.5" fill="#5b8c3e" fillOpacity="0.3" />
              <circle cx="78" cy="36" r="1.5" fill="#c87f3a" fillOpacity="0.3" />
            </svg>
          </div>

          {/* Logo */}
          <Link href="/" className="relative block h-20 w-72 shrink-0 md:h-28 md:w-[32rem] lg:h-36 lg:w-[42rem]">
            <Image
              src="/asvadavat-logo-header.png"
              alt="Asvadavat — Spice & Tea Company"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 288px, (max-width: 1024px) 512px, 672px"
              priority
            />
          </Link>

          {/* Right flourish — desktop only (mirrored) */}
          <div className="hidden flex-1 items-center justify-start pl-4 md:flex" aria-hidden>
            <svg viewBox="0 0 280 80" className="h-14 w-52 lg:h-20 lg:w-64" fill="none">
              {/* Main ornamental vine flowing left to right */}
              <path d="M0 40 C15 40, 22 28, 35 25 C50 22, 58 35, 70 38 C82 41, 90 20, 105 18 C120 16, 125 40, 140 42 C155 44, 162 22, 180 24 C195 26, 202 40, 220 38" stroke="#d4a056" strokeWidth="1.8" strokeLinecap="round" />
              {/* Spiral curl at the end */}
              <path d="M220 38 C230 36, 238 30, 242 24 C246 18, 242 12, 236 14 C230 16, 232 24, 236 28" stroke="#d4a056" strokeWidth="1.6" strokeLinecap="round" />
              {/* Upper decorative branch with curl */}
              <path d="M35 25 C32 14, 25 8, 20 6 C15 4, 12 8, 16 12 C20 16, 27 14, 30 18" stroke="#c87f3a" strokeWidth="1.3" strokeLinecap="round" />
              {/* Leaf cluster at 35 */}
              <path d="M40 22 C46 12, 52 8, 58 10" stroke="#5b8c3e" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M42 20 C50 14, 54 16, 56 20" stroke="#6da34d" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M38 24 C44 16, 50 12, 54 14" stroke="#4a7c31" strokeWidth="1" strokeLinecap="round" fill="#5b8c3e" fillOpacity="0.15" />
              {/* Ornamental curl branch at 105 */}
              <path d="M105 18 C112 8, 120 4, 125 6 C130 8, 128 16, 122 14 C116 12, 118 6, 122 8" stroke="#c87f3a" strokeWidth="1.3" strokeLinecap="round" />
              {/* Leaf pair at 105 */}
              <path d="M108 16 C114 10, 120 12, 116 18" stroke="#5b8c3e" strokeWidth="1.2" fill="#5b8c3e" fillOpacity="0.12" />
              <path d="M102 18 C100 10, 94 8, 96 16" stroke="#6da34d" strokeWidth="1.2" fill="#6da34d" fillOpacity="0.12" />
              {/* Lower decorative branch with curl at 70 */}
              <path d="M70 38 C72 48, 78 56, 84 58 C90 60, 92 54, 88 52 C84 50, 80 54, 82 58" stroke="#c87f3a" strokeWidth="1.3" strokeLinecap="round" />
              {/* Leaf pair at 70 */}
              <path d="M74 42 C80 50, 86 48, 82 42" stroke="#4a7c31" strokeWidth="1.2" fill="#4a7c31" fillOpacity="0.12" />
              <path d="M66 40 C62 50, 66 54, 70 48" stroke="#6da34d" strokeWidth="1.2" fill="#6da34d" fillOpacity="0.12" />
              {/* Curl branch at 140 */}
              <path d="M140 42 C144 52, 152 58, 158 56 C164 54, 162 46, 156 48 C150 50, 154 56, 158 54" stroke="#d4a056" strokeWidth="1.2" strokeLinecap="round" />
              {/* Leaf at 180 */}
              <path d="M182 22 C190 14, 196 16, 192 24" stroke="#5b8c3e" strokeWidth="1.3" fill="#5b8c3e" fillOpacity="0.15" />
              <path d="M176 24 C172 14, 166 12, 170 22" stroke="#6da34d" strokeWidth="1.2" fill="#6da34d" fillOpacity="0.12" />
              {/* Spice dots */}
              <circle cx="35" cy="25" r="4" fill="#e8a832" fillOpacity="0.5" />
              <circle cx="70" cy="38" r="3.5" fill="#e07028" fillOpacity="0.45" />
              <circle cx="105" cy="18" r="4" fill="#d44030" fillOpacity="0.4" />
              <circle cx="140" cy="42" r="3" fill="#e8a832" fillOpacity="0.45" />
              <circle cx="180" cy="24" r="3.5" fill="#5b8c3e" fillOpacity="0.4" />
              <circle cx="220" cy="38" r="3" fill="#c87f3a" fillOpacity="0.45" />
              {/* Tiny accent dots */}
              <circle cx="50" cy="30" r="1.5" fill="#d4a056" fillOpacity="0.3" />
              <circle cx="92" cy="28" r="1.5" fill="#e07028" fillOpacity="0.3" />
              <circle cx="125" cy="32" r="1.5" fill="#d4a056" fillOpacity="0.3" />
              <circle cx="162" cy="34" r="1.5" fill="#5b8c3e" fillOpacity="0.3" />
              <circle cx="202" cy="36" r="1.5" fill="#c87f3a" fillOpacity="0.3" />
            </svg>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <Link href="/enquiry" className="relative rounded-lg p-2.5 text-amber-900 active:bg-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {count > 0 && (
                <span className="animate-badge-pop absolute right-1 top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2.5 text-amber-900 active:bg-amber-100"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop nav bar */}
        <nav className="hidden items-center justify-center gap-1 border-t border-amber-100 py-2 md:flex">
          <Link
            href="/products"
            className="rounded-lg px-4 py-2 text-sm font-semibold tracking-wide text-amber-900 transition-colors hover:bg-amber-100"
          >
            Products
          </Link>
          <span className="text-amber-200">|</span>
          <Link
            href="/products?category=tea"
            className="rounded-lg px-4 py-2 text-sm font-semibold tracking-wide text-amber-900 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
          >
            Tea
          </Link>
          <span className="text-amber-200">|</span>
          <Link
            href="/products?category=spices"
            className="rounded-lg px-4 py-2 text-sm font-semibold tracking-wide text-amber-900 transition-colors hover:bg-orange-50 hover:text-orange-800"
          >
            Spices
          </Link>
          <span className="text-amber-200">|</span>
          <Link
            href="/enquiry"
            className="relative rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-6 py-2 text-sm font-bold text-amber-50 shadow transition-transform hover:scale-105 active:scale-95"
          >
            Enquiry
            {count > 0 && (
              <span className="animate-badge-pop absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("asvadavat-restart-tour"))}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-amber-200 text-sm font-bold text-amber-600 transition-colors hover:bg-amber-100"
            aria-label="Help tour"
            title="Show guide"
          >
            ?
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="animate-slide-down border-t border-amber-100 bg-white px-4 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold text-amber-900 active:bg-amber-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-lg">{"\u{1F6CD}\uFE0F"}</span>
              All Products
            </Link>
            <Link
              href="/products?category=tea"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold text-amber-900 active:bg-emerald-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-lg">{"\u{1F375}"}</span>
              Tea
            </Link>
            <Link
              href="/products?category=spices"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold text-amber-900 active:bg-orange-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-lg">{"\u{1F336}\uFE0F"}</span>
              Spices
            </Link>
            <div className="my-2 border-t border-amber-100" />
            <Link
              href="/enquiry"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 px-4 py-3.5 text-base font-bold text-amber-50 shadow-md active:scale-[0.98]"
            >
              {"\u{1F4CB}"} Enquiry Basket {count > 0 && `(${count})`}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new Event("asvadavat-restart-tour"));
              }}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-amber-200 px-4 py-3 text-sm font-medium text-amber-700 active:bg-amber-50"
            >
              {"\u{2753}"} Show Guide
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
