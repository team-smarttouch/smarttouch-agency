"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { apiRequest, ServiceItem } from "@/lib/api";
import { InquiryModal } from "@/components/InquiryModal";
import { ArrowLeft, CheckCircle2, Sparkles, Send, ArrowUpRight } from "lucide-react";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : "";
  const { locale, isRtl, getLocalized, t } = useLanguage();
  const [service, setService] = useState<ServiceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Embedded inquiry form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      apiRequest(`/services/${slug}`)
        .then((res) => {
          if (res.success && res.data) {
            setService(res.data);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [slug]);

  const handleEmbeddedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    setIsSubmitting(true);

    try {
      await apiRequest("/inquiries", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          service_id: service.id,
          service_name: getLocalized(service.title),
          message,
          locale,
        }),
      });

      setIsSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Service Not Found</h2>
        <p className="text-slate-400 mb-6">The requested service offering does not exist or has been retired.</p>
        <Link href="/#services" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold">
          Return to Services
        </Link>
      </div>
    );
  }

  const title = getLocalized(service.title);
  const shortDesc = getLocalized(service.short_description);
  const fullContent = getLocalized(service.full_content);

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          <span>{locale === "ar" ? "?????? ????? ???????" : "Back to All Services"}</span>
        </Link>

        {/* Hero Banner for Service */}
        <div className="rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "???? ?????? ??????" : "Enterprise Offering"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed">
              {shortDesc}
            </p>

            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
            >
              <span>{locale === "ar" ? "??? ??????? ?? ??? ???" : "Request Custom Proposal"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Deep Content & Features */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-8 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {locale === "ar" ? "???? ????? ???????? ???????" : "Execution Framework & Scope"}
              </h3>
              <div className="text-slate-300 leading-relaxed space-y-4 text-base">
                <p>{fullContent || shortDesc}</p>
                <p>
                  {locale === "ar"
                    ? "??? ????? ?? ????? ????? ????? ?????? ?????? ?? ????? ?????? ?????? ???????? ?????? ????? ??????? ????? ????? ????? ???? ??? ?????? ????????."
                    : "Our strategic delivery pipeline pairs specialized engineering with performance telemetry, ensuring every deploy is robust, secure, and ready for exponential scale."}
                </p>
              </div>
            </div>

            {/* Key Deliverables */}
            {service.features && service.features.length > 0 && (
              <div className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-8 space-y-4">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {locale === "ar" ? "???????? ???????? ?????????" : "Key Deliverables & Capabilities"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-sm font-medium text-slate-200">
                        {locale === "ar" ? feat.ar : feat.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Embedded Inquiry Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {locale === "ar" ? "???? ??? ????? ????" : "Inquire About This Service"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {locale === "ar"
                    ? "???? ??????? ???????? ??? ???? ???????? ??????? ?? ??? ??????."
                    : "Connect with our practice leads specialized in this discipline."}
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-6 space-y-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-semibold text-emerald-300">{t("inquiry.successTitle")}</p>
                </div>
              ) : (
                <form onSubmit={handleEmbeddedSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{t("inquiry.name")} *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{t("inquiry.email")} *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{t("inquiry.phone")}</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{t("inquiry.message")} *</label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={locale === "ar" ? "??????? ??????? ???????..." : "Project requirements..."}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-indigo-500/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                        <span>{t("inquiry.submit")}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        defaultServiceId={service.id}
        defaultServiceName={title}
      />
    </div>
  );
}
