import { promises as fs } from 'fs'; // Import Node.js file system module with promises API
import path from 'path'; // Import Node.js path module for handling file paths
import { Metadata } from 'next'; // Import Metadata type for page metadata generation
import Link from 'next/link'; // Import Next.js Link component for navigation
import Image from 'next/image'; // Import Next.js Image component for optimized images
import { notFound } from 'next/navigation'; // Import Next.js function to trigger a 404 page
import type { Project } from '@/types'; // Import the Project type definition
import ToolIcon from '@/components/ToolIcon'; // Import the reusable ToolIcon component
import ReactMarkdown from 'react-markdown'; // Import component to render Markdown content
import remarkGfm from 'remark-gfm'; // Import remark plugin for GitHub Flavored Markdown support (tables, strikethrough, etc.)
import ProjectGallery from '@/components/ProjectGallery'; // Import the gallery component
// Removed IconType and react-icons imports as mapping is now in ToolIcon

// Removed iconMap as mapping is now in ToolIcon

// Helper function to extract YouTube Video ID from various URL formats
// Returns the 11-character video ID or null if not found/invalid.
const getYouTubeId = (url: string): string | null => {
  // Return null immediately if the URL is falsy
  if (!url) return null;
  // Regular expression to match common YouTube URL patterns
  // Covers youtu.be, /v/, /u/\w/, /embed/, watch?v=, watch?&v= formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  // Check if a match was found and the captured group (video ID) is 11 characters long
  return (match && match[2].length === 11) ? match[2] : null;
  // TODO: Consider adding support for YouTube Shorts URLs if needed.
};

// Define the expected props structure for the page component
// Next.js passes route parameters (like projectId) within the 'params' object.
// Note: The type `Promise<{ projectId: string; }>` might be overly specific;
// often ` { params: { projectId: string } }` is sufficient unless dealing with complex async param resolution.
interface Props {
  params: Promise<{ projectId: string; }>; // Expects params as a Promise resolving to an object with projectId
}

// Server-side helper function to fetch data for a single project by its ID
// This function reads from the local projects.json file.
async function getProjectData(projectId: string): Promise<Project | null> {
  try {
    // Construct the absolute path to the projects data file
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    // Read the JSON file content
    const jsonData = await fs.readFile(filePath, 'utf8');
    // Parse the JSON data into an array of Project objects
    const projects: Project[] = JSON.parse(jsonData);
    // Find the project that matches the provided projectId
    const project = projects.find(p => p.id === projectId);
    // Return the found project or null if not found
    return project || null;
    // TODO: Implement caching for this data fetching if the JSON file is large or read frequently.
  } catch (error) {
    // Log errors during file reading or parsing
    console.error("Error reading projects data:", error);
    // Return null to indicate failure
    return null;
    // TODO: Implement more specific error handling (e.g., distinguish file not found vs. parse error).
  }
}

// Function to generate page metadata (title, description, open graph tags) dynamically
// This runs on the server during the request or at build time.
export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  // Resolve the promise to get the projectId
  const { projectId } = await paramsPromise;
  // Fetch the specific project data using the helper function
  const project = await getProjectData(projectId);

  // If the project is not found, return metadata for a "Not Found" page
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
      // TODO: Consider adding a specific Open Graph image for "Not Found" pages.
    }
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
        // TODO: Add other relevant OG tags like 'type', 'url', 'site_name'.
    },
    // TODO: Add other metadata fields like 'keywords' if desired.
  }
}

// Function to generate static paths at build time
// This tells Next.js which project IDs exist so it can pre-render these pages for performance.
export async function generateStaticParams() {
  try {
    // Construct the path to the projects data file
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    // Read the file content
    const jsonData = await fs.readFile(filePath, 'utf8');
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
export default async function ProjectPage({ params: paramsPromise }: Props) {
  // Resolve the promise to get the projectId from the route parameters
  const { projectId } = await paramsPromise;
  // Fetch the data for the specific project
  const project = await getProjectData(projectId);

  // If the project data could not be fetched (e.g., invalid ID), trigger a 404 Not Found page
  if (!project) {
    notFound();
  }

  // Read the detailed Markdown content for the project
  let markdownContent = ''; // Initialize with empty string as default/fallback
  // Check if the project data includes a path to a markdown file
  if (project.detailPath) {
      try {
          // Construct the absolute path to the markdown file
          const markdownFilePath = path.join(process.cwd(), project.detailPath);
          // Read the markdown file content
          markdownContent = await fs.readFile(markdownFilePath, 'utf8');
      } catch (error) {
          // Log an error if the markdown file cannot be read
          console.error(`Error reading markdown file at ${project.detailPath}:`, error);
          // Set fallback content to display to the user
          markdownContent = 'Error loading project details.';
          // TODO: Provide a more user-friendly error message or UI state.
      }
  } else {
      // Warn if the detailPath field is missing in the project data
      console.warn(`Project with id ${projectId} is missing the detailPath field.`);
      // Set fallback content
      markdownContent = 'Project details are not available.';
  }

  // Render the project page content
  return (
    // Main container with padding top/bottom, max width, centered, horizontal padding, text color
    <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-100">
      {/* Project Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>

      {/* Main Project Image (if available) */}
      {project.image ? (
        <div className="mb-6 relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
          <Image
            src={project.image}
            // Alt text: Describes the image in the context of the project
            // TODO: Allow providing specific alt text per image in projects.json if the main image needs a more detailed description than just "Main image for [Project Title]".
            alt={`Main image for ${project.title}`}
            fill // Fill the container
            style={{ objectFit: 'cover' }} // Cover the container area
            priority // Prioritize loading this image as it's likely LCP (Largest Contentful Paint)
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 66vw" // Responsive sizes hint
          />
        </div>
      ) : null /* Render nothing if no main image */}

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
        {/* TODO: Customize ReactMarkdown rendering further if specific HTML elements need different components or styling (e.g., custom link or image components). */}
      </div>

      {/* Extended Images Gallery Section (if images exist) */}
      {project.extendedImages && project.extendedImages.length > 0 && (
        <section className="mb-10" aria-labelledby="gallery-heading">
          {/* Gallery Section Heading */}
          <h2 id="gallery-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Gallery</h2>
          {/* Render the ProjectGallery client component, passing the images and title */}
          {/* Filter out any potentially invalid image sources before passing */}
          <ProjectGallery images={project.extendedImages.filter(img => img)} projectTitle={project.title} />
        </section>
      )}

       {/* Extended Videos Section (if videos exist) */}
       {project.extendedVideos && project.extendedVideos.length > 0 && (
        <section className="mb-10" aria-labelledby="videos-heading">
          {/* Videos Section Heading */}
          <h2 id="videos-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Videos</h2>
           {/* Map through the video source URLs */}
           {project.extendedVideos.map((videoSrc, index) => (
              // Container for each video player
              <div key={index} className="mb-4 aspect-video bg-black rounded overflow-hidden">
                 {/* HTML5 video element */}
                 <video controls className="w-full h-full" preload="metadata">
                    {/* Provide the video source */}
                    <source src={videoSrc} type="video/mp4" />
                    {/* TODO: Provide sources for other video formats (e.g., WebM, Ogg) for better browser compatibility. */}
                    {/* TODO: Add <track> elements for captions (WCAG 1.2.2) and potentially audio descriptions (WCAG 1.2.5) for accessibility. */}
                    {/* Fallback text if the browser doesn't support the video tag */}
                    Your browser does not support the video tag.
                 </video>
              </div>
           ))}
         </section>
       )}

      {/* Embedded YouTube Video Section (if URL is valid) */}
      {/* Immediately-invoked function expression (IIFE) to conditionally render the section */}
      {(() => {
        // Check if the YouTube video URL exists in the project data
        if (!project.youtubeVideoUrl) return null; // Render nothing if no URL

        // Attempt to extract the YouTube video ID using the helper function
        const videoId = getYouTubeId(project.youtubeVideoUrl);
        // Render nothing if a valid ID couldn't be extracted
        if (!videoId) {
            console.warn(`Invalid YouTube URL format for project ${projectId}: ${project.youtubeVideoUrl}`); // Log a warning
            return null;
        }

        // If a valid ID is found, render the YouTube embed section
        return (
          <section className="mb-10" aria-labelledby="youtube-video-heading">
            {/* YouTube Video Section Heading */}
            <h2 id="youtube-video-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Video</h2>
            {/* Responsive container for the iframe (maintains 16:9 aspect ratio) */}
            <div className="aspect-video w-full bg-black rounded overflow-hidden shadow-lg">
              {/* YouTube iframe embed */}
              <iframe
                className="w-full h-full" // Make iframe fill the container
                src={`https://www.youtube.com/embed/${videoId}`} // YouTube embed URL
                title={`${project.title} Video`} // Accessible title for the iframe
                frameBorder="0" // Remove default border
                // Permissions policy for embedded features
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen // Allow fullscreen mode
              ></iframe>
            </div>
          </section>
        );
      })()}


       {/* Tools Used Section (if tools exist) */}
       {project.toolIcons && project.toolIcons.length > 0 && (
         <section aria-labelledby="tools-heading">
          {/* Tools Section Heading */}
          <h2 id="tools-heading" className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Tools Used</h2>
          {/* Flex container for tool icons */}
          <div className="flex flex-wrap gap-4">
           {/* Map through the tool icons data */}
           {project.toolIcons.map((tool, index) => (
              // Render ToolIcon using iconName prop. ToolIcon handles mapping and fallbacks.
              (tool.label) ? ( // Only need label now
                <ToolIcon
                  key={`${tool.label}-${index}`} // Use label in key
                  iconName={tool.label} // Pass the label string
                  alt={tool.label} // Alt text remains the label
                  label={tool.label}
                  size={32}
                />
              ) : null // Render nothing if label is missing
            ))}
          </div>
        </section>
      )}

      {/* Back Link */}
       {/* Container for the "Back to All Projects" link */}
       <div className="mt-12 pt-8 text-center">
          {/* Link back to the main portfolio section on the homepage */}
          <Link href="/#portfolio" className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1">
             &larr; Back to All Projects {/* Left arrow entity */}
          </Link>
       </div>
    </main>
  );
}
