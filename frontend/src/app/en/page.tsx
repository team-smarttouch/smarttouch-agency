import type { Metadata } from "next";
import { HomePageView } from "@/views/HomePageView";
import { getHomepageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Smart Touch | Digital Marketing Agency and Services in KSA",
  description:
    "Smart Touch is a digital marketing agency in Saudi Arabia, specializing in online marketing, web solutions, mobile apps, social media, SEO and brand transformation.",
  keywords:
    "digital marketing agency, Saudi Arabia, online marketing, web solutions, mobile apps, social media, SEO, Riyadh, KSA",
  alternates: {
    canonical: "https://www.smarttouch.me/en",
    languages: {
      en: "https://www.smarttouch.me/",
      ar: "https://www.smarttouch.me/ar",
      "x-default": "https://www.smarttouch.me/",
    },
  },
  openGraph: {
    title: "Smart Touch | Digital Marketing Agency and Services in KSA",
    description:
      "Smart Touch is a digital marketing agency in Saudi Arabia, specializing in online marketing, web solutions, mobile apps, social media, SEO and brand transformation.",
    url: "https://www.smarttouch.me/en",
    siteName: "Smart Touch",
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishHomePage() {
  const jsonLd = getHomepageSchema("en");

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
