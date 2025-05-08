"use client";

import type { Project } from "@/types";
import { useState, useEffect, useRef } from "react";

// Components
import SiteHeader from "@/components/SiteHeader";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceEducationSection from "@/components/ExperienceEducationSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import ArtSection from "@/components/ArtSection";

// Interface for the expected API response structure
interface ProjectsApiResponse {
  items: Project[];
}

// Client-side asynchronous function to fetch project data from the internal API endpoint
async function fetchProjects(): Promise<Project[] | null> {
  try {
    const response = await fetch("/api/projects");
    if (!response.ok) {
      // Throw an error with status and potentially message from API
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData?.message || "Unknown error"}`
      );
    }
    // Explicitly expect the { items: [...] } structure
    const projectsData: ProjectsApiResponse = await response.json();
    // Basic validation on the client side as well
    if (!projectsData || !Array.isArray(projectsData.items)) {
        console.error("Invalid projects data format received from API:", projectsData);
        throw new Error("Invalid project data format received.");
    }
    return projectsData.items; // Return only the items array
  } catch (error) {
    console.error("Error fetching projects via API:", error);
    return null;
  }
}

// The main page component for the homepage
export default function HomePage() {
  // State to store the array of project data fetched from the API
  const [projects, setProjects] = useState<Project[]>([]);
  // State to track the ID of the currently active section in view, used for header navigation highlighting
  const [activeSection, setActiveSection] = useState<string>("hero"); // Default to 'hero' section on initial load
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true); // Start in loading state
  const [projectFetchError, setProjectFetchError] = useState<string | null>(null); // State for fetch error

  // Ref to hold an array of the actual DOM elements for each major section (currently unused, but potentially useful)
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Refs for each individual section component's container element
  // These are passed to AnimatedSection to potentially trigger animations or for scroll tracking.
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Effect hook that runs once when the component mounts
  useEffect(() => {
    // Fetch project data and handle loading/error states
    const loadProjects = async () => {
      setProjectFetchError(null); // Reset error state
      setIsLoadingProjects(true); // Set loading state
      const fetchedProjects = await fetchProjects();
      if (fetchedProjects === null) {
        // Handle fetch error
        setProjectFetchError(
          "Failed to load projects. Please try refreshing the page."
        );
        setProjects([]); // Clear projects on error
      } else {
        // Successful fetch
        setProjects(fetchedProjects);
      }
      setIsLoadingProjects(false); // Set loading state to false
    };

    loadProjects();

    // Populate the sectionsRef array with the actual DOM elements from the refs
    // Filter out any null values (if a ref hasn't been attached yet) and assert the type.
    // This is a bit redundant since we are already using refs, but it can be useful for debugging or future enhancements.
    sectionsRef.current = [
      heroRef.current,
      aboutRef.current,
      experienceRef.current,
      portfolioRef.current,
      artRef.current,
      servicesRef.current,
      contactRef.current,
    ].filter(Boolean) as HTMLDivElement[];
  }, []); // Empty dependency array ensures this runs only on mount

  // Effect hook for Intersection Observer to track active section
  useEffect(() => {
    const sectionElements = [
      { id: "hero", ref: heroRef.current },
      { id: "about", ref: aboutRef.current },
      { id: "experience-education", ref: experienceRef.current },
      { id: "portfolio", ref: portfolioRef.current },
      { id: "art", ref: artRef.current },
      { id: "services", ref: servicesRef.current },
      { id: "contact", ref: contactRef.current },
    ].filter((section) => section.ref); // Filter out sections whose refs might not be ready

    if (sectionElements.length === 0) {
      return; // Don't proceed if no refs are available yet
    }

    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      // Threshold: array of thresholds or a single number.
      // A threshold of 0.5 means the callback triggers when 50% of the element is visible.
      // A lower value makes sections active sooner.
      threshold: 0.4, // Section becomes active when 40% is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        // Find the corresponding section data using the target element
        const targetSection = sectionElements.find(s => s.ref === entry.target);
        if (targetSection && entry.isIntersecting) {
          // console.log(`${targetSection.id} is intersecting`); // Debugging
          // Set the intersecting section as active.
          // If multiple are intersecting due to threshold/viewport size, the last one processed might win.
          setActiveSection(targetSection.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section element
    sectionElements.forEach((section) => {
      if (section.ref) { // Double check ref existence
        observer.observe(section.ref);
      }
    });

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  },
);

  // Render the component structure
  return (
    <>
      {/* Render the SiteHeader, passing the current activeSection state for navigation highlighting */}
      <SiteHeader activeSection={activeSection} />

      {/* Render each section wrapped in the AnimatedSection component */}
      {/* Pass the section ID, the corresponding ref, and potentially a delay */}
      <AnimatedSection id="hero" ref={heroRef} delay={0}>
        {" "}
        {/* No entry delay for the hero section */}
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection id="about" ref={aboutRef}>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection id="experience-education" ref={experienceRef}>
        <ExperienceEducationSection />
      </AnimatedSection>
      <AnimatedSection id="portfolio" ref={portfolioRef}>
        {isLoadingProjects && <p className="text-center py-8">Loading projects...</p>}
        {projectFetchError && !isLoadingProjects && (
          <p className="text-center py-8 text-red-500">{projectFetchError}</p>
        )}
        {!isLoadingProjects && !projectFetchError && (
          <PortfolioSection projects={projects} />
        )}
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
