"use client";

// HeroSection component definition
export default function HeroSection() {

  return (
    // Section container for the hero area
    <section
      role="banner" // ARIA role indicating this is the primary banner
      aria-labelledby="hero-heading" // Associates the section with its main heading for accessibility
      className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video Element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/image/BlackHole.png" // Fallback image
        className="absolute inset-0 h-full w-full object-cover"
        preload="metadata"
      >
        {/* Video Source */}
        <source src="/video/Black-hole.mp4" type="video/mp4" />
      </video>
      {/* Dark Overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />{" "}
      {/* Text Content Container */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Main Heading */}
        {/* ID used by aria-labelledby in the parent section */}
        <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold">
          MARIUS ØVREBØ
        </h1>
        {/* Subheading */}
        <p className="mt-4 text-xl md:text-2xl">CGI / DESIGN / CODE</p>
      </div>
    </section>
  );
}
