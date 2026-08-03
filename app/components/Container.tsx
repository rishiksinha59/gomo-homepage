import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container component implementing exact Figma CSS box-sizing:
 * - Outer boundary: 1440px max-width
 * - Desktop padding: 40px (px-10) on left & right
 * - Net inner content width: 1440px - 80px = EXACT 1360px!
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
