import React from "react";

// Define the props interface for the SkillIcon component
interface SkillIconProps {
  // Icon component (e.g., SiFigma)
  icon: React.ElementType;
  // Text label for the skill
  label: string;
  // Size for the icon (optional, defaults to 32)
  size?: number;
  // Additional class names for the container div (optional)
  className?: string;
}

// Reusable component to display a skill icon and its label
const SkillIcon: React.FC<SkillIconProps> = ({
  icon: IconComponent, // Rename prop to avoid conflict with local variable
  label,
  size = 32, // Default size if not provided
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