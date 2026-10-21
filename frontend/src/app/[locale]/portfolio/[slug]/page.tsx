import type { Metadata } from "next";
import { PortfolioDetailView } from "@/views/PortfolioDetailView";
import { Locale } from "@/lib/urls";
import { apiRequest, PortfolioItem } from "@/lib/api";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale: Locale = locale === "ar" ? "ar" : "en";
  const cleanSlug = slug.replace(/\.html$/, "");
  const siteUrl = "https://www.smarttouch.me";

  let item: PortfolioItem | null = null;
  try {
    const res = await apiRequest(`/portfolios/${cleanSlug}`);
    if (res?.success && res.data) {
      item = res.data;
    }
  } catch {
    // fallback gracefully
  }

  const rawTitle = item?.title
    ? (typeof item.title === "string" ? item.title : item.title[validLocale] || item.title.en)
    : cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = validLocale === "ar"
    ? `${rawTitle} | أعمال وشركاء سمارت تاتش`
    : `${rawTitle} | Portfolio Case Study | Smart Touch`;

  const description = item?.intro
    ? (typeof item.intro === "string" ? item.intro : item.intro[validLocale] || item.intro.en)
    : (validLocale === "ar"
        ? `تعرف على تفاصيل ونتائج مشروع ${rawTitle} المنفذ بواسطة وكالة سمارت تاتش للدعاية والحلول الرقمية.`
        : `Explore the ${rawTitle} case study engineered by Smart Touch digital marketing and web development agency.`);

  const canonicalUrl = `${siteUrl}/${validLocale}/portfolio/${cleanSlug}.html`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en/portfolio/${cleanSlug}.html`,
        ar: `${siteUrl}/ar/portfolio/${cleanSlug}.html`,
        "x-default": `${siteUrl}/en/portfolio/${cleanSlug}.html`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: validLocale === "ar" ? "سمارت تاتش" : "Smart Touch",
      locale: validLocale === "ar" ? "ar_AR" : "en_US",
    },
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale: Locale = locale === "ar" ? "ar" : "en";

  return <PortfolioDetailView slug={slug} />;
}
