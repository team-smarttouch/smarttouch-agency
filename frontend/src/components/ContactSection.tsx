"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { apiRequest } from "@/lib/api";
import { Mail, MapPin, Check, Loader2, CheckCircle2 } from "lucide-react";

interface ServiceOption {
  id: string;
  label: { en: string; ar: string };
}

const SERVICES_LIST: ServiceOption[] = [
  { id: "ai-data-analytics", label: { en: "AI & Data Analytics", ar: "الذكاء الاصطناعي وتحليل البيانات" } },
  { id: "crm-marketing-automation", label: { en: "CRM & Marketing Automation", ar: "إدارة علاقات العملاء وأتمتة التسويق" } },
  { id: "marketing-technology", label: { en: "Marketing Technology", ar: "تكنولوجيا التسويق والحلول الرقمية" } },
  { id: "seo-services", label: { en: "SEO Services", ar: "خدمات تحسين محركات البحث" } },
  { id: "growth-marketing", label: { en: "Growth Marketing", ar: "التسويق للنمو وتوسيع الأعمال" } },
  { id: "web-app-development", label: { en: "Web & App Development", ar: "تطوير تطبيقات الويب والجوال" } },
  { id: "subscription-marketing", label: { en: "Subscription Marketing Plans", ar: "باقات التسويق بالاشتراك الشهري" } },
  { id: "hosting-infrastructure", label: { en: "Hosting & Infrastructure", ar: "الاستضافة والبنية التحتية السحابية" } },
];

export function ContactSection() {
  const { locale, isRtl } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicesError, setServicesError] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleService = (id: string) => {
    setServicesError(false);
    if (errorMessage) setErrorMessage("");
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setServicesError(true);
      setErrorMessage(
        locale === "ar"
          ? "يرجى تحديد خدمة واحدة على الأقل من قائمة (الخدمات المطلوبة)."
          : "Please select at least one service under 'Interested in'."
      );
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const selectedLabels = SERVICES_LIST.filter((s) =>
        selectedServices.includes(s.id)
      )
        .map((s) => s.label[locale])
        .join(", ");

      const res = await apiRequest("/inquiries", {
        method: "POST",
        body: JSON.stringify({
          name: fullName,
          company: companyName,
          email: workEmail,
          phone: phoneNumber,
          service_name: selectedLabels || "General Inquiry",
          message: message,
          locale: locale,
        }),
      });

      if (res.success || res.data) {
        setIsSuccess(true);
        setFullName("");
        setCompanyName("");
        setWorkEmail("");
        setPhoneNumber("");
        setMessage("");
      } else {
        setErrorMessage(
          res.message ||
            (locale === "ar"
              ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
              : "Failed to send message. Please try again.")
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Form Card with soft blue background (#F4F7FC) */}
          <div className="lg:col-span-7 bg-[#F4F7FC] rounded-[28px] p-6 sm:p-10 border border-slate-100/60 shadow-2xs">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-slate-700 mb-2">
                  {locale === "ar" ? "الاسم الكامل*" : "Full Name*"}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={locale === "ar" ? "أدخل اسمك بالكامل" : "Jhon Smi"}
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
                />
              </div>

              {/* Company Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-slate-700 mb-2">
                    {locale === "ar" ? "اسم الشركة*" : "Company Name*"}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={
                      locale === "ar"
                        ? "أدخل اسم شركتك"
                        : "Enter your company name"
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-slate-700 mb-2">
                    {locale === "ar" ? "البريد الإلكتروني للعمل*" : "Work Email*"}
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder={
                      locale === "ar"
                        ? "أدخل بريدك الإلكتروني"
                        : "Enter your work email address"
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-slate-700 mb-2">
                  {locale === "ar" ? "رقم الهاتف*" : "Phone Number*"}
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+123 456 789"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
                />
              </div>

              {/* Interested in */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-xs sm:text-[13px] font-medium text-slate-700">
                    {locale === "ar" ? "الخدمات المطلوبة *" : "Interested in *"}
                  </label>
                  {servicesError && (
                    <span className="text-xs text-rose-600 font-semibold animate-pulse">
                      {locale === "ar"
                        ? "يرجى اختيار خدمة واحدة على الأقل"
                        : "Please select at least 1 service"}
                    </span>
                  )}
                </div>
                <div
                  className={`flex flex-wrap gap-2.5 transition-all duration-300 rounded-xl ${
                    servicesError ? "p-2 ring-2 ring-rose-400 bg-rose-50/50" : ""
                  }`}
                >
                  {SERVICES_LIST.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg text-xs font-medium bg-white transition-all cursor-pointer select-none shadow-2xs ${
                          isSelected
                            ? "border border-blue-600 text-slate-900"
                            : "border border-slate-200/90 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "border border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                          )}
                        </span>
                        <span>{service.label[locale]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-slate-700 mb-2">
                  {locale === "ar" ? "الرسالة*" : "Message*"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    locale === "ar" ? "اكتب رسالتك هنا..." : "Your message here"
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-y min-h-[130px] shadow-2xs"
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                  {errorMessage}
                </div>
              )}

              {/* Success Message Banner */}
              {isSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium rounded-lg flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    {locale === "ar"
                      ? "تم إرسال رسالتك بنجاح! سيتواصل معك فريق سمارت تاتش قريباً."
                      : "Thank you! Your message has been sent successfully. Our team will contact you shortly."}
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-sm px-7 py-2.5 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting && (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  )}
                  <span>{locale === "ar" ? "إرسال" : "Submit"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Office Photo & Get In Touch With Us Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-[28px] overflow-hidden shadow-sm aspect-[4/3.8] lg:aspect-[4/4.2] w-full bg-slate-100 border border-slate-100">
              <img
                src="/images/contact-team.jpg"
                alt="Smart Touch Corporate Team"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {locale === "ar" ? "تواصل معنا مباشرة" : "Get In Touch With Us"}
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">
                      {locale === "ar" ? "البريد الإلكتروني" : "Email Address"}
                    </span>
                    <a
                      href="mailto:info@smarttouch.me"
                      className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      info@smarttouch.me
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">
                      {locale === "ar" ? "العنوان" : "Address"}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {locale === "ar" ? "المعذر، الرياض" : "Al Maather, Riyadh"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
