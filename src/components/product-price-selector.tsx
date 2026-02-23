"use client";

import { useState } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";
import type { Product } from "@/types/catalog";

export function ProductPriceSelector({ product }: { product: Product }) {
  const { addItem } = useEnquiryStore();
  const [selectedPackSize, setSelectedPackSize] = useState(product.prices[0].packSize);

  const selectedPrice =
    product.prices.find((price) => price.packSize === selectedPackSize) ?? product.prices[0];

  return (
    <div className="rounded-xl border border-amber-200 bg-white p-4">
      <h3 className="text-lg font-semibold text-amber-950">Select pack size</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {product.prices.map((price) => (
          <button
            key={`${product.id}-${price.packSize}`}
            type="button"
            onClick={() => setSelectedPackSize(price.packSize)}
            className={`rounded-full border px-3 py-1 text-sm font-medium ${
              selectedPackSize === price.packSize
                ? "border-amber-900 bg-amber-900 text-amber-50"
                : "border-amber-300 text-amber-900"
            }`}
          >
            {price.packSize}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-amber-900">
        Net price: <span className="text-xl font-bold">Rs. {selectedPrice.netPriceInr}</span>
      </p>
      <button
        type="button"
        onClick={() =>
          addItem({
            productId: product.id,
            productSlug: product.slug,
            productName: product.nameEn,
            packSize: selectedPrice.packSize,
            netPriceInr: selectedPrice.netPriceInr,
            qty: 1,
          })
        }
        className="mt-4 rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-amber-50 hover:bg-amber-700"
      >
        Add to enquiry
      </button>
    </div>
  );
}
