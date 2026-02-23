"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useEnquiryStore } from "@/components/enquiry-store";
import { formatWhatsappMessage } from "@/lib/enquiry";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default function EnquiryPage() {
  const { items, removeItem, clearItems } = useEnquiryStore();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const totalEstimate = useMemo(
    () => items.reduce((sum, item) => sum + item.netPriceInr * item.qty, 0),
    [items],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const payload = { customerName: customerName.trim(), phone: phone.trim(), city: city.trim(), notes, items };

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      clearItems();
      setCustomerName("");
      setPhone("");
      setCity("");
      setNotes("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const whatsappUrl = (() => {
    if (!WHATSAPP_NUMBER || items.length === 0) return null;
    const text = formatWhatsappMessage({ customerName, phone, city, notes, items });
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  })();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-8">
      <h1 className="text-2xl font-extrabold text-amber-950 md:text-3xl">Enquiry Basket</h1>
      <p className="mt-1 text-sm text-amber-700">
        Review your selection and submit your requirement.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-6">
        {/* Selected items */}
        <section className="rounded-2xl border border-amber-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-amber-100 px-5 py-4">
            <h2 className="text-base font-bold text-amber-950">
              Selected Items{" "}
              <span className="text-sm font-normal text-amber-500">({items.length})</span>
            </h2>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearItems}
                className="text-xs font-bold text-red-500 transition-colors hover:text-red-700"
              >
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-3xl">{"\u{1F6D2}"}</p>
              <p className="mt-2 text-sm font-bold text-amber-800">Your basket is empty</p>
              <p className="mt-1 text-xs text-amber-500">Browse products and add items here.</p>
              <Link
                href="/products"
                className="mt-4 inline-block rounded-full bg-amber-800 px-5 py-2 text-sm font-bold text-white shadow transition-transform active:scale-95"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div>
              <ul className="divide-y divide-amber-100">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.packSize}`}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-amber-950">
                        {item.productName}
                      </p>
                      <p className="mt-0.5 text-xs text-amber-600">
                        {item.packSize} &times; {item.qty} &mdash; Rs.&nbsp;{item.netPriceInr}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.packSize)}
                      className="ml-3 shrink-0 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 active:bg-red-100"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-800">Estimated Total</span>
                  <span className="text-xl font-extrabold text-amber-950">
                    Rs.&nbsp;{totalEstimate}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Customer details form */}
        <section className="rounded-2xl border border-amber-200 bg-white shadow-sm">
          <div className="border-b border-amber-100 px-5 py-4">
            <h2 className="text-base font-bold text-amber-950">Your Details</h2>
          </div>
          <form onSubmit={onSubmit} className="space-y-3 px-5 py-4">
            <div>
              <input
                required
                minLength={2}
                maxLength={80}
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-amber-200 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <input
                required
                type="tel"
                minLength={8}
                maxLength={15}
                pattern="[0-9+\-\s]{8,15}"
                title="Please enter a valid phone number (8-15 digits)"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number (e.g. +91 98765 43210)"
                className="w-full rounded-xl border border-amber-200 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <input
                required
                minLength={2}
                maxLength={80}
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="City"
                className="w-full rounded-xl border border-amber-200 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              maxLength={500}
              placeholder="Additional notes (optional)"
              className="min-h-24 w-full rounded-xl border border-amber-200 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
            <button
              type="submit"
              disabled={items.length === 0 || status === "submitting"}
              className="w-full rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 py-3.5 text-sm font-bold text-amber-50 shadow-lg transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>

          {whatsappUrl && (
            <div className="border-t border-amber-100 px-5 py-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Send via WhatsApp
              </a>
            </div>
          )}

          {status === "success" && (
            <div className="mx-5 mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              Your enquiry has been submitted successfully! We&apos;ll get back to you soon.
            </div>
          )}

          {status === "error" && (
            <div className="mx-5 mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              <p className="font-semibold">Something went wrong. Please try again.</p>
              <p className="mt-1 text-xs text-red-500">
                Make sure your name, phone number (8+ digits), and city are filled in correctly.
                You can also use the WhatsApp button above to send your enquiry directly.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
