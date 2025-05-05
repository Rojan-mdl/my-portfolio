"use client"; // Directive for Next.js client components

import React from "react"; // Import React (useEffect no longer needed here)
import { motion } from "motion/react"; // Import motion component from Framer Motion
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"; // Import shared hook

// Define the props interface for the AnimatedSection component
interface AnimatedSectionProps {
  children: React.ReactNode; // The content to be wrapped and animated
  id?: string; // Optional ID attribute for the wrapper div (useful for navigation links)
  className?: string; // Optional additional CSS classes for the wrapper div
  delay?: number; // Optional delay (in seconds) before the animation starts
}

// AnimatedSection component definition using React.forwardRef
// forwardRef allows parent components to pass a ref directly to the underlying motion.div
const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  // Props: children, id, className (defaulting to ""), delay (defaulting to 0.2s)
  // ref: The forwarded ref from the parent
  ({ children, id, className = "", delay = 0.2 }, ref) => {
    // Get the user's reduced motion preference using the custom hook
    const prefersReducedMotion = usePrefersReducedMotion();

    // Render a motion.div component from Framer Motion
    return (
      <motion.div
        ref={ref} // Attach the forwarded ref to the motion.div element
        id={id} // Apply the provided id attribute, if any
        className={className} // Apply any additional CSS classes
        // Initial animation state (before entering viewport)
        // If reduced motion is preferred, set to undefined to disable initial animation state
        // Otherwise, start with opacity 0 and slightly moved down (y: 20)
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        // Animation state when the element is in view
        // If reduced motion is preferred, set to undefined to disable the 'in view' animation
        // Otherwise, animate to full opacity (1) and original position (y: 0)
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        // Viewport settings for triggering the whileInView animation
        viewport={{
          once: true, // Trigger the animation only once when it enters the viewport
          amount: 0.2, // Trigger when 20% of the element is visible
          // TODO: Consider making the 'amount' prop configurable if different trigger points are needed for various sections.
        }}
        // Animation state when the element exits (unmounts)
        // If reduced motion is preferred, set to undefined to disable exit animation
        // Otherwise, animate back to opacity 0 and slightly moved down (y: 20)
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        // Transition settings for the animation
        // If reduced motion is preferred, set to undefined to disable transitions
        // Otherwise, define duration, easing, and apply the specified delay
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 0.7, ease: "easeOut", delay: delay }
        }
        // TODO: Explore making the animation type (e.g., slide direction, fade only) configurable via props.
      >
        {/* Render the child components passed into AnimatedSection */}
        {children}
      </motion.div>
    );
  }
);

// Set a display name for the component, useful for debugging in React DevTools
AnimatedSection.displayName = "AnimatedSection";

// Export the component for use in other parts of the application
export default AnimatedSection;
