"use client";

import Link from 'next/link';

const StickyScrollButton = () => {
  return (
    <Link
      href="/#portfolio"
      className="fixed bottom-10 right-10 z-50 bg-[#450086] px-4 py-2 text-xs sm:text-sm text-white font-semibold rounded transition hover:bg-[#360066] focus:outline-none focus-visible:shadow-[0_0_10px_2px_#ffffff] flex items-center space-x-2"
      aria-label="Back to projects section"
    >
      <span>Back to projects</span>
    </Link>
  );
};

export default StickyScrollButton; 

// TODO: Make the button more appealing and modify it for mobile devices