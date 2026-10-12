"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, PortfolioItem as ApiPortfolioItem } from "@/lib/api";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { 
  ChevronLeft, ChevronRight, X, ExternalLink, MessageCircle, 
  Sparkles, CheckCircle2, ArrowRight, Laptop, Smartphone, Monitor,
  Loader2, Briefcase, Eye
} from "lucide-react";

interface DisplayPortfolioItem {
  id: number;
  slug: string;
  title: { en: string; ar: string };
  category: string;
  categoryLabel: { en: string; ar: string };
  image: string;
  desc: { en: string; ar: string };
  clientName: string;
  servicesDelivered: string[];
  metrics: string;
  year?: number;
  mockupType?: string;
}

const categoryLabels: Record<string, { en: string; ar: string }> = {
  web: { en: "Web Development", ar: "تطوير الويب" },
  branding: { en: "Branding", ar: "الهوية البصرية" },
  photo: { en: "Photography", ar: "التصوير الفوتوغرافي" },
  packaging: { en: "Packaging Design", ar: "تصميم العبوات" },
  brochure: { en: "Brochure Design", ar: "تصميم البروشورات" },
  uiux: { en: "UI/UX Design", ar: "تصميم الواجهات" },
  app: { en: "APP", ar: "تطبيقات الجوال" },
  content: { en: "Content Writing", ar: "صناعة المحتوى" },
  pr: { en: "Public Relations", ar: "العلاقات العامة" },
};

export function PortfolioView() {
  const { locale, isRtl } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProject, setSelectedProject] = useState<DisplayPortfolioItem | null>(null);
  const [liveItems, setLiveItems] = useState<DisplayPortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 10 Filter Tags matching design exactly
  const filterTabs = [
    { id: "all", label: { en: "All", ar: "الكل" }, borderClass: "border-slate-300 text-slate-700 hover:border-slate-800" },
    { id: "web", label: { en: "Web Development", ar: "تطوير الويب" }, borderClass: "border-amber-400 text-amber-600 hover:bg-amber-50" },
    { id: "branding", label: { en: "Branding", ar: "الهوية البصرية" }, borderClass: "border-blue-400 text-blue-600 hover:bg-blue-50" },
    { id: "photo", label: { en: "Photography", ar: "التصوير الفوتوغرافي" }, borderClass: "border-purple-400 text-purple-600 hover:bg-purple-50" },
    { id: "packaging", label: { en: "Packaging Design", ar: "تصميم العبوات" }, borderClass: "border-emerald-400 text-emerald-600 hover:bg-emerald-50" },
    { id: "brochure", label: { en: "Brochure Design", ar: "تصميم البروشورات" }, borderClass: "border-rose-400 text-rose-600 hover:bg-rose-50" },
    { id: "uiux", label: { en: "UI/UX Design", ar: "تصميم الواجهات" }, borderClass: "border-orange-400 text-orange-600 hover:bg-orange-50" },
    { id: "app", label: { en: "APP", ar: "تطبيقات الجوال" }, borderClass: "border-red-400 text-red-600 hover:bg-red-50" },
    { id: "content", label: { en: "Content Writing", ar: "صناعة المحتوى" }, borderClass: "border-cyan-400 text-cyan-600 hover:bg-cyan-50" },
    { id: "pr", label: { en: "Public Relations", ar: "العلاقات العامة" }, borderClass: "border-indigo-400 text-indigo-600 hover:bg-indigo-50" },
  ];

  // Fetch live portfolio data from Laravel API
  useEffect(() => {
    let isMounted = true;
    async function fetchPortfolios() {
      setIsLoading(true);
      try {
        const query = activeFilter !== "all" ? `?category=${encodeURIComponent(activeFilter)}` : "";
        const res = await apiRequest(`/portfolios${query}`);
        if (res.success && Array.isArray(res.data) && isMounted) {
          const mapped: DisplayPortfolioItem[] = res.data.map((item: ApiPortfolioItem) => {
            const catLabel = categoryLabels[item.category] || { en: item.category, ar: item.category };
            const titleEn = item.title?.en || "Project";
            const titleAr = item.title?.ar || titleEn;
            const slug = item.slug?.en || item.slug?.ar || String(item.id);
            const descEn = item.intro?.en || (item.company_background?.en ? item.company_background.en.replace(/<[^>]*>?/gm, "").substring(0, 160) + "..." : "");
            const descAr = item.intro?.ar || (item.company_background?.ar ? item.company_background.ar.replace(/<[^>]*>?/gm, "").substring(0, 160) + "..." : descEn);
            const clientEn = item.client_name?.en || titleEn;
            const tagsEn = item.tags?.en && item.tags.en.length > 0 ? item.tags.en : [catLabel.en];
            const image = item.thumbnail_image || item.hero_image || (item.gallery_images && item.gallery_images[0]) || "/portfolio-banner.png";

            return {
              id: item.id,
              slug,
              title: { en: titleEn, ar: titleAr },
              category: item.category,
              categoryLabel: catLabel,
              image,
              desc: { en: descEn, ar: descAr },
              clientName: clientEn,
              servicesDelivered: tagsEn,
              metrics: item.brand_color ? `Brand Color: ${item.brand_color}` : "Featured Agency Work",
              year: item.year_completed || 2024,
            };
          });
          setLiveItems(mapped);
        }
      } catch (err) {
        console.error("Error fetching live portfolios:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPortfolios();
    return () => {
      isMounted = false;
    };
  }, [activeFilter]);

  // Handle category filter change
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  // Pagination calculations (12 projects per page)
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(liveItems.length / itemsPerPage));
  const paginatedItems = liveItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Helper for generating page numbers
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* 1. Hero Section: "Our Portfolio." with architectural banner background */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-slate-50 border-b border-slate-200/80">
        <div className="absolute inset-0 z-0">
          <img
            src="/portfolio-banner.png"
            alt="Portfolio Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A1128] tracking-tight font-sans">
            {locale === "ar" ? "أعمالنا." : "Our Portfolio."}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl font-medium">
            {locale === "ar"
              ? "استكشف محفظتنا المتكاملة من المشاريع الرقمية والهويات البصرية الرائدة لصفوة الشركات في المملكة والخليج."
              : "Explore our comprehensive portfolio of award-winning digital solutions, web portals, and brand identities across the GCC."}
          </p>
        </div>
      </section>

      {/* 2. Filter Tabs Strip */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-16 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="text-xs sm:text-sm font-bold text-slate-800 mr-2 shrink-0">
              {locale === "ar" ? "حسب نوع المشروع:" : "By Project Type:"}
            </span>

            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : `bg-white ${tab.borderClass}`
                  }`}
                >
                  {locale === "ar" ? tab.label.ar : tab.label.en}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Live Database Portfolio Grid (3 Columns x 4 Rows per page) */}
      <section className="py-14 bg-[#FAFAFA] min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4 text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin text-[#001D6E]" />
              <p className="text-sm font-semibold">
                {locale === "ar" ? "جاري تحميل سابقة الأعمال..." : "Loading live portfolio projects..."}
              </p>
            </div>
          ) : paginatedItems.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-700">
                {locale === "ar" ? "لا توجد مشاريع في هذا القسم حالياً" : "No projects found in this category"}
              </h3>
              <p className="text-xs text-slate-500">
                {locale === "ar" ? "يرجى اختيار قسم آخر أو عرض جميع المشاريع." : "Please select another category or view all projects."}
              </p>
              <button
                onClick={() => handleFilterChange("all")}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                {locale === "ar" ? "عرض جميع المشاريع" : "View All Projects"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedItems.map((item) => {
                const projectTitle = locale === "ar" ? item.title.ar : item.title.en;
                const projectDesc = locale === "ar" ? item.desc.ar : item.desc.en;
                const projectCatLabel = locale === "ar" ? item.categoryLabel.ar : item.categoryLabel.en;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedProject(item)}
                    className="group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 h-[280px] cursor-pointer"
                  >
                    {/* Default State Card Display (Genuine Project Asset & Mockup) */}
                    <div className="w-full h-full relative overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={projectTitle}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes(":8000") && item.image.startsWith("/")) {
                            target.src = `http://localhost:8000${item.image}`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/20" />
                      
                      {/* Top Category Badge */}
                      <div className="absolute top-3.5 start-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-slate-900 shadow-md backdrop-blur-md">
                          {projectCatLabel}
                        </span>
                      </div>

                      {/* Bottom Project Label Card */}
                      <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between text-white">
                        <div className="truncate pr-2 rtl:pr-0 rtl:pl-2">
                          <div className="text-base font-bold truncate drop-shadow-md">{projectTitle}</div>
                          {item.clientName && (
                            <div className="text-[11px] text-slate-300 truncate drop-shadow-sm font-medium">
                              {item.clientName}
                            </div>
                          )}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-[#001D6E] group-hover:scale-110 transition-all shadow-md">
                          <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                        </div>
                      </div>
                    </div>

                    {/* Interactive Hover State Overlay (Deep Navy #001D6E) */}
                    <div className="absolute inset-0 bg-[#001D6E] text-white p-7 flex flex-col justify-between opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none group-hover:pointer-events-auto z-10 shadow-2xl rounded-2xl">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-white leading-snug truncate">
                            {projectTitle}
                          </h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600/60 text-blue-200 shrink-0">
                            {projectCatLabel}
                          </span>
                        </div>
                        {item.clientName && (
                          <h4 className="text-xs text-blue-200 font-medium truncate">
                            {item.clientName}
                          </h4>
                        )}
                        <p className="text-xs text-blue-100/90 leading-relaxed line-clamp-3">
                          {projectDesc}
                        </p>
                      </div>

                      <div className="pt-4 flex gap-2">
                        <Link
                          href={siteUrls.portfolioDetail(item.slug, locale)}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-2.5 rounded-lg bg-white text-[#001D6E] font-bold text-xs hover:bg-slate-100 transition-all shadow-md active:scale-95 cursor-pointer text-center block"
                        >
                          {locale === "ar" ? "عرض تفاصيل المشروع" : "View Project"}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. Circular Pagination Controls matching screenshot (< 1 2 3 4 ... >) */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                aria-label="Previous Page"
              >
                <ChevronLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-[#001D6E] text-white shadow-md shadow-blue-900/30"
                      : "border border-slate-200 text-slate-700 hover:border-slate-400 bg-white"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                aria-label="Next Page"
              >
                <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. "Ready To Start Your Project?" WhatsApp CTA Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#000E38] text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Glow effect */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Left Content */}
            <div className="space-y-6 max-w-xl text-center lg:text-start z-10">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {locale === "ar" ? "هل أنت مستعد لبدء مشروعك القادم؟" : "Ready To Start Your Project?"}
              </h3>
              <p className="text-sm text-blue-200/90 leading-relaxed">
                {locale === "ar"
                  ? "فريقنا المتخصص في الرياض والمنامة مستعد لتحويل رؤيتك الرقمية إلى واقع ملموس يحقق أعلى العوائد."
                  : "Our creative and engineering teams in Riyadh and Manama are ready to accelerate your digital growth."}
              </p>

              <div>
                <a
                  href="https://wa.me/966500000000?text=Hello%20Smart%20Touch,%20I%20would%20like%20to%20inquire%20about%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-slate-900 font-bold text-sm shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-500" />
                  <span>{locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
                </a>
              </div>
            </div>

            {/* Right: Floating Mockup Showcase */}
            <div className="relative w-full lg:w-1/2 flex items-center justify-center z-10">
              <div className="grid grid-cols-3 gap-3 transform rotate-6 scale-95 hover:scale-100 transition-transform duration-500">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-800 p-1 shadow-2xl -translate-y-4">
                  <img src="/images/portfolio/shanifi-donuts@2x.png" alt="mockup" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#001D6E] p-1 shadow-2xl translate-y-2">
                  <img src="/images/portfolio/shanifi-hero-mockup@2x.png" alt="mockup" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-amber-600 p-1 shadow-2xl -translate-y-2">
                  <img src="/images/portfolio/shanifi-showcase-collage@2x.png" alt="mockup" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <TestimonialsSection />

      {/* 7. Interactive Project Showcase Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#000E38] border border-blue-800/80 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-white relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Header */}
            <div className="h-64 sm:h-72 w-full relative bg-slate-900 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={locale === "ar" ? selectedProject.title.ar : selectedProject.title.en}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes(":8000") && selectedProject.image.startsWith("/")) {
                    target.src = `http://localhost:8000${selectedProject.image}`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000E38] via-[#000E38]/40 to-transparent p-6 flex flex-col justify-end">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-[11px] font-bold uppercase tracking-wider w-max mb-2">
                  {locale === "ar" ? selectedProject.categoryLabel.ar : selectedProject.categoryLabel.en}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {locale === "ar" ? selectedProject.title.ar : selectedProject.title.en}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                  {locale === "ar" ? "نظرة عامة على المشروع" : "Project Overview"}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {locale === "ar" ? selectedProject.desc.ar : selectedProject.desc.en}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-blue-900/50">
                <div>
                  <span className="text-[11px] text-slate-400 block">{locale === "ar" ? "العميل" : "Client"}</span>
                  <span className="text-xs font-bold text-white">{selectedProject.clientName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">{locale === "ar" ? "التصنيف" : "Category"}</span>
                  <span className="text-xs font-bold text-cyan-300">
                    {locale === "ar" ? selectedProject.categoryLabel.ar : selectedProject.categoryLabel.en}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">{locale === "ar" ? "السنة" : "Year"}</span>
                  <span className="text-xs font-bold text-white">{selectedProject.year || 2024}</span>
                </div>
              </div>

              {selectedProject.servicesDelivered && selectedProject.servicesDelivered.length > 0 && (
                <div>
                  <span className="text-[11px] text-slate-400 block mb-2">{locale === "ar" ? "الخدمات المقدمة" : "Services Delivered"}</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.servicesDelivered.map((srv, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-blue-950/80 border border-blue-800/60 text-cyan-300 text-xs font-medium"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-blue-900/50">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  {locale === "ar" ? "إغلاق" : "Close"}
                </button>
                <Link
                  href={siteUrls.portfolioDetail(selectedProject.slug, locale)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>{locale === "ar" ? "عرض تفاصيل المشروع الكاملة" : "View Full Case Study"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
