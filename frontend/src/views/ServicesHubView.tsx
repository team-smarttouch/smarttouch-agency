"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { InquiryModal } from "@/components/InquiryModal";
import { ReadyToStartBanner } from "@/components/ReadyToStartBanner";
import { ClientStrip } from "@/components/ClientStrip";

export function ServicesHubView() {
  const { locale, isRtl } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("ai-data-analytics");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // The 8 Standard Services matching screenshot
  const servicesList = [
    {
      id: 1,
      slug: "ai-data-analytics",
      title: {
        en: "AI & Data Analytics",
        ar: "الذكاء الاصطناعي وتحليل البيانات",
      },
      desc: {
        en: "Every campaign, every customer interaction, and every platform you use generates data. The question is whether that data is working for you. At Smarttouch, we build the systems and frameworks to turn that data into decisions.",
        ar: "كل حملة وتفاعل للعملاء وكل منصة تستخدمها تولد بيانات قيمة. السؤال هو كيف تجعل هذه البيانات تعمل لصالحك؟ في سمارت تاتش، نبني الأنظمة والأطر الذكية لتحويل البيانات إلى قرارات استثمارية مدروسة.",
      },
      layoutType: "ai",
    },
    {
      id: 2,
      slug: "crm-marketing-automation",
      title: {
        en: "CRM & Marketing Automation",
        ar: "إدارة علاقات العملاء وأتمتة التسويق",
      },
      desc: {
        en: "Streamline your customer journeys with enterprise CRM integration, behavioral email automation, and automated sales funnels that nurture leads and accelerate deal cycles 24/7.",
        ar: "ارتقِ بتجربة عملائك من خلال دمج أنظمة إدارة علاقات العملاء المتقدمة وأتمتة الرسائل البريدية وسلاسل المبيعات الذكية التي تعمل على مدار الساعة.",
      },
      layoutType: "crm",
    },
    {
      id: 3,
      slug: "marketing-technology",
      title: {
        en: "Marketing Technology",
        ar: "تكنولوجيا التسويق والحلول الرقمية",
      },
      desc: {
        en: "Harness modern martech stacks, server-side conversion tracking, and automated attribution modeling to maximize every dollar of marketing spend across digital touchpoints.",
        ar: "سخّر أحدث حزم تكنولوجيا التسويق والتتبع الدقيق لتعظيم العائد على كل ريال يُنفق في حملاتك الإعلانية والرقمية عبر كافة المنصات.",
      },
      layoutType: "martech",
    },
    {
      id: 4,
      slug: "seo-marketing",
      title: {
        en: "SEO Services",
        ar: "خدمات تحسين محركات البحث",
      },
      desc: {
        en: "Dominate top Google rankings in Saudi Arabia and the GCC with our algorithmic, data-driven technical SEO, semantic Arabic & English content, and high-authority search PR.",
        ar: "تصدر المراكز الأولى في محركات البحث بالمملكة العربية السعودية والخليج عبر خطط سيو تقنية متقدمة واستراتيجيات استهداف دقيقة باللغتين العربية والإنجليزية.",
      },
      layoutType: "seo",
    },
    {
      id: 5,
      slug: "growth-marketing",
      title: {
        en: "Growth Marketing",
        ar: "التسويق للنمو وتوسيع الأعمال",
      },
      desc: {
        en: "Rapid, data-backed experimentation across paid search, programmatic social advertising, and conversion rate optimization designed to sustainably scale qualified enterprise acquisition.",
        ar: "تجارب سريعة ومبنية على البيانات عبر الإعلانات الممولة وشبكات التواصل وتحسين معدل التحويل لتسريع نمو إيراداتك بثبات واستدامة.",
      },
      layoutType: "growth",
    },
    {
      id: 6,
      slug: "web-app-development",
      title: {
        en: "Web & App Development",
        ar: "تطوير تطبيقات الويب والجوال",
      },
      desc: {
        en: "High-performance web and mobile platforms engineered with Next.js 16, React Native, and Laravel 12. From high-concurrency SaaS to custom consumer portals with sub-second speeds.",
        ar: "منصات ويب وتطبيقات جوال فائقة الأداء مبنية بأحدث تقنيات Next.js 16 و React Native و Laravel 12، مصممة للمؤسسات والشركات الطموحة.",
      },
      layoutType: "dev",
    },
    {
      id: 7,
      slug: "subscription-marketing",
      title: {
        en: "Subscription Marketing Plans",
        ar: "باقات التسويق بالاشتراك الشهري",
      },
      desc: {
        en: "Agile, fixed-monthly subscription marketing packages that provide your business with an entire dedicated growth team of senior designers, copywriters, and developers without in-house overhead.",
        ar: "باقات اشتراك تسويقي شهرية مرنة تضع تحت تصرفك فريقاً متكاملاً من كبار المصممين والكتّاب والمطورين بتكلفة محددة وثابتة وبدون أعباء التوظيف.",
      },
      layoutType: "subscription",
    },
    {
      id: 8,
      slug: "hosting-infrastructure",
      title: {
        en: "Hosting & Infrastructure",
        ar: "الاستضافة والبنية التحتية السحابية",
      },
      desc: {
        en: "High-availability cloud hosting, containerized Docker deployments, and edge CDN acceleration with 99.99% uptime guarantees and proactive monitoring across Saudi Arabia.",
        ar: "استضافة سحابية عالية الموثوقية وبنية تحتية مدارة بحاويات Docker وشبكات تسريع CDN مع ضمان استقرار 99.99% ودعم فني على مدار الساعة داخل المملكة وخارجها.",
      },
      layoutType: "hosting",
    },
  ];

  // Real-time Scroll-Spy to dynamically highlight current section in sticky sidebar
  useEffect(() => {
    // 1. Scroll & Wheel & Resize listener for precise pixel-level scroll tracking
    const updateActiveSection = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If scrolled near bottom of page, activate the last service
      if (scrollY + viewportHeight >= docHeight - 80) {
        setActiveSection(servicesList[servicesList.length - 1].slug);
        return;
      }

      // Reading trigger line 180px below viewport top (clearing the fixed navbar)
      const triggerLine = 180;
      let currentSlug = servicesList[0].slug;

      for (const service of servicesList) {
        const el = document.getElementById(`service-${service.slug}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            currentSlug = service.slug;
          }
        }
      }

      setActiveSection(currentSlug);
    };

    // 2. High-performance IntersectionObserver as primary watcher
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.id.replace(/^service-/, "");
            if (slug) {
              setActiveSection(slug);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-110px 0px -55% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    servicesList.forEach((service) => {
      const el = document.getElementById(`service-${service.slug}`);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("wheel", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    // Initial check
    updateActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("wheel", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollToSection = (slug: string) => {
    setActiveSection(slug);
    const el = document.getElementById(`service-${slug}`);
    if (el) {
      const navbarOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased overflow-x-clip selection:bg-blue-600 selection:text-white" dir={isRtl ? "rtl" : "ltr"}>
      {/* ========================================================= */}
      {/* 1. HERO SECTION (Matching portfolio-banner background) */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-32 overflow-hidden bg-slate-50 border-b border-slate-200/80">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/portfolio-banner.png"
            alt="Services Banner"
            className="w-full h-full object-cover object-center opacity-95"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0A1128] tracking-tight">
              {locale === "ar"
                ? "خدمات سمارت تاتش في المملكة العربية السعودية"
                : "Smart Touch Services In Saudi Arabia"}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
              {locale === "ar"
                ? "تمكين المؤسسات والشركات الكبرى من خلال حلول تقنية مخصصة، تسويق رقمي فائق الأداء، ونتائج استثمارية مضاعفة."
                : "Empowering enterprises and ambitious brands through custom software engineering, performance marketing, and high-impact digital solutions."}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. TWO-COLUMN INTRO SECTION */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: Heading */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1128] tracking-tight leading-tight">
                {locale === "ar"
                  ? "حلول رقمية مبتكرة مصممة لنمو أعمالك"
                  : "Innovative Solutions Tailored For Your Growth"}
              </h2>
            </div>

            {/* Right: Narrative */}
            <div className="lg:col-span-7">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {locale === "ar"
                  ? "في سمارت تاتش، نتخصص في التحول الرقمي الشامل للشركات في المملكة العربية السعودية والشرق الأوسط. من تطبيقات الذكاء الاصطناعي وهندسة المنصات السحابية إلى تصميم الهويات البصرية وحملات التسويق عالي التحويل، تكرس فرقنا المتخصصة خبراتها لتحقيق أعلى عائد استثماري ونمو مستدام لعلامتك التجارية."
                  : "At Smart Touch, we specialize in end-to-end digital transformation for businesses across Saudi Arabia and the GCC. From artificial intelligence and cloud architectures to brand transformation and high-performance search marketing, our integrated teams deliver measurable impact, operational scalability, and sustainable ROI."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MAIN SECTION: STICKY SIDEBAR + 8 SERVICE CARDS */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            {/* LEFT COLUMN: STICKY SCROLL-SPY SIDEBAR */}
            <div
              className="hidden lg:block lg:col-span-3 sticky top-28 self-start z-30"
              style={{ position: "sticky", top: "116px" }}
            >
              <div className="bg-white rounded-2xl p-2 space-y-1 border border-slate-100 shadow-sm">
                {servicesList.map((service) => {
                  const isActive = activeSection === service.slug;
                  return (
                    <button
                      key={service.slug}
                      onClick={() => scrollToSection(service.slug)}
                      className={`w-full text-start py-3.5 px-3 border-b border-slate-100 last:border-b-0 transition-all flex items-center gap-2.5 cursor-pointer group rounded-xl ${
                        isActive
                          ? "font-bold text-[#0A1128] bg-blue-50/50"
                          : "font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50/70"
                      }`}
                    >
                      <span
                        className={`text-sm transition-all shrink-0 font-bold ${
                          isActive
                            ? "text-[#1E60F2] opacity-100 scale-110"
                            : "opacity-0 text-transparent scale-50"
                        }`}
                        style={{ color: isActive ? "#1E60F2" : "transparent" }}
                      >
                        ◆
                      </span>
                      <span className={`text-xs sm:text-[13px] leading-snug transition-colors ${
                        isActive ? "font-bold text-[#0A1128]" : "text-slate-600 group-hover:text-slate-900"
                      }`}>
                        {service.title[locale]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: 8 SOFT ICE-BLUE SERVICE CARDS */}
            <div className="lg:col-span-9 space-y-10 sm:space-y-14">
              {servicesList.map((service) => (
                <div
                  key={service.slug}
                  id={`service-${service.slug}`}
                  className="rounded-3xl bg-[#F6F8FD] border border-blue-100/60 p-8 sm:p-10 md:p-12 shadow-sm scroll-mt-32 transition-all hover:shadow-md overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Content Column */}
                    <div className="md:col-span-6 space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0A1128] tracking-tight">
                        {service.title[locale]}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {service.desc[locale]}
                      </p>
                      <div className="pt-3">
                        <Link
                          href={siteUrls.serviceDetail(service.slug, locale)}
                          className="inline-block px-6 py-2.5 rounded-md bg-[#1E60F2] hover:bg-blue-700 text-white font-semibold text-xs shadow-sm hover:shadow transition-all"
                        >
                          {locale === "ar" ? "اعرف المزيد" : "Learn More"}
                        </Link>
                      </div>
                    </div>

                    {/* Image Showcase Column */}
                    <div className="md:col-span-6">
                      {/* Card 1: AI & Data Analytics Showcase */}
                      {service.layoutType === "ai" && (
                        <div className="grid grid-cols-12 gap-3 h-48 sm:h-52 md:h-56">
                          <div className="col-span-7 rounded-2xl overflow-hidden bg-slate-900 shadow-md h-full">
                            <img
                              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80"
                              alt="AI Analytics Screen"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="col-span-5 flex flex-col gap-3 h-full">
                            <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-slate-900 shadow-sm relative">
                              <img
                                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=80"
                                alt="Engineer Workstation"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-[#0A1128] flex items-center justify-center p-2 shadow-sm relative">
                              <img
                                src="/images/about/floating-3d-cube.jpg"
                                alt="3D Energy Core"
                                className="w-full h-full object-contain mix-blend-screen"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card 2: CRM & Marketing Automation Showcase */}
                      {service.layoutType === "crm" && (
                        <div className="rounded-2xl overflow-hidden shadow-md h-48 sm:h-52 md:h-56 bg-slate-900 group">
                          <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
                            alt="CRM Business Team"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Card 3: Marketing Technology Showcase */}
                      {service.layoutType === "martech" && (
                        <div className="grid grid-cols-12 gap-3 h-48 sm:h-52 md:h-56">
                          <div className="col-span-6 rounded-2xl overflow-hidden bg-slate-900 shadow-md h-full">
                            <img
                              src="/images/about/our-identity-map.jpg"
                              alt="Martech Digital Grid"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="col-span-6 flex flex-col gap-3 h-full">
                            <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-slate-900 shadow-sm relative">
                              <img
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&auto=format&fit=crop&q=80"
                                alt="Strategy Session"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-slate-900 shadow-sm relative">
                              <img
                                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=80"
                                alt="Creative Designer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card 4: SEO Services Showcase */}
                      {service.layoutType === "seo" && (
                        <div className="grid grid-cols-12 gap-3 h-48 sm:h-52 md:h-56">
                          <div className="col-span-7 rounded-2xl overflow-hidden bg-slate-900 shadow-md h-full">
                            <img
                              src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&auto=format&fit=crop&q=80"
                              alt="Search Analytics"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="col-span-5 rounded-2xl bg-gradient-to-tr from-blue-200 via-sky-100 to-indigo-200 border border-blue-200/60 p-4 flex flex-col justify-between shadow-sm h-full">
                            <span className="text-[10px] font-bold text-blue-800 tracking-wider uppercase">Organic Search</span>
                            <div className="space-y-1">
                              <span className="text-2xl font-black text-[#0A1128] tracking-tight">#1 KSA</span>
                              <p className="text-[10px] text-slate-600">Top Keyword Dominance</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card 5: Growth Marketing Showcase */}
                      {service.layoutType === "growth" && (
                        <div className="grid grid-cols-12 gap-3 h-48 sm:h-52 md:h-56">
                          <div className="col-span-4 rounded-2xl bg-white border border-slate-200/80 flex flex-col items-center justify-center p-3 sm:p-4 shadow-sm h-full">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 shrink-0">
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2.1 2.1m-8.8 8.8l-2.1 2.1m0-13l2.1 2.1m8.8 8.8l2.1 2.1" />
                              </svg>
                            </div>
                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider text-center">Omnichannel</span>
                          </div>
                          <div className="col-span-8 flex flex-col gap-3 h-full">
                            <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-slate-900 shadow-sm relative">
                              <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80"
                                alt="Growth Team"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-slate-900 shadow-sm relative">
                              <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&auto=format&fit=crop&q=80"
                                alt="Collaborative Sprint"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card 6: Web & App Development Showcase */}
                      {service.layoutType === "dev" && (
                        <div className="grid grid-cols-12 gap-3 h-48 sm:h-52 md:h-56">
                          <div className="col-span-7 rounded-2xl overflow-hidden bg-slate-900 shadow-md h-full">
                            <img
                              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
                              alt="Code IDE Terminal"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="col-span-5 rounded-2xl bg-gradient-to-tr from-[#141E30] to-[#243B55] p-4 flex flex-col justify-between text-white shadow-md h-full">
                            <span className="text-[10px] font-mono text-cyan-400">Next.js 16 + Laravel</span>
                            <div className="space-y-1">
                              <span className="text-xl font-black text-white">60fps</span>
                              <p className="text-[10px] text-slate-300">Sub-50ms API Latency</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card 7: Subscription Marketing Plans Showcase */}
                      {service.layoutType === "subscription" && (
                        <div className="rounded-2xl overflow-hidden shadow-md h-48 sm:h-52 md:h-56 bg-slate-900 group">
                          <img
                            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80"
                            alt="Subscription Marketing Strategy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Card 8: Hosting & Infrastructure Showcase */}
                      {service.layoutType === "hosting" && (
                        <div className="rounded-2xl overflow-hidden shadow-md h-48 sm:h-52 md:h-56 bg-slate-900 group">
                          <img
                            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
                            alt="Cloud Server Datacenter"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. NAVY STATS RIBBON SECTION matching mockup */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-[#040A1E] text-white relative overflow-hidden border-y border-blue-950/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">500+</span>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider">
                {locale === "ar" ? "مشروع مكتمل" : "Projects Completed"}
              </p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">500+</span>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider">
                {locale === "ar" ? "عميل سعيد" : "Satisfied Clients"}
              </p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">97%</span>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider">
                {locale === "ar" ? "نسبة النجاح" : "Success Rate"}
              </p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">10</span>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider">
                {locale === "ar" ? "سنوات خبرة" : "Years in Business"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready To Start Your Project Banner */}
      <ReadyToStartBanner bgVariant="white" />

      {/* ========================================================= */}
      {/* 5. TOP CLIENTS (Database-Connected Carousel) */}
      {/* ========================================================= */}
      <ClientStrip title={{ en: "TOP CLIENTS", ar: "أبرز العملاء" }} />

      {/* Inquiry Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
