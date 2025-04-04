"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      role="banner"
      aria-labelledby="hero-heading"
      // Consider min-h-screen if h-screen causes issues on mobile viewports
      className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline // Important for playback on mobile browsers
        poster="/image/BlackHole.png" // Might still be a little heavy, consider optimizing
        className="absolute inset-0 h-full w-full object-cover"
      >
        {/* Consider multiple sources for better compatibility & potential size savings */}
        <source src="/video/Black-hole.mp4" type="video/mp4" />
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      {/* Animated Text Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* ID for aria-labelledby */}
        <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold">
          MARIUS ØVREBØ
        </h1>
        <p className="mt-4 text-xl md:text-2xl">CGI / DESIGN / CODE</p>
      </motion.div>
    </section>
  );
}