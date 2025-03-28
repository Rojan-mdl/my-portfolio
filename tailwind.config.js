/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' if you prefer OS-based theme
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add other paths if needed
  ],
  theme: {
    extend: {
      colors: {
        // Define your dark theme colors here
        // Example:
        'dark-bg': '#0a0a0a',        // Main background
        'dark-surface': '#171717',  // Card/surface backgrounds
        'dark-text-primary': '#ededed', // Primary text
        'dark-text-secondary': '#a1a1aa', // Secondary text
        'dark-accent': '#3b82f6', // Accent color (e.g., blue)
      }
      // You might extend other theme properties like typography or spacing
    },
  },
  plugins: [],
}