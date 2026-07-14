import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { DailyLoader } from "@/components/daily-loader";
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
  title: "Atlas Landing | Midtown Reno Cocktail Bar",
  description: "Cocktails, wine, deep playlists, and late-night snacks in Midtown Reno.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="atlas-loader-init" strategy="beforeInteractive">
          {`try {
            var now = new Date();
            var today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
            var show = localStorage.getItem("atlas-loader-last-shown-v2") !== today;
            document.documentElement.setAttribute("data-show-loader", show ? "true" : "false");
            if (show) document.documentElement.classList.add("loader-active");
          } catch (error) {
            document.documentElement.setAttribute("data-show-loader", "true");
            document.documentElement.classList.add("loader-active");
          }`}
        </Script>
        <DailyLoader />
        <div data-app-root>{children}</div>
      </body>
    </html>
  );
}
