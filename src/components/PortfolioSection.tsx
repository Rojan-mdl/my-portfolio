"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: string;
  title: string;
  brief: string;
  detail: string;
  image: string;
  extendedImages?: string[];
  extendedVideos?: string[];
  toolIcons?: { src: string; label: string }[];
};

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        // Adjust if your API wraps the data (e.g., in data.items)
        setProjects(data.items || data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Disable scrolling on the main page when the overlay is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup in case the component unmounts while modal is open
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const openOverlay = (project: Project) => setSelectedProject(project);
  const closeOverlay = () => setSelectedProject(null);

  if (loading) {
    return (
      <section id="portfolio" className="py-16 text-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
          <p className="text-center">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-16 text-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => openOverlay(project)}
              className="group relative overflow-hidden rounded-lg focus:outline-none focus:shadow-[0_0_10px_2px_#ffffff] transition"
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

      {/* Extended Project Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-auto"
            onClick={closeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0A0A0A] p-8 rounded-lg max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="mb-4">{selectedProject.detail}</p>
              
              {selectedProject.extendedImages && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {selectedProject.extendedImages.map((imgUrl, index) => (
                    <Image
                      key={index}
                      src={imgUrl}
                      alt={`Extended image ${index + 1}`}
                      width={500}
                      height={300}
                      className="rounded"
                    />
                  ))}
                </div>
              )}

              {selectedProject.extendedVideos && selectedProject.extendedVideos.length > 0 && (
                <div className="grid grid-cols-1 gap-4 mb-4">
                  {selectedProject.extendedVideos.map((videoUrl, index) => (
                    <video key={index} controls className="w-full rounded">
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              )}

              {selectedProject.toolIcons && (
                <div className="mt-4">
                  <p className="text-sm font-semibold">Tools Used:</p>
                  <div className="mt-1 flex space-x-2">
                    {selectedProject.toolIcons.map((tool, index) => (
                      <div key={index} className="relative group inline-block">
                        <Image
                          src={tool.src}
                          alt={tool.label}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                        <span className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded mt-1 pointer-events-none transition">
                          {tool.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeOverlay}
                  className="bg-pink-500 px-4 py-2 text-white rounded hover:bg-pink-600 transition focus:outline-none focus:shadow-[0_0_10px_2px_#ffffff]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
