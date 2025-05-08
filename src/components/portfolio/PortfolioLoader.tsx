import PortfolioSection from "@/components/portfolio/PortfolioSection";
import type { Project } from "@/types";
import { getCachedProjects } from "@/lib/data/projects"; // Import the function from the new location

// Server-side asynchronous function to fetch project data
async function fetchProjectsServer(): Promise<Project[] | null> {
  try {
    // Directly call the cached data fetching function
    const projects = await getCachedProjects();
    return projects;
  } catch (error) {
    console.error("Error directly fetching projects data in PortfolioLoader:", error);
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