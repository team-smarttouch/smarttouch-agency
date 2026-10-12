import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  title: "SmartTouch | Digital Advertising & Web Development Agency",
  description: "Premier bilingual digital advertising agency specializing in custom web & mobile apps, SEO marketing, and brand transformation.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
            <SmoothScroll>
              <Navbar />
              <main className="flex-grow pt-20">{children}</main>
              <Footer />
            </SmoothScroll>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
