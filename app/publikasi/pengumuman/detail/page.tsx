import Image from "next/image";
import { User, Calendar } from "lucide-react";

export default function PengumumanDetail() {
    return (
        <div id="pengumuman-detail" className="mt-20 flex place-items-start w-full px-10">
            <main className="relative z-10 gap-20 p-8 md:flex w-full block">
                <div className="text-left w-full">
                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Detail Pengumuman
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
                            src="/images/placeholder.svg"
                            alt="Detail Pengumuman"
                            width ={800}
                            height={450}
                            className="rounded-lg mb-6 aspect-video object-cover w-full h-auto"
                            preload
                        />
                    </div>
                    <p className="text-md md:text-base font-inter text-justify">
                        Ini adalah contoh konten untuk halaman detail pengumuman. Di sini Anda dapat menampilkan informasi lengkap tentang pengumuman, termasuk teks, gambar, dan elemen multimedia lainnya yang relevan dengan topik pengumuman tersebut.
                    </p>
                </div>
            </main>
        </div>
    );
}   
