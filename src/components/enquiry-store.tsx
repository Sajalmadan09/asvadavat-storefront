"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { EnquiryItem } from "@/types/catalog";

type EnquiryStoreValue = {
  items: EnquiryItem[];
  addItem: (item: EnquiryItem) => void;
  removeItem: (productId: string, packSize: string) => void;
  clearItems: () => void;
  totalLines: number;
};

const STORAGE_KEY = "asvadavat-enquiry-items-v1";

const EnquiryStoreContext = createContext<EnquiryStoreValue | null>(null);

export function EnquiryStoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      return JSON.parse(raw) as EnquiryItem[];
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<EnquiryStoreValue>(
    () => ({
      items,
      addItem: (item) => {
        setItems((current) => {
          const idx = current.findIndex(
            (it) => it.productId === item.productId && it.packSize === item.packSize,
          );
          if (idx === -1) {
            return [...current, item];
          }

          const next = [...current];
          next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + item.qty) };
          return next;
        });
      },
      removeItem: (productId, packSize) => {
        setItems((current) =>
          current.filter((item) => !(item.productId === productId && item.packSize === packSize)),
        );
      },
      clearItems: () => setItems([]),
      totalLines: items.reduce((sum, item) => sum + item.qty, 0),
    }),
    [items],
  );

  return <EnquiryStoreContext.Provider value={value}>{children}</EnquiryStoreContext.Provider>;
}

export function useEnquiryStore() {
  const ctx = useContext(EnquiryStoreContext);
  if (!ctx) {
    throw new Error("useEnquiryStore must be used inside EnquiryStoreProvider");
  }
  return ctx;
}
