import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { AgencySettingsProvider } from "@/context/AgencySettingsContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingWhatsApp } from "@/components/MobileFloatingWhatsApp";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Touch | Digital Marketing Agency and Services in KSA",
  description: "Smart Touch is a digital marketing agency in Saudi Arabia, specializing in online marketing, web solutions, mobile apps, social media, SEO and brand transformation.",
  keywords: "digital marketing agency, Saudi Arabia, online marketing, web solutions, mobile apps, social media, SEO, Riyadh, KSA",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Smart Touch | Digital Marketing Agency and Services in KSA",
    description: "Smart Touch is a digital marketing agency in Saudi Arabia, specializing in online marketing, web solutions, mobile apps, social media, SEO and brand transformation.",
    url: "https://smarttouch.me",
    siteName: "Smart Touch",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${jakarta.variable} ${cairo.variable}`}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col">
        <LanguageProvider>
          <AuthProvider>
            <AgencySettingsProvider>
              <SmoothScroll>
                <Navbar />
                <main className="flex-grow pt-20">{children}</main>
                <Footer />
                <MobileFloatingWhatsApp />
              </SmoothScroll>
            </AgencySettingsProvider>
          </AuthProvider>
        </LanguageProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
