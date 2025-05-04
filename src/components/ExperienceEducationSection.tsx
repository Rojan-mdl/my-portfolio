"use client"; // Directive for Next.js client components

"use client"; // Directive for Next.js client components

import React, { useState } from "react"; // Import React and useState hook
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link"; // Import Next.js Link component for navigation
import ToolIcon from "./ToolIcon"; // Import the reusable ToolIcon component
import { motion, AnimatePresence } from "motion/react"; // Import motion components
// Removed react-icons imports as ToolIcon now handles the mapping internally
// Removed duplicate Image import

// Note: usePrefersReducedMotion hook was removed, assuming animations are handled by parent or not needed here.

// ExperienceEducationSection component definition
// Define animation variants for a gentler sliding/fading effect
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50, // Start slightly off-center
    opacity: 0,
  }),
  center: {
    x: 0, // Center position
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50, // Exit slightly off-center
    opacity: 0,
  }),
};

export default function ExperienceEducationSection() {
  // State to manage which tab ('experience' or 'education') is currently active
  // Store both the name and an index for direction calculation
  const [[activeTabIndex, activeTabName], setActiveTab] = useState<
    [number, "experience" | "education"]
  >([0, "experience"]);
  const [direction, setDirection] = useState(0); // State to store the animation direction

  // Function to handle tab changes and set direction
  const handleTabChange = (
    newIndex: number,
    newName: "experience" | "education"
  ) => {
    setDirection(newIndex > activeTabIndex ? 1 : -1); // 1 for right, -1 for left
    setActiveTab([newIndex, newName]);
  };

  // Consistent focus style variables for accessibility and visual feedback
  const focusVisibleRing =
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[#450086]"; // Ring style for tab buttons
  const focusVisibleShadow = "focus-visible:shadow-[0_0_3px_1px_#ffffff]"; // Shadow style for links (e.g., school logos)

  return (
    // Section container for Experience & Education
    // id="experience-education" is handled by the parent AnimatedSection wrapper in page.tsx
    <section
      className="py-16 my-26 text-gray-100"
      aria-labelledby="exp-edu-heading"
    >
      {/* Container to constrain width and add padding */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2
          id="exp-edu-heading"
          className="text-3xl font-bold mb-8 text-center"
        >
          Experience & Education
        </h2>

        {/* Tab Switcher Buttons Container */}
        {/* ARIA role="tablist" indicates this is a group of tabs */}
        <div
          role="tablist"
          aria-label="Experience and Education"
          className="flex justify-center sm:justify-start space-x-4 mb-8"
        >
          {/* Experience Tab Button */}
          <button
            role="tab" // ARIA role for a tab button
            aria-selected={activeTabName === "experience"} // Indicates if this tab is currently selected
            aria-controls="experience-panel" // Links this button to the corresponding tab panel
            id="experience-tab" // Unique ID for the tab button
            onClick={() => handleTabChange(0, "experience")} // Use handler with index 0
            // Styling: Padding, rounded corners, font weight, transition, focus styles, conditional background/text color based on active state
            className={`px-4 py-2 rounded font-semibold transition focus:outline-none ${focusVisibleRing} ${
              activeTabName === "experience"
                ? "bg-[#450086] text-white" // Active tab style
                : "bg-gray-700 text-gray-300 hover:bg-gray-600" // Inactive tab style
            }`}
          >
            Experience
          </button>
          {/* Education Tab Button */}
          <button
            role="tab" // ARIA role
            aria-selected={activeTabName === "education"} // Indicates selection state
            aria-controls="education-panel" // Links to the education panel
            id="education-tab" // Unique ID
            onClick={() => handleTabChange(1, "education")} // Use handler with index 1
            // Styling: Similar to the experience tab button
            className={`px-4 py-2 rounded font-semibold transition focus:outline-none ${focusVisibleRing} ${
              activeTabName === "education"
                ? "bg-[#450086] text-white" // Active style
                : "bg-gray-700 text-gray-300 hover:bg-gray-600" // Inactive style
            }`}
          >
            Education
          </button>
        </div>

        {/* Tab Content Container with AnimatePresence for transitions */}
        {/* Added overflow-hidden to clip exiting content */}
        <div className="relative overflow-hidden h-[1200px] sm:h-[650px]">
          {" "}
          {/* Reinstated height, adjust as needed */}
          {/* Use custom direction state */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {/* Experience Panel - Conditionally rendered */}
            {activeTabName === "experience" && (
              <motion.div
                key="experience" // Unique key for AnimatePresence
                custom={direction} // Pass direction to variants
                variants={variants} // Use defined variants
                role="tabpanel"
                id="experience-panel"
                aria-labelledby="experience-tab"
                className="space-y-8 absolute w-full" // Added absolute positioning and full width
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5, // Slower duration
                  ease: "easeInOut", // Smoother easing
                }}
              >
                {/* --- SATS Experience Item --- */}
                {/* --- SATS Experience Item --- */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0 mt-4">
                    <Image
                      src="/icons/sats.svg"
                      alt="SATS Logo"
                      width={48}
                      height={48}
                      className="rounded"
                      loading="lazy"
                    />
                  </div>
                  {/* Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">
                      SATS — Project Manager & Designer (Intern)
                    </h3>
                    <p className="text-gray-400">
                      Jan 2025 - Present | Oslo, Norway
                    </p>
                    {/* Description points */}
                    <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                      <li>Led a team on a company project</li>
                      <li>
                        Transitioned from designer to project manager under
                        senior guidance, gaining valuable project management
                        experience.
                      </li>
                      {/* TODO: Add more specific achievements or responsibilities if possible. */}
                    </ul>
                    {/* Tools Used */}
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Tools:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {/* Reusable ToolIcon components using iconName prop */}
                        <ToolIcon
                          iconName="Figma"
                          alt="Figma"
                          label="Figma"
                          size={24}
                        />
                        <ToolIcon
                          iconName="Next.js"
                          alt="Next.js"
                          label="Next.js"
                          size={24}
                        />
                        <ToolIcon
                          iconName="React"
                          alt="React"
                          label="React"
                          size={24}
                        />
                        <ToolIcon
                          iconName="TypeScript"
                          alt="TypeScript"
                          label="TypeScript"
                          size={24}
                        />
                        <ToolIcon
                          iconName="JavaScript"
                          alt="JavaScript"
                          label="JavaScript"
                          size={24}
                        />
                        <ToolIcon iconName="C#" alt="C#" label="C#" size={24} />
                        <ToolIcon
                          iconName="Jira"
                          alt="Jira"
                          label="Jira"
                          size={24}
                        />
                        <ToolIcon
                          iconName="Azure"
                          alt="Azure"
                          label="Azure"
                          size={24}
                        />
                        <ToolIcon
                          iconName="SQL"
                          alt="SQL"
                          label="SQL"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* --- Unity Arena Experience Item --- */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0 mt-2">
                    <Image
                      src="/icons/unity-arena.svg"
                      alt="Unity Arena Logo"
                      width={48}
                      height={48}
                      className="rounded"
                      loading="lazy"
                    />
                  </div>
                  {/* Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">
                      Unity Arena — Freelance 3D Artist
                    </h3>
                    <p className="text-gray-400">
                      Nov 2022 - Present | Greater Oslo Region
                    </p>
                    <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                      <li>Created high-end videos for concept visualization</li>
                      <li>Provided 3D assets for websites & promotions</li>
                      {/* TODO: Link to specific examples or portfolio pieces if available. */}
                    </ul>
                    {/* Tools Used */}
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Tools:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <ToolIcon
                          iconName="Blender"
                          alt="Blender"
                          label="Blender"
                          size={24}
                        />
                        <ToolIcon
                          iconName="After Effects"
                          alt="After Effects"
                          label="After Effects"
                          size={24}
                        />
                        <ToolIcon
                          iconName="DaVinci Resolve"
                          alt="DaVinci Resolve"
                          label="DaVinci Resolve"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* --- PlayStation Experience Item --- */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <Image
                      src="/icons/playstation.svg"
                      alt="PlayStation Logo"
                      width={48}
                      height={48}
                      className="rounded"
                      loading="lazy"
                    />
                  </div>
                  {/* Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">
                      PlayStation — Freelance 3D Artist
                    </h3>
                    <p className="text-gray-400">
                      Sep 2021 - Mar 2022 | Oslo, Norway
                    </p>
                    <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                      <li>Created 3D entertainment assets & videos</li>
                      <li>Undisclosed project details</li>
                      {/* TODO: If any details become public, update this section. */}
                    </ul>
                    {/* Tools Used */}
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Tools:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <ToolIcon
                          iconName="Blender"
                          alt="Blender"
                          label="Blender"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* TODO: Add more experience items if applicable. */}
              </motion.div>
            )}

            {/* Education Panel - Conditionally rendered */}
            {activeTabName === "education" && (
              <motion.div
                key="education" // Unique key for AnimatePresence
                custom={direction} // Pass direction to variants
                variants={variants} // Use defined variants
                role="tabpanel"
                id="education-panel"
                aria-labelledby="education-tab"
                className="space-y-8 absolute w-full" // Added absolute positioning and full width
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5, // Slower duration
                  ease: "easeInOut", // Smoother easing
                }}
              >
                {/* --- Kristiania Education Item --- */}
                {/* --- Kristiania Education Item --- */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo with Link */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <Link
                      href="https://www.kristiania.no/studier/bachelor/informasjonsteknologi-interaksjonsdesign/" // Link to the program page
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security measure for target="_blank"
                      // Styling: Inline block, rounded corners, focus style
                      className={`inline-block rounded focus:outline-none ${focusVisibleShadow}`}
                    >
                      <Image
                        src="/icons/kristiania.jpg"
                        alt="Kristiania Logo"
                        width={48}
                        height={48}
                        className="rounded"
                        loading="lazy"
                      />
                      {/* Screen reader text for link behavior */}
                      <span className="sr-only">
                        {" "}
                        (opens Kristiania website in new tab)
                      </span>
                    </Link>
                  </div>
                  {/* Details */}
                  <div className="flex-grow">
                    {/* Using ' for the apostrophe */}
                    <h3 className="text-xl font-semibold">
                      Kristiania — Bachelor&apos;s in Interactive Design
                    </h3>
                    <p className="text-gray-400">Sep 2022 - Jul 2025</p>
                    <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                      <li>
                        Covers programming, web development, interaction design,
                        user testing, and analytics.
                      </li>
                      <li>
                        Engaged in project-based learning, including a design
                        project and a bachelor project with industry partners.
                      </li>
                      {/* TODO: Mention specific achievements or key projects if desired. */}
                    </ul>
                    {/* Tools Used */}
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Tools:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <ToolIcon
                          iconName="Figma"
                          alt="Figma"
                          label="Figma"
                          size={24}
                        />
                        <ToolIcon
                          iconName="React"
                          alt="React"
                          label="React"
                          size={24}
                        />
                        <ToolIcon
                          iconName="Typescript"
                          alt="Typescript"
                          label="Typescript"
                          size={24}
                        />
                        <ToolIcon
                          iconName="Javascript"
                          alt="Javascript"
                          label="Javascript"
                          size={24}
                        />
                        <ToolIcon iconName="C#" alt="C#" label="C#" size={24} />
                        <ToolIcon
                          iconName="Java"
                          alt="Java"
                          label="Java"
                          size={24}
                        />
                        <ToolIcon
                          iconName="SQL"
                          alt="SQL"
                          label="SQL"
                          size={24}
                        />
                        <ToolIcon
                          iconName="HTML5"
                          alt="HTML5"
                          label="HTML5"
                          size={24}
                        />
                        <ToolIcon
                          iconName="CSS"
                          alt="CSS"
                          label="CSS"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* --- Noroff: Gamedesign Item --- */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo with Link */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <Link
                      href="https://www.noroff.no/studier/fagskole/3d-design-spillteknologi-interaktiv" // Link to program page
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block rounded focus:outline-none ${focusVisibleShadow}`}
                    >
                      <Image
                        src="/icons/noroff.png"
                        alt="Noroff Logo"
                        width={48}
                        height={48}
                        className="rounded"
                        loading="lazy"
                      />
                      <span className="sr-only">
                        {" "}
                        (opens Noroff website in new tab)
                      </span>
                    </Link>
                  </div>
                  {/* Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">
                      Noroff — Gamedesign
                    </h3>
                    <p className="text-gray-400">Aug 2019 - Jul 2020</p>
                    <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                      <li>
                        Developed creative and interactive game content and
                        gamification.
                      </li>
                      <li>
                        Acquired skills in concept development, level design,
                        and scripting with Unreal Engine.
                      </li>
                      <li>
                        Combined game concepts with technical skills,
                        architecture, and art.
                      </li>
                    </ul>
                    {/* Tools Used */}
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Tools:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <ToolIcon
                          iconName="Blender"
                          alt="Blender"
                          label="Blender"
                          size={24}
                        />
                        <ToolIcon
                          iconName="Unreal Engine"
                          alt="Unreal Engine"
                          label="Unreal Engine"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* --- Noroff: 3D Design and Animation Item --- */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo with Link */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <Link
                      href="https://www.noroff.no/studier/fagskole/3d-design-spillteknologi-interaktiv" // Link to program page
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block rounded focus:outline-none ${focusVisibleShadow}`}
                    >
                      <Image
                        src="/icons/noroff.png"
                        alt="Noroff Logo"
                        width={48}
                        height={48}
                        className="rounded"
                        loading="lazy"
                      />
                      <span className="sr-only">
                        {" "}
                        (opens Noroff website in new tab)
                      </span>
                    </Link>
                  </div>
                  {/* Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">
                      Noroff — 3D Design & Animation
                    </h3>
                    <p className="text-gray-400">Jan 2018 - Jun 2019</p>
                    <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                      <li>
                        Prepared for a career in games, animation, visual
                        effects, advertising, and visualization.
                      </li>
                      <li>
                        Engaged in project-based learning (modeling, texturing,
                        lighting, rendering, etc.).
                      </li>
                    </ul>
                    {/* Tools Used */}
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Tools:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {/* Use ToolIcon for all, including those that will fallback to Image */}
                        <ToolIcon
                          iconName="3ds Max"
                          alt="3ds Max"
                          label="3ds Max"
                          size={24}
                        />{" "}
                        {/* Using "3ds Max" label */}
                        <ToolIcon
                          iconName="Nuke"
                          alt="Nuke"
                          label="Nuke"
                          size={24}
                        />
                        <ToolIcon
                          iconName="Zbrush"
                          alt="Zbrush"
                          label="Zbrush"
                          size={26}
                        />
                        <ToolIcon
                          iconName="Substance Painter"
                          alt="Substance Painter"
                          label="Substance Painter"
                          size={26}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* TODO: Add more education items if applicable. */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>{" "}
      {/* End max-w-6xl container */}
    </section>
  );
}
