"use client";

import {
  AnimatePresence,
  motion,
  wrap,
} from "motion/react";
import { forwardRef, useState, CSSProperties } from "react";
import ToolIcon from "@/components/ui/ToolIcon";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


// ServicesSection component definition
export default function ServicesSection() {

  const services = [
    {
      title: "Web Development",
      description:
        "Full-stack web development using modern technologies like Next.js, React, and TypeScript to create performant and user-friendly applications.",
      tools: ["Next.js", "React", "TypeScript", "JavaScript", "Python", "C#", "Figma", "Tailwind CSS"],
    },
    {
      title: "3D Visualization",
      description:
        "Creating compelling 3D models, animations, and visualizations for products, architecture, or interactive experiences using tools like Blender or Unreal Engine.",
      tools: ["Blender", "Unreal Engine", "Python"],
    },
    {
      title: "Interactive Design",
      description:
        "Focusing on user interaction and experience design, prototyping with Figma, and implementing interactive elements that delight users.",
      tools: ["Figma", "JavaScript", "TypeScript"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function setSlide(newDirection: 1 | -1) {
    const newIndex = wrap(0, services.length, currentIndex + newDirection);
    setCurrentIndex(newIndex);
    setDirection(newDirection);
  }

  const activeService = services[currentIndex];
  const cardColor = "bg-[rgb(var(--color-secondary))]";

  return (
    // Section container for Services
    <section
      className="py-16 my-26 text-gray-100 flex flex-col items-center justify-center"
      aria-labelledby="services-heading"
    >
      {/* Section Heading */}
      <h2
        id="services-heading"
        className="text-3xl font-bold mb-12 text-center"
      >
        Services
      </h2>

      {/* Carousel Container */}
      <div style={carouselContainerStyle} className="relative w-full max-w-4xl">
        {/* Left Arrow Button */}
        <motion.button
          initial={false}
          aria-label="Previous Service"
          style={arrowButtonStyle}
          onClick={() => setSlide(-1)}
          whileTap={{ scale: 0.9 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700 hover:bg-gray-600 hover:scale-110 transition-all p-2 rounded-full"
        >
          <FaArrowLeft size={24} className="text-[rgb(var(--color-foreground))]" />
        </motion.button>

        {/* Slides Area */}
        <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <ServiceSlide
              key={currentIndex}
              direction={direction}
              service={activeService}
              cardColor={cardColor}
            />
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <motion.button
          initial={false}
          aria-label="Next Service"
          style={arrowButtonStyle}
          onClick={() => setSlide(1)}
          whileTap={{ scale: 0.9 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700 hover:bg-gray-600 hover:scale-110 transition-all p-2 rounded-full"
        >
          <FaArrowRight size={24} className="text-[rgb(var(--color-foreground))]" />
        </motion.button>
      </div>
    </section>
  );
}

// ServiceSlide component
const ServiceSlide = forwardRef(function ServiceSlide(
  {
    service,
    direction,
    cardColor,
  }: {
    service: { title: string; description: string; tools: string[] };
    direction: 1 | -1;
    cardColor: string;
  },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <motion.div
      ref={ref}
      variants={slideVariants}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30, duration: 0.3 },
        opacity: { duration: 0.2 },
      }}
      style={{ ...slideStyle }}
      className={`absolute w-5/6 h-full p-8 rounded-xl shadow-xl flex flex-col justify-between ${cardColor}`}
    >
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--color-foreground))]">{service.title}</h3>
        <p className="text-gray-300 mb-6 text-lg">{service.description}</p>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-3 text-gray-200">Tools:</h4>
        <ul className="flex flex-wrap gap-2">
          {service.tools.map((tool, index) => (
            <li
              key={index}
              className=" text-gray-200 px-3 py-1.5 rounded-full text-xs flex items-center"
            >
              <ToolIcon
                iconName={tool}
                alt={tool}
                label={tool}
                size={24}
                labelVisibility="inline"
              />
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};


/* Styles */
const carouselContainerStyle: CSSProperties = {
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
};

const slideStyle: CSSProperties = {
  borderRadius: "12px",
  boxShadow: "shadow-xl",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // Pushes skills to the bottom
  position: "absolute",
};

const arrowButtonStyle: CSSProperties = {
  width: 50,
  height: 50,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  outline: "none",
};
