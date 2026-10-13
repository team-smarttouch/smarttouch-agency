"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, PostItem } from "@/lib/api";
import { Calendar, ArrowRight, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

export function BlogPreview() {
  const { locale, isRtl, getLocalized } = useLanguage();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    apiRequest("/posts")
      .then((res) => {
        if (res.success && res.data && res.data.data) {
          setPosts(res.data.data.slice(0, 3));
        }
      })
      .catch(console.error);
  }, []);

  const defaultPosts = [
    {
      id: 991,
      slug: "the-latest-innovation-in-web-2026",
      title: {
        en: "The Latest Innovation in Web 2026",
        ar: "أحدث الابتكارات في عالم الويب 2026",
      },
      category: { name: { en: "Web Architecture", ar: "هندسة الويب" } },
      created_at: new Date().toISOString(),
      gradient: "from-blue-900 via-indigo-900 to-slate-900",
    },
    {
      id: 992,
      slug: "next-gen-seo-strategies-2026",
      title: {
        en: "Search Engine Dominance: Next-Gen SEO Strategies in 2026",
        ar: "الهيمنة على محركات البحث: استراتيجيات تحسين السيو في 2026",
      },
      category: { name: { en: "SEO Growth", ar: "سيو ونمو" } },
      created_at: new Date().toISOString(),
      gradient: "from-slate-900 via-blue-950 to-indigo-950",
    },
    {
      id: 993,
      slug: "nextjs-laravel-enterprise-stack",
      title: {
        en: "Why Fast Next.js & Laravel Stacks Are Dominating Enterprise Web",
        ar: "لماذا تتصدر منظومة Next.js و Laravel تطوير مواقع الشركات الكبرى",
      },
      category: { name: { en: "Enterprise Systems", ar: "أنظمة المؤسسات" } },
      created_at: new Date().toISOString(),
      gradient: "from-blue-950 via-cyan-950 to-slate-900",
    },
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching template */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {locale === "ar" ? "أحدث الرؤى والمقالات" : "Latest Insights"}
          </h2>
          <Link
            href={siteUrls.blog(locale)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <span>{locale === "ar" ? "عرض كافة المقالات" : "View All"}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
          </Link>
        </div>

        {/* 3-Column Blog Cards matching template */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {displayPosts.map((post: any) => {
            const rawSlug = typeof post.slug === "object" ? getLocalized(post.slug) : post.slug;
            const title = typeof post.title === "object" ? getLocalized(post.title) : post.title;
            const catName = post.category ? getLocalized(post.category.name) : "Intelligence";
            const postUrl = siteUrls.blogPost(rawSlug, locale);

            return (
              <article
                key={post.id}
                className="group rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Photo / Visual Container */}
                  <div className={`h-48 bg-gradient-to-tr ${post.gradient || "from-blue-900 to-slate-900"} p-4 flex flex-col justify-between relative overflow-hidden`}>
                    {post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt={title}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    {post.featured_image && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
                    )}
                    <span className="relative z-10 self-start px-2.5 py-1 rounded bg-black/60 text-[10px] text-cyan-300 font-semibold backdrop-blur">
                      {catName}
                    </span>
                    <div className="relative z-10 flex items-center gap-1.5 text-[10px] text-slate-200 font-mono drop-shadow">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>{new Date(post.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      <Link href={postUrl}>{title}</Link>
                    </h3>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <Link
                    href={postUrl}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <span>{locale === "ar" ? "قراءة المقال" : "Read More"}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-270" : ""}`} />
                  </Link>
                  <span className="text-[10px] text-slate-400 font-mono">2026 Edition</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Small Newsletter Strip matching template */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {locale === "ar" ? "اشترك في نشرتنا البريدية الدورية" : "Subscribe To Our Weekly Strategic Dispatch"}
            </h4>
            <p className="text-xs text-slate-500">
              {locale === "ar" ? "جديد التكنولوجيا وحملات السيو في بريدك أسبوعياً." : "Get cutting-edge tech and performance advertising insights."}
            </p>
          </div>

          {isSubscribed ? (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>{locale === "ar" ? "تم الاشتراك بنجاح!" : "Subscribed!"}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="email@company.com"
                className="px-3.5 py-2 text-xs rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 w-full sm:w-64"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shrink-0"
              >
                {locale === "ar" ? "اشتراك" : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
