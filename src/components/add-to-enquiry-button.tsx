"use client";

import { useState } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";
import { useToast } from "@/components/toast";
import type { ProductPrice } from "@/types/catalog";

type AddToEnquiryButtonProps = {
  productId: string;
  productSlug: string;
  productName: string;
  price: ProductPrice;
};

export function AddToEnquiryButton({
  productId,
  productSlug,
  productName,
  price,
}: AddToEnquiryButtonProps) {
  const { addItem } = useEnquiryStore();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      disabled={added}
      onClick={() => {
        addItem({
          productId,
          productSlug,
          productName,
          packSize: price.packSize,
          netPriceInr: price.netPriceInr,
          qty: 1,
        });
        showToast(productName);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className={`rounded-lg px-4 py-2.5 text-sm font-bold shadow transition-all active:scale-95 ${
        added
          ? "bg-emerald-600 text-white"
          : "bg-gradient-to-r from-green-700 to-green-900 text-green-50 hover:shadow-md"
      }`}
    >
      {added ? "\u2713 Added" : `Add (${price.packSize})`}
    </button>
  );
}
