"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ToolIcon from "./ToolIcon";
import { motion, AnimatePresence } from "motion/react";


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

  // Focus style variables for accessibility
  const focusVisibleRing =
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[#450086]";
  const focusVisibleShadow = "focus-visible:shadow-[0_0_3px_1px_#ffffff]";

  return (
    // Section container for Experience & Education
    <section
      className="py-16 my-26 text-gray-100"
      aria-labelledby="exp-edu-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
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
            aria-selected={activeTabName === "experience"} // Indicates selection
            aria-controls="experience-panel" // Links to the experience panel
            id="experience-tab"
            onClick={() => handleTabChange(0, "experience")}
            className={`px-4 py-2 rounded font-semibold transition focus:outline-none ${focusVisibleRing} ${
              activeTabName === "experience"
                ? "bg-[#450086] text-white" // Active tab
                : "bg-gray-700 text-gray-300 hover:bg-gray-600" // Inactive tab
            }`}
          >
            Experience
          </button>
          {/* Education Tab Button */}
          <button
            role="tab" // ARIA role
            aria-selected={activeTabName === "education"} // Indicates selection
            aria-controls="education-panel" // Links to the education panel
            id="education-tab"
            onClick={() => handleTabChange(1, "education")}
            className={`px-4 py-2 rounded font-semibold transition focus:outline-none ${focusVisibleRing} ${
              activeTabName === "education"
                ? "bg-[#450086] text-white" // Active tab
                : "bg-gray-700 text-gray-300 hover:bg-gray-600" // Inactive tab
            }`}
          >
            Education
          </button>
        </div>

        {/* Tab Content Container with AnimatePresence for transitions */}
        <div className="relative overflow-hidden h-[1200px] sm:h-[650px]">
          {" "}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {/* Experience Panel - Conditionally rendered */}
            {activeTabName === "experience" && (
              <motion.div
                key="experience"
                custom={direction}
                variants={variants}
                role="tabpanel"
                id="experience-panel"
                aria-labelledby="experience-tab"
                className="space-y-8 absolute w-full"
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {/* SATS Experience */}
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
                    </ul>
                    {/* Tools used */}
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
                        <ToolIcon 
                          iconName="C#" 
                          alt="C#" 
                          label="C#" 
                          size={24} 
                        />
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
                {/* Unity Arena Experience */}
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
                    </ul>
                    {/* Tools used */}
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
                          iconName="Adobe After Effects"
                          alt="Adobe After Effects"
                          label="Adobe After Effects"
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
                {/* PlayStation Experience */}
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
                    </ul>
                    {/* Tools used */}
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
              </motion.div>
            )}

            {/* Education Panel - Conditionally rendered */}
            {activeTabName === "education" && (
              <motion.div
                key="education"
                custom={direction}
                variants={variants}
                role="tabpanel"
                id="education-panel"
                aria-labelledby="education-tab"
                className="space-y-8 absolute w-full"
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {/* Kristiania Education */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo with Link */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <Link
                      href="https://www.kristiania.no/studier/bachelor/informasjonsteknologi-interaksjonsdesign/"
                      target="_blank"
                      rel="noopener noreferrer"
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
                      {/* Screen reader text for link */}
                      <span className="sr-only">
                        {" "}
                        (opens Kristiania website in new tab)
                      </span>
                    </Link>
                  </div>
                  {/* Details */}
                  <div className="flex-grow">
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
                    </ul>
                    {/* Tools used */}
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
                        <ToolIcon 
                          iconName="C#" 
                          alt="C#" 
                          label="C#" 
                          size={24} 
                        />
                        <ToolIcon
                          iconName="Python"
                          alt="Python"
                          label="Python"
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
                {/* Noroff: Gamedesign */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo with Link */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <Link
                      href="https://www.noroff.no/studier/fagskole/3d-design-spillteknologi-interaktiv"
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
                      {/* Screen reader text for link */}
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
                    <p className="text-gray-400">Sep 2019 - Jul 2020</p>
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
                    {/* Tools used */}
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
                {/* Noroff: 3D Design and Animation */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Logo with Link */}
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <Link
                      href="https://www.noroff.no/studier/fagskole/3d-design-spillteknologi-interaktiv"
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
                      {/* Screen reader text for link */}
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
                    <p className="text-gray-400">Sep 2018 - Jul 2019</p>
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
                    {/* Tools used */}
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Tools:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <ToolIcon
                          iconName="Maya"
                          alt="Maya"
                          label="Maya"
                          size={24}
                        />{" "}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>{" "}
    </section>
  );
}
