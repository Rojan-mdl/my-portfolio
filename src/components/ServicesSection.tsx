"use client"; // Directive for Next.js client components

import React, { useState, useEffect, useRef } from "react"; // Import React and useState hook
import { motion, AnimatePresence } from "motion/react"; // Uncommented for animation
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"; // Import the shared hook

// ServicesSection component definition
export default function ServicesSection() {
  // State to track which service card is currently expanded (null means none are expanded)
  const [expandedService, setExpandedService] = useState<number | null>(null);
  // Check for user's reduced motion preference
  const prefersReducedMotion = usePrefersReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null); // Ref for the grid container

  // Function to toggle the expanded state of a service card
  // If the clicked card is already expanded, collapse it (set state to null).
  // Otherwise, expand the clicked card (set state to its index).
  const toggleService = (index: number) =>
    setExpandedService(expandedService === index ? null : index);

  // Placeholder data for the services offered
  const services = [
    {
      title: "Web Development",
      shortDesc: "Building responsive and fast websites.",
      longDesc:
        "Full-stack web development using modern technologies like Next.js, React, and TypeScript to create performant and user-friendly applications.",
    },
    {
      title: "3D Visualization",
      shortDesc: "Bringing concepts to life in 3D.",
      longDesc:
        "Creating compelling 3D models, animations, and visualizations for products, architecture, or interactive experiences using tools like Blender.",
    },
    {
      title: "Interactive Design",
      shortDesc: "Designing engaging user experiences.",
      longDesc:
        "Focusing on user interaction and experience design, prototyping with Figma, and implementing interactive elements that delight users.",
    },
    // TODO: Add or modify services as needed.
  ];

  // Animation variants for the description paragraph
  const descriptionVariants = {
    collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
    expanded: { opacity: 1, height: "auto", marginTop: "0.5rem", marginBottom: "0.5rem" }, // Adjust margin as needed
  };

  // Effect to handle clicks outside the grid container to collapse the expanded service
  useEffect(() => {
    // Only add listener if a service is expanded
    if (expandedService === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target exists and if the grid ref exists
      // Check if the clicked element is outside the grid container
      if (
        gridRef.current &&
        !gridRef.current.contains(event.target as Node)
      ) {
        setExpandedService(null); // Collapse the service
      }
    };

    // Add event listener on mousedown (fires before click and potentially blur)
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedService]); // Re-run effect when expandedService changes

  return (
    // Section container for Services
    // id="services" is handled by the parent AnimatedSection wrapper in page.tsx
    <section
      className="py-16 my-26 text-gray-100"
      aria-labelledby="services-heading"
    >
      {/* Responsive container */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2
          id="services-heading"
          className="text-3xl font-bold mb-8 text-center"
        >
          Services
        </h2>
        {/* Grid layout for service cards - Attach the ref here */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map through the services data to render each service card */}
          {services.map((service, index) => {
            // Determine if the current card is the one that's expanded
            const isExpanded = expandedService === index;
            return (
              // Use a div container for layout and apply button semantics/styling to an inner element if needed, or keep button if layout allows
              // Keeping button for simplicity here, ensure layout inside works
              <button
                key={index} // Unique key for React list rendering
                onClick={() => toggleService(index)} // Call toggle function on click
                aria-expanded={isExpanded} // Indicate expansion state to assistive technologies
                // Styling: Background, rounded corners, padding, text alignment, cursor, focus style
                // Hover effect: Slight scale increase (disabled if reduced motion preferred)
                className={`bg-[#0A0A0A] rounded-lg p-6 text-left cursor-pointer focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff] overflow-hidden ${prefersReducedMotion ? "" : "transition duration-200 ease-in-out hover:scale-[1.03]"}`}
                // TODO: Manually check contrast between text and #0A0A0A background.
              >
                {/* Inner container to ensure top alignment (though likely default behavior) */}
                <div className="flex flex-col h-full">
                  {/* Service Title */}
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>

                  {/* Short description always visible */}
                  <p className="text-gray-400">
                    {service.shortDesc}
                    {/* Screen reader text to hint at expansion */}
                    {!isExpanded && <span className="sr-only"> (expand details)</span>}
                  </p>

                  {/* Service Description Paragraph - Animated */}
                  {/* Container for the animated paragraph to ensure it flows correctly */}
                  <div className="relative">
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.p
                          key="longDesc" // Add key for AnimatePresence
                          className="text-gray-400 mt-2" // Add margin top
                          variants={prefersReducedMotion ? undefined : descriptionVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {service.longDesc}
                          {/* Screen reader text to hint at collapsing */}
                          <span className="sr-only"> (collapse details)</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>{" "}
      {/* End max-w-6xl container */}
    </section>
  );
}
