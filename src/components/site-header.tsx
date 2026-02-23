"use client";

import Image from "next/image";
import Link from "next/link";
import { useEnquiryStore } from "@/components/enquiry-store";

export function SiteHeader() {
  const { totalLines } = useEnquiryStore();

  return (
    <header className="border-b border-amber-200 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="relative h-10 w-48 md:h-12 md:w-60">
          <Image
            src="/asvadavat-logo-clean.png"
            alt="Asvadavat Spice and Tea Company"
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 192px, 240px"
            priority
          />
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-amber-900 md:gap-5">
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
