"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, DynamicPageItem } from "@/lib/api";
import { FALLBACK_PAGES } from "@/data/fallbackPages";
import { ChevronRight, Sparkles, AlertCircle } from "lucide-react";

interface DynamicPageViewProps {
  slug: string;
}

export function DynamicPageView({ slug }: DynamicPageViewProps) {
  const { locale, isRtl, getLocalized } = useLanguage();

  const fallbackPage = React.useMemo(() => {
    const clean = slug.replace(/\.html$/, "").toLowerCase();
    return (
      FALLBACK_PAGES.find((p) => {
        const en = (p.slug?.en || "").toLowerCase();
        const ar = (p.slug?.ar || "").toLowerCase();
        return en === clean || ar === clean;
      }) || null
    );
  }, [slug]);

  const [page, setPage] = useState<DynamicPageItem | null>(() => fallbackPage);
  const [loading, setLoading] = useState(() => !fallbackPage);

  useEffect(() => {
    let isMounted = true;
    apiRequest(`/pages/${slug}`)
      .then((res) => {
        if (isMounted && res.success && res.data) {
          setPage(res.data);
        }
      })
      .catch((err) => {
        console.warn("Backend API unavailable, using bundled page content:", err?.message);
        if (isMounted && fallbackPage) {
          setPage(fallbackPage);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug, fallbackPage]);

  if (loading) {
    return (
      <div className="bg-[#060B26] min-h-screen text-slate-100 pt-36 pb-24 text-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="bg-[#060B26] min-h-screen text-slate-100 pt-36 pb-24 text-center">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#0B132B] border border-blue-900/50 space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">
            {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
          </h2>
          <p className="text-xs text-slate-400">
            {locale === "ar"
              ? "لم نتمكن من العثور على الصفحة المطلوبة أو تم نقلها."
              : "The requested page does not exist or has been relocated."}
          </p>
          <Link
            href={siteUrls.home(locale)}
            className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            {locale === "ar" ? "العودة للرئيسية" : "Return to Homepage"}
          </Link>
        </div>
      </div>
    );
  }

  const title = getLocalized(page.title);
  const content = getLocalized(page.content);

  return (
    <div className="bg-[#060B26] min-h-screen text-slate-100 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href={siteUrls.home(locale)} className="hover:text-cyan-400 transition-colors">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
          <span className="text-cyan-400 font-semibold">{title}</span>
        </div>

        <div className="rounded-3xl bg-[#0B132B] border border-blue-900/50 p-8 sm:p-12 shadow-2xl space-y-6">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {title}
          </h1>

          <div className="h-0.5 w-20 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
