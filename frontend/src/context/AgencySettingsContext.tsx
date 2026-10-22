"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiRequest } from "@/lib/api";

export interface ProcessStepItem {
  step: number;
  label: { en: string; ar: string };
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
}

export interface ProcessSectionData {
  heading: { en: string; ar: string };
  overview: { en: string; ar: string };
  steps: ProcessStepItem[];
}

export const DEFAULT_HOMEPAGE_PROCESS: ProcessSectionData = {
  heading: {
    en: "Here’s Our Process",
    ar: "منهجية عملنا",
  },
  overview: {
    en: "At Smart Touch, we first begin our work by understanding the nature of your work, addressing the problems that bother you and the needs that will facilitate your work, and then we develop customized strategies and solutions to solve those problems and achieve your goals. Throughout this process, we measure performance and improve solutions in order to achieve the best results. Since we believe that improvement is an ongoing process, we repeat these steps regularly to keep pace with evolving business needs and to continually improve our strategies to ensure results.",
    ar: "في سمارت تاتش نبدأ عملنا أولاً بفهم طبيعة العمل الخاصة بك، وتناول المشكلات التي تزعجك والاحتياجات التي من شأنها أن تسهل عملك، ومن ثم نضع استراتيجيات وحلول مخصصة لحل تلك المشكلات وتحقيق الأهداف. أثناء ذلك نقوم بقياس الأداء وتحسين الحلول من أجل تحقيق أفضل النتائج. ولأننا نؤمن بأن التطوير عملية مستمرة، نكرر تلك الخطوات بشكل دوري لنواكب تطور احتياجات العمل، ولكي نحسن استراتيجياتنا باستمرار لضمان تحقيق النتائج.",
  },
  steps: [
    {
      step: 1,
      label: {
        en: "Client onboarding.",
        ar: "بدء التعاون مع العميل.",
      },
      title: {
        en: "1. Client Onboarding",
        ar: "١. بدء التعاون مع العميل",
      },
      desc: {
        en: "We first begin our work by understanding the nature of your work, establishing direct collaboration, and identifying the key requirements to facilitate your operations.",
        ar: "نبدأ عملنا أولاً بفهم طبيعة العمل الخاصة بك، وبناء شراكة تعاونية مباشرة، وتحديد الاحتياجات الأساسية التي تيسر أعمالك.",
      },
    },
    {
      step: 2,
      label: {
        en: "Analyzing Needs and Challenges.",
        ar: "تحليل الاحتياجات والتحديات.",
      },
      title: {
        en: "2. Analyzing Needs and Challenges",
        ar: "٢. تحليل الاحتياجات والتحديات",
      },
      desc: {
        en: "Addressing the problems that bother you and analyzing deep market dynamics to prepare targeted solutions tailored to your unique circumstances.",
        ar: "تناول المشكلات والتحديات التي تواجهك بدقة، وتحليل متطلبات السوق لصياغة حلول واستراتيجيات موجهة تلائم طبيعة نشاطك.",
      },
    },
    {
      step: 3,
      label: {
        en: "Providing Suitable Solutions.",
        ar: "تقديم الحلول المناسبة.",
      },
      title: {
        en: "3. Providing Suitable Solutions",
        ar: "٣. تقديم الحلول المناسبة",
      },
      desc: {
        en: "Developing customized strategies and engineering high-impact digital solutions to solve those problems and achieve your strategic business goals.",
        ar: "وضع وتطوير استراتيجيات وحلول رقمية وتسويقية مخصصة لحل تلك المشكلات وتحقيق أهدافك بكفاءة وفاعلية.",
      },
    },
    {
      step: 4,
      label: {
        en: "Measuring Results and Continuous Improvement.",
        ar: "قياس النتائج والتطوير المستمر.",
      },
      title: {
        en: "4. Measuring Results & Continuous Improvement",
        ar: "٤. قياس النتائج والتطوير المستمر",
      },
      desc: {
        en: "Measuring performance and improving solutions continuously. We repeat these steps regularly to keep pace with evolving business needs and ensure sustained results.",
        ar: "قياس الأداء وتحسين الحلول باستمرار لتحقيق أفضل النتائج. نكرر تلك الخطوات دورياً لمواكبة تطور احتياجات العمل وضمان استمرارية النجاح.",
      },
    },
  ],
};

interface AgencySettings {
  whatsapp_number: string;
  inquiry_receiver_email: string;
  featured_portfolios: string[];
}

interface AgencySettingsContextType {
  settings: AgencySettings;
  whatsappNumber: string;
  cleanWhatsappNumber: string;
  inquiryEmail: string;
  featuredPortfolios: string[];
  homepageProcess: ProcessSectionData;
  updateHomepageProcess: (data: ProcessSectionData) => Promise<boolean>;
  getWhatsAppUrl: (greeting?: string) => string;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const DEFAULT_SETTINGS: AgencySettings = {
  whatsapp_number: "+966537122528",
  inquiry_receiver_email: "info@smarttouch.me",
  featured_portfolios: ["homefix", "dala", "weetas"],
};

const AgencySettingsContext = createContext<AgencySettingsContextType | undefined>(undefined);

export function AgencySettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AgencySettings>(DEFAULT_SETTINGS);
  const [homepageProcess, setHomepageProcess] = useState<ProcessSectionData>(DEFAULT_HOMEPAGE_PROCESS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    // 1. Initial check from localStorage for instant offline/fast load
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("smarttouch_homepage_process");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.heading && parsed.steps) {
            setHomepageProcess(parsed);
          }
        }
      } catch (e) {
        console.warn("Could not read local homepage process:", e);
      }
    }

    try {
      const res = await apiRequest("/settings");
      if (res?.data) {
        setSettings({
          whatsapp_number: res.data.whatsapp_number || DEFAULT_SETTINGS.whatsapp_number,
          inquiry_receiver_email: res.data.inquiry_receiver_email || DEFAULT_SETTINGS.inquiry_receiver_email,
          featured_portfolios: Array.isArray(res.data.featured_portfolios) && res.data.featured_portfolios.length === 3
            ? res.data.featured_portfolios
            : DEFAULT_SETTINGS.featured_portfolios,
        });

        if (res.data.homepage_process && res.data.homepage_process.heading) {
          setHomepageProcess(res.data.homepage_process);
          if (typeof window !== "undefined") {
            localStorage.setItem("smarttouch_homepage_process", JSON.stringify(res.data.homepage_process));
          }
        }
      }
    } catch (err) {
      console.warn("Could not load agency settings from API, using fallback defaults:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    // Listen to local storage changes across tabs or windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "smarttouch_homepage_process" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && parsed.heading) {
            setHomepageProcess(parsed);
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateHomepageProcess = async (newData: ProcessSectionData): Promise<boolean> => {
    setHomepageProcess(newData);
    if (typeof window !== "undefined") {
      localStorage.setItem("smarttouch_homepage_process", JSON.stringify(newData));
      // Dispatch custom storage event for same-window updates
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "smarttouch_homepage_process",
          newValue: JSON.stringify(newData),
        })
      );
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("smarttouch_token") : null;
      await apiRequest(
        "/dashboard/homepage-process",
        {
          method: "POST",
          body: JSON.stringify({ homepage_process: newData }),
        },
        token || undefined
      );
      return true;
    } catch (err) {
      console.warn("Saved homepage process locally (API save deferred):", err);
      return true;
    }
  };

  const cleanWhatsappNumber = (settings.whatsapp_number || "").replace(/[^0-9]/g, "") || "966537122528";

  const getWhatsAppUrl = (greeting?: string) => {
    const text = greeting || "Hello Smart Touch, I would like to inquire about your services.";
    return `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AgencySettingsContext.Provider
      value={{
        settings,
        whatsappNumber: settings.whatsapp_number,
        cleanWhatsappNumber,
        inquiryEmail: settings.inquiry_receiver_email,
        featuredPortfolios: settings.featured_portfolios,
        homepageProcess,
        updateHomepageProcess,
        getWhatsAppUrl,
        isLoading,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </AgencySettingsContext.Provider>
  );
}

export function useAgencySettings() {
  const ctx = useContext(AgencySettingsContext);
  if (!ctx) {
    const cleanNumber = DEFAULT_SETTINGS.whatsapp_number.replace(/[^0-9]/g, "");
    return {
      settings: DEFAULT_SETTINGS,
      whatsappNumber: DEFAULT_SETTINGS.whatsapp_number,
      cleanWhatsappNumber: cleanNumber,
      inquiryEmail: DEFAULT_SETTINGS.inquiry_receiver_email,
      featuredPortfolios: DEFAULT_SETTINGS.featured_portfolios,
      homepageProcess: DEFAULT_HOMEPAGE_PROCESS,
      updateHomepageProcess: async () => true,
      getWhatsAppUrl: (greeting?: string) =>
        `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
          greeting || "Hello Smart Touch, I would like to inquire about your services."
        )}`,
      isLoading: false,
      refreshSettings: async () => {},
    };
  }
  return ctx;
}
