import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Define the Tailwind CSS configuration object
const config: Config = {
  // Dark mode strategy: 'class' enables manual toggling via a class (e.g., <html class="dark">)
  // Other option is 'media' which follows the OS preference.
  darkMode: "class",

  // Configure the paths where Tailwind should look for class names to include in the final CSS build.
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Customize or extend the default Tailwind theme.
  theme: {
    // The 'extend' key allows adding new values or extending existing ones without overwriting defaults.
    extend: {
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
      },
    },
  },

  // Tailwind CSS plugins
  plugins: [
    // Enable the typography plugin for styling markdown/prose content.
    // Provides default styles for elements like headings, paragraphs, lists within elements having the 'prose' class.
    typography,
  ],
};

export default config;
