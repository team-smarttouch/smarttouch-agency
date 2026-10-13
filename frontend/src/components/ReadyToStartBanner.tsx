"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAgencySettings } from "@/context/AgencySettingsContext";

interface ReadyToStartBannerProps {
  className?: string;
  titleEn?: string;
  titleAr?: string;
  bgVariant?: "white" | "dark" | "transparent";
}

export function ReadyToStartBanner({
  className = "",
  titleEn,
  titleAr,
  bgVariant = "white",
}: ReadyToStartBannerProps) {
  const { locale, isRtl } = useLanguage();
  const { getWhatsAppUrl } = useAgencySettings();

  const greeting =
    locale === "ar"
      ? "مرحباً سمارت تاتش، أود الاستفسار عن بدء مشروع جديد معكم."
      : "Hello Smart Touch, I would like to inquire about starting a project with you.";
  const whatsappUrl = getWhatsAppUrl(greeting);

  const title =
    locale === "ar"
      ? titleAr || "هل أنت مستعد لبدء مشروعك القادم؟"
      : titleEn || "Ready To Start Your Project?";

  const bgClasses = {
    white: "py-12 sm:py-16 bg-white",
    dark: "py-12 sm:py-16 bg-[#04091E]",
    transparent: "py-12 sm:py-16 bg-transparent",
  }[bgVariant];

  return (
    <section className={`${bgClasses} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#020719] text-white shadow-2xl border border-blue-950/70 overflow-hidden min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] flex flex-col lg:flex-row items-center justify-between">
          {/* Subtle Ambient Radial Glows matching design */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#010515] via-[#040C2E] to-[#0A1A54] opacity-95 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.14] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/25 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/20 blur-[100px] pointer-events-none rounded-full" />

          {/* Left Content Column */}
          <div className="relative z-10 w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start space-y-6 text-start">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] max-w-md">
              {title}
            </h2>

            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-slate-900 font-bold text-sm sm:text-base shadow-xl hover:bg-slate-50 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>{locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
                {/* Official WhatsApp Green Icon positioned on the right */}
                <svg
                  className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                    fill="#25D366"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Graphic Column: Isometric Portfolio Cards Collage */}
          <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center lg:justify-end overflow-hidden self-stretch mt-4 lg:mt-0">
            <div className="relative w-full max-w-[480px] lg:max-w-none lg:w-[110%] h-[240px] sm:h-[300px] lg:h-[360px] flex items-center justify-center lg:justify-end pointer-events-none select-none">
              <img
                src="/images/banners/ready-to-start-collage.png"
                alt="SmartTouch Portfolio Showcase"
                className={`w-full h-full object-contain lg:object-right scale-105 sm:scale-110 lg:scale-125 lg:translate-x-6 drop-shadow-2xl transition-transform duration-700 ${
                  isRtl ? "lg:-translate-x-6 lg:scale-x-[-1]" : ""
                }`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
