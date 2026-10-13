"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/lib/urls";
import { InquiryModal } from "@/components/InquiryModal";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ReadyToStartBanner } from "@/components/ReadyToStartBanner";
import { ClientStrip } from "@/components/ClientStrip";

export function AboutUsView() {
  const { locale, isRtl } = useLanguage();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white" dir={isRtl ? "rtl" : "ltr"}>
      {/* ========================================================= */}
      {/* SECTION 1: HERO SECTION ("About.") */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-32 overflow-hidden bg-slate-50 border-b border-slate-200/80">
        {/* 3D architectural banner background matching portfolio and design */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/portfolio-banner.png"
            alt="About Us Banner"
            className="w-full h-full object-cover object-center opacity-95"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#0A1128] tracking-tight">
              {locale === "ar" ? "من نحن." : "About."}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {locale === "ar"
                ? "لا توجد وصفة سرية لنجاحنا. نحن نفخر بعملنا ونتأكد من استقطاب كفاءات تملك خبرة ومعرفة عميقة في تخصصاتها وتتطور باستمرار. لا نساوم أبداً على الجودة. أرقى المعايير الإبداعية وكافة الموارد المطلوبة ستكون تحت تصرفك لمساعدتك في تحقيق رسالتك وأهدافك."
                : "There is no secret recipe for our success. We take pride in our work. We make sure we hire talent that have rich experience and knowledge in their specialty and they're continuously growing. We never compromise on quality. Higher approaches to creativity and all the resources needed will be at your disposal in order to help you accomplish your mission and goals."}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: OUR IDENTITY (2 Columns: 3D Map + Text) */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: 3D Perspective Glowing Map */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-[#040A1E] group">
                <img
                  src="/images/about/our-identity-map.jpg"
                  alt={locale === "ar" ? "هويتنا - شبكة رقمية متطورة" : "Our Identity - Global Digital Network"}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040A1E]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#0A1128] tracking-tight leading-tight">
                {locale === "ar" ? "هويتنا" : "Our Identity"}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {locale === "ar"
                  ? "استجابةً لمتطلبات وتطور قطاع الإعلانات الرقمية والنهضة التنموية الشاملة التي تشهدها المملكة تماشياً مع وتيرة النمو المستمر لرؤية 2030... فقد ابتكرنا منظومة استراتيجيات متقدمة لتقديم الحلول المتكاملة لشركتكم بكفاءة واقتدار. وفي هذا الإطار، يتم تنفيذ الأفكار الإبداعية باحترافية عالية وبأحدث الوسائل التكنولوجية لخدمة العميل وتحقيق رؤيته وطموحاته."
                  : "In order to cater the demands of developing the digital advertising sector and the global advancement that the kingdom is witnessing and the 2030 vision's consistency growth... for this purpose we have introduced an innovative set of strategies to provide the needed solutions to your agency efficiently. In this respect, the creative ideas are executed professionally and with unique technological ways to serve the client and his vision."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: WE SUPPORT YOU (Banner with Gulf Team + 3D Shapes) */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 bg-white overflow-visible">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative rounded-3xl overflow-visible shadow-2xl bg-[#091D58]">
            {/* Background Gulf Executive Team with Royal Blue Translucent Overlay */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <img
                src="/images/about/gulf-business-team.jpg"
                alt="Smart Touch Executive Team"
                className="w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C246E]/95 via-[#0A1C56]/90 to-[#071542]/95" />
            </div>

            {/* Floating 3D Cube (Top-Right) */}
            <div className="absolute -top-10 -right-6 sm:-top-14 sm:-right-8 w-24 h-24 sm:w-36 sm:h-36 z-20 pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] animate-[bounce_6s_ease-in-out_infinite]">
              <img
                src="/images/about/floating-3d-cube.jpg"
                alt="3D Holographic Cube"
                className="w-full h-full object-contain rounded-2xl mix-blend-screen"
              />
            </div>

            {/* Floating 3D Torus Ring (Bottom-Left) */}
            <div className="absolute -bottom-8 -left-6 sm:-bottom-12 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 z-20 pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] animate-[pulse_5s_ease-in-out_infinite]">
              <img
                src="/images/about/floating-3d-torus.jpg"
                alt="3D Iridescent Torus"
                className="w-full h-full object-contain rounded-full mix-blend-screen"
              />
            </div>

            {/* Card Content (Centered Text) */}
            <div className="relative z-10 py-16 sm:py-24 px-8 sm:px-16 md:px-24 text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                {locale === "ar" ? "نحن ندعمكم" : "We Support You"}
              </h2>
              <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed font-light max-w-3xl mx-auto">
                {locale === "ar"
                  ? "يمتلك فريقنا الإبداعي والتشغيلي خبرة واسعة وفهماً عميقاً في مختلف الأسواق. وفي كل خطوة ومرحلة، نكون على تواصل مباشر ووثيق مع عملائنا. نبذل قصارى جهدنا وخبراتنا لضمان إيصال رسائلكم بوضوح وإيجابية عبر استراتيجية متعددة القنوات، وضمان تحقيق أعلى عائد استثماري لكل عميل. نؤمن بتسخير كامل إمكاناتنا لنضمن وصولكم إلى أهدافكم ورسالتكم المنشودة."
                  : "The creative and operational team has vast experience and deep understanding in several different markets. At each stage and every step, we are in direct line and proximity to our clients. We put all the effort and know-how we have to guarantee that the messages conveyed are clear and positive, with a multi-touchpoint approach, and that each of our clients gets the best value for money when it comes to ROI. In today's digital era, we believe that whatever client we have, we will provide the best of our capabilities to make sure you achieve your mission."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: AROUND THE WORLD (2 Columns: Text + Space Image) */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#0A1128] tracking-tight leading-tight">
                {locale === "ar" ? "حول العالم" : "Around The World"}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {locale === "ar"
                  ? "ما يميزنا هو نهجنا الشامل في تقديم حلول رقمية وإعلانية متكاملة لعملائنا تتلاءم بدقة مع احتياجاتهم الفريدة. مع مراعاة كافة الجوانب، بدءاً من الفكرة الإبداعية وصولاً إلى التنفيذ الدقيق، نحرص على تقديم أقصى درجات الاهتمام بالتفاصيل، وضمان وصول الرسائل بأعلى درجات الوضوح والتأثير عبر منصات متعددة، وتحقيق أفضل قيمة مقابل الاستثمار لعملائنا في كل مكان."
                  : "What makes us unique is our holistic approach to provide solutions to our clients that cater to their unique needs. With all aspects taken into account, from the creative process to the execution, we ensure that every client is served with utmost attention to detail, making sure the message conveyed is clear and positive, with a multi-touchpoint approach, and that each of our clients gets the best value for money when it comes to ROI. In today's digital era, we believe that whatever client we have, we will provide the best of our capabilities to make sure you achieve your mission."}
              </p>
            </div>

            {/* Right: Earth From Space */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-black group">
                <img
                  src="/images/about/earth-from-space.jpg"
                  alt={locale === "ar" ? "حول العالم - انتشار رقمي عالمي" : "Around The World - Planet Earth from Orbit"}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: READY TO START YOUR PROJECT? (Banner) */}
      {/* ========================================================= */}
      <ReadyToStartBanner bgVariant="white" />

      {/* ========================================================= */}
      {/* SECTION 6: TOP CLIENTS (Database-Connected Carousel) */}
      {/* ========================================================= */}
      <ClientStrip title={{ en: "TOP CLIENTS", ar: "أبرز العملاء" }} />

      {/* ========================================================= */}
      {/* SECTION 7: WHY SMART TOUCH? (2 Columns: Title + Description & Button) */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: Title */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1128] tracking-tight">
                {locale === "ar" ? "لماذا سمارت تاتش؟" : "Why Smart Touch?"}
              </h2>
            </div>

            {/* Right: Description & Action Button */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {locale === "ar"
                  ? "نبتكر حلولاً رقمية وإعلانية مصممة خصيصاً لتلبية أهدافكم وتطلعاتكم بدقة. نركز على تقديم تجارب متطورة تعزز من مكانة علامتكم التجارية وتحقق أعلى عائد استثماري ممكن. جميع خدماتنا تُصاغ وتُنفذ بأيدي نخبة من الخبراء المتخصصين والمكرسين لدعم نجاحكم وتوسعكم الدائم."
                  : "We create tailored digital solutions specifically adapted to meet your goals and needs. We focus on delivering high-end experiences that elevate your brand and yield high returns on investment. All of the services we provide are custom-crafted by experts who are dedicated to helping our clients grow."}
              </p>

              <div>
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="px-7 py-3 rounded-md bg-[#1E60F2] hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {locale === "ar" ? "المزيد عن فريقنا" : "More About Our Team"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8: WHAT OUR CUSTOMER THINK (8-Review Slider) */}
      {/* ========================================================= */}
      <TestimonialsSection />

      {/* Inquiry Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
