import { columns } from "@/app/(home)/publikasi/dokumen/columns";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/lib/prisma";



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

    return (

        <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
            <main className="relative z-10 gap-20 p-8 flex w-full">

                <div className="text-left w-full">
                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Perjanjian Kinerja
                    </h2>
                    <div className="mb-10 text-md md:text-lg">
                        Halaman ini menyediakan akses kepada dokumen-dokumen perjanjian kinerja yang menjadi landasan dalam menjalankan tugas dan tanggung jawab kami sebagai lembaga penggerak pendidikan di Nusa Tenggara Timur. Perjanjian kinerja ini disusun sebagai komitmen resmi untuk mencapai target dan indikator kinerja yang telah ditetapkan, sejalan dengan visi, misi, dan tujuan strategis kami. Dokumen ini juga mencerminkan upaya kami dalam meningkatkan akuntabilitas, transparansi, dan kualitas pelayanan kepada masyarakat
                    </div>
                    <div className="w-full flex-wrap">
                        <DataTable columns={columns} data={docsData} />
                    </div>
                </div>
            </main>
        </div>
    );
}