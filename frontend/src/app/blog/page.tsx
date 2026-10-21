import type { Metadata } from "next";
import { BlogHubView } from "@/views/BlogHubView";

export const metadata: Metadata = {
  title: "Blog & Industry Insights | Smart Touch",
  description:
    "Expert articles and actionable guides on digital marketing, SEO, web development, AI trends, and business growth in the Gulf region.",
  alternates: {
    canonical: "https://www.smarttouch.me/en/blog.html",
    languages: {
      en: "https://www.smarttouch.me/en/blog.html",
      ar: "https://www.smarttouch.me/ar/blog.html",
      "x-default": "https://www.smarttouch.me/en/blog.html",
    },
  },
  openGraph: {
    title: "Blog & Industry Insights | Smart Touch",
    description:
      "Expert articles and actionable guides on digital marketing, SEO, web development, AI trends, and business growth in the Gulf region.",
    url: "https://www.smarttouch.me/en/blog.html",
    siteName: "Smart Touch",
    type: "website",
  },
};

export default function BlogListingPage() {
  return <BlogHubView />;
}
