"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Globe, Sparkles } from "lucide-react";

interface MiddleCtaProps {
  onOpenInquiry: () => void;
}

export function MiddleCta({ onOpenInquiry }: MiddleCtaProps) {
  const { t, locale, isRtl } = useLanguage();

  return (
    <section className="py-20 bg-[#060B26] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#0E1E4A] to-[#0B132B] border border-blue-800/60 p-8 sm:p-14 shadow-2xl overflow-hidden">
          {/* Background glowing sphere decoration matching Figma */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-[90px] pointer-events-none" />
          <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Text details */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-semibold text-cyan-400">
                <Sparkles className="w-3 h-3" />
                <span>{locale === "ar" ? "جاهزون للارتقاء بأعمالك" : "Transform Your Digital Trajectory"}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {t("cta.title")}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {t("cta.subtitle")}
              </p>
            </div>

            {/* Action button */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={onOpenInquiry}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>{t("cta.button")}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
