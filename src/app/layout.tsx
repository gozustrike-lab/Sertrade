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

export const metadata: Metadata = {
  title: "SERTRADE DESIGN - Arquitectura Comercial",
  description:
    "Transformamos espacios comerciales en experiencias memorables. Mas de 200 proyectos entregados en diseno comercial, de salud y residencial. Lima, Peru.",
  keywords: [
    "arquitectura comercial",
    "diseno comercial",
    "SERTRADE DESIGN",
    "arquitectura Peru",
    "diseno de espacios",
    "modelado 3D",
    "recorridos virtuales",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "SERTRADE DESIGN - Arquitectura Comercial",
    description: "Transformamos espacios comerciales en experiencias memorables.",
    siteName: "SERTRADE DESIGN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
