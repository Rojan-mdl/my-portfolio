// Server Component receiving data via props

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from '@/types';

// Props interface
interface PortfolioSectionProps {
  projects: Project[];
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {

  if (!projects || projects.length === 0) {
    return (
      <section id="portfolio" className="py-16 text-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
          <p className="text-center">No projects to display.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-16 text-gray-100" aria-labelledby="portfolio-heading">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="portfolio-heading" className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className="group relative block overflow-hidden rounded-lg focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff] transition" // Changed focus: to focus-visible:
              aria-label={`View details for ${project.title}`}
            >
              <div className="aspect-video relative">
                 <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                 />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-gray-200">{project.brief}</p>
                <span className="mt-2 text-xs text-blue-300 group-hover:underline">View Project &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}