"use client"; // Directive for Next.js client components (needed for hooks)

import React, { useState, useEffect } from "react"; // Import React and hooks
import Image from "next/image"; // Import Next.js Image component

// TODO: Extract this hook into a shared utility file (e.g., src/hooks/usePrefersReducedMotion.ts)
// to avoid duplication across components.
// Custom hook to detect user's preference for reduced motion
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    // Safety check for server-side rendering
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  return prefersReducedMotion;
};

// Define the expected props for the ToolIcon component
export type ToolIconProps = {
  src: string; // URL/path to the icon image
  alt: string; // Alt text for the image (important for accessibility)
  label: string; // Text content for the tooltip label
  size: number; // Width and height for the icon image
};

// ToolIcon component definition
// Displays an icon and reveals a text label (tooltip) on hover/focus.
export default function ToolIcon({ src, alt, label, size }: ToolIconProps) {
  // Check for user's reduced motion preference to conditionally disable transitions
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    // Container div for the icon and its tooltip
    // Uses 'group' class to enable group-hover/group-focus-within states for the tooltip
    <div className="relative group inline-block">
      {/* Icon Image */}
      <Image
        src={src} // Image source
        alt={alt} // Alt text (should describe the tool/technology if not purely decorative)
        // TODO: Consider if alt text should be empty ("") if the label provides sufficient context, or if it should describe the icon visually.
        width={size} // Image width
        height={size} // Image height
        className="rounded" // Apply rounded corners
        loading="lazy" // Lazy load the icon image
      />
      {/* Tooltip Label */}
      {/* Styling: Absolute positioning, centered below the icon, initially hidden (opacity-0) */}
      {/* Visibility: Becomes visible (opacity-100) on hover or focus within the parent 'group' */}
      {/* Appearance: Dark background, white text, small font size, padding, rounded corners, margin top, prevents text wrapping, high z-index */}
      {/* Transition: Applies opacity transition unless reduced motion is preferred */}
      {/* TODO: Ensure tooltip contrast and positioning work well across different screen sizes and contexts. */}
      {/* TODO: Consider adding ARIA attributes (e.g., aria-describedby) to explicitly link the icon to its tooltip for better accessibility, although group-focus might suffice. */}
      <span className={`absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 bg-black text-white text-xs px-2 py-1 rounded mt-1 whitespace-nowrap z-10 ${prefersReducedMotion ? '' : 'transition'}`}>
        {label} {/* Tooltip text content */}
      </span>
    </div>
  );
}
