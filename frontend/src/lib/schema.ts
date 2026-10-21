export type Locale = "en" | "ar";

export const SITE_URL = "https://www.smarttouch.me";

/**
 * Structured Data (Schema.org / JSON-LD) for the Smart Touch Homepages.
 * Identifies Smart Touch as Organization, ProfessionalService, and LocalBusiness entity.
 */
export function getHomepageSchema(locale: Locale = "en") {
  const isAr = locale === "ar";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: isAr ? "سمارت تاتش" : "Smart Touch Advertising Agency",
        legalName: isAr ? "شركة سمارت تاتش للدعاية والحلول الرقمية" : "Smart Touch Advertising Agency",
        alternateName: [
          "Smart Touch",
          "شركة سمارت تاتش للتسويق الالكتروني",
          "وكالة سمارت تاتش للدعاية والحلول الرقمية",
          "SmartTouch",
        ],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/logo.png`,
          contentUrl: `${SITE_URL}/logo.png`,
          caption: isAr ? "شعار وكالة سمارت تاتش للتسويق الالكتروني" : "Smart Touch Advertising Agency Logo",
        },
        image: `${SITE_URL}/logo.png`,
        description: isAr
          ? "تقدم وكالة سمارت تاتش للتسويق الالكترونى في السعودية العديد من خدمات التسويق الرقمى مثل تطوير وتصميم المواقع وخدمات السوشيال ميديا وتحسين محركات البحث."
          : "Smart Touch is a leading digital marketing, web development, SEO, and creative advertising agency based in Riyadh, Saudi Arabia, serving clients across KSA and the Middle East.",
        telephone: "+966537122528",
        email: "info@smarttouch.me",
        address: {
          "@type": "PostalAddress",
          streetAddress: isAr ? "حي المعذر" : "Al Maather",
          addressLocality: isAr ? "الرياض" : "Riyadh",
          addressRegion: isAr ? "منطقة الرياض" : "Riyadh Province",
          addressCountry: "SA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 24.6949,
          longitude: 46.6713,
        },
        areaServed: [
          { "@type": "Country", name: isAr ? "المملكة العربية السعودية" : "Saudi Arabia" },
          { "@type": "Country", name: isAr ? "الإمارات العربية المتحدة" : "United Arab Emirates" },
          { "@type": "City", name: isAr ? "الرياض" : "Riyadh" },
          { "@type": "City", name: isAr ? "جدة" : "Jeddah" },
          { "@type": "City", name: isAr ? "المنطقة الشرقية" : "Eastern Province" },
          { "@type": "City", name: isAr ? "دبي" : "Dubai" },
        ],
        sameAs: [
          "https://facebook.com/SmartTouchMe",
          "https://linkedin.com/company/smarttouch",
          "https://instagram.com/smarttouchme",
          "https://x.com/smarttouchme",
        ],
        priceRange: "$$",
        currenciesAccepted: "SAR, USD, AED",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: isAr ? "سمارت تاتش" : "Smart Touch",
        description: isAr
          ? "شركة سمارت تاتش للتسويق الالكترونى في السعودية"
          : "Smart Touch | Digital Marketing Agency and Services in KSA",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: ["en", "ar"],
      },
    ],
  };
}

/**
 * Structured Data for Blog Posts (BlogPosting Schema)
 */
export function getBlogPostingSchema(post: {
  title: string;
  excerpt?: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}, locale: Locale = "en") {
  const isAr = locale === "ar";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    url: post.url,
    image: post.image || `${SITE_URL}/logo.png`,
    datePublished: post.datePublished || new Date().toISOString(),
    dateModified: post.dateModified || post.datePublished || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: isAr ? "سمارت تاتش" : "Smart Touch",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: isAr ? "سمارت تاتش" : "Smart Touch",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
    inLanguage: locale,
  };
}
