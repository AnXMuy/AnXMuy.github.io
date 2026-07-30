import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://anxmuy.github.io"),
  title: {
    default: "Zixuan Jiang | Academic Homepage",
    template: "%s | Zixuan Jiang",
  },
  description: "Zixuan Jiang's academic homepage: multimodal intelligence across vision, speech, and language.",
  authors: [{ name: "Zixuan Jiang" }],
  openGraph: {
    title: "Zixuan Jiang | Academic Homepage",
    description: "Research in multimodal intelligence, speech interaction, and computer vision.",
    url: "https://anxmuy.github.io",
    siteName: "Zixuan Jiang",
    images: [{ url: "/images/prof_pic.png", width: 864, height: 864 }],
    type: "website",
  },
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top" className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
