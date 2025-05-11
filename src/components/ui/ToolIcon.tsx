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
  labelVisibility?: "tooltip" | "inline"; // New prop for label display mode
  className?: string; // Added to allow passing Tailwind classes for the main div
};

// ToolIcon component definition
// Displays an icon and reveals a text label (tooltip) on hover/focus.
export default function ToolIcon({
  iconName,
  alt,
  label,
  size,
  labelVisibility = "tooltip", // Default to tooltip behavior
  className = "", // Default to empty string
}: ToolIconProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const tooltipId = useId(); // Generate a unique ID for the tooltip

  // Look up the icon component or image source from the map
  const IconComponentOrSrc = iconMap[iconName];

  // Base classes for the icon itself (React Icon or Image)
  const iconBaseClasses = "rounded"; // Add any common styling for the icon img/svg here

  // Inline label specific styling
  const inlineLabelClasses = "ml-2 text-sm sm:text-base"; // Adjust as needed

  // The main container div styling will depend on the labelVisibility
  // For inline, it needs to be `flex items-center`
  // For tooltip, it remains `relative group inline-block`
  const containerClasses = `
    ${labelVisibility === "inline" ? "flex items-center" : "relative group inline-block"}
    ${className} // Allow external classes to be appended
  `;

  const iconElement = IconComponentOrSrc ? (
    typeof IconComponentOrSrc === "function" ? (
      <IconComponentOrSrc size={size} aria-label={alt} className={iconBaseClasses} />
    ) : (
      <Image
        src={IconComponentOrSrc}
        alt={alt}
        width={size}
        height={size}
        className={iconBaseClasses}
        loading="lazy"
      />
    )
  ) : (
    <span title={`Icon not found: ${iconName}`} aria-label={`Icon not found: ${iconName}`}>❓</span>
  );

  return (
    <div 
      className={containerClasses.trim()} 
      aria-describedby={labelVisibility === "tooltip" ? tooltipId : undefined}
    >
      {iconElement}
      {labelVisibility === "inline" && (
        <span className={inlineLabelClasses}>{label}</span>
      )}
      {labelVisibility === "tooltip" && (
        <span
          id={tooltipId}
          role="tooltip" // Added role for accessibility
          className={`absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] text-xs px-2 py-1 rounded mt-1 whitespace-nowrap z-10 ${prefersReducedMotion ? "" : "transition"}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
