"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";

export function SiteHeader() {
  const { totalLines } = useEnquiryStore();
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <header className="border-b border-amber-200 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="relative h-16 w-72 md:h-20 md:w-[28rem]">
          <Image
            src="/asvadavat-logo-header.png"
            alt="Asvadavat Spice and Tea Company"
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 288px, 448px"
            priority
          />
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-amber-900 md:gap-5">
          <Link href="/products">Products</Link>
          <Link href="/products?category=tea">Tea</Link>
          <Link href="/products?category=spices">Spices</Link>
          <Link href="/enquiry" className="rounded-full bg-amber-900 px-3 py-1 text-amber-50">
            Enquiry ({isHydrated ? totalLines : 0})
          </Link>
        </nav>
      </div>
    </header>
  );
}
