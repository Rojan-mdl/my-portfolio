"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect user's preference for reduced motion based on system settings.
 * @returns {boolean} True if the user prefers reduced motion, false otherwise.
 */
export const usePrefersReducedMotion = (): boolean => {
  // Assume no preference initially, or default to false if window is undefined
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is defined (runs only on client)
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      // Set initial state based on the media query
      setPrefersReducedMotion(mediaQuery.matches);

      // Listener function to update state on change
      const handleChange = () => {
        setPrefersReducedMotion(mediaQuery.matches);
      };

      // Add listener for changes
      mediaQuery.addEventListener("change", handleChange);

      // Cleanup function to remove the listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion; 