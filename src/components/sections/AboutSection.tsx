"use client";

import React, { useState, useEffect, useRef } from "react"; // React hooks

// Motion components for internal animations
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  SiFigma,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiBlender,
  SiUnrealengine,
  SiPython,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { IoChevronDown } from "react-icons/io5";
import SkillIcon from "@/components/ui/SkillIcon";

// AboutSection component definition
export default function AboutSection() {
  // State to manage whether the additional about text and skills are visible
  const [aboutExpanded, setAboutExpanded] = useState(false);
  // State to manage whether the CV language options are visible
  const [showCvOptions, setShowCvOptions] = useState(false);
  // Ref for the CV options container to detect outside clicks
  const cvOptionsRef = useRef<HTMLDivElement>(null);

  // Focus style for interactive elements
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]";

  // Check for reduced motion preference specifically for the internal animations within this component
  const prefersReducedMotion = usePrefersReducedMotion();

  // Effect to handle clicks outside the CV options
  useEffect(() => {
    // Only add listener if options are shown
    if (!showCvOptions) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the referenced div
      if (cvOptionsRef.current && !cvOptionsRef.current.contains(event.target as Node)) {
        setShowCvOptions(false); // Hide options if click is outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove listener on unmount or when options hide
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCvOptions, setShowCvOptions]); // Add setShowCvOptions to dependency array

  return (
    // Section container for the "About Me" content
    <section
      className="py-12 sm:py-16 my-26 text-gray-100"
      aria-labelledby="about-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="about-heading"
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
        >
          About me
        </h2>
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
              className="mt-4 overflow-hidden"
              initial={
                prefersReducedMotion ? undefined : { opacity: 0, height: 0 }
              }
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, height: "auto" }
              }
              exit={
                prefersReducedMotion ? undefined : { opacity: 0, height: 0 }
              }
              // Animation transition settings
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 0.5, ease: "easeInOut" }
              }
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
                {/* Note: Icons use aria-label for accessibility as labels are hidden on small screens */}
                <SkillIcon icon={SiFigma} label="Figma" />
                <SkillIcon icon={SiTypescript} label="Typescript" />
                <SkillIcon icon={SiJavascript} label="Javascript" />
                <SkillIcon icon={SiPython} label="Python" />
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
        <div className="mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0">
          {/* Show more / Show less Button */}
          <button
            onClick={() => {
              const nextExpandedState = !aboutExpanded;
              setAboutExpanded(nextExpandedState);
              // Reset CV options visibility when closing the section
              if (!nextExpandedState) {
                setShowCvOptions(false);
              }
            }}
            aria-expanded={aboutExpanded} // Indicate state to assistive technologies
            className={`inline-flex items-center bg-[#450086] px-4 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none ${focusVisibleShadow}`}
          >
            {/* Button text changes based on state */}
            {aboutExpanded ? "Show less" : "Show more"}
            {/* Animated Arrow (Chevron) Icon */}
            <motion.span
              className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4 inline-block"
              initial={false} // No initial animation
              // Animate rotation based on expanded state
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: aboutExpanded ? 180 : 0 }
              }
              // Transition for the rotation
              transition={prefersReducedMotion ? undefined : { duration: 0.3 }}
              aria-hidden="true" // Hide decorative icon from screen readers
            >
              <IoChevronDown />
            </motion.span>
          </button>

          {/* Download CV Button / Language Options Container */}
          <AnimatePresence mode="wait">
            {/* Only render when the section is expanded */}
            {aboutExpanded && (
              <motion.div
                key={showCvOptions ? "cvOptions" : "cvButton"}
                // Initial animation state (off-screen right, faded out)
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, x: 10 }
                }
                // Animate to state (on-screen, fully visible)
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                }
                // Exit animation state (off-screen right, faded out)
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: 10 }}
                // Animation transition
                transition={
                  prefersReducedMotion ? undefined : { duration: 0.3 }
                }
                className="flex items-center space-x-2"
                ref={cvOptionsRef} // Attach the ref to the container
              >
                {!showCvOptions ? (
                  // Initial "Download CV" button
                  <button
                    onClick={() => setShowCvOptions(true)} // Show options on click
                    className={`inline-block bg-[#450086] px-4 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none ${focusVisibleShadow}`}
                  >
                    Download CV
                  </button>
                ) : (
                  // Language specific CV links
                  <div className="flex items-center space-x-2">
                    <a
                      href="/resume_en.pdf" // English CV
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block bg-[#450086] px-3 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none ${focusVisibleShadow}`}
                    >
                      <span className="hidden sm:inline">English CV</span>
                      <span className="inline sm:hidden">English CV</span>
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                    <a
                      href="/resume_no.pdf" // Norwegian CV
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block bg-[#450086] px-3 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none ${focusVisibleShadow}`}
                    >
                      <span className="hidden sm:inline">Norwegian CV</span>
                      <span className="inline sm:hidden">Norwegian CV</span>
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>{" "}
    </section>
  );
}
