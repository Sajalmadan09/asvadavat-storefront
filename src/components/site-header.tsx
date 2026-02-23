"use client";

import Link from "next/link";
import { useEnquiryStore } from "@/components/enquiry-store";

export function SiteHeader() {
  const { totalLines } = useEnquiryStore();

  return (
    <header className="border-b border-amber-200 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-wide text-amber-900">
          ASVADAVAT
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-amber-900">
          <Link href="/products">Products</Link>
          <Link href="/products?category=tea">Tea</Link>
          <Link href="/products?category=spices">Spices</Link>
          <Link href="/enquiry" className="rounded-full bg-amber-900 px-3 py-1 text-amber-50">
            Enquiry ({totalLines})
          </Link>
        </nav>
      </div>
    </header>
  );
}
