## Purpose

The primary goal of this website is to serve as a professional online portfolio for Marius Øvrebø, presenting his skills, experience [cite: resume.pdf], and project work to potential employers, clients, and collaborators. It aims to highlight his unique blend of creative design (especially 3D) and technical development capabilities.

## Content & Structure

The website is structured as a multi-section single-page application experience initially, linking out to dynamically generated pages for individual portfolio projects. Key sections include:

- **Hero Section:** An engaging visual introduction, featuring a background video and animated text displaying Marius's name and core skill areas (CGI / Design / Code). 
- **About Section:** Presents a personal summary, detailing Marius's background. Includes an expandable section revealing more details and a list of key skills/tools represented by icons.
- **Experience & Education Section:** Uses a tabbed interface to separate professional experience (SATS, Unity Arena, PlayStation, etc.) and educational background (Kristiania, Noroff), including relevant details, dates, and tools used for each entry (displayed with interactive tooltips).
- **Portfolio Section:** Displays a grid of project cards. Each card links to a dedicated dynamic page for that project. The cards feature an image and an overlay (always visible on mobile, hover-triggered on desktop) showing the project title and brief.
- **Project Detail Pages:** Dynamically generated pages for each project, loading data from projects.json. These pages showcase the project title, main image, detailed description, image/video galleries, and tools used. They feature unique metadata (title, description) for SEO.
- **Services Section:** Likely outlines the services Marius offers (e.g., Web Development, 3D Visualization, Interactive Design) using interactive cards that expand to show more detail.
- **Contact Section:** Provides contact information (email) and links (with icons and frames) to professional profiles like LinkedIn, GitHub, and Instagram.

## Technology Stack

The website leverages a modern tech stack:

- **Framework:** Next.js 15 (App Router, Server Components, Turbopack for dev)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (including a custom dark theme with gradients)
- **Animation:** Framer Motion
- **3D:** React Three Fiber, Three.js, Drei (for showcasing 3D work)
- **Data:** Project data managed via a local projects.json file, fetched server-side for page generation.
- **Deployment:** Hosted on Vercel, utilizing Vercel Analytics.

## Design & UX

Features include:

- Dark theme with a gradient background.
- Responsive design adapting from mobile to desktop.
- Smooth scrolling.
- Animated transitions (page elements, underlines, tooltips).
- Accessible focus states (`focus-visible`).
- Navigation includes a centered logo on desktop and a hamburger menu on mobile.