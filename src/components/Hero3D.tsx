"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Lazy-load 3D only on desktop
const Smartwatch3D = dynamic(() => import("./SmartwatchModel"), {
  ssr: false,
  loading: () => <WatchSkeleton />,
});

const WatchSkeleton = () => (
  <div className="w-full h-[350px] sm:h-[450px] lg:h-[600px] flex items-center justify-center relative overflow-hidden rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
    <div className="relative w-44 h-56 sm:w-48 sm:h-64 md:w-56 md:h-72 rounded-[40px] bg-slate-200 dark:bg-slate-800 shadow-sm overflow-hidden flex flex-col items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent skew-x-[-20deg]"
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      <div className="w-[85%] h-[85%] rounded-[28px] bg-slate-300 dark:bg-slate-900/80 border-[4px] border-slate-100 dark:border-slate-700/50" />
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140px] sm:-translate-y-[160px] w-28 sm:w-32 h-20 sm:h-24 bg-slate-200 dark:bg-slate-800 rounded-t-3xl -z-10 opacity-70" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[70px] sm:translate-y-[80px] w-28 sm:w-32 h-20 sm:h-24 bg-slate-200 dark:bg-slate-800 rounded-b-3xl -z-10 opacity-70" />
  </div>
);

// Mobile static placeholder — beautiful, lightweight SVG watch illustration
const MobileWatchPlaceholder = () => (
  <div className="w-full h-[340px] flex items-center justify-center">
    <div className="relative" style={{ width: 200, height: 260 }}>
      {/* Watch body */}
      <div className="absolute inset-x-8 inset-y-12 rounded-[32px] bg-gradient-to-br from-slate-200 via-white to-slate-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-700 shadow-2xl border border-slate-300/60 dark:border-slate-500/40" />
      {/* Watch screen */}
      <div className="absolute inset-x-12 inset-y-16 rounded-[24px] bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden flex flex-col items-center justify-center gap-1 shadow-inner">
        {/* Time display */}
        <span className="text-white text-xl font-bold tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>10:09</span>
        <span className="text-slate-400 text-[9px] uppercase tracking-widest">PakWatch</span>
        {/* Activity rings (mini) */}
        <div className="flex gap-1.5 mt-1">
          <div className="w-4 h-4 rounded-full border-2 border-rose-500 border-t-transparent" style={{ transform: 'rotate(45deg)' }} />
          <div className="w-4 h-4 rounded-full border-2 border-green-400 border-t-transparent" style={{ transform: 'rotate(90deg)' }} />
          <div className="w-4 h-4 rounded-full border-2 border-sky-400 border-t-transparent" style={{ transform: 'rotate(135deg)' }} />
        </div>
      </div>
      {/* Top strap */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-14 rounded-t-2xl bg-gradient-to-b from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-500 shadow-md" />
      {/* Bottom strap */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-14 rounded-b-2xl bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-500 dark:to-slate-600 shadow-md" />
      {/* Crown button */}
      <div className="absolute right-6 top-1/2 -translate-y-2 w-2 h-8 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-500 dark:to-slate-600 shadow" />
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-[40px] bg-indigo-400/10 dark:bg-indigo-400/5 blur-xl" />
    </div>
  </div>
);

export default function Hero3D() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // During SSR / hydration, render nothing to avoid layout shift
  if (isMobile === null) return <WatchSkeleton />;

  // Mobile: static lightweight placeholder (saves 6.3MB + 40s TBT)
  if (isMobile) return <MobileWatchPlaceholder />;

  // Desktop: full 3D experience
  return <Smartwatch3D />;
}
