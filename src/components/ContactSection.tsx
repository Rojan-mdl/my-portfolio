"use client"; // Keep as client component if other client-side logic exists, otherwise could revert

import React from "react"; // Removed useState, useEffect
import Image from "next/image";
// Removed motion import

// Removed usePrefersReducedMotion hook definition

export default function ContactSection() {
  // Removed prefersReducedMotion hook usage
  const email = "marius.frilans@gmail.com";
  const linkedInUrl = "https://www.linkedin.com/in/marius-Øvrebø-604235187";
  const gitHubUrl = "https://github.com/Rojan-mdl";
  const instagramUrl = "https://www.instagram.com/rojan3d/";

  // Consistent link styling - applied to the <a> tag
  const linkClasses = "inline-flex items-center gap-2 text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-1 py-0.5 transition";

  // Icon size
  const iconSize = 20;

  // Styling for the icon frame
  const iconFrameClasses = "bg-white p-1 rounded-md inline-block leading-none";

  return (
    // Removed id="contact" as it's handled by the wrapper in page.tsx
    <section className="py-16 text-gray-100" aria-labelledby="contact-heading">
      {/* Removed Animation Wrapper */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 id="contact-heading" className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="mb-8 text-lg text-gray-300">
          Feel free to reach out! You can contact me via email or connect with me online.
        </p>

        {/* Contact Info and Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-8">

          {/* Email */}
          <a href={`mailto:${email}`} className={linkClasses}>
            <div className={iconFrameClasses}>
              <Image
                src="/icons/email.png"
                alt="" // Decorative icon
                width={iconSize}
                height={iconSize}
                // aria-hidden="true" is redundant when alt="" is present
                className="block"
              />
            </div>
            <span>{email}</span>
          </a>

          {/* LinkedIn */}
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
             <div className={iconFrameClasses}>
               <Image
                 src="/icons/linkedin.svg"
                 alt="" // Decorative icon
                 width={iconSize}
                 height={iconSize}
                 className="block"
               />
             </div>
            <span>LinkedIn<span className="sr-only"> (opens in new tab)</span></span>
          </a>

          {/* GitHub */}
          <a href={gitHubUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
             <div className={iconFrameClasses}>
               <Image
                 src="/icons/github.svg"
                 alt="" // Decorative icon
                 width={iconSize}
                 height={iconSize}
                 className="block"
               />
             </div>
             <span>GitHub<span className="sr-only"> (opens in new tab)</span></span>
          </a>

          {/* Instagram */}
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
             <div className={iconFrameClasses}>
               <Image
                 src="/icons/instagram.svg"
                 alt="" // Decorative icon
                 width={iconSize}
                 height={iconSize}
                 className="block"
               />
             </div>
            <span>Instagram<span className="sr-only"> (opens in new tab)</span></span>
          </a>

        </div>
      </div> {/* End max-w-4xl container */}
    </section>
  );
}
