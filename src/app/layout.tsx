import "./globals.css";
import { Montserrat } from "next/font/google"; // Import Montserrat font from Google Fonts via Next.js font optimization
import SiteHeader from "@/components/SiteHeader"; // Import the site header component
import React from "react"; // Import React library
import { Metadata } from 'next'; // Import Metadata type from Next.js for SEO
import { Analytics } from "@vercel/analytics/react"; // Import Vercel Analytics component

// Initialize Montserrat font with specific subsets, weights, and display strategy
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap", // Use font-display: swap for better performance
});

// Define metadata for the site, used for SEO and browser tab information
export const metadata: Metadata = {
  // Set the base URL for resolving relative URLs in metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  // Define the default title and a template for page-specific titles
  title: {
    default: 'Marius Øvrebø Portfolio', // Default title for the site
    template: '%s | Marius Øvrebø Portfolio', // Template for titles on specific pages
  },
  // Site description for SEO
  description: "Showcasing design, 3D, and development work",
  // TODO: Add more specific metadata like open graph images, keywords, etc.
};

// Define the RootLayout component, which wraps the entire application
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Set the language and apply the Montserrat font class and smooth scrolling
    <html lang="en" className={`${montserrat.className} scroll-smooth`}>
      {/* Apply background styles and text color to the body */}
      <body className="bg-black text-white bg-gradient-to-b from-black to-[#21002a]">
        {/* Accessibility feature: Skip link for keyboard navigation */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:m-2 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        {/* Render the site header component */}
        <SiteHeader />
        {/* Main content area, with padding-top to account for the fixed header */}
        <main id="main-content" className="pt-16">{children}</main>
        {/* Footer section */}
        <footer className="mt-16 py-6 text-center text-xs sm:text-sm bg-transparent">
          {/* Copyright notice with dynamic year */}
          <p>© {new Date().getFullYear()} Marius Øvrebø. All rights reserved.</p>
          {/* TODO: Consider adding links to privacy policy or other relevant footer items */}
        </footer>
        {/* Include Vercel Analytics */}
        <Analytics />
        {/* TODO: Add structured data (JSON-LD) for better SEO */}
      </body>
    </html>
  );
}
