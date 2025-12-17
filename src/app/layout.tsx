import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ViralRadar.in - AI Viral Potential Predictor",
    template: "%s | ViralRadar.in",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  description: "Stop guessing what goes viral. ViralRadar.in uses advanced AI to score your short-form videos and scripts before you post. Optimize for TikTok, Reels, and Shorts.",
  keywords: ["viral prediction", "AI video analysis", "TikTok algorithm", "Reels views", "Shorts optimization", "content creator tool", "social media growth"],
  authors: [{ name: "ViralRadar Team" }],
  creator: "ViralRadar",
  publisher: "ViralRadar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viralradar.in",
    title: "ViralRadar.in - Predict & Go Viral",
    description: "Analyze your videos with AI. Get a viral score, actionable tips, and script improvements in seconds.",
    siteName: "ViralRadar.in",
    images: [
      {
        url: "/og-image.jpg", // Ensure this exists or use a placeholder
        width: 1200,
        height: 630,
        alt: "ViralRadar AI Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralRadar.in - Predict Your Next Viral Hit",
    description: "AI-powered scoring and optimization for content creators.",
    images: ["/og-image.jpg"],
    creator: "@ViralRadarApp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // You will get this code from steps in the guide
  },
};

import { Toaster } from "@/components/ui/Toaster";
import Mixpanel from "@/components/Mixpanel";

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ViralRadar",
              "url": "https://viralradar.in",
              "logo": "https://viralradar.in/logo.jpg",
              "sameAs": [
                "https://viralradar.in"
              ]
            })
          }}
        />
        <Mixpanel />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
