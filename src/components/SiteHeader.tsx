"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import { usePathname } from 'next/navigation'; // Import usePathname
import { motion, AnimatePresence } from "framer-motion";

// Hamburger Icon Component
const HamburgerIcon = ({ open }: { open: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 ease-in-out" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} aria-hidden="true">
        <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path
  const isHomePage = pathname === '/'; // Check if it's the home page

  // Helper function to generate the correct href
  const getLinkHref = (sectionId: string) => {
    // If on a project page (not home), link to the homepage section
    // Otherwise, link directly to the section ID (for same-page scrolling)
    return !isHomePage ? `/${sectionId}` : sectionId;
  };

  // Helper to close the mobile menu
  const closeMenu = () => setMenuOpen(false);

  // Close mobile menu on resize to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow; // Restore original value
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  // Add Escape key listener to close mobile menu
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  }, []); // Empty dependency array as closeMenu doesn't change

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    // Cleanup listener on component unmount or when menu closes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, handleKeyDown]);


  // Link Classes for Focus-Only Animated Underline
  // Underline (scale-x) triggers only on focus (click or keyboard)
  const desktopLinkClasses = `
    relative uppercase text-sm text-gray-300 transition duration-150 ease-in-out
    hover:text-white focus:outline-none focus:text-white
    after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-white
    after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out
    focus:after:scale-x-100
  `;
  // Mobile link styling uses focus-visible for its underline
  const mobileLinkClasses = "text-lg hover:text-gray-300 focus:outline-none focus-visible:text-white focus-visible:underline";


  return (
    <>
      {/* Header Element */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black h-16 flex items-center border-b border-gray-800/50">
        {/* Max Width Container */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">

          {/* Mobile View: Logo (Left) */}
          <div className="flex-shrink-0 sm:hidden">
            <Link href={getLinkHref('#hero')} onClick={closeMenu} aria-label="Homepage Logo">
              <Image
                src="/image/MØ-white.png"
                alt="Marius Øvrebø Logo"
                width={60}
                height={60}
                className="h-auto"
                priority
              />
            </Link>
          </div>

          {/* Mobile View: Hamburger Button (Right) */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white" // Use focus-visible for ring
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>

          {/* Desktop View Container (Hidden Mobile) */}
          <div className="hidden sm:flex w-full items-center justify-between">
            {/* Left Navigation */}
            <nav className="flex items-center space-x-5 lg:space-x-7" aria-label="Main desktop navigation left">
              <Link href={getLinkHref('#about')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#about') === '#about' ? 'page' : undefined}>About</Link>
              <Link href={getLinkHref('#experience-education')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#experience-education') === '#experience-education' ? 'page' : undefined}>Experience</Link>
              <Link href={getLinkHref('#portfolio')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#portfolio') === '#portfolio' ? 'page' : undefined}>Portfolio</Link>
            </nav>

            {/* Centered Logo */}
            <div className="flex-shrink-0 px-4">
              <Link href={getLinkHref('#hero')} onClick={closeMenu} aria-label="Homepage Logo">
                <Image
                  src="/image/MØ-white.png"
                  alt="Marius Øvrebø Logo"
                  width={80}
                  height={80}
                  className="h-auto"
                  priority
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <nav className="flex items-center space-x-5 lg:space-x-7" aria-label="Main desktop navigation right">
                <Link href={getLinkHref('#art')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#art') === '#art' ? 'page' : undefined}>Art</Link>
                <Link href={getLinkHref('#services')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#services') === '#services' ? 'page' : undefined}>Services</Link>
                <Link href={getLinkHref('#contact')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#contact') === '#contact' ? 'page' : undefined}>Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Overlay) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="sm:hidden fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-sm pt-8 overflow-y-auto"
          >
            {/* Navigation links within the mobile menu */}
            <nav className="flex flex-col items-center gap-y-6 px-4 pb-10" aria-label="Mobile navigation">
               <Link href={getLinkHref('#about')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#about') === '#about' ? 'page' : undefined}>About</Link>
               <Link href={getLinkHref('#experience-education')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#experience-education') === '#experience-education' ? 'page' : undefined}>Experience</Link>
               <Link href={getLinkHref('#portfolio')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#portfolio') === '#portfolio' ? 'page' : undefined}>Portfolio</Link>
               <Link href={getLinkHref('#art')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#art') === '#art' ? 'page' : undefined}>Art</Link>
               <Link href={getLinkHref('#services')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#services') === '#services' ? 'page' : undefined}>Services</Link>
               <Link href={getLinkHref('#contact')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && getLinkHref('#contact') === '#contact' ? 'page' : undefined}>Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
