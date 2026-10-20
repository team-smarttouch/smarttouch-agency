"use client";

import React from "react";
import { Locale } from "@/lib/urls";
import { AboutUsView } from "@/views/AboutUsView";
import { ServicesHubView } from "@/views/ServicesHubView";
import { ServiceDetailView } from "@/views/ServiceDetailView";
import { PortfolioView } from "@/views/PortfolioView";
import { ContactUsView } from "@/views/ContactUsView";
import { BlogHubView } from "@/views/BlogHubView";
import { TestimonialsView } from "@/views/TestimonialsView";
import { DynamicPageView } from "@/views/DynamicPageView";

interface Props {
  locale: Locale;
  slug: string;
}

export function DynamicSlugPageClient({ locale, slug }: Props) {
  // Strip .html suffix if present
  const cleanSlug = slug.replace(/\.html$/, "");

  // 1. Services Hub: services.html
  if (cleanSlug === "services") {
    return <ServicesHubView />;
  }

  // 2. Service Detail: services-[serviceSlug].html
  if (cleanSlug.startsWith("services-")) {
    const serviceSlug = cleanSlug.replace(/^services-/, "");
    return <ServiceDetailView slug={serviceSlug} />;
  }

  // 3. About Us: about-us.html
  if (cleanSlug === "about-us" || cleanSlug === "about" || cleanSlug === "clients") {
    return <AboutUsView />;
  }

  // 4. Portfolio: portfolio.html
  if (cleanSlug === "portfolio") {
    return <PortfolioView />;
  }

  // 5. Contact Us: contact-us.html
  if (cleanSlug === "contact-us" || cleanSlug === "contact") {
    return <ContactUsView />;
  }

  // 6. Blog Index: blog.html
  if (cleanSlug === "blog") {
    return <BlogHubView />;
  }

  // 7. Testimonials: testimonials.html
  if (cleanSlug === "testimonials" || cleanSlug === "testimonial") {
    return <TestimonialsView />;
  }

  // 8. Dynamic DB Page: privacy-policy.html, terms-conditions.html, etc.
  return <DynamicPageView slug={cleanSlug} />;
}
