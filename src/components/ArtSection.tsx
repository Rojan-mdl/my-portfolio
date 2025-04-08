"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic'; // Import dynamic
import type { Slide } from "yet-another-react-lightbox";
// Import plugins statically
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// Import CSS statically as before
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

export default function ArtSection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);

  // Art pieces
  const artPieces: ArtPiece[] = [
    { type: "image", src: "/art/green-eye.png", alt: "Description of 3D art piece 1" },
    { type: "image", src: "/art/cellular-wave.png", alt: "Description of 3D art piece 2" },
    {
       type: "video",
       sources: [ { src: "/video/Black-hole.mp4", type: "video/mp4" } ],
       poster: "/art/black-hole.png",
       alt: "Black hole simulation video",
       width: 1920, height: 1080
     },
    { type: "image", src: "/art/distance.png", alt: "Description of 3D art piece 3" },
    { type: "image", src: "/art/frozen-orb.png", alt: "Description of 3D art piece 4" },
    { type: "image", src: "/art/hand-sphere.png", alt: "Description of 3D art piece 5" },
    { type: "image", src: "/art/hex-orb.png", alt: "Description of 3D art piece 6" },
    { type: "image", src: "/art/playing-board.png", alt: "Description of 3D art piece 7" },
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
      <section id="art" className="py-16 text-gray-100" aria-labelledby="art-heading">
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
                   className={`relative aspect-square overflow-hidden rounded-lg shadow-lg group transition duration-200 ease-in-out hover:scale-[1.03] focus:outline-none ${focusVisibleShadow}`}
                   aria-label={`View larger for ${piece.alt}`}
                 >
                   <Image
                      src={thumbnailSrc} // Use the determined thumbnail source
                      alt={piece.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="transition duration-300 group-hover:scale-105"
                      loading="lazy"
                   />
                 </button>
               ) : null;
             })}
          </div>
        </div>
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
