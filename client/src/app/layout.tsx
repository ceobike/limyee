import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Ensure text remains visible during font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Ensure text remains visible during font loading
});

export const metadata: Metadata = {
  title: "Limyee - Industrial Computing Solutions",
  description: "Limyee is a leading provider of industrial computing solutions",
  viewport: "width=device-width, initial-scale=1",
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
        suppressHydrationWarning
      >
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
