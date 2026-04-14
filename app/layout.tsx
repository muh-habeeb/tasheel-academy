import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import "./globals.css";
import { Cormorant_Garamond, Source_Serif_4, DM_Sans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-cormorant' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], weight: ['300', '400'], variable: '--font-source-serif' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-dm-sans' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Tasheel Moral Academy",
  description: "Excellence in Moral Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable, dmSans.variable, cormorant.variable, sourceSerif.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <title>Online Islamic Classes in Kerala | Online Quran Learning</title>
        <meta name="description" content="TasHeel Moral Academy offers online Islamic classes in Kerala with Quran learning &amp; Arabic lessons, accessible worldwide with expert teachers." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <link rel="canonical" href="https://tasheelmoralacademy.in/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Guiding the next generation with Islamic knowledge, values, and faith" />
        <meta property="og:description" content="TasHeel Moral Academy offers online Islamic classes in Kerala with Quran learning &amp; Arabic lessons, accessible worldwide with expert teachers." />
        <meta property="og:url" content="https://tasheelmoralacademy.in/" />
        <meta property="og:site_name" content="tasheelmoralacademy.in" />
        <meta property="og:updated_time" content="2026-02-20T18:19:45+00:00" />
        <meta property="og:image" content="https://tasheelmoralacademy.in/wp-content/uploads/2024/11/Logo-2-e1731494311385-1024x575.png" />
        <meta property="og:image:secure_url" content="https://tasheelmoralacademy.in/wp-content/uploads/2024/11/Logo-2-e1731494311385-1024x575.png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="575" />
        <meta property="og:image:alt" content="Online Islamic Classes in Kerala" />
        <meta property="og:image:type" content="image/png" />
        <meta property="article:published_time" content="2024-11-12T16:33:05+00:00" />
        <meta property="article:modified_time" content="2026-02-20T18:19:45+00:00" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guiding the next generation with Islamic knowledge, values, and faith" />
        <meta name="twitter:description" content="TasHeel Moral Academy offers online Islamic classes in Kerala with Quran learning &amp; Arabic lessons, accessible worldwide with expert teachers." />
        <meta name="twitter:image" content="https://tasheelmoralacademy.in/wp-content/uploads/2024/11/Logo-2-e1731494311385-1024x575.png" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Tasheel@admin.in" />
        <meta name="twitter:label2" content="Time to read" />
        <meta name="twitter:data2" content="9 minutes" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F4EF] text-[#1C2544] selection:bg-[#C4713A]/30 font-sans" suppressHydrationWarning>
        <SmoothScroll>
          <Preloader />
          <Header />
          <MobileNav />
          <main className="flex-1 flex flex-col mt-[80px] md:mt-0 relative" style={{ position: 'relative' }}>
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
