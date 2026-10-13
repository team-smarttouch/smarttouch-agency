"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useLanguage } from "@/context/LanguageContext";
import { apiRequest, ServiceItem } from "@/lib/api";
import { FALLBACK_SERVICES } from "@/data/fallbackServices";
import { Send, CheckCircle2, Sparkles, Building2, Mail, User, Phone, DollarSign } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceId?: number;
  defaultServiceName?: string;
}

export function InquiryModal({ isOpen, onClose, defaultServiceId, defaultServiceName }: InquiryModalProps) {
  const { t, locale, isRtl, getLocalized } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>(FALLBACK_SERVICES);
  const [serviceId, setServiceId] = useState<string>(defaultServiceId ? String(defaultServiceId) : "");
  const [serviceName, setServiceName] = useState<string>(defaultServiceName || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [budgetRange, setBudgetRange] = useState("$10k - $25k");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (defaultServiceId) {
      setServiceId(String(defaultServiceId));
    }
    if (defaultServiceName) {
      setServiceName(defaultServiceName);
    }
  }, [defaultServiceId, defaultServiceName]);

  useEffect(() => {
    if (isOpen) {
      apiRequest("/services")
        .then((res) => {
          if (res.success && res.data) {
            setServices(res.data);
          }
        })
        .catch(console.error);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const selectedService = services.find((s) => String(s.id) === serviceId);
      const chosenServiceName = selectedService ? getLocalized(selectedService.title) : serviceName;

      await apiRequest("/inquiries", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          service_id: serviceId ? Number(serviceId) : null,
          service_name: chosenServiceName,
          budget_range: budgetRange,
          message,
          locale,
        }),
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setMessage("");
      }, 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetOptions = [
    { label: "< $5,000", value: "< $5k" },
    { label: "$5,000 - $10,000", value: "$5k - $10k" },
    { label: "$10,000 - $25,000", value: "$10k - $25k" },
    { label: "$25,000+", value: "+$25k" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      {isSuccess ? (
        <div className="text-center py-10 px-4 space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white">{t("inquiry.successTitle")}</h3>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">{t("inquiry.successDesc")}</p>
        </div>
      ) : (
        <div>
          <div className="mb-6 text-center sm:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {locale === "ar" ? "ابدأ شراكتك الرقمية" : "Accelerate Your Growth"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{t("inquiry.title")}</h2>
            <p className="text-slate-400 text-sm mt-1">{t("inquiry.subtitle")}</p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  {t("inquiry.name")} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={locale === "ar" ? "مثال: أحمد عبد الله" : "e.g. Alexander Vance"}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  {t("inquiry.email")} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  {t("inquiry.phone")}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  {t("inquiry.company")}
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Global Inc."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t("inquiry.service")}
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              >
                <option value="">{locale === "ar" ? "-- اختر الخدمة --" : "-- Select a Service --"}</option>
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {getLocalized(srv.title)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                {t("inquiry.budget")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setBudgetRange(opt.value)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                      budgetRange === opt.value
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t("inquiry.message")} *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  locale === "ar"
                    ? "أخبرنا عن أهدافك، المنصات المطلوبة، والجدول الزمني المقترح..."
                    : "Share your business objectives, target deliverables, and timeline..."
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t("inquiry.sending")}</span>
                  </>
                ) : (
                  <>
                    <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                    <span>{t("inquiry.submit")}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
