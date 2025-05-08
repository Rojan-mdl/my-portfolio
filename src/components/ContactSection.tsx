"use client";

import React from "react";
import { SiLinkedin, SiGithub, SiInstagram } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";


// ContactSection component definition
export default function ContactSection() {
  const email = "marius.frilans@gmail.com";
  const linkedInUrl = "https://www.linkedin.com/in/marius-øvrebø";
  const gitHubUrl = "https://github.com/Rojan-mdl";
  const instagramUrl = "https://www.instagram.com/rojan3d/";

  // Define consistent Tailwind CSS classes for styling the contact links
  const linkClasses =
    "inline-flex items-center gap-2 text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-1 py-0.5 transition";

  // Define the size for the icons used in the links
  const iconSize = 20;
  const iconColor = "white";


  return (
    // Section container for Contact information
    <section
      className="py-16 my-26 text-gray-100"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 id="contact-heading" className="text-3xl font-bold mb-6">
          Get in touch
        </h2>
        <p className="mb-8 text-lg text-gray-300">
          Feel free to reach out! You can contact me via email or connect with
          me online.
        </p>

        {/* Container for contact links */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-8">
          {/* Email Link */}
          <a href={`mailto:${email}`} className={linkClasses}>
            <MdOutlineEmail
              size={24}
              color={iconColor}
              aria-hidden="true"
            />{" "}
            <span>{email}</span>
          </a>

          {/* LinkedIn Link */}
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            <SiLinkedin
              size={iconSize}
              color={iconColor}
              aria-hidden="true"
            />{" "}
            <span>
              LinkedIn
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
            <SiGithub
              size={iconSize}
              color={iconColor}
              aria-hidden="true"
            />{" "}
            <span>
              GitHub
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
            <SiInstagram
              size={iconSize}
              color={iconColor}
              aria-hidden="true"
            />{" "}
            <span>
              Instagram
              <span className="sr-only"> (opens in new tab)</span>
            </span>
          </a>
        </div>
      </div>{" "}
    </section>
  );
}
