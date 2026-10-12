import type { Metadata } from "next";
import { DynamicSlugPageClient } from "./DynamicSlugPageClient";
import { Locale } from "@/lib/urls";
import { getMetadataForPage } from "@/data/siteMetadata";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale: Locale = locale === "ar" ? "ar" : "en";
  return getMetadataForPage(slug, validLocale);
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale: Locale = locale === "ar" ? "ar" : "en";

  return <DynamicSlugPageClient locale={validLocale} slug={slug} />;
}
