"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, Minus } from "lucide-react";

export function FaqSection() {
  const { locale } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: locale === "ar" ? "ما هي الخدمات الرئيسية التي تقدمها وكالة سمارت تاتش؟" : "What core services does Smart Touch provide?",
      a: locale === "ar"
        ? "نقدم خدمات متكاملة تشمل هندسة تطبيقات الويب والجوال المتقدمة (Next.js & Laravel 12)، تحسين محركات البحث والسيو التقني، الحملات الإعلانية الممولة، وتصميم الهويات البصرية."
        : "We specialize in enterprise web & mobile application engineering (Next.js & Laravel 12), algorithmic technical SEO, high-ROAS paid media acquisition, and creative brand identity systems.",
    },
    {
      q: locale === "ar" ? "كم يستغرق تنفيذ مشروع موقع ويب أو تطبيق جوال؟" : "How long does a typical web or app development project take?",
      a: locale === "ar"
        ? "يتراوح تنفيذ المشاريع عادة بين 4 إلى 12 أسبوعاً بحسب نطاق العمل، مع تسليمات مرحلية كل أسبوعين لضمان الشفافية ومطابقة التوقعات."
        : "Standard builds typically range from 4 to 12 weeks depending on complexity. We operate in bi-weekly agile sprints with continuous staging access.",
    },
    {
      q: locale === "ar" ? "هل تدعمون الأنظمة ثنائية اللغة (العربية والإنجليزية) بالكامل؟" : "Do you fully support bilingual Arabic & English platforms?",
      a: locale === "ar"
        ? "نعم، جميع منصاتنا مبنية بدعم أصيل لاتجاه القراءة من اليمين لليسار (RTL) والخطوط العربية الحديثة وتهيئتها لمحركات البحث في جوجل السعودية."
        : "Yes, 100%. We engineer native LTR & RTL architectures with typography kerning, localized schema data, and regional SEO dominance.",
    },
    {
      q: locale === "ar" ? "كيف تضمنون سرعة استجابة الموقع وأمانه بعد الإطلاق؟" : "How do you guarantee performance and security post-launch?",
      a: locale === "ar"
        ? "نعتمد على بنية سحابية موزعة مع شهادات حماية مشفرة، وتخزين مؤقت ذكي، ومراقبة صحة الخوادم 24/7 مع اتفاقيات مستوى خدمة محددة."
        : "We deploy on scalable cloud infrastructure with automated CI/CD pipelines, sub-50ms API latency tuning, and 24/7 monitoring SLAs.",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading matching template */}
          <div className="md:col-span-5 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              {locale === "ar"
                ? "إليك إجابات لأبرز الاستفسارات المتعلقة بخدماتنا، نماذج التعاقد، والمنهجية الفنية."
                : "Find quick answers to common questions about our technical capabilities, workflows, and deliverables."}
            </p>
          </div>

          {/* Right Column: Accordion Items matching template */}
          <div className="md:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-start flex items-center justify-between gap-4 font-bold text-slate-800 text-sm hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
