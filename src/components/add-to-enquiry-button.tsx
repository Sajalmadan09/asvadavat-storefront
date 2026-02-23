"use client";

import { useState } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";
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
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          productId,
          productSlug,
          productName,
          packSize: price.packSize,
          netPriceInr: price.netPriceInr,
          qty: 1,
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
      className="rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-amber-50 hover:bg-amber-700"
    >
      {added ? "Added" : `Add (${price.packSize})`}
    </button>
  );
}
