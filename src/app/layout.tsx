import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sertradedesign.com";

export const metadata: Metadata = {
  metadataBase: new URL("https://sertradedesign.com"),
  title: "Sertrade Design | Arquitectura Comercial e Innovacion",
  description:
    "Especialistas en diseno retail, corporativo y residencial. Transformamos espacios con eficiencia y estetica. Mas de 200 proyectos entregados en Lima y Latinoamerica.",
  keywords: [
    "arquitectura comercial",
    "diseno comercial",
    "Sertrade Design",
    "arquitectura Peru",
    "diseno de espacios",
    "modelado 3D",
    "recorridos virtuales",
    "EPCM",
    "diseno salud",
    "diseno residencial",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Sertrade Design | Arquitectura Comercial e Innovacion",
    description:
      "Especialistas en diseno retail, corporativo y residencial. Transformamos espacios con eficiencia y estetica.",
    siteName: "Sertrade Design",
    type: "website",
    url: siteUrl,
    locale: "es_PE",
    images: [
      {
        url: "/og-home-final.png",
        width: 1200,
        height: 630,
        alt: "Sertrade Design - Arquitectura Comercial e Innovacion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sertrade Design | Arquitectura Comercial e Innovacion",
    description:
      "Especialistas en diseno retail, corporativo y residencial. Transformamos espacios con eficiencia y estetica.",
    images: ["/og-home-final.png"],
    site: "@sertradedesign",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Standard Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#004691" />
        <meta name="theme-color" content="#004691" />

        {/* OG Image per page - injected by client-side for SPA */}
        <meta property="og:image" content="/og-home-final.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sertrade Design - Arquitectura Comercial e Innovacion" />
        <meta name="twitter:image" content="/og-home-final.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
