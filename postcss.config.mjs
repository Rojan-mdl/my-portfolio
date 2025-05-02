// Configuration object for PostCSS
const postcssConfig = {
  // Define the PostCSS plugins to use
  plugins: {
    // Tailwind CSS plugin: Processes Tailwind directives and utility classes
    // The empty object {} indicates default configuration for the Tailwind plugin.
    // See Tailwind documentation for potential configuration options here.
    "@tailwindcss/postcss": {},

    // Autoprefixer plugin: Adds vendor prefixes (e.g., -webkit-, -moz-) to CSS rules
    // based on browser compatibility data (usually defined in package.json or .browserslistrc).
    // The empty object {} indicates default configuration for Autoprefixer.
    autoprefixer: {},

    // TODO: Add other PostCSS plugins if needed (e.g., cssnano for minification, postcss-import).
  },
};

// Export the configuration object using ES Module syntax (.mjs extension)
export default postcssConfig;
