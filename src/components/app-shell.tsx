"use client";

import { EnquiryStoreProvider } from "@/components/enquiry-store";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <EnquiryStoreProvider>
      <SiteHeader />
      {children}
    </EnquiryStoreProvider>
  );
}
