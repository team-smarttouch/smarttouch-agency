"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
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
  const [projects, setProjects] = useState<PortfolioItem[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live portfolios from database via API
  useEffect(() => {
    let isMounted = true;
    async function loadPortfolios() {
      try {
        setIsLoading(true);
        const res = await apiRequest("/portfolios");
        const items = Array.isArray(res) ? res : res.data;
        if (isMounted && Array.isArray(items) && items.length > 0) {
          // Find the 3 featured showcase projects: Homefix (Left), Dala (Center), Weetas (Right)
          const homefix = items.find((p: any) => {
            const s = typeof p.slug === "object" ? p.slug?.en : p.slug;
            return s === "homefix";
          });
          const dala = items.find((p: any) => {
            const s = typeof p.slug === "object" ? p.slug?.en : p.slug;
            return s === "dala";
          });
          const weetas = items.find((p: any) => {
            const s = typeof p.slug === "object" ? p.slug?.en : p.slug;
            return s === "weetas" || s === "weetas-real-estate";
          });

          if (homefix && dala && weetas) {
            setProjects([homefix, dala, weetas]);
          } else {
            // Fallback to top 3 active projects
            setProjects(items.slice(0, 3));
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
  }, []);

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
        {/* Section Header matching template 100% */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">
            {locale === "ar" ? "معرض الأعمال" : "PORTFOLIO"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {locale === "ar" ? "أعمالنا المختارة" : "Our Selected Work"}
          </h2>
        </div>

        {/* 3 Project Cards matching master homepage design 100% */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* 1. Left Project Card (Light Blue Container with Laptop Mockup) */}
          <Link
            href={siteUrls.portfolioDetail(getSlug(cardLeft) || "", locale)}
            className="group rounded-2xl bg-[#EBF1FA] border border-blue-100/60 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
          >
            {/* Laptop Mockup with Client Website Artwork */}
            <div className="relative w-full aspect-[16/11] flex flex-col items-center justify-center my-auto pt-2 pb-4">
              {/* Laptop Screen Frame */}
              <div className="relative w-[88%] aspect-[16/10] bg-slate-900 rounded-t-xl p-1.5 shadow-2xl border border-slate-700/80 flex flex-col">
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
              {/* Laptop Keyboard Base */}
              <div className="w-[96%] h-2.5 sm:h-3 rounded-b-lg bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 shadow-md border-t border-slate-400/80 relative">
                <div className="w-10 h-1 bg-slate-400 rounded-b mx-auto" />
              </div>
            </div>

            {/* Card Information */}
            <div className="pt-4 border-t border-blue-200/40">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                {getTitle(cardLeft)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {getCategory(cardLeft)}
              </p>
            </div>
          </Link>

          {/* 2. Middle Featured Project Card (Deep Navy Blue Container with Multi-Device Artwork & Arrow Button) */}
          <Link
            href={siteUrls.portfolioDetail(getSlug(cardCenter) || "", locale)}
            className="group rounded-2xl bg-gradient-to-b from-[#001D6E] via-[#001758] to-[#000F3E] text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-blue-900/30 hover:scale-[1.02] transition-all duration-500 hover:shadow-blue-900/50"
          >
            {/* Multi-Device Composite Artwork matching template */}
            <div className="relative w-full aspect-[16/11] flex items-center justify-center my-auto pt-2 pb-4 overflow-hidden">
              {/* Desktop/Laptop Screen */}
              <div className="relative w-[78%] aspect-[16/10] bg-slate-950 rounded-t-xl p-1.5 shadow-2xl border border-blue-400/30 flex flex-col -translate-x-3">
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
              <div className="absolute right-2 sm:right-4 bottom-2 w-[28%] aspect-[9/18] bg-slate-950 rounded-2xl p-1 shadow-2xl border border-cyan-400/40 z-10 flex flex-col">
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

            {/* Card Information with Circular Arrow Button */}
            <div className="pt-4 border-t border-blue-800/60 flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {getTitle(cardCenter)}
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 font-medium mt-1">
                  {getCategory(cardCenter)}
                </p>
              </div>

              {/* White Circular Action Button matching template */}
              <div className="w-11 h-11 rounded-full bg-white text-[#001D6E] flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all shrink-0">
                <ArrowUpRight className={`w-5 h-5 ${isRtl ? "rotate-270" : ""}`} />
              </div>
            </div>
          </Link>

          {/* 3. Right Project Card (Light Blue Container with Laptop Mockup) */}
          <Link
            href={siteUrls.portfolioDetail(getSlug(cardRight) || "", locale)}
            className="group rounded-2xl bg-[#EBF1FA] border border-blue-100/60 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
          >
            {/* Laptop Mockup with Client Website Artwork */}
            <div className="relative w-full aspect-[16/11] flex flex-col items-center justify-center my-auto pt-2 pb-4">
              {/* Laptop Screen Frame */}
              <div className="relative w-[88%] aspect-[16/10] bg-slate-900 rounded-t-xl p-1.5 shadow-2xl border border-slate-700/80 flex flex-col">
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
              {/* Laptop Keyboard Base */}
              <div className="w-[96%] h-2.5 sm:h-3 rounded-b-lg bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 shadow-md border-t border-slate-400/80 relative">
                <div className="w-10 h-1 bg-slate-400 rounded-b mx-auto" />
              </div>
            </div>

            {/* Card Information */}
            <div className="pt-4 border-t border-blue-200/40">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                {getTitle(cardRight)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {getCategory(cardRight)}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
