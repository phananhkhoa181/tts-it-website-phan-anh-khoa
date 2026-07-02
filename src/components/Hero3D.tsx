"use client";

import dynamic from "next/dynamic";

const Smartwatch3D = dynamic(() => import("./SmartwatchModel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-slate-100 rounded-3xl animate-pulse">
      <span className="text-slate-400 font-medium">Loading 3D Model...</span>
    </div>
  )
});

export default function Hero3D() {
  return <Smartwatch3D />;
}
