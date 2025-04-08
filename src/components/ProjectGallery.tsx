"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic'; // Import dynamic
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"; // Keep static
import Zoom from "yet-another-react-lightbox/plugins/zoom"; // Keep static
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Dynamically import Lightbox
const Lightbox = dynamic(() => import('yet-another-react-lightbox'));



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
      {/* Render Single Trigger Button/Image */}
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
                 <span className="text-sm font-semibold">View gallery ({slides.length})</span>
            </div>
          </button>
        ) : (
          // Render something if there are no images at all
           <p className="text-gray-400 italic">No gallery images available.</p>
        )}

      {/* Conditionally render Lightbox only when open is true */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index} // Will be set to 0 when button is clicked
          slides={slides}
          plugins={[Thumbnails, Zoom]}
        />
      )}
    </>
  );
}
