import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "BOYANG-CPNS — Dashboard Persiapan CPNS 2026 & Explorer 304 Formasi",
  description:
    "Platform persiapan CPNS 2026 mandiri BOYANG-CPNS: Explorer 304 PDF Formasi Instansi, Modul Materi SKD (TWK, TIU, TKP), Simulasi Tryout CAT, dan Panduan SSCASN hanya Rp 10.000 via QRIS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${montserrat.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
