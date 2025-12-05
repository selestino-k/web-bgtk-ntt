"use client";
import Link from "next/link"
import { Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { scrollToElement } from "@/utils/scroll";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="bg-primary w-full dark:bg-gray-950/80">
      <div className="container mx-auto px-4 py-12 md:px-6 max-w-7xl font-inter">
        <div className="grid sm:grid-cols-1 gap-8 md:grid-cols-4 place-items-center md:place-items-start">
   
            <div className="space-y-4 text-center md:text-left">
                <h2 className="text-lg font-bold text-white font-inter">Hubungi Kami</h2>
                    <div className="space-y-3 text-sm text-white">
                    <div className="flex items-start md:text-left">
                        <MapPin className="mr-2 h-5 w-5 shrink-0 text-secondary dark:text-primary" />
                        <Link href="https://maps.app.goo.gl/fR76vqUh6ESDNZ8Z6" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer">
                        <span>
                        Jl. Perintis Kemerdekaan I, Kayu Putih
                        <br />
                        Kec. Oebobo, Kota Kupang, Nusa Tenggara Timur
                        </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-secondary dark:text-primary" />
                        <span>bgtkntt@kemendikdasmen.go.id</span>
                    </div>
                </div>
            </div>

       
            <div className="space-y-4 text-center md:text-left">
                <h3 className="text-lg font-semibold text-white">Tag Berita</h3>
                    <div className="flex w-full flex-wrap gap-2 h-25">
                        <Badge variant="secondary" asChild className="px-2 py-1">
                            <Link href="/" className="font-semibold font-geist text-lg">Kabar Kementerian</Link>                        
                        </Badge>
                        <Badge variant="secondary" asChild className="px-2 py-1">
                            <Link href="/" className="font-semibold text-base">Internasional</Link>                        
                        </Badge>    
                        <Badge variant="secondary" asChild className="px-2 py-1"> 
                            <Link href="/" className="font-semibold text-base">Teknologi</Link>
                        </Badge>
                        <Badge variant="secondary" asChild className="px-2 py-1">
                            <Link href="/" className="font-semibold text-base">Humas</Link>
                        </Badge>
                        <Badge variant="secondary" asChild className="px-2 py-1">
                            <Link href="/" className="font-semibold text-base">Rumah Pendidikan</Link>
                        </Badge>
                        <Badge variant="secondary" asChild className="px-2 py-1">
                            <Link href="/" className="font-semibold text-base">Pendidikan</Link>
                        </Badge>
                        <Badge variant="secondary" asChild className="px-2 py-1">
                            <Link href="/" className="font-semibold text-base">Kabar Balai</Link>
                        </Badge>
                    </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
                <h3 className="text-lg font-semibold text-white">Tautan Terkait</h3>
                <ul className="space-y-2 text-sm text-white">
                    <li>
                        <Link href="/pinjam" className="hover:underline cursor-pointer">
                        Sistem Verifikasi Ijazah secara Elektronik (SIVIL)
                        </Link>
                    </li>
                    <li>
                        <Link href="/daftar-alat" className="hover:underline cursor-pointer">
                        Penomoran Ijazah Nasional (PIN)
                        </Link>
                    </li>
                    <li>
                        <Link href="#tentang" className="hover:underline cursor-pointer" onClick={() => scrollToElement('tentang')}>
                        Pangkalan Data Pendidikan Tinggi (PDDikti)
                        </Link>
                    </li>
                    <li>
                        <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                        Kementerian Riset dan Teknologi
                        </Link>
                    </li>
                      <li>
                        <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                        Kementerian Pendidikan Dasar dan Menengah Republik Indonesia
                        </Link>
                    </li>
                      <li>
                        <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                        Sistem Akreditasi Perguruan Tinggi Online
                        </Link>
                    </li>
                      <li>
                        <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                        Sinta (Science and Technology Index)
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="space-y-4 text-center md:text-left">
                <h3 className="text-lg font-semibold text-white">Agenda</h3>
                <ul className="space-y-2 text-sm text-white">
                <li>
                    <Link href="/pinjam" className="hover:underline cursor-pointer">
                    Rapat Presentasi Laman Website BGTK NTT
                    </Link>
                </li>
                <li>
                    <Link href="/daftar-alat" className="hover:underline cursor-pointer">
                    Workshop Penyusunan Dokumen Prosedur Operasional Standar (POS)
                    </Link>
                </li>
                <li>
                    <Link href="#tentang" className="hover:underline cursor-pointer" onClick={() => scrollToElement('tentang')}>
                    Rapat Evaluasi Pelaksanaan Anggaran Tahun 2024
                    </Link>
                </li>
                <li>
                    <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                    Sosialisasi ISK dan IPEPA oleh BAN-PT
                    </Link>
                </li>
                <li>
                    <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                    Rapat Pleno PAK
                    </Link>
                </li>
                <li>
                    <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                    Rapat Tim EKA
                    </Link>
                </li>
                <li>
                    <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                    Rapat Evaluasi Tim Penilai Angka Kredit (PAK)
                    </Link>
                </li>
                </ul>
            </div>

        </div>
        <div className="md:hidden mt-8 pt-8  justify-center items-center text-center text-sm text-white">
             <Image
                src="/logo/ramah.svg"
                alt="Kemendikdasmen Ramah"
                width={120}
                height={40}
                />
            <Image
                src="/logo/pendidikan-bermutu.svg"
                alt="Pendidikan Bermutu"
                width={120}
                height={40}
            />
        </div>
        
        <div className="mt-8 pt-8  text-start text-sm text-white flex items-end justify-between space-between">
            <div>
                 <p>© {new Date().getFullYear()} BGTK NTT</p>

            </div>
            <div className="ml-4 justify-center flex gap-4">
                 <Facebook className="inline-block hover:cursor-pointer" />
                 <Twitter className="inline-block hover:cursor-pointer" />
                 <Instagram className="inline-block hover:cursor-pointer" />
                 <Youtube className="inline-block hover:cursor-pointer" />  
            </div>
        </div>

    </div>
</footer>
  

  );
}
