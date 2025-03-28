"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with Video */}
      <section className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/Black-hole.mp4" type="video/mp4" />
          {/* Provide additional <source> for other formats if needed */}
        </video>

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero text */}
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

      {/* Services Section */}
      <section className="bg-[#0A0A0A] py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#151515] rounded-lg p-6 flex flex-col items-center text-center transition hover:scale-105">
              <Image
                src="/design-icon.png"
                alt="Design Icon"
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold">Design</h3>
              <p className="text-gray-400 mt-2">
                Crafting stunning visuals, user interfaces, and brand identities.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#151515] rounded-lg p-6 flex flex-col items-center text-center transition hover:scale-105">
              <Image
                src="/3d-icon.png"
                alt="3D Icon"
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold">3D & CGI</h3>
              <p className="text-gray-400 mt-2">
                Immersive 3D models, animations, and simulations.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#151515] rounded-lg p-6 flex flex-col items-center text-center transition hover:scale-105">
              <Image
                src="/code-icon.png"
                alt="Code Icon"
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold">Code</h3>
              <p className="text-gray-400 mt-2">
                Full-stack web development bringing ideas to life online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Featured Projects */}
      <section className="bg-[#0A0A0A] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group relative cursor-pointer overflow-hidden rounded-lg">
              <Image
                src="/project1.jpg"
                alt="Project 1"
                width={600}
                height={400}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-semibold">Boundless Art: 3D Discovery</h3>
                <p className="text-sm text-gray-300">
                  Immersive 3D experiences for brand campaigns.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative cursor-pointer overflow-hidden rounded-lg">
              <Image
                src="/project2.jpg"
                alt="Project 2"
                width={600}
                height={400}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-semibold">Art Unbound Odyssey</h3>
                <p className="text-sm text-gray-300">
                  Pushing the limits of digital sculptures.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative cursor-pointer overflow-hidden rounded-lg">
              <Image
                src="/project3.jpg"
                alt="Project 3"
                width={600}
                height={400}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-semibold">TND</h3>
                <p className="text-sm text-gray-300">
                  Next-gen interface design for e-commerce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#151515] py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Organizing a conference?</h2>
          <p className="text-gray-300 mb-8">
            We create stunning visuals, immersive installations, and interactive experiences
            that leave a lasting impact.
          </p>
          <a
            href="/contact"
            className="inline-block bg-pink-500 px-6 py-3 text-white font-semibold rounded hover:bg-pink-600 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <section className="flex justify-center items-center py-16 bg-[#0A0A0A]">
        <Image
          src="/large-s-logo.png"
          alt="S Logo"
          width={120}
          height={120}
          className="opacity-20"
        />
      </section>
    </div>
  );
}
