"use client"; // Directive for Next.js to ensure this component runs on the client-side

import type { Project } from '@/types'; // Import the Project type definition
import { useState, useEffect, useRef } from 'react'; // Import React hooks for state, side effects, and refs
import { useScroll, useMotionValueEvent } from "motion/react"; // Import Framer Motion hooks for scroll tracking

import SiteHeader from '@/components/SiteHeader'; // Import the main site header component
import AnimatedSection from '@/components/AnimatedSection'; // Import the wrapper component for section animations
import HeroSection from "@/components/HeroSection"; // Import the hero section component
import AboutSection from "@/components/AboutSection"; // Import the about section component
import ExperienceEducationSection from "@/components/ExperienceEducationSection"; // Import the experience/education section component
import PortfolioSection from "@/components/PortfolioSection"; // Import the portfolio section component
import ServicesSection from "@/components/ServicesSection"; // Import the services section component
import ContactSection from "@/components/ContactSection"; // Import the contact section component
import ArtSection from '@/components/ArtSection'; // Import the art section component

// Client-side asynchronous function to fetch project data from the internal API endpoint
async function fetchProjects(): Promise<Project[]> {
  try {
    // Make a GET request to the '/api/projects' endpoint
    const response = await fetch('/api/projects');
    // Check if the response was successful (status code 200-299)
    if (!response.ok) {
      // Throw an error if the response status indicates failure
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON response body
    const projectsData = await response.json();
    // Return the 'items' array from the data, or the data itself if 'items' doesn't exist, or an empty array as a fallback
    // TODO: Standardize the API response format for consistency (e.g., always return { items: [...] }).
    return projectsData.items || projectsData || [];
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error("Error fetching projects via API:", error);
    // TODO: Implement user-facing error handling (e.g., display a message) instead of just logging.
    // TODO: Consider adding a loading state indicator while projects are being fetched.
    return []; // Return an empty array in case of an error
  }
}


// The main page component for the homepage
export default function HomePage() {
  // State to store the array of project data fetched from the API
  const [projects, setProjects] = useState<Project[]>([]);
  // State to track the ID of the currently active section in view, used for header navigation highlighting
  const [activeSection, setActiveSection] = useState<string>('hero'); // Default to 'hero' section on initial load

  // Ref to hold an array of the actual DOM elements for each major section (currently unused, but potentially useful)
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Refs for each individual section component's container element
  // These are passed to AnimatedSection to potentially trigger animations or for scroll tracking.
  // Typed as HTMLDivElement because AnimatedSection likely forwards the ref to a div.
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Hook from Framer Motion to track the overall scroll progress of the page (0 to 1)
  const { scrollYProgress } = useScroll();

  // Effect hook that listens for changes in scrollYProgress
  // TODO: Replace this threshold-based logic with a more reliable method like Intersection Observer.
  // This current implementation is inaccurate, especially with varying section heights and screen sizes.
  // It attempts to set the activeSection based on scroll percentage thresholds.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Example thresholds (highly dependent on content length and viewport)
    let currentSection = 'hero'; // Default assumption
    if (latest >= 1.0) currentSection = 'contact';
    else if (latest >= 0.9) currentSection = 'services';
    else if (latest >= 0.8) currentSection = 'art';
    else if (latest >= 0.6) currentSection = 'portfolio';
    else if (latest >= 0.35) currentSection = 'experience-education';
    else if (latest >= 0.2) currentSection = 'about';

    // Update state only if the determined section is different from the current active one
    if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        // console.log("Page scroll: ", latest, "Active Section:", currentSection); // Debugging log
    }
  });

  // Effect hook that runs once when the component mounts
  useEffect(() => {
    // Fetch the project data and update the state
    fetchProjects().then(setProjects);

    // Populate the sectionsRef array with the actual DOM elements from the refs
    // Filter out any null values (if a ref hasn't been attached yet) and assert the type.
    // Note: This array isn't actively used elsewhere currently.
    sectionsRef.current = [
        heroRef.current, aboutRef.current, experienceRef.current,
        portfolioRef.current, artRef.current, servicesRef.current, contactRef.current
    ].filter(Boolean) as HTMLDivElement[];

  }, []); // Empty dependency array ensures this runs only on mount

  // Render the component structure
  return (
    <>
      {/* Render the SiteHeader, passing the current activeSection state for navigation highlighting */}
      <SiteHeader activeSection={activeSection} />

      {/* Render each section wrapped in the AnimatedSection component */}
      {/* Pass the section ID, the corresponding ref, and potentially a delay */}
      {/* TODO: Review if HeroSection needs the AnimatedSection wrapper or handles its own entry animation. */}
      <AnimatedSection id="hero" ref={heroRef} delay={0}> {/* No entry delay for the hero section */}
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection id="about" ref={aboutRef}>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection id="experience-education" ref={experienceRef}>
        <ExperienceEducationSection />
      </AnimatedSection>
      <AnimatedSection id="portfolio" ref={portfolioRef}>
        {/* Pass the fetched projects data to the PortfolioSection */}
        <PortfolioSection projects={projects} />
      </AnimatedSection>
      <AnimatedSection id="art" ref={artRef}>
        <ArtSection />
      </AnimatedSection>
      <AnimatedSection id="services" ref={servicesRef}>
        <ServicesSection />
      </AnimatedSection>
      <AnimatedSection id="contact" ref={contactRef}>
        <ContactSection />
      </AnimatedSection>
    </>
  );
}
