import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Infant, Montserrat } from "next/font/google";
import "./globals.css";
import { wedding } from "@/config/wedding";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Infant({
  weight: ["300", "400", "500", "600"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: wedding.meta.title,
  description: wedding.meta.description,
  openGraph: {
    title: wedding.meta.title,
    description: wedding.meta.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${greatVibes.variable} ${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="min-h-svh antialiased">{children}</body>
    </html>
  );
}
