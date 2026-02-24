"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSyncExternalStore } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/products?category=tea", label: "Tea" },
  { href: "/products?category=spices", label: "Spices" },
] as const;

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
    <>
      {/* ── Desktop: logo banner (scrolls away) ── */}
      <div className="relative hidden w-full overflow-hidden border-b border-[#e8e0d0] bg-white md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[35%]" aria-hidden>
          <Image src="/header-spice-left.png" alt="" fill className="object-cover object-right" sizes="35vw" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white to-transparent" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[35%]" aria-hidden>
          <Image src="/header-spice-right.png" alt="" fill className="object-cover object-left" sizes="35vw" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-5">
          <Link href="/" className="relative block h-28 w-[32rem] shrink-0 lg:h-36 lg:w-[42rem]">
            <Image
              src="/asvadavat-logo-header.png"
              alt="Asvadavat — Spice & Tea Company"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 512px, 672px"
              priority
            />
          </Link>
        </div>
      </div>

      {/* ── Desktop: sticky nav bar ── */}
      <nav className="sticky top-0 z-40 hidden items-center justify-center gap-1 border-b border-[#e8e0d0] bg-white py-2 shadow-sm md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative rounded-lg px-4 py-2 text-sm font-medium tracking-wide text-[#1a1a1a] transition-colors hover:text-[#2d6a4f]"
          >
            {link.label}
            <span className="absolute inset-x-2 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-[#2d6a4f] transition-transform group-hover:scale-x-100" />
          </Link>
        ))}
        <span className="mx-1 text-[#e8e0d0]">|</span>
        <Link
          href="/enquiry"
          className="relative rounded-full bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] px-6 py-2 text-sm font-bold text-white shadow transition-transform hover:scale-105 active:scale-95"
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
          className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e0d0] text-sm font-bold text-[#2d6a4f] transition-colors hover:bg-[#f0ebe3]"
          aria-label="Help tour"
          title="Show guide"
        >
          ?
        </button>
      </nav>

      {/* ── Mobile: premium sticky navbar ── */}
      <div className="sticky top-0 z-40 border-b border-[#e8e0d0] bg-white shadow-sm md:hidden">
        <div className="flex items-center justify-between px-4 py-2.5">
          {/* Left: Logo — anchor of the page */}
          <Link href="/" className="flex flex-col items-start">
            <div className="relative h-10 w-36">
              <Image
                src="/asvadavat-logo-header.png"
                alt="Asvadavat"
                fill
                className="object-contain object-left"
                sizes="144px"
                priority
              />
            </div>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] px-3.5 py-2 text-xs font-bold text-white shadow active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Buy
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 text-[#1a1a1a] active:bg-[#f0ebe3]"
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

        {/* Inline nav links row — visible below the main bar */}
        <div className="flex items-center gap-1 border-t border-[#e8e0d0]/60 px-4 py-1.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1 text-xs font-medium text-[#1a1a1a] transition-colors active:bg-[#f0ebe3]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/enquiry"
            className="relative ml-auto rounded-md p-1.5 text-[#1a1a1a] active:bg-[#f0ebe3]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {count > 0 && (
              <span className="animate-badge-pop absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="sticky top-[6.5rem] z-40 animate-slide-down border-b border-[#e8e0d0] bg-white px-4 pb-5 pt-2 shadow-md md:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-[#1a1a1a] active:bg-[#f0ebe3]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f5e9] text-lg">{"\u{1F6CD}\uFE0F"}</span>
              All Products
            </Link>
            <Link
              href="/products?category=tea"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-[#1a1a1a] active:bg-[#f0ebe3]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e0f2f1] text-lg">{"\u{1F375}"}</span>
              Tea
            </Link>
            <Link
              href="/products?category=spices"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-[#1a1a1a] active:bg-[#f0ebe3]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff3e0] text-lg">{"\u{1F336}\uFE0F"}</span>
              Spices
            </Link>
            <div className="my-2 border-t border-[#e8e0d0]" />
            <Link
              href="/enquiry"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] px-4 py-3.5 text-base font-bold text-white shadow-md active:scale-[0.98]"
            >
              Enquiry Basket {count > 0 && `(${count})`}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new Event("asvadavat-restart-tour"));
              }}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-[#e8e0d0] px-4 py-3 text-sm font-medium text-[#2d6a4f] active:bg-[#f0ebe3]"
            >
              {"\u{2753}"} Show Guide
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
