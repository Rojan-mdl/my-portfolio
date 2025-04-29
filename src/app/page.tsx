"use client";

import type { Project } from '@/types';
import { useState, useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from "motion/react"; // Removed motion import

import SiteHeader from '@/components/SiteHeader';
import AnimatedSection from '@/components/AnimatedSection'; // Import the new wrapper
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceEducationSection from "@/components/ExperienceEducationSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import ArtSection from '@/components/ArtSection';

// Client-side function to fetch projects from my API
async function fetchProjects(): Promise<Project[]> {
  try {
    // API route can fetch the static JSON
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projectsData = await response.json();
    // API returns the array directly
    return projectsData.items || projectsData || [];
  } catch (error) {
    console.error("Error fetching projects via API:", error);
    return []; // Return empty array on error
  }
}


// The main page component
export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeSection, setActiveSection] = useState<string>('hero'); // Default to 'hero'
  const sectionsRef = useRef<HTMLElement[]>([]); // Ref to hold section elements

  // Refs for each section - Typed as HTMLDivElement for compatibility with AnimatedSection
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll(); // Track overall scroll progress

  // TODO: Implement logic to determine activeSection based on scrollYProgress
  // This is a placeholder - a more robust solution is needed.
  // For now, it just sets the active section based on rough progress thresholds.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Example thresholds
    if (latest < 0.1) setActiveSection('hero');
    else if (latest < 0.25) setActiveSection('about');
    else if (latest < 0.4) setActiveSection('experience-education');
    else if (latest < 0.6) setActiveSection('portfolio');
    else if (latest < 0.75) setActiveSection('art');
    else if (latest < 0.9) setActiveSection('services');
    else setActiveSection('contact');
    // console.log("Page scroll: ", latest, "Active Section:", activeSection);
  });

  useEffect(() => {
    fetchProjects().then(setProjects);

    // Populate sectionsRef array - Cast needed as refs are now HTMLDivElement
    sectionsRef.current = [
        heroRef.current, aboutRef.current, experienceRef.current,
        portfolioRef.current, artRef.current, servicesRef.current, contactRef.current
    ].filter(Boolean) as HTMLDivElement[]; // Filter out nulls and cast

  }, []); // Fetch projects and set up refs on component mount


  return (
    <>
      {/* Pass activeSection to SiteHeader */}
      <SiteHeader activeSection={activeSection} />

      {/* Use AnimatedSection wrapper */}
      {/* Note: HeroSection might have its own internal animation, review later */}
      <AnimatedSection id="hero" ref={heroRef} delay={0}> {/* No delay for hero */}
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection id="about" ref={aboutRef}>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection id="experience-education" ref={experienceRef}>
        <ExperienceEducationSection />
      </AnimatedSection>
      <AnimatedSection id="portfolio" ref={portfolioRef}>
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
