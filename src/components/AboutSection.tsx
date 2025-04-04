"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutSection() {
  const [aboutExpanded, setAboutExpanded] = useState(false);

  return (
    <section id="about" className="py-12 sm:py-16 text-gray-100" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">About Me</h2>
        <p className="mb-4 text-base sm:text-lg">
          I&apos;m Marius Øvrebø, a passionate Junior Fullstack Developer with a background in interactive design and 3D art.
        </p>

        <AnimatePresence initial={false}>
          {aboutExpanded && (
            <motion.div
              className="mt-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <p className="mb-4 text-base sm:text-lg">
                I blend creative design with technical expertise to build immersive digital experiences. I&apos;ve worked on projects ranging from dynamic web applications to captivating 3D visualizations. My multidisciplinary skills allow me to approach challenges with a unique perspective, delivering innovative and engaging solutions.
              </p>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Skills &amp; tools</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                {/* Skill Items */}
                <div className="flex items-center space-x-2">
                  <Image src="/icons/figma.svg" alt="Figma" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">Figma</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/icons/typescript.svg" alt="Typescript" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">Typescript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/icons/javascript.svg" alt="Javascript" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">Javascript</span>
                </div>
                 <div className="flex items-center space-x-2">
                  <Image src="/icons/java.svg" alt="Java" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">Java</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/icons/c-sharp.svg" alt="C#" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">C#</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/icons/next-js.svg" alt="Next.js" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">Next.js</span>
                </div>
                 <div className="flex items-center space-x-2">
                  <Image src="/icons/react.png" alt="React" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">React</span>
                </div>
                 <div className="flex items-center space-x-2">
                  <Image src="/icons/blender.svg" alt="Blender" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">Blender</span>
                </div>
                 <div className="flex items-center space-x-2">
                  <Image src="/icons/unreal-engine.svg" alt="Unreal Engine" width={28} height={28} className="sm:w-8 sm:h-8" loading="lazy"/>
                  <span className="text-sm sm:text-base">Unreal Engine</span>
                </div>
              </div>
              <div className="mt-4 flex justify-start sm:justify-end">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#450086] px-4 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff]"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Read More Button */}
        <button
          onClick={() => setAboutExpanded(!aboutExpanded)}
          aria-expanded={aboutExpanded}
          aria-controls="about-details"
          className="mt-4 inline-flex items-center bg-[#450086] px-4 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff]"
        >
          {aboutExpanded ? "Show Less" : "Read More"}
          <motion.svg
            className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4"
            initial={false}
            animate={{ rotate: aboutExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>
    </section>
  );
}