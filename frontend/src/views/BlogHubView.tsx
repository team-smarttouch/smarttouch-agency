"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, PostItem, CategoryItem } from "@/lib/api";
import { Calendar, User, ArrowRight, ArrowUpRight, Sparkles, ChevronRight, BookOpen, Tag } from "lucide-react";

export function BlogHubView() {
  const { t, locale, isRtl, getLocalized } = useLanguage();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    apiRequest("/categories")
      .then((res) => {
        if (res.success && res.data) {
          setCategories(res.data);
        }
      })
      .catch(console.error);
  }, []);

  // Fetch posts (with category filter if selected)
  useEffect(() => {
    setLoading(true);
    const query = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : "";
    apiRequest(`/posts${query}`)
      .then((res) => {
        if (res.success && res.data && res.data.data) {
          setPosts(res.data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const defaultPosts: PostItem[] = [
    {
      id: 991,
      user_id: 1,
      status: "published",
      slug: {
        en: "the-latest-innovation-in-web-2026",
        ar: "the-latest-innovation-in-web-2026",
      },
      title: {
        en: "The Latest Innovation in Web 2026",
        ar: "أحدث الابتكارات في عالم الويب 2026",
      },
      summary: {
        en: "Discover the breakthrough technologies reshaping web development in 2026: AI rendering engines, edge orchestration, and fluid interaction design.",
        ar: "اكتشف أحدث التقنيات الثورية التي تعيد صياغة تطوير مواقع الويب في 2026: محركات المعالجة الذكية، والتفاعل الانسيابي فائق السرعة.",
      },
      content: {
        en: "The web in 2026 is defined by instantaneous responsiveness...",
        ar: "يشهد عالم الويب في 2026 ثورة حقيقية...",
      },
      category: {
        id: 1,
        name: { en: "Engineering & Innovation", ar: "الهندسة والابتكار" },
        slug: { en: "engineering", ar: "al-handasa" },
      },
      created_at: new Date().toISOString(),
    },
    {
      id: 992,
      user_id: 1,
      status: "published",
      slug: {
        en: "next-gen-seo-strategies-2026",
        ar: "istratijiyat-al-seo-al-haditha-2026",
      },
      title: {
        en: "Search Engine Dominance: Next-Gen SEO Strategies in 2026",
        ar: "الهيمنة على محركات البحث: استراتيجيات تحسين السيو في 2026",
      },
      summary: {
        en: "Explore how AI-driven search, semantic clustering, and Core Web Vitals dictate top rankings in competitive markets.",
        ar: "اكتشف كيف يتحكم البحث المعتمد على الذكاء الاصطناعي ومؤشرات الأداء في تصدر النتائج الأولى.",
      },
      content: {
        en: "Organic search has evolved beyond simple keyword densities...",
        ar: "تطور البحث الطبيعي ليتجاوز مجرد تكرار الكلمات المفتاحية...",
      },
      category: {
        id: 2,
        name: { en: "SEO & Growth", ar: "سيو ونمو" },
        slug: { en: "marketing", ar: "al-tasweeq" },
      },
      created_at: new Date().toISOString(),
    },
    {
      id: 993,
      user_id: 1,
      status: "published",
      slug: {
        en: "nextjs-laravel-enterprise-stack",
        ar: "nextjs-laravel-lil-sharikat",
      },
      title: {
        en: "Why Fast Next.js & Laravel Stacks Are Dominating Enterprise Web",
        ar: "لماذا تتصدر منظومة Next.js و Laravel تطوير مواقع الشركات الكبرى",
      },
      summary: {
        en: "Combining modern headless frontend rendering with a battle-tested Laravel 12 API backend for speed, security, and scalability.",
        ar: "الجمع بين واجهات Next.js المتطورة وسرعة استجابتها مع قوة وأمان واجهات برمجة تطبيقات Laravel 12.",
      },
      content: {
        en: "Modern digital experiences demand fluid 60fps animations...",
        ar: "تتطلب التجارب الرقمية الحديثة حركات انسيابية فائقة...",
      },
      category: {
        id: 1,
        name: { en: "Web Architecture", ar: "بنية الويب" },
        slug: { en: "architecture", ar: "al-bunya" },
      },
      created_at: new Date().toISOString(),
    },
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-28 sm:pt-32 pb-24">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href={siteUrls.home(locale)} className="hover:text-blue-600 transition-colors">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 text-slate-300 ${isRtl ? "rotate-180" : ""}`} />
          <span className="text-slate-800 font-semibold">{locale === "ar" ? "المدونة" : "Blog"}</span>
        </div>

        {/* Section Heading matching white theme */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === "ar" ? "الرؤى والتحليلات التقنية" : "Engineering & Marketing Insights"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {locale === "ar" ? "مدونة سمارت تاتش والرؤى التقنية" : "SmartTouch Technical Journal & Insights"}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {locale === "ar"
              ? "استكشف أحدث دراساتنا وتجاربنا المعمارية واستراتيجيات التسويق الرقمي التي تقود مسيرة التحول الرقمي."
              : "Explore our latest research, architectural deep dives, and growth marketing strategies driving modern digital transformation."}
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-100">
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
                {catName} {cat.posts_count !== undefined ? `(${cat.posts_count})` : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-sm">
              {locale === "ar" ? "لا توجد مقالات في هذا التصنيف حالياً." : "No articles found in this category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post: any) => {
              const rawSlug = typeof post.slug === "object" ? getLocalized(post.slug) : post.slug;
              const title = typeof post.title === "object" ? getLocalized(post.title) : post.title;
              const summary = typeof post.summary === "object" ? getLocalized(post.summary) : post.summary;
              const catName = post.category ? getLocalized(post.category.name) : "Intelligence";
              const postUrl = siteUrls.blogPost(rawSlug, locale);

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
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {post.featured_image && (
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20" />
                      )}
                      <span className="relative z-10 self-start px-2.5 py-1 rounded-md bg-white/95 text-[11px] font-bold text-blue-700 shadow-xs backdrop-blur">
                        {catName}
                      </span>
                      <div className="relative z-10 flex items-center gap-1.5 text-[11px] text-white/90 drop-shadow font-medium">
                        <Calendar className="w-3.5 h-3.5 text-blue-300" />
                        <span>{new Date(post.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={postUrl}>{title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {post.author ? post.author.name : "SmartTouch Team"}
                    </span>
                    <Link
                      href={postUrl}
                      className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                      <span>{locale === "ar" ? "قراءة المقال" : "Read More"}</span>
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
