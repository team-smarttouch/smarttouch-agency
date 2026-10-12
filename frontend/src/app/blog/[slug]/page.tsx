"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, PostItem } from "@/lib/api";
import { ArrowLeft, Calendar, User, Tag, Sparkles } from "lucide-react";
import { InquiryModal } from "@/components/InquiryModal";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : "";
  const { locale, isRtl, getLocalized } = useLanguage();
  const [post, setPost] = useState<PostItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      apiRequest(`/posts/${slug}`)
        .then((res) => {
          if (res.success && res.data) {
            setPost(res.data);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {locale === "ar" ? "المقال غير موجود" : "Article Not Found"}
        </h2>
        <p className="text-slate-500 mb-6">
          {locale === "ar"
            ? "المقال الذي تبحث عنه غير متوفر أو لم يتم نشره بعد."
            : "The article you were looking for is missing or unpublished."}
        </p>
        <Link
          href={siteUrls.blog(locale)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          {locale === "ar" ? "العودة للمدونة" : "Back to Insights"}
        </Link>
      </div>
    );
  }

  const title = getLocalized(post.title);
  const summary = getLocalized(post.summary);
  const content = getLocalized(post.content);

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={siteUrls.blog(locale)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          <span>{locale === "ar" ? "العودة للمدونة" : "Back to Blog"}</span>
        </Link>

        <article className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-12 shadow-sm space-y-8">
          <header className="space-y-4 pb-8 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100 flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-blue-600" />
                {post.category ? getLocalized(post.category.name) : "Article"}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                {new Date(post.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5 text-blue-600" />
                {post.author ? post.author.name : "SmartTouch Editorial"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>

            {summary && (
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed border-s-4 border-blue-600 ps-4 py-2 bg-slate-50 rounded-e-xl">
                {summary}
              </p>
            )}
          </header>

          {/* Featured Visual */}
          {post.featured_image ? (
            <div className="h-64 sm:h-96 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative">
              <img
                src={post.featured_image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 p-8 flex flex-col justify-end shadow-sm relative overflow-hidden text-white">
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  SmartTouch Technical Journal
                </span>
                <div className="text-base sm:text-lg font-bold text-white">
                  Enterprise Engineering • Architectural Case Notes
                </div>
              </div>
            </div>
          )}

          <div
            className="prose max-w-none text-slate-700 leading-relaxed space-y-6 text-base sm:text-lg
              prose-headings:text-slate-900 prose-headings:font-bold
              prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
              prose-blockquote:border-s-4 prose-blockquote:border-blue-600 prose-blockquote:ps-4 prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:rounded-e-lg
              prose-img:rounded-xl prose-img:shadow-sm"
          >
            {content.split("\n\n").map((chunk, idx) => (
              <p key={idx}>{chunk}</p>
            ))}
          </div>

          <footer className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>SmartTouch Strategy & Tech Intelligence</span>
            </div>
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
            >
              {locale === "ar" ? "ناقش هذا المشروع مع خبرائنا" : "Book Strategic Consultation"}
            </button>
          </footer>
        </article>
      </div>

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
