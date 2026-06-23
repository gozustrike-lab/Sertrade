import type { Metadata } from "next";
import "./globals.css";
import { VisualEditing } from "@/components/VisualEditing";
import { SanityLive } from "@/sanity/live";
import LayoutShell from "@/components/LayoutShell";
import { fetchCMS } from "@/lib/fetchCMS";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity.queries";
import type { SanitySiteSettings } from "@/lib/sanity.client";

export const metadata: Metadata = {
  title: { default: "Tu Empresa | Sitio Web Profesional", template: "%s | Tu Empresa" },
  description: "Sitio web profesional con CMS y edicion visual.",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  robots: { index: true, follow: true },
};

async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return fetchCMS<SanitySiteSettings>(SITE_SETTINGS_QUERY);
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteSettings = await getSiteSettings();
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="var(--brand-primary, #004691)" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <SanityLive />
        <LayoutShell siteSettings={siteSettings}>{children}</LayoutShell>
        <VisualEditing />
      </body>
    </html>
  );
}
