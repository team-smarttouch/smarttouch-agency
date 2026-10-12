"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest, ServiceItem } from "@/lib/api";
import { FALLBACK_SERVICES } from "@/data/fallbackServices";
import { ReadyToStartBanner } from "@/components/ReadyToStartBanner";
import { 
  Check, ArrowRight, ArrowUpRight, Sparkles, ChevronRight, 
  Send, CheckCircle2, ShieldCheck, Zap, Layers, Cpu, Cloud, 
  Database, Activity, HardDrive, TrendingUp, Shuffle, Star, 
  LayoutGrid, Repeat, Archive, Bell, Wrench, ShieldAlert, 
  Share2, Megaphone, PenTool, Search, BarChart2, BarChart3, 
  Filter, GitFork, ShoppingCart, Users, PieChart, ChevronDown, 
  MessageCircle, Phone, Mail, X
} from "lucide-react";

interface ServiceDetailProps {
  slug: string;
}

// Dynamic Icon Map for cards
const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Cloud, Database, Activity, HardDrive, TrendingUp, Shuffle, Star,
  LayoutGrid, Repeat, Archive, Bell, Wrench, ShieldAlert, Share2, Megaphone,
  PenTool, Search, BarChart2, BarChart3, Filter, GitFork, ShoppingCart,
  Users, PieChart, ShieldCheck, Layers, Cpu, Globe: Layers
};

export function ServiceDetailView({ slug }: ServiceDetailProps) {
  const { t, locale, isRtl, getLocalized } = useLanguage();

  // Find pre-bundled fallback service data with comprehensive alias resolution
  const fallbackService = React.useMemo(() => {
    const clean = slug.replace(/^services-/, "").replace(/\.html$/, "").toLowerCase().trim();
    
    const aliases: Record<string, string> = {
      "seo": "seo-services",
      "seo-marketing": "seo-services",
      "seo-marketing-growth": "seo-services",
      "seo-services": "seo-services",
      "khadamat-seo": "seo-services",
      "web": "web-app-development",
      "web-dev": "web-app-development",
      "web-design": "web-app-development",
      "web-development": "web-app-development",
      "web-app-development": "web-app-development",
      "crm": "crm-marketing-automation",
      "crm-marketing": "crm-marketing-automation",
      "crm-marketing-automation": "crm-marketing-automation",
      "ai": "ai-data-analytics",
      "ai-data": "ai-data-analytics",
      "ai-data-analytics": "ai-data-analytics",
      "ai-analytics": "ai-data-analytics",
      "martech": "marketing-technology",
      "marketing-technology": "marketing-technology",
      "growth": "growth-marketing",
      "growth-marketing": "growth-marketing",
      "cloud": "cloud-infrastructure",
      "cloud-hosting": "cloud-infrastructure",
      "cloud-infrastructure": "cloud-infrastructure",
      "subscription": "subscription-marketing",
      "subscription-plans": "subscription-marketing",
      "subscription-marketing": "subscription-marketing",
    };

    const targetKey = aliases[clean] || clean;

    return (
      FALLBACK_SERVICES.find((s) => {
        const en = (s.slug?.en || "").toLowerCase();
        const ar = (s.slug?.ar || "").toLowerCase();
        return (
          en === clean ||
          ar === clean ||
          en === targetKey ||
          ar === targetKey ||
          en.replace(/^services-/, "") === clean ||
          ar.replace(/^services-/, "") === clean ||
          en.replace(/^services-/, "") === targetKey
        );
      }) || null
    );
  }, [slug]);

  const [service, setService] = useState<ServiceItem | null>(() => fallbackService);
  const [loading, setLoading] = useState<boolean>(() => !fallbackService);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Inquiry Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    apiRequest(`/services/${slug}`)
      .then((res: any) => {
        if (isMounted && res && res.success && res.data) {
          if (Array.isArray(res.data.sections) && res.data.sections.length > 0) {
            setService(res.data);
          } else if (fallbackService) {
            setService(fallbackService);
          }
        }
      })
      .catch((err) => {
        console.warn("Backend API unavailable, using bundled service specification:", err?.message);
        if (isMounted && fallbackService) {
          setService(fallbackService);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug, fallbackService]);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("/inquiries", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          service_id: service?.id,
          service_name: service ? getLocalized(service.title) : slug,
          message,
          locale,
        }),
      });

      setIsSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => {
        setIsSuccess(false);
        setIsInquiryModalOpen(false);
      }, 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLocalizedField = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[locale] || field.en || Object.values(field)[0] || "";
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName] || Zap;
    return <IconComponent className="w-5 h-5" />;
  };

  const serviceTitle = service ? getLocalized(service.title) : slug.replace(/-/g, " ");

  if (loading && !service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium">Loading service specifications...</p>
        </div>
      </div>
    );
  }

  const sections = service?.sections && Array.isArray(service.sections) ? service.sections : [];

  return (
    <div className="bg-white min-h-screen text-slate-800 pt-12 pb-20 overflow-x-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href={siteUrls.home(locale)} className="hover:text-indigo-600 transition-colors">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className={`w-3 h-3 ${isRtl ? "rotate-180" : ""}`} />
          <Link href={siteUrls.services(locale)} className="hover:text-indigo-600 transition-colors">
            {locale === "ar" ? "خدماتنا" : "Services"}
          </Link>
          <ChevronRight className={`w-3 h-3 ${isRtl ? "rotate-180" : ""}`} />
          <span className="text-slate-700 font-semibold">{serviceTitle}</span>
        </div>
      </div>

      {/* Dynamic Sections Renderer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {sections.length > 0 ? (
          sections.map((section: any, sIdx: number) => {
            switch (section.type) {
              // ---------------- HERO SECTION ----------------
              case "hero": {
                const title = getLocalizedField(section.title) || serviceTitle;
                const lead = getLocalizedField(section.lead);
                const sublead = getLocalizedField(section.sublead);
                const image = section.image || service?.featured_image;

                return (
                  <section key={section.id || sIdx} className="space-y-4">
                    <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-black text-[#0B132B] tracking-tight leading-tight">
                      {title}
                    </h1>
                    {lead && (
                      <p className="text-slate-600 text-sm sm:text-base max-w-4xl leading-relaxed">
                        {lead}
                      </p>
                    )}
                    {image && (
                      <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-[#060B26]">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-auto max-h-[520px] object-cover block"
                        />
                      </div>
                    )}
                    {sublead && (
                      <div className="text-slate-600 text-sm sm:text-base max-w-4xl leading-relaxed whitespace-pre-line pt-1">
                        {sublead}
                      </div>
                    )}
                  </section>
                );
              }

              // ---------------- FEATURE SPLIT LIST ----------------
              case "feature_split_list": {
                const title = getLocalizedField(section.title);
                const subtitle = getLocalizedField(section.subtitle);
                const isLavender = section.theme === "lavender";

                return (
                  <section
                    key={section.id || sIdx}
                    className={`rounded-3xl p-6 sm:p-10 lg:p-12 transition-all ${
                      isLavender ? "bg-[#F3F4FF] border border-indigo-100/60" : "bg-transparent"
                    }`}
                  >
                    {title && (
                      <div className="mb-10">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight mb-3">
                          {title}
                        </h2>
                        {subtitle && (
                          <p className="text-slate-500 text-sm sm:text-base max-w-3xl leading-relaxed">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-12">
                      {section.items?.map((item: any, iIdx: number) => {
                        const itemTitle = getLocalizedField(item.title);
                        const itemDesc = getLocalizedField(item.description);
                        const itemImage = item.image;
                        const checkpoints = item.checkpoints || [];

                        return (
                          <div
                            key={iIdx}
                            className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
                          >
                            {/* Graphic / Image on Left */}
                            {itemImage && (
                              <div className="w-full lg:w-[480px] shrink-0 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white">
                                <img
                                  src={itemImage}
                                  alt={itemTitle}
                                  className="w-full h-auto object-cover max-h-[360px]"
                                />
                              </div>
                            )}

                            {/* Details on Right */}
                            <div className="flex-1 space-y-4">
                              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
                                {itemTitle}
                              </h3>
                              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {itemDesc}
                              </p>

                              {checkpoints.length > 0 && (
                                <div className="space-y-3 pt-3">
                                  {checkpoints.map((cp: any, cIdx: number) => (
                                    <div key={cIdx} className="flex items-start gap-3">
                                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                      </span>
                                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                        {getLocalizedField(cp)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              }

              // ---------------- CARD GRID ----------------
              case "card_grid": {
                const title = getLocalizedField(section.title);
                const subtitle = getLocalizedField(section.subtitle);
                const cols = section.columns || 3;
                const isLavenderContainer = section.theme === "lavender_container";

                const colClass =
                  cols === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : cols === 4
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

                return (
                  <section
                    key={section.id || sIdx}
                    className={`rounded-3xl p-6 sm:p-10 ${
                      isLavenderContainer ? "bg-[#F3F4FF] border border-indigo-100" : ""
                    }`}
                  >
                    {title && (
                      <div className="mb-8">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight mb-2">
                          {title}
                        </h2>
                        {subtitle && (
                          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    )}

                    <div className={`grid ${colClass} gap-6`}>
                      {section.cards?.map((card: any, cIdx: number) => {
                        const cardTitle = getLocalizedField(card.title);
                        const cardDesc = getLocalizedField(card.description);

                        return (
                          <div
                            key={cIdx}
                            className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 ${
                              isLavenderContainer
                                ? "bg-white shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200"
                                : "bg-[#F3F4FF] hover:shadow-lg border border-indigo-100/50"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 mb-5 border border-indigo-50">
                              {renderIcon(card.icon)}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 leading-snug">
                              {cardTitle}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                              {cardDesc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              }

              // ---------------- PRICING TIERS ----------------
              case "pricing_tiers": {
                const title = getLocalizedField(section.title);

                return (
                  <section key={section.id || sIdx} className="space-y-8">
                    {title && (
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                        {title}
                      </h2>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {section.tiers?.map((tier: any, tIdx: number) => {
                        const tierName = getLocalizedField(tier.name);
                        const tierDesc = getLocalizedField(tier.description);
                        const period = getLocalizedField(tier.period) || "/month";
                        const ctaText = getLocalizedField(tier.cta_text) || "Get Started";
                        const isPopular = tier.popular;

                        return (
                          <div
                            key={tIdx}
                            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                              isPopular
                                ? "bg-gradient-to-b from-[#162B68] via-[#10204D] to-[#0A1333] border-2 border-indigo-500 shadow-2xl scale-[1.02]"
                                : "bg-gradient-to-b from-[#101D42] to-[#091129] border border-blue-900/40 shadow-xl"
                            }`}
                          >
                            <div className="space-y-4">
                              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                                {tierName}
                              </h3>
                              <p className="text-blue-200/80 text-xs leading-relaxed min-h-[48px]">
                                {tierDesc}
                              </p>

                              <div className="pt-2 pb-4">
                                <div className="flex items-baseline gap-1 text-white">
                                  <span className="text-4xl sm:text-5xl font-black tracking-tight">
                                    {tier.price}
                                  </span>
                                  <span className="text-blue-300 text-xs sm:text-sm font-normal">
                                    {period}
                                  </span>
                                </div>
                              </div>

                              <div className="border-t border-blue-900/60 pt-4 space-y-3">
                                <p className="text-xs font-bold text-white uppercase tracking-wider">
                                  {locale === "ar" ? "ما تتضمنه الباقة:" : "What's Included:"}
                                </p>
                                <div className="space-y-2.5">
                                  {tier.features?.map((feat: any, fIdx: number) => (
                                    <div key={fIdx} className="flex items-center gap-2.5">
                                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 stroke-[2.5]" />
                                      </span>
                                      <span className="text-xs text-slate-200">
                                        {getLocalizedField(feat)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="pt-8">
                              <button
                                onClick={() => setIsInquiryModalOpen(true)}
                                className="w-full py-3.5 rounded-xl bg-white text-[#0B132B] font-bold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all text-center"
                              >
                                {ctaText}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              }

              // ---------------- PLATFORM LOGOS (CRM) ----------------
              case "platform_logos": {
                const title = getLocalizedField(section.title);
                const subtitle = getLocalizedField(section.subtitle);

                return (
                  <section key={section.id || sIdx} className="space-y-6">
                    {title && (
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight max-w-md">
                          {title}
                        </h2>
                        {subtitle && (
                          <div className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed whitespace-pre-line">
                            {subtitle}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Logos Container */}
                    <div className="p-8 sm:p-10 rounded-3xl bg-[#F3F4FF] border border-indigo-100">
                      <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                        Platform
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {section.platforms?.map((plat: any, pIdx: number) => (
                          <div
                            key={pIdx}
                            className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center gap-3 border border-slate-100 hover:shadow-md transition-shadow"
                          >
                            <img
                              src={plat.logo}
                              alt={plat.name}
                              className="h-10 sm:h-12 w-auto object-contain"
                            />
                            <span className="text-xs font-bold text-slate-700">
                              {plat.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CRM Integration Cards */}
                    {section.cards && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.cards.map((card: any, cIdx: number) => (
                          <div
                            key={cIdx}
                            className="p-8 rounded-2xl bg-[#F3F4FF] border border-indigo-100 space-y-3"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 mb-2">
                              {renderIcon(card.icon)}
                            </div>
                            <h3 className="text-xl font-bold text-[#0B132B]">
                              {getLocalizedField(card.title)}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                              {getLocalizedField(card.description)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              }

              // ---------------- WHY US BOX ----------------
              case "why_us": {
                const title = getLocalizedField(section.title);
                const desc = getLocalizedField(section.description);
                const image = section.image;
                const checkpoints = section.checkpoints || [];
                const ctaBox = section.cta_box;
                const note = getLocalizedField(section.note);

                return (
                  <section
                    key={section.id || sIdx}
                    className="rounded-3xl bg-[#000B20] text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      {/* Left Column Content */}
                      <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                          {title}
                        </h2>
                        {desc && (
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {desc}
                          </p>
                        )}

                        <div className="space-y-4 pt-2">
                          {checkpoints.map((cp: any, cIdx: number) => (
                            <div key={cIdx} className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </span>
                              <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                                {getLocalizedField(cp)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {note && (
                          <p className="text-xs sm:text-sm text-slate-300 italic pt-2 border-t border-slate-800">
                            {note}
                          </p>
                        )}

                        {ctaBox && (
                          <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-900/60 space-y-3 mt-6">
                            <p className="text-xs text-slate-300 font-medium">
                              {getLocalizedField(ctaBox.title)}
                            </p>
                            <button
                              onClick={() => setIsInquiryModalOpen(true)}
                              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                            >
                              {getLocalizedField(ctaBox.button_text) || "Contact Us"}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Right Column Image */}
                      {image && (
                        <div className="lg:col-span-5">
                          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
                            <img
                              src={image}
                              alt={title}
                              className="w-full h-[320px] sm:h-[400px] object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                );
              }

              // ---------------- FAQ ACCORDION ----------------
              case "faq_accordion": {
                const title = getLocalizedField(section.title);

                return (
                  <section key={section.id || sIdx} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-4">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight leading-tight">
                          {title}
                        </h2>
                      </div>
                      <div className="lg:col-span-8 space-y-4">
                        {section.items?.map((faq: any, fIdx: number) => {
                          const isOpen = activeFaq === fIdx;
                          const q = getLocalizedField(faq.question);
                          const a = getLocalizedField(faq.answer);

                          return (
                            <div
                              key={fIdx}
                              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
                            >
                              <button
                                type="button"
                                onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-[#0B132B] hover:text-indigo-600 transition-colors"
                              >
                                <span>{q}</span>
                                <ChevronDown
                                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                                    isOpen ? "rotate-180 text-indigo-600" : ""
                                  }`}
                                />
                              </button>
                              {isOpen && (
                                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                  {a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              }

              // ---------------- THEMED CTA BANNER ----------------
              case "cta_banner": {
                const title = getLocalizedField(section.title);

                return (
                  <div key={section.id || sIdx} className="w-full">
                    <ReadyToStartBanner 
                      bgVariant="transparent"
                      titleEn={typeof section.title === "object" ? section.title?.en : title}
                      titleAr={typeof section.title === "object" ? section.title?.ar : title}
                    />
                  </div>
                );
              }

              default:
                return null;
            }
          })
        ) : (
          /* Graceful rich presentation fallback */
          <div className="space-y-12 py-10 max-w-4xl">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-[#0B132B]">{serviceTitle}</h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {service?.short_description ? getLocalized(service.short_description) : (
                  locale === "ar"
                    ? "حلول رقمية متقدمة مصممة خصيصاً لمساعدة الشركات على النمو وتصدر الأسواق الرقمية."
                    : "Advanced digital solutions engineered to scale your enterprise and dominate online markets."
                )}
              </p>
              {service?.featured_image && (
                <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 my-6">
                  <img src={service.featured_image} alt={serviceTitle} className="w-full h-auto object-cover" />
                </div>
              )}
            </div>

            {service?.features && service.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{getLocalized(feat)}</span>
                  </div>
                ))}
              </div>
            )}

            <ReadyToStartBanner bgVariant="transparent" className="mt-8" />
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setIsInquiryModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-[#0B132B]">
                {locale === "ar" ? "طلب استشارة وعرض سعر" : "Request a Consultation"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {locale === "ar"
                  ? `أنت تستفسر عن خدمة: ${serviceTitle}`
                  : `Inquiring about: ${serviceTitle}`}
              </p>
            </div>

            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-900 text-lg">{t("inquiry.successTitle")}</h4>
                <p className="text-xs text-slate-500">{t("inquiry.successDesc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {t("inquiry.name")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {t("inquiry.email")} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {t("inquiry.phone")}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 50 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {t("inquiry.message")} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={locale === "ar" ? "تفاصيل مشروعك وأهدافك..." : "Project requirements..."}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : t("inquiry.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
