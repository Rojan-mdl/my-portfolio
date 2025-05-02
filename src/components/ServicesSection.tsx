"use client"; // Directive for Next.js client components

import React, { useState, useEffect } from "react"; // Import React and hooks
// Note: Motion imports (motion, AnimatePresence) are commented out but could be added back
// if text expansion animations are desired later.
// import { motion, AnimatePresence } from "motion/react";

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

// ServicesSection component definition
export default function ServicesSection() {
  // State to track which service card is currently expanded (null means none are expanded)
  const [expandedService, setExpandedService] = useState<number | null>(null);
  // Check for user's reduced motion preference
  const prefersReducedMotion = usePrefersReducedMotion();

  // Function to toggle the expanded state of a service card
  // If the clicked card is already expanded, collapse it (set state to null).
  // Otherwise, expand the clicked card (set state to its index).
  const toggleService = (index: number) =>
    setExpandedService(expandedService === index ? null : index);

  // Placeholder data for the services offered
  // TODO: Fetch this service data from a CMS or API for easier management.
  const services = [
    { title: "Web Development", shortDesc: "Building responsive and fast websites.", longDesc: "Full-stack web development using modern technologies like Next.js, React, and TypeScript to create performant and user-friendly applications." },
    { title: "3D Visualization", shortDesc: "Bringing concepts to life in 3D.", longDesc: "Creating compelling 3D models, animations, and visualizations for products, architecture, or interactive experiences using tools like Blender." },
    { title: "Interactive Design", shortDesc: "Designing engaging user experiences.", longDesc: "Focusing on user interaction and experience design, prototyping with Figma, and implementing interactive elements that delight users." },
    // TODO: Add or modify services as needed.
  ];

  return (
    // Section container for Services
    // id="services" is handled by the parent AnimatedSection wrapper in page.tsx
    <section className="py-16 text-gray-100" aria-labelledby="services-heading">
      {/* Responsive container */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2 id="services-heading" className="text-3xl font-bold mb-8 text-center">Services</h2>
        {/* Grid layout for service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map through the services data to render each service card */}
          {services.map((service, index) => {
            // Determine if the current card is the one that's expanded
            const isExpanded = expandedService === index;
            return (
              // Use a button element for the card to make it interactive and accessible
              <button
                key={index} // Unique key for React list rendering
                onClick={() => toggleService(index)} // Call toggle function on click
                aria-expanded={isExpanded} // Indicate expansion state to assistive technologies
                // Styling: Background, rounded corners, padding, text alignment, cursor, focus style
                // Hover effect: Slight scale increase (disabled if reduced motion preferred)
                className={`bg-[#0A0A0A] rounded-lg p-6 text-left cursor-pointer focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff] ${prefersReducedMotion ? '' : 'transition duration-200 ease-in-out hover:scale-[1.03]'}`}
                // TODO: Ensure sufficient contrast between text and background (#0A0A0A).
              >
                {/* Service Title */}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                {/* Service Description Paragraph */}
                {/* Styling: Text color, transition (currently only opacity, consider height animation), minimum height */}
                {/* min-h-[6em] helps prevent the card height from changing drastically when text expands/collapses, reducing layout shift. */}
                {/* TODO: Consider using Framer Motion's AnimatePresence and motion.p for smoother height/opacity animation on text change. */}
                <p className="text-gray-400 transition-opacity duration-300 min-h-[6em]">
                   {/* Conditionally render the long or short description based on expansion state */}
                   {isExpanded
                     ? service.longDesc
                     : service.shortDesc
                   }
                   {/* Add visually hidden text to explicitly announce the state change to screen readers */}
                   <span className="sr-only">
                     {isExpanded ? " (collapse details)" : " (expand details)"}
                   </span>
                </p>
              </button>
            );
          })}
        </div>
      </div> {/* End max-w-6xl container */}
    </section>
  );
}
