"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { CheckCircle2, ArrowRight, ShieldCheck, Users, Code, Award } from "lucide-react";

export function AgencyCulture() {
  const { t, locale, isRtl } = useLanguage();

  const values = [
    {
      title: { en: "Dedicated Product Squads", ar: "فرق عمل برمجية متخصصة" },
      desc: {
        en: "Senior full-stack architects and growth marketers assigned directly to your mission.",
        ar: "مهندسون وخبراء تسويق متفرغون لمشروعك لضمان أعلى جودة وتنفيذ متقن.",
      },
      icon: Users,
    },
    {
      title: { en: "Enterprise Laravel & Next.js Stacks", ar: "بنية برمجية معتمدة عالمياً" },
      desc: {
        en: "No rigid templates. We build custom headless architectures designed for extreme concurrency.",
        ar: "لا نستخدم قوالب جاهزة؛ بل نبني أنظمة مخصصة تتحمل ملايين الزيارات بأمان وسرعة.",
      },
      icon: Code,
    },
    {
      title: { en: "Guaranteed SLA & 24/7 Security", ar: "اتفاقية مستوى خدمة وحماية 24/7" },
      desc: {
        en: "Continuous automated monitoring, regular backups, and zero-compromise security posture.",
        ar: "مراقبة مستمرة، نسخ احتياطي دوري، وحماية كاملة ضد كافة التهديدات الرقمية.",
      },
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 bg-[#080E29] border-y border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Team & Collaboration Graphic */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-[#0B132B] border border-blue-900/60 p-6 shadow-2xl overflow-hidden">
              {/* Decorative Team Workspace Visual */}
              <div className="h-72 sm:h-80 rounded-2xl bg-gradient-to-tr from-[#060B26] via-[#0E1E4A] to-blue-900/40 p-6 flex flex-col justify-between border border-blue-800/40 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-cyan-300">smarttouch-team-sync</span>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue-950 border border-blue-800 text-slate-300 font-mono">
                    Riyadh & Dubai Hubs
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#060B26]/90 border border-blue-900/60 backdrop-blur">
                    <div className="text-xs font-bold text-white mb-1">
                      {locale === "ar" ? "جلسة العصف الذهني واستراتيجية الإطلاق" : "Sprint Execution & High-Velocity Deployment"}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {locale === "ar"
                        ? "تحليل متطلبات واجهات المستخدم وهندسة قواعد البيانات لتحقيق أقصى سرعة."
                        : "Architecting zero-downtime microservices and high-converting customer journeys."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="mt-4 p-4 rounded-2xl bg-[#060B26] border border-blue-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">99.4% {locale === "ar" ? "رضا العملاء" : "Client CSAT"}</div>
                    <div className="text-xs text-slate-400">{locale === "ar" ? "بناءً على أكثر من 200 مشروع" : "Over 200+ enterprise launches"}</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold">
                  Top Rated
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <span>{t("culture.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t("culture.title")}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t("culture.desc")}
            </p>

            <div className="space-y-4 pt-2">
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#0B132B]/60 border border-blue-900/30 hover:border-cyan-400/40 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {locale === "ar" ? v.title.ar : v.title.en}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {locale === "ar" ? v.desc.ar : v.desc.en}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href={siteUrls.about(locale)}
                className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors"
              >
                <span>{locale === "ar" ? "اكتشف المزيد عن فلسفتنا وفريقنا" : "Discover More About SmartTouch Agency"}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
