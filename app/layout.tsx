import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="en" className={cn("h-full antialiased text-inter", "font-sans", geist.variable)} suppressHydrationWarning>
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-emerald-500/30" suppressHydrationWarning>
        <Header />
        <MobileNav />
        <main className="flex-1 flex flex-col mt-[80px] md:mt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
