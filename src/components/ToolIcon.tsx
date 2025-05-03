"use client"; // Directive for Next.js client components (needed for hooks)

import React, { useState, useEffect } from "react"; // Import React and hooks
import { IconType } from 'react-icons'; // Import IconType
// Import all potentially used icons directly within the client component
import {
  SiFigma, SiNextdotjs, SiTypescript, SiJavascript, SiJira,
  SiBlender, SiAdobeaftereffects, SiDavinciresolve,
  SiHtml5, SiCss3, SiUnrealengine, SiReact, SiAutodeskmaya, SiNuke,
  SiTailwindcss, SiThreedotjs, SiVercel // Added missing ones from ProjectPage
} from 'react-icons/si';
import { FaDatabase, FaJava } from 'react-icons/fa';
import { VscAzure } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";
import Image from "next/image"; // Keep Image for fallbacks

// Icon mapping moved inside the client component
const iconMap: { [key: string]: IconType | string } = { // Allow string type for image paths
  "Figma": SiFigma,
  "Next.js": SiNextdotjs,
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Typescript": SiTypescript, // Alias
  "JavaScript": SiJavascript,
  "Javascript": SiJavascript, // Alias
  "C#": TbBrandCSharp,
  "Jira": SiJira,
  "Azure": VscAzure,
  "SQL": FaDatabase,
  "Blender": SiBlender,
  "Adobe After Effects": SiAdobeaftereffects,
  "After Effects": SiAdobeaftereffects, // Alias
  "DaVinci Resolve": SiDavinciresolve,
  "Java": FaJava,
  "HTML5": SiHtml5,
  "CSS": SiCss3, // Note: Original was CSS.png, using SiCss3
  "Unreal Engine": SiUnrealengine,
  "Maya": SiAutodeskmaya, // Original was 3ds-max.svg, using Maya
  "3ds Max": SiAutodeskmaya, // Alias for Maya
  "Nuke": SiNuke,
  "Tailwind CSS": SiTailwindcss,
  "Three.js / R3F": SiThreedotjs,
  "Vercel": SiVercel,
  // Icons without direct react-icons mapping - use src path as value
  "Zbrush": "/icons/zbrush.svg",
  "Substance Painter": "/icons/substance-painter.png",
  "Motion": "/icons/motion.png" // From ProjectPage fallback
};


// TODO: Extract this hook into a shared utility file (e.g., src/hooks/usePrefersReducedMotion.ts)
// to avoid duplication across components.
// Custom hook to detect user's preference for reduced motion
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    // Safety check for server-side rendering
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  return prefersReducedMotion;
};

// Define the expected props for the ToolIcon component
export type ToolIconProps = {
  iconName: string; // The name/label of the icon to render (used as key in iconMap)
  alt: string; // Alt text (important for accessibility)
  label: string; // Text content for the tooltip label
  size: number; // Size for the icon/image
};

// ToolIcon component definition
// Displays an icon and reveals a text label (tooltip) on hover/focus.
export default function ToolIcon({ iconName, alt, label, size }: ToolIconProps) {
  // Check for user's reduced motion preference to conditionally disable transitions
  const prefersReducedMotion = usePrefersReducedMotion();

  // Look up the icon component or image source from the map
  const IconComponentOrSrc = iconMap[iconName];

  return (
    // Container div for the icon and its tooltip
    // Uses 'group' class to enable group-hover/group-focus-within states for the tooltip
    <div className="relative group inline-block">
      {/* Render Icon component or Image based on map lookup result */}
      {typeof IconComponentOrSrc === 'function' ? (
        // Render react-icon component
        <IconComponentOrSrc size={size} aria-label={alt} className="rounded" />
      ) : typeof IconComponentOrSrc === 'string' ? (
        // Render Image component using the src string
        <Image src={IconComponentOrSrc} alt={alt} width={size} height={size} className="rounded" loading="lazy" />
      ) : (
        // Fallback/Error case: Render nothing or a placeholder if iconName not found
        <span title={`Icon not found: ${iconName}`}>❓</span> // Simple placeholder
      )}
      {/* Tooltip Label */}
      {/* Styling: Absolute positioning, centered below the icon, initially hidden (opacity-0) */}
      {/* Visibility: Becomes visible (opacity-100) on hover or focus within the parent 'group' */}
      {/* Appearance: Dark background, white text, small font size, padding, rounded corners, margin top, prevents text wrapping, high z-index */}
      {/* Transition: Applies opacity transition unless reduced motion is preferred */}
      {/* TODO: Ensure tooltip contrast and positioning work well across different screen sizes and contexts. */}
      {/* TODO: Consider adding ARIA attributes (e.g., aria-describedby) to explicitly link the icon to its tooltip for better accessibility, although group-focus might suffice. */}
      <span className={`absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 bg-black text-white text-xs px-2 py-1 rounded mt-1 whitespace-nowrap z-10 ${prefersReducedMotion ? '' : 'transition'}`}>
        {label} {/* Tooltip text content */}
      </span>
    </div>
  );
}
