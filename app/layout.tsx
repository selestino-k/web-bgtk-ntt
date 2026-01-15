import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Google_Sans_Code, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balai GTK Provinsi NTT",
  description: "Website Resmi Balai GTK Provinsi NTT",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Add custom properties as needed
  // minimumScale: 1,
  // maximumScale: 1,
  // viewportFit: 'cover', 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#297bbf" />
      <body className={`${geistSans.variable} ${montserrat.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
