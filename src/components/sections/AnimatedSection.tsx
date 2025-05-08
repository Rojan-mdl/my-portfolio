"use client";

import React from "react";
import { motion } from "motion/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

// Define the props interface for the AnimatedSection component
interface AnimatedSectionProps {
  children: React.ReactNode; // The content to be wrapped and animated
  id?: string; // ID attribute for the wrapper div (useful for navigation links)
  className?: string; // Additional CSS classes for the wrapper div
  delay?: number; // Delay (in seconds) before the animation starts
}

// AnimatedSection component definition
// forwardRef allows parent components to pass a ref directly to the underlying motion.div
const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, id, className = "", delay = 0.2 }, ref) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    // motion.div component
    return (
      <motion.div
        ref={ref}
        id={id}
        className={className}
        // Initial animation state (before entering viewport)
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        // Animation state when the element is in view
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        // Viewport settings for triggering the whileInView animation
        viewport={{
          once: true,
          amount: 0.2, // Trigger when 20% of the element is visible
        }}
        // Animation state when the element exits (unmounts)
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        // Transition settings for the animation
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 0.7, ease: "easeOut", delay: delay }
        }
      >
        {/* Render the child components passed into AnimatedSection */}
        {children}
      </motion.div>
    );
  }
);

// Set a display name for the component, useful for debugging
AnimatedSection.displayName = "AnimatedSection";

export default AnimatedSection;
