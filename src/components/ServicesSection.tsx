"use client";

import React, { useState } from "react";

export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const toggleService = (index: number) =>
    setExpandedService(expandedService === index ? null : index);

  return (
    <section id="services" className="py-16 text-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <button
              key={index}
              onClick={() => toggleService(index)}
              aria-expanded={expandedService === index}
              className="bg-[#0A0A0A] rounded-lg p-6 text-left cursor-pointer transition hover:scale-105 focus:outline-none focus:shadow-[0_0_10px_2px_#ffffff]"
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
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
