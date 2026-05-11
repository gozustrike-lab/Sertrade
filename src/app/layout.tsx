import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sertradedesign.com"),
  title: {
    default: "Sertrade Design | Arquitectura Comercial e Innovacion",
    template: "%s | Sertrade Design",
  },
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#004691" />
        <meta name="theme-color" content="#004691" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
