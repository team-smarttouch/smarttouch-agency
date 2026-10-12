"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function StatsBanner() {
  const { locale } = useLanguage();

  const stats = [
    { value: "200+", label: locale === "ar" ? "مشروع تم إنجازه" : "Projects Completed" },
    { value: "300+", label: locale === "ar" ? "عميل يثق بنا" : "Happy Clients" },
    { value: "97%", label: locale === "ar" ? "نسبة رضا العملاء" : "Client Satisfaction" },
    { value: "10", label: locale === "ar" ? "سنوات من الخبرة" : "Years Experience" },
  ];

  return (
    <section className="py-12 bg-[#000B2B] text-white border-y border-blue-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-950/60 rtl:divide-x-reverse">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1 px-4">
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
