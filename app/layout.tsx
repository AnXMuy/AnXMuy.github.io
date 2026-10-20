import type { Metadata } from "next";
import { IBM_Plex_Mono, DM_Sans, Lora, Noto_Sans_SC } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { LanguageProvider } from "@/components/language-provider";
import { FooterVisual } from "@/components/footer-visual";
import { ExperienceProvider } from "@/components/experience-provider";
import { site } from "@/data/site";
import "./globals.css";
import "./ocean.css";
import "./experience.css";
import "./series-motion.css";
import "./editorial.css";

const chinese = Noto_Sans_SC({ weight: ["400", "500", "600"], preload: false, variable: "--font-cjk", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Lora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://anxmuy.github.io"),
  title: {
    default: "Zixuan Jiang | Academic Homepage",
    template: "%s | Zixuan Jiang",
  },
  description: site.description,
  authors: [{ name: "Zixuan Jiang" }],
  openGraph: {
    title: "Zixuan Jiang | Academic Homepage",
    description: site.description,
    url: "https://anxmuy.github.io",
    siteName: "Zixuan Jiang",
    images: [{ url: "/images/prof_pic.png", width: 1024, height: 1280 }],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/siam-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/siam-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/images/siam-icon-32.png",
    apple: "/images/siam-icon-180.png",
  },
  manifest: "/images/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top" className={`${chinese.variable} ${body.variable} ${display.variable} ${mono.variable}`}>
        <LanguageProvider>
          <ExperienceProvider>
            <a className="skip-link" href="#main-content">Skip to content / 跳至正文</a>
            <SiteHeader />
            <div id="main-content" tabIndex={-1}>{children}</div>
            <FooterVisual />
          </ExperienceProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
