"use client"; // Directive for Next.js client components

import React, { useState, useEffect } from "react"; // Import React and hooks
import Image from "next/image"; // Import Next.js Image component
import dynamic from 'next/dynamic'; // Import dynamic for code splitting
import type { Slide } from "yet-another-react-lightbox"; // Import Slide type for lightbox
// Import lightbox plugins
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// Import lightbox styles
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Dynamically import the Lightbox component to reduce initial bundle size.
// It will only be loaded when the user clicks to open the lightbox.
const Lightbox = dynamic(() => import('yet-another-react-lightbox'));

// Define the structure for individual art pieces in the gallery
type ArtPiece = {
  type: "image" | "video"; // Specifies if the piece is an image or video
  src?: string; // Source URL (required for images, optional for videos if using 'sources')
  alt: string; // Alt text for accessibility
  sources?: { src: string; type: string }[]; // Array of sources for video (e.g., different formats)
  poster?: string; // Poster image URL for videos
  width?: number; // Intrinsic width for lightbox sizing (especially for videos)
  height?: number; // Intrinsic height for lightbox sizing (especially for videos)
};

// TODO: Extract this hook into a shared utility file (e.g., src/hooks/usePrefersReducedMotion.ts)
// to avoid duplication across components.
// Custom hook to detect user's preference for reduced motion
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    // Safety check for server-side rendering
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  return prefersReducedMotion;
};

// ArtSection component definition
export default function ArtSection() {
  // State to control the lightbox visibility (open/closed)
  const [open, setOpen] = useState(false);
  // State to track the index of the currently selected slide in the lightbox
  const [index, setIndex] = useState(-1);
  // Check for user's reduced motion preference
  const prefersReducedMotion = usePrefersReducedMotion();

  // Array containing the data for each art piece in the gallery
  // TODO: Consider fetching this data from a CMS or API instead of hardcoding.
  const artPieces: ArtPiece[] = [
    { type: "image", src: "/art/green-eye.png", alt: "Floating eye with grass around it and a tree growing from the top." },
    { type: "image", src: "/art/cellular-wave.png", alt: "Interconnected molecules close-up." },
    {
       type: "video",
       sources: [ { src: "/video/Black-hole.mp4", type: "video/mp4" } ], // Video source(s)
       poster: "/art/black-hole.png", // Poster image for the video
       alt: "Black hole in the palm of a hand.", // Alt text describes the poster/concept
       width: 1920, height: 1080 // Dimensions for lightbox video player
     },
    { type: "image", src: "/art/distance.png", alt: "A vast futuristic horizon with squares, circles, triangles and x's floating in the distance." },
    { type: "image", src: "/art/frozen-orb.png", alt: "A hexagon with a glowing centre shining through frozen glass patches, sitting on a wet surface." },
    { type: "image", src: "/art/hand-sphere.png", alt: "A shattered black and golden hand, where the palm is replaced by a red-rimmed glowing sphere." },
    { type: "image", src: "/art/hex-orb.png", alt: "A golden plated sphere mostly encompassing a red-rimmed orb inside it, resting on a display plate." },
    { type: "image", src: "/art/playing-board.png", alt: "A hexagonal board-playing world with water, forest, rocks, houses and boats." },
    // TODO: Add more art pieces as needed.
  ];

  // Prepare the 'slides' array required by the Lightbox component
  // This maps the artPieces data into the format expected by yet-another-react-lightbox
  const slides = artPieces
    // Filter out any pieces that might lack necessary source data to prevent errors
    .filter(piece => (piece.type === 'image' && piece.src) || (piece.type === 'video' && piece.sources && piece.sources.length > 0))
    // Map the filtered pieces to the Slide type structure
    .map((piece): Slide => {
       if (piece.type === "video") {
          // Structure for video slides
          return {
             type: "video",
             sources: piece.sources || [], // Ensure sources is an array
             poster: piece.poster,
             width: piece.width,
             height: piece.height,
             // Alt text could potentially be used for titles/descriptions in lightbox plugins if needed
             // title: piece.alt,
          };
       } else {
          // Structure for image slides
          return {
             type: "image",
             src: piece.src!, // Use non-null assertion as filter should guarantee src exists for images
             alt: piece.alt,
             // TODO: Add srcSet property here if providing multiple image resolutions for optimization.
          };
       }
  });

  // Consistent focus style for gallery items
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]";

  return (
    <>
      {/* Art Section Container */}
      {/* id="art" is handled by the parent AnimatedSection wrapper in page.tsx */}
      <section className="py-16 text-gray-100" aria-labelledby="art-heading">
        {/* Responsive container */}
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Heading */}
          <h2 id="art-heading" className="text-3xl font-bold mb-8 text-center">
            Art
          </h2>
          {/* Grid layout for art thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map through the original artPieces to create clickable thumbnails */}
            {artPieces.map((piece, idx) => {
               // Determine the source for the thumbnail (poster for video, src for image)
               const thumbnailSrc = piece.type === 'video' ? piece.poster : piece.src;

               // Render the button only if a valid thumbnail source exists
               return thumbnailSrc ? (
                 <button
                   key={idx} // Unique key for React list rendering
                   onClick={() => {
                     // Find the corresponding index in the potentially filtered 'slides' array
                     // This ensures the correct slide opens even if some artPieces were filtered out
                     const slideIndex = slides.findIndex(slide =>
                       (slide.type === 'image' && slide.src === piece.src) ||
                       (slide.type === 'video' && slide.poster === piece.poster) // Match based on poster for videos
                       // TODO: Refine matching logic if posters/srcs aren't unique identifiers.
                     );
                     // If a matching slide is found, set the index and open the lightbox
                     if (slideIndex !== -1) {
                       setIndex(slideIndex);
                       setOpen(true);
                     }
                   }}
                   // Styling: Relative positioning, square aspect ratio, overflow hidden, rounded corners, shadow, group for hover effects, focus style
                   // Hover effect: Slight scale increase (disabled if reduced motion preferred)
                   className={`relative aspect-square overflow-hidden rounded-lg shadow-lg group focus:outline-none ${focusVisibleShadow} ${prefersReducedMotion ? '' : 'transition duration-200 ease-in-out hover:scale-[1.03]'}`}
                   aria-label={`View larger for ${piece.alt}`} // Accessibility label for the button
                 >
                   {/* Thumbnail Image */}
                   <Image
                      src={thumbnailSrc} // Use the determined thumbnail source
                      alt={piece.alt} // Alt text
                      fill // Fill the container
                      style={{ objectFit: 'cover' }} // Cover the container
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Responsive sizes hint
                      // Hover effect: Slight inner image scale (disabled if reduced motion preferred)
                      className={`${prefersReducedMotion ? '' : 'transition duration-300 group-hover:scale-105'}`}
                      loading="lazy" // Lazy load thumbnails
                      // TODO: Consider adding placeholder blur effect.
                   />
                 </button>
              ) : null; // Render nothing if thumbnailSrc is missing
             })}
          </div>
        </div> {/* End max-w-6xl container */}
      </section>

      {/* Lightbox Component */}
      {/* Conditionally render the Lightbox only when 'open' state is true to leverage dynamic import */}
      {open && (
        <Lightbox
          open={open} // Controls visibility
          close={() => setOpen(false)} // Function to close the lightbox
          index={index} // Index of the slide to open initially
          slides={slides} // Array of slides (images/videos) to display
          // Enable plugins for video playback, thumbnails, and zoom functionality
          plugins={[Video, Thumbnails, Zoom]}
          // TODO: Explore further customization options for the lightbox (animations, styles, etc.).
        />
      )}
    </>
  );
}
