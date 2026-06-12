import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
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
  metadataBase: new URL("https://vinaykrishna.dev"),
  title: "Experiment Zero — Vinay Krishna",
  description: "Software experiments, AI systems, architecture research, and engineering documentation.",
  keywords: ["Vinay Krishna", "Web Developer", "UI/UX Designer", "Portfolio", "Laboratory"],
  authors: [{ name: "Vinay Krishna" }],
  openGraph: {
    title: "Experiment Zero — Vinay Krishna",
    description: "Software experiments, AI systems, architecture research, and engineering documentation.",
    siteName: "Experiment Zero",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Experiment Zero",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiment Zero — Vinay Krishna",
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
      "name": "Vinay Krishna",
      "url": "https://vinaykrishna.dev",
      "jobTitle": "Software Engineer",
      "sameAs": [
        "https://github.com/vinaykrishna"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Experiment Zero",
      "url": "https://vinaykrishna.dev"
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Experiment Archive",
      "description": "A curated library of software experiments, architectural blueprints, and research logs.",
      "url": "https://vinaykrishna.dev"
    }
  ];

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
