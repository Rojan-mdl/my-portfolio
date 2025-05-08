import React from "react";
import type { IconType } from "react-icons";

// Define the props interface for the SkillIcon component
interface SkillIconProps {
  // Icon component (e.g., SiFigma)
  icon: IconType;
  // Text label for the skill
  label: string;
  // Size for the icon (defaults to 32)
  size?: number;
  // Additional class names for the container div
  className?: string;
}

// Reusable component to display a skill icon and its label
const SkillIcon: React.FC<SkillIconProps> = ({
  icon: IconComponent,
  label,
  size = 32, // Default size
  className = "", // Default to empty string
}) => {
  return (
    // Outer container div, allowing for additional classes
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Render the icon component passed as a prop */}
      <IconComponent size={size} aria-label={label} />
      {/* Text label, hidden on small screens, shown on medium and up */}
      <span className="text-sm sm:text-base hidden md:inline">{label}</span>
    </div>
  );
};

export default SkillIcon; 