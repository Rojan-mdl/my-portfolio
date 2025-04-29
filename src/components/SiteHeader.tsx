"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useSpring } from "motion/react"; // Import useSpring, remove animate

// Hamburger Icon Component
// TODO: Replace with a more accessible icon or SVG
const HamburgerIcon = ({ open }: { open: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 ease-in-out" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} aria-hidden="true">
        <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// Define props interface
interface SiteHeaderProps {
  activeSection: string; // ID of the currently active section
}

export default function SiteHeader({ activeSection }: SiteHeaderProps) { // Destructure props
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path
  const isHomePage = pathname === '/'; // Check if it's the home page

  // Refs for underline animation
  const navContainerRef = useRef<HTMLDivElement>(null); // Ref for the container of both navs
  const underlineRef = useRef<HTMLDivElement>(null); // Ref for the underline element
  const linkRefs = useRef<Map<string, HTMLAnchorElement | null>>(new Map()); // Map to store refs of nav links

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


  // --- Underline Animation Logic ---
  // Define spring physics options
  const springOptions = { stiffness: 300, damping: 30, restDelta: 0.001 };
  const underlineXSpring = useSpring(0, springOptions);
  const underlineWidthSpring = useSpring(0, springOptions);
  const underlineOpacitySpring = useSpring(0, { duration: 0.2 }); // Separate spring for opacity fade

  useEffect(() => {
    if (!isHomePage || !navContainerRef.current) return; // Only run on homepage with refs

    const activeLinkElement = linkRefs.current.get(activeSection);

    if (activeLinkElement) {
      const navRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = activeLinkElement.getBoundingClientRect();

      // Calculate position relative to the nav container
      const targetX = linkRect.left - navRect.left;
      const targetWidth = linkRect.width;

      // Update spring targets
      underlineXSpring.set(targetX);
      underlineWidthSpring.set(targetWidth);
      underlineOpacitySpring.set(1); // Make visible

    } else {
       // If no link matches (e.g., scrolling past 'contact'), fade out the underline
       underlineOpacitySpring.set(0);
       // Optionally reset width/position when hidden, though opacity handles visibility
       // underlineXSpring.set(underlineXSpring.get()); // Keep current X
       // underlineWidthSpring.set(0); // Shrink width
    }

  }, [activeSection, isHomePage, underlineXSpring, underlineWidthSpring, underlineOpacitySpring]); // Rerun when activeSection changes or navigating away/to homepage

  // --- Link Classes ---
  // Removed the focus-based ::after underline, we'll use the motion.div now
  const desktopLinkClasses = `
    relative uppercase text-sm text-gray-300 transition duration-150 ease-in-out
    hover:text-white focus:outline-none focus:text-white
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

          {/* Desktop View Container (Hidden Mobile) - Add ref here */}
          <div ref={navContainerRef} className="hidden sm:flex w-full items-center justify-between relative"> {/* Added relative positioning */}
            {/* Left Navigation */}
            <nav className="flex items-center space-x-5 lg:space-x-7" aria-label="Main desktop navigation left">
              {/* Corrected refs assignment */}
              <Link ref={(el) => { linkRefs.current.set('about', el); }} href={getLinkHref('#about')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'about' ? 'page' : undefined}>About</Link>
              <Link ref={(el) => { linkRefs.current.set('experience-education', el); }} href={getLinkHref('#experience-education')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'experience-education' ? 'page' : undefined}>Experience</Link>
              <Link ref={(el) => { linkRefs.current.set('portfolio', el); }} href={getLinkHref('#portfolio')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'portfolio' ? 'page' : undefined}>Portfolio</Link>
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
                {/* Corrected refs assignment */}
                <Link ref={(el) => { linkRefs.current.set('art', el); }} href={getLinkHref('#art')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'art' ? 'page' : undefined}>Art</Link>
                <Link ref={(el) => { linkRefs.current.set('services', el); }} href={getLinkHref('#services')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'services' ? 'page' : undefined}>Services</Link>
                <Link ref={(el) => { linkRefs.current.set('contact', el); }} href={getLinkHref('#contact')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'contact' ? 'page' : undefined}>Contact</Link>
            </nav>

            {/* Animated Underline Element (only on homepage) */}
            {isHomePage && (
              <motion.div
                ref={underlineRef}
                className="absolute h-0.5 bg-white" // Removed left-0, position controlled by style
                style={{
                  x: underlineXSpring, // Use spring value for x
                  width: underlineWidthSpring, // Use spring value for width
                  opacity: underlineOpacitySpring, // Use spring value for opacity
                  top: '47px', // Adjusted Y position lower
                  originX: 0, // Animate width from the left
                }}
              />
            )}
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
