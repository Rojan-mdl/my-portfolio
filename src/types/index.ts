// This file is for shared types across the application

// Project type definition
export interface Project {
    id: string;
    title: string;
    brief: string;
    detail: string;
    image: string;
    extendedImages?: string[];
    extendedVideos?: string[];
    toolIcons?: { src: string; label: string }[];
  }