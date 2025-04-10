"use client"; // Added directive

import React, { useState, useEffect } from "react"; // Added hooks
import Image from "next/image";


// Hook to check for reduced motion preference (copied from previous components)
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    // Check if window is defined (for server-side rendering safety)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  return prefersReducedMotion;
};


export type ToolIconProps = {
  src: string;
  alt: string;
  label: string;
  size: number;
};


export default function ToolIcon({ src, alt, label, size }: ToolIconProps) {
  const prefersReducedMotion = usePrefersReducedMotion(); // Use the hook

  return (
    // Removed title={label}
    <div className="relative group inline-block">
      <Image src={src} alt={alt} width={size} height={size} className="rounded" loading="lazy"/>
      {/* Removed pointer-events-none, conditionally apply transition */}
      <span className={`absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 bg-black text-white text-xs px-2 py-1 rounded mt-1 whitespace-nowrap z-10 ${prefersReducedMotion ? '' : 'transition'}`}>
        {label}
      </span>
    </div>
  );
}
