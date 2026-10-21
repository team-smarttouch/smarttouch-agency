import type { Metadata } from "next";
import { HomePageView } from "@/views/HomePageView";
import { getHomepageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "شركة سمارت تاتش للتسويق الالكترونى في السعودية",
  description:
    "تقدم وكالة سمارت تاتش للتسويق الالكترونى في السعودية العديد من خدمات التسويق الرقمى مثل تطوير وتصميم المواقع وخدمات السوشيال ميديا وتحسين محركات البحث.",
  keywords:
    "شركة تسويق الكتروني, تسويق رقمي السعودية, تصميم مواقع, سوشيال ميديا, سيو, الرياض, سمارت تاتش",
  alternates: {
    canonical: "https://www.smarttouch.me/ar",
    languages: {
      en: "https://www.smarttouch.me/",
      ar: "https://www.smarttouch.me/ar",
      "x-default": "https://www.smarttouch.me/",
    },
  },
  openGraph: {
    title: "شركة سمارت تاتش للتسويق الالكترونى في السعودية",
    description:
      "تقدم وكالة سمارت تاتش للتسويق الالكترونى في السعودية العديد من خدمات التسويق الرقمى مثل تطوير وتصميم المواقع وخدمات السوشيال ميديا وتحسين محركات البحث.",
    url: "https://www.smarttouch.me/ar",
    siteName: "سمارت تاتش",
    locale: "ar_AR",
    type: "website",
  },
};

export default function ArabicHomePage() {
  const jsonLd = getHomepageSchema("ar");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageView />
    </>
  );
}
