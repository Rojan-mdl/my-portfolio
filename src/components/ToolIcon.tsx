import React from "react";
import Image from "next/image";


export type ToolIconProps = {
  src: string;
  alt: string;
  label: string;
  size: number;
};


export default function ToolIcon({ src, alt, label, size }: ToolIconProps) {
  return (
    <div className="relative group inline-block" title={label}>
      <Image src={src} alt={alt} width={size} height={size} className="rounded" loading="lazy"/>
      <span className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 bg-black text-white text-xs px-2 py-1 rounded mt-1 pointer-events-none transition whitespace-nowrap z-10">
        {label}
      </span>
    </div>
  );
}