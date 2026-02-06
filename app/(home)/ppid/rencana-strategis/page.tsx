import { columns } from "@/app/(home)/publikasi/dokumen/columns";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/lib/prisma";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,  } from "@/components/ui/breadcrumb"; 
import Link from "next/link";


export const metadata = {
    title: "Rencana Strategis | BGTK Provinsi NTT",
    description: "Halaman Rencana Strategis BGTK NTT",
};


async function getDocsData() {
    return await prisma.document.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        where: {
            category: 'Rencana Strategis',
        },
    });

}

export default async function RencanaStrategisPage() {
    const docsData = await getDocsData()
    const docsDataWithTableNumber = docsData.map((doc, index) => ({
        ...doc,
        tableNumber: index + 1,
    }))

    return (

        <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
            <main className="relative z-10 gap-20 p-8 flex w-full">

                <div className="text-left w-full">
                    <Breadcrumb className="mb-4 font-geist" aria-label="Breadcrumb">
                            <BreadcrumbList className="flex flex-wrap gap-2">
                              <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                  <Link href="/" className="hover:underline">
                                    Beranda
                                  </Link>
                                </BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator/>
                              <BreadcrumbItem>
                                    SAKIP
                              </BreadcrumbItem>
                              <BreadcrumbSeparator/>
                              <BreadcrumbItem>
                                <BreadcrumbPage>
                                    Rencana Strategis
                                </BreadcrumbPage>
                              </BreadcrumbItem>
                            </BreadcrumbList>
                          </Breadcrumb>
                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Rencana Strategis
                    </h2>
                    <div className="mb-10 text-md md:text-lg">
                        Halaman ini menyajikan dokumen perencanaan strategis yang menjadi panduan utama dalam menentukan arah, tujuan, dan prioritas kami dalam menjalankan program dan layanan. Rencana strategis ini disusun dengan cermat untuk memastikan bahwa setiap langkah yang kami ambil selaras dengan visi, misi, dan nilai-nilai yang kami pegang, serta responsif terhadap kebutuhan dan harapan masyarakat. Melalui dokumen ini, kami berkomitmen untuk meningkatkan kinerja, inovasi, dan akuntabilitas dalam setiap aspek pelayanan.
                    </div>
                    <div className="w-full flex-wrap">
                        <DataTable columns={columns} data={docsDataWithTableNumber} />
                    </div>
                </div>
            </main>
        </div>
    );
}