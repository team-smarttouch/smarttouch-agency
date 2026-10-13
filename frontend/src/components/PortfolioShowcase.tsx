"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAgencySettings } from "@/context/AgencySettingsContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, PortfolioItem } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";

// Initial SSR-safe fallback matching Homefix, Dala, and Weetas from database
const initialProjects: PortfolioItem[] = [
  {
    id: 19,
    slug: { en: "homefix", ar: "homefix" },
    title: { en: "HomeFix", ar: "هوم فيكس" },
    client_name: { en: "Homefix Facilities Management", ar: "هوم فيكس لإدارة المرافق والصيانة" },
    category: "Website Development",
    thumbnail_image: "/images/portfolio/portfolio-banners/thumb_banner_Thumbnail_Homefix.png",
    hero_image: "/images/portfolio/portfolio-banners/main_banner_Banner-Image_Homefix.png",
    sort_order: 1,
    is_published: true,
  },
  {
    id: 11,
    slug: { en: "dala", ar: "dala" },
    title: { en: "Dala", ar: "دالا للمياه" },
    client_name: { en: "Dala Water Bottling Factory", ar: "مصنع مياه دالا" },
    category: "Brand Identity & Web",
    thumbnail_image: "/images/portfolio/portfolio-banners/thumb_banner_Thumbnail_Dala.png",
    hero_image: "/images/portfolio/portfolio-banners/main_banner_Banner_DALA.jpg",
    sort_order: 2,
    is_published: true,
  },
  {
    id: 63,
    slug: { en: "weetas", ar: "weetas" },
    title: { en: "Weetas", ar: "ويتاس العقارية" },
    client_name: { en: "Weetas Real Estate Agency", ar: "وكالة ويتاس للعقارات" },
    category: "Real Estate Portal",
    thumbnail_image: "/images/portfolio/portfolio-banners/thumb_banner_Thumbnail_Weetas1.png",
    hero_image: "/images/portfolio/portfolio-banners/main_banner_Banner_Weetas1.jpg",
    sort_order: 3,
    is_published: true,
  },
];

export function PortfolioShowcase() {
  const { locale, isRtl } = useLanguage();
  const { featuredPortfolios } = useAgencySettings();
  const [projects, setProjects] = useState<PortfolioItem[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live portfolios from database via API, respecting admin featured slots
  useEffect(() => {
    let isMounted = true;
    async function loadPortfolios() {
      try {
        setIsLoading(true);
        const res = await apiRequest("/portfolios");
        const items = Array.isArray(res) ? res : res.data;
        if (isMounted && Array.isArray(items) && items.length > 0) {
          const targetSlugs =
            featuredPortfolios && featuredPortfolios.length === 3
              ? featuredPortfolios
              : ["homefix", "dala", "weetas"];

          const matched: PortfolioItem[] = [];
          targetSlugs.forEach((targetSlug) => {
            const found = items.find((p: any) => {
              const sEn = typeof p.slug === "object" ? p.slug?.en : p.slug;
              const sAr = typeof p.slug === "object" ? p.slug?.ar : p.slug;
              return sEn === targetSlug || sAr === targetSlug || String(p.id) === targetSlug;
            });
            if (found) matched.push(found);
          });

          if (matched.length === 3) {
            setProjects(matched);
          } else {
            // Fill missing slots with available items
            const filled = [...matched];
            for (const item of items) {
              if (filled.length >= 3) break;
              if (!filled.some((f) => f.id === item.id)) {
                filled.push(item);
              }
            }
            setProjects(filled.slice(0, 3));
          }
        }
      } catch (err) {
        console.warn("Could not fetch live portfolios from API, using fallback data", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadPortfolios();
    return () => {
      isMounted = false;
    };
  }, [featuredPortfolios]);

  const cardLeft = projects[0] || initialProjects[0];
  const cardCenter = projects[1] || initialProjects[1];
  const cardRight = projects[2] || initialProjects[2];

  const getTitle = (p: PortfolioItem) =>
    typeof p.title === "object"
      ? locale === "ar"
        ? p.title.ar || p.title.en
        : p.title.en
      : p.title;

  const getSlug = (p: PortfolioItem) =>
    typeof p.slug === "object"
      ? locale === "ar"
        ? p.slug.ar || p.slug.en
        : p.slug.en
      : p.slug;

  const getCategory = (p: PortfolioItem) => {
    if (typeof p.category === "object") {
      return locale === "ar" ? (p.category as any).ar : (p.category as any).en;
    }
    return p.category || (locale === "ar" ? "تطوير رقمي" : "Digital Solution");
  };

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">
            {locale === "ar" ? "معرض الأعمال" : "PORTFOLIO"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {locale === "ar" ? "أعمالنا المختارة" : "Our Selected Work"}
          </h2>
        </div>

        {/* 3 Project Cards: Default light state, dark blue ONLY on hover state */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* 1. Left Project Card */}
          <Link
            href={siteUrls.portfolioDetail(getSlug(cardLeft) || "", locale)}
            className="group rounded-2xl bg-[#EBF1FA] border border-blue-100/60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-gradient-to-b hover:from-[#001D6E] hover:via-[#001758] hover:to-[#000F3E] hover:border-[#001D6E] hover:shadow-2xl hover:shadow-blue-900/35 hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Laptop Mockup with Website Artwork */}
            <div className="relative w-full aspect-[16/11] flex flex-col items-center justify-center my-auto pt-2 pb-4">
              <div className="relative w-[88%] aspect-[16/10] bg-slate-900 rounded-t-xl p-1.5 shadow-2xl border border-slate-700/80 group-hover:border-blue-400/40 transition-colors flex flex-col">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mx-auto mb-1 shrink-0" />
                <div className="relative w-full h-full bg-white rounded-sm overflow-hidden">
                  <img
                    src={cardLeft.thumbnail_image || cardLeft.hero_image || "/images/portfolio/portfolio-banners/thumb_banner_Thumbnail_Homefix.png"}
                    alt={getTitle(cardLeft)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="w-[96%] h-2.5 sm:h-3 rounded-b-lg bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 shadow-md border-t border-slate-400/80 relative">
                <div className="w-10 h-1 bg-slate-400 rounded-b mx-auto" />
              </div>
            </div>

            {/* Card Information & Action Button */}
            <div className="pt-4 border-t border-blue-200/50 group-hover:border-blue-700/60 transition-colors flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors">
                  {getTitle(cardLeft)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 group-hover:text-blue-200 font-medium mt-1 transition-colors">
                  {getCategory(cardLeft)}
                </p>
              </div>

              <div className="w-11 h-11 rounded-full bg-white text-slate-700 group-hover:text-[#001D6E] flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 active:scale-95 transition-all shrink-0">
                <ArrowUpRight className={`w-5 h-5 ${isRtl ? "rotate-270" : ""}`} />
              </div>
            </div>
          </Link>

          {/* 2. Middle Project Card */}
          <Link
            href={siteUrls.portfolioDetail(getSlug(cardCenter) || "", locale)}
            className="group rounded-2xl bg-[#EBF1FA] border border-blue-100/60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-gradient-to-b hover:from-[#001D6E] hover:via-[#001758] hover:to-[#000F3E] hover:border-[#001D6E] hover:shadow-2xl hover:shadow-blue-900/35 hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Multi-Device Composite Artwork */}
            <div className="relative w-full aspect-[16/11] flex items-center justify-center my-auto pt-2 pb-4 overflow-hidden">
              {/* Desktop/Laptop Screen */}
              <div className="relative w-[78%] aspect-[16/10] bg-slate-950 rounded-t-xl p-1.5 shadow-2xl border border-slate-700/60 group-hover:border-blue-400/40 transition-colors flex flex-col -translate-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto mb-1 shrink-0" />
                <div className="relative w-full h-full bg-slate-900 rounded-sm overflow-hidden">
                  <img
                    src={cardCenter.thumbnail_image || cardCenter.hero_image || "/images/portfolio/portfolio-banners/thumb_banner_Thumbnail_Dala.png"}
                    alt={getTitle(cardCenter)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                {/* Laptop Base */}
                <div className="absolute -bottom-2 -left-2 -right-2 h-2 rounded-b bg-slate-300 shadow" />
              </div>

              {/* Overlaid Smartphone Mockup */}
              <div className="absolute right-2 sm:right-4 bottom-2 w-[28%] aspect-[9/18] bg-slate-950 rounded-2xl p-1 shadow-2xl border border-slate-700/60 group-hover:border-cyan-400/40 transition-colors z-10 flex flex-col">
                <div className="w-3 h-0.5 bg-slate-700 rounded-full mx-auto my-0.5 shrink-0" />
                <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">
                  <img
                    src={cardCenter.hero_image || cardCenter.thumbnail_image || "/images/portfolio/portfolio-banners/main_banner_Banner_DALA.jpg"}
                    alt={getTitle(cardCenter)}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Card Information & Action Button */}
            <div className="pt-4 border-t border-blue-200/50 group-hover:border-blue-700/60 transition-colors flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors">
                  {getTitle(cardCenter)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 group-hover:text-blue-200 font-medium mt-1 transition-colors">
                  {getCategory(cardCenter)}
                </p>
              </div>

              <div className="w-11 h-11 rounded-full bg-white text-slate-700 group-hover:text-[#001D6E] flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 active:scale-95 transition-all shrink-0">
                <ArrowUpRight className={`w-5 h-5 ${isRtl ? "rotate-270" : ""}`} />
              </div>
            </div>
          </Link>

          {/* 3. Right Project Card */}
          <Link
            href={siteUrls.portfolioDetail(getSlug(cardRight) || "", locale)}
            className="group rounded-2xl bg-[#EBF1FA] border border-blue-100/60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-gradient-to-b hover:from-[#001D6E] hover:via-[#001758] hover:to-[#000F3E] hover:border-[#001D6E] hover:shadow-2xl hover:shadow-blue-900/35 hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Laptop Mockup with Website Artwork */}
            <div className="relative w-full aspect-[16/11] flex flex-col items-center justify-center my-auto pt-2 pb-4">
              <div className="relative w-[88%] aspect-[16/10] bg-slate-900 rounded-t-xl p-1.5 shadow-2xl border border-slate-700/80 group-hover:border-blue-400/40 transition-colors flex flex-col">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mx-auto mb-1 shrink-0" />
                <div className="relative w-full h-full bg-white rounded-sm overflow-hidden">
                  <img
                    src={cardRight.thumbnail_image || cardRight.hero_image || "/images/portfolio/portfolio-banners/thumb_banner_Thumbnail_Weetas1.png"}
                    alt={getTitle(cardRight)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="w-[96%] h-2.5 sm:h-3 rounded-b-lg bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 shadow-md border-t border-slate-400/80 relative">
                <div className="w-10 h-1 bg-slate-400 rounded-b mx-auto" />
              </div>
            </div>

            {/* Card Information & Action Button */}
            <div className="pt-4 border-t border-blue-200/50 group-hover:border-blue-700/60 transition-colors flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors">
                  {getTitle(cardRight)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 group-hover:text-blue-200 font-medium mt-1 transition-colors">
                  {getCategory(cardRight)}
                </p>
              </div>

              <div className="w-11 h-11 rounded-full bg-white text-slate-700 group-hover:text-[#001D6E] flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 active:scale-95 transition-all shrink-0">
                <ArrowUpRight className={`w-5 h-5 ${isRtl ? "rotate-270" : ""}`} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
