/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Keep class-based dark mode
  content: [
    // --- UPDATED PATHS ---
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Scan app directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Scan components directory
    // Add other top-level directories if needed (e.g., './src/sections/**/*.{js,ts,jsx,tsx,mdx}')
    // Remove './pages/**/*.{js,ts,jsx,tsx}' if you are only using the App Router
  ],
  theme: {
    extend: {
      colors: {
        // Your custom dark theme colors [cite: tailwind.config.js]
        'dark-bg': '#0a0a0a',
        'dark-surface': '#171717',
        'dark-text-primary': '#ededed',
        'dark-text-secondary': '#a1a1aa',
        'dark-accent': '#3b82f6',
      }
      // Extend other properties if needed
    },
  },
  plugins: [],
}