import PengumumanCard from "@/components/pengumuman-card";
export default function Pengumuman() {
    return (
       
            <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
                <main className="relative z-10 gap-20 p-8 flex w-full">
                    
                    <div className="text-left w-full">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Pengumuman
                        </h2>
                            <PengumumanCard />

                    </div>
                </main>
            </div>
    );
}