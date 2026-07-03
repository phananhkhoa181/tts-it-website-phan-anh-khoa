"use client";

import React, { useEffect, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const [renderMessage, setRenderMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      setRenderMessage(toastMessage);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      // Wait for exit animation before clearing the message from DOM
      const timer = setTimeout(() => {
        setRenderMessage(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!renderMessage) return null;

  return (
    <div 
      className={`fixed top-24 sm:bottom-6 sm:top-auto left-1/2 -translate-x-1/2 z-[150] transition-all duration-300 ease-out flex items-center gap-3 px-5 py-3 rounded-full shadow-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-800 dark:border-slate-200
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'sm:translate-y-8 -translate-y-8 opacity-0 scale-95'}
      `}
    >
      <CheckCircle2 className="w-5 h-5 text-green-400 dark:text-green-500" />
      <span className="font-medium text-sm whitespace-nowrap">{renderMessage}</span>
    </div>
  );
}
