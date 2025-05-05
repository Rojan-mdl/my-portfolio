"use client"; // Directive for Next.js client components

// Note: Previous motion imports/hooks were removed, assuming animation is handled by the parent AnimatedSection.

// HeroSection component definition
export default function HeroSection() {
  // Note: prefersReducedMotion hook usage was removed.

  return (
    // Section container for the hero area
    <section
      // id="hero" // ID is now managed by the parent AnimatedSection wrapper in page.tsx
      role="banner" // ARIA role indicating this is the primary banner/hero section
      aria-labelledby="hero-heading" // Associates the section with its main heading for accessibility
      // Styling: Relative positioning, flexbox centering, full viewport height, full width, hides overflow, black background fallback
      className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video Element */}
      <video
        autoPlay // Start playing automatically
        loop // Loop the video continuously
        muted // Mute the video (often required for autoplay in browsers)
        playsInline // Allows playback inline on mobile devices (avoids fullscreen takeover)
        poster="/image/BlackHole.png" // Image shown while the video loads or if it fails
        // Styling: Absolute positioning to fill the section, cover the area, maintain aspect ratio
        className="absolute inset-0 h-full w-full object-cover"
        preload="metadata" // Hint to browser to load metadata early
      >
        {/* Video Source */}
        <source src="/video/Black-hole.mp4" type="video/mp4" />
        {/* Fallback: Browsers not supporting <video> will show the poster image specified above. */}
      </video>
      {/* Dark Overlay */}
      {/* Adds a semi-transparent dark layer over the video to improve text readability */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />{" "}
      {/* Opacity set to 50% */}
      {/* Note: Overlay opacity (bg-black/50) can be adjusted here or made configurable via props/CSS variables if needed. */}
      {/* Text Content Container */}
      {/* Styling: Relative positioning to sit above the overlay, z-index, centered text, white text color, horizontal padding */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Main Heading */}
        {/* ID used by aria-labelledby in the parent section */}
        <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold">
          MARIUS ØVREBØ
        </h1>
        {/* Subheading/Tagline */}
        <p className="mt-4 text-xl md:text-2xl">CGI / DESIGN / CODE</p>
        {/* TODO: Manually verify text contrast against video/overlay meets WCAG AA standards. */}
      </div>
    </section>
  );
}
