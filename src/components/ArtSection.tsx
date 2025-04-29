"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
// Removed motion import
import type { Slide } from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Dynamically import only the main Lightbox component
const Lightbox = dynamic(() => import('yet-another-react-lightbox'));


// Define structure for pieces data
type ArtPiece = {
  type: "image" | "video";
  src?: string; // Optional for video type
  alt: string;
  sources?: { src: string; type: string }[];
  poster?: string;
  width?: number;
  height?: number;
};

// Hook to check for reduced motion preference (copied from previous components)
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    // Check if window is defined (for server-side rendering safety)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  return prefersReducedMotion;
};


export default function ArtSection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const prefersReducedMotion = usePrefersReducedMotion(); // Use the hook

  // Art pieces
  const artPieces: ArtPiece[] = [
    { type: "image", src: "/art/green-eye.png", alt: "Floating eye with grass around it and a tree growing from the top." },
    { type: "image", src: "/art/cellular-wave.png", alt: "Interconnected molecules close-up." },
    {
       type: "video",
       sources: [ { src: "/video/Black-hole.mp4", type: "video/mp4" } ],
       poster: "/art/black-hole.png",
       alt: "Black hole in the palm of a hand.", // Updated video poster alt text
       width: 1920, height: 1080
     },
    { type: "image", src: "/art/distance.png", alt: "A vast futuristic horizon with squares, circles, triangles and x's floating in the distance." },
    { type: "image", src: "/art/frozen-orb.png", alt: "A hexagon with a glowing centre shining through frozen glass patches, sitting on a wet surface." },
    { type: "image", src: "/art/hand-sphere.png", alt: "A shattered black and golden hand, where the palm is replaced by a red-rimmed glowing sphere." },
    { type: "image", src: "/art/hex-orb.png", alt: "A golden plated sphere mostly encompassing a red-rimmed orb inside it, resting on a display plate." },
    { type: "image", src: "/art/playing-board.png", alt: "A hexagonal board-playing world with water, forest, rocks, houses and boats." },
  ];

  // Prepare slides array for the lightbox with explicit types
  const slides = artPieces
    // Filter out pieces that don't have a valid src (for images) or sources (for videos)
    // This prevents errors if data is incomplete
    .filter(piece => (piece.type === 'image' && piece.src) || (piece.type === 'video' && piece.sources && piece.sources.length > 0))
    .map((piece): Slide => {
       if (piece.type === "video") {
          return {
             type: "video", // Explicit type for video slide
             sources: piece.sources || [],
             poster: piece.poster,
             width: piece.width,
             height: piece.height,
             // Pass alt as title or description if needed by plugins
             // title: piece.alt,
          };
       } else { // Image type
          return {
             type: "image", // Explicit type for image slide
             src: piece.src!, // Non-null assertion OR ensure filter logic guarantees src exists
             alt: piece.alt,
             // Add srcSet here if I have multiple resolutions for images
          };
       }
  });

  // Consistent focus style
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]";

  return (
    <>
      {/* Removed id="art" as it's handled by the wrapper in page.tsx */}
      <section className="py-16 text-gray-100" aria-labelledby="art-heading">
        {/* Removed Animation Wrapper */}
        <div className="max-w-6xl mx-auto px-4">
          <h2 id="art-heading" className="text-3xl font-bold mb-8 text-center">
            Art
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artPieces.map((piece, idx) => {
               // Determine the source for the thumbnail image
               const thumbnailSrc = piece.type === 'video' ? piece.poster : piece.src;

               // Only render the button if we have a valid thumbnail source
               return thumbnailSrc ? (
                 <button
                   key={idx}
                   onClick={() => {
                     // Find the correct index in the potentially filtered 'slides' array
                     const slideIndex = slides.findIndex(slide =>
                       (slide.type === 'image' && slide.src === piece.src) ||
                       (slide.type === 'video' && slide.poster === piece.poster) // Adjust matching logic if needed
                     );
                     if (slideIndex !== -1) {
                       setIndex(slideIndex);
                      setOpen(true);
                    }
                  }}
                  // Conditionally apply hover scale transition
                  className={`relative aspect-square overflow-hidden rounded-lg shadow-lg group focus:outline-none ${focusVisibleShadow} ${prefersReducedMotion ? '' : 'transition duration-200 ease-in-out hover:scale-[1.03]'}`}
                  aria-label={`View larger for ${piece.alt}`}
                >
                  <Image
                      src={thumbnailSrc} // Use the determined thumbnail source
                      alt={piece.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      // Conditionally apply group-hover scale transition
                      className={`${prefersReducedMotion ? '' : 'transition duration-300 group-hover:scale-105'}`}
                      loading="lazy"
                   />
                 </button>
              ) : null;
             })}
          </div>
        </div> {/* End max-w-6xl container */}
      </section>

      {/* Conditionally render Lightbox only when open is true */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Video, Thumbnails, Zoom]}
        />
      )}
    </>
  );
}
