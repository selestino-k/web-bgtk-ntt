import {columns} from "./columns";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/lib/prisma";



async function getDocsData (){
   return await prisma.document.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    });

}

export default async function DokumenPage() {
      const docsData = await getDocsData()

    return (
       
            <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
                <main className="relative z-10 gap-20 p-8 flex w-full">
                    
                    <div className="text-left w-full">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Dokumen
                        </h2>
                        <div className="mb-10 text-md md:text-lg">
                            Unduh berbagai regulasi, dokumen, dan buku yang dapat membantu Anda dalam pengembangan profesionalisme.
                        </div>
                        <div className="w-full flex-wrap">
                              <DataTable columns={columns} data={docsData} />
                        </div>
                    </div>
                </main>
            </div>
    );
}