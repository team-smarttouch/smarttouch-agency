"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";

interface HeroProps {
  onOpenInquiry?: () => void;
}

export function FigmaHero({ onOpenInquiry }: HeroProps) {
  const { locale } = useLanguage();

  return (
    <div className="-mt-20 pt-[108px] bg-white">
      {/* 1. Super Headline on top of the banner with 100px font size and equal top/bottom spacing */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 text-center flex items-center justify-center">
        <h2
          className="font-bold text-[#0A1128] tracking-tight uppercase font-sans leading-none text-center select-none m-0"
          style={{ fontSize: "clamp(36px, 6.8vw, 100px)" }}
        >
          {locale === "ar" ? "نبني الأنظمة الرقمية" : "WE BUILD THE SYSTEMS"}
        </h2>
      </div>

      {/* 2. Full-bleed Hero Video Banner */}
      <section className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] xl:min-h-[720px] flex items-end pb-14 sm:pb-16 lg:pb-24 pt-16 sm:pt-20 overflow-hidden bg-[#000517] text-white">
        {/* Full-bleed Hero Video Banner (Futuristic Glowing Orb Background) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/hero-banner.mp4" type="video/mp4" />
          </video>
          {/* Soft edge darkening vignettes to ensure maximum legibility while keeping the center orb crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000517]/85 via-transparent to-[#000517]/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000517]/60 via-transparent to-[#000517]/60 pointer-events-none" />
        </div>

        {/* Hero Content Grid matching exact screenshot */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
            {/* Left: 4-line Headline */}
            <div className="lg:col-span-5 text-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-bold text-white leading-[1.18] tracking-tight font-sans">
                {locale === "ar" ? (
                  <>
                    وكالة إعلانات وتسويق
                    <br />
                    إلكتروني مبتكرة في
                    <br />
                    المملكة العربية السعودية
                  </>
                ) : (
                  <>
                    A Creative
                    <br />
                    Advertising And Online
                    <br />
                    Marketing Agency In
                    <br />
                    Saudi Arabia
                  </>
                )}
              </h1>
            </div>

            {/* Center Column: Kept open (2 cols on desktop) to showcase the glowing orb */}
            <div className="hidden lg:block lg:col-span-2" aria-hidden="true" />

            {/* Right: Subtitle & Dual Action Buttons */}
            <div className="lg:col-span-5 text-start flex flex-col justify-end space-y-6">
              <p className="text-sm sm:text-[15px] md:text-base text-white/90 leading-relaxed font-normal max-w-lg">
                {locale === "ar"
                  ? "سمارت تاتش هي وكالة رائدة في التسويق الرقمي بالرياض تعمل يداً بيد مع الأفراد والمؤسسات."
                  : "Smart Touch is a top digital marketing agency in Riyadh that works hand in hand with individuals and organizations."}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                {/* Button 1: Inquire Now (Blue filled, direct link to Contact Us) */}
                <Link
                  href={siteUrls.contact(locale)}
                  className="px-6 py-2.5 rounded-md bg-[#0088e8] hover:bg-[#0077cc] text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/25 active:scale-95 inline-block text-center cursor-pointer"
                >
                  {locale === "ar" ? "تواصل معنا الآن" : "Inquire Now"}
                </Link>

                {/* Button 2: Our Services (White filled with dark text) */}
                <Link
                  href={siteUrls.services(locale)}
                  className="px-6 py-2.5 rounded-md bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all shadow-md active:scale-95 inline-block text-center"
                >
                  {locale === "ar" ? "خدماتنا" : "Our Services"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
