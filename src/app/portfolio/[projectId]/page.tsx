import { promises as fs } from "fs"; // Import Node.js file system module with promises API
import path from "path"; // Import Node.js path module for handling file paths
import { Metadata } from "next"; // Import Metadata type for page metadata generation
import Link from "next/link"; // Import Next.js Link component for navigation
import Image from "next/image"; // Import Next.js Image component for optimized images
import { notFound } from "next/navigation"; // Import Next.js function to trigger a 404 page
import type { Project } from "@/types"; // Import only Project type definition
import ToolIcon from "@/components/ToolIcon"; // Import the reusable ToolIcon component
import ReactMarkdown from "react-markdown"; // Import component to render Markdown content
import remarkGfm from "remark-gfm"; // Import remark plugin for GitHub Flavored Markdown support (tables, strikethrough, etc.)
import ProjectGallery from "@/components/ProjectGallery"; // Import the gallery component
// Removed IconType and react-icons imports as mapping is now in ToolIcon

// Removed iconMap as mapping is now in ToolIcon

// Helper function to extract YouTube Video ID from various URL formats
// Returns the 11-character video ID or null if not found/invalid.
const getYouTubeId = (url: string | undefined | null): string | null => { // Allow undefined/null
  // Return null immediately if the URL is falsy
  if (!url) return null;
  // Regular expression to match common YouTube URL patterns
  // Covers youtu.be, /v/, /u/\w/, /embed/, /shorts/, watch?v=, watch?&v= formats
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  // Check if a match was found and the captured group (video ID) is 11 characters long
  return match && match[2].length === 11 ? match[2] : null;
};

// Define the expected props structure for the page component
// Next.js passes route parameters (like projectId) within the 'params' object.
// Note: The type `Promise<{ projectId: string; }>` might be overly specific;
// often ` { params: { projectId: string } }` is sufficient unless dealing with complex async param resolution.
interface Props {
  params: Promise<{ projectId: string }>; // Revert Props definition to expect a Promise
}

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
  } catch (error) { // Catch potentially non-Error types
    // Log errors during file reading or parsing
    console.error("Error reading projects data:", error);
    // Log specific error details if available
    if (error instanceof Error) {
      // Check for specific properties if it's an Error object
      const nodeError = error as NodeJS.ErrnoException; // Type assertion for properties like code
      if (nodeError.code === 'ENOENT') {
        console.error(`Error: Projects data file not found at ${path.join(process.cwd(), "data", "projects.json")}`);
      } else if (error instanceof SyntaxError) {
        // SyntaxError is a standard Error subtype
        console.error("Error: Failed to parse projects.json. Check for JSON syntax errors.");
      } else {
        // Log generic error message
        console.error("An unexpected error occurred while getting project data:", error.message);
      }
    } else {
      // Handle cases where the thrown object might not be an Error
      console.error("An unexpected non-error object was thrown:", error);
    }
    return null; // Return null to indicate failure
  }
}

// Function to generate page metadata (title, description, open graph tags) dynamically
// This runs on the server during the request or at build time.
export async function generateMetadata({
  params: paramsPromise, // Rename to indicate it's a promise
}: Props): Promise<Metadata> {
  // Resolve the promise to get the projectId
  const { projectId } = await paramsPromise; // Await the promise before accessing projectId
  // Fetch the specific project data using the helper function
  const project = await getProjectData(projectId);

  // If the project is not found, return metadata for a "Not Found" page
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  // If the project is found, return metadata based on its data
  return {
    title: project.title, // Set page title
    description: project.brief, // Set page description using the brief summary
    // Configure Open Graph metadata for social sharing previews
    openGraph: {
      title: project.title, // OG title
      description: project.brief, // OG description
      // Use the main project image for the OG image, if available
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
    // Log errors during the process
    console.error("Error reading projects data for static params:", error);
    // Return an empty array to prevent build failure, though this might hide issues.
    // Consider throwing the error if pre-rendering these pages is critical.
    return [];
  }
}

// The main Page Component for individual project pages
// This is an async server component.
export default async function ProjectPage({ params: paramsPromise }: Props) { // Rename to indicate it's a promise
  // Resolve the promise to get the projectId from the route parameters
  const { projectId } = await paramsPromise; // Await the promise before accessing projectId
  // Fetch the data for the specific project
  const project = await getProjectData(projectId);

  // If the project data could not be fetched (e.g., invalid ID), trigger a 404 Not Found page
  if (!project) {
    notFound();
  }

  // Read the detailed Markdown content for the project
  let markdownContent = ""; // Initialize with empty string as default/fallback
  // Check if the project data includes a path to a markdown file
  if (project.detailPath) {
    try {
      // Construct the absolute path to the markdown file
      const markdownFilePath = path.join(process.cwd(), project.detailPath);
      // Read the markdown file content
      markdownContent = await fs.readFile(markdownFilePath, "utf8");
    } catch (error) {
      // Log an error if the markdown file cannot be read
      console.error(
        `Error reading markdown file at ${project.detailPath}:`,
        error
      );
      // Set fallback content to display to the user
      markdownContent = "*Oops! We couldn't load the project details at this time. Please try again later.*";
    }
  } else {
    // Warn if the detailPath field is missing in the project data
    console.warn(
      `Project with id ${projectId} is missing the detailPath field.`
    );
    // Set fallback content
    markdownContent = "Project details are not available.";
  }

  // Check if there are sub-projects
  const hasSubProjects = project.subProjects && project.subProjects.length > 0;

  // Render the project page content
  return (
    // Main container with padding top/bottom, max width, centered, horizontal padding, text color
    <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-100">
      {/* Project Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>

      {/* Main Project Image (if available and no sub-projects, or as an intro) */}
      {
        project.image && (
          <div className="mb-6 relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={project.image}
              alt={project.imageAlt || `Main image for ${project.title}`}
              fill // Fill the container
              style={{ objectFit: "cover" }} // Cover the container area
              priority // Prioritize loading this image as it's likely LCP (Largest Contentful Paint)
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 66vw" // Responsive sizes hint
            />
          </div>
        )
      }

      {/* Brief Project Description */}
      <p className="text-lg text-gray-300 mb-6 italic">{project.brief}</p>

      {/* Detailed Project Information (Rendered from Markdown) */}
      {/* Apply custom styling via 'markdown-content' class (defined in globals.css or similar) */}
      {/* Ensure max-width is reset (`max-w-none`) if needed within the constrained parent */}
      <div className="markdown-content max-w-none mb-8 text-gray-200">
        {/* Use ReactMarkdown component to parse and render the markdown string */}
        {/* Enable remarkGfm plugin for GitHub Flavored Markdown features */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
        {/* Note: ReactMarkdown can be customized further using the 'components' prop if specific HTML elements need different rendering (e.g., custom link or image components). */}
      </div>


      {/* === SUB-PROJECTS SECTION === */}
      {hasSubProjects && project.subProjects && (
        <section className="mt-10 space-y-12">
           <h2
            className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2"
          >
            Project Breakdown
          </h2>
          {/* Use Promise.all to handle async operations within map */}
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
                 subProjectMarkdownContent = "*Details could not be loaded.*"; // Fallback content
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
                         // Filter for image types and map to the expected format if needed
                         // Assuming ProjectGallery can handle { src: string, alt?: string }
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
                             {/* Consider adding other source types like webm if available */}
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

      {/* === LEGACY SECTIONS (Only show if NO sub-projects) === */}
      {!hasSubProjects && (
        <>
          {/* Extended Images Gallery Section (if images exist) */}
          {project.extendedImages && project.extendedImages.length > 0 && (
            <section className="mb-10" aria-labelledby="gallery-heading">
              {/* Gallery Section Heading */}
              <h2
                id="gallery-heading"
                className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2"
              >
                Gallery
              </h2>
              {/* Render the ProjectGallery client component, passing the images and title */}
              {/* Filter out any potentially invalid image sources before passing */}
              <ProjectGallery
                images={project.extendedImages
                  .filter((img): img is string => !!img) // Ensure img is treated as string after filter
                  .map((imgSrc) => ({ src: imgSrc }))} // Map string to { src: string } object
                projectTitle={project.title}
              />
            </section>
          )}

          {/* Extended Videos Section (if videos exist) */}
          {project.extendedVideos && project.extendedVideos.length > 0 && (
            <section className="mb-10" aria-labelledby="videos-heading">
              {/* Videos Section Heading */}
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
                  {/* HTML5 video element */}
                  <video controls className="w-full h-full" preload="metadata">
                    {/* Provide the video source */}
                    <source src={videoSrc} type="video/mp4" />
                    {/* TODO: Provide sources for other video formats (e.g., WebM, Ogg) for better browser compatibility. */}
                    {/* Example: Add other video formats for broader compatibility (requires data update) */}
                    {/* <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" /> */}

                    {/* TODO: Add <track> elements for captions/subtitles (WCAG 1.2.2). Requires .vtt file paths in project data. */}
                    {/* Example: <track label="English" kind="subtitles" srcLang="en" src="/path/to/captions.vtt" default /> */}

                    {/* TODO: Consider adding audio descriptions track if necessary (WCAG 1.2.5). */}
                    {/* Fallback text if the browser doesn't support the video tag */}
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </section>
          )}

           {/* Embedded YouTube Video Section (if URL is valid) */}
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


      {/* Tools Used Section (Applies to the whole project) */}
      {project.toolIcons && project.toolIcons.length > 0 && (
        <section aria-labelledby="tools-heading" className="mt-10">
          {/* Tools Section Heading */}
          <h2
            id="tools-heading"
            className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2"
          >
            Tools Used
          </h2>
          {/* Flex container for tool icons */}
          <div className="flex flex-wrap gap-4">
            {/* Map through the tool icons data */}
            {project.toolIcons.map((tool, index) =>
              // Render ToolIcon using iconName prop. ToolIcon handles mapping and fallbacks.
              tool.label ? ( // Only need label now
                <ToolIcon
                  key={`${tool.label}-${index}`} // Use label in key
                  iconName={tool.label} // Pass the label string
                  alt={tool.label} // Alt text remains the label
                  label={tool.label}
                  size={32}
                />
              ) : null // Render nothing if label is missing
            )}
          </div>
        </section>
      )}

      {/* Back Link */}
      {/* Container for the "Back to All Projects" link */}
      <div className="mt-12 pt-8 text-center border-t border-gray-800">
        {/* Link back to the main portfolio section on the homepage */}
        <Link
          href="/#portfolio"
          className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
        >
          &larr; Back to All Projects {/* Left arrow entity */}
        </Link>
      </div>
    </main>
  );
}
