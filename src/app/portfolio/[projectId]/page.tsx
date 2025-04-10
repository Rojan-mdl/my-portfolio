import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Project } from '@/types';
import ToolIcon from '@/components/ToolIcon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProjectGallery from '@/components/ProjectGallery';

// Helper function to extract YouTube Video ID from various URL formats
const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  // Regular expression to cover various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Explicit Props interface expecting a Promise for params
interface Props {
  params: Promise<{ projectId: string; }>;
}

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
    return null;
  }
}

// generateMetadata uses data from projects.json
export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const { projectId } = await paramsPromise;
  const project = await getProjectData(projectId); // Fetches data including 'brief'
  // Note: This function DOES NOT use detailPath, only brief/title/image from JSON
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }
  return {
    title: project.title,
    description: project.brief, // Uses brief from JSON
    openGraph: {
        title: project.title,
        description: project.brief,
        images: project.image ? [project.image] : [],
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
      projectId: project.id,
    }));
  } catch (error) {
     console.error("Error reading projects data for static params:", error);
     return [];
  }
}


// The Page Component
export default async function ProjectPage({ params: paramsPromise }: Props) {
  const { projectId } = await paramsPromise;
  const project = await getProjectData(projectId); // Fetches metadata including detailPath

  if (!project) {
    notFound();
  }

  // Read Markdown content from the file specified by detailPath
  let markdownContent = ''; // Default content
  if (project.detailPath) {
      try {
          const markdownFilePath = path.join(process.cwd(), project.detailPath); // Use detailPath
          markdownContent = await fs.readFile(markdownFilePath, 'utf8');
      } catch (error) {
          console.error(`Error reading markdown file at ${project.detailPath}:`, error);
          markdownContent = 'Error loading project details.'; // Set fallback content
      }
  } else {
      console.warn(`Project with id ${projectId} is missing the detailPath field.`);
      markdownContent = 'Project details are not available.'; // Set fallback content
  }


  return (
    <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-100">
      {/* Project Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>

      {/* Main Project Image */}
      {project.image ? (
        <div className="mb-6 relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
          <Image
            src={project.image}
            // TODO: Consider providing more descriptive alt text from projects.json if this image conveys specific info
            alt={`Main image for ${project.title}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 66vw"
          />
        </div>
      ) : null}

      {/* Brief Description */}
      <p className="text-lg text-gray-300 mb-6 italic">{project.brief}</p>

      {/* Detailed Information - Use markdownContent */}
      {/* Corrected className to use 'markdown-content' for manual styling */}
      <div className="markdown-content max-w-none mb-8 text-gray-200">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </div>

      {/* Extended Images Gallery */}
      {project.extendedImages && project.extendedImages.length > 0 && (
        <section className="mb-10" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Gallery</h2>
          {/* Render the client component, passing images and title */}
          <ProjectGallery images={project.extendedImages.filter(img => img)} projectTitle={project.title} />
           {/* Filtering (img => img) just in case of empty strings, ProjectGallery also handles it */}
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
                    {/* TODO: Add <track> elements for captions (WCAG 1.2.2) and audio descriptions (WCAG 1.2.5) if needed */}
                    Your browser does not support the video tag.
                 </video>
              </div>
           ))}
         </section>
       )}

      {/* Embedded YouTube Video (if URL provided in JSON) */}
      {(() => {
        // Check if the URL exists first
        if (!project.youtubeVideoUrl) return null;

        // Then try to get the ID
        const videoId = getYouTubeId(project.youtubeVideoUrl);
        if (!videoId) return null; // Don't render if ID extraction fails

        // Render the iframe if we have a valid ID
        return (
          <section className="mb-10" aria-labelledby="youtube-video-heading">
            <h2 id="youtube-video-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Video</h2>
            <div className="aspect-video w-full bg-black rounded overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${project.title} Video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        );
      })()}


       {/* Tools Used */}
       {project.toolIcons && project.toolIcons.length > 0 && (
         <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Tools Used</h2>
          <div className="flex flex-wrap gap-4">
          {project.toolIcons.map((tool, index) => (
              // Check tool.src before rendering ToolIcon
              // Render ToolIcon only if tool.src is a non-empty string and label exists
              (tool.src && tool.label) ? (
                <ToolIcon
                  key={index}
                  src={tool.src}
                  alt={tool.label} // Alt text is required by ToolIcon
                  label={tool.label}
                  size={32}
                />
              ) : null
            ))}
          </div>
        </section>
      )}

      {/* Link back to portfolio */}
       <div className="mt-12 pt-8 text-center">
          <Link href="/#portfolio" className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1">
             &larr; Back to All Projects
          </Link>
       </div>
    </main>
  );
}
