import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";

import { DailyLoader } from "@/components/daily-loader";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atlaslanding.bar"),
  title: "Atlas Landing | Midtown Reno's Cozy Bar and Wine",
  description:
    "Indulge in a delightful evening at Atlas Landing, the charming wine bar in Midtown Reno. Discover our excellent wine selection and cozy ambiance!",
  keywords: [
    "Atlas Landing",
    "Midtown Reno bar",
    "Reno cocktails",
    "wine bar Reno",
    "whiskey flights Reno",
    "draft beer Reno"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Atlas Landing - Midtown Reno's Cozy Bar and Wine",
    description:
      "Indulge in a delightful evening at Atlas Landing, the charming wine bar in Midtown Reno. Discover our excellent wine selection and cozy ambiance!",
    url: "https://atlaslanding.bar",
    siteName: "Atlas Landing",
    type: "website",
    images: [
      {
        url: "https://cdn.prod.website-files.com/643b06564581272492d75842/64aeefdd6b8c0c941a3baee4_IMG_1924-min.JPG"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Landing - Midtown Reno's Cozy Bar and Wine",
    description:
      "Indulge in a delightful evening at Atlas Landing, the charming wine bar in Midtown Reno. Discover our excellent wine selection and cozy ambiance!",
    images: [
      "https://cdn.prod.website-files.com/643b06564581272492d75842/64aeefdd6b8c0c941a3baee4_IMG_1924-min.JPG"
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#242424"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <Script id="loader-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var key = "atlas-loader-last-shown";
              var today = new Date().toISOString().slice(0, 10);
              var shouldShow = window.localStorage.getItem(key) !== today;
              document.documentElement.setAttribute("data-show-loader", shouldShow ? "true" : "false");
              if (shouldShow) {
                document.documentElement.classList.add("loader-active");
              } else {
                document.documentElement.classList.remove("loader-active");
              }
            } catch (e) {
              document.documentElement.setAttribute("data-show-loader", "true");
              document.documentElement.classList.add("loader-active");
            }
          })();
        `}</Script>
        <DailyLoader />
        <div data-app-root>{children}</div>
      </body>
    </html>
  );
}
