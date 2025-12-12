import {columns, UnduhTable} from "./columns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<UnduhTable[]> {
  // Fetch data from your API here.
  return [
    {
        id: "1",
        nama: "Salinan Kepmen Nomor 234/O/2024 tentang Pedoman Formasi Jafung Guru, Pengawas, Pamong, Penilik",
        tipe: "Regulasi",

    },
    {
        id: "2",
        nama: "Perjanjian Kinerja Tahun 2025",
        tipe: "Dokumen",

    },
    {
        id: "3",
        nama: "Aturan Nomor 2 Tahun 2021",
        tipe: "Buku",

    },

    // ...
  ]
}
export default async function Unduh() {
      const data = await getData()

    return (
       
            <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
                <main className="relative z-10 gap-20 p-8 flex w-full">
                    
                    <div className="text-left w-full">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Unduh
                        </h2>
                        <div className="mb-10 text-md md:text-lg">
                            Unduh berbagai regulasi, dokumen, dan buku yang dapat membantu Anda dalam pengembangan profesionalisme.
                        </div>
                        <div className="w-full flex-wrap">
                              <DataTable columns={columns} data={data} />
                        </div>
                    </div>
                </main>
            </div>
    );
}