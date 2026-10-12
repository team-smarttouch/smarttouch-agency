"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { siteUrls } from "@/lib/urls";
import { Globe, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname() || "/";
  const { locale, toggleLocale, t, isRtl } = useLanguage();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t("nav.home"), href: siteUrls.home(locale) },
    { name: t("nav.about"), href: siteUrls.about(locale) },
    { name: t("nav.services"), href: siteUrls.services(locale) },
    { name: t("nav.portfolio"), href: siteUrls.portfolio(locale) },
    { name: t("nav.blog"), href: siteUrls.blog(locale) },
    { name: t("nav.contact"), href: siteUrls.contact(locale) },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        {/* 1. Top Announcement Bar */}
        <div className="bg-[#000E38] text-white text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-blue-900/40">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>
            {locale === "ar"
              ? "عرض خاص: طوّر أنظمتك الرقمية وحملاتك الإعلانية بأعلى عائد استثماري • المملكة العربية السعودية"
              : "SPECIAL OFFER: GROW YOUR BUSINESS WITH ADVANCED DIGITAL SYSTEMS • RIYADH & DUBAI"}
          </span>
        </div>

        {/* 2. Main White Navbar with Official Logo */}
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Official Brand Logo */}
            <Link href={siteUrls.home(locale)} className="flex items-center group py-2">
              <img
                src="/logo.png"
                alt="Smart Touch Advertising Agency"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors py-1 relative ${
                      isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1.5 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Items */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLocale}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all"
                title="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>{locale === "en" ? "العربية" : "English"}</span>
              </button>

              {/* Primary Blue CTA Button - Navigates directly to Contact Us */}
              <Link
                href={siteUrls.contact(locale)}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <span>{locale === "ar" ? "تواصل معنا" : "Contact Us"}</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-270" : ""}`} />
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-600"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 bg-white p-6 space-y-4 shadow-xl">
              <nav className="flex flex-col gap-3 text-base font-semibold text-slate-800">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-1 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    toggleLocale();
                  }}
                  className="w-full py-2.5 rounded-lg bg-slate-100 text-sm font-bold text-slate-800 flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>{locale === "en" ? "العربية (RTL)" : "English (LTR)"}</span>
                </button>

                <Link
                  href={siteUrls.contact(locale)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-md block text-center"
                >
                  {locale === "ar" ? "تواصل معنا" : "Contact Us"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
