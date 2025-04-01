"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Project 1",
    brief: "Brief description of Project 1.",
    detail:
      "Detailed information about Project 1. This might include challenges, technologies used, and more in-depth descriptions.",
    image: "/image/Project01.png",
  },
  {
    id: 2,
    title: "Project 2",
    brief: "Brief description of Project 2.",
    detail:
      "Detailed information about Project 2. Describe the project's objectives, process, and outcomes here.",
    image: "/project2.jpg",
  },
  {
    id: 3,
    title: "Project 3",
    brief: "Brief description of Project 3.",
    detail:
      "Detailed information about Project 3. Include any case studies, links, or extended information here.",
    image: "/project3.jpg",
  },
];

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const openOverlay = (project: typeof projects[0]) => setSelectedProject(project);
  const closeOverlay = () => setSelectedProject(null);

  return (
    <section id="portfolio" className="py-16 text-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => openOverlay(project)}
              className="group relative overflow-hidden rounded-lg focus:outline-none focus:shadow-[0_0_10px_2px_#ffffff]"
              aria-label={`View details for ${project.title}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-300">{project.brief}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Overlay for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={closeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0A0A0A] p-8 rounded-lg max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="mb-4">{selectedProject.detail}</p>
              <button
                onClick={closeOverlay}
                className="bg-pink-500 px-4 py-2 text-white rounded hover:bg-pink-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#450086]"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
