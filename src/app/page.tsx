import PageClientLogic from "@/components/PageClientLogic";


// Section components
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceEducationSection from "@/components/sections/ExperienceEducationSection";
import PortfolioContent from "@/components/portfolio/PortfolioContent"; 
import ArtSection from "@/components/sections/ArtSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

import AnimatedSection from "@/components/sections/AnimatedSection";


// Page component
export default async function HomePage() {
  return (
    <PageClientLogic
      heroSection={<AnimatedSection id="hero" delay={0}><HeroSection /></AnimatedSection>}
      aboutSection={<AnimatedSection id="about"><AboutSection /></AnimatedSection>}
      experienceSection={<AnimatedSection id="experience-education"><ExperienceEducationSection /></AnimatedSection>}
      portfolioSection={<AnimatedSection id="portfolio"><PortfolioContent /></AnimatedSection>} 
      artSection={<AnimatedSection id="art"><ArtSection /></AnimatedSection>}
      servicesSection={<AnimatedSection id="services"><ServicesSection /></AnimatedSection>}
      contactSection={<AnimatedSection id="contact"><ContactSection /></AnimatedSection>}
    />
  );
}
