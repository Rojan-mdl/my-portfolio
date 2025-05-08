"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";


interface PortfolioSectionProps {
  projects: Project[]; // An array of Project objects, defined in '@/types'
}

// PortfolioSection component definition
// Takes an array of 'projects' as a prop
export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Loading/Empty State: Handle the case where projects haven't loaded or are empty
  // Note: Loading state (showing "Loading projects...") is handled in the parent (HomePage).
  // This section handles the state where projects array is empty or null after fetching.
  if (!projects || projects.length === 0) {
    return (
      // Section container
      <section
        className="py-16 text-gray-100"
        aria-labelledby="portfolio-heading-fallback"
      >
        {/* Responsive container */}
        <div className="max-w-6xl mx-auto px-4">
          {/* Section heading */}
          <h2
            id="portfolio-heading-fallback"
            className="text-3xl font-bold mb-8 text-center"
          >
            Portfolio
          </h2>
          {/* Message indicating no projects */}
          <p className="text-center">No projects to display at this time.</p>
        </div>
      </section>
    );
  }

  // Main Render: Display the portfolio grid if projects exist
  return (
    // Section container
    <section
      className="py-16 my-26 text-gray-100"
      aria-labelledby="portfolio-heading"
    >
      {/* Responsive container */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2
          id="portfolio-heading"
          className="text-3xl font-bold mb-8 text-center"
        >
          Portfolio
        </h2>
        {/* Grid layout for project cards: 1 column on small screens, 3 columns on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map through the projects array to render a card for each project */}
          {projects.map((project) => (
            // Link wrapping the entire card, navigating to the specific project page
            <Link
              key={project.id} // Unique key for React list rendering
              href={`/portfolio/${project.id}`} // Dynamic route based on project ID
              className="group relative block overflow-hidden rounded-lg focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff] transition"
              aria-label={`View details for ${project.title}`} // Accessibility label for the link
            >
              {/* Image container */}
              <div className="aspect-video relative">
                <Image
                  src={project.image}
                  alt={`Preview image for ${project.title}`} // Alt text for accessibility
                  fill 
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw" // Responsive image sizes hint for browser optimization
                  // Hover effect
                  className={`group-hover:scale-110 ${prefersReducedMotion ? "" : "transition-transform duration-300"}`}
                  loading="lazy" // Lazy load images below the fold
                />
              </div>

              {/* Text Overlay */}
              {/* Hover effect (md screens+): Fades in on hover */}
              {/* Default (mobile): Always visible */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 ${prefersReducedMotion ? "" : "transition-opacity duration-300"}`}
              >
                {/* Project Title */}
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                {/* Brief Project Description */}
                <p className="text-sm text-gray-200 line-clamp-2">
                  {project.brief}
                </p>
                {/* "View Project" Call to Action */}
                <span className="mt-2 text-xs font-medium text-blue-300 group-hover:text-blue-200">
                  View Project &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>{" "}
    </section>
  );
}
