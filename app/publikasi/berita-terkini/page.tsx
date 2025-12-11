import { Button } from "@/components/ui/button";
import NewsCard from "@/components/news-card";

export default function BeritaTerkini() {
    return (
       
            <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
                <main className="relative z-10 gap-20 p-8 md:flex w-full block">
                    <div className="mb-5 md:w-1/6">
                        <h2 className="text-md md:text-xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Tag Berita
                        </h2>
                        <div className="md:flex md:flex-col md:gap-2 inline-grid grid-cols-1 gap-5 w-full">
                            <Button variant="default" size="sm">Semua</Button>
                            <Button variant="default" size="sm">Kabar Kementerian</Button>
                            <Button variant="default" size="sm">Internasional</Button>
                            <Button variant="default" size="sm">Teknologi</Button>
                            <Button variant="default" size="sm">Humas</Button>
                            <Button variant="default" size="sm">Rumah Pendidikan</Button>
                            <Button variant="default" size="sm">Pendidikan</Button>
                            <Button variant="default" size="sm">Kabar Balai</Button>
                        </div>
                    </div>
                    <div className="text-left md:w-5/6">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Berita Terkini
                        </h2>
                            <NewsCard />

                    </div>
                </main>
            </div>
    );
}