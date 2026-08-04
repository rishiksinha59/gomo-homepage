import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getGlobalData } from "@/lib/strapi";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GO MO Group | Premium Digital & Brand Experience",
    template: "%s | GO MO Group",
  },
  description:
    "Managing digital products, customer experiences, and end-to-end design solutions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream font-sans">
        <Navbar data={globalData?.navbar} />
        <main className="flex-1">{children}</main>
        <Footer data={globalData?.footer} />
      </body>
    </html>
  );
}
