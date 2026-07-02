"use client";

import { useEffect, useState } from "react";

export default function MouseEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      // Add window.scrollY so it matches the absolute coordinates of the Hero section
      setMousePosition({ x: ev.clientX, y: ev.clientY + window.scrollY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 dark:hidden"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.25), transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 hidden dark:block mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
        }}
      />
    </>
  );
}
