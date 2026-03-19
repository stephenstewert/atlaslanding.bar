import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <Script id="loader-init" strategy="beforeInteractive">{`
          (function () {
            var html = document.documentElement;
            var key = "atlas-loader-last-shown";
            function localDateKey() {
              var now = new Date();
              var year = now.getFullYear();
              var month = String(now.getMonth() + 1).padStart(2, "0");
              var day = String(now.getDate()).padStart(2, "0");
              return year + "-" + month + "-" + day;
            }
            try {
              var today = localDateKey();
              var shouldShow = window.localStorage.getItem(key) !== today;
              html.setAttribute("data-show-loader", shouldShow ? "true" : "false");
              if (shouldShow) {
                html.classList.add("loader-active");
                window.localStorage.setItem(key, today);
              } else {
                html.classList.remove("loader-active");
              }
            } catch (e) {
              html.setAttribute("data-show-loader", "true");
              html.classList.add("loader-active");
            }
          })();
        `}</Script>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"
          strategy="beforeInteractive"
        />
        <Script id="loader-play" strategy="beforeInteractive">{`
          (function () {
            var html = document.documentElement;
            var maxLoaderMs = 10000;

            function closeLoader() {
              html.classList.remove("loader-active");
              html.setAttribute("data-show-loader", "false");
            }

            function bootLoader() {
              if (html.getAttribute("data-show-loader") !== "true") {
                closeLoader();
                return;
              }

              var root = document.getElementById("daily-loader");
              var mount = document.getElementById("daily-loader-animation");
              if (!root || !mount) {
                closeLoader();
                return;
              }

              var didFinish = false;
              var stopFallback = window.setTimeout(function () {
                if (!didFinish) {
                  didFinish = true;
                  closeLoader();
                }
              }, maxLoaderMs);

              function done() {
                if (didFinish) {
                  return;
                }
                didFinish = true;
                window.clearTimeout(stopFallback);
                closeLoader();
              }

              function start() {
                if (!window.lottie) {
                  window.setTimeout(start, 30);
                  return;
                }
                try {
                  var animation = window.lottie.loadAnimation({
                    container: mount,
                    renderer: "svg",
                    loop: false,
                    autoplay: true,
                    path: "/atlas-loader-animation.json"
                  });
                  animation.addEventListener("complete", done);
                  animation.addEventListener("data_failed", done);
                } catch (e) {
                  done();
                }
              }

              start();
            }

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", bootLoader, { once: true });
            } else {
              bootLoader();
            }
          })();
        `}</Script>
        <div id="daily-loader" aria-hidden="true" suppressHydrationWarning>
          <div id="daily-loader-animation" suppressHydrationWarning />
        </div>
        <div data-app-root>{children}</div>
      </body>
    </html>
  );
}
