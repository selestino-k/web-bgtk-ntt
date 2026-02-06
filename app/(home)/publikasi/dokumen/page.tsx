import { columns } from "./home-columns";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/lib/prisma";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export const metadata = {
    title: "Dokumen | BGTK Provinsi NTT",
    description: "Halaman Dokumen BGTK NTT",
};



async function getDocsData() {
    return await prisma.document.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

}
export const dynamic = 'force-dynamic';

export default async function DokumenPage() {
    const docsData = await getDocsData()
    const docsDataWithTableNumber = docsData.map((doc, index) => ({
        ...doc,
        tableNumber: index + 1
    }))

    return (

        <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">

            <main className="relative z-10 gap-20 p-8 flex w-full">


                <div className="text-left w-full">
                    <div className="mb-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Beranda</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                Publikasi
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dokumen</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Dokumen
                    </h2>
                    <div className="mb-10 text-md md:text-lg">
                        Unduh berbagai regulasi, dokumen, dan buku yang dapat membantu Anda dalam pengembangan profesionalisme.
                    </div>
                    <div className="w-full flex-wrap">
                        <DataTable columns={columns} data={docsDataWithTableNumber} />
                    </div>
                </div>
            </main>
        </div>
    );
}