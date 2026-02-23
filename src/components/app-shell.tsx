"use client";

import { EnquiryStoreProvider } from "@/components/enquiry-store";
import { OnboardingTour } from "@/components/onboarding-tour";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToastProvider } from "@/components/toast";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <EnquiryStoreProvider>
      <ToastProvider>
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <WhatsAppFab />
        <OnboardingTour />
      </ToastProvider>
    </EnquiryStoreProvider>
  );
}
