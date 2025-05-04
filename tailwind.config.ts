import type { Config } from "tailwindcss"; // Import the Config type for Tailwind configuration
import typography from "@tailwindcss/typography"; // Import the official Tailwind CSS typography plugin

// Define the Tailwind CSS configuration object
const config: Config = {
  // Dark mode strategy: 'class' enables manual toggling via a class (e.g., <html class="dark">)
  // Other option is 'media' which follows the OS preference.
  darkMode: "class",

  // Configure the paths where Tailwind should look for class names to include in the final CSS build.
  // This ensures that only used classes are generated, optimizing the file size.
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Include all JS/TS/JSX/TSX/MDX files in the app directory
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Include all JS/TS/JSX/TSX/MDX files in the components directory
    // TODO: Add paths to any other directories containing Tailwind classes if necessary.
  ],

  // Customize or extend the default Tailwind theme.
  theme: {
    // The 'extend' key allows adding new values or extending existing ones without overwriting defaults.
    extend: {
      // Define custom color palettes or individual colors using CSS Variables
      // These variables should be defined in your global CSS file (e.g., src/app/globals.css)
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)", // For cards, panels, etc.
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)",
        },
        // Keep other specific colors if needed, or map them to semantic ones
        // 'dark-bg': '#0a0a0a', // Example: Keep or remove old ones
        // 'dark-surface': '#171717',
        // 'dark-text-primary': '#ededed',
        // 'dark-text-secondary': '#a1a1aa',
        // 'dark-accent': '#3b82f6',
      },
      // Example of extending other theme properties (currently commented out):
      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'], // Example: Add 'Inter' font
      // },
      // spacing: {
      //   '128': '32rem', // Example: Add custom spacing value
      // },
    },
  },

  // Register Tailwind CSS plugins.
  plugins: [
    // Enable the typography plugin for styling markdown/prose content.
    // Provides default styles for elements like headings, paragraphs, lists within elements having the 'prose' class.
    typography,
    // TODO: Add other Tailwind plugins if needed (e.g., @tailwindcss/forms, @tailwindcss/aspect-ratio).
  ],
};

// Export the configuration object
export default config;
