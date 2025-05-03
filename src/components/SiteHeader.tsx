"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useSpring } from "motion/react"; // Framer Motion components for animations and spring physics
import { LiaTimesSolid, LiaBarsSolid } from "react-icons/lia";


// Hamburger Icon Component
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white">
      {open ? <LiaTimesSolid size={32} /> : <LiaBarsSolid size={32} />} {/* Toggle between hamburger and close icon */}
    </div>
  );
}

// Define the props interface for the SiteHeader component
interface SiteHeaderProps {
  activeSection?: string; // ID of the currently active section (optional, mainly for homepage underline)
}

// SiteHeader component definition
export default function SiteHeader({ activeSection }: SiteHeaderProps) { // Destructure props
  // State to manage the mobile menu's open/closed status
  const [menuOpen, setMenuOpen] = useState(false);
  // Get the current URL pathname
  const pathname = usePathname();
  // Determine if the current page is the homepage
  const isHomePage = pathname === '/';

  // Refs for managing the underline animation elements
  const navContainerRef = useRef<HTMLDivElement>(null); // Ref for the desktop navigation container
  const underlineRef = useRef<HTMLDivElement>(null); // Ref for the animated underline element
  const linkRefs = useRef<Map<string, HTMLAnchorElement | null>>(new Map()); // Map to store refs of individual navigation links

  // Helper function to generate the correct href for navigation links
  // Ensures links point correctly whether on the homepage or a subpage
  const getLinkHref = (sectionId: string) => {
    // If not on the homepage (e.g., a project page), prepend '/' to link back to the homepage section
    // Otherwise (on homepage), use the hash directly for same-page scrolling
    return !isHomePage ? `/${sectionId}` : sectionId;
    // TODO: Consider refining this logic if deep linking to sections on other pages becomes necessary.
  };

  // Helper function to close the mobile menu
  const closeMenu = () => setMenuOpen(false);

  // Effect to automatically close the mobile menu when resizing the window to desktop widths
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // Tailwind's 'sm' breakpoint
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    // Cleanup: remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to prevent body scrolling when the mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow; // Store original body overflow style
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // Disable body scroll
    } else {
      document.body.style.overflow = originalOverflow; // Restore original overflow style
    }
    // Cleanup: restore original overflow style when the component unmounts or menu closes
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]); // Rerun this effect whenever menuOpen state changes

  // Callback function to handle the 'Escape' key press for closing the mobile menu
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  }, []); // useCallback ensures the function reference is stable

  // Effect to add/remove the Escape key listener based on menu state
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    // Cleanup: remove the event listener when the component unmounts or menu closes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, handleKeyDown]); // Rerun when menuOpen or handleKeyDown changes

  // --- Underline Animation Logic ---
  // Configuration for the spring animation physics
  const springOptions = { stiffness: 300, damping: 30, restDelta: 0.001 };
  // Create spring animations for underline position (x), width, and opacity
  const underlineXSpring = useSpring(0, springOptions);
  const underlineWidthSpring = useSpring(0, springOptions);
  const underlineOpacitySpring = useSpring(0, { duration: 0.2 }); // Use a simpler duration-based spring for opacity fade

  // Effect to update the underline position and visibility based on the active section
  useEffect(() => {
    // Guard clauses: Only run on the homepage and if the nav container ref is available
    if (!isHomePage || !navContainerRef.current || !activeSection) {
        underlineOpacitySpring.set(0); // Ensure underline is hidden if not on homepage or no active section
        return;
    }

    // Get the DOM element of the currently active navigation link
    const activeLinkElement = linkRefs.current.get(activeSection);

    if (activeLinkElement && navContainerRef.current) {
      // Get the bounding rectangles of the navigation container and the active link
      const navRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = activeLinkElement.getBoundingClientRect();

      // Calculate the target X position and width for the underline relative to the nav container
      const targetX = linkRect.left - navRect.left;
      const targetWidth = linkRect.width;

      // Update the spring animation targets
      underlineXSpring.set(targetX);
      underlineWidthSpring.set(targetWidth);
      underlineOpacitySpring.set(1); // Make the underline visible

    } else {
       // If no active link element is found (e.g., scrolled past the last section), fade out the underline
       underlineOpacitySpring.set(0);
       // TODO: Consider whether to reset X/Width springs here or let them stay at the last position. Current behavior is fine.
    }

  }, [activeSection, isHomePage, underlineXSpring, underlineWidthSpring, underlineOpacitySpring]); // Dependencies for the effect

  // --- Link Classes ---
  // Base classes for desktop navigation links (underline handled by motion.div)
  const desktopLinkClasses = `
    relative uppercase text-sm text-gray-300 transition duration-150 ease-in-out
    hover:text-white focus:outline-none focus:text-white
  `;
  // Base classes for mobile navigation links (uses focus-visible for underline)
  const mobileLinkClasses = "text-lg hover:text-gray-300 focus:outline-none focus-visible:text-white focus-visible:underline";
  // TODO: Ensure focus styles are consistent and meet accessibility contrast requirements.

  return (
    <>
      {/* Header Element: Fixed position, full width, background, border */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black h-16 flex items-center border-b border-gray-800/50">
        {/* Max Width Container: Centers content and applies padding */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">

          {/* Mobile View: Logo (Aligned Left) - Hidden on sm screens and up */}
          <div className="flex-shrink-0 sm:hidden">
            <Link href={getLinkHref('#hero')} onClick={closeMenu} aria-label="Homepage Logo">
              <Image
                src="/image/MØ-white.png"
                alt="Marius Øvrebø Logo"
                width={60}
                height={60}
                className="h-auto" // Maintain aspect ratio
                priority // Prioritize loading this image (likely LCP)
              />
            </Link>
          </div>

          {/* Mobile View: Hamburger Button (Aligned Right) - Hidden on sm screens and up */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)} // Toggle menu state on click
              aria-label="Toggle menu"
              aria-expanded={menuOpen} // Indicate menu state to assistive technologies
              aria-controls="mobile-menu" // Link button to the menu it controls
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white" // Styling and focus management
            >
              <HamburgerIcon open={menuOpen} /> {/* Display hamburger or close icon */}
            </button>
          </div>

          {/* Desktop View Container: Hidden on mobile, flex layout, full width, relative positioning for underline */}
          <div ref={navContainerRef} className="hidden sm:flex w-full items-center justify-between relative">
            {/* Desktop Left Navigation */}
            <nav className="flex items-center space-x-5 lg:space-x-7" aria-label="Main desktop navigation left">
              {/* Navigation Links: Assign refs for underline calculation, use helper for href, close menu on click */}
              <Link ref={(el) => { linkRefs.current.set('about', el); }} href={getLinkHref('#about')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'about' ? 'page' : undefined}>About</Link>
              <Link ref={(el) => { linkRefs.current.set('experience-education', el); }} href={getLinkHref('#experience-education')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'experience-education' ? 'page' : undefined}>Experience</Link>
              <Link ref={(el) => { linkRefs.current.set('portfolio', el); }} href={getLinkHref('#portfolio')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'portfolio' ? 'page' : undefined}>Portfolio</Link>
            </nav>

            {/* Desktop Centered Logo */}
            <div className="flex-shrink-0 px-4"> {/* Added padding to prevent overlap with nav links */}
              <Link href={getLinkHref('#hero')} onClick={closeMenu} aria-label="Homepage Logo">
                <Image
                  src="/image/MØ-white.png"
                  alt="Marius Øvrebø Logo"
                  width={80} // Larger logo for desktop
                  height={80}
                  className="h-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Right Navigation */}
            <nav className="flex items-center space-x-5 lg:space-x-7" aria-label="Main desktop navigation right">
                {/* Navigation Links: Assign refs, use helper for href, close menu on click */}
                <Link ref={(el) => { linkRefs.current.set('art', el); }} href={getLinkHref('#art')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'art' ? 'page' : undefined}>Art</Link>
                <Link ref={(el) => { linkRefs.current.set('services', el); }} href={getLinkHref('#services')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'services' ? 'page' : undefined}>Services</Link>
                <Link ref={(el) => { linkRefs.current.set('contact', el); }} href={getLinkHref('#contact')} className={desktopLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'contact' ? 'page' : undefined}>Contact</Link>
            </nav>

            {/* Animated Underline Element: Rendered only on the homepage */}
            {isHomePage && (
              <motion.div
                ref={underlineRef} // Assign ref
                className="absolute h-0.5 bg-white" // Styling: absolute positioning, height, background color
                style={{
                  x: underlineXSpring, // Apply animated X position from spring
                  width: underlineWidthSpring, // Apply animated width from spring
                  opacity: underlineOpacitySpring, // Apply animated opacity from spring
                  top: '47px', // Position below the links (adjust as needed)
                  originX: 0, // Ensure width animation originates from the left
                }}
                aria-hidden="true" // Hide decorative element from screen readers
              />
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Overlay): Uses AnimatePresence for enter/exit animations */}
      <AnimatePresence>
        {menuOpen && ( // Conditionally render the mobile menu
          <motion.div
            id="mobile-menu" // ID for aria-controls
            role="dialog" // ARIA role for modal dialog
            aria-modal="true" // Indicate it's a modal
            initial={{ opacity: 0 }} // Initial animation state (invisible)
            animate={{ opacity: 1 }} // Animate to visible
            exit={{ opacity: 0 }} // Animate to invisible on exit
            transition={{ duration: 0.2, ease: "easeInOut" }} // Animation timing
            className="sm:hidden fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-sm pt-8 overflow-y-auto" // Styling: fixed position, overlay, background, blur, padding, scroll
          >
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center gap-y-6 px-4 pb-10" aria-label="Mobile navigation">
               {/* Links use helper for href, close menu on click, apply mobile styles */}
               <Link href={getLinkHref('#about')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'about' ? 'page' : undefined}>About</Link>
               <Link href={getLinkHref('#experience-education')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'experience-education' ? 'page' : undefined}>Experience</Link>
               <Link href={getLinkHref('#portfolio')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'portfolio' ? 'page' : undefined}>Portfolio</Link>
               <Link href={getLinkHref('#art')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'art' ? 'page' : undefined}>Art</Link>
               <Link href={getLinkHref('#services')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'services' ? 'page' : undefined}>Services</Link>
               <Link href={getLinkHref('#contact')} className={mobileLinkClasses} onClick={closeMenu} aria-current={isHomePage && activeSection === 'contact' ? 'page' : undefined}>Contact</Link>
               {/* TODO: Add social links or other relevant items to the mobile menu if desired. */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
