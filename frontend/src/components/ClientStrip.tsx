"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { apiRequest } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ClientBrand {
  id: string | number;
  name: { en: string; ar: string };
  logo: string;
  link?: string | ((locale: "en" | "ar") => string);
  alt?: string;
}

const FALLBACK_CLIENT_BRANDS: ClientBrand[] = [
  {
    id: "stc",
    name: { en: "STC", ar: "الاتصالات السعودية STC" },
    logo: "/images/clients/client_stc.png",
    link: (locale) => siteUrls.portfolioDetail("stc-tamayouz", locale),
    alt: "STC Saudi Telecom Company",
  },
  {
    id: "darwa_emaar",
    name: { en: "Dar Wa Emaar", ar: "دار وإعمار" },
    logo: "/images/clients/client_darwa_emaar.png",
    link: (locale) => siteUrls.portfolio(locale),
    alt: "Dar Wa Emaar Real Estate Development",
  },
  {
    id: "obeikan",
    name: { en: "Obeikan Education", ar: "مجموعة العبيكان" },
    logo: "/images/clients/client_obeikan.png",
    link: (locale) => siteUrls.portfolio(locale),
    alt: "Obeikan Education & Investment Group",
  },
  {
    id: "dala",
    name: { en: "Dala Water", ar: "مياه دالا" },
    logo: "/images/clients/dala-logo.png",
    link: (locale) => siteUrls.portfolioDetail("dala", locale),
    alt: "Dala Water Factory",
  },
  {
    id: "homefix",
    name: { en: "Homefix", ar: "هوم فيكس" },
    logo: "/images/clients/client_homefix.png",
    link: (locale) => siteUrls.portfolioDetail("homefix", locale),
    alt: "Homefix Maintenance & Facilities",
  },
  {
    id: "awj",
    name: { en: "AWJ Holding Company", ar: "شركة أوج القابضة" },
    logo: "/images/clients/AWJ-Holding.png",
    link: (locale) => siteUrls.portfolioDetail("awj", locale),
    alt: "AWJ Holding Company",
  },
  {
    id: "mithaq",
    name: { en: "Mithaq Holding", ar: "ميثاق القابضة" },
    logo: "/images/clients/MITHAQ-HOLDING.png",
    link: (locale) => siteUrls.portfolio(locale),
    alt: "Mithaq Holding Company",
  },
  {
    id: "jah",
    name: { en: "JAH Real Estate", ar: "جاه للتطوير العقاري" },
    logo: "/images/clients/client_jah.png",
    link: (locale) => siteUrls.portfolio(locale),
    alt: "JAH Real Estate Development",
  },
];

interface ClientStripProps {
  title?: { en: string; ar: string };
  className?: string;
}

export function ClientStrip({ title, className = "" }: ClientStripProps) {
  const { locale, isRtl } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [clients, setClients] = useState<ClientBrand[]>(FALLBACK_CLIENT_BRANDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch live clients from backend database, constrained to exactly 8 active clients
  useEffect(() => {
    let isMounted = true;
    apiRequest("/clients")
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: ClientBrand[] = res.data.slice(0, 8).map((c: any) => ({
            id: c.id,
            name: typeof c.name === "object" ? c.name : { en: c.name, ar: c.name },
            logo: c.logo,
            link: c.link || "/portfolio.html",
            alt: c.alt || (typeof c.name === "object" ? c.name.en : c.name),
          }));
          setClients(mapped);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch clients from database, using fallback:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalClients = clients.length;

  const resolveLink = (client: ClientBrand) => {
    if (typeof client.link === "function") {
      return client.link(locale);
    }
    if (typeof client.link === "string" && client.link) {
      if (client.link.startsWith("http://") || client.link.startsWith("https://")) {
        return client.link;
      }
      const clean = client.link.replace(/^\/?(en|ar)\//, "").replace(/^\//, "");
      return `/${locale}/${clean}`;
    }
    return siteUrls.portfolio(locale);
  };

  // Scroll to specific index
  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollContainerRef.current;
      if (!container || totalClients === 0) return;

      const itemWidth = container.scrollWidth / totalClients;
      const targetIndex = (index + totalClients) % totalClients;

      container.scrollTo({
        left: isRtl ? -(targetIndex * itemWidth) : targetIndex * itemWidth,
        behavior: "smooth",
      });
      setCurrentIndex(targetIndex);
    },
    [isRtl, totalClients]
  );

  const handleNext = useCallback(() => {
    scrollToIndex(currentIndex + 1);
  }, [currentIndex, scrollToIndex]);

  const handlePrev = useCallback(() => {
    scrollToIndex(currentIndex - 1);
  }, [currentIndex, scrollToIndex]);

  // Auto-slide carousel every 3.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Sync index on manual user scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || totalClients === 0) return;

    const scrollLeft = Math.abs(container.scrollLeft);
    const itemWidth = container.scrollWidth / totalClients;
    const newIndex = Math.round(scrollLeft / itemWidth) % totalClients;
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const displayTitle = title
    ? locale === "ar"
      ? title.ar
      : title.en
    : locale === "ar"
    ? "عملاؤنا"
    : "OUR CLIENTS";

  return (
    <section className={`py-14 sm:py-16 bg-white border-b border-slate-100 overflow-hidden relative select-none ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching exact attached design */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#0B1536]">
            {displayTitle}
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Clients"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:scale-110 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Clients"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:scale-110 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Scrolling Track: 5 items visible per screen on desktop matching screenshot */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex items-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory py-4 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {clients.slice(0, 8).map((client) => {
              const clientName = client.name ? (locale === "ar" ? client.name.ar : client.name.en) : "";
              const clientAlt = client.alt || clientName;

              return (
                <div
                  key={client.id}
                  className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 snap-start flex items-center justify-center"
                >
                  <Link
                    href={resolveLink(client)}
                    title={`${clientName} — ${locale === "ar" ? "عرض في معرض الأعمال" : "View in Portfolio"}`}
                    className="group/client block p-3 rounded-xl transition-all duration-300 hover:bg-slate-50/80 hover:-translate-y-1"
                  >
                    <div className="h-12 sm:h-14 w-32 sm:w-40 flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={clientAlt}
                        className="max-h-full max-w-full object-contain opacity-90 group-hover/client:opacity-100 group-hover/client:scale-105 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Dot Indicators matching exact attached design: 1 active pill bar + small circular dots */}
          <div className="flex justify-center items-center gap-1.5 mt-8">
            {clients.slice(0, 8).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to client slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === dotIdx
                    ? "w-6 h-1 rounded-full bg-[#0B1536]"
                    : "w-1.5 h-1.5 rounded-full bg-[#D1D9E6] hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
