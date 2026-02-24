"use client";

import { useState } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";
import { useToast } from "@/components/toast";
import type { Product } from "@/types/catalog";

export function ProductPriceSelector({ product }: { product: Product }) {
  const { addItem } = useEnquiryStore();
  const { showToast } = useToast();
  const [selectedPackSize, setSelectedPackSize] = useState(product.prices[0].packSize);
  const [justAdded, setJustAdded] = useState(false);

  const selectedPrice =
    product.prices.find((price) => price.packSize === selectedPackSize) ?? product.prices[0];

  function handleAdd() {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.nameEn,
      packSize: selectedPrice.packSize,
      netPriceInr: selectedPrice.netPriceInr,
      qty: 1,
    });
    showToast(product.nameEn);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <div className="rounded-2xl border border-olive-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-green-950">Select Pack Size</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {product.prices.map((price) => (
          <button
            key={`${product.id}-${price.packSize}`}
            type="button"
            onClick={() => setSelectedPackSize(price.packSize)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all ${
              selectedPackSize === price.packSize
                ? "border-green-700 bg-green-700 text-white shadow"
                : "border-olive-200 text-green-800 hover:border-green-400"
            }`}
          >
            {price.packSize}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-green-700">Net Price</p>
        <p className="mt-0.5 text-3xl font-extrabold text-green-950">Rs.&nbsp;{selectedPrice.netPriceInr}</p>
      </div>

      <button
        type="button"
        disabled={justAdded}
        onClick={handleAdd}
        className={`mt-4 w-full rounded-xl py-3.5 text-sm font-bold shadow-lg transition-all active:scale-[0.98] ${
          justAdded
            ? "bg-emerald-600 text-white"
            : "bg-gradient-to-r from-green-700 to-green-900 text-green-50 hover:shadow-xl"
        }`}
      >
        {justAdded ? "\u2713 Added to Enquiry!" : "Add to Enquiry"}
      </button>
    </div>
  );
}
