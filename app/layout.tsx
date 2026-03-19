import type { Metadata, Viewport } from "next";
import {  Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PROD_APP_URL || "http://localhost:3000"),
  title: "Balai GTK Provinsi NTT",
  description: "Website Resmi Balai GTK Provinsi NTT",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#297bbf', 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
        >
          <main className="gap-3 w-full">
            <div className="flex w-full min-h-screen">
              {children}
            </div>
          </main>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>

  );
}