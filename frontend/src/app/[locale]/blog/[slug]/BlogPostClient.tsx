"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls, Locale } from "@/lib/urls";
import { apiRequest, PostItem } from "@/lib/api";
import { Calendar, User, ChevronRight, ArrowLeft, Share2, Sparkles, BookOpen } from "lucide-react";
import { InquiryModal } from "@/components/InquiryModal";

interface Props {
  locale: Locale;
  slug: string;
}

export function BlogPostClient({ locale, slug }: Props) {
  const { isRtl, getLocalized, t } = useLanguage();
  const [post, setPost] = useState<PostItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const cleanSlug = slug.replace(/\.html$/, "");

  useEffect(() => {
    apiRequest(`/posts/${cleanSlug}`)
      .then((res) => {
        if (res.success && res.data) {
          setPost(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [cleanSlug]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen text-slate-900 pt-36 pb-24 text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  // Fallback content if post not in API
  const title = post ? getLocalized(post.title) : cleanSlug.replace(/-/g, " ");
  const summary = post ? getLocalized(post.summary) : "";
  const content = post ? getLocalized(post.content) : (
    locale === "ar"
      ? "تطور المشهد الرقمي في عام 2026 بوتيرة غير مسبوقة. تعتمد الشركات الكبرى الآن على بنية Next.js المدمجة مع واجهات Laravel 12 فائقة الأمان لتحقيق تجارب تفاعلية بانسيابية 60 إطار في الثانية."
      : "The digital ecosystem in 2026 demands sub-second page loads and dynamic personalized experiences. Pairing Next.js with Laravel 12 provides enterprise reliability, blazing speed, and unmatched SEO visibility."
  );
  const catName = post && post.category ? getLocalized(post.category.name) : "Intelligence";
  const authorName = post && post.author ? post.author.name : "SmartTouch Editorial";
  const postDate = post ? new Date(post.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US") : "2026";

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href={siteUrls.home(locale)} className="hover:text-blue-600 transition-colors">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 text-slate-300 ${isRtl ? "rotate-180" : ""}`} />
          <Link href={siteUrls.blog(locale)} className="hover:text-blue-600 transition-colors">
            {locale === "ar" ? "المدونة" : "Blog"}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 text-slate-300 ${isRtl ? "rotate-180" : ""}`} />
          <span className="text-slate-800 font-semibold line-clamp-1">{title}</span>
        </div>

        {/* Article Container in White Theme */}
        <article className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-12 shadow-sm space-y-8">
          {/* Category & Date Header */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
              {catName}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{postDate}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>{authorName}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>

          {/* Lead Summary */}
          {summary && (
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed border-s-4 border-blue-600 ps-4 py-2 bg-slate-50 rounded-e-xl">
              {summary}
            </p>
          )}

          {/* Featured Visual Banner */}
          {post?.featured_image ? (
            <div className="h-64 sm:h-96 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative">
              <img 
                src={post.featured_image} 
                alt={title} 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes(":8000") && post.featured_image?.startsWith("/")) {
                    target.src = `http://localhost:8000${post.featured_image}`;
                  }
                }}
                className="w-full h-full object-cover" 
              />
            </div>
          ) : (
            <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 p-8 flex flex-col justify-end shadow-sm relative overflow-hidden text-white">
              <div className="absolute top-4 end-4">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/20 backdrop-blur">
                  SmartTouch Journal
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Architecture & Growth
                </span>
                <div className="text-base sm:text-lg font-bold text-white">
                  Technical Insight & Enterprise Analysis
                </div>
              </div>
            </div>
          )}

          {/* Article Body Content */}
          <div 
            className="prose max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6 pt-4 
              prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
              prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
              prose-blockquote:border-s-4 prose-blockquote:border-blue-600 prose-blockquote:ps-4 prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:rounded-e-lg
              prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-slate-200"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Share & Conversion Callout */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href={siteUrls.blog(locale)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              <span>{locale === "ar" ? "العودة إلى المقالات" : "Back to All Insights"}</span>
            </Link>

            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer"
            >
              {locale === "ar" ? "تواصل معنا لتنفيذ مشروعك" : "Discuss This Topic With Our Strategists"}
            </button>
          </div>
        </article>
      </div>

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
