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

// Mobile placeholder — real product image, lightweight (no 3D canvas)
const MobileWatchPlaceholder = () => (
  <div className="w-full h-[360px] flex items-center justify-center">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/apw5.png"
      alt="PakWatch smartwatch"
      width={300}
      height={300}
      className="object-contain h-full drop-shadow-2xl"
      style={{ maxHeight: 320 }}
    />
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
