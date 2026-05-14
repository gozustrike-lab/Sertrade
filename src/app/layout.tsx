import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sertradedesign.com"),
  title: {
    default: "Sertrade Design | Arquitectura Comercial e Innovación",
    template: "%s | Sertrade Design",
  },
  description:
    "Sertrade Design: Innovación y Eficiencia en Arquitectura Comercial, Salud y Residencial. Transformamos visiones en estructuras sólidas.",
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
    title: "Sertrade Design | Arquitectura Comercial e Innovación",
    description:
      "Sertrade Design: Innovación y Eficiencia en Arquitectura Comercial, Salud y Residencial. Transformamos visiones en estructuras sólidas.",
    siteName: "Sertrade Design",
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 675,
        alt: "Sertrade Design - Innovación y Eficiencia en Arquitectura Comercial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sertrade Design | Arquitectura Comercial e Innovación",
    description:
      "Sertrade Design: Innovación y Eficiencia en Arquitectura Comercial, Salud y Residencial. Transformamos visiones en estructuras sólidas.",
    images: ["/og-image.png"],
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
