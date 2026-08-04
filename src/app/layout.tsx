import type { Metadata } from "next";
import { draftMode } from "next/headers";
import "./globals.css";
import { VisualEditing } from "@/components/VisualEditing";
import { SanityLiveWithToken } from "@/components/SanityLiveWithToken";
import LayoutShell from "@/components/LayoutShell";
import { fetchCMS } from "@/lib/fetchCMS";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity.queries";
import type { SanitySiteSettings } from "@/lib/sanity.client";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sertradeproyectos.com"),
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
    canonical: "https://www.sertradeproyectos.com",
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
    url: "https://www.sertradeproyectos.com",
    siteName: "Sertrade Design",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://www.sertradeproyectos.com/img/sertrade-og-branding.jpg",
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
    images: ["https://www.sertradeproyectos.com/img/sertrade-og-branding.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return fetchCMS<SanitySiteSettings>(SITE_SETTINGS_QUERY);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="text/png" sizes="64x64" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#004691" />
        <meta name="theme-color" content="#004691" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.sertradeproyectos.com/#organization",
              name: "Sertrade Design",
              alternateName: ["Sertrade Proyectos", "Sertrade Industria"],
              url: "https://www.sertradeproyectos.com",
              logo: "https://www.sertradeproyectos.com/sertrade-logo.png",
              image: "https://www.sertradeproyectos.com/img/sertrade-og-branding.jpg",
              description: "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva de proyectos comerciales, industriales y de salud.",
              telephone: "+51-920-703-523",
              email: "sertrade.proyectos@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Guillermo Dansey 815, Int. 303",
                addressLocality: "Cercado de Lima",
                addressRegion: "Lima",
                postalCode: "",
                addressCountry: "PE",
              },
              areaServed: [
                { "@type": "Country", name: "Perú" },
                { "@type": "Country", name: "Colombia" },
                { "@type": "Country", name: "Ecuador" },
              ],
              serviceType: ["Arquitectura comercial", "Diseño de espacios", "EPCM", "Modelado 3D", "Recorridos virtuales", "Infoarquitectura"],
              foundingDate: "2010",
              knowsLanguage: "es",
              sameAs: [
                "https://www.instagram.com/sertrade.oficial",
                "https://www.instagram.com/sertrade.proyectos",
                "https://www.facebook.com/p/Sertrade-Industria-100086478233145",
                "https://www.facebook.com/profile.php/?id=61591207413728",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        {isDraftMode && <SanityLiveWithToken includeDrafts />}
        <LayoutShell siteSettings={siteSettings}>{children}</LayoutShell>
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}