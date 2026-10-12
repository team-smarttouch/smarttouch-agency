"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { Smartphone, TrendingUp, Palette, ArrowRight } from "lucide-react";

export function AroundTheWorld() {
  const { locale, isRtl } = useLanguage();

  const bottomChips = [
    {
      icon: Smartphone,
      title: locale === "ar" ? "تطوير الويب والجوال" : "Web & Mobile",
      sub: locale === "ar" ? "أنظمة سحابية متقدمة" : "Enterprise Architectures",
    },
    {
      icon: TrendingUp,
      title: locale === "ar" ? "التسويق الرقمي وسيو" : "Digital Marketing",
      sub: locale === "ar" ? "حملات تصدر ونمو" : "Algorithmic Growth",
    },
    {
      icon: Palette,
      title: locale === "ar" ? "الهوية البصرية والتصميم" : "Brand Consulting",
      sub: locale === "ar" ? "تصاميم واجهات مبتكرة" : "Conversion UI/UX",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#000E38] via-[#021863] to-[#000824] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-blue-500/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Digital Earth Globe Graphic matching template 100% */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center">
              {/* Subtle ambient cyan glow behind globe */}
              <div className="absolute inset-10 rounded-full bg-cyan-500/25 blur-3xl pointer-events-none" />

              <img
                src="/images/globe-graphic.png"
                alt={locale === "ar" ? "الكرة الأرضية الرقمية - شبكة سمارت تاتش العالمية" : "Smart Touch Global Network"}
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Title, Narrative & Action matching template */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {locale === "ar" ? "حول العالم" : "Around The World"}
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {locale === "ar"
                ? "نعمل على نطاق إقليمي وعالمي من خلال مراكزنا الاستراتيجية في الرياض ودبي. نقدم خدمات متكاملة لكبرى الشركات العابرة للحدود والقطاعات الحكومية والخاصة مع الالتزام بأعلى معايير الأمان والسرعة العالمية."
                : "From our strategic innovation headquarters in Riyadh and Dubai, we engineer high-concurrency digital platforms and execute data-backed campaigns for enterprises across the Middle East, Europe, and beyond. We bring world-class technical standards tailored to regional market nuances."}
            </p>

            <div>
              <Link
                href={siteUrls.about(locale)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-white text-[#000E38] hover:bg-slate-100 font-bold text-xs shadow-lg transition-all hover:scale-105"
              >
                <span>{locale === "ar" ? "تعرف على المزيد" : "Learn More"}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 3 Glassmorphism Feature Chips matching template */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-blue-900/50">
          {bottomChips.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-blue-400/20 backdrop-blur-md flex items-center gap-4 hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{chip.title}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{chip.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
