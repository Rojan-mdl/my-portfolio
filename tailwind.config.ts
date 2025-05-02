import type { Config } from 'tailwindcss'; // Import the Config type for Tailwind configuration
import typography from '@tailwindcss/typography'; // Import the official Tailwind CSS typography plugin

// Define the Tailwind CSS configuration object
const config: Config = {
  // Dark mode strategy: 'class' enables manual toggling via a class (e.g., <html class="dark">)
  // Other option is 'media' which follows the OS preference.
  darkMode: 'class',

  // Configure the paths where Tailwind should look for class names to include in the final CSS build.
  // This ensures that only used classes are generated, optimizing the file size.
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Include all JS/TS/JSX/TSX/MDX files in the app directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Include all JS/TS/JSX/TSX/MDX files in the components directory
    // TODO: Add paths to any other directories containing Tailwind classes if necessary.
  ],

  // Customize or extend the default Tailwind theme.
  theme: {
    // The 'extend' key allows adding new values or extending existing ones without overwriting defaults.
    extend: {
      // Define custom color palettes or individual colors.
      colors: {
        // Example custom dark theme colors (prefix 'dark-' is just a naming convention here)
        'dark-bg': '#0a0a0a', // Very dark background
        'dark-surface': '#171717', // Slightly lighter surface color
        'dark-text-primary': '#ededed', // Primary text color for dark backgrounds
        'dark-text-secondary': '#a1a1aa', // Secondary/muted text color
        'dark-accent': '#3b82f6', // Accent color (e.g., for links, buttons) - this is Tailwind's blue-500
        // TODO: Add more custom colors or adjust existing ones as needed for the design.
        // TODO: Consider organizing colors more semantically (e.g., primary, secondary, accent) rather than just 'dark-'.
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
