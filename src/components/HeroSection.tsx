"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      role="banner"
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
        Your browser does not support the video tag.
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
  );
}
