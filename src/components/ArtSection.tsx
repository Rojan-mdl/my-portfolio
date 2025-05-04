"use client"; // Directive for Next.js client components

import React, { useState, useRef } from "react"; // Import React and hooks
import Image from "next/image"; // Import Next.js Image component
import dynamic from "next/dynamic"; // Import dynamic for code splitting
import type { Slide } from "yet-another-react-lightbox"; // Import Slide type for lightbox
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  animate,
  MotionValue,
} from "motion/react"; // Import motion components and hooks
// Import lightbox plugins
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// Import lightbox styles
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Dynamically import the Lightbox component
const Lightbox = dynamic(() => import("yet-another-react-lightbox"));

// Define the structure for individual art pieces in the gallery
type ArtPiece = {
  type: "image" | "video"; // Specifies if the piece is an image or video
  src?: string; // Source URL (required for images, optional for videos if using 'sources')
  alt: string; // Alt text for accessibility
  sources?: { src: string; type: string }[]; // Array of sources for video (e.g., different formats)
  poster?: string; // Poster image URL for videos
  width?: number; // Intrinsic width for lightbox sizing (especially for videos)
  height?: number; // Intrinsic height for lightbox sizing
};

// Constants for the mask gradient
const left = `0%`;
const right = `100%`;
const leftInset = `15%`; // Adjust inset percentage as needed
const rightInset = `85%`; // Adjust inset percentage as needed
const transparent = `#0000`;
const opaque = `#000f`; // Use black with full opacity for the mask

// Hook to generate the dynamic mask gradient based on scroll progress
function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    // Animate the mask based on scroll position (start, end, middle)
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      // Ensure smooth transition when scrolling away from edges
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}

// ArtSection component definition
export default function ArtSection() {
  const [open, setOpen] = useState(false); // Lightbox open state
  const [index, setIndex] = useState(-1); // Lightbox slide index
  const scrollRef = useRef<HTMLUListElement>(null); // Ref for the scrollable container

  // Get scroll progress for the container
  const { scrollXProgress } = useScroll({ container: scrollRef });
  // Generate the mask image style based on scroll progress
  const maskImage = useScrollOverflowMask(scrollXProgress);

  // Array containing the data for each art piece
  const artPieces: ArtPiece[] = [
    {
      type: "image",
      src: "/art/green-eye.png",
      alt: "Floating eye with grass around it and a tree growing from the top.",
    },
    {
      type: "image",
      src: "/art/cellular-wave.png",
      alt: "Interconnected molecules close-up.",
    },
    {
      type: "video",
      sources: [{ src: "/video/Black-hole.mp4", type: "video/mp4" }], // Video source(s)
      poster: "/art/black-hole.png", // Poster image for the video
      alt: "Black hole in the palm of a hand.", // Alt text describes the poster/concept
      width: 1920,
      height: 1080, // Dimensions for lightbox video player
    },
    {
      type: "image",
      src: "/art/distance.png",
      alt: "A vast futuristic horizon with squares, circles, triangles and x's floating in the distance.",
    },
    {
      type: "image",
      src: "/art/frozen-orb.png",
      alt: "A hexagon with a glowing centre shining through frozen glass patches, sitting on a wet surface.",
    },
    {
      type: "image",
      src: "/art/hand-sphere.png",
      alt: "A shattered black and golden hand, where the palm is replaced by a red-rimmed glowing sphere.",
    },
    {
      type: "image",
      src: "/art/hex-orb.png",
      alt: "A golden plated sphere mostly encompassing a red-rimmed orb inside it, resting on a display plate.",
    },
    {
      type: "image",
      src: "/art/playing-board.png",
      alt: "A hexagonal board-playing world with water, forest, rocks, houses and boats.",
    },
    // Add more art pieces as needed.
  ];

  // Prepare the 'slides' array for the Lightbox component
  const slides = artPieces
    // Filter out any pieces that might lack necessary source data to prevent errors
    .filter(
      (piece) =>
        (piece.type === "image" && piece.src) ||
        (piece.type === "video" && piece.sources && piece.sources.length > 0)
    )
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
          // Add srcSet if needed
        };
      }
    });

  // Consistent focus style
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]";

  return (
    <>
      {/* Art Section Container */}
      <section
        className="py-16 my-26 text-gray-100 overflow-hidden"
        aria-labelledby="art-heading"
      >
        {/* Container - Adjusted padding for horizontal scroll */}
        <div className="max-w-6xl mx-auto px-0 sm:px-4">
          {" "}
          {/* Remove horizontal padding on smallest screens */}
          {/* Section Heading */}
          <h2
            id="art-heading"
            className="text-3xl font-bold mb-8 text-center px-4 sm:px-0"
          >
            {" "}
            {/* Add padding back here */}
            Art
          </h2>
          {/* Horizontal Scrolling Container */}
          <motion.ul
            ref={scrollRef}
            style={{ maskImage }} // Apply the dynamic mask
            className="horizontal-scrollbar flex list-none h-[400px] overflow-x-scroll py-5 px-4 sm:px-0 gap-5" // Further increased height
          >
            {/* Map through artPieces to create clickable list items */}
            {artPieces.map((piece, idx) => {
              const thumbnailSrc =
                piece.type === "video" ? piece.poster : piece.src;

              return thumbnailSrc ? (
                <li key={idx} className="flex-shrink-0 w-[350px] h-full">
                  {" "}
                  {/* Further increased width */}
                  <button
                    onClick={() => {
                      const slideIndex = slides.findIndex(
                        (slide) =>
                          (slide.type === "image" && slide.src === piece.src) ||
                          (slide.type === "video" &&
                            slide.poster === piece.poster)
                      );
                      if (slideIndex !== -1) {
                        setIndex(slideIndex);
                        setOpen(true);
                      }
                    }}
                    className={`relative w-full h-full overflow-hidden rounded-lg shadow-lg group focus:outline-none ${focusVisibleShadow}`}
                    aria-label={`View larger for ${piece.alt}`}
                  >
                    <Image
                      src={thumbnailSrc}
                      alt={piece.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="450px" // Updated size to match new li width
                      className="transition duration-300 group-hover:scale-105" // Keep subtle hover scale on image
                      loading="lazy"
                    />
                  </button>
                </li>
              ) : null;
            })}
          </motion.ul>
        </div>
      </section>

      {/* Lightbox Component */}
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
