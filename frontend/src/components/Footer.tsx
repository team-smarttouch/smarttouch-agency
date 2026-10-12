"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { Check } from "lucide-react";

export function Footer() {
  const { locale } = useLanguage();
  const isRtl = locale === "ar";
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const usefulLinks = [
    { en: "About", ar: "من نحن", href: siteUrls.about(locale) },
    { en: "Services", ar: "خدماتنا", href: siteUrls.services(locale) },
    { en: "Clients", ar: "عملاؤنا", href: siteUrls.portfolio(locale) },
    { en: "Portfolio", ar: "أعمالنا", href: siteUrls.portfolio(locale) },
    { en: "Testimonials", ar: "آراء العملاء", href: siteUrls.testimonials(locale) },
    { en: "Careers", ar: "وظائف", href: siteUrls.page("careers", locale) },
    { en: "Contact", ar: "تواصل معنا", href: siteUrls.contact(locale) },
  ];

  const ourServices = [
    { en: "AI & Data Analytics", ar: "الذكاء الاصطناعي وتحليل البيانات", href: siteUrls.serviceDetail("ai-data-analytics", locale) },
    { en: "CRM & Marketing Automation", ar: "أتمتة التسويق وإدارة العملاء", href: siteUrls.serviceDetail("crm-marketing-automation", locale) },
    { en: "Marketing Technology", ar: "تكنولوجيا التسويق", href: siteUrls.serviceDetail("marketing-technology", locale) },
    { en: "SEO Services", ar: "خدمات تحسين محركات البحث", href: siteUrls.serviceDetail("seo-marketing", locale) },
    { en: "Growth Marketing", ar: "التسويق للنمو والتوسع", href: siteUrls.serviceDetail("growth-marketing", locale) },
    { en: "Web & App Development", ar: "تطوير المواقع والتطبيقات", href: siteUrls.serviceDetail("web-app-development", locale) },
    { en: "Subscription Marketing Plans", ar: "باقات التسويق بالاشتراك", href: siteUrls.serviceDetail("subscription-marketing", locale) },
    { en: "Hosting & Infrastructure", ar: "الاستضافة والبنية التحتية", href: siteUrls.serviceDetail("hosting-infrastructure", locale) },
  ];

  const partners = [
    { name: "www.weetas.com", url: "https://www.weetas.com" },
    { name: "www.homefix.bh", url: "https://www.homefix.bh" },
    { name: "www.ootlah.com", url: "https://www.ootlah.com" },
    { name: "www.dakkakeen.com", url: "https://www.dakkakeen.com" },
  ];

  return (
    <footer className="w-full">
      {/* 1. Top Section: Deep Midnight Navy matching attached design */}
      <div className="relative bg-[#010C21] text-white pt-14 pb-16 overflow-hidden border-t border-slate-900">
        {/* Subtle abstract blue wave overlay in background matching screenshot */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L80,90.7C160,117,320,171,480,186.7C640,203,800,181,960,154.7C1120,128,1280,96,1360,80L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              fill="url(#footer_gradient)"
            />
            <defs>
              <linearGradient id="footer_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0B3476" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
            {/* Column 1: USEFUL LINKS */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                {isRtl ? "روابط هامة" : "USEFUL LINKS"}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {usefulLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      {isRtl ? link.ar : link.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: OUR SERVICES */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                {isRtl ? "خدماتنا" : "OUR SERVICES"}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {ourServices.map((service, idx) => (
                  <li key={idx}>
                    <Link
                      href={service.href}
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      {isRtl ? service.ar : service.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: ADDRESS */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                {isRtl ? "العنوان" : "ADDRESS"}
              </h4>
              <div className="text-xs text-slate-300 space-y-4">
                <div className="space-y-1">
                  <p>{isRtl ? "الرياض" : "Riyadh"}</p>
                  <p>{isRtl ? "المنطقة الشرقية" : "Eastern Province"}</p>
                </div>
                <div className="space-y-1">
                  <p>{isRtl ? "جدة" : "Jeddah"}</p>
                  <p>{isRtl ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}</p>
                </div>
              </div>
            </div>

            {/* Column 4: CONTACT US & Newsletter */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                {isRtl ? "اتصل بنا" : "CONTACT US"}
              </h4>
              <div className="space-y-1 text-xs text-slate-300">
                <p className="text-slate-400">{isRtl ? "راسلنا عبر البريد:" : "Email Us"}</p>
                <a
                  href="mailto:info@smarttouch.me"
                  className="font-medium text-white hover:text-blue-300 transition-colors block"
                >
                  info@smarttouch.me
                </a>
              </div>

              {/* Circular Social Icons */}
              <div className="pt-1 flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com/SmartTouchMe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#010C21] hover:scale-110 hover:bg-slate-100 transition-all shadow-sm"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/smarttouch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#010C21] hover:scale-110 hover:bg-slate-100 transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/smarttouchme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#010C21] hover:scale-110 hover:bg-slate-100 transition-all shadow-sm"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/smarttouchme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#010C21] hover:scale-110 hover:bg-slate-100 transition-all shadow-sm"
                  aria-label="X"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              {/* Newsletter Box matching screenshot exactly */}
              <div className="pt-2">
                <form
                  onSubmit={handleSubscribe}
                  className="bg-white rounded-lg p-1 flex items-center shadow-md max-w-sm"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isRtl ? "أدخل بريدك الإلكتروني" : "Enter your email address"}
                    className="w-full px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#0B3476] hover:bg-[#08285c] text-white text-xs font-semibold rounded-md transition-colors shrink-0 shadow-sm flex items-center gap-1 cursor-pointer"
                  >
                    {isSubscribed ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-300" />
                        <span>{isRtl ? "تم!" : "Done"}</span>
                      </>
                    ) : (
                      <span>{isRtl ? "اشتراك" : "Sign Up"}</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bottom Section: Clean White Bar matching attached design */}
      <div className="bg-white py-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Official Smart Touch Logo & Copyright Notice */}
          <div className="flex flex-col items-center md:items-start space-y-1.5 text-center md:text-left">
            <Link href={siteUrls.home(locale)} className="inline-block group">
              <img
                src="/logo.png"
                alt="Smart Touch"
                className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
            </Link>
            <p className="text-[11px] text-slate-400 font-sans">
              © 2026 Smart Touch Ltd. All Rights Reserved
            </p>
          </div>

          {/* Right: OUR STRATEGIC PARTNERS and Links */}
          <div className="flex flex-col items-center md:items-end space-y-2 text-center md:text-right">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              {isRtl ? "شركاؤنا الاستراتيجيون" : "OUR STRATEGIC PARTNERS"}
            </h5>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-[11px] text-slate-500">
              {partners.map((partner, idx) => (
                <a
                  key={idx}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B3476] transition-colors duration-200"
                >
                  {partner.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
