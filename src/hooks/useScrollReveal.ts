"use client";

import { useEffect } from "react";

/**
 * Lightweight IntersectionObserver-based scroll reveal.
 * Replaces framer-motion's whileInView for simple fade/slide animations.
 * Saves ~32KB of framer-motion bundle from being evaluated on load.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-fade, .reveal-scale"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: "-60px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
