"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TranslatableText } from "@/lib/api";
import { Locale, switchLocaleUrl } from "@/lib/urls";

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  isRtl: boolean;
  t: (key: string) => string;
  getLocalized: (obj?: TranslatableText | string | null) => string;
}

const translations: Record<string, { en: string; ar: string }> = {
  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About Us", ar: "من نحن" },
  "nav.services": { en: "Services", ar: "خدماتنا" },
  "nav.portfolio": { en: "Portfolio", ar: "أعمالنا" },
  "nav.blog": { en: "Blog & Insights", ar: "المدونة" },
  "nav.contact": { en: "Contact Us", ar: "اتصل بنا" },
  "nav.dashboard": { en: "Staff Portal", ar: "بوابة الموظفين" },
  "nav.inquire": { en: "Get a Quote", ar: "طلب عرض سعر" },

  // Hero
  "hero.badge": { en: "Digital Advertising & Systems Engineering", ar: "وكالة الدعاية الرقمية وهندسة الأنظمة" },
  "hero.title1": { en: "WE BUILD THE SYSTEMS", ar: "نبني الأنظمة الرقمية" },
  "hero.titleHighlight": { en: "THAT POWER DIGITAL GROWTH", ar: "التي تصنع نموك المستدام" },
  "hero.subtitle": { 
    en: "A premier digital advertising agency specializing in high-performance web & mobile applications, data-driven SEO marketing, creative branding, and scalable cloud systems.", 
    ar: "وكالة إعلانات رقمية متطورة متخصصة في هندسة تطبيقات الويب والجوال، واستراتيجيات تحسين السيو المبنية على البيانات، والهوية البصرية وحملات النمو عالية العائد." 
  },
  "hero.ctaPrimary": { en: "Explore Services", ar: "استكشف خدماتنا" },
  "hero.ctaSecondary": { en: "Get a Quote", ar: "احصل على عرض سعر" },

  // Stats
  "stats.projects": { en: "Projects Completed", ar: "مشروع تم إنجازه" },
  "stats.clients": { en: "Happy Clients", ar: "عميل يثق بنا" },
  "stats.revenue": { en: "Revenue Generated", ar: "عوائد محققة لعملائنا" },
  "stats.years": { en: "Years Experience", ar: "سنوات خبرة وابتكار" },

  // Services
  "services.title": { en: "Smart Digital Solutions for Scalable Growth", ar: "حلول رقمية ذكية لنمو قابل للتوسع" },
  "services.subtitle": { en: "End-to-end capabilities engineered to build market leaders and accelerate revenue.", ar: "قدرات وخدمات متكاملة مصممة لصناعة قادة السوق ومضاعفة أرباحك." },
  "services.inquire": { en: "Request Proposal", ar: "طلب عرض سعر" },
  "services.learnMore": { en: "Explore Details", ar: "تفاصيل الخدمة" },
  "services.viewAll": { en: "View All Services", ar: "عرض كافة الخدمات" },

  // Middle CTA
  "cta.title": { en: "Ready to scale your business with cutting-edge technology?", ar: "هل أنت مستعد لتوسيع أعمالك بأحدث الأنظمة الرقمية؟" },
  "cta.subtitle": { en: "Partner with our elite engineers and advertising strategists to dominate your industry.", ar: "تشارك مع نخبة مهندسينا وخبراء التسويق لدينا لتحقيق الصدارة في مجالك." },
  "cta.button": { en: "Start Your Transformation", ar: "ابدأ التحول الرقمي الآن" },

  // Culture / Experience
  "culture.badge": { en: "Why Leading Brands Choose Us", ar: "لماذا تختارنا كبرى الشركات" },
  "culture.title": { en: "Crafting High-Performance Digital Solutions with Passion & Precision", ar: "نصيغ حلولاً رقمية فائقة الأداء بشغف ودقة هندسية" },
  "culture.desc": { en: "We merge full-stack engineering with creative advertising excellence. Our dedicated squads ensure your product runs faster, ranks higher, and converts better.", ar: "نجمع بين هندسة البرمجيات المتطورة والتميز الإعلاني الإبداعي. تعمل فرقنا المتخصصة لضمان سرعة منتجك وتصدره لمحركات البحث وتحقيق أعلى معدلات التحويل." },

  // Portfolio
  "portfolio.title": { en: "Selected Case Studies & Proven Impact", ar: "نماذج مختارة من أعمالنا وقصص نجاحنا" },
  "portfolio.subtitle": { en: "Explore how we turned complex enterprise challenges into high-converting digital products.", ar: "اكتشف كيف حولنا تحديات كبرى الشركات إلى منتجات رقمية مربحة وفائقة النجاح." },
  "portfolio.all": { en: "All Work", ar: "كافة الأعمال" },
  "portfolio.web": { en: "Web Development", ar: "تطوير المواقع" },
  "portfolio.mobile": { en: "Mobile Apps", ar: "تطبيقات الجوال" },
  "portfolio.seo": { en: "SEO Marketing", ar: "التسويق وسيو" },
  "portfolio.branding": { en: "Branding", ar: "الهوية البصرية" },

  // Pricing / Packages
  "pricing.title": { en: "Tailored Solutions Built For Your Stage", ar: "باقات وحلول مخصصة تناسب مرحلة نموك" },
  "pricing.subtitle": { en: "Transparent, value-driven investment models with guaranteed technical and marketing deliverables.", ar: "نماذج استثمار شفافة وواضحة تضمن لك أعلى جودة تقنية وإعلانية." },

  // Testimonials
  "testimonials.title": { en: "What Our Enterprise Clients Say", ar: "ماذا يقول عملاؤنا عنا" },
  "testimonials.subtitle": { en: "Trusted by founders, marketing directors, and global industry leaders.", ar: "ثقة متجددة من رواد الأعمال، مدراء التسويق، وقادة الشركات العالمية." },

  // Blog
  "blog.title": { en: "Latest Insights & Technical Dispatches", ar: "أحدث المقالات والرؤى التقنية والتسويقية" },
  "blog.subtitle": { en: "Stay ahead with deep dives on web architecture, SEO algorithms, and growth marketing.", ar: "كن في الصدارة مع تحليلات معمقة في هندسة الويب، خوارزميات السيو، والتسويق الرقمي." },
  "blog.readMore": { en: "Read Full Article", ar: "قراءة المقال كاملاً" },

  // Contact
  "contact.title": { en: "Let's Build Something Exceptional", ar: "لنصنع معاً نجاحاً استثنائياً" },
  "contact.subtitle": { en: "Tell us about your objectives. Our leadership team responds within 24 hours.", ar: "تحدث إلينا عن أهدافك ومشاريعك. يتواصل معك فريقنا القيادي خلال 24 ساعة." },
  "inquiry.name": { en: "Full Name", ar: "الاسم الكامل" },
  "inquiry.email": { en: "Business Email", ar: "البريد الإلكتروني للعمل" },
  "inquiry.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "inquiry.company": { en: "Company / Organization", ar: "الشركة / المؤسسة" },
  "inquiry.service": { en: "Target Service", ar: "الخدمة المطلوبة" },
  "inquiry.budget": { en: "Estimated Budget", ar: "الميزانية التقديرية" },
  "inquiry.message": { en: "Project Scope & Details", ar: "تفاصيل ونطاق المشروع" },
  "inquiry.submit": { en: "Send Inquiry", ar: "إرسال الاستفسار" },
  "inquiry.successTitle": { en: "Inquiry Successfully Dispatched!", ar: "تم إرسال استفسارك بنجاح!" },
  "inquiry.successDesc": { en: "Thank you for reaching out. Our strategy directors will review your brief promptly.", ar: "شكراً لتواصلك معنا. يقوم مدراء الاستراتيجية بمراجعة طلبك للتواصل معك سريعاً." },

  // Footer
  "footer.tagline": { en: "Pioneering the Next Era of Digital Advertising & High-Performance Systems.", ar: "رواد الجيل القادم في الدعاية الرقمية وهندسة الأنظمة فائقة الأداء." },
  "footer.rights": { en: "All rights reserved. SmartTouch Advertising Agency.", ar: "جميع الحقوق محفوظة. وكالة سمارت تاتش للدعاية والحلول الرقمية." }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const initialLocale: Locale = pathname.startsWith("/ar") || pathname === "/ar/" ? "ar" : "en";
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Sync locale with current pathname
  useEffect(() => {
    if (pathname.startsWith("/ar") || pathname === "/ar/") {
      setLocaleState("ar");
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      if (pathname === "/ar" || pathname === "/ar/") {
        document.title = "شركة سمارت تاتش للتسويق الالكترونى في السعودية";
      }
    } else if (pathname.startsWith("/en") || pathname === "/") {
      setLocaleState("en");
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      if (pathname === "/" || pathname === "/en" || pathname === "/en/") {
        document.title = "Smart Touch | Digital Marketing Agency and Services in KSA";
      }
    }
  }, [pathname]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
    localStorage.setItem("smarttouch_lang", newLocale);

    const targetUrl = switchLocaleUrl(pathname, newLocale);
    if (targetUrl !== pathname) {
      router.push(targetUrl);
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  const isRtl = locale === "ar";

  const t = (key: string): string => {
    if (translations[key] && translations[key][locale]) {
      return translations[key][locale];
    }
    return key;
  };

  const getLocalized = (obj?: TranslatableText | string | null): string => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[locale] || obj.en || "";
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, isRtl, t, getLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
