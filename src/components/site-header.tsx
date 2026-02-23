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
    <header className="sticky top-0 z-40 border-b border-amber-200/80 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2.5 md:py-3">
        {/* Logo */}
        <Link href="/" className="relative h-14 w-56 shrink-0 md:h-16 md:w-72 lg:h-20 lg:w-96">
          <Image
            src="/asvadavat-logo-header.png"
            alt="Asvadavat"
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, 384px"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/products"
            className="rounded-lg px-3 py-2 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100"
          >
            Products
          </Link>
          <Link
            href="/products?category=tea"
            className="rounded-lg px-3 py-2 text-sm font-medium text-amber-900 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
          >
            Tea
          </Link>
          <Link
            href="/products?category=spices"
            className="rounded-lg px-3 py-2 text-sm font-medium text-amber-900 transition-colors hover:bg-orange-50 hover:text-orange-800"
          >
            Spices
          </Link>
          <Link
            href="/enquiry"
            className="relative ml-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-5 py-2 text-sm font-bold text-amber-50 shadow transition-transform hover:scale-105 active:scale-95"
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
