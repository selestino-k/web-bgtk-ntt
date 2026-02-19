import type { Metadata, Viewport } from "next";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { ReportView } from "@/components/view-counter";
import prisma from "@/lib/prisma";

async function getTags() {
  return await prisma.tag.findMany({
    where: {
      type: { equals: 'CATEGORY' },
    },
    orderBy: {
      name: 'asc',
    },
  });
}


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PROD_BASE_URL || "http://localhost:3000"),
  title: "Balai Guru dan Tenaga Kependidikan (BGTK) Provinsi NTT",
  keywords: ["Balai GTK NTT", "Balai GTK Provinsi NTT", "BGTK NTT", "Balai Guru dan Tenaga Kependidikan NTT"],
  description: "Balai Guru dan Tenaga Kependidikan Provinsi Nusa Tenggara Timur",
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

