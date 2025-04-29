"use client"; // Directive for Next.js client components

import React, { useState, useEffect } from "react"; // Import React hooks
import Image from "next/image"; // Import Next.js Image component for optimized images
// Import motion components for internal animations (expand/collapse, button icon, CV link)
import { motion, AnimatePresence } from "motion/react";

// TODO: Extract this hook into a shared utility file (e.g., src/hooks/usePrefersReducedMotion.ts)
// to avoid duplication across components (AnimatedSection, AboutSection, etc.).
// Custom hook to detect user's preference for reduced motion
const usePrefersReducedMotionInternal = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    // Using addEventListener with cleanup for modern browsers
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
    // Note: Fallback for older browsers (addListener/removeListener) was removed for brevity,
    // re-evaluate if needed based on target browser support.
  }, []);
  return prefersReducedMotion;
};

// AboutSection component definition
export default function AboutSection() {
  // State to manage whether the additional about text and skills are visible
  const [aboutExpanded, setAboutExpanded] = useState(false);

  // Consistent focus style for interactive elements
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]"; // White glow on focus

  // Check for reduced motion preference specifically for the internal animations within this component
  const prefersReducedMotion = usePrefersReducedMotionInternal();

  return (
    // Section container for the "About Me" content
    // Padding applied, text color set
    // id="about" is handled by the parent AnimatedSection wrapper in page.tsx
    <section className="py-12 sm:py-16 text-gray-100" aria-labelledby="about-heading">
      {/* Responsive container to constrain width and add horizontal padding */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">About Me</h2>
        {/* Initial introductory paragraph */}
        <p className="mb-4 text-base sm:text-lg">
          I&apos;m Marius Øvrebø, a passionate Junior Fullstack Developer with a background in interactive design and 3D art.
        </p>

        {/* AnimatePresence manages the mounting/unmounting animation of the expanded content */}
        <AnimatePresence initial={false}>
          {/* Conditionally render the expanded content based on aboutExpanded state */}
          {aboutExpanded && (
            // motion.div handles the expand/collapse animation (height and opacity)
            <motion.div
              className="mt-4 overflow-hidden" // Margin top and hide overflow during animation
              // Initial animation state (collapsed) - disabled if reduced motion is preferred
              initial={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
              // Animate to state (expanded) - disabled if reduced motion is preferred
              animate={prefersReducedMotion ? undefined : { opacity: 1, height: "auto" }}
              // Exit animation state (collapsing) - disabled if reduced motion is preferred
              exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
              // Animation transition settings - disabled if reduced motion is preferred
              transition={prefersReducedMotion ? undefined : { duration: 0.5, ease: "easeInOut" }}
              // TODO: Consider adding aria-live="polite" to announce content changes to screen readers, though AnimatePresence might handle focus management adequately.
            >
              {/* Additional paragraph shown when expanded */}
              <p className="mb-4 text-base sm:text-lg">
                I blend creative design with technical expertise to build immersive digital experiences. I&apos;ve worked on projects ranging from dynamic web applications to captivating 3D visualizations. My multidisciplinary skills allow me to approach challenges with a unique perspective, delivering innovative and engaging solutions.
              </p>
              {/* Skills subsection */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Skills & tools</h3>
              {/* Container for skill icons and labels */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                 {/* Individual skill item */}
                 {/* TODO: Consider creating a reusable SkillIcon component to reduce repetition. */}
                 {/* TODO: Ensure all icons have appropriate alt text and consider adding tooltips for clarity if needed. */}
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/figma.svg" alt="Figma" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">Figma</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/typescript.svg" alt="TypeScript" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">Typescript</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/javascript.svg" alt="JavaScript" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">Javascript</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/java.svg" alt="Java" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">Java</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/c-sharp.svg" alt="C#" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">C#</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/next-js.svg" alt="Next.js" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">Next.js</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/react.png" alt="React" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">React</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/blender.svg" alt="Blender" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">Blender</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Image src="/icons/unreal-engine.svg" alt="Unreal Engine" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                   <span className="text-sm sm:text-base hidden md:inline">Unreal Engine</span>
                 </div>
                 {/* TODO: Add more relevant skills/tools if applicable. */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Container for the action buttons below the text */}
        <div className="mt-4 flex items-center justify-between">
            {/* Read More / Show Less Button */}
            <button
              onClick={() => setAboutExpanded(!aboutExpanded)} // Toggle the expanded state
              aria-expanded={aboutExpanded} // Indicate state to assistive technologies
              // Styling: Flex alignment, background, padding, text size/color, font weight, rounded corners, transition, hover/focus states
              className={`inline-flex items-center bg-[#450086] px-4 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none ${focusVisibleShadow}`}
            >
              {/* Button text changes based on state */}
              {aboutExpanded ? "Show less" : "Read more"}
              {/* Animated Chevron Icon */}
              <motion.svg
                className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" // Sizing and margin
                initial={false} // No initial animation needed for the icon itself
                // Animate rotation based on expanded state - disabled if reduced motion preferred
                animate={prefersReducedMotion ? undefined : { rotate: aboutExpanded ? 180 : 0 }}
                // Transition for the rotation - disabled if reduced motion preferred
                transition={prefersReducedMotion ? undefined : { duration: 0.3 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true" // Hide decorative icon from screen readers
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            {/* Download CV Link (Conditionally Rendered & Animated) */}
            <AnimatePresence>
               {/* Only render the link when the section is expanded */}
               {aboutExpanded && (
                 // motion.div handles the fade-in/out animation of the link
                 <motion.div
                    // Initial animation state (off-screen right, faded out) - disabled if reduced motion preferred
                    initial={prefersReducedMotion ? undefined : { opacity: 0, x: 10 }}
                    // Animate to state (on-screen, fully visible) - disabled if reduced motion preferred
                    animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                    // Exit animation state (off-screen right, faded out) - disabled if reduced motion preferred
                    exit={prefersReducedMotion ? undefined : { opacity: 0, x: 10 }}
                    // Animation transition - disabled if reduced motion preferred
                    transition={prefersReducedMotion ? undefined : { duration: 0.3 }}
                 >
                   {/* Actual link element, styled like a button */}
                   <a
                     href="/resume.pdf" // Path to the CV file in the public directory
                     target="_blank" // Open in a new tab
                     rel="noopener noreferrer" // Security best practice for target="_blank"
                     // Styling: Matches the "Read more" button style
                     className={`inline-block bg-[#450086] px-4 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none ${focusVisibleShadow}`}
                   >
                     Download CV
                     {/* Screen reader only text to announce the link opens in a new tab */}
                     <span className="sr-only"> (opens in new tab)</span>
                   </a>
                 </motion.div>
               )}
            </AnimatePresence>
        </div>

      </div> {/* End Responsive container */}
    </section>
  );
}
