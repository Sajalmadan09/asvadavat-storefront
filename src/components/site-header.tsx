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
      {/* Top row: logo centered with spice fillers edge-to-edge */}
      <div className="relative w-full overflow-hidden">
        {/* Left spice filler — full bleed */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[30%] md:w-[35%]" aria-hidden>
          <Image
            src="/header-spice-left.png"
            alt=""
            fill
            className="object-cover object-right"
            sizes="35vw"
          />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white to-transparent md:w-1/3" />
        </div>

        {/* Right spice filler — hidden on mobile to keep menu/cart visible */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[35%] md:block" aria-hidden>
          <Image
            src="/header-spice-right.png"
            alt=""
            fill
            className="object-cover object-left"
            sizes="35vw"
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent" />
        </div>

        {/* Center content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:justify-center md:py-5">
          {/* Logo — left on mobile, centered on desktop */}
          <Link href="/" className="relative block h-12 w-40 shrink-0 md:h-28 md:w-[32rem] lg:h-36 lg:w-[42rem]">
            <Image
              src="/asvadavat-logo-header.png"
              alt="Asvadavat — Spice & Tea Company"
              fill
              className="object-contain object-left md:object-center"
              sizes="(max-width: 768px) 160px, (max-width: 1024px) 512px, 672px"
              priority
            />
          </Link>

          {/* Mobile controls — right side for thumb access */}
          <div className="flex items-center gap-0.5 md:hidden">
            <Link
              href="/products"
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-3.5 py-2 text-xs font-bold text-amber-50 shadow active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Buy
            </Link>
            <Link href="/enquiry" className="relative rounded-lg p-2 text-amber-900 active:bg-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {count > 0 && (
                <span className="animate-badge-pop absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-white">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 text-amber-900 active:bg-amber-100"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav bar */}
      <nav className="relative z-10 hidden items-center justify-center gap-1 border-t border-amber-100 bg-white py-2 md:flex">
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
