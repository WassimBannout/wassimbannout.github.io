import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wassim Bannout — Software Engineer & Data Scientist",
  description:
    "Portfolio of Wassim Bannout — Software Engineer, Data Scientist, and Database Engineer building impactful software at the intersection of engineering and intelligent systems.",
  keywords: ["Wassim Bannout", "Software Engineer", "Data Scientist", "Database Engineer", "Portfolio"],
  authors: [{ name: "Wassim Bannout" }],
  openGraph: {
    title: "Wassim Bannout — Software Engineer & Data Scientist",
    description: "Building impactful software at the intersection of engineering, data science, and intelligent systems.",
    type: "website",
    url: "https://wassimbannout.netlify.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>
        {/* Grain texture overlay */}
        <div
          aria-hidden
          className="grain pointer-events-none fixed inset-0 z-[500] opacity-[0.032] select-none"
        />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
