// Base properties common to different slide types
interface LightboxSlideBase {
  alt?: string;
  width?: number;
  height?: number;
}

// Specific type for Image slides
interface LightboxImageSlide extends LightboxSlideBase {
  type: "image";
  src: string; // Required image source path
  // Add srcSet here if using responsive images in lightbox
  // srcSet?: { src: string; width: number; height: number }[];
}

// Specific type for self-hosted Video slides
interface LightboxVideoSlide extends LightboxSlideBase {
  type: "video";
  sources: { src: string; type: string }[]; // Required sources array
  poster?: string;
}

// Union type representing any possible lightbox slide
export type LightboxSlide = LightboxImageSlide | LightboxVideoSlide;

// Interface for individual sub-projects nested within a main project
export interface SubProject {
  subId: string; // Unique identifier within the parent project (e.g., "1a", "1b")
  title: string;
  brief: string;
  detailPath?: string; // Added optional detail path for sub-project markdown
  image: string;
  imageAlt?: string;
  extendedImages?: string[];
  extendedVideos?: string[]; // Added optional extended videos array
  lightboxSlides?: LightboxSlide[];
  youtubeVideoUrl?: string;
}

// Update the main Project interface
export interface Project {
  id: string;
  title: string;
  brief: string;
  detailPath: string; // Using the separate markdown file path
  image: string; // Main thumbnail image
  imageAlt?: string; // Optional specific alt text for the main image
  extendedImages?: string[]; // Keep if you display these outside the lightbox
  extendedVideos?: string[]; // Keep if you display these outside the lightbox
  toolIcons?: { src: string; label: string }[];

  // Array specifically for lightbox content
  lightboxSlides?: LightboxSlide[];

  // Optional URL for a standalone YouTube video to embed
  youtubeVideoUrl?: string;

  // Optional array for sub-projects
  subProjects?: SubProject[];
}
