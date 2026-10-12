"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/testimonialsData";

export function TestimonialsSection() {
  const { locale, isRtl } = useLanguage();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // 8 authentic testimonials partitioned into 2 pages of 4 cards each
  const totalPages = 2;

  // Auto-slide every 8 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="py-24 sm:py-32 bg-[#060D26] text-white relative overflow-hidden select-none border-t border-blue-950/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Planetary orbital glowing background rings matching design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-blue-500/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1150px] h-[1150px] rounded-full border border-blue-400/5 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Heading matching screenshot */}
        <div className="text-center mb-14 sm:mb-18">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {locale === "ar" ? "ماذا يقول عملاؤنا" : "What Our Customer Think"}
          </h2>
        </div>

        {/* 8-Review Slider: 4 cards visible per slide */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${isRtl ? currentPage * 100 : -currentPage * 100}%)`,
            }}
          >
            {/* Slide 1: Reviews 1 - 4 */}
            <div className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
              {TESTIMONIALS_DATA.slice(0, 4).map((r) => {
                const name = locale === "ar" ? r.name.ar : r.name.en;
                const role = locale === "ar" ? r.role.ar : r.role.en;
                const company = locale === "ar" ? r.company.ar : r.company.en;
                const quote = locale === "ar" ? r.quote.ar : r.quote.en;

                return (
                  <div
                    key={r.id}
                    className="p-6 sm:p-7 rounded-2xl bg-[#09122F]/90 border border-blue-900/50 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-xl group min-h-[300px]"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  >
                    <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light mb-6 flex-grow">
                      &ldquo;{quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3.5 pt-5 border-t border-blue-900/40">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-blue-500/30">
                        <img
                          src={r.avatar}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-white tracking-wide uppercase truncate">
                          {name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">
                          {role}{role && company ? `, ` : ""}{company}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide 2: Reviews 5 - 8 */}
            <div className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
              {TESTIMONIALS_DATA.slice(4, 8).map((r) => {
                const name = locale === "ar" ? r.name.ar : r.name.en;
                const role = locale === "ar" ? r.role.ar : r.role.en;
                const company = locale === "ar" ? r.company.ar : r.company.en;
                const quote = locale === "ar" ? r.quote.ar : r.quote.en;

                return (
                  <div
                    key={r.id}
                    className="p-6 sm:p-7 rounded-2xl bg-[#09122F]/90 border border-blue-900/50 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-xl group min-h-[300px]"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  >
                    <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light mb-6 flex-grow">
                      &ldquo;{quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3.5 pt-5 border-t border-blue-900/40">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-blue-500/30">
                        <img
                          src={r.avatar}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-white tracking-wide uppercase truncate">
                          {name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">
                          {role}{role && company ? `, ` : ""}{company}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cyan Slider Progress Indicator with Interactive Controls matching design */}
        <div className="mt-12 sm:mt-14 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => (prev === 0 ? 1 : 0))}
            className="p-2 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          </button>

          {/* Interactive Progress Bar */}
          <div
            onClick={() => setCurrentPage((prev) => (prev === 0 ? 1 : 0))}
            className="w-48 sm:w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden relative cursor-pointer group"
            title="Click to toggle slide"
          >
            <div
              className={`h-full w-1/2 bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)] rounded-full transition-all duration-500 ease-out ${
                currentPage === 0 ? "translate-x-0" : "translate-x-full"
              }`}
            />
          </div>

          <button
            onClick={() => setCurrentPage((prev) => (prev === 0 ? 1 : 0))}
            className="p-2 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
