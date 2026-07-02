"use client";

import { useEffect, useState } from "react";

export default function TopProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress on initial page load
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current > 90) {
        current = 90; // Wait for load to finish to hit 100%
      }
      setProgress(current);
    }, 100);

    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setVisible(false), 300); // fade out after completion
    };

    // If document is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes indeterminate {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        .animate-indeterminate {
          animation: indeterminate 1.5s infinite linear;
          width: 50%;
        }
      `}</style>
      <div className="fixed top-0 left-0 w-full h-1 z-[9999] pointer-events-none overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-transparent via-indigo-500 to-transparent dark:via-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-indeterminate"
        />
      </div>
    </>
  );
}
