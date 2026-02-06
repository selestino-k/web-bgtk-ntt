import { columns } from "@/app/(home)/publikasi/dokumen/columns";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/lib/prisma";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,  } from "@/components/ui/breadcrumb";
import Link from "next/link";

export const metadata = {
    title: "Perjanjian Kinerja | BGTK Provinsi NTT",
    description: "Halaman Perjanjian Kinerja BGTK NTT",
};


async function getDocsData() {
    return await prisma.document.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        where: {
            category: 'Perjanjian Kinerja',
        },
    });

}

export default async function PerjanjianKinerjaPage() {
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
                                    Perjanjian Kinerja
                                </BreadcrumbPage>
                              </BreadcrumbItem>
                            </BreadcrumbList>
                          </Breadcrumb>





                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Perjanjian Kinerja
                    </h2>
                    <div className="mb-10 text-md md:text-lg">
                        Halaman ini menyediakan akses kepada dokumen-dokumen perjanjian kinerja yang menjadi landasan dalam menjalankan tugas dan tanggung jawab kami sebagai lembaga penggerak pendidikan di Nusa Tenggara Timur. Perjanjian kinerja ini disusun sebagai komitmen resmi untuk mencapai target dan indikator kinerja yang telah ditetapkan, sejalan dengan visi, misi, dan tujuan strategis kami. Dokumen ini juga mencerminkan upaya kami dalam meningkatkan akuntabilitas, transparansi, dan kualitas pelayanan kepada masyarakat
                    </div>
                    <div className="w-full flex-wrap">
                        <DataTable columns={columns} data={docsDataWithTableNumber} />
                    </div>
                </div>
            </main>
        </div>
    );
}