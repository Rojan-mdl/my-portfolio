"use client";

import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/layout/SiteHeader";

interface PageClientLogicProps {
  // Define specific props for the sections you intend to pass if they need to be identified
  heroSection: React.ReactNode;
  aboutSection: React.ReactNode;
  portfolioSection: React.ReactNode;
  experienceSection: React.ReactNode;
  artSection: React.ReactNode;
  servicesSection: React.ReactNode;
  contactSection: React.ReactNode;
}

export default function PageClientLogic(props: PageClientLogicProps) {
  const [activeSection, setActiveSection] = useState<string>("hero"); 

  // Create refs for each section wrapper div
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElements = [
      { id: "hero", ref: heroRef.current },
      { id: "about", ref: aboutRef.current },
      { id: "experience-education", ref: experienceRef.current },
      { id: "portfolio", ref: portfolioRef.current },
      { id: "art", ref: artRef.current },
      { id: "services", ref: servicesRef.current },
      { id: "contact", ref: contactRef.current },
    ].filter(section => section.ref); // Filter out any null refs

    if (sectionElements.length === 0) return;

    const observerOptions = {
      root: null, 
      rootMargin: "0px",
      threshold: 0.4, 
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetSection = sectionElements.find(s => s.ref === entry.target);
          if (targetSection) {
            setActiveSection(targetSection.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionElements.forEach(section => {
      if (section.ref) observer.observe(section.ref);
    });

    return () => {
      sectionElements.forEach(section => {
        if (section.ref) observer.unobserve(section.ref);
      });
      observer.disconnect();
    };
  }, [props]); // Re-run if props change

  return (
    <>
      <SiteHeader activeSection={activeSection} />
      <main id="main-content" className="pt-16">
        <div id="hero" ref={heroRef}>{props.heroSection}</div>
        <div id="about" ref={aboutRef}>{props.aboutSection}</div>
        <div id="experience-education" ref={experienceRef}>{props.experienceSection}</div>
        <div id="portfolio" ref={portfolioRef}>{props.portfolioSection}</div>
        <div id="art" ref={artRef}>{props.artSection}</div>
        <div id="services" ref={servicesRef}>{props.servicesSection}</div>
        <div id="contact" ref={contactRef}>{props.contactSection}</div>
      </main>
    </>
  );
} 