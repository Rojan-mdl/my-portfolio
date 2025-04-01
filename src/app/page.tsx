"use client";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceEducationSection from "@/components/ExperienceEducationSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Gradient container for sections below the hero */}
      <div className="bg-gradient-to-b from-black to-[#21002a] text-white">
        <AboutSection />
        <ExperienceEducationSection />
        <PortfolioSection />
        <ServicesSection />
        <ContactSection />
      </div>
    </>
  );
}
