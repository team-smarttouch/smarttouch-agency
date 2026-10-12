"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HomePage from "../page";

export default function ArabicHomePage() {
  const { setLocale, locale } = useLanguage();

  useEffect(() => {
    if (locale !== "ar") {
      setLocale("ar");
    }
  }, [locale, setLocale]);

  return <HomePage />;
}
