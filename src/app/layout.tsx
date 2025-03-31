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
      <body className="bg-[#0A0A0A] text-white">
        {/* Fixed header with navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000] h-16 flex items-center">
          <div className="max-w-7xl w-full mx-auto px-4 flex items-center justify-between">
            <nav className="flex space-x-6">
              <Link href="#about" className="hover:text-gray-300">
                About
              </Link>
              <Link href="#work" className="hover:text-gray-300">
                Work
              </Link>
            </nav>
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/image/MØ-white.png"
                  alt="Marius Øvrebø Logo"
                  width={80}
                  height={80}
                  className="mx-auto"
                  priority
                />
              </Link>
            </div>
            <nav className="flex space-x-6">
              <Link href="#shop" className="hover:text-gray-300">
                Shop
              </Link>
              <Link href="#contacts" className="hover:text-gray-300">
                Contacts
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content is rendered here */}
        <main className="pt-20">{children}</main>

        <footer className="mt-16 border-t border-gray-800 py-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Marius Øvrebø. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
