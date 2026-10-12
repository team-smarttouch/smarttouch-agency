import { DynamicSlugPageClient } from "./DynamicSlugPageClient";
import { Locale } from "@/lib/urls";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale: Locale = locale === "ar" ? "ar" : "en";

  return <DynamicSlugPageClient locale={validLocale} slug={slug} />;
}
