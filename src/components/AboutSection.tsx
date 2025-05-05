"use client"; // Directive for Next.js client components

import React, { useState } from "react"; // Import React hooks (removed useEffect)
// Removed Image import
// Import motion components for internal animations (expand/collapse, button icon, CV link)
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"; // Import the extracted hook
import {
  SiFigma,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiBlender,
  SiUnrealengine,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import SkillIcon from "./SkillIcon"; // Import the new SkillIcon component

// AboutSection component definition
export default function AboutSection() {
  // State to manage whether the additional about text and skills are visible
  const [aboutExpanded, setAboutExpanded] = useState(false);

  // Consistent focus style for interactive elements
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]"; // White glow on focus

  // Check for reduced motion preference specifically for the internal animations within this component
  const prefersReducedMotion = usePrefersReducedMotion(); // Use the imported hook

  return (
    // Section container for the "About Me" content
    // Padding applied, text color set
    // id="about" is handled by the parent AnimatedSection wrapper in page.tsx
    <section
      className="py-12 sm:py-16 my-26 text-gray-100"
      aria-labelledby="about-heading"
    >
      {/* Responsive container to constrain width and add horizontal padding */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2
          id="about-heading"
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
        >
          About Me
        </h2>
        {/* Initial introductory paragraph */}
        <p className="mb-4 text-base sm:text-lg">
          I&apos;m Marius Øvrebø, a passionate Junior Fullstack Developer with a
          background in interactive design and 3D art.
        </p>

        {/* AnimatePresence manages the mounting/unmounting animation of the expanded content */}
        <AnimatePresence initial={false}>
          {/* Conditionally render the expanded content based on aboutExpanded state */}
          {aboutExpanded && (
            // motion.div handles the expand/collapse animation (height and opacity)
            <motion.div
              className="mt-4 overflow-hidden" // Re-added overflow-hidden
              // Initial animation state (collapsed and faded out) - disabled if reduced motion is preferred
              initial={
                prefersReducedMotion ? undefined : { opacity: 0, height: 0 }
              }
              // Animate to state (expanded and fully visible) - disabled if reduced motion is preferred
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, height: "auto" }
              }
              // Exit animation state (collapsing and fading out) - disabled if reduced motion is preferred
              exit={
                prefersReducedMotion ? undefined : { opacity: 0, height: 0 }
              }
              // Animation transition settings - disabled if reduced motion is preferred
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 0.5, ease: "easeInOut" }
              } // Increased duration
              // Note: aria-live="polite" was considered but omitted as AnimatePresence often handles
              // focus management adequately for expand/collapse sections, preventing redundant announcements.
            >
              {/* Additional paragraph shown when expanded */}
              <p className="mb-4 text-base sm:text-lg">
                I blend creative design with technical expertise to build
                immersive digital experiences. I&apos;ve worked on projects
                ranging from dynamic web applications to captivating 3D
                visualizations. My multidisciplinary skills allow me to approach
                challenges with a unique perspective, delivering innovative and
                engaging solutions.
              </p>
              {/* Skills subsection */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Skills & tools
              </h3>
              {/* Container for skill icons and labels */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                {/* Individual skill item */}
                {/* Replaced repetitive divs with SkillIcon component */}
                {/* Note: Icons use aria-label for accessibility as labels are hidden on small screens. Tooltips could be added for enhancement. */}
                <SkillIcon icon={SiFigma} label="Figma" />
                <SkillIcon icon={SiTypescript} label="Typescript" />
                <SkillIcon icon={SiJavascript} label="Javascript" />
                <SkillIcon icon={FaJava} label="Java" />
                <SkillIcon icon={TbBrandCSharp} label="C#" />
                <SkillIcon icon={SiNextdotjs} label="Next.js" />
                <SkillIcon icon={SiReact} label="React" />
                <SkillIcon icon={SiBlender} label="Blender" />
                <SkillIcon icon={SiUnrealengine} label="Unreal Engine" />
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
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: aboutExpanded ? 180 : 0 }
              }
              // Transition for the rotation - disabled if reduced motion preferred
              transition={prefersReducedMotion ? undefined : { duration: 0.3 }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true" // Hide decorative icon from screen readers
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>

          {/* Download CV Link (Conditionally Rendered & Animated) */}
          <AnimatePresence>
            {/* Only render the link when the section is expanded */}
            {aboutExpanded && (
              // motion.div handles the fade-in/out animation of the link
              <motion.div
                // Initial animation state (off-screen right, faded out) - disabled if reduced motion preferred
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, x: 10 }
                }
                // Animate to state (on-screen, fully visible) - disabled if reduced motion preferred
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                }
                // Exit animation state (off-screen right, faded out) - disabled if reduced motion preferred
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: 10 }}
                // Animation transition - disabled if reduced motion preferred
                transition={
                  prefersReducedMotion ? undefined : { duration: 0.3 }
                }
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
      </div>{" "}
      {/* End Responsive container */}
    </section>
  );
}
