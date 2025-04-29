"use client";

import React, { useState, useEffect } from "react"; // Removed useRef
import { motion } from "motion/react";

// Hook to check for reduced motion preference
const usePrefersReducedMotion = () => {
  // Default to false SSR, will be updated client-side
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Check if addEventListener is supported before using it.
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  return prefersReducedMotion;
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string; // Optional ID for navigation/linking
  className?: string; // Optional additional classes for the wrapper
  delay?: number; // Optional delay for the animation
}

// ForwardRef allows passing refs down to the motion.div if needed
const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, id, className = "", delay = 0.2 }, ref) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
      <motion.div
        ref={ref} // Attach the forwarded ref here
        id={id} // Apply the id if provided
        className={className} // Apply any additional classes
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        // Use whileInView for animations triggered on scroll into view
        // Or use 'animate' for initial load animation only
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% is visible
        transition={prefersReducedMotion ? undefined : { duration: 0.7, ease: "easeOut", delay: delay }}
      >
        {children}
      </motion.div>
    );
  }
);

// Assign display name for better debugging
AnimatedSection.displayName = "AnimatedSection";

export default AnimatedSection;
