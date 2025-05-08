import PortfolioSection from "@/components/portfolio/PortfolioSection";
import type { Project } from "@/types";

// Interface for the expected API response structure
interface ProjectsApiResponse {
  items: Project[];
}

// Server-side asynchronous function to fetch project data
async function fetchProjectsServer(): Promise<Project[] | null> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/projects", { cache: 'no-store' }); // Ensure fresh data
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`HTTP error! status: ${response.status}, message: ${errorData?.message || "Unknown error"}`);
      return null; // Or throw error to be caught by error.js
    }
    const projectsData: ProjectsApiResponse = await response.json();
    if (!projectsData || !Array.isArray(projectsData.items)) {
      console.error("Invalid projects data format received from API:", projectsData);
      return null; // Or throw error
    }
    return projectsData.items;
  } catch (error) {
    console.error("Error fetching projects in PortfolioLoader:", error);
    return null; // Or throw error
  }
}

export default async function PortfolioLoader() {
  const projects = await fetchProjectsServer();

  if (!projects) {
    return <p className="text-center py-8 text-red-500">Failed to load projects. Please try refreshing.</p>;
  }

  if (projects.length === 0) {
    return <p className="text-center py-8">No projects to display currently.</p>;
  }

  return (
    <>
      <PortfolioSection projects={projects} />
    </>
  );
} 