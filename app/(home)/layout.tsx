import type { Metadata, Viewport } from "next";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { ReportView } from "@/components/view-counter";
import { db } from "@/lib/db/db";
import { tag } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

async function getTags() {
  return await db
    .select()
    .from(tag)
    .where(eq(tag.type, "CATEGORY"))
    .orderBy(asc(tag.name));
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PROD_APP_URL || "http://localhost:3000"),
  title: "BGTK Provinsi NTT",
  keywords: ["Balai GTK NTT", "Balai GTK Provinsi NTT", "BGTK NTT", "Balai Guru dan Tenaga Kependidikan NTT"],
  description: "Website Resmi Balai Guru dan Tenaga Kependidikan Provinsi Nusa Tenggara Timur",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="gap-3 w-full scroll-smooth">
      <ReportView slug="homepage" />
      <NavBar />
      <div className="flex w-full min-h-screen items-center justify-center">
        {children}
      </div>
      <Footer tags={await getTags()} tagId={undefined} />
    </main>
  );
}
