import { BlogPostClient } from "./BlogPostClient";
import { Locale } from "@/lib/urls";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale: Locale = locale === "ar" ? "ar" : "en";

  return <BlogPostClient locale={validLocale} slug={slug} />;
}
