import { promises as fs } from 'fs';
import path from 'path';
import type { Project } from '@/types';


import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceEducationSection from "@/components/ExperienceEducationSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import ArtSection from '@/components/ArtSection';


// Server-side function to fetch projects
async function getProjects(): Promise<Project[]> {
   try {
     const filePath = path.join(process.cwd(), 'data', 'projects.json');
     const jsonData = await fs.readFile(filePath, 'utf8');
     const projectsData = JSON.parse(jsonData);
     return projectsData.items || projectsData || [];
   } catch (error) {
     console.error("Error reading projects file directly:", error);
     return [];
   }
}

// The main page component
export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceEducationSection />
      <PortfolioSection projects={projects} />
      <ArtSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}