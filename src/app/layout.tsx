import type { Metadata } from "next";
import Script from "next/script";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://asvadavat.example.com"),
  title: {
    default: "ASVADAVAT | Tea & Spices",
    template: "%s | ASVADAVAT",
  },
  description:
    "Discover ASVADAVAT tea and spice catalog with pack-size pricing and quick enquiry ordering.",
  openGraph: {
    title: "ASVADAVAT Tea & Spices",
    description: "Browse tea and spices with pack-wise pricing.",
    type: "website",
  },
  icons: {
    icon: "/asvadavat-icon.png",
    apple: "/asvadavat-icon.png",
    shortcut: "/asvadavat-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","vm0iujdo19");`,
          }}
        />
      </head>
      <body className="bg-amber-50 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
