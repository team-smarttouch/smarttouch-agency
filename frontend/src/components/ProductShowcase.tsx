"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TrendingUp, Users, Activity, BarChart2, ArrowUpRight, CheckCircle2, Globe, Shield, Sparkles } from "lucide-react";

export function ProductShowcase() {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"analytics" | "performance" | "seo">("analytics");

  return (
    <section className="py-20 bg-[#060B26] relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === "ar" ? "منظومة تقنية وإعلانية متكاملة" : "Proprietary Architecture & Growth Engine"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {locale === "ar"
              ? "شاهد كيف تبدو أنظمتنا الرقمية أثناء العمل"
              : "Experience Enterprise Engineering & Real-Time Performance"}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {locale === "ar"
              ? "واجهات فائقة السرعة مبنية بـ Next.js و Laravel 12، تمنحك تحليلات حية وتجربة مستخدم لا مثيل لها."
              : "High-concurrency web infrastructure engineered with Next.js and Laravel 12, offering sub-second response and live analytics."}
          </p>
        </div>

        {/* Browser Mockup Window matching Figma */}
        <div className="rounded-3xl bg-[#0B132B] border border-blue-900/60 shadow-2xl shadow-blue-950/80 overflow-hidden">
          {/* Browser Header Bar */}
          <div className="px-6 py-4 bg-[#060B26] border-b border-blue-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ms-3 text-xs font-mono text-slate-400 hidden sm:inline">
                https://smarttouch.agency/enterprise-live-portal
              </span>
            </div>

            {/* Interactive Preview Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "analytics" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {locale === "ar" ? "تحليلات التحويل" : "Conversions"}
              </button>
              <button
                onClick={() => setActiveTab("performance")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "performance" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {locale === "ar" ? "الأداء والسرعة" : "Performance"}
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "seo" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {locale === "ar" ? "مؤشرات السيو" : "SEO Rank"}
              </button>
            </div>
          </div>

          {/* Browser Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>{locale === "ar" ? "معدل تحويل العملاء" : "Organic Conversion Rate"}</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white">+48.6%</div>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span>↑ 14.2%</span>
                    <span className="text-slate-400">{locale === "ar" ? "مقارنة بالربع السابق" : "vs previous quarter"}</span>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>{locale === "ar" ? "إجمالي العوائد المحققة" : "Pipeline Revenue"}</span>
                    <BarChart2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black text-white">$4.85M</div>
                  <p className="text-xs text-cyan-400 flex items-center gap-1">
                    <span>★ Top 1%</span>
                    <span className="text-slate-400">{locale === "ar" ? "كفاءة العائد الإعلاني" : "ROAS efficiency"}</span>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>{locale === "ar" ? "العملاء المحتملون الجدد" : "Active Leads Captured"}</span>
                    <Users className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-black text-white">1,248</div>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% {locale === "ar" ? "مؤهلون ومفحوصون" : "Sanctum Verified"}</span>
                  </p>
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <span className="text-xs text-slate-400">{locale === "ar" ? "زمن استجابة الـ API" : "Backend API Latency"}</span>
                  <div className="text-3xl font-black text-cyan-400">38ms</div>
                  <p className="text-xs text-slate-400">Laravel 12 Octane Engine</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <span className="text-xs text-slate-400">{locale === "ar" ? "معدل سرعة التفاعل (INP)" : "Interaction to Next Paint"}</span>
                  <div className="text-3xl font-black text-emerald-400">12ms</div>
                  <p className="text-xs text-slate-400">60fps Smooth Momentum</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <span className="text-xs text-slate-400">{locale === "ar" ? "استهلاك الذاكرة والموارد" : "Server Memory Efficiency"}</span>
                  <div className="text-3xl font-black text-indigo-400">99.8%</div>
                  <p className="text-xs text-slate-400">Redis & Cache Optimization</p>
                </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <span className="text-xs text-slate-400">{locale === "ar" ? "مؤشر جوجل للسرعة" : "Google Lighthouse Core"}</span>
                  <div className="text-3xl font-black text-emerald-400">100 / 100</div>
                  <p className="text-xs text-emerald-400">Perfect Score Across Audits</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <span className="text-xs text-slate-400">{locale === "ar" ? "الكلمات المفتاحية في المرتبة الأولى" : "#1 Ranked Keywords"}</span>
                  <div className="text-3xl font-black text-cyan-400">420+</div>
                  <p className="text-xs text-cyan-400">Arabic & English SERPs</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#060B26] border border-blue-900/40 space-y-2">
                  <span className="text-xs text-slate-400">{locale === "ar" ? "جاهزية البيانات المنظمة" : "Schema JSON-LD Health"}</span>
                  <div className="text-3xl font-black text-indigo-400">Valid</div>
                  <p className="text-xs text-slate-400">Zero Structured Data Warnings</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
