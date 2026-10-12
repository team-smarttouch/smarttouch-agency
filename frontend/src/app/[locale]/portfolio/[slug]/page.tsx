import { PortfolioDetailView } from "@/views/PortfolioDetailView";
import { Locale } from "@/lib/urls";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale: Locale = locale === "ar" ? "ar" : "en";

  return <PortfolioDetailView slug={slug} />;
}
