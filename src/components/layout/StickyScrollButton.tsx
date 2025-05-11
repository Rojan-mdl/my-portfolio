"use client";

import Link from 'next/link';

const StickyScrollButton = () => {
  return (
    <Link
      href="/#portfolio"
      className="fixed bottom-10 right-10 z-50 bg-[rgb(var(--color-accent))] px-4 py-2 text-xs sm:text-sm text-[rgb(var(--color-foreground))] font-semibold rounded transition hover:bg-[rgb(var(--color-accent))] focus:outline-none focus-visible:shadow-[0_0_10px_2px_rgb(var(--color-foreground))] flex items-center space-x-2"
      aria-label="Back to projects section"
    >
      <span>Back to projects</span>
    </Link>
  );
};

export default StickyScrollButton; 

// TODO: Make the button more appealing and modify it for mobile devices