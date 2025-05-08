## Overview

This project is a modern, dynamic personal portfolio website designed to showcase skills, projects, experience, and artistic work. It serves as a central hub for presenting my professional profile online.

## Technologies used

- **Framework:** [Next.js](https://nextjs.org/) (React framework) utilizing the App Router.
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS styling, configured via `tailwind.config.ts` and `postcss.config.mjs`. Global styles are defined in `src/app/globals.css`.
- **Linting:** ESLint (`eslint.config.mjs`) is used to maintain code quality and consistency.
- **Package management:** npm (indicated by `package.json` and `package-lock.json`).
- **API:** Next.js API Routes (e.g., `src/app/api/projects/route.ts`) for serving data like project details.

## Project structure

The project follows a standard Next.js App Router structure:

- **`src/app/`**: Contains the core application routing, pages, and API endpoints.
  - `layout.tsx`: Defines the main site layout.
  - `page.tsx`: The main landing/home page.
  - `portfolio/[projectId]/page.tsx`: Dynamic route for displaying individual project details.
  - `api/projects/route.ts`: API endpoint to serve project data.
- **`src/components/`**: Houses reusable React components used across the site, such as:
  - `SiteHeader.tsx`
  - `HeroSection.tsx`
  - `AboutSection.tsx`
  - `PortfolioSection.tsx`
  - `ProjectGallery.tsx`
  - `ArtSection.tsx`
  - `ExperienceEducationSection.tsx`
  - `ServicesSection.tsx`
  - `ContactSection.tsx`
  - `ToolIcon.tsx`
  - `AnimatedSection.tsx` (Used for scroll-based animations)
- **`src/types/`**: Contains TypeScript type definitions (`index.ts`) for data structures used in the application.
- **`data/`**: Stores site content data.
  - `projects.json`: Contains structured data for each portfolio project (title, description, images, technologies used, etc.), served via the API route.
  - `markdown/`: Holds Markdown files for detailed project descriptions (e.g., `portfolio-website.md`, `oslo-throwdown.md`, `unity-arena.md`).
- **`public/`**: Stores static assets accessible directly via URL.
  - `art/`: Images showcasing artistic work.
  - `icons/`: SVG and image icons libraries didn't cover.
  - `image/`: General images, including project-specific visuals organized by project ID (e.g., `project01/`, `project02/`, `project03/`).
  - `video/`: Video assets (e.g., `Black-hole.mp4`).
  - `resume_en.pdf`: A downloadable English resume file.
  - `resume_no.pdf`: A downloadable Norwegian resume file.
- **Configuration files:** Root directory contains configuration for Next.js (`next.config.ts`), TypeScript (`tsconfig.json`), Tailwind CSS (`tailwind.config.ts`), PostCSS (`postcss.config.mjs`), ESLint (`eslint.config.mjs`), and Git (`.gitignore`).

## Key features & content

- **Homepage:** Includes a Hero section, introduction, and links/previews of other sections, often featuring animations (`AnimatedSection.tsx`).
- **About section:** Information about me.
- **Experience & Education section:** Details professional and academic background, next to relevant Experience.
- **Portfolio section:** Displays a collection of projects, fetching data via the Next.js API route. Clicking a project navigates to a dedicated project page (`/portfolio/[projectId]`).
- **Individual project pages:** Detailed view of specific projects, using data fetched via the API route (`projects.json`) and corresponding Markdown files. Includes image galleries (`ProjectGallery.tsx`).
- **Art section:** Showcases visual/artistic creations.
- **Services section:** Outlines offered services.
- **Contact section:** Provides ways to get in touch.
- **Skills/Tools showcase:** Uses icons (`ToolIcon.tsx`) to visually represent proficiency in various technologies and tools listed in `public/icons/`.
- **Responsive design:** Due to the use of Tailwind CSS.

## Deployment/Repo

- Deployed on [Vercel](https://vercel.com/)
- GitHub [repo](https://github.com/Rojan-mdl/my-portfolio)
