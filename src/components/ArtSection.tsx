"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Slide } from "yet-another-react-lightbox";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  animate,
  MotionValue,
} from "motion/react";

// Lightbox plugins
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// Lightbox styles
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Lightbox component
const Lightbox = dynamic(() => import("yet-another-react-lightbox"));

// Structure for individual art pieces
type ArtPiece = {
  type: "image" | "video";
  src?: string;
  alt: string;
  sources?: { src: string; type: string }[];
  poster?: string;
  width?: number;
  height?: number;
};

// Constants for the mask gradient
const left = `0%`;
const right = `100%`;
const leftInset = `15%`;
const rightInset = `85%`;
const transparent = `#0000`;
const opaque = `#000f`;

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
      // Smooth transition when scrolling away from edges
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
      sources: [{ src: "/video/Black-hole.mp4", type: "video/mp4" }],
      poster: "/art/black-hole.png",
      alt: "Black hole in the palm of a hand.",
      width: 1920,
      height: 1080,
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
          sources: piece.sources || [],
          poster: piece.poster,
          width: piece.width,
          height: piece.height,
        };
      } else {
        // Structure for image slides
        return {
          type: "image",
          src: piece.src!,
          alt: piece.alt,
        };
      }
    });

  // Focus style
  const focusVisibleShadow = "focus-visible:shadow-[0_0_10px_2px_#ffffff]";

  return (
    <>
      {/* Art Section Container */}
      <section
        className="py-16 my-26 text-gray-100 overflow-hidden"
        aria-labelledby="art-heading"
      >
        <div className="max-w-6xl mx-auto px-0 sm:px-4">
          {" "}
          <h2
            id="art-heading"
            className="text-3xl font-bold mb-8 text-center px-4 sm:px-0"
          >
            {" "}
            Art
          </h2>
          {/* Horizontal Scrolling Container */}
          <motion.ul
            ref={scrollRef}
            style={{ maskImage }} // Apply the dynamic mask
            className="horizontal-scrollbar flex list-none h-[400px] overflow-x-scroll py-5 px-4 sm:px-0 gap-5"
          >
            {/* Map through artPieces to create clickable list items */}
            {artPieces.map((piece, idx) => {
              const thumbnailSrc =
                piece.type === "video" ? piece.poster : piece.src;

              return thumbnailSrc ? (
                <li key={idx} className="flex-shrink-0 w-[350px] h-full">
                  {" "}
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
                      sizes="450px"
                      className="transition duration-300 group-hover:scale-105" // Subtle hover scale on image
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
