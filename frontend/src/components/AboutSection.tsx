"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  const { locale, isRtl } = useLanguage();

  return (
    <section className="py-20 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Static Dashboard Showcase Image matching master homepage design */}
        <div className="relative max-w-4xl mx-auto mb-16 sm:mb-20 flex justify-center">
          <div className="relative w-full">
            {/* Subtle perspective glow under the showcase */}
            <div className="absolute inset-x-8 -bottom-6 h-20 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />
            
            <img
              src="/images/dashboard-showcase.png"
              alt={locale === "ar" ? "لوحة تحكم سمارت تاتش" : "Smart Touch Platform Showcase"}
              className="w-full h-auto object-contain mx-auto transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>
        </div>

        {/* 2. "About Smart Touch" 2-Column Story matching template */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {locale === "ar" ? "عن سمارت تاتش" : "About Smart Touch"}
            </h2>
          </div>

          <div className="md:col-span-7 space-y-6">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {locale === "ar"
                ? "سمارت تاتش هي وكالة دعاية وإعلان وحلول رقمية رائدة متخصصة في مساعدة الشركات الكبرى على بناء أنظمة رقمية فائقة الأداء، وتصدر نتائج محركات البحث، وإدارة حملات النمو الإعلاني في المملكة العربية السعودية والخليج العربي. نجمع بين الهندسة التقنية الدقيقة والإبداع التسويقي لضمان أعلى عائد استثماري."
                : "Smart Touch is a premier creative advertising and digital systems engineering agency. We specialize in empowering market leaders across Saudi Arabia and the GCC through high-performance web & mobile architectures, algorithmic SEO marketing, and high-converting performance media. We bridge rigorous software engineering with creative storytelling to maximize your commercial yield."}
            </p>

            <Link
              href={siteUrls.about(locale)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <span>{locale === "ar" ? "اقرأ المزيد" : "Read More"}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
