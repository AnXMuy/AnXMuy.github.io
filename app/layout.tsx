import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Noto_Sans_SC, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { LanguageProvider } from "@/components/language-provider";
import { FooterVisual } from "@/components/footer-visual";
import { ExperienceProvider } from "@/components/experience-provider";
import "./globals.css";
import "./ocean.css";
import "./experience.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-editorial", display: "swap" });
const chinese = Noto_Sans_SC({ weight: ["400", "500", "600"], preload: false, variable: "--font-cjk", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://anxmuy.github.io"),
  title: {
    default: "Zixuan Jiang | Academic Homepage",
    template: "%s | Zixuan Jiang",
  },
  description: "Zixuan Jiang's academic homepage: multimodal large language models and human-computer interaction.",
  authors: [{ name: "Zixuan Jiang" }],
  openGraph: {
    title: "Zixuan Jiang | Academic Homepage",
    description: "Research in multimodal large language models and human-computer interaction.",
    url: "https://anxmuy.github.io",
    siteName: "Zixuan Jiang",
    images: [{ url: "/images/prof_pic.png", width: 864, height: 864 }],
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
      <body id="top" className={`${display.variable} ${chinese.variable} ${body.variable} ${mono.variable}`}>
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
