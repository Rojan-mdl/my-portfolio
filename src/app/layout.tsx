// src/app/layout.tsx (or a dedicated NavBar component)
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-white">
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000] h-16 flex items-center">
          {/* Outer container (optional max-w for center alignment) */}
          <div className="max-w-7xl w-full mx-auto px-4 flex items-center justify-between">
            {/* Left nav links */}
            <nav className="flex space-x-6">
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
              <Link href="/work" className="hover:text-gray-300">
                Work
              </Link>
            </nav>

            {/* Centered logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/MØ-white.png"  // your logo file in /public
                  alt="Logo"
                  width={80}
                  height={80}
                  className="mx-auto" // centers the logo in its box
                />
              </Link>
            </div>

            {/* Right nav links */}
            <nav className="flex space-x-6">
              <Link href="/shop" className="hover:text-gray-300">
                Shop
              </Link>
              <Link href="/contacts" className="hover:text-gray-300">
                Contacts
              </Link>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT: add top padding to avoid being hidden under header */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
