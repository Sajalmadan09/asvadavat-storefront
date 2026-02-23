import type { Metadata } from "next";
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
      <body className="bg-amber-50 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
