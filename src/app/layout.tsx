import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sertradedesign.com"),
  title: {
    default: "Sertrade Design | Arquitectura Comercial, Diseño y Construcción",
    template: "%s | Sertrade Design",
  },
  description:
    "Sertrade Design — Estudio de arquitectura especializado en diseño y ejecución de espacios comerciales, de salud y residenciales. Más de 200 proyectos entregados en Perú, Colombia y Ecuador. EPCM, modelado 3D, recorridos virtuales e infoarquitectura.",
  keywords: [
    "arquitectura comercial",
    "diseño comercial",
    "Sertrade Design",
    "arquitectura Perú",
    "diseño de espacios",
    "modelado 3D",
    "recorridos virtuales",
    "EPCM",
    "diseño salud",
    "diseño residencial",
    "arquitectura Colombia",
    "arquitectura Ecuador",
    "infoarquitectura",
    "construcción comercial",
    "remodelación comercial",
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
    title: "Sertrade Design | Arquitectura Comercial, Diseño y Construcción",
    description:
      "Estudio de arquitectura con más de 14 años de experiencia. Diseño y ejecución de espacios comerciales, de salud y residenciales en Latinoamérica.",
    siteName: "Sertrade Design",
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/og-home-final.png",
        width: 1200,
        height: 630,
        alt: "Sertrade Design — Arquitectura Comercial e Innovación en Latinoamérica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sertrade Design | Arquitectura Comercial, Diseño y Construcción",
    description:
      "Estudio de arquitectura con más de 14 años de experiencia. Diseño y ejecución de espacios comerciales, de salud y residenciales en Latinoamérica.",
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
      <body className="antialiased bg-background text-foreground">
        <Preloader />
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
