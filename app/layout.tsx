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
    <html lang="en" className="w-full dark:bg-gray-900">
      <body className="m-0 p-0 w-full">
        <main className="w-full scroll-smooth">
          <NavBar />
          <div className="flex w-full min-h-screen items-center justify-center">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
