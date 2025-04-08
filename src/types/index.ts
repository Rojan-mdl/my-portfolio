// Base properties common to different slide types
interface LightboxSlideBase {
  alt?: string;
  width?: number;
  height?: number;
}

// Specific type for Image slides
interface LightboxImageSlide extends LightboxSlideBase {
  type: 'image';
  src: string; // Required image source path
  // Add srcSet here if using responsive images in lightbox
  // srcSet?: { src: string; width: number; height: number }[];
}

// Specific type for self-hosted Video slides
interface LightboxVideoSlide extends LightboxSlideBase {
  type: 'video';
  sources: { src: string; type: string; }[]; // Required sources array
  poster?: string;
}

// Specific type for YouTube slides
interface LightboxYoutubeSlide extends LightboxSlideBase {
  type: 'youtube';
  youtubeId: string; // Required YouTube Video ID
}

// Union type representing any possible lightbox slide
export type LightboxSlide = LightboxImageSlide | LightboxVideoSlide | LightboxYoutubeSlide;

// Update the main Project interface
export interface Project {
  id: string;
  title: string;
  brief: string;
  detailPath: string; // Using the separate markdown file path
  image: string; // Main thumbnail image
  extendedImages?: string[]; // Keep if you display these outside the lightbox
  extendedVideos?: string[]; // Keep if you display these outside the lightbox
  toolIcons?: { src: string; label: string }[];

  // Array specifically for lightbox content
  lightboxSlides?: LightboxSlide[];

  // Array specifically for standalone YouTube videos
  youtubeVideos?: { youtubeId: string; alt?: string }[];
}
