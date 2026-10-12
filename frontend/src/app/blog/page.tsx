"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, PostItem, CategoryItem } from "@/lib/api";
import { Calendar, User, ArrowUpRight, BookOpen, Tag, Sparkles } from "lucide-react";

export default function BlogListingPage() {
  const { t, locale, isRtl, getLocalized } = useLanguage();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiRequest("/categories")
      .then((res) => {
        if (res.success && res.data) {
          setCategories(res.data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const query = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : "";
    apiRequest(`/posts${query}`)
      .then((res) => {
        if (res.success && res.data) {
          setPosts(res.data.data || []);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{locale === "ar" ? "رؤى وأبحاث الوكالة" : "Insights & Thought Leadership"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t("blog.title")}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-100">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === ""
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:border-slate-300"
            }`}
          >
            {locale === "ar" ? "كافة المقالات" : "All Articles"}
          </button>
          {categories.map((cat) => {
            const catSlug = getLocalized(cat.slug);
            const catName = getLocalized(cat.name);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(catSlug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === catSlug
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {catName} ({cat.posts_count ?? 0})
              </button>
            );
          })}
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-sm">
              {locale === "ar" ? "لا توجد مقالات في هذا التصنيف حالياً." : "No articles found in this category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const title = getLocalized(post.title);
              const slug = getLocalized(post.slug);
              const summary = getLocalized(post.summary);
              const postUrl = siteUrls.blogPost(slug, locale);

              return (
                <article
                  key={post.id}
                  className="group rounded-2xl bg-white border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 shadow-2xs"
                >
                  <div>
                    {/* Visual Card / Banner */}
                    <div className="h-48 sm:h-52 bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 p-5 flex flex-col justify-between relative overflow-hidden">
                      {post.featured_image && (
                        <img
                          src={post.featured_image}
                          alt={title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {post.featured_image && (
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20" />
                      )}
                      <span className="relative z-10 self-start px-2.5 py-1 rounded-md bg-white/95 text-[11px] font-bold text-blue-700 shadow-xs backdrop-blur">
                        {post.category ? getLocalized(post.category.name) : "Article"}
                      </span>
                      <div className="relative z-10 flex items-center gap-1.5 text-[11px] text-white/90 drop-shadow font-medium">
                        <Calendar className="w-3.5 h-3.5 text-blue-300" />
                        <span>{new Date(post.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={postUrl}>{title}</Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      {post.author ? post.author.name : "SmartTouch Team"}
                    </span>

                    <Link
                      href={postUrl}
                      className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                      <span>{t("blog.readMore")}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-270" : ""}`} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
