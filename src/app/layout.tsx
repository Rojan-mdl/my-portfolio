import "./globals.css";
import { Montserrat } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import React from "react";
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Marius Øvrebø Portfolio',
    template: '%s | Marius Øvrebø Portfolio',
  },
  description: "Showcasing design, 3D, and development work",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.className} scroll-smooth`}>
      <body className="bg-black text-white bg-gradient-to-b from-black to-[#21002a]">
        <SiteHeader />
        <main className="pt-16">{children}</main>
        <footer className="mt-16 py-6 text-center text-xs sm:text-sm bg-transparent">
          <p>© {new Date().getFullYear()} Marius Øvrebø. All rights reserved.</p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}