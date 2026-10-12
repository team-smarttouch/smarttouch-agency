"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { ChevronRight, Star, Quote, ArrowRight, ArrowLeft } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/testimonialsData";

export function TestimonialsView() {
  const { locale, isRtl } = useLanguage();

  return (
    <div className="bg-[#060D26] min-h-screen text-slate-100 pt-28 sm:pt-36 pb-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 sm:mb-12">
          <Link
            href={siteUrls.home(locale)}
            className="hover:text-cyan-400 transition-colors"
          >
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
          <span className="text-cyan-400 font-semibold">
            {locale === "ar" ? "آراء العملاء" : "Testimonials"}
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            {locale === "ar" ? "شهادات حقيقية" : "Client Endorsements"}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {locale === "ar" ? "ماذا يقول عملاؤنا عنا" : "What Our Customer Think"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {locale === "ar"
              ? "نفخر بثقة نخبة من كبرى الشركات والمؤسسات في المملكة العربية السعودية والخليج، وتلك آراء بعضهم وتجاربهم في التعاون مع سمارت تاتش."
              : "Discover how we help leading GCC enterprises and institutions grow with cutting-edge digital experiences, branding, and web solutions."}
          </p>
        </div>

        {/* Testimonials 8-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {TESTIMONIALS_DATA.map((t) => {
            const name = locale === "ar" ? t.name.ar : t.name.en;
            const role = locale === "ar" ? t.role.ar : t.role.en;
            const company = locale === "ar" ? t.company.ar : t.company.en;
            const quote = locale === "ar" ? t.quote.ar : t.quote.en;

            return (
              <div
                key={t.id}
                className="p-8 sm:p-10 rounded-3xl bg-[#09122F]/90 border border-blue-900/50 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 shadow-2xl relative group"
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                {/* Subtle top quotation glyph */}
                <Quote className="w-8 h-8 text-blue-500/20 absolute top-6 right-6 pointer-events-none group-hover:text-cyan-400/20 transition-colors" />

                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-light mb-8">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>

                {/* Author Block */}
                <div className="flex items-center gap-4 pt-6 border-t border-blue-900/40">
                  <div className="w-14 h-14 rounded-full bg-slate-800 shrink-0 overflow-hidden ring-2 ring-cyan-500/30">
                    <img
                      src={t.avatar}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                      {name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {role}{role && company ? `, ` : ""}{company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-[#0B1A48] to-indigo-950 border border-blue-800/50 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {locale === "ar"
                ? "جاهز لبدء قصة نجاح مشروعك القادم؟"
                : "Ready to Build Your Next Digital Success?"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {locale === "ar"
                ? "تواصل مع خبرائنا اليوم لمناقشة متطلبات موقعك، هويتك التجارية، أو حملاتك التسويقية."
                : "Partner with our creative and technical specialists to craft an outstanding online identity and drive real business impact."}
            </p>
            <div className="pt-4">
              <Link
                href={siteUrls.contact(locale)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>{locale === "ar" ? "ابدأ مشروعك الآن" : "Start Your Project"}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
