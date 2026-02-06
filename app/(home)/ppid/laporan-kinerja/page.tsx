import { columns } from "@/app/(home)/publikasi/dokumen/columns";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/lib/prisma";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,  } from "@/components/ui/breadcrumb";
import Link from "next/link";


export const metadata = {
    title: "Laporan Kinerja | BGTK Provinsi NTT",
    description: "Halaman Laporan Kinerja BGTK NTT",
};



async function getDocsData() {
    return await prisma.document.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        where: {
            category: 'Laporan Kinerja',
        },
    });

}

export default async function LaporanKinerjaPage() {
    const docsData = await getDocsData()
    const docsDataWithTableNumber = docsData.map((doc, index) => ({
        ...doc,
        tableNumber: index + 1
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
                                    Laporan Kinerja
                                </BreadcrumbPage>
                              </BreadcrumbItem>
                            </BreadcrumbList>
                          </Breadcrumb>
                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Laporan Kinerja
                    </h2>
                    <div className="mb-10 text-md md:text-lg">
                        Halaman ini menyediakan akses kepada dokumen-dokumen laporan kinerja yang memuat capaian, evaluasi, dan progres dari berbagai program dan inisiatif yang telah kami laksanakan. Laporan kinerja ini disusun sebagai bentuk akuntabilitas dan transparansi kami dalam menjalankan tugas dan fungsi sebagai lembaga yang berdedikasi untuk memajukan dunia pendidikan di Nusa Tenggara Timur. Melalui laporan ini, kami berupaya memberikan gambaran menyeluruh tentang upaya, tantangan, dan keberhasilan yang telah dicapai, serta langkah-langkah strategis ke depan
                    </div>
                    <div className="w-full flex-wrap">
                        <DataTable columns={columns} data={docsDataWithTableNumber} />
                    </div>
                </div>
            </main>
        </div>
    );
}