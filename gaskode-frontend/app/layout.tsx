import type { Metadata } from "next";
import { Geist_Mono, Sora, Fraunces } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Editorial serif for luxury display headlines.
// Variable weight (full 100–900 range) + optical sizing for large type.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GasKode - Jasa Pembuatan Website",
  description: "Solusi digital profesional untuk bisnis Anda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${sora.variable} ${fraunces.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        {/* Children di sini akan berisi konten dari (public)/layout atau (admin)/layout */}
        {children}
      </body>
    </html>
  );
}