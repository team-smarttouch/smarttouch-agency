"use client";

import React from "react";
import { FigmaHero } from "@/components/FigmaHero";
import { ClientStrip } from "@/components/ClientStrip";
import { AboutSection } from "@/components/AboutSection";
import { StatsBanner } from "@/components/StatsBanner";
import { ServicesGrid } from "@/components/ServicesGrid";
import { AroundTheWorld } from "@/components/AroundTheWorld";
import { MeetOurTeam } from "@/components/MeetOurTeam";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { PricingPackages } from "@/components/PricingPackages";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { BlogPreview } from "@/components/BlogPreview";

export function HomePageView() {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* 1. WE BUILD THE SYSTEMS Headline & Hero Banner with 3D Glowing Sphere */}
      <FigmaHero />

      {/* 2. Partner Brand Logos Strip on White */}
      <ClientStrip />

      {/* 3. "About Smart Touch" with Elevated Browser Mockup & Story */}
      <AboutSection />

      {/* 4. Navy Stats Ribbon (200+, 300+, 97%, 10) */}
      <StatsBanner />

      {/* 5. "Our Services" (8-Card Grid with Featured Blue Card & Want To Get Started Banner) */}
      <ServicesGrid />

      {/* 6. "Around the World" (3D Digital Earth Globe with 3 Glassmorphism Chips) */}
      <AroundTheWorld />

      {/* 7. "Meet Our Team" (Social Tabs, Collaboration Photo with Floating Dark Card) */}
      <MeetOurTeam />

      {/* 8. "Our Selected Work" (3 Project Cards with Middle Dark Blue Featured Card) */}
      <PortfolioShowcase />

      {/* 9. "Choose the Right Plan for You" ($1,000, $2,000, $5,000 Pricing Cards) */}
      <PricingPackages />

      {/* 10. "What Our Customers Think" (4 Client Review Cards on Dark Navy) */}
      <TestimonialsSection />

      {/* 11. "Frequently Asked Questions" (2-Column Accordion on White) */}
      <FaqSection />

      {/* 12. "Latest Insights" (3 Blog Cards on White with Newsletter Strip) */}
      <BlogPreview />
    </div>
  );
}
