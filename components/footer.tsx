"use client";
import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
import { scrollToElement } from "@/utils/scroll";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-primary w-full dark:bg-gray-950/80">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16 max-w-7xl font-inter">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 place-items-center md:place-items-start">
   
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
                <ul className="space-y-2 text-sm text-white">
                    <li>
                        <Link href="/pinjam" className="hover:underline cursor-pointer">
                        Pinjam Sekarang
                        </Link>
                    </li>
                    <li>
                        <Link href="/daftar-alat" className="hover:underline cursor-pointer">
                        Inventaris Lab
                        </Link>
                    </li>
                    <li>
                        <Link href="#tentang" className="hover:underline cursor-pointer" onClick={() => scrollToElement('tentang')}>
                        Tentang
                        </Link>
                    </li>
                    <li>
                        <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                        Statistik
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="space-y-4 text-center md:text-left">
                <h3 className="text-lg font-semibold text-white">Tautan Terkait</h3>
                <ul className="space-y-2 text-sm text-white">
                    <li>
                        <Link href="/pinjam" className="hover:underline cursor-pointer">
                        Pinjam Sekarang
                        </Link>
                    </li>
                    <li>
                        <Link href="/daftar-alat" className="hover:underline cursor-pointer">
                        Inventaris Lab
                        </Link>
                    </li>
                    <li>
                        <Link href="#tentang" className="hover:underline cursor-pointer" onClick={() => scrollToElement('tentang')}>
                        Tentang
                        </Link>
                    </li>
                    <li>
                        <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                        Statistik
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="space-y-4 text-center md:text-left">
                <h3 className="text-lg font-semibold text-white">Agenda</h3>
                <ul className="space-y-2 text-sm text-white">
                <li>
                    <Link href="/pinjam" className="hover:underline cursor-pointer">
                    Pinjam Sekarang
                    </Link>
                </li>
                <li>
                    <Link href="/daftar-alat" className="hover:underline cursor-pointer">
                    Inventaris Lab
                    </Link>
                </li>
                <li>
                    <Link href="#tentang" className="hover:underline cursor-pointer" onClick={() => scrollToElement('tentang')}>
                    Tentang
                    </Link>
                </li>
                <li>
                    <Link href="#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                    Statistik
                    </Link>
                </li>
                </ul>
            </div>
        </div>
        <div className="md:hidden mt-8 pt-8  items-center text-center text-sm text-white">
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
            <div className="mt-8 pt-8  text-center text-sm text-white">
                <p>© {new Date().getFullYear()} BGTK NTT</p>
            </div>

        </div>
    </footer>
  )
}
