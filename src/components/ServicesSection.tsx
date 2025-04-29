"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
// Removed motion import
// If you want animations for the text expansion later:
// import { motion, AnimatePresence } from "motion/react";

// Hook to check for reduced motion preference (copied from previous components)
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    // Check if window is defined (for server-side rendering safety)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  return prefersReducedMotion;
};


export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion(); // Use the hook

  const toggleService = (index: number) =>
    setExpandedService(expandedService === index ? null : index);

  // Placeholder data
  const services = [
    { title: "Web Development", shortDesc: "Building responsive and fast websites.", longDesc: "Full-stack web development using modern technologies like Next.js, React, and TypeScript to create performant and user-friendly applications." },
    { title: "3D Visualization", shortDesc: "Bringing concepts to life in 3D.", longDesc: "Creating compelling 3D models, animations, and visualizations for products, architecture, or interactive experiences using tools like Blender." },
    { title: "Interactive Design", shortDesc: "Designing engaging user experiences.", longDesc: "Focusing on user interaction and experience design, prototyping with Figma, and implementing interactive elements that delight users." },
  ];

  return (
    // Removed id="services" as it's handled by the wrapper in page.tsx
    <section className="py-16 text-gray-100" aria-labelledby="services-heading">
      {/* Removed Animation Wrapper */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="services-heading" className="text-3xl font-bold mb-8 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map over actual service data */}
          {services.map((service, index) => {
            const isExpanded = expandedService === index;
            return (
              <button
                key={index}
                onClick={() => toggleService(index)}
                aria-expanded={isExpanded}
                // Conditionally apply hover scale transition
                className={`bg-[#0A0A0A] rounded-lg p-6 text-left cursor-pointer focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff] ${prefersReducedMotion ? '' : 'transition duration-200 ease-in-out hover:scale-[1.03]'}`}
              >
                {/* Service Title */}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                {/* Service Description - Toggles between short and long */}
                {/* min-h-[6em] to reduce layout shift when text changes */}
                <p className="text-gray-400 transition-opacity duration-300 min-h-[6em]">
                   {isExpanded
                     ? service.longDesc
                     : service.shortDesc
                   }
                   {/* Add visually hidden text for screen readers */}
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
