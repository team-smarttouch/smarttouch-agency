"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { PortfolioItem, apiRequest } from "@/lib/api";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ArrowRight, ArrowLeft, MessageCircle, Star, Sparkles } from "lucide-react";

interface PortfolioDetailViewProps {
  slug: string;
}

// Fallback Shanifi Data 100% matching the screenshot design
const fallbackShanifi: PortfolioItem = {
  id: 1,
  slug: { en: "shanifi", ar: "shanifi" },
  title: { en: "Shanifi", ar: "شركة الشنيفي" },
  client_name: {
    en: "Ibrahim Al-Shanifi for Trading and Contracting Company",
    ar: "شركة إبراهيم الشنيفي للتجارة والمقاولات"
  },
  category: "web",
  tags: {
    en: ["Content Writing", "Web Design"],
    ar: ["كتابة المحتوى", "تصميم الويب"]
  },
  intro: {
    en: "Ibrahim Al-Shanifi for Trading and Contracting Company was established in 1977 by Mr. Ibrahim Al-Shanifi.",
    ar: "تأسست شركة إبراهيم الشنيفي للتجارة والمقاولات في عام 1977 على يد الأستاذ إبراهيم الشنيفي لتكون صرحاً رائداً في توزيع الأغذية والحلويات بالمملكة."
  },
  hero_image: "/images/portfolio/shanifi-hero-mockup@2x.png",
  company_background: {
    en: `Ibrahim Al-Shanifi for Trading and Contracting Company was established in 1977 by Mr. Ibrahim Al-Shanifi, and since then it has been growing and expanding to become one of the premier food and confectionery distribution companies in the Kingdom of Saudi Arabia. Driven by an uncompromising commitment to quality and hygiene, the company represents some of the world's most beloved brands across retail and wholesale channels.

Ibrahim Al-Shanifi for Trading and Contracting Company represents over 40 leading international confectionery and biscuit brands, delivering fresh products across thousands of supermarket shelves, retail outlets, and partner stores nationwide.`,
    ar: `تأسست شركة إبراهيم الشنيفي للتجارة والمقاولات في عام 1977 على يد الأستاذ إبراهيم الشنيفي، ومنذ ذلك الحين واصلت الشركة نموها وتوسعها لتصبح واحدة من كبرى شركات توزيع الأغذية والحلويات في المملكة العربية السعودية. بفضل الالتزام الصارم بأعلى معايير الجودة والسلامة الغذائية، تمثل الشركة نخبة من أشهر العلامات التجارية العالمية في قطاع التجزئة والجملة.

تمثل شركة إبراهيم الشنيفي أكثر من 40 علامة تجارية عالمية رائدة في مجال الحلويات والبسكويت، حيث تصل منتجاتها إلى آلاف أرفف السوبرماركت ومنافذ البيع بالتجزئة والمتاجر الشريكة في جميع أنحاء المملكة.`
  },
  work_experience_image: "/images/portfolio/shanifi-donuts@2x.png",
  work_experience: {
    en: `Smart Touch undertook the complete redesign and digital modernization of Ibrahim Al-Shanifi for Trading. Our team worked in close collaboration with the company's executive leadership to formulate a cohesive digital identity that reflects four decades of industry leadership, reliability, and heritage in confectionery distribution.

The challenge was to create a modern web portal that showcases both the company's distinguished corporate profile and its expansive brand portfolio of international confectionery partners, while ensuring high performance, responsive layout, and seamless navigation.

Our creative team developed custom graphic assets, corporate icon sets, and bilingual content in both Arabic and English. The product architecture was structured logically into categories—ranging from chocolates, biscuits, candies, and wafers—enabling B2B clients and supermarket retail chains to explore product specifications with ease.

The result is a responsive, modern corporate web portal that strengthens Ibrahim Al-Shanifi's digital footprint, reinforces partner trust, and provides an authoritative digital showcase for distributors and retail networks across Saudi Arabia and the Gulf.`,
    ar: `تولت سمارت تاتش مهمة التطوير الرقمي وإعادة التصميم الشامل لشركة إبراهيم الشنيفي للتجارة. عمل فريقنا بالتعاون الوثيق مع القيادة التنفيذية للشركة لصياغة هوية رقمية متماسكة تعكس أربعة عقود من الريادة والتميز والموثوقية في توزيع الحلويات والأغذية.

تمثل التحدي في إنشاء بوابة ويب حديثة تبرز التاريخ المؤسسي العريق للشركة إلى جانب محفظتها الواسعة من العلامات التجارية العالمية، مع ضمان أعلى سرعات التصفح والتوافق التام مع مختلف الشاشات والأجهزة الذكية.

ابتكر فريقنا الإبداعي أصولاً بصرية مخصصة ومجموعات أيقونات حصرية ومحتوى تسويقياً ثنائي اللغة بدقة بالغة. وتم بناء هيكلية عرض المنتجات في تصنيفات سلسة تشمل الشوكولاتة، البسكويت، السكاكر، والويفر، مما يتيح لعملاء قطاع الأعمال وسلاسل الهايبرماركت استعراض بيانات المنتجات ومواصفاتها بكل يسر.

وجاءت النتيجة في بوابة رقمية متكاملة عززت الحضور الرقمي لشركة الشنيفي ووطدت ثقة الشركاء والموزعين في المملكة العربية السعودية ومنطقة الخليج العربي.`
  },
  showcase_image: "/images/portfolio/shanifi-showcase-collage@2x.png",
  design_concept: {
    en: `The design concept for the Shanifi portal was centered around warmth, appetite appeal, and clean corporate professionalism.

We developed a vibrant color palette combining appetizing warm red accents, rich chocolate cocoa browns, and fresh clean white spaces. High-resolution product photography was integrated with playful yet structured layout elements, including subtle shadow cards and dynamic product hover states.

Typography was chosen for maximum readability and international appeal, utilizing modern geometric sans-serif fonts for English and elegant contemporary Cairo typography for Arabic. The responsive framework ensures optimal experience across desktops, tablets, and smartphones.`,
    ar: `تمحور المفهوم التصميمي لبوابة الشنيفي حول الدفء وجاذبية المنتجات اللذيذة مع الحفاظ على الرقي والاحترافية المؤسسية.

طورنا لوحة ألوان حيوية تجمع بين درجات الأحمر الدافئ وألوان الكاكاو الغنية ومساحات بيضاء نقية ومريحة للعين. وتم دمج صور المنتجات فائقة الدقة مع عناصر تفاعلية أنيقة وتأثيرات حركية خفيفة تضفي حيوية على تصفح المنتجات.

ووقع الاختيار على خطوط طباعية عصرية تتميز بالوضوح والأناقة العالمية باللغتين الإنجليزية والعربية لضمان تجربة مستخدم استثنائية على الحواسيب والهواتف الذكية.`
  },
  next_project: {
    slug: "weetas",
    title: { en: "Weetas", ar: "ويتاس للعقارات" },
    tag: "Photos"
  },
  sort_order: 1,
  is_published: true
};

export function PortfolioDetailView({ slug }: PortfolioDetailViewProps) {
  const { locale } = useLanguage();
  const isRtl = locale === "ar";
  const cleanSlug = slug.replace(/\.html$/, "");

  const [project, setProject] = useState<PortfolioItem>(fallbackShanifi);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch project from API with fallback
  useEffect(() => {
    let isMounted = true;
    async function loadPortfolio() {
      try {
        setIsLoading(true);
        const res = await apiRequest(`/portfolios/${cleanSlug}`);
        if (res.success && res.data && isMounted) {
          setProject(res.data);
        }
      } catch (err) {
        // Fallback already assigned
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadPortfolio();
    return () => { isMounted = false; };
  }, [cleanSlug]);

  const title = project.title[locale] || project.title.en;
  const intro = project.intro?.[locale] || project.intro?.en || "";
  const tags = project.tags?.[locale] || project.tags?.en || ["Content Writing", "Web Design"];
  
  const companyBgText = project.company_background?.[locale] || project.company_background?.en || "";
  const companyBgParas = companyBgText.split("\n\n").filter(Boolean);

  const workExpText = project.work_experience?.[locale] || project.work_experience?.en || "";
  const workExpParas = workExpText.split("\n\n").filter(Boolean);

  const designConceptText = project.design_concept?.[locale] || project.design_concept?.en || "";
  const designConceptParas = designConceptText.split("\n\n").filter(Boolean);

  const nextProjectTitle = project.next_project?.title?.[locale] || project.next_project?.title?.en || "Weetas";
  const nextProjectSlug = project.next_project?.slug || "weetas";
  const nextProjectTag = project.next_project?.tag || (isRtl ? "صور" : "Photos");

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      {/* 1. Project Header matching screenshot */}
      <section className="pt-28 sm:pt-36 pb-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left: Project Title & Colored Pill Badges */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A1128] tracking-tight font-sans">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {tags.map((tag, idx) => {
                const isRed = idx === 0;
                return (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      isRed
                        ? "border-rose-300 text-rose-600 bg-rose-50/40"
                        : "border-blue-300 text-blue-600 bg-blue-50/40"
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: Company Intro Text */}
          <div className="max-w-md md:pt-2">
            <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
              {intro}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hero Showcase Mockup matching screenshot */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
          <img
            src={project.hero_image || "/images/portfolio/shanifi-hero-mockup@2x.png"}
            alt={`${title} Hero Showcase`}
            className="w-full h-auto object-cover block"
          />
        </div>
      </section>

      {/* 3. Company Background Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Heading */}
          <div className="md:col-span-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] tracking-tight font-sans">
              {isRtl ? "نبذة عن الشركة" : "Company Background"}
            </h2>
          </div>

          {/* Right Column: Content Paragraphs */}
          <div className="md:col-span-8 space-y-4">
            {companyBgText.includes("<") ? (
              <div 
                className="prose max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 prose-headings:text-[#0A1128] prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: companyBgText }}
              />
            ) : (
              companyBgParas.map((para, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. Work Experience Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Heading */}
          <div className="md:col-span-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] tracking-tight font-sans">
              {isRtl ? "خبرات وسياق العمل" : "Work Experience"}
            </h2>
          </div>

          {/* Right Column: Donuts Graphic Card + Descriptive Paragraphs */}
          <div className="md:col-span-8 space-y-6">
            {/* Branded Sky-Blue Donuts Card matching screenshot */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-sky-100 bg-[#8ED8F8]">
              <img
                src={project.work_experience_image || "/images/portfolio/shanifi-donuts@2x.png"}
                alt="Donuts Graphic"
                className="w-full h-auto object-cover block"
              />
            </div>

            {/* Paragraphs */}
            <div className="space-y-4">
              {workExpText.includes("<") ? (
                <div 
                  className="prose max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 prose-headings:text-[#0A1128] prose-a:text-blue-600"
                  dangerouslySetInnerHTML={{ __html: workExpText }}
                />
              ) : (
                workExpParas.map((para, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {para}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Design Showcase Collage matching screenshot */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white p-2 sm:p-4">
          <img
            src={project.showcase_image || "/images/portfolio/shanifi-showcase-collage@2x.png"}
            alt="Showcase Product Collage"
            className="w-full h-auto object-cover block"
          />
        </div>
      </section>

      {/* 6. Design Concept Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Heading */}
          <div className="md:col-span-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] tracking-tight font-sans">
              {isRtl ? "المفهوم التصميمي" : "Design Concept"}
            </h2>
          </div>

          {/* Right Column: Design Concept Paragraphs */}
          <div className="md:col-span-8 space-y-4">
            {designConceptText.includes("<") ? (
              <div 
                className="prose max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 prose-headings:text-[#0A1128] prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: designConceptText }}
              />
            ) : (
              designConceptParas.map((para, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Gallery Showcase Grid (if project has gallery images) */}
      {project.gallery_images && project.gallery_images.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] tracking-tight font-sans">
              {isRtl ? "معرض لقطات المشروع" : "Project Showcase Gallery"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isRtl ? "استعراض تصاميم الشاشات والواجهات المعتمدة للمشروع" : "Visual design screens and interface deliverables"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery_images.map((gImg, gIdx) => (
              <div key={gIdx} className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white hover:shadow-xl transition-all">
                <img
                  src={gImg}
                  alt={`${title} Gallery Screen ${gIdx + 1}`}
                  className="w-full h-auto object-cover block"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes(":8000") && gImg.startsWith("/")) {
                      target.src = `http://localhost:8000${gImg}`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Next Project Bar matching screenshot */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href={siteUrls.portfolioDetail(nextProjectSlug, locale)}
          className="bg-[#FDF6F5] hover:bg-[#FCEEEB] rounded-2xl p-5 sm:p-6 flex items-center justify-between border border-rose-100/60 shadow-sm hover:shadow-md transition-all group"
        >
          {/* Left: Category Badge */}
          <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-rose-500 shadow-xs border border-rose-100">
            {nextProjectTag}
          </span>

          {/* Center: Next Project text + title */}
          <div className="text-center">
            <span className="block text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              {isRtl ? "المشروع التالي" : "Next Project"}
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {nextProjectTitle}
            </span>
          </div>

          {/* Right: Circle Arrow Button */}
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:bg-[#001D6E] group-hover:text-white transition-all">
            {isRtl ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </div>
        </Link>
      </section>

      {/* 8. WhatsApp CTA Section: "Ready To Start Your Project?" */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#01081F] via-[#051139] to-[#0A1A55] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="relative z-10 max-w-xl space-y-4 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {locale === "ar" ? "جاهز لبدء مشروعك القادم؟" : "Ready To Start Your Project?"}
              </h2>
              <p className="text-sm text-blue-200/90 leading-relaxed">
                {locale === "ar"
                  ? "تواصل مع خبراء سمارت تاتش لبناء منصتك الرقمية وهويتك البصرية بأعلى المعايير."
                  : "Let's engineer exceptional digital platforms and high-converting marketing campaigns together."}
              </p>
              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href="https://api.whatsapp.com/send?phone=966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#001D6E] font-bold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                  <span>{locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
                </a>
              </div>
            </div>

            {/* Right: Mockup collage preview */}
            <div className="relative z-10 shrink-0 w-64 sm:w-72 lg:w-80 h-52 relative hidden sm:flex items-center justify-center">
              <div className="absolute w-40 h-28 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 -rotate-12 -translate-x-8 -translate-y-4 overflow-hidden">
                <img src="/images/portfolio/shanifi-donuts@2x.png" alt="mockup 1" className="w-full h-full object-cover" />
              </div>
              <div className="absolute w-44 h-32 bg-white/15 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 rotate-6 translate-x-6 translate-y-2 overflow-hidden z-10">
                <img src="/images/portfolio/shanifi-hero-mockup@2x.png" alt="mockup 2" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Customer Testimonials Section: "What Our Customer Think" */}
      <TestimonialsSection />
    </div>
  );
}
