// src/app/layout.tsx
import "./globals.css";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Marius Portfolio",
  description: "Showcasing design, 3D, and development work",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-black text-white">
        {/* Fixed header with navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black h-16 flex items-center">
          <div className="max-w-7xl w-full mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
            {/* Left Navigation */}
            <nav className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mb-2 sm:mb-0">
              <Link
                href="#hero"
                className="inline-block border-b-2 border-transparent text-sm sm:text-base hover:text-gray-300 focus:outline-none focus:border-b-2 focus:border-white transition"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="inline-block border-b-2 border-transparent text-sm sm:text-base hover:text-gray-300 focus:outline-none focus:border-b-2 focus:border-white transition"
              >
                About
              </Link>
              <Link
                href="#experience-education"
                className="inline-block border-b-2 border-transparent text-sm sm:text-base hover:text-gray-300 focus:outline-none focus:border-b-2 focus:border-white transition"
              >
                Experience
              </Link>
            </nav>

            {/* Centered Logo */}
            <div className="flex-shrink-0 mb-2 sm:mb-0">
              <Link href="#hero">
                <Image
                  src="/image/MØ-white.png"
                  alt="Marius Øvrebø Logo"
                  width={60}
                  height={60}
                  className="mx-auto"
                  priority
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <nav className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2">
              <Link
                href="#portfolio"
                className="inline-block border-b-2 border-transparent text-sm sm:text-base hover:text-gray-300 focus:outline-none focus:border-b-2 focus:border-white transition"
              >
                Portfolio
              </Link>
              <Link
                href="#services"
                className="inline-block border-b-2 border-transparent text-sm sm:text-base hover:text-gray-300 focus:outline-none focus:border-b-2 focus:border-white transition"
              >
                Services
              </Link>
              <Link
                href="#contact"
                className="inline-block border-b-2 border-transparent text-sm sm:text-base hover:text-gray-300 focus:outline-none focus:border-b-2 focus:border-white transition"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="pt-20">{children}</main>

        <footer className="mt-16 border-t border-gray-800 py-6 text-center text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Marius Øvrebø. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
