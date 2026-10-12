"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Check } from "lucide-react";

interface PricingPackagesProps {
  onOpenInquiry: () => void;
}

export function PricingPackages({ onOpenInquiry }: PricingPackagesProps) {
  const { locale } = useLanguage();

  const tiers = [
    {
      name: locale === "ar" ? "المبتدئة" : "Starter",
      desc: locale === "ar" ? "مثالية للشركات الناشئة التي تسعى لبناء حضور رقمي قوي" : "Ideal for emerging brands scaling digital visibility",
      price: "$1000",
      period: locale === "ar" ? "/ شهرياً" : "/ mo",
      features: [
        locale === "ar" ? "تطوير موقع Next.js فائق السرعة" : "High-Performance Next.js Web App",
        locale === "ar" ? "تهيئة سيو ومؤشرات ويب حيوية" : "Core SEO & Schema Structured Data",
        locale === "ar" ? "دعم ثنائي للغتين العربية والإنجليزية" : "Bilingual English & Arabic LTR/RTL",
        locale === "ar" ? "لوحة تحكم إدارة الاستفسارات" : "Lead Inquiries Pipeline Access",
        locale === "ar" ? "دعم فني وضمان لمدة 30 يوماً" : "30-Day Launch Warranty",
      ],
    },
    {
      name: locale === "ar" ? "النمو" : "Growth",
      desc: locale === "ar" ? "للشركات الطموحة الساعية لمضاعفة المبيعات والعملاء" : "For scaling businesses needing rapid expansion & leads",
      price: "$2000",
      period: locale === "ar" ? "/ شهرياً" : "/ mo",
      features: [
        locale === "ar" ? "تطبيقات ويب متقدمة مع Laravel 12 API" : "Custom Laravel 12 API + Next.js App",
        locale === "ar" ? "سيو تقني متقدم وتصدر الكلمات الأولى" : "Full-Scale Technical & Content SEO",
        locale === "ar" ? "حركات انسيابية وتأثيرات بصرية 60fps" : "60fps Fluid Motion & Custom Modals",
        locale === "ar" ? "إدارة الحملات الإعلانية ومسارات التحويل" : "Performance Ads & Conversion Funnel",
        locale === "ar" ? "دعم فني مخصص على مدار الساعة 24/7" : "Continuous 24/7 SLA & DevOps Support",
      ],
    },
    {
      name: locale === "ar" ? "المؤسسات" : "Enterprise",
      desc: locale === "ar" ? "منظومة برمجية وإعلانية متكاملة لكبرى الشركات" : "Comprehensive enterprise software and omni-channel campaigns",
      price: "$5000",
      period: locale === "ar" ? "/ شهرياً" : "/ mo",
      features: [
        locale === "ar" ? "تطبيقات ويب وجوال متكاملة متعددة المنصات" : "Multi-Platform Web & Native Mobile Apps",
        locale === "ar" ? "بنية سحابية موزعة عالية الاستقرار" : "High-Availability Kubernetes Cluster",
        locale === "ar" ? "فريق هندسي وتسويقي متفرغ بالكامل" : "Dedicated Full-Stack Engineering Squad",
        locale === "ar" ? "نماذج ذكاء اصطناعي وأتمتة مخصصة" : "Custom AI & Machine Learning Workflows",
        locale === "ar" ? "اتفاقيات مستوى خدمة واستشارات تنفيذية" : "Executive Level Strategy & Direct SLAs",
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#000E38] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading matching template */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {locale === "ar" ? "اختر الباقة المناسبة لك" : "Choose The Right Plan For You"}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {locale === "ar"
              ? "حلول استثمارية مرنة وواضحة تضمن لك أعلى جودة تقنية وإعلانية."
              : "Transparent investment models engineered to drive sustainable enterprise growth."}
          </p>
        </div>

        {/* 3 Pricing Cards matching template */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gradient-to-b from-[#021863]/90 via-[#000E38]/90 to-[#002447] border border-blue-600/30 p-8 flex flex-col justify-between shadow-2xl hover:border-cyan-400/60 transition-all hover:scale-[1.02]"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.name}</h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">{t.desc}</p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-blue-900/60">
                  <span className="text-4xl font-black text-white">{t.price}</span>
                  <span className="text-xs text-cyan-300 font-semibold">{t.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {t.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenInquiry}
                className="w-full py-3 rounded-lg border-2 border-white/80 hover:border-white text-white font-bold text-xs hover:bg-white hover:text-[#000E38] transition-all"
              >
                {locale === "ar" ? "اختيار الباقة" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
