"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HomePage from "../page";

export default function EnglishHomePage() {
  const { setLocale, locale } = useLanguage();

  useEffect(() => {
    if (locale !== "en") {
      setLocale("en");
    }
  }, [locale, setLocale]);

  return <HomePage />;
}
