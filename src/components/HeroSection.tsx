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
      // TODO: Test h-screen vs min-h-screen thoroughly on various mobile devices/browsers to ensure proper height without scroll issues.
      className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video Element */}
      <video
        autoPlay // Start playing automatically
        loop // Loop the video continuously
        muted // Mute the video (often required for autoplay in browsers)
        playsInline // Allows playback inline on mobile devices (avoids fullscreen takeover)
        poster="/image/BlackHole.png" // Image shown while the video loads or if it fails
        // TODO: Optimize the poster image size (/image/BlackHole.png) for faster initial load.
        // Styling: Absolute positioning to fill the section, cover the area, maintain aspect ratio
        className="absolute inset-0 h-full w-full object-cover"
        // TODO: Add preload="metadata" attribute to potentially improve loading performance.
      >
        {/* Video Source */}
        {/* TODO: Provide multiple video formats (e.g., WebM) for broader browser compatibility and potentially smaller file sizes. */}
        <source src="/video/Black-hole.mp4" type="video/mp4" />
        {/* Fallback Text: Displayed if the browser doesn't support the video tag */}
        Your browser does not support the video tag.
        {/* TODO: Consider a more user-friendly fallback, perhaps just showing the poster image prominently. */}
      </video>
      {/* Dark Overlay */}
      {/* Adds a semi-transparent dark layer over the video to improve text readability */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />{" "}
      {/* Opacity set to 50% */}
      {/* TODO: Make overlay opacity configurable or adjust based on design requirements. */}
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
        {/* TODO: Ensure text contrast against the video/overlay meets WCAG accessibility standards. */}
      </div>
    </section>
  );
}
