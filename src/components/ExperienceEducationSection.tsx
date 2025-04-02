"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ExperienceEducationSection() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  // Fixed minimum height
  const tabContentMinHeight = "min-h-[450px]";

  return (
    <section id="experience-education" className="py-16 text-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Experience & Education
        </h2>
        {/* Tab switcher */}
        <div role="tablist" className="flex space-x-4 mb-8">
          <button
            role="tab"
            aria-selected={activeTab === "experience"}
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#450086] ${
              activeTab === "experience"
                ? "bg-[#450086] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Experience
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "education"}
            onClick={() => setActiveTab("education")}
            className={`px-4 py-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#450086] ${
              activeTab === "education"
                ? "bg-[#450086] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Education
          </button>
        </div>

        {/* Tab content container with fixed Min-Height */}
        <div className={tabContentMinHeight}>
          {activeTab === "experience" ? (
            <div role="tabpanel" className="space-y-8">
              {/* SATS */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/sats.svg" 
                    alt="SATS Logo"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    SATS — Project Manager &amp; Designer (Intern)
                  </h3>
                  <p className="text-gray-400">Jan 2025 - Present | Oslo, Norway</p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                    <li>Led a team on a company project</li>
                    <li>Transitioned from designer to project manager under senior guidance, gaining valuable experience in project management and the entire project process.</li>
                  </ul>
                  {/* Tools Used */}
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Tools:</p>
                    <div className="mt-1 flex space-x-2">
                      <Image src="/icons/figma.svg" alt="Figma" width={24} height={24} />
                      <Image src="/icons/next-js.svg" alt="Next.js" width={24} height={24} />
                      <Image src="/icons/typescript.svg" alt="Typescript" width={24} height={24} />
                      <Image src="/icons/javascript.svg" alt="Javascript" width={24} height={24} />
                      <Image src="/icons/c-sharp.svg" alt="C#" width={24} height={24} />
                      <Image src="/icons/jira.svg" alt="Jira" width={24} height={24} />
                      <Image src="/icons/azure.svg" alt="Azure" width={24} height={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Unity Arena */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/unity-arena.svg"
                    alt="Unity Arena Logo"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Unity Arena — Freelance 3D Artist
                  </h3>
                  <p className="text-gray-400">
                    Nov 2022 - Present | Greater Oslo Region
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                    <li>Created high-end videos for concept visualization</li>
                    <li>Provided 3D assets for websites & promotions</li>
                  </ul>
                </div>
              </div>

              {/* PlayStation */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/playstation.svg"
                    alt="PlayStation Logo"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    PlayStation — Freelance 3D Artist
                  </h3>
                  <p className="text-gray-400">
                    Sep 2021 - Mar 2022 | Oslo, Norway
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                    <li>Created 3D entertainment assets & videos</li>
                    <li>Undisclosed project details</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div role="tabpanel" className="space-y-8">
              {/* Kristiania */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/kristiania.png"
                    alt="Kristiania Logo"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Kristiania — Bachelor&apos;s in Interactive Design
                  </h3>
                  <p className="text-gray-400">Sep 2022 - Jul 2025</p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                    <li>Focus on interactive design principles</li>
                    <li>3D and animation coursework</li>
                  </ul>
                </div>
              </div>

              {/* Noroff: Spill og interaktiv mediedesign */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/noroff.png"
                    alt="Noroff Logo"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Noroff — BA in Spill og interaktiv mediedesign
                  </h3>
                  <p className="text-gray-400">Aug 2019 - Jul 2020</p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                    <li>Game & interactive media design fundamentals</li>
                  </ul>
                </div>
              </div>

              {/* Noroff: 3D Design and Animation */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/noroff.png"
                    alt="Noroff Logo"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Noroff — BA in 3D Design & Animation
                  </h3>
                  <p className="text-gray-400">Jan 2018 - Jun 2019</p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                    <li>3D modeling, texturing, and animation coursework</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
