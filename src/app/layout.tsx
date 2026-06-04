import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sertrade.vercel.app"),
  title: {
    default: "Sertrade Design | Construimos Confianza, Diseñamos Futuro",
    template: "%s | Sertrade Design",
  },
  description:
    "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva de proyectos comerciales, industriales y de salud.",
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
    "ingeniería premium",
    "implementación inmersiva",
  ],
  alternates: {
    canonical: "/",
  },
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
    title: "Sertrade Design | Construimos Confianza, Diseñamos Futuro",
    description:
      "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva de proyectos comerciales, industriales y de salud.",
    url: "https://sertrade.vercel.app",
    siteName: "Sertrade Design",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://sertrade.vercel.app/img/sertrade-og-branding.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Sertrade Design | Construimos Confianza, Diseñamos Futuro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sertrade Design | Construimos Confianza, Diseñamos Futuro",
    description:
      "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva.",
    images: ["https://sertrade.vercel.app/img/sertrade-og-branding.jpg"],
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
