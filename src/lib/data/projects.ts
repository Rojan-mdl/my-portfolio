// Next.js
import { unstable_cache } from "next/cache";

// Node.js
import path from "path";
import { promises as fs } from "fs";

// Import Zod
import { z } from "zod";

// Import Project type
import type { Project } from "@/types";

// Zod Schemas
// Define Zod schema for LightboxSlide types
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

// Define the main Zod schema for a Project
const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  brief: z.string(),
  detailPath: z.string(),
  image: z.string(),
  imageAlt: z.string().optional(),
  extendedImages: z.array(z.string()).optional(),
  extendedVideos: z.array(z.string()).optional(),
  toolIcons: z.array(z.object({ src: z.string(), label: z.string() })).optional(),
  lightboxSlides: z.array(LightboxSlideSchema).optional(),
  youtubeVideoUrl: z.string().optional(),
  subProjects: z.array(SubProjectSchema).optional(),
});

// Define the schema for the array of projects
const ProjectsSchema = z.array(ProjectSchema);

// Cached data fetching function
// Use Next.js unstable_cache for caching project data to reduce redundant reads/parses.
// This function fetches, parses, and validates project data from projects.json.
export const getCachedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    console.log("Fetching projects data (cache miss or revalidation)...");
    const jsonDirectory = path.join(process.cwd(), "data");
    const filePath = path.join(jsonDirectory, "projects.json");
    let fileContents;

    try {
      fileContents = await fs.readFile(filePath, "utf8");
    } catch (error) {
      if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error(`Error: Projects data file not found at ${filePath}`);
        throw new Error(`Projects data file not found at ${filePath}`); // Re-throw for caching layer
      }
      console.error("Error reading projects data file:", error);
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
      console.error("Error parsing projects.json:", error);
      throw new Error("Failed to parse project data: Invalid JSON format.");
    }

    // Validate the parsed data using the Zod schema
    const validationResult = ProjectsSchema.safeParse(jsonData);

    if (!validationResult.success) {
      console.error("Project data validation failed:", validationResult.error.errors);
      throw new Error(`Invalid project data format: ${validationResult.error.message}`);
    }

    // Return the validated data (explicitly typed as Project[])
    return validationResult.data as Project[]; // Cast needed as Zod infers structure
  },
  ['projects-data-v2'], // Cache key segments - CHANGED to invalidate cache
  {
    revalidate: 3600, // 1 hour
    // TODO: Consider adding tags for more granular cache invalidation if needed: tags: ['projects']
  }
); 