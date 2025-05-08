"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lightbox plugins
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// Lightbox styles
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { BsArrowsFullscreen } from "react-icons/bs";

// Dynamically import the main Lightbox component to reduce initial bundle size
const Lightbox = dynamic(() => import("yet-another-react-lightbox"));

// Define the expected props for the ProjectGallery component
interface ProjectGalleryProps {
  images: Array<{ src: string; alt?: string }>; // Update prop type for optional alt text
  projectTitle: string; // The title of the project, used for alt text generation
}

// ProjectGallery component definition
export default function ProjectGallery({
  images,
  projectTitle,
}: ProjectGalleryProps) {
  // Lightbox visibility
  const [open, setOpen] = useState(false);
  // State to track the current slide index in the lightbox (defaults to 0 when opened)
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Prepare the 'slides' array for the lightbox
  // First, filter out any potentially invalid image sources (empty strings, null, undefined)
  const validImages = images.filter(
    (img) => img && typeof img.src === "string" && img.src.trim() !== ""
  );
  // Map the valid image URLs to the format expected by the lightbox ({ src, alt })
  const slides = validImages.map((img) => ({
    src: img.src,
    // Use provided alt text if available, otherwise generate a default.
    alt: img.alt || `${projectTitle} - gallery image`,
  }));

  // Consistent focus style for the trigger button
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]";

  // Determine the source for the main trigger thumbnail (the first valid image)
  const triggerImage = validImages.length > 0 ? validImages[0] : null;
  const triggerImageSrc = triggerImage?.src;
  const triggerImageAlt = triggerImage?.alt || `Thumbnail for ${projectTitle} gallery`; // Use specific alt if available
  // Generate descriptive alt/aria-label text for the trigger button
  const triggerAltText = `${projectTitle} - view gallery (${validImages.length} image${validImages.length !== 1 ? "s" : ""})`


  return (
    <>
      {/* Render the clickable thumbnail trigger */}
      {triggerImageSrc ? (
        // Button element makes the thumbnail interactive
        <button
          onClick={() => {
            setIndex(0); // Ensure lightbox always opens at the first image
            setOpen(true); // Open the lightbox
          }}
          // Hover effect
          className={`relative block w-full aspect-video overflow-hidden rounded-lg shadow-lg group focus:outline-none ${focusVisibleShadow} ${prefersReducedMotion ? "" : "transition duration-200 ease-in-out hover:scale-[1.02]"}`}
          aria-label={triggerAltText} // Accessibility label describing the action
        >
          {/* Display the first image as the clickable thumbnail */}
          <Image
            src={triggerImageSrc}
            alt={triggerImageAlt} // Use specific or generated alt text
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, 50vw"
            // Hover effect
            className={`${prefersReducedMotion ? "" : "transition duration-300 group-hover:scale-105"}`}
            loading="lazy" // Lazy load the thumbnail
          />
          {/* Overlay shown on hover/focus to indicate clickability and gallery size */}
          {/* Transition */}
          <div
            className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus:opacity-100 flex flex-col items-center justify-center text-white p-4 ${prefersReducedMotion ? "" : "transition-opacity"}`}
          >
            {/* Icon added to overlay */}
            <BsArrowsFullscreen className="w-6 h-6 mb-1" aria-hidden="true" />
            <span className="text-sm font-semibold">
              View gallery ({slides.length})
            </span>
          </div>
        </button>
      ) : (
        // Fallback content if no valid images are provided
        <p className="text-center text-gray-400 italic py-4">No gallery images available.</p>
      )}

      {/* Lightbox Component */}
      {/* Conditionally render the Lightbox only when 'open' state is true */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index} // Current slide index
          slides={slides} // Array of slides to display
          plugins={[Thumbnails, Zoom]}
        />
      )}
    </>
  );
}
