"use client";

import { Brain, Activity, Moon, Droplets, Heart, Zap, Phone, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import Hero3D from "../components/Hero3D";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageToggle } from "../components/LanguageToggle";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

export default function LandingPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000); // Reset after 5s
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="shrink-0">
            <span className="text-2xl font-bold tracking-tighter text-indigo-950 dark:text-white">
              PakWatch
            </span>
          </div>
          <nav className="flex items-center gap-3 sm:gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm hover:shadow-md">
              {t.nav.preorder}
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                  {t.hero.title1} <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
                    {t.hero.title2}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
                  {t.hero.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    {t.hero.buyNow}
                  </button>
                  <button className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-sm hover:shadow-md">
                    {t.hero.discover}
                  </button>
                </div>
              </div>

              {/* Hero Image / 3D Canvas */}
              <div className="relative mx-auto w-full max-w-md lg:max-w-full lg:ml-auto">
                <Hero3D />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Design & Display */}
        <section className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                {t.design.title1} <br />
                <span className="text-indigo-600 dark:text-indigo-400">{t.design.title2}</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                {t.design.desc}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Health & Wellness (Bento Grid) */}
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                {t.health.title1} <br />{t.health.title2}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                {t.health.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="col-span-1 md:col-span-2 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                <Heart className="w-12 h-12 text-rose-500 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.health.ecgTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  {t.health.ecgDesc}
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="col-span-1 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                <Droplets className="w-12 h-12 text-cyan-500 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.health.spo2Title}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {t.health.spo2Desc}
                </p>
              </div>

              {/* Card 3 */}
              <div className="col-span-1 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                <Moon className="w-12 h-12 text-indigo-500 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.health.sleepTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {t.health.sleepDesc}
                </p>
              </div>

              {/* Card 4 */}
              <div className="col-span-1 md:col-span-2 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                <Brain className="w-12 h-12 text-purple-500 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.health.mentalTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  {t.health.mentalDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Fitness & Connectivity */}
        <section className="py-24 bg-slate-900 dark:bg-black text-white transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Activity className="w-16 h-16 text-green-400 mb-6" />
                <h2 className="text-4xl font-bold mb-4">{t.fitness.title}</h2>
                <p className="text-slate-400 text-lg mb-8">
                  {t.fitness.desc}
                </p>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div> {t.fitness.water}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div> {t.fitness.gps}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div> {t.fitness.api}
                  </li>
                </ul>
              </div>

              <div>
                <Phone className="w-16 h-16 text-blue-400 mb-6" />
                <h2 className="text-4xl font-bold mb-4">{t.connectivity.title}</h2>
                <p className="text-slate-400 text-lg mb-8">
                  {t.connectivity.desc}
                </p>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div> {t.connectivity.lte}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div> {t.connectivity.pay}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div> {t.connectivity.siri}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Technical Specifications */}
        <section className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900 dark:text-white">
                {t.specs.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">{t.specs.desc}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                <li className="flex flex-col sm:flex-row sm:items-center py-6 px-8 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  <span className="text-slate-500 dark:text-slate-400 font-medium sm:w-1/3 mb-1 sm:mb-0">{t.specs.screen}</span>
                  <span className="font-semibold text-slate-900 dark:text-white sm:w-2/3">{t.specs.screenDesc}</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center py-6 px-8 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  <span className="text-slate-500 dark:text-slate-400 font-medium sm:w-1/3 mb-1 sm:mb-0">{t.specs.battery}</span>
                  <span className="font-semibold text-slate-900 dark:text-white sm:w-2/3">{t.specs.batteryDesc}</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center py-6 px-8 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  <span className="text-slate-500 dark:text-slate-400 font-medium sm:w-1/3 mb-1 sm:mb-0">{t.specs.material}</span>
                  <span className="font-semibold text-slate-900 dark:text-white sm:w-2/3">{t.specs.materialDesc}</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center py-6 px-8 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  <span className="text-slate-500 dark:text-slate-400 font-medium sm:w-1/3 mb-1 sm:mb-0">{t.specs.processor}</span>
                  <span className="font-semibold text-slate-900 dark:text-white sm:w-2/3">{t.specs.processorDesc}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Newsletter Signup */}
        <section className="py-24 bg-indigo-600 dark:bg-indigo-950 text-white relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Mail className="w-12 h-12 mx-auto mb-6 text-indigo-200" />
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">{t.newsletter.title}</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
              {t.newsletter.desc}
            </p>
            
            {subscribed ? (
              <div className="bg-green-500/20 border border-green-400 text-green-100 rounded-2xl p-4 inline-flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-medium">{t.newsletter.success}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  required
                  className="flex-1 rounded-full px-6 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <button 
                  type="submit"
                  className="rounded-full bg-white text-indigo-600 dark:bg-indigo-500 dark:text-white px-8 py-3.5 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-400 transition-colors flex items-center justify-center gap-2"
                >
                  {t.newsletter.button} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-tighter text-indigo-950 dark:text-white">
            PakWatch
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center sm:text-left">
            {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
