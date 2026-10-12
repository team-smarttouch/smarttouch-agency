"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, ServiceItem } from "@/lib/api";
import { ReadyToStartBanner } from "@/components/ReadyToStartBanner";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Initial SSR-safe fallback data based on the 8 official seeded services
const initialServices: ServiceItem[] = [
  {
    id: 5,
    title: { en: "Web & App Development", ar: "تطوير المواقع والتطبيقات" },
    slug: { en: "web-app-development", ar: "web-app-development" },
    short_description: {
      en: "We engineer high-converting web and mobile platforms with Next.js 16, React Native, and Laravel 12 APIs.",
      ar: "نبني تطبيقات ويب وجوال فائقة الأداء بهندسة متقدمة مع Next.js 16 و React Native و Laravel 12.",
    },
    featured_image: "/images/services/web-app-hero.png",
    icon: "Code",
    sort_order: 1,
    is_active: true,
  },
  {
    id: 6,
    title: { en: "SEO Services", ar: "خدمات تحسين محركات البحث (SEO)" },
    slug: { en: "seo-services", ar: "seo-services" },
    short_description: {
      en: "Data-driven SEO strategies, technical auditing, and keyword authority to dominate search engine results.",
      ar: "استراتيجيات سيو مبنية على البيانات وتدقيق تقني وتصدر الكلمات المفتاحية في محركات البحث.",
    },
    featured_image: "/images/services/seo-hero.png",
    icon: "Search",
    sort_order: 2,
    is_active: true,
  },
  {
    id: 7,
    title: { en: "Growth Marketing", ar: "التسويق لنمو الأعمال" },
    slug: { en: "growth-marketing", ar: "growth-marketing" },
    short_description: {
      en: "Targeted Google, Meta, and programmatic ad campaigns engineered to maximize return on advertising spend.",
      ar: "حملات إعلانات ممولة على جوجل ومنصات التواصل الاجتماعي لتحقيق أعلى عائد على الإنفاق الإعلاني.",
    },
    featured_image: "/images/services/growth-hero.png",
    icon: "TrendingUp",
    sort_order: 3,
    is_active: true,
  },
  {
    id: 8,
    title: { en: "Subscription Marketing Plans", ar: "خطط التسويق بالاشتراك الشهري" },
    slug: { en: "subscription-marketing-plans", ar: "subscription-marketing-plans" },
    short_description: {
      en: "Predictable, all-inclusive monthly marketing solutions for ambitious companies ready to scale.",
      ar: "حلول تسويقية شهرية متكاملة وقابلة للتنبؤ للشركات الطموحة الساعية للنمو المستمر.",
    },
    featured_image: "/images/services/subscription-hero.png",
    icon: "CreditCard",
    sort_order: 4,
    is_active: true,
  },
  {
    id: 9,
    title: { en: "Hosting & Infrastructure", ar: "الاستضافة والبنية التحتية" },
    slug: { en: "hosting-infrastructure", ar: "hosting-infrastructure" },
    short_description: {
      en: "High-availability enterprise cloud architecture, managed SSD hosting, and 24/7 SLA monitoring.",
      ar: "بنية سحابية للشركات عالية الاعتمادية واستضافة مدارة فائقة السرعة مع حماية ومراقبة مستمرة.",
    },
    featured_image: "/images/services/hosting-hero.png",
    icon: "Server",
    sort_order: 5,
    is_active: true,
  },
  {
    id: 10,
    title: { en: "CRM & Marketing Automation", ar: "إدارة علاقات العملاء والأتمتة التسويقية" },
    slug: { en: "crm-marketing-automation", ar: "crm-marketing-automation" },
    short_description: {
      en: "Seamless HubSpot, Salesforce, Zoho, and Odoo CRM integrations and multi-channel marketing workflows.",
      ar: "ربط متكامل لأنظمة HubSpot و Salesforce و Zoho و Odoo وأتمتة مسارات التواصل والمبيعات.",
    },
    featured_image: "/images/services/crm-hero.png",
    icon: "Users",
    sort_order: 6,
    is_active: true,
  },
  {
    id: 11,
    title: { en: "Marketing Technology", ar: "تكنولوجيا التسويق (MarTech)" },
    slug: { en: "marketing-technology", ar: "marketing-technology" },
    short_description: {
      en: "Custom marketing stacks, proprietary tracking tools, and API connectors for unified marketing intelligence.",
      ar: "بناء أدوات تسويقية مخصصة وتتبع دقيق للتحويلات وتكامل برمجي لتوحيد الرؤى والبيانات.",
    },
    featured_image: "/images/services/martech-hero.png",
    icon: "Cpu",
    sort_order: 7,
    is_active: true,
  },
  {
    id: 12,
    title: { en: "AI & Data Analytics", ar: "الذكاء الاصطناعي وتحليل البيانات" },
    slug: { en: "ai-data-analytics", ar: "ai-data-analytics" },
    short_description: {
      en: "Transform raw campaign data into predictive revenue models, AI content workflows, and executive dashboards.",
      ar: "تحويل بيانات الحملات إلى نماذج تنبؤية ذكية ومسارات محتوى بالذكاء الاصطناعي ولوحات تحليلية دقيقة.",
    },
    featured_image: "/images/services/ai-hero.png",
    icon: "Brain",
    sort_order: 8,
    is_active: true,
  },
];

export function ServicesGrid() {
  const { locale, isRtl } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live services from database via API
  useEffect(() => {
    let isMounted = true;
    async function loadServices() {
      try {
        setIsLoading(true);
        const res = await apiRequest("/services");
        const items = Array.isArray(res) ? res : res.data;
        if (isMounted && Array.isArray(items) && items.length > 0) {
          // Filter active services, sort by sort_order
          const active = items
            .filter((s: any) => s.is_active !== false)
            .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

          // Prefer the 8 official services if available
          const officialOrder = [
            "web-app-development",
            "seo-services",
            "growth-marketing",
            "subscription-marketing-plans",
            "hosting-infrastructure",
            "crm-marketing-automation",
            "marketing-technology",
            "ai-data-analytics",
          ];

          const prioritized = [...active].sort((a: any, b: any) => {
            const aSlug = typeof a.slug === "object" ? a.slug?.en : a.slug;
            const bSlug = typeof b.slug === "object" ? b.slug?.en : b.slug;
            const aIdx = officialOrder.indexOf(aSlug);
            const bIdx = officialOrder.indexOf(bSlug);
            if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
            if (aIdx !== -1) return -1;
            if (bIdx !== -1) return 1;
            return (a.sort_order || 0) - (b.sort_order || 0);
          });

          // Take top 8 services for the homepage grid matching master design
          setServices(prioritized.slice(0, 8));
        }
      } catch (err) {
        console.warn("Could not fetch live services from API, using fallback data", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching template */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {locale === "ar" ? "خدماتنا" : "Our Services"}
          </h2>
        </div>

        {/* 8-Card Grid (4 Columns x 2 Rows) matching master design 100% */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => {
            const title =
              typeof srv.title === "object"
                ? locale === "ar"
                  ? srv.title.ar || srv.title.en
                  : srv.title.en
                : srv.title;

            const slug =
              typeof srv.slug === "object"
                ? locale === "ar"
                  ? srv.slug.ar || srv.slug.en
                  : srv.slug.en
                : srv.slug;

            const desc =
              typeof srv.short_description === "object"
                ? locale === "ar"
                  ? srv.short_description.ar || srv.short_description.en
                  : srv.short_description.en
                : srv.short_description;

            const detailUrl = siteUrls.serviceDetail(slug || "", locale);
            const imageSrc = srv.featured_image || `/images/services/web-app-hero.png`;

            return (
              <div
                key={srv.id || idx}
                className="group relative rounded-2xl bg-[#F0F4FD] border border-slate-200/90 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 h-72 sm:h-80 cursor-pointer"
              >
                {/* 1. Default Visual State: Light Top Bar + Clean Photography / Graphic Body */}
                <div className="flex flex-col justify-between h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.98]">
                  {/* Top Bar with Service Title & Arrow */}
                  <div className="p-4 sm:p-5 bg-white/95 border-b border-slate-200/80 flex items-center justify-between z-10">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight truncate group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                    </div>
                  </div>

                  {/* Thumbnail Photo / Graphic Area */}
                  <div className="relative flex-1 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* 2. Hover / Active State: Deep Navy Blue Card matching template */}
                <div className="absolute inset-0 bg-[#001D6E] text-white p-6 sm:p-7 flex flex-col justify-between opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none group-hover:pointer-events-auto z-20 shadow-2xl rounded-2xl">
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-black text-white leading-snug transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed line-clamp-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150">
                    <Link
                      href={detailUrl}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-[#001D6E] font-bold text-xs sm:text-sm hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      <span>{locale === "ar" ? "المزيد" : "See More"}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wide Full-Width Ready To Start Your Project CTA Banner */}
        <ReadyToStartBanner bgVariant="transparent" className="mt-6" />
      </div>
    </section>
  );
}
