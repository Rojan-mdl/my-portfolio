import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-surface': '#171717',
        'dark-text-primary': '#ededed',
        'dark-text-secondary': '#a1a1aa',
        'dark-accent': '#3b82f6',
      }
    },
  },
  plugins: [
    typography,
  ],
}
export default config