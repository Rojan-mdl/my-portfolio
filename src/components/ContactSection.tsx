"use client"; // Directive for Next.js client components. Can potentially be removed if no client-side hooks/logic are needed.

import React from "react"; // Import React
// Removed Image import as it's replaced by react-icons
import { SiLinkedin, SiGithub, SiInstagram } from "react-icons/si"; // Import social icons
import { MdOutlineEmail } from "react-icons/md"; // Import email icon

// Note: Motion imports and usePrefersReducedMotion hook were removed as animations are handled by the parent or not present.

// ContactSection component definition
export default function ContactSection() {
  // Define contact information and social media URLs as constants
  // TODO: Consider moving these to environment variables or a configuration file for easier updates.
  const email = "marius.frilans@gmail.com";
  const linkedInUrl = "https://www.linkedin.com/in/marius-Øvrebø-604235187";
  const gitHubUrl = "https://github.com/Rojan-mdl";
  const instagramUrl = "https://www.instagram.com/rojan3d/";

  // Define consistent Tailwind CSS classes for styling the contact links
  const linkClasses =
    "inline-flex items-center gap-2 text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-1 py-0.5 transition";
  // TODO: Verify text color (`text-blue-400`) provides sufficient contrast against the background.

  // Define the size for the icons used in the links
  const iconSize = 20;
  const iconColor = "white";

  // Removed iconFrameClasses as it's not needed for react-icons

  return (
    // Section container for Contact information
    // id="contact" is handled by the parent AnimatedSection wrapper in page.tsx
    <section
      className="py-16 my-26 text-gray-100"
      aria-labelledby="contact-heading"
    >
      {/* Responsive container, centered text */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Section Heading */}
        <h2 id="contact-heading" className="text-3xl font-bold mb-6">
          Get in touch
        </h2>
        {/* Introductory paragraph */}
        <p className="mb-8 text-lg text-gray-300">
          Feel free to reach out! You can contact me via email or connect with
          me online.
          {/* TODO: Consider adding a contact form as an alternative method. */}
        </p>

        {/* Container for contact links */}
        {/* Flexbox layout, wraps on smaller screens, centered items, spacing */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-8">
          {/* Email Link */}
          {/* Uses mailto: protocol to open the user's default email client */}
          <a href={`mailto:${email}`} className={linkClasses}>
            {/* Email Icon */}
            <MdOutlineEmail
              size={24}
              color={iconColor}
              aria-hidden="true"
            />{" "}
            {/* Replaced Image with react-icon */}
            {/* Email Address Text */}
            <span>{email}</span>
          </a>

          {/* LinkedIn Link */}
          {/* target="_blank" opens the link in a new tab */}
          {/* rel="noopener noreferrer" is a security measure for target="_blank" links */}
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            {/* LinkedIn Icon */}
            <SiLinkedin
              size={iconSize}
              color={iconColor}
              aria-hidden="true"
            />{" "}
            {/* Replaced Image with react-icon */}
            {/* Link Text */}
            <span>
              LinkedIn
              {/* Screen reader only text indicating the link opens in a new tab */}
              <span className="sr-only"> (opens in new tab)</span>
            </span>
          </a>

          {/* GitHub Link */}
          <a
            href={gitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            {/* GitHub Icon */}
            <SiGithub
              size={iconSize}
              color={iconColor}
              aria-hidden="true"
            />{" "}
            {/* Replaced Image with react-icon */}
            {/* Link Text */}
            <span>
              GitHub
              {/* Screen reader only text */}
              <span className="sr-only"> (opens in new tab)</span>
            </span>
          </a>

          {/* Instagram Link */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            {/* Instagram Icon */}
            <SiInstagram
              size={iconSize}
              color={iconColor}
              aria-hidden="true"
            />{" "}
            {/* Replaced Image with react-icon */}
            {/* Link Text */}
            <span>
              Instagram
              {/* Screen reader only text */}
              <span className="sr-only"> (opens in new tab)</span>
            </span>
          </a>
          {/* TODO: Add other relevant social/contact links if desired. */}
        </div>
      </div>{" "}
      {/* End max-w-4xl container */}
    </section>
  );
}
