import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Alat Rumah Tangga SNY - Quality Home Appliances',
  description: 'Toko alat rumah tangga lengkap dan terpercaya. Temukan peralatan rumah tangga berkualitas untuk kebutuhan rumah Anda. Discover premium home appliances.',
  keywords: 'home appliances, kitchen appliances, household items, home equipment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SNY Store",
    "url": "https://alat-rumah-tangga-sny.vercel.app",
    "logo": "https://alat-rumah-tangga-sny.vercel.app/logo.png", // Replace with your actual logo URL
    "sameAs": [
      "https://shopee.co.id/shop-name",
      "https://www.tiktok.com/@shop-name",
      "https://www.instagram.com/shop-name"
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}