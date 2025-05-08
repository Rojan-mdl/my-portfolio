import "./globals.css";
import { Montserrat } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import React from "react";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

// Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Metadata for the site, used for SEO and browser tab information
export const metadata: Metadata = {
  // Set the base URL for resolving relative URLs in metadata
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  // Default title and a template for page-specific titles
  title: {
    default: "Marius Øvrebø Portfolio", // Default title
    template: "%s | Marius Øvrebø Portfolio", // Template for titles
  },
  // Site description for SEO
  description: "Showcasing design, 3D, and development work",
};

// RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.className} scroll-smooth`}>
      <body className="bg-black text-white bg-gradient-to-b from-black to-[#21002a]">
        {/* Accessibility feature: Skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:m-2 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>
        {/* Header component */}
        <SiteHeader />
        {/* Main content area */}
        <main id="main-content" className="pt-16">
          {children}
        </main>
        {/* Footer section */}
        <footer className="mt-16 py-6 text-center text-xs sm:text-sm bg-transparent">
          <p>
            © {new Date().getFullYear()} Marius Øvrebø. All rights reserved.
          </p>
        </footer>
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
