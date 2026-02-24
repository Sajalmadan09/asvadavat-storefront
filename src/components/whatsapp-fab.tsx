"use client";

import { useState } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function buildCartMessage(
  items: { productName: string; packSize: string; qty: number; netPriceInr: number }[],
) {
  const total = items.reduce((s, i) => s + i.netPriceInr * i.qty, 0);
  const lines = items.map(
    (item, idx) =>
      `${idx + 1}. ${item.productName} (${item.packSize}) × ${item.qty} — ₹${item.netPriceInr}`,
  );
  return [
    "Hi ASVADAVAT! 🙏",
    "",
    "I'd like to enquire about the following products:",
    "",
    ...lines,
    "",
    `Estimated total: ₹${total}`,
    "",
    "Please share availability and delivery details. Thank you!",
  ].join("\n");
}

const EMPTY_CART_OPTIONS = [
  {
    id: "enquiry",
    icon: "📦",
    label: "General Product Enquiry",
    description: "Ask about products, pricing, availability, or bulk orders",
    message: [
      "Hi ASVADAVAT! 🙏",
      "",
      "I'd like to enquire about your products.",
      "",
      "Could you help me with:",
      "• Product availability",
      "• Pricing and pack sizes",
      "• Bulk order options",
      "",
      "Looking forward to hearing from you!",
    ].join("\n"),
  },
  {
    id: "complaint",
    icon: "⚠️",
    label: "Quality / Product Complaint",
    description: "Report an issue with a product you've received",
    message: [
      "Hi ASVADAVAT,",
      "",
      "I'd like to raise a concern regarding a product I received.",
      "",
      "Product name: ",
      "Pack size: ",
      "Issue: ",
      "Purchase date (approx): ",
      "",
      "Please look into this at the earliest. Thank you.",
    ].join("\n"),
  },
] as const;

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function WhatsAppFab() {
  const { items } = useEnquiryStore();
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick() {
    if (items.length > 0) {
      openWhatsApp(buildCartMessage(items));
    } else {
      setModalOpen(true);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 active:scale-95 md:h-16 md:w-16"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 md:h-8 md:w-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        {items.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {items.reduce((s, i) => s + i.qty, 0)}
          </span>
        )}
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setModalOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close"
          />
          <div className="animate-slide-up relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
            <div className="mb-1 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-green-950">Chat with us</h3>
                <p className="mt-0.5 text-sm text-olive-500">Your enquiry basket is empty. How can we help?</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-olive-400 transition-colors hover:bg-green-50 hover:text-green-700"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {EMPTY_CART_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    openWhatsApp(option.message);
                    setModalOpen(false);
                  }}
                  className="flex w-full items-start gap-3 rounded-2xl border border-olive-100 bg-green-50/50 px-4 py-4 text-left transition-all hover:border-green-300 hover:bg-green-50 active:scale-[0.98]"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    {option.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-green-950">{option.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-olive-500">{option.description}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="mt-2 h-4 w-4 shrink-0 text-olive-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mt-4 w-full rounded-xl border border-olive-200 py-3 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50 active:bg-green-100"
            >
              Continue Shopping
            </button>

            <p className="mt-3 text-center text-[11px] text-olive-400">
              Tip: Add products to your enquiry basket first for a pre-filled message!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
