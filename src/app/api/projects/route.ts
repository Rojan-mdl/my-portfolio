import { NextResponse } from "next/server"; // Import NextResponse for creating API responses in Next.js
import path from "path"; // Import Node.js 'path' module for working with file paths
import { promises as fs } from "fs"; // Import Node.js 'fs' module (file system) with promises API for async operations
import { z } from "zod"; // Import Zod
import { unstable_cache } from "next/cache"; // Import Next.js caching utility
import type { Project } from "@/types"; // Import Project TS type for casting

// --- Zod Schemas ---
// Define Zod schema for LightboxSlide types (mirroring types/index.ts)
const LightboxSlideBaseSchema = z.object({
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const LightboxImageSlideSchema = LightboxSlideBaseSchema.extend({
  type: z.literal("image"),
  src: z.string(),
});

const LightboxVideoSlideSchema = LightboxSlideBaseSchema.extend({
  type: z.literal("video"),
  sources: z.array(z.object({ src: z.string(), type: z.string() })),
  poster: z.string().optional(),
});

const LightboxSlideSchema = z.union([
  LightboxImageSlideSchema,
  LightboxVideoSlideSchema,
]);

// Define Zod schema for SubProject
const SubProjectSchema = z.object({
  subId: z.string(),
  title: z.string(),
  brief: z.string(),
  detailPath: z.string().optional(),
  image: z.string(),
  imageAlt: z.string().optional(),
  extendedImages: z.array(z.string()).optional(),
  extendedVideos: z.array(z.string()).optional(),
  lightboxSlides: z.array(LightboxSlideSchema).optional(),
  youtubeVideoUrl: z.string().optional(),
});

// Define the main Zod schema for a Project (mirroring types/index.ts)
const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  brief: z.string(),
  detailPath: z.string(),
  image: z.string(),
  imageAlt: z.string().optional(), // Added optional alt text
  extendedImages: z.array(z.string()).optional(),
  extendedVideos: z.array(z.string()).optional(),
  toolIcons: z.array(z.object({ src: z.string(), label: z.string() })).optional(),
  lightboxSlides: z.array(LightboxSlideSchema).optional(),
  youtubeVideoUrl: z.string().optional(),
  subProjects: z.array(SubProjectSchema).optional(), // Added optional subProjects
});

// Define the schema for the array of projects
const ProjectsSchema = z.array(ProjectSchema);

// --- Cached Data Fetching Function ---
// Use unstable_cache to cache the result of reading and parsing the JSON file.
// The cache key 'projects-data' ensures this specific data is cached.
// 'revalidate' option determines how often (in seconds) the cache should be refreshed.
// Adjust the revalidate time based on how often projects.json is expected to change.
const getCachedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    console.log("Fetching projects data (cache miss or revalidation)..."); // Log cache misses/revalidations
    const jsonDirectory = path.join(process.cwd(), "data");
    const filePath = path.join(jsonDirectory, "projects.json");
    let fileContents;

    try {
      fileContents = await fs.readFile(filePath, "utf8");
    } catch (error) {
      // Handle file read errors specifically
      if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error(`Error: Projects data file not found at ${filePath}`);
        throw new Error(`Projects data file not found at ${filePath}`); // Re-throw for caching layer
      }
      console.error("Error reading projects data file:", error);
      // TODO: Implement more robust error logging (e.g., sending errors to a monitoring service like Sentry).
      throw new Error("Failed to read project data file."); // Re-throw a generic error
    }

    if (!fileContents || fileContents.trim() === "") {
      console.error("Error: projects.json is empty or contains only whitespace.");
      throw new Error("Project data file is empty or invalid.");
    }

    let jsonData;
    try {
      jsonData = JSON.parse(fileContents);
    } catch (error) {
      // Handle JSON parsing errors
      console.error("Error parsing projects.json:", error);
      throw new Error("Failed to parse project data: Invalid JSON format.");
    }

    // Validate the parsed data using the Zod schema
    const validationResult = ProjectsSchema.safeParse(jsonData);

    if (!validationResult.success) {
      // Log detailed validation errors
      console.error("Project data validation failed:", validationResult.error.errors);
      // TODO: Consider logging the specific validation errors to a monitoring service.
      throw new Error(`Invalid project data format: ${validationResult.error.message}`);
    }

    // Return the validated data (explicitly typed as Project[])
    return validationResult.data as Project[]; // Cast needed as Zod infers structure
  },
  ['projects-data-v2'], // Cache key segments - CHANGED to invalidate cache
  {
    revalidate: 3600, // Cache for 1 hour (adjust as needed)
    // TODO: Consider adding tags for more granular cache invalidation if needed: tags: ['projects']
  }
);

// --- API Route Handler (GET) ---
export async function GET() {
  try {
    // Fetch data using the cached function
    const projects = await getCachedProjects();

    // Return the validated data, wrapped in an 'items' property
    return NextResponse.json({ items: projects });

  } catch (error: unknown) {
    // Handle errors thrown from getCachedProjects (file read, parse, validation)
    let errorMessage = "An unexpected error occurred while fetching projects data.";
    let statusCode = 500;

    if (error instanceof Error) {
        console.error(`API Error: ${error.message}`, { stack: error.stack });
        // Use the specific error message from the caught error
        errorMessage = error.message;
        // Optionally adjust status code based on error type
        if (error.message.includes("not found")) {
            statusCode = 404;
        } else if (error.message.includes("Invalid JSON") || error.message.includes("Invalid project data format")) {
            statusCode = 500; // Or potentially 400 Bad Request if validation fails due to client input (not applicable here)
        }
    } else {
        console.error("API Error: An unexpected non-error object was thrown:", error);
    }
    // TODO: Implement more robust error logging (e.g., sending errors to a monitoring service like Sentry).

    return NextResponse.json(
      { message: `Error fetching projects: ${errorMessage}` }, // Include error detail in response
      { status: statusCode }
    );
  }
}

// TODO: Consider adding handlers for other HTTP methods (POST, PUT, DELETE) if project data management via API is needed in the future.
