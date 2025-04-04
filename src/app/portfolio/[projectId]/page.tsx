import { promises as fs } from 'fs';
import path from 'path';


import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Project } from '@/types';
import ToolIcon from '@/components/ToolIcon';

// --- ADDED: Explicit Props interface ---
interface Props {
  params: {
    projectId: string; // The dynamic route parameter
  };
  // You can also add searchParams if needed:
  // searchParams?: { [key: string]: string | string[] | undefined };
}
// --- END ADDED INTERFACE ---

// Helper Function to Get Project Data
// Runs on the server (in generateMetadata, generateStaticParams, and Page component)
async function getProjectData(projectId: string): Promise<Project | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const projects: Project[] = JSON.parse(jsonData);
    const project = projects.find(p => p.id === projectId);
    return project || null;
  } catch (error) {
    console.error("Error reading projects data:", error);
    return null; // Return null on error
  }
}

// Generate Dynamic Metadata
// Uses title template from layout.tsx by returning only the specific part
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const project = await getProjectData(params.projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  // Return project-specific metadata; Next.js merges title with parent template
  return {
    title: project.title,
    description: project.brief,
    openGraph: {
      title: project.title,
      description: project.brief,
      images: project.image ? [
          { url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}${project.image}`, width: 1200, height: 630 }
      ] : [], // Add fallback OG image from parent if desired: parentMetadata.openGraph?.images || []
    },
  }
}

// Generate Static Paths at Build Time
// Tells Next.js which project IDs exist to pre-render pages
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const projects: Project[] = JSON.parse(jsonData);

    return projects.map((project) => ({
      projectId: project.id, // Must match the dynamic segment name '[projectId]'
    }));
  } catch (error) {
     console.error("Error reading projects data for static params:", error);
     return [];
  }
}


// The Page Component
// Renders the individual project page content
export default async function ProjectPage({ params }: Props) {
  const project = await getProjectData(params.projectId);

  // If project data isn't found for the given ID, show the 404 page
  if (!project) {
    notFound();
  }

  return (
    <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-100">
      {/* Project Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>

      {/* Main Project Image */}
      {project.image && (
        <div className="mb-6 relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
          <Image
            src={project.image}
            alt={`Main image for ${project.title}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 66vw" // Example sizes
          />
        </div>
      )}

      {/* Brief Description */}
      <p className="text-lg text-gray-300 mb-6 italic">{project.brief}</p>

      {/* Detailed Information */}
      <div className="prose prose-invert max-w-none mb-8 text-gray-200">
         {/* Render detail; consider markdown renderer if applicable */}
        <p>{project.detail}</p>
      </div>

      {/* Extended Images Gallery */}
      {project.extendedImages && project.extendedImages.length > 0 && (
        <section className="mb-10" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.extendedImages.map((imgSrc, index) => (
               <div key={index} className="relative w-full aspect-video overflow-hidden rounded">
                 <Image
                    src={imgSrc}
                    alt={`${project.title} - gallery image ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                 />
               </div>
            ))}
          </div>
        </section>
      )}

       {/* Extended Videos */}
       {project.extendedVideos && project.extendedVideos.length > 0 && (
        <section className="mb-10" aria-labelledby="videos-heading">
          <h2 id="videos-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Videos</h2>
           {project.extendedVideos.map((videoSrc, index) => (
              <div key={index} className="mb-4 aspect-video bg-black rounded overflow-hidden">
                 <video controls className="w-full h-full" preload="metadata">
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                 </video>
              </div>
           ))}
        </section>
       )}

      {/* Tools Used */}
      {project.toolIcons && project.toolIcons.length > 0 && (
        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Tools Used</h2>
          <div className="flex flex-wrap gap-4">
            {project.toolIcons.map((tool, index) => (
              // Use the ToolIcon component, passing the correct props
              <ToolIcon
                  key={index}
                  src={tool.src}
                  alt={tool.label} // Use label for alt text
                  label={tool.label}
                  size={32} // Or desired size for this page
              />
            ))}
          </div>
        </section>
      )}

      {/* Link back to portfolio */}
       <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <Link href="/#portfolio" className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1">
             &larr; Back to All Projects
          </Link>
       </div>
    </main>
  );
}