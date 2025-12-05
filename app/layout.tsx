import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Balai GTK NTT",
  description: "Website Resmi Balai GTK Provinsi NTT",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    
    <html lang="en">
      <body>
        <main className="gap-3 w-full scroll-smooth">
          <div className="flex w-full min-h-screen items-center justify-items-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
