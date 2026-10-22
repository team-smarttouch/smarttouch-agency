"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAgencySettings, DEFAULT_HOMEPAGE_PROCESS } from "@/context/AgencySettingsContext";

export function MeetOurTeam() {
  const { locale, isRtl } = useLanguage();
  const { homepageProcess } = useAgencySettings();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const processData = homepageProcess || DEFAULT_HOMEPAGE_PROCESS;
  const steps = processData.steps && processData.steps.length > 0 ? processData.steps : DEFAULT_HOMEPAGE_PROCESS.steps;
  const currentStep = steps[activeStepIndex] || steps[0];

  const headingText = locale === "ar" ? processData.heading.ar : processData.heading.en;
  const overviewText = locale === "ar" ? processData.overview.ar : processData.overview.en;
  const stepTitle = locale === "ar" ? currentStep.title.ar : currentStep.title.en;
  const stepDesc = locale === "ar" ? currentStep.desc.ar : currentStep.desc.en;

  return (
    <section className="py-20 sm:py-24 bg-[#F1F7FF] border-b border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching template */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight text-center mb-4 sm:mb-6">
          {headingText}
        </h2>

        {/* Narrative / Overview paragraph from Google Doc */}
        {overviewText && (
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              {overviewText}
            </p>
          </div>
        )}

        {/* 4 Process Tabs matching template 100% */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          {steps.map((stepItem, idx) => {
            const isActive = activeStepIndex === idx;
            const labelText = locale === "ar" ? stepItem.label.ar : stepItem.label.en;

            return (
              <button
                type="button"
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
            className={`absolute -bottom-2 sm:-bottom-4 left-4 sm:left-[8%] rtl:left-auto rtl:right-4 sm:rtl:right-[8%] w-[88%] sm:w-[50%] md:w-[42%] max-w-lg p-5 sm:p-7 md:p-8 bg-[#0B1C33] text-white rounded-2xl shadow-2xl border border-slate-800/80 z-20 transition-all duration-500 ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-blue-600/80 text-white text-[10px] font-bold uppercase tracking-wider">
                {locale === "ar" ? `الخطوة ${currentStep.step}` : `Step ${currentStep.step}`}
              </span>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
                {stepTitle}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-relaxed">
              {stepDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
