"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const WatchSkeleton = () => (
  <div className="w-full h-[600px] flex items-center justify-center relative overflow-hidden rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
    {/* Abstract watch body skeleton */}
    <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-[40px] bg-slate-200 dark:bg-slate-800 shadow-sm overflow-hidden flex flex-col items-center justify-center">
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent skew-x-[-20deg]"
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
      {/* Inner screen area */}
      <div className="w-[85%] h-[85%] rounded-[28px] bg-slate-300 dark:bg-slate-900/80 border-[4px] border-slate-100 dark:border-slate-700/50" />
    </div>
    
    {/* Abstract watch straps skeleton */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[160px] md:-translate-y-[180px] w-32 h-24 bg-slate-200 dark:bg-slate-800 rounded-t-3xl -z-10 opacity-70" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[80px] md:translate-y-[100px] w-32 h-24 bg-slate-200 dark:bg-slate-800 rounded-b-3xl -z-10 opacity-70" />
  </div>
);

const Smartwatch3D = dynamic(() => import("./SmartwatchModel"), { 
  ssr: false,
  loading: () => <WatchSkeleton />
});

export default function Hero3D() {
  return <Smartwatch3D />;
}
