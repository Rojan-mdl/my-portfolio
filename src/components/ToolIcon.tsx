"use client";

import React from "react";
import { IconType } from "react-icons";
import {
  SiFigma,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiJira,
  SiBlender,
  SiAdobeaftereffects,
  SiDavinciresolve,
  SiHtml5,
  SiCss3,
  SiUnrealengine,
  SiReact,
  SiAutodeskmaya,
  SiNuke,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
  SiPython,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";
import Image from "next/image"; // Image for fallbacks
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useId } from "react";

// Icon mapping
const iconMap: { [key: string]: IconType | string } = {
  // Allow string type for image paths
  Figma: SiFigma,
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "C#": TbBrandCSharp,
  Jira: SiJira,
  Azure: VscAzure,
  SQL: FaDatabase,
  Blender: SiBlender,
  "Adobe After Effects": SiAdobeaftereffects,
  "DaVinci Resolve": SiDavinciresolve,
  Python: SiPython,
  HTML5: SiHtml5,
  CSS: SiCss3,
  "Unreal Engine": SiUnrealengine,
  Maya: SiAutodeskmaya,
  Nuke: SiNuke,
  "Tailwind CSS": SiTailwindcss,
  "Three.js / R3F": SiThreedotjs,
  Vercel: SiVercel,
  // Icons without direct react-icons mapping - use src path as value
  Zbrush: "/icons/zbrush.svg",
  "Substance Painter": "/icons/substance-painter.png",
  Motion: "/icons/motion.png",
};

// Define the expected props for the ToolIcon component
export type ToolIconProps = {
  iconName: string; // The name/label of the icon to render (used as key in iconMap)
  alt: string;
  label: string;
  size: number;
};

// ToolIcon component definition
// Displays an icon and reveals a text label (tooltip) on hover/focus.
export default function ToolIcon({
  iconName,
  alt,
  label,
  size,
}: ToolIconProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const tooltipId = useId(); // Generate a unique ID for the tooltip

  // Look up the icon component or image source from the map
  const IconComponentOrSrc = iconMap[iconName];

  return (
    // Container div for the icon and its tooltip
    // Uses 'group' class to enable group-hover/group-focus-within states for the tooltip
    <div className="relative group inline-block" aria-describedby={tooltipId}>
      {/* Render Icon component or Image based on map lookup result */}
      {typeof IconComponentOrSrc === "function" ? (
        // Render react-icon component
        <IconComponentOrSrc size={size} aria-label={alt} className="rounded" />
      ) : typeof IconComponentOrSrc === "string" ? (
        // Render Image component using the src string
        <Image
          src={IconComponentOrSrc}
          alt={alt}
          width={size}
          height={size}
          className="rounded"
          loading="lazy"
        />
      ) : (
        // Fallback/Error case: Render nothing or a placeholder if iconName not found
        <span title={`Icon not found: ${iconName}`}>❓</span>
      )}
      {/* Tooltip Label */}
      {/* Visibility: Becomes visible (opacity-100) on hover or focus within the parent 'group' */}
      {/* Note: Using aria-describedby for explicit accessibility linking */}
      <span
        id={tooltipId} // Added unique ID to the tooltip span
        className={`absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 bg-black text-white text-xs px-2 py-1 rounded mt-1 whitespace-nowrap z-10 ${prefersReducedMotion ? "" : "transition"}`}
      >
        {label} {/* Tooltip text content */}
      </span>
    </div>
  );
}
