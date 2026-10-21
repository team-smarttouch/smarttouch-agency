import { Metadata } from "next";

export interface PageMetadata {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  keywords: { en: string; ar: string };
}

export const SITE_METADATA: Record<string, PageMetadata> = {
  // 1. Home
  home: {
    title: {
      en: "Smart Touch | Digital Marketing Agency and Services in KSA",
      ar: "شركة سمارت تاتش للتسويق الالكترونى في السعودية",
    },
    description: {
      en: "Smart Touch is a digital marketing agency in Saudi Arabia, specializing in online marketing, web solutions, mobile apps, social media, SEO and brand transformation.",
      ar: "تقدم وكالة سمارت تاتش للتسويق الالكترونى في السعودية العديد من خدمات التسويق الرقمى مثل تطوير وتصميم المواقع وخدمات السوشيال ميديا وتحسين محركات البحث.",
    },
    keywords: {
      en: "digital marketing agency, Saudi Arabia, online marketing, web solutions, mobile apps, social media, SEO, Riyadh, KSA",
      ar: "شركة تسويق الكتروني, تسويق رقمي السعودية, تصميم مواقع, سوشيال ميديا, سيو, الرياض, سمارت تاتش",
    },
  },

  // 2. About Us
  "about-us": {
    title: {
      en: "About Us | Digital Marketing & Web Solutions Agency | Smart Touch",
      ar: "من نحن | وكالة سمارت تاتش للتسويق والتطوير الرقمي",
    },
    description: {
      en: "Learn about Smart Touch, a leading digital marketing and web solutions agency in Saudi Arabia and the Gulf, our mission, vision, and high-performance creative team.",
      ar: "تعرف على سمارت تاتش، وكالة التسويق الرقمي وتطوير الويب الرائدة في المملكة العربية السعودية والخليج، رؤيتنا ورسالتنا وفريق عملنا المتميز.",
    },
    keywords: {
      en: "about smart touch, digital agency Saudi Arabia, web solutions, creative marketing team, Riyadh advertising agency",
      ar: "من نحن, سمارت تاتش, وكالة تسويق رقمي, تاريخ الشركة, الرياض, حلول رقمية",
    },
  },

  // 3. Services Hub
  services: {
    title: {
      en: "Our Services | Digital Marketing, SEO & Web Development | Smart Touch",
      ar: "خدماتنا | التسويق الرقمي وتطوير المواقع والتطبيقات | سمارت تاتش",
    },
    description: {
      en: "Explore Smart Touch's full range of services: Web & Mobile App Development, SEO, Growth Marketing, CRM Automation, AI Solutions, and Branding.",
      ar: "استكشف خدمات سمارت تاتش المتكاملة: تطوير المواقع والتطبيقات، السيو، التسويق للنمو، أتمتة CRM، حلول الذكاء الاصطناعي، والهوية التجارية.",
    },
    keywords: {
      en: "digital marketing services, SEO services, web development, app development, marketing automation, AI marketing, Saudi Arabia",
      ar: "خدمات التسويق الرقمي, خدمات السيو, تطوير المواقع, تطبيقات الجوال, أتمتة التسويق, الرياض",
    },
  },

  // 4. SEO Services / SEO Marketing & Growth
  "seo-services": {
    title: {
      en: "SEO Services in Saudi Arabia & Gulf | Smart Touch",
      ar: "خدمات تحسين محركات البحث في السعودية والخليج | سمارت تاتش",
    },
    description: {
      en: "Dominate Google search results, map pack, and AI search engines with custom bilingual SEO strategies, technical auditing, and high-authority search PR.",
      ar: "تصدر نتائج بحث جوجل وحزمة الخرائط ومحركات الذكاء الاصطناعي باستراتيجيات سيو احترافية، تدقيق تقني، ومحتوى متوافق مع معايير محركات البحث.",
    },
    keywords: {
      en: "SEO services Saudi Arabia, search engine optimization Riyadh, technical SEO, Arabic SEO, Google ranking GCC, SEO consultant",
      ar: "خدمات سيو السعودية, تحسين محركات البحث بالرياض, سيو عربي, تصدر نتائج جوجل, تدقيق سيو تقني",
    },
  },
  "seo-marketing": {
    title: {
      en: "SEO Marketing & Growth | Top Google Rankings | Smart Touch",
      ar: "التسويق وتحسين محركات البحث (SEO) | سمارت تاتش",
    },
    description: {
      en: "Dominate Google search results, map pack, and AI search engines with custom bilingual SEO strategies, technical auditing, and high-authority search PR.",
      ar: "تصدر نتائج بحث جوجل وحزمة الخرائط ومحركات الذكاء الاصطناعي باستراتيجيات سيو احترافية، تدقيق تقني، ومحتوى متوافق مع معايير محركات البحث.",
    },
    keywords: {
      en: "SEO marketing, growth SEO, technical SEO audit, Google first page, search engine marketing KSA",
      ar: "تسويق السيو, تحسين محركات البحث, تصدر جوجل, حملات سيو الرياض, سمارت تاتش",
    },
  },

  // 5. Web & App Development
  "web-app-development": {
    title: {
      en: "Web & App Development Services | Smart Touch",
      ar: "خدمات تطوير المواقع والتطبيقات | سمارت تاتش",
    },
    description: {
      en: "Custom websites, e-commerce stores, and high-performance mobile applications engineered with Next.js, React Native, and Laravel APIs.",
      ar: "تطوير مواقع ومتاجر إلكترونية وتطبيقات جوال مخصصة وفق أهداف أعمالك بأحدث التقنيات وأعلى معايير السرعة والأمان.",
    },
    keywords: {
      en: "web development Saudi Arabia, mobile app development Riyadh, custom software, Next.js agency, Laravel agency",
      ar: "تطوير مواقع السعودية, تصميم متاجر الكترونية, برمجة تطبيقات جوال, الرياض, سمارت تاتش",
    },
  },

  // 6. CRM & Marketing Automation
  "crm-marketing-automation": {
    title: {
      en: "CRM & Marketing Automation Services | Smart Touch",
      ar: "إدارة علاقات العملاء والأتمتة التسويقية | سمارت تاتش",
    },
    description: {
      en: "Certified CRM setup on HubSpot, Salesforce, Zoho, and Odoo with WhatsApp and email marketing automation pipelines.",
      ar: "تهيئة أنظمة CRM معتمدة على هب سبوت وسيلزفورس وزوهو مع أتمتة رسائل الواتساب والإيميل لرفع معدلات التحويل والمبيعات.",
    },
    keywords: {
      en: "CRM automation Saudi Arabia, WhatsApp automation, email marketing pipelines, HubSpot Salesforce integration",
      ar: "أتمتة التسويق, نظام CRM السعودية, أتمتة واتساب, ربط هب سبوت, مسارات المبيعات",
    },
  },

  // 7. AI & Data Analytics
  "ai-data-analytics": {
    title: {
      en: "AI & Data Analytics Marketing Solutions | Smart Touch",
      ar: "حلول الذكاء الاصطناعي وتحليل البيانات التسويقية | سمارت تاتش",
    },
    description: {
      en: "AI content generation, predictive analytics, and automated marketing data warehouses engineered for modern enterprise scale.",
      ar: "أنظمة توليد المحتوى، التحليلات التنبؤية، ومستودعات البيانات التسويقية بالذكاء الاصطناعي لدعم اتخاذ القرارات الاستثمارية.",
    },
    keywords: {
      en: "AI marketing solutions, data analytics Saudi Arabia, predictive marketing, automated reporting, business intelligence",
      ar: "ذكاء اصطناعي تسويقي, تحليل بيانات, نمذجة تنبؤية, أتمتة البيانات, السعودية",
    },
  },

  // 8. Marketing Technology (MarTech)
  "marketing-technology": {
    title: {
      en: "Marketing Technology (MarTech) Solutions | Smart Touch",
      ar: "حلول تكنولوجيا التسويق (MarTech) | سمارت تاتش",
    },
    description: {
      en: "Connect your marketing stack, build custom attribution systems, and eliminate manual reporting across digital channels.",
      ar: "ربط وتكامل الأدوات التسويقية، وتطوير لوحات تحكم وإسناد مخصصة تزيد من كفاءة وعائد حملاتك الرقمية.",
    },
    keywords: {
      en: "MarTech solutions, marketing attribution, conversion tracking, analytics integration, server-side tracking",
      ar: "تكنولوجيا التسويق, تتبع التحويلات, تكامل المنصات, تحليلات التسويق",
    },
  },

  // 9. Growth Marketing
  "growth-marketing": {
    title: {
      en: "Growth Marketing & Performance Marketing | Smart Touch",
      ar: "تسويق النمو والتسويق بالأداء | سمارت تاتش",
    },
    description: {
      en: "Scale your revenue with Google Ads, Meta Ads, Conversion Rate Optimization, and App Growth Marketing across KSA and GCC.",
      ar: "ضاعف إيراداتك مع إعلانات جوجل، ميتا، تحسين معدلات التحويل، وتسويق نمو التطبيقات بأعلى عائد استثماري.",
    },
    keywords: {
      en: "growth marketing, performance marketing Saudi Arabia, Google Ads management, conversion rate optimization, CRO",
      ar: "تسويق النمو, تسويق الأداء, اعلانات جوجل السعودية, تحسين التحويلات, الرياض",
    },
  },

  // 10. Subscription Marketing
  "subscription-marketing": {
    title: {
      en: "Subscription Marketing Plans | Smart Touch",
      ar: "باقات التسويق بالاشتراك الشهري | سمارت تاتش",
    },
    description: {
      en: "Flexible monthly digital marketing subscription plans without long term contracts for growing businesses.",
      ar: "باقات تسويق رقمي شهرية مرنة دون عقود طويلة تلائم مختلف مراحل نمو الشركات والمؤسسات.",
    },
    keywords: {
      en: "marketing subscription plans, monthly retainer agency, flexible marketing plans Saudi Arabia",
      ar: "باقات تسويق شهرية, اشتراك تسويق رقمي, باقات سمارت تاتش",
    },
  },

  // 11. Cloud Infrastructure
  "cloud-infrastructure": {
    title: {
      en: "Managed Cloud Hosting & Infrastructure | Smart Touch",
      ar: "الاستضافة السحابية المدارة والبنية التحتية | سمارت تاتش",
    },
    description: {
      en: "Reliable managed cloud hosting on AWS, Google Cloud, and Azure with 99.9% uptime and 24/7 monitoring.",
      ar: "استضافة سحابية مدارة على AWS و Google Cloud و Azure مع مراقبة مدار الساعة وحماية متقدمة.",
    },
    keywords: {
      en: "managed cloud hosting, AWS Saudi Arabia, enterprise cloud infrastructure, DevOps",
      ar: "استضافة سحابية مدارة, سيرفرات سحابية, إدارة خوادم, سمارت تاتش",
    },
  },

  // 12. Portfolio
  portfolio: {
    title: {
      en: "Our Work & Case Studies | Smart Touch Portfolio",
      ar: "أعمالنا ودراسات الحالة | معرض أعمال سمارت تاتش",
    },
    description: {
      en: "Discover our portfolio of successful digital projects, custom web platforms, mobile apps, and brand transformations in Saudi Arabia and the GCC.",
      ar: "استعرض سابقة أعمالنا الناجحة في تطوير المنصات الرقمية، تطبيقات الجوال، والحملات التسويقية والهويات التجارية في السعودية والخليج.",
    },
    keywords: {
      en: "portfolio, case studies, client work, web design portfolio, digital marketing cases, Saudi Arabia",
      ar: "معرض الأعمال, سابقة أعمال, دراسات حالة, مشاريع سمارت تاتش, تصميم مواقع",
    },
  },

  // 13. Blog
  blog: {
    title: {
      en: "Blog & Industry Insights | Smart Touch",
      ar: "المدونة والمقالات المتخصصة | سمارت تاتش",
    },
    description: {
      en: "Expert articles and actionable guides on digital marketing, SEO, web development, AI trends, and business growth in the Gulf region.",
      ar: "مقالات حصرية ونصائح عملية في التسويق الرقمي، تحسين محركات البحث، تطوير الويب، واتجاهات الذكاء الاصطناعي لرواد الأعمال.",
    },
    keywords: {
      en: "digital marketing blog, SEO tips Saudi Arabia, web development trends, AI marketing insights",
      ar: "مدونة تسويق, نصائح سيو, مقالات تسويق رقمي, تطوير الويب, تجارة الكترونية",
    },
  },

  // 14. Contact Us
  "contact-us": {
    title: {
      en: "Contact Us | Get in Touch with Smart Touch Agency",
      ar: "تواصل معنا | وكالة سمارت تاتش للدعاية والتسويق",
    },
    description: {
      en: "Ready to elevate your digital presence? Contact Smart Touch in Riyadh and Dubai. Start your project discussion today.",
      ar: "جاهز لتطوير أعمالك وحضورك الرقمي؟ تواصل مع فريق سمارت تاتش في الرياض ودبي لمناقشة مشروعك والحصول على استشارة متخصصة.",
    },
    keywords: {
      en: "contact smart touch, hire digital agency Riyadh, digital marketing consultation, Dubai agency",
      ar: "اتصل بنا, تواصل مع سمارت تاتش, استشارة تسويقية, الرياض, دبي, رقم سمارت تاتش",
    },
  },

  // 15. Testimonials
  testimonials: {
    title: {
      en: "Client Reviews & Testimonials | Smart Touch",
      ar: "آراء وتوصيات عملائنا | سمارت تاتش",
    },
    description: {
      en: "Read authentic reviews and feedback from enterprise clients and partners across Saudi Arabia and the GCC.",
      ar: "اقرأ تجارب وآراء شركاء النجاح والعملاء الذين وثقوا في خدمات سمارت تاتش الرقمية والإعلانية.",
    },
    keywords: {
      en: "client reviews, testimonials, customer ratings, Smart Touch feedback",
      ar: "توصيات العملاء, تقييمات سمارت تاتش, آراء الشركاء",
    },
  },

  // 16. Privacy Policy
  "privacy-policy": {
    title: {
      en: "Privacy Policy | Smart Touch",
      ar: "سياسة الخصوصية | سمارت تاتش",
    },
    description: {
      en: "Learn how Smart Touch collects, protects, and handles your personal data across our digital marketing and web services.",
      ar: "تعرف على كيفية جمع وحماية ومعالجة بياناتك في سمارت تاتش عبر خدماتنا الرقمية والتسويقية.",
    },
    keywords: {
      en: "privacy policy, data protection, Smart Touch legal",
      ar: "سياسة الخصوصية, حماية البيانات, شروط سمارت تاتش",
    },
  },

  // 17. Terms of Service
  "terms-conditions": {
    title: {
      en: "Terms & Conditions | Smart Touch",
      ar: "الشروط والأحكام | سمارت تاتش",
    },
    description: {
      en: "Review the terms and contractual conditions governing our digital marketing, software development, and consultancy services.",
      ar: "شروط وأحكام استخدام خدمات سمارت تاتش في التسويق الرقمي وتطوير البرمجيات والاستشارات.",
    },
    keywords: {
      en: "terms of service, legal conditions, contract terms, Smart Touch",
      ar: "الشروط والأحكام, اتفاقية الاستخدام, شروط التعاقد",
    },
  },
};

/**
 * Generate Next.js Metadata for any given page key and locale.
 */
export function getMetadataForPage(pageKey: string, locale: "en" | "ar" = "en"): Metadata {
  const cleanKey = pageKey.replace(/^services-/, "").replace(/\.html$/, "").toLowerCase().trim();

  // Aliases mapping
  const aliases: Record<string, string> = {
    about: "about-us",
    "man-nahnu": "about-us",
    contact: "contact-us",
    "itissal-bina": "contact-us",
    testimonial: "testimonials",
    "ara-al-umala": "testimonials",
    "seo-marketing-growth": "seo-services",
    "khadamat-seo": "seo-services",
    "web-design": "web-app-development",
    "web-development": "web-app-development",
  };

  const resolvedKey = aliases[cleanKey] || cleanKey;
  const meta = SITE_METADATA[resolvedKey] || SITE_METADATA.home;

  const title = meta.title[locale] || meta.title.en;
  const description = meta.description[locale] || meta.description.en;
  const keywords = meta.keywords[locale] || meta.keywords.en;

  const siteUrl = "https://www.smarttouch.me";
  const canonicalUrl = `${siteUrl}/${locale}/${pageKey.replace(/\.html$/, "")}.html`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en/${pageKey.replace(/\.html$/, "")}.html`,
        ar: `${siteUrl}/ar/${pageKey.replace(/\.html$/, "")}.html`,
        "x-default": `${siteUrl}/en/${pageKey.replace(/\.html$/, "")}.html`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: locale === "ar" ? "سمارت تاتش" : "Smart Touch",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
    },
  };
}
