export type Locale = "en" | "ar";

export const siteUrls = {
  home: (locale: Locale = "en") => (locale === "ar" ? "/ar/" : "/"),
  about: (locale: Locale = "en") => `/${locale}/about-us.html`,
  services: (locale: Locale = "en") => `/${locale}/services.html`,
  serviceDetail: (slug: string, locale: Locale = "en") => {
    const clean = slug.replace(/^services-/, "").replace(/\.html$/, "");
    return `/${locale}/services-${clean}.html`;
  },
  portfolio: (locale: Locale = "en") => `/${locale}/portfolio.html`,
  portfolioDetail: (slug: string, locale: Locale = "en") => {
    const clean = slug.replace(/\.html$/, "");
    return `/${locale}/portfolio/${clean}.html`;
  },
  blog: (locale: Locale = "en") => `/${locale}/blog.html`,
  blogPost: (slug: string, locale: Locale = "en") => {
    const clean = slug.replace(/\.html$/, "");
    return `/${locale}/blog/${clean}.html`;
  },
  contact: (locale: Locale = "en") => `/${locale}/contact-us.html`,
  testimonials: (locale: Locale = "en") => `/${locale}/testimonials.html`,
  page: (slug: string, locale: Locale = "en") => {
    const clean = slug.replace(/\.html$/, "");
    return `/${locale}/${clean}.html`;
  },
  dashboard: () => "/dashboard",
};

export function switchLocaleUrl(currentPath: string, targetLocale: Locale): string {
  if (currentPath.startsWith("/dashboard")) {
    return currentPath;
  }
  if (currentPath === "/" || currentPath === "/ar" || currentPath === "/ar/" || currentPath === "/en" || currentPath === "/en/") {
    return targetLocale === "ar" ? "/ar/" : "/";
  }
  if (currentPath.startsWith("/en/")) {
    return currentPath.replace(/^\/en\//, `/${targetLocale}/`);
  }
  if (currentPath.startsWith("/ar/")) {
    return currentPath.replace(/^\/ar\//, `/${targetLocale}/`);
  }
  return targetLocale === "ar" ? `/ar${currentPath}` : currentPath;
}
