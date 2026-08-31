import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Agriculture Durable au Cameroun`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "agriculture", "Cameroun", "Yaoundé", "engrais", "semences",
    "phytosanitaires", "irrigation", "agronomie", "agriculture durable",
    "Ebotan", "intrants agricoles", "formation agricole",
  ],
  authors: [{ name: "Ebotan SARL" }],
  creator: "Ebotan SARL",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: `${siteConfig.name} — Agriculture Durable au Cameroun`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: "Ebotan — Agriculture Durable au Cameroun",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Agriculture Durable au Cameroun`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "fr": `${siteConfig.url}/`,
      "en": `${siteConfig.url}/en/`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem("ebotan-theme") || "system";
                const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const isDark = theme === "dark" || (theme === "system" && systemDark);
                if (isDark) document.documentElement.classList.add("dark");
              })();
            `,
          }}
        />
      </head>
      <body className="font-montserrat antialiased">
        {children}
      </body>
    </html>
  );
}
