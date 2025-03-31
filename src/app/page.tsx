"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Example project data; adjust with your actual data
const projects = [
  {
    id: 1,
    title: "Project 1",
    brief: "Brief description of Project 1.",
    detail:
      "Detailed information about Project 1. This might include challenges, technologies used, and more in-depth descriptions.",
    image: "/project1.jpg",
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

export default function HomePage() {
  // About section expanded state
  const [aboutExpanded, setAboutExpanded] = useState(false);
  // Services section state (for expandable service cards)
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const toggleService = (index: number) =>
    setExpandedService(expandedService === index ? null : index);
  // Project overlay state
  const [selectedProject, setSelectedProject] = useState<
    typeof projects[0] | null
  >(null);
  const openOverlay = (project: typeof projects[0]) => setSelectedProject(project);
  const closeOverlay = () => setSelectedProject(null);

  return (
    <div>
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-black"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/Black-hole.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative z-10 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold">MARIUS ØVREBØ</h1>
          <p className="mt-4 text-xl md:text-2xl">CGI / DESIGN / CODE</p>
        </motion.div>
      </section>

      {/* ABOUT SECTION (Expandable) */}
      <section id="about" className="py-16 bg-[#000000] text-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="mb-4">
            I'm Marius Øvrebø, a passionate Junior Fullstack Developer with a background in interactive design and 3D art.
          </p>
          {aboutExpanded && (
            <div className="mt-4">
              <p className="mb-4">
                I blend creative design with technical expertise to build immersive digital experiences. I've worked on projects ranging from dynamic web applications to captivating 3D visualizations. My multidisciplinary skills allow me to approach challenges with a unique perspective, delivering innovative and engaging solutions.
              </p>
              <h3 className="text-2xl font-bold mb-2">Skills & Tools</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Image src="/icons/figma.png" alt="Figma" width={32} height={32} />
                  <span>Figma</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/icons/adobe.png" alt="Photoshop" width={32} height={32} />
                  <span>Photoshop</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/icons/blender.png" alt="Blender" width={32} height={32} />
                  <span>Blender</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/icons/nextjs.png" alt="Next.js" width={32} height={32} />
                  <span>Next.js</span>
                </div>
              </div>
              {/* Smaller, right-aligned Download CV button */}
              <div className="mt-4 flex justify-end">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#450086] px-4 py-2 text-sm text-white font-semibold rounded hover:bg-[#8400ff4f] transition"
                >
                  Download CV
                </a>
              </div>
            </div>
          )}
          <button
            onClick={() => setAboutExpanded(!aboutExpanded)}
            className="mt-4 inline-flex items-center bg-[#450086] px-6 py-3 text-white font-semibold rounded hover:bg-[#8400ff4f] transition"
          >
            {aboutExpanded ? "Show Less" : "Read More"}
            <motion.svg
              className="ml-2 h-4 w-4"
              initial={{ rotate: 0 }}
              animate={{ rotate: aboutExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-16 bg-[#000000] text-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                onClick={() => toggleService(index)}
                className="bg-[#0A0A0A] rounded-lg p-6 cursor-pointer transition hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2">Service {index + 1}</h3>
                <p className="text-gray-400">
                  {expandedService === index
                    ? "This is the extended description for Service " +
                      (index + 1) +
                      ". Here you can explain the details of the service, the process, the technologies used, and the benefits it brings."
                    : "Short description for Service " +
                      (index + 1) +
                      ". Click to read more."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-16 bg-[#000000] text-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openOverlay(project)}
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
              </div>
            ))}
          </div>
        </div>

        {/* Modal Overlay for Project Details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
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
                <h3 className="text-2xl font-bold mb-4">
                  {selectedProject.title}
                </h3>
                <p className="mb-4">{selectedProject.detail}</p>
                <button
                  onClick={closeOverlay}
                  className="bg-pink-500 px-4 py-2 text-white rounded hover:bg-pink-600 transition"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 bg-[#000000] text-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
          <form className="space-y-4" action="/api/contact" method="POST">
            <div>
              <label htmlFor="name" className="block text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full p-2 border rounded bg-gray-800 text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full p-2 border rounded bg-gray-800 text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 block w-full p-2 border rounded bg-gray-800 text-gray-100"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-pink-500 px-6 py-3 text-white font-semibold rounded hover:bg-pink-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
