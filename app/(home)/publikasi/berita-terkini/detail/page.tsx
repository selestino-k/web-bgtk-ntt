import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BeritaTerkiniDetail() {
    return (
        <div id="berita-terkini-detail" className="mt-20 flex place-items-start w-full px-10">
            <main className="relative z-10 gap-20 p-8 md:flex w-full block">
                <div className="text-left w-full">
                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Detail Berita Terkini
                    </h2>
                    <div className="mb-4 text-sm text-gray-500 flex space-x-4">
                        <span className="flex items-center space-x-1">
                            <User className="h-4 w-4 mr-1" />
                            <span>Operator</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>25 November 2025</span>
                        </span>
                    </div>
                    <div className="relative max-w-2xl h-auto items-center mx-auto">
                        <Image
                            src="/images/news/fotbar-bgtk.jpg"
                            alt="Detail Berita Terkini"
                            width ={800}
                            height={450}
                            className="rounded-lg mb-6 aspect-video object-cover w-full h-auto"
                            preload
                        />
                    </div>
                    <p className="text-md md:text-base font-inter text-justify">
                        Ini adalah contoh konten untuk halaman detail berita terkini. Di sini Anda dapat menampilkan informasi lengkap tentang berita, termasuk teks, gambar, dan elemen multimedia lainnya yang relevan dengan topik berita tersebut.
                    </p>
                    <p className="text-xs md:text-sm font-inter text-justify mt-10">Tag: <span className="space-x-1"><Badge className="font-semibold">Kabar Balai</Badge > <Badge className="font-semibold">Pendidikan</Badge> <Badge className="font-semibold">Humas</Badge></span> </p>
                </div>
            </main>
        </div>
    );
}   
