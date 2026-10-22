"use client";

import React, { useState, useEffect } from "react";
import {
  useAgencySettings,
  DEFAULT_HOMEPAGE_PROCESS,
  ProcessSectionData,
  ProcessStepItem,
} from "@/context/AgencySettingsContext";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  RotateCcw,
  Eye,
  Globe,
  Save,
  Layers,
  Check,
} from "lucide-react";

export function HomepageProcessEditor() {
  const { homepageProcess, updateHomepageProcess } = useAgencySettings();

  const [formData, setFormData] = useState<ProcessSectionData>(
    homepageProcess || DEFAULT_HOMEPAGE_PROCESS
  );
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [previewLocale, setPreviewLocale] = useState<"en" | "ar">("en");
  const [activePreviewStep, setActivePreviewStep] = useState(0);

  // Sync with context if it loads asynchronously
  useEffect(() => {
    if (homepageProcess) {
      setFormData(homepageProcess);
    }
  }, [homepageProcess]);

  const handleHeadingChange = (lang: "en" | "ar", value: string) => {
    setFormData((prev) => ({
      ...prev,
      heading: {
        ...prev.heading,
        [lang]: value,
      },
    }));
  };

  const handleOverviewChange = (lang: "en" | "ar", value: string) => {
    setFormData((prev) => ({
      ...prev,
      overview: {
        ...prev.overview,
        [lang]: value,
      },
    }));
  };

  const handleStepChange = (
    index: number,
    field: "label" | "title" | "desc",
    lang: "en" | "ar",
    value: string
  ) => {
    setFormData((prev) => {
      const newSteps = [...prev.steps];
      if (!newSteps[index]) return prev;
      newSteps[index] = {
        ...newSteps[index],
        [field]: {
          ...newSteps[index][field],
          [lang]: value,
        },
      };
      return {
        ...prev,
        steps: newSteps,
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateHomepageProcess(formData);
      setSuccessMessage("Homepage Process Section updated successfully! Changes are live immediately.");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to update process section.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToGoogleDoc = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all process content back to the default Google Docs content?"
      )
    ) {
      setFormData(DEFAULT_HOMEPAGE_PROCESS);
      setSuccessMessage("Content reset to Google Docs template. Click 'Save Changes' to apply.");
    }
  };

  const currentPreviewStep =
    formData.steps[activePreviewStep] || formData.steps[0] || DEFAULT_HOMEPAGE_PROCESS.steps[0];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Homepage Process Section Editor
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Edit the "Here’s Our Process" section on the homepage for both English and Arabic.
            Updates take effect across all visitor sessions immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetToGoogleDoc}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Reset to original Google Docs content"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset to Google Doc</span>
          </button>
        </div>
      </div>

      {/* Status Alerts */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5 shadow-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2.5 shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Section Heading & Overview Narrative */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>1. Section Heading & Overview Narrative</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Controls the main title and the overarching narrative paragraph directly beneath it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heading English */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Section Heading (English)
              </label>
              <input
                type="text"
                required
                value={formData.heading.en}
                onChange={(e) => handleHeadingChange("en", e.target.value)}
                placeholder="Here’s Our Process"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Heading Arabic */}
            <div className="space-y-2" dir="rtl">
              <label className="block text-xs font-semibold text-slate-300 text-right">
                عنوان القسم (باللغة العربية)
              </label>
              <input
                type="text"
                required
                value={formData.heading.ar}
                onChange={(e) => handleHeadingChange("ar", e.target.value)}
                placeholder="منهجية عملنا"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm text-right focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Overview English */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Process Overview Narrative (English)
              </label>
              <textarea
                rows={4}
                required
                value={formData.overview.en}
                onChange={(e) => handleOverviewChange("en", e.target.value)}
                placeholder="At Smart Touch, we first begin our work..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500/50 resize-y"
              />
              <p className="text-[11px] text-slate-500">
                From Google Doc: Explains the cyclical problem-solving approach and continuous improvement.
              </p>
            </div>

            {/* Overview Arabic */}
            <div className="space-y-2" dir="rtl">
              <label className="block text-xs font-semibold text-slate-300 text-right">
                الفقرة التقديمية لمنهجية العمل (باللغة العربية)
              </label>
              <textarea
                rows={4}
                required
                value={formData.overview.ar}
                onChange={(e) => handleOverviewChange("ar", e.target.value)}
                placeholder="في سمارت تاتش نبدأ عملنا أولاً بفهم طبيعة العمل..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs text-right leading-relaxed focus:ring-2 focus:ring-indigo-500/50 resize-y"
              />
              <p className="text-[11px] text-slate-500 text-right">
                نص المستند الرسمي: يوضح طبيعة فهم احتياجات العميل والتطوير المستمر.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: The 4 Process Steps */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <span>2. Interactive Process Steps (The 4 Tab Buttons)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure each of the 4 steps: the tab button label, the card title, and the detail text.
            </p>
          </div>

          <div className="space-y-6">
            {formData.steps.map((stepItem, idx) => (
              <div
                key={stepItem.step}
                className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                      {stepItem.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Step {stepItem.step} Configuration
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Step Label EN */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-400">
                      Tab Button Label (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={stepItem.label.en}
                      onChange={(e) =>
                        handleStepChange(idx, "label", "en", e.target.value)
                      }
                      placeholder={`Step ${stepItem.step} Label (EN)`}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  {/* Step Label AR */}
                  <div className="space-y-1.5" dir="rtl">
                    <label className="block text-[11px] font-semibold text-slate-400 text-right">
                      نص زر الخطوة (باللغة العربية)
                    </label>
                    <input
                      type="text"
                      required
                      value={stepItem.label.ar}
                      onChange={(e) =>
                        handleStepChange(idx, "label", "ar", e.target.value)
                      }
                      placeholder={`عنوان الخطوة ${stepItem.step} (عربي)`}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs text-right font-medium focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  {/* Step Title EN */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-400">
                      Detail Card Title (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={stepItem.title.en}
                      onChange={(e) =>
                        handleStepChange(idx, "title", "en", e.target.value)
                      }
                      placeholder="Title on floating card"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  {/* Step Title AR */}
                  <div className="space-y-1.5" dir="rtl">
                    <label className="block text-[11px] font-semibold text-slate-400 text-right">
                      عنوان البطاقة المنبثقة (باللغة العربية)
                    </label>
                    <input
                      type="text"
                      required
                      value={stepItem.title.ar}
                      onChange={(e) =>
                        handleStepChange(idx, "title", "ar", e.target.value)
                      }
                      placeholder="عنوان البطاقة المنبثقة"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs text-right font-medium focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  {/* Step Desc EN */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-400">
                      Detail Card Description (English)
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={stepItem.desc.en}
                      onChange={(e) =>
                        handleStepChange(idx, "desc", "en", e.target.value)
                      }
                      placeholder="Detailed explanation of this step"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500/50 resize-y"
                    />
                  </div>

                  {/* Step Desc AR */}
                  <div className="space-y-1.5" dir="rtl">
                    <label className="block text-[11px] font-semibold text-slate-400 text-right">
                      تفاصيل وشرح الخطوة (باللغة العربية)
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={stepItem.desc.ar}
                      onChange={(e) =>
                        handleStepChange(idx, "desc", "ar", e.target.value)
                      }
                      placeholder="تفاصيل وشرح هذه الخطوة"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs text-right leading-relaxed focus:ring-2 focus:ring-indigo-500/50 resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Live Preview Box */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>3. Live Interactive Homepage Preview</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Preview how the section renders on the live website in real time.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewLocale("en")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  previewLocale === "en"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setPreviewLocale("ar")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  previewLocale === "ar"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                العربية
              </button>
            </div>
          </div>

          {/* Preview Container with Light Background matching the Homepage */}
          <div
            className={`p-6 sm:p-10 rounded-2xl bg-[#F1F7FF] border border-blue-100 text-slate-900 ${
              previewLocale === "ar" ? "text-right" : "text-left"
            }`}
            dir={previewLocale === "ar" ? "rtl" : "ltr"}
          >
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-center mb-3">
              {previewLocale === "ar" ? formData.heading.ar : formData.heading.en}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mx-auto text-center leading-relaxed mb-6">
              {previewLocale === "ar" ? formData.overview.ar : formData.overview.en}
            </p>

            {/* Preview Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {formData.steps.map((st, idx) => {
                const isActive = activePreviewStep === idx;
                const label = previewLocale === "ar" ? st.label.ar : st.label.en;
                return (
                  <button
                    type="button"
                    key={st.step}
                    onClick={() => setActivePreviewStep(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#1E40AF] text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center ${
                        isActive ? "bg-white text-[#1E40AF]" : "bg-[#1E40AF] text-white"
                      }`}
                    >
                      {st.step}
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Preview Floating Card */}
            <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#0B1C33] text-white shadow-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">
                  {previewLocale === "ar"
                    ? `الخطوة ${currentPreviewStep.step}`
                    : `Step ${currentPreviewStep.step}`}
                </span>
                <h5 className="text-sm font-bold text-white">
                  {previewLocale === "ar"
                    ? currentPreviewStep.title.ar
                    : currentPreviewStep.title.en}
                </h5>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {previewLocale === "ar"
                  ? currentPreviewStep.desc.ar
                  : currentPreviewStep.desc.en}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 sticky bottom-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 shadow-2xl">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Process Section Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
