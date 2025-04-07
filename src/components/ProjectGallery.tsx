// src/components/ProjectGallery.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Zoom } from "yet-another-react-lightbox/plugins";

// Optional plugins can still be imported if needed for the lightbox itself
// 
// 
// 

interface ProjectGalleryProps {
  images: string[]; // Array of image source strings
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0); // Start index at 0 when opening

  // Prepare slides array - ensure filtering invalid sources
  const validImages = images.filter(src => src); // Filter out empty/null/undefined
  const slides = validImages.map(src => ({
      src: src,
      alt: `${projectTitle} - gallery image`
  }));

  // Consistent focus style
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]";

  // Get the first valid image to use as the trigger thumbnail
  const triggerImageSrc = validImages.length > 0 ? validImages[0] : null; // Use first valid image
  const triggerAltText = `${projectTitle} - view gallery (${validImages.length} image${validImages.length !== 1 ? 's' : ''})`;


  return (
    <>
      {/* --- MODIFIED: Render Single Trigger Button/Image --- */}
      {/* Only render if there are valid images to show */}
      {triggerImageSrc ? (
        <button
            onClick={() => {
              setIndex(0); // Always start lightbox at the first image
              setOpen(true);
            }}
            className={`relative block w-full aspect-video overflow-hidden rounded-lg shadow-lg group transition duration-200 ease-in-out hover:scale-[1.02] focus:outline-none ${focusVisibleShadow}`}
            aria-label={triggerAltText}
          >
            {/* Display the first image as the clickable thumbnail */}
            <Image
              src={triggerImageSrc}
              alt={`Thumbnail for ${projectTitle} gallery`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, 50vw" // Adjust if layout changes
              className="transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay Icon to indicate more content / clickability */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white/70 mb-2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                 </svg>
                 <span className="text-sm font-semibold">View Gallery ({slides.length})</span>
            </div>
          </button>
        ) : (
          // Optional: Render something if there are no images at all
           <p className="text-gray-400 italic">No gallery images available.</p>
        )}
      {/* --- END MODIFICATION --- */}


      {/* Lightbox Component (remains the same, but 'index' always starts at 0) */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index} // Will be set to 0 when button is clicked
        slides={slides}
        plugins={[Thumbnails, Zoom]}
      />
    </>
  );
}