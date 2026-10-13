"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiRequest } from "@/lib/api";

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
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
      }
    } catch (err) {
      console.warn("Could not load agency settings from API, using fallback defaults:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

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
    // Graceful fallback if called outside provider
    const cleanNumber = DEFAULT_SETTINGS.whatsapp_number.replace(/[^0-9]/g, "");
    return {
      settings: DEFAULT_SETTINGS,
      whatsappNumber: DEFAULT_SETTINGS.whatsapp_number,
      cleanWhatsappNumber: cleanNumber,
      inquiryEmail: DEFAULT_SETTINGS.inquiry_receiver_email,
      featuredPortfolios: DEFAULT_SETTINGS.featured_portfolios,
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
