// Node.js imports
import { promises as fs } from "fs";
import path from "path";

// Next.js imports
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Local imports
import type { Project } from "@/types";
import ToolIcon from "@/components/ToolIcon";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ProjectGallery from "@/components/ProjectGallery";


// Helper function to extract YouTube Video ID from various URL formats
// Returns the 11-character video ID or null if not found/invalid.
const getYouTubeId = (url: string | undefined | null): string | null => {
  // Return null immediately if the URL is falsy
  if (!url) return null;
  // Covers youtu.be, /v/, /u/\w/, /embed/, /shorts/, watch?v=, watch?&v= formats
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  // Check if a match was found and the captured group (video ID) is 11 characters long
  return match && match[2].length === 11 ? match[2] : null;
};

// Define the expected props structure for the page component
// Next.js passes route parameters (like projectId) within the 'params' object.
interface Props {
  params: Promise<{ projectId: string }>; // Revert Props definition to expect a Promise
} // Might be better to use `params: { projectId: string }` directly if not async, but it works as is.


// Server-side helper function to fetch data for a single project by its ID
// This function reads from the local projects.json file.
async function getProjectData(projectId: string): Promise<Project | null> {
  try {
    // Construct the absolute path to the projects data file
    const filePath = path.join(process.cwd(), "data", "projects.json");
    // Read the JSON file content
    const jsonData = await fs.readFile(filePath, "utf8");
    // Parse the JSON data into an array of Project objects
    const projects: Project[] = JSON.parse(jsonData);
    // Find the project that matches the provided projectId
    const project = projects.find((p) => p.id === projectId);
    // Return the found project or null if not found
    return project || null;
    // Caching Note: Reading from the local filesystem like this might benefit from OS-level caching,
    // but for more explicit control, especially in serverless environments or for larger/frequently
    // accessed data, consider using Next.js's `unstable_cache` or restructuring to use `fetch`
    // with revalidation if the data were served from an internal API route.

  } catch (error) { // Find out what kind of shit hit the fan
    console.error("Error reading projects data:", error);
    if (error instanceof Error) {
      const nodeError = error as NodeJS.ErrnoException;
      if (nodeError.code === 'ENOENT') {
        console.error(`Error: Projects data file not found at ${path.join(process.cwd(), "data", "projects.json")}`);
      } else if (error instanceof SyntaxError) {
        console.error("Error: Failed to parse projects.json. Check for JSON syntax errors.");
      } else {
        console.error("An unexpected error occurred while getting project data:", error.message);
      }
    } else {
      // Ok but what if it's a shit you've not seen before
      console.error("An unexpected non-error object was thrown:", error);
    }
    return null;
  }
}

// Function to generate page METADATA (title, description, open graph tags) dynamically
// This runs on the server during the request or at build time.
export async function generateMetadata({
  params: paramsPromise,
}: Props): Promise<Metadata> {
  // Resolve the promise to get the projectId
  const { projectId } = await paramsPromise;
  // Fetch the specific project data using the helper function
  const project = await getProjectData(projectId);


  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  // If the project is found, return metadata based on its data
  return {
    title: project.title,
    description: project.brief,
    // Configure Open Graph metadata for social sharing previews
    openGraph: {
      title: project.title, // OG title
      description: project.brief, // OG description
      // OG image, if available
      images: project.image ? [project.image] : [],
    },
  };
}

// Function to generate static paths at build time
// This tells Next.js which project IDs exist so it can pre-render these pages for performance.
export async function generateStaticParams() {
  try {
    // Construct the path to the projects data file
    const filePath = path.join(process.cwd(), "data", "projects.json");
    // Read the file content
    const jsonData = await fs.readFile(filePath, "utf8");
    // Parse the JSON data
    const projects: Project[] = JSON.parse(jsonData);

    // Map the projects array to an array of objects with the required { projectId: '...' } structure
    return projects.map((project) => ({
      projectId: project.id,
    }));
  } catch (error) {
    console.error("Error reading projects data for static params:", error);
    return [];
  }
}

// The MAIN PAGE COMPONENT for individual project pages
// Async server component
export default async function ProjectPage({ params: paramsPromise }: Props) { // Rename to indicate it's a promise or Vercel starts crying
  // Resolve the promise to get the projectId from the route parameters
  const { projectId } = await paramsPromise;
  // Fetch the data for the specific project
  const project = await getProjectData(projectId);

  if (!project) {
    notFound();
  }

  // Read the detailed Markdown content for the project
  let markdownContent = "";
  if (project.detailPath) {
    try {
      // Construct the absolute path to the markdown file
      const markdownFilePath = path.join(process.cwd(), project.detailPath);
      // Read the markdown file content
      markdownContent = await fs.readFile(markdownFilePath, "utf8");
    } catch (error) {

      console.error(
        `Error reading markdown file at ${project.detailPath}:`,
        error
      );

      markdownContent = "*Oops! We couldn't load the project details at this time. Please try again later.*";
    }
  } else {

    console.warn(
      `Project with id ${projectId} is missing the detailPath field.`
    );

    markdownContent = "Project details are not available.";
  }

  // Check if there are sub-projects
  const hasSubProjects = project.subProjects && project.subProjects.length > 0;


  return (
    // Main project container
    <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-100">
      {/* Project title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>

      {/* Main project image (if available and no sub-projects, or as an intro) */}
      {
        project.image && (
          <div className="mb-6 relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={project.image}
              alt={project.imageAlt || `Main image for ${project.title}`}
              fill
              style={{ objectFit: "cover" }}
              priority // Prioritize loading this image as it's LCP (Large Cock Penis)
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 66vw"
            />
          </div>
        )
      }

      {/* Brief project description */}
      <p className="text-lg text-gray-300 mb-6 italic">{project.brief}</p>

      {/* Detailed project information (Rendered from Markdown) */}
      {/* Apply custom styling via 'markdown-content' class (globals.css) */}
      <div className="markdown-content max-w-none mb-8 text-gray-200">
        {/* Use ReactMarkdown component to parse and render the markdown string */}
        {/* Enable remarkGfm plugin */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </div>


      {/* SUB-PROJECTS SECTION */}
      {hasSubProjects && project.subProjects && (
        <section className="mt-10 space-y-12">
          {/* Promise.all to handle async operations within map */}
          {await Promise.all(project.subProjects.map(async (subProject, index) => {
             const subVideoId = getYouTubeId(subProject.youtubeVideoUrl);

             // Fetch markdown content for the sub-project if detailPath exists
             let subProjectMarkdownContent = "";
             if (subProject.detailPath) {
               try {
                 const markdownFilePath = path.join(process.cwd(), subProject.detailPath);
                 subProjectMarkdownContent = await fs.readFile(markdownFilePath, "utf8");
               } catch (error) {
                 console.error(
                   `Error reading markdown file for sub-project ${subProject.title} at ${subProject.detailPath}:`,
                   error
                 );
                 subProjectMarkdownContent = "*Details could not be loaded.*"; // Fallback
               }
             }

             return (
                <div key={subProject.subId || index} className="border-t border-gray-800 pt-8">
                   <h3 className="text-xl sm:text-2xl font-semibold mb-3">{subProject.title}</h3>
                   {subProject.image && (
                     <div className="mb-4 relative w-full aspect-[16/9] overflow-hidden rounded-md shadow-md">
                       <Image
                         src={subProject.image}
                         alt={subProject.imageAlt || `Image for ${subProject.title}`}
                         fill
                         style={{ objectFit: "cover" }}
                         sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 66vw"
                       />
                     </div>
                   )}
                   {/* Render markdown content if available, otherwise the brief */}
                   {subProjectMarkdownContent ? (
                      <div className="markdown-content max-w-none mb-4 text-gray-200">
                         <ReactMarkdown remarkPlugins={[remarkGfm]}>
                           {subProjectMarkdownContent}
                         </ReactMarkdown>
                       </div>
                   ) : (
                     <p className="text-md text-gray-300 mb-4 italic">{subProject.brief}</p>
                   )}

                   {/* Sub-Project Gallery using lightboxSlides */} 
                   {subProject.lightboxSlides && subProject.lightboxSlides.length > 0 && (
                     <div className="mb-6">
                       <h4 className="text-xl font-semibold mb-3 text-gray-300">Gallery</h4>
                       <ProjectGallery
                         images={subProject.lightboxSlides.filter(slide => slide.type === 'image')}
                         projectTitle={subProject.title}
                       />
                     </div>
                   )}

                   {/* Sub-Project Videos */}
                   {subProject.extendedVideos && subProject.extendedVideos.length > 0 && (
                     <div className="mb-6">
                       <h4 className="text-xl font-semibold mb-3 text-gray-300">Videos</h4>
                       {subProject.extendedVideos.map((videoSrc, videoIndex) => (
                         <div
                           key={videoIndex}
                           className="mb-4 aspect-video bg-black rounded overflow-hidden shadow-md"
                         >
                           <video controls className="w-full h-full" preload="metadata">
                             <source src={videoSrc} type="video/mp4" />
                             Your browser does not support the video tag.
                           </video>
                         </div>
                       ))}
                     </div>
                   )}

                   {/* Sub-Project YouTube Video */}
                    {subVideoId && (
                      <div className="mb-6">
                         <h4 className="text-xl font-semibold mb-3 text-gray-300">Video</h4>
                         <div className="aspect-video w-full bg-black rounded overflow-hidden shadow-lg">
                           <iframe
                             className="w-full h-full"
                             src={`https://www.youtube.com/embed/${subVideoId}`}
                             title={`${subProject.title} Video`}
                             frameBorder="0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen
                           ></iframe>
                         </div>
                      </div>
                    )}
                </div>
             )
          }))}
        </section>
      )}

      {/* NO SUB PROJECTS (Only show if NO sub-projects) */}
      {!hasSubProjects && (
        <>
          {/* Extended images gallery */}
          {project.extendedImages && project.extendedImages.length > 0 && (
            <section className="mb-10" aria-labelledby="gallery-heading">
              <h2
                id="gallery-heading"
                className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2"
              >
                Gallery
              </h2>
              {/* Render the ProjectGallery client component, passing the images and title */}
              <ProjectGallery
                images={project.extendedImages
                  .filter((img): img is string => !!img) // Ensure img is treated as string after filter
                  .map((imgSrc) => ({ src: imgSrc }))} // Map string to { src: string } object
                projectTitle={project.title}
              />
            </section>
          )}

          {/* Extended videos */}
          {project.extendedVideos && project.extendedVideos.length > 0 && (
            <section className="mb-10" aria-labelledby="videos-heading">
              <h2
                id="videos-heading"
                className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2"
              >
                Videos
              </h2>
              {/* Map through the video source URLs */}
              {project.extendedVideos.map((videoSrc, index) => (
                // Container for each video player
                <div
                  key={index}
                  className="mb-4 aspect-video bg-black rounded overflow-hidden"
                >
                  <video controls className="w-full h-full" preload="metadata">
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </section>
          )}

           {/* Embedded YouTube video */}
          {(() => {
            if (!project.youtubeVideoUrl) return null;
            const videoId = getYouTubeId(project.youtubeVideoUrl);
            if (!videoId) {
              console.warn(
                `Invalid YouTube URL format for project ${projectId}: ${project.youtubeVideoUrl}`
              );
              return null;
            }
            return (
              <section className="mb-10" aria-labelledby="youtube-video-heading">
                <h2
                  id="youtube-video-heading"
                  className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2"
                >
                  Video
                </h2>
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
        </>
      )}


      {/* Tools used */}
      {project.toolIcons && project.toolIcons.length > 0 && (
        <section aria-labelledby="tools-heading" className="mt-10">
          <h2
            id="tools-heading"
            className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2"
          >
            Tools used
          </h2>
          {/* Flex container for tool icons */}
          <div className="flex flex-wrap gap-4">
            {project.toolIcons.map((tool, index) =>
              // Render ToolIcon using iconName prop. ToolIcon handles mapping and fallbacks.
              tool.label ? (
                <ToolIcon
                  key={`${tool.label}-${index}`}
                  iconName={tool.label}
                  alt={tool.label}
                  label={tool.label}
                  size={32}
                />
              ) : null
            )}
          </div>
        </section>
      )}

      {/* Back link */}
      {/* Container for the "Back to All Projects" link */}
      <div className="mt-12 pt-8 text-center border-t border-gray-800">
        {/* Link back to the main portfolio section on the homepage */}
        <Link
          href="/#portfolio"
          className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
        >
          &larr; Back to All Projects
        </Link>
      </div>
    </main>
  );
}
