"use client";

import { FormEvent, useMemo, useState } from "react";
import { formatWhatsappMessage } from "@/lib/enquiry";
import { useEnquiryStore } from "@/components/enquiry-store";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default function EnquiryPage() {
  const { items, removeItem, clearItems } = useEnquiryStore();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string>("");

  const totalEstimate = useMemo(
    () => items.reduce((sum, item) => sum + item.netPriceInr * item.qty, 0),
    [items],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");

    const payload = {
      customerName,
      phone,
      city,
      notes,
      items,
    };

    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const message = await response.text();
      setStatus(`Failed: ${message}`);
      return;
    }

    setStatus("Enquiry submitted.");
  }

  const whatsappUrl = (() => {
    if (!WHATSAPP_NUMBER || items.length === 0) return null;
    const text = formatWhatsappMessage({ customerName, phone, city, notes, items });
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  })();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-950">Enquiry Basket</h1>
      <p className="mt-2 text-sm text-amber-800">Submit your requirement and we will contact you.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-amber-200 bg-white p-4">
          <h2 className="text-lg font-semibold">Selected items</h2>
          {items.length === 0 ? (
            <p className="mt-3 text-sm text-amber-700">No products added yet.</p>
          ) : (
            <>
              <ul className="mt-3 space-y-3">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.packSize}`}
                    className="flex items-center justify-between border-b border-amber-100 pb-2 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-amber-950">{item.productName}</p>
                      <p className="text-amber-800">
                        {item.packSize} x {item.qty} - Rs. {item.netPriceInr}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.packSize)}
                      className="text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold">Estimated total: Rs. {totalEstimate}</p>
              <button
                type="button"
                onClick={clearItems}
                className="mt-3 rounded-md border border-amber-300 px-3 py-2 text-sm font-semibold text-amber-900"
              >
                Clear basket
              </button>
            </>
          )}
        </section>

        <section className="rounded-xl border border-amber-200 bg-white p-4">
          <h2 className="text-lg font-semibold">Customer details</h2>
          <form onSubmit={onSubmit} className="mt-3 space-y-3">
            <input
              required
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Full name"
              className="w-full rounded-md border border-amber-200 px-3 py-2 text-sm"
            />
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Phone number"
              className="w-full rounded-md border border-amber-200 px-3 py-2 text-sm"
            />
            <input
              required
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="City"
              className="w-full rounded-md border border-amber-200 px-3 py-2 text-sm"
            />
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Additional notes"
              className="min-h-28 w-full rounded-md border border-amber-200 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-amber-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Submit enquiry
            </button>
          </form>
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block rounded-md border border-green-600 px-4 py-2 text-center text-sm font-semibold text-green-700"
            >
              Send via WhatsApp
            </a>
          ) : null}
          {status ? <p className="mt-3 text-sm text-amber-900">{status}</p> : null}
        </section>
      </div>
    </main>
  );
}
