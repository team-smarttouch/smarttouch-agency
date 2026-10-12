"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { apiRequest, DynamicPageItem } from "@/lib/api";
import { ArrowLeft, FileText, Calendar } from "lucide-react";

export default function DynamicPageView() {
  const params = useParams();
  const slug = params ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : "";
  const { locale, isRtl, getLocalized } = useLanguage();
  const [page, setPage] = useState<DynamicPageItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      apiRequest(`/pages/${slug}`)
        .then((res) => {
          if (res.success && res.data) {
            setPage(res.data);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-slate-400 mb-6">The page you requested is currently unavailable.</p>
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold">
          Return Home
        </Link>
      </div>
    );
  }

  const title = getLocalized(page.title);
  const content = getLocalized(page.content);

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          <span>{locale === "ar" ? "????????" : "Home"}</span>
        </Link>

        <article className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-8 sm:p-12 shadow-2xl">
          <header className="pb-8 mb-8 border-b border-slate-800 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>{page.template}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated {new Date(page.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}</span>
            </div>
          </header>

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 text-base sm:text-lg">
            {content.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
