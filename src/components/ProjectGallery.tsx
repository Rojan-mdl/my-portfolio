"use client"; // Directive for Next.js client components (needed for hooks and dynamic import)

import React, { useState } from "react"; // Import React and useState hook
import Image from "next/image"; // Import Next.js Image component
import dynamic from "next/dynamic"; // Import dynamic for code splitting the lightbox
// Import lightbox plugins (can be kept static as they are smaller)
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// Import lightbox styles
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"; // Import the shared hook
import { BsArrowsFullscreen } from "react-icons/bs"; // Import icon for overlay

// Dynamically import the main Lightbox component to reduce initial bundle size.
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
  // State to control lightbox visibility
  const [open, setOpen] = useState(false);
  // State to track the current slide index in the lightbox (defaults to 0 when opened)
  const [index, setIndex] = useState(0);
  // Check for reduced motion preference
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
    // Note: Update projects.json to include alt text in the extendedImages array for this to work.
    alt: img.alt || `${projectTitle} - gallery image`,
  }));

  // Consistent focus style for the trigger button
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]";

  // Determine the source for the main trigger thumbnail (the first valid image)
  const triggerImage = validImages.length > 0 ? validImages[0] : null;
  const triggerImageSrc = triggerImage?.src;
  const triggerImageAlt = triggerImage?.alt || `Thumbnail for ${projectTitle} gallery`; // Use specific alt if available
  // Generate descriptive alt/aria-label text for the trigger button
  const triggerAltText = `${projectTitle} - view gallery (${validImages.length} image${validImages.length !== 1 ? "s" : ""})`;

  // Simple base64 encoded transparent pixel for placeholder
  // Replace with a proper low-quality image placeholder (LQIP) generation method if desired
  const placeholderBlur = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  return (
    <>
      {/* Render the clickable thumbnail trigger */}
      {/* Only render if there's at least one valid image */}
      {triggerImageSrc ? (
        // Button element makes the thumbnail interactive
        <button
          onClick={() => {
            setIndex(0); // Ensure lightbox always opens at the first image
            setOpen(true); // Open the lightbox
          }}
          // Styling: Relative positioning, block display, full width, aspect ratio, overflow hidden, rounded corners, shadow, group for hover effects, focus style
          // Hover effect: Slight scale increase (disabled if reduced motion preferred)
          className={`relative block w-full aspect-video overflow-hidden rounded-lg shadow-lg group focus:outline-none ${focusVisibleShadow} ${prefersReducedMotion ? "" : "transition duration-200 ease-in-out hover:scale-[1.02]"}`}
          aria-label={triggerAltText} // Accessibility label describing the action
        >
          {/* Display the first image as the clickable thumbnail */}
          <Image
            src={triggerImageSrc}
            alt={triggerImageAlt} // Use specific or generated alt text
            fill // Fill the container
            style={{ objectFit: "cover" }} // Cover the container area
            sizes="(max-width: 640px) 100vw, 50vw" // Responsive sizes hint (adjust based on actual layout)
            // Hover effect: Slight inner image scale (disabled if reduced motion preferred)
            className={`${prefersReducedMotion ? "" : "transition duration-300 group-hover:scale-105"}`}
            loading="lazy" // Lazy load the thumbnail
            placeholder="blur" // Enable blur placeholder
            blurDataURL={placeholderBlur} // Provide base64 placeholder
          />
          {/* Overlay shown on hover/focus to indicate clickability and gallery size */}
          {/* Styling: Absolute positioning, dark overlay, initially hidden, fades in on hover/focus, flex centering, text style */}
          {/* Transition: Opacity transition (disabled if reduced motion preferred) */}
          <div
            className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus:opacity-100 flex flex-col items-center justify-center text-white p-4 ${prefersReducedMotion ? "" : "transition-opacity"}`}
          >
            {/* Icon added to overlay */}
            <BsArrowsFullscreen className="w-6 h-6 mb-1" aria-hidden="true" />
            {/* Text indicating the action and number of images */}
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
      {/* This leverages the dynamic import, loading the lightbox code only when needed */}
      {open && (
        <Lightbox
          open={open} // Controls visibility
          close={() => setOpen(false)} // Function to close the lightbox
          index={index} // Current slide index
          slides={slides} // Array of slides to display
          // Enable plugins for thumbnails and zoom functionality
          plugins={[Thumbnails, Zoom]}
          // Note: Lightbox appearance/behavior can be customized further via props.
          // See docs: https://yet-another-react-lightbox.com/documentation
        />
      )}
    </>
  );
}
