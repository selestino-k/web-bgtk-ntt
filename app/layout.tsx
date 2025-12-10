import type { Metadata, Viewport } from "next";
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
  title: "Balai GTK NTT",
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
     
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <main className="gap-3 w-full">
            <div className="flex w-full min-h-screen">
              {children}
            </div>
          </main>
        </body>
    </html>

  );
}
