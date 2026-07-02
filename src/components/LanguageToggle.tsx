"use client";

import { useLanguage } from "../context/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "vi" ? "en" : "vi")}
      className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-sm"
      aria-label="Toggle Language"
    >
      {lang === "vi" ? "VN" : "EN"}
    </button>
  );
}
