import type { Metadata } from "next";
import { BlogPostClient } from "./BlogPostClient";
import { Locale } from "@/lib/urls";
import { apiRequest, PostItem } from "@/lib/api";

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

  let post: PostItem | null = null;
  try {
    const res = await apiRequest(`/posts/${cleanSlug}`);
    if (res?.success && res.data) {
      post = res.data;
    }
  } catch {
    // fallback gracefully
  }

  const rawTitle = post?.title
    ? (typeof post.title === "string" ? post.title : post.title[validLocale] || post.title.en)
    : cleanSlug.replace(/-/g, " ");

  const title = validLocale === "ar"
    ? `${rawTitle} | مدونة سمارت تاتش`
    : `${rawTitle} | Smart Touch Blog`;

  const description = post?.summary
    ? (typeof post.summary === "string" ? post.summary : post.summary[validLocale] || post.summary.en)
    : (validLocale === "ar"
        ? `اقرأ مقال "${rawTitle}" من وكالة سمارت تاتش للتسويق الرقمي والحلول التقنية.`
        : `Read "${rawTitle}" on Smart Touch, leading digital marketing and web solutions agency.`);

  const canonicalUrl = `${siteUrl}/${validLocale}/blog/${cleanSlug}.html`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en/blog/${cleanSlug}.html`,
        ar: `${siteUrl}/ar/blog/${cleanSlug}.html`,
        "x-default": `${siteUrl}/en/blog/${cleanSlug}.html`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: validLocale === "ar" ? "سمارت تاتش" : "Smart Touch",
      locale: validLocale === "ar" ? "ar_AR" : "en_US",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale: Locale = locale === "ar" ? "ar" : "en";

  return <BlogPostClient locale={validLocale} slug={slug} />;
}
