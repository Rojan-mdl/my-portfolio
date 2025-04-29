"use client"; // Needs to be a client component to use hooks

import React, { useState, useEffect } from "react"; // Import hooks
import Image from "next/image";
import Link from "next/link";
// Removed motion import
import type { Project } from '@/types';

// Props interface defining the expected props for this component
interface PortfolioSectionProps {
  projects: Project[]; // Expects an array of Project objects
}

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


export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion(); // Use the hook

  // Handle case where no projects are passed or the array is empty
  if (!projects || projects.length === 0) {
    return (
      <section id="portfolio" className="py-16 text-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
          <p className="text-center">No projects to display at this time.</p>
        </div>
      </section>
    );
  }

  // Render the portfolio section if projects exist
  return (
    // Removed id="portfolio" as it's handled by the wrapper in page.tsx
    <section className="py-16 text-gray-100" aria-labelledby="portfolio-heading">
      {/* Removed Animation Wrapper */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="portfolio-heading" className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
        {/* Grid layout for project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map through each project to create a card */}
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`} // Link to the dynamic project page
              className="group relative block overflow-hidden rounded-lg focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff] transition"
              aria-label={`View details for ${project.title}`}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="aspect-video relative">
                 <Image
                    src={project.image}
                    alt={`Preview image for ${project.title}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw" // Responsive image sizes
                    // Zoom effect on hover (applies on desktop) - Disable transition if reduced motion
                    className={`group-hover:scale-110 ${prefersReducedMotion ? '' : 'transition-transform duration-300'}`}
                    loading="lazy"
                 />
              </div>

              {/* Overlay with project info */}
              {/* Default: Visible (opacity-100) */}
              {/* Medium screens and up (md:): Hidden by default (opacity-0), visible on group-hover - Disable transition if reduced motion */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 ${prefersReducedMotion ? '' : 'transition-opacity duration-300'}`}>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                {/* Limit brief description to 2 lines, truncate with ellipsis */}
                <p className="text-sm text-gray-200 line-clamp-2">{project.brief}</p>
                {/* "View Project" cue */}
                <span className="mt-2 text-xs text-blue-300">View Project &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div> {/* End max-w-6xl container */}
    </section>
  );
}
