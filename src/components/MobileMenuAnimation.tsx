"use client";

import * as motion from "motion/react-client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import React from "react"; // Import React

// Define the props for the main animation component
interface MobileMenuAnimationProps {
  isOpen: boolean;
  closeMenu: () => void; // Function to close the menu (e.g., on link click)
  getLinkHref: (sectionId: string) => string; // Function to get correct link href
  isHomePage: boolean;
  activeSection?: string;
}

// Define the props for the Navigation component
interface NavigationProps {
  closeMenu: () => void;
  getLinkHref: (sectionId: string) => string;
  isHomePage: boolean;
  activeSection?: string;
}

// Utility hook for measuring dimensions
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.offsetHeight;
      }
    };

    updateDimensions(); // Initial measurement
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [ref]);

  return dimensions.current;
};

// --- Animation Variants ---

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// Right-sided bubble origin
const sidebarVariants = {
  open: (height = 1000) => ({
    // Adjust 260px 40px based on the actual hamburger button position relative to the sidebar
    clipPath: `circle(${height * 2 + 200}px at 260px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 260px 40px)", // Make radius 0px to hide when closed
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

// --- Components ---

const Navigation = ({
  closeMenu,
  getLinkHref,
  isHomePage,
  activeSection,
}: NavigationProps) => {
  // Base classes for mobile navigation links (adjust as needed)
  const mobileLinkClasses =
    "block py-2 text-lg text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none focus-visible:text-black dark:focus-visible:text-white focus-visible:underline";

  return (
    <motion.ul
      variants={navVariants}
      // Apply Tailwind classes for list styling and positioning
      className="list-none p-6 m-0 absolute top-20 right-0 w-[230px]" // Positioned top-right within the sidebar
    >
      {[
        { id: "#about", label: "About" },
        { id: "#experience-education", label: "Experience" },
        { id: "#portfolio", label: "Portfolio" },
        { id: "#art", label: "Art" },
        { id: "#services", label: "Services" },
        { id: "#contact", label: "Contact" },
      ].map((item) => (
        <motion.li
          key={item.id}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4 cursor-pointer"
        >
          <Link
            href={getLinkHref(item.id)}
            className={mobileLinkClasses}
            onClick={closeMenu}
            aria-current={
              isHomePage && activeSection === item.id.substring(1)
                ? "page"
                : undefined
            }
          >
            {item.label}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

// --- Main Animation Component ---
export default function MobileMenuAnimation({
  isOpen,
  closeMenu,
  getLinkHref,
  isHomePage,
  activeSection,
}: MobileMenuAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      // Position the nav container itself
      className={`fixed top-0 right-0 bottom-0 z-40 w-[300px] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Background with clip-path animation */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-full bg-black dark:bg-black"
        variants={sidebarVariants}
      />
      {/* Navigation Links */}
      <Navigation
        closeMenu={closeMenu}
        getLinkHref={getLinkHref}
        isHomePage={isHomePage}
        activeSection={activeSection}
      />
      {/* Menu Toggle Button is rendered in SiteHeader */}
    </motion.nav>
  );
}
