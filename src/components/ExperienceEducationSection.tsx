"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ExperienceEducationSection() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  // Fixed minimum height for the tab content container
  const tabContentMinHeight = "min-h-[450px]";

  return (
    <section id="experience-education" className="py-16 text-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Experience & Education
        </h2>

        {/* Tab Switcher */}
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

        {/* Tab Content Container with Fixed Min-Height */}
        <div className={tabContentMinHeight}>
          {activeTab === "experience" ? (
            <div role="tabpanel" className="space-y-8">
              {/* SATS Experience */}
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
                    SATS — Project Manager & Designer (Intern)
                  </h3>
                  <p className="text-gray-400">Jan 2025 - Present | Oslo, Norway</p>
                  <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                    <li>Led a team on a company project</li>
                    <li>
                      Transitioned from designer to project manager under senior guidance,
                      gaining valuable project management experience.
                    </li>
                  </ul>
                  {/* Tools Used */}
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Tools:</p>
                    <div className="mt-1 flex space-x-2">
                      <ToolIcon src="/icons/figma.svg" alt="Figma" label="Figma" size={32} />
                      <ToolIcon src="/icons/next-js.svg" alt="Next.js" label="Next.js" size={24} />
                      <ToolIcon src="/icons/react.png" alt="React" label="React" size={24} />
                      <ToolIcon src="/icons/typescript.svg" alt="TypeScript" label="TypeScript" size={24} />
                      <ToolIcon src="/icons/javascript.svg" alt="JavaScript" label="JavaScript" size={24} />
                      <ToolIcon src="/icons/c-sharp.svg" alt="C#" label="C#" size={24} />
                      <ToolIcon src="/icons/jira.svg" alt="Jira" label="Jira" size={24} />
                      <ToolIcon src="/icons/azure.svg" alt="Azure" label="Azure" size={24} />
                      <ToolIcon src="/icons/sql.png" alt="SQL" label="SQL" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Unity Arena Experience */}
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
                  <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                    <li>Created high-end videos for concept visualization</li>
                    <li>Provided 3D assets for websites & promotions</li>
                  </ul>
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Tools:</p>
                    <div className="mt-1 flex space-x-2">
                      <ToolIcon src="/icons/adobe-after-effects.svg" alt="After Effects" label="After Effects" size={24} />
                      <ToolIcon src="/icons/blender.svg" alt="Blender" label="Blender" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* PlayStation Experience */}
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
                  <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                    <li>Created 3D entertainment assets & videos</li>
                    <li>Undisclosed project details</li>
                  </ul>
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Tools:</p>
                    <div className="mt-1 flex space-x-2">
                      <ToolIcon src="/icons/blender.svg" alt="Blender" label="Blender" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div role="tabpanel" className="space-y-8">
              {/* Kristiania Education */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Link
                    href="https://www.kristiania.no/studier/bachelor/informasjonsteknologi-interaksjonsdesign/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded focus:outline-none focus:shadow-[0_0_3px_1px_#ffffff]"
                  >
                    <Image
                      src="/icons/kristiania.jpg"
                      alt="Kristiania Logo"
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Kristiania — Bachelor&apos;s in Interactive Design
                  </h3>
                  <p className="text-gray-400">Sep 2022 - Jul 2025</p>
                  <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                    <li>
                      Covers key areas such as programming, web development, interaction design, user testing, and analytics.
                    </li>
                    <li>
                      Engaged in project-based learning, including a design project and a bachelor project in collaboration with industry partners.
                    </li>
                  </ul>
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Tools:</p>
                    <div className="mt-1 flex space-x-2">
                      <ToolIcon src="/icons/figma.svg" alt="Figma" label="Figma" size={24} />
                      <ToolIcon src="/icons/react.png" alt="React" label="React" size={24} />
                      <ToolIcon src="/icons/typescript.svg" alt="Typescript" label="Typescript" size={24} />
                      <ToolIcon src="/icons/javascript.svg" alt="Javascript" label="Javascript" size={24} />
                      <ToolIcon src="/icons/c-sharp.svg" alt="C#" label="C#" size={24} />
                      <ToolIcon src="/icons/java.svg" alt="Java" label="Java" size={24} />
                      <ToolIcon src="/icons/sql.png" alt="SQL" label="SQL" size={24} />
                      <ToolIcon src="/icons/html5.svg" alt="HTML5" label="HTML5" size={24} />
                      <ToolIcon src="/icons/css.png" alt="CSS" label="CSS" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Noroff: Gamedesign */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Link
                    href="https://www.noroff.no/studier/fagskole/3d-design-spillteknologi-interaktiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded focus:outline-none focus:shadow-[0_0_3px_1px_#ffffff]"
                  >
                    <Image
                      src="/icons/noroff.png"
                      alt="Noroff Logo"
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Noroff — Gamedesign
                  </h3>
                  <p className="text-gray-400">Aug 2019 - Jul 2020</p>
                  <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                    <li>
                      Developed creative and interactive game content and gamification for multiple industries.
                    </li>
                    <li>
                      Acquired skills in concept development, level design, and scripting with Unreal Engine.
                    </li>
                    <li>
                      Combined game concepts with technical skills, architecture, and art.
                    </li>
                  </ul>
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Tools:</p>
                    <div className="mt-1 flex space-x-2">
                      <ToolIcon src="/icons/blender.svg" alt="Blender" label="Blender" size={24} />
                      <ToolIcon src="/icons/unreal-engine.svg" alt="Unreal Engine" label="Unreal Engine" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Noroff: 3D Design and Animation */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Link
                    href="https://www.noroff.no/studier/fagskole/3d-design-spillteknologi-interaktiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded focus:outline-none focus:shadow-[0_0_3px_1px_#ffffff]"
                  >
                    <Image
                      src="/icons/noroff.png"
                      alt="Noroff Logo"
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Noroff — 3D Design & Animation
                  </h3>
                  <p className="text-gray-400">Jan 2018 - Jun 2019</p>
                  <ul className="list-disc list-outside pl-5 mt-2 text-gray-300 space-y-1">
                    <li>
                      Prepared for a career in games, animation, visual effects, advertising, and visualization.
                    </li>
                    <li>
                      Engaged in project-based learning, developing skills in modeling, texturing, lighting, rendering, compositing, sculpting, animation, rigging, and asset creation.
                    </li>
                  </ul>
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Tools:</p>
                    <div className="mt-1 flex space-x-2">
                      <ToolIcon src="/icons/3ds-max.svg" alt="3ds Max" label="3ds Max" size={24} />
                      <ToolIcon src="/icons/nuke.svg" alt="Nuke" label="Nuke" size={24} />
                      <ToolIcon src="/icons/zbrush.svg" alt="Zbrush" label="Zbrush" size={24} />
                      <ToolIcon src="/icons/substance-painter.png" alt="Substance Painter" label="Substance Painter" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// A helper component for displaying a tool icon with a tooltip
type ToolIconProps = {
  src: string;
  alt: string;
  label: string;
  size: number;
};

function ToolIcon({ src, alt, label, size }: ToolIconProps) {
  return (
    <div className="relative group inline-block">
      <Image src={src} alt={alt} width={size} height={size} className="rounded" />
      <span className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded mt-1 pointer-events-none transition">
        {label}
      </span>
    </div>
  );
}
