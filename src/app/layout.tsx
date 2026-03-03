import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

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
  title: "Atlas Landing | Midtown Reno Bar",
  description:
    "Atlas Landing in Midtown Reno, NV. Craft cocktails, wine flights, whiskey flights, and rotating beers.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
