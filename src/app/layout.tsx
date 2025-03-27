import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

// Example Google font from Next.js
const inter = Inter({ subsets: ["latin"] });

// This layout is a Server Component by default
export const metadata = {
  title: "My Portfolio",
  description: "Showcasing my Dev, Design, and 3D skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header / Navbar */}
        <header className="bg-white shadow">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <span className="font-bold text-xl cursor-pointer">Marius Øvrebø</span>
            </Link>
            <div className="space-x-4">
              <Link href="/developer">Developer</Link>
              <Link href="/design">Design</Link>
              <Link href="/threeD">3D</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="mx-auto max-w-7xl px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 py-4 text-center mt-8">
          <p>© {new Date().getFullYear()} Marius Øvrebø. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
// Note: The layout component wraps around all pages in the app directory.
// It can be used to define a consistent structure for your application.
// The header, main content, and footer are all part of the layout.
// The header contains navigation links to different sections of the portfolio.
// The main content area will display the content of the current page.
// The footer contains copyright information.
// The layout uses Tailwind CSS for styling, which is a utility-first CSS framework.
// The layout is responsive and will adapt to different screen sizes.
// The layout uses the Inter font from Google Fonts, which is imported using Next.js's font optimization feature.
// The layout is a Server Component by default, meaning it can fetch data and render on the server.
// The layout can be customized further by adding more components or styles as needed.
// The layout is a good starting point for building a portfolio website using Next.js and Tailwind CSS.
// The layout can be extended with additional features such as dark mode, animations, or other UI enhancements.
// The layout can also be optimized for performance by using techniques such as code splitting, lazy loading, and caching.
// The layout can be tested and deployed using Next.js's built-in development and production tools.
// The layout can be integrated with a CMS or other data sources to dynamically generate content.
// The layout can be enhanced with SEO features such as meta tags, structured data, and social sharing.
// The layout can be made accessible by following best practices for web accessibility.
// The layout can be made multilingual by using Next.js's internationalization features.
// The layout can be made mobile-friendly by using responsive design techniques.
// The layout can be made visually appealing by using design principles such as color theory, typography, and layout.
// The layout can be made user-friendly by following usability principles such as consistency, feedback, and simplicity.