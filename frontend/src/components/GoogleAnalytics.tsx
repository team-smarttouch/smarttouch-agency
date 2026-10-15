"use client";

import React, { useEffect, useMemo, Suspense } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

export const GTAG_CONFIG = {
  blog: {
    en: "G-DJLV3BYHX5",
    ar: "G-TSDF7F65CX",
  },
  website: {
    en: "G-DJLV3BYHX5",
    ar: "G-TSDF7F65CX",
  },
};

export function getGtagId(pathname: string): string {
  const p = (pathname || "/").toLowerCase();
  const isArabic = p === "/ar" || p.startsWith("/ar/") || p.startsWith("/ar");
  const isBlog = p.includes("/blog") || p.includes("blog.html");
  const locale = isArabic ? "ar" : "en";

  return isBlog ? GTAG_CONFIG.blog[locale] : GTAG_CONFIG.website[locale];
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

function GoogleAnalyticsInner() {
  const pathname = usePathname() || "/";
  const currentTagId = useMemo(() => getGtagId(pathname), [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = window.gtag || gtag;

    // Send pageview on route / locale changes
    window.gtag("config", currentTagId, {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname, currentTagId]);

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        key={`gtag-src-${currentTagId}`}
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${currentTagId}`}
      />
      <Script
        key={`gtag-inline-${currentTagId}`}
        id={`gtag-init-${currentTagId}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${currentTagId}');
          `,
        }}
      />
    </>
  );
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}
