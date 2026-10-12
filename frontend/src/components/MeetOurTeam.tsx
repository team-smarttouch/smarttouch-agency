"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ProcessStep {
  step: number;
  label: { en: string; ar: string };
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
}

const processSteps: ProcessStep[] = [
  {
    step: 1,
    label: { en: "Lorem Ipsum", ar: "لوريم إيبسوم" },
    title: {
      en: "Sed ut perspiciatis unde omnis",
      ar: "الاستكشاف وتحليل المتطلبات الرقمية",
    },
    desc: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ar: "نقوم بدراسة متطلبات مشروعك بدقة وتحليل السوق والمنافسين لوضع خارطة طريق استراتيجية واضحة تحقق أهدافك بأعلى كفاءة.",
    },
  },
  {
    step: 2,
    label: { en: "Lorem Ipsum", ar: "لوريم إيبسوم" },
    title: {
      en: "Nemo enim ipsam voluptatem",
      ar: "الهندسة المعمارية والتصميم التفاعلي",
    },
    desc: {
      en: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      ar: "نصمم واجهات عصرية تفاعلية وأنظمة معمارية سحابية متقدمة تضمن أفضل تجربة مستخدم وسرعة فائقة في الأداء.",
    },
  },
  {
    step: 3,
    label: { en: "Lorem Ipsum", ar: "لوريم إيبسوم" },
    title: {
      en: "At vero eos et accusamus",
      ar: "التطوير البرمجي وضمان الجودة",
    },
    desc: {
      en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.",
      ar: "نكتب كوداً برمجياً نقياً بأحدث التقنيات مع اختبارات أداء وجودة صارمة لضمان موثوقية وأمان النظام بالكامل.",
    },
  },
  {
    step: 4,
    label: { en: "Lorem Ipsum", ar: "لوريم إيبسوم" },
    title: {
      en: "Temporibus autem quibusdam",
      ar: "الإطلاق السلس والنمو والتوسع",
    },
    desc: {
      en: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      ar: "نطلق المنصة بسلاسة مع مراقبة أداء لحظية ودعم فني متواصل وحملات تسويقية تضمن التوسع السريع والنمو.",
    },
  },
];

export function MeetOurTeam() {
  const { locale, isRtl } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = processSteps[activeStepIndex] || processSteps[0];
  const stepTitle = locale === "ar" ? currentStep.title.ar : currentStep.title.en;
  const stepDesc = locale === "ar" ? currentStep.desc.ar : currentStep.desc.en;

  return (
    <section className="py-20 sm:py-24 bg-[#F1F7FF] border-b border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching template 100% */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight text-center mb-8 sm:mb-10">
          {locale === "ar" ? "منهجية عملنا" : "Here’s Our Process"}
        </h2>

        {/* 4 Process Tabs matching template 100% */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          {processSteps.map((stepItem, idx) => {
            const isActive = activeStepIndex === idx;
            const labelText = locale === "ar" ? stepItem.label.ar : stepItem.label.en;

            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#1E40AF] text-white shadow-md shadow-blue-700/25 scale-[1.02]"
                    : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-sm hover:scale-[1.01]"
                }`}
              >
                {/* Step Number Badge */}
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center text-xs font-black shrink-0 ${
                    isActive ? "bg-white text-[#1E40AF]" : "bg-[#1E40AF] text-white"
                  }`}
                >
                  {stepItem.step}
                </span>

                {/* Step Label */}
                <span>{labelText}</span>
              </button>
            );
          })}
        </div>

        {/* Collaboration Team Photo with Overlaid Floating Dark Navy Card matching template 100% */}
        <div className="relative w-full max-w-5xl mx-auto pb-8 sm:pb-10">
          {/* Main Photo Banner with rounded corners */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100">
            <img
              src="/images/process-banner.png"
              alt={locale === "ar" ? "فريق عمل سمارت تاتش" : "Smart Touch Collaboration Process"}
              className="w-full h-auto object-cover object-center block"
              loading="lazy"
            />
          </div>

          {/* Floating Dark Card Overlapping Bottom-Left matching template 100% */}
          <div
            className={`absolute -bottom-2 sm:-bottom-4 left-4 sm:left-[8%] rtl:left-auto rtl:right-4 sm:rtl:right-[8%] w-[88%] sm:w-[50%] md:w-[38%] max-w-md p-5 sm:p-7 md:p-8 bg-[#0B1C33] text-white rounded-2xl shadow-2xl border border-slate-800/80 z-20 transition-all duration-500 ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 leading-snug">
              {stepTitle}
            </h3>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-relaxed">
              {stepDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
