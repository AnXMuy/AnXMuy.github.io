import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { MotionAtmosphere } from "@/components/motion-atmosphere";
import { SmoothScroll } from "@/components/smooth-scroll";
import "lenis/dist/lenis.css";
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
  description: "Zixuan Jiang's academic homepage: multimodal intelligence and audio interaction.",
  authors: [{ name: "Zixuan Jiang" }],
  openGraph: {
    title: "Zixuan Jiang | Academic Homepage",
    description: "Research in multimodal intelligence and audio interaction.",
    url: "https://anxmuy.github.io",
    siteName: "Zixuan Jiang",
    images: [{ url: "/images/prof_pic.png", width: 864, height: 864 }],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=3", sizes: "64x64", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/images/apple-touch-icon.png?v=3",
  },
  manifest: "/images/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top" className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <SmoothScroll>
          <MotionAtmosphere />
          <SiteHeader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
