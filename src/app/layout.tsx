import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { PROFILE, SITE_SETTINGS, SOCIALS } from "@/content";
import "./globals.css";


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_SETTINGS.siteUrl),
  title: `${SITE_SETTINGS.siteName} — ${PROFILE.name}`,
  description: "Software experiments, AI systems, architecture research, and engineering documentation.",
  keywords: [PROFILE.name, "Web Developer", "UI/UX Designer", "Portfolio", "Laboratory"],
  authors: [{ name: PROFILE.name }],
  openGraph: {
    title: `${SITE_SETTINGS.siteName} — ${PROFILE.name}`,
    description: "Software experiments, AI systems, architecture research, and engineering documentation.",
    siteName: SITE_SETTINGS.siteName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_SETTINGS.siteName,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_SETTINGS.siteName} — ${PROFILE.name}`,
    description: "Software experiments, AI systems, architecture research, and engineering documentation.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": PROFILE.name,
      "url": SITE_SETTINGS.siteUrl,
      "jobTitle": "Software Engineer",
      "sameAs": [
        SOCIALS.github,
        SOCIALS.linkedin,
      ].filter(Boolean)
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": SITE_SETTINGS.siteName,
      "url": SITE_SETTINGS.siteUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Experiment Archive",
      "description": "A curated library of software experiments, architectural blueprints, and research logs.",
      "url": SITE_SETTINGS.siteUrl
    }
  ];

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-[var(--fg-primary)] focus:text-[var(--bg-primary)] focus:font-bold focus:outline-none"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
