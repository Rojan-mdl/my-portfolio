"use client";

import Link from 'next/link';

const StickyScrollButton = () => {
  return (
    <Link
      href="/#portfolio"
      className="fixed bottom-10 right-10 z-50 text-[rgb(var(--color-primary-foreground))] hover:opacity-80 transition-opacity duration-200 flex items-center space-x-2"
      aria-label="Back to projects section"
    >
      <span>Back to projects</span>
    </Link>
  );
};

export default StickyScrollButton; 

// TODO: Make the button more appealing and modify it for mobile devices