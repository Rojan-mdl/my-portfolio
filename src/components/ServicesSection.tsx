"use client";

import React, { useState } from "react";
// If you want animations for the text expansion later:
// import { motion, AnimatePresence } from "framer-motion";

export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleService = (index: number) =>
    setExpandedService(expandedService === index ? null : index);

  // Placeholder data
  const services = [
    { title: "Web Development", shortDesc: "Building responsive and fast websites.", longDesc: "Full-stack web development using modern technologies like Next.js, React, and TypeScript to create performant and user-friendly applications." },
    { title: "3D Visualization", shortDesc: "Bringing concepts to life in 3D.", longDesc: "Creating compelling 3D models, animations, and visualizations for products, architecture, or interactive experiences using tools like Blender." },
    { title: "Interactive Design", shortDesc: "Designing engaging user experiences.", longDesc: "Focusing on user interaction and experience design, prototyping with Figma, and implementing interactive elements that delight users." },
  ];

  return (
    <section id="services" className="py-16 text-gray-100" aria-labelledby="services-heading">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="services-heading" className="text-3xl font-bold mb-8 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map over actual service data */}
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => toggleService(index)}
              aria-expanded={expandedService === index}
              // Consider adding aria-controls if the description was in a separate element
              className="bg-[#0A0A0A] rounded-lg p-6 text-left cursor-pointer transition duration-200 ease-in-out hover:scale-[1.03] focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff]"
            >
              {/* Service Title */}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              {/* Service Description - Toggles between short and long */}
              {/* min-h-[6em] to reduce layout shift when text changes */}
              <p className="text-gray-400 transition-opacity duration-300 min-h-[6em]">
                 {/* Could wrap this text change in AnimatePresence/motion.div for fade effect */}
                 {expandedService === index
                   ? service.longDesc
                   : service.shortDesc + " Click to read more."
                 }
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}