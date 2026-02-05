"use client";
import Link from "next/link"
import { Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import { scrollToElement } from "@/utils/scroll";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "./dark-switch";

interface FooterProps {
    tags: {
        id: number;
        name: string;
    }[];
    tagId?: number;
}


export default function Footer({ tags, tagId }: FooterProps) {
    return (
        <footer className="bg-primary w-full dark:bg-gray-950/80">
            <div className="container mx-auto px-4 py-12 md:px-6 max-w-7xl font-montserrat">
                <div className="grid sm:grid-cols-1 gap-8 md:grid-cols-3 place-items-center md:place-items-start">

                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="lg:text-xl text-sm font-bold text-white">Hubungi Kami</h2>
                        <div className="space-y-3 text-xs lg:text-sm text-white">
                            <div className="flex items-start sm:text-left">
                                <MapPin className="mr-2 h-5 w-5 shrink-0 text-secondary dark:text-primary" />
                                <Link href="https://maps.app.goo.gl/fR76vqUh6ESDNZ8Z6" target="_blank" rel="noopener noreferrer" className="text-left hover:underline cursor-pointer">
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
                            <div className="hidden md:flex items-center mt-40">
                                <ModeToggle />
                                
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 text-center md:text-left mb-30 md:mb-0">
                        <h3 className="lg:text-xl text-sm font-bold text-white">Tag Berita</h3>
                        <div className="flex w-full flex-wrap gap-2 h-5 md:h-20 px-3 items-center md:items-start justify-center md:justify-start">
                        {tags.map((tag) => (
                            <Badge
                                key={tag.id}
                                variant={tagId === tag.id ? "default" : "secondary"}
                                asChild 
                                className="md:lg:py-1 px-1 lg:px-3 hover:cursor-pointer hover:opacity-80"
                            >
                                <Link 
                                    href={`/publikasi/berita-terkini?tag=${tag.id}`}
                                    className="font-semibold lg:text-xs text-xs"
                                >
                                    {tag.name}
                                </Link>
                            </Badge>
                        ))}

                        </div>
                    </div>

                    <div className="space-y-4 text-center md:text-left">
                        <h3 className="lg:text-xl text-sm font-bold text-white">Tautan Terkait</h3>
                        <ul className="space-y-2 text-xs lg:text-sm text-white">
                            <li>
                                <Link href="https://ijazah.data.kemendikdasmen.go.id/" className="hover:underline cursor-pointer" target="_blank" rel="noopener noreferrer">
                                    Portal data Induk Ijazah
                                </Link>
                            </li>
                            <li>
                                <Link href="https://pisn.kemdiktisaintek.go.id/" className="hover:underline cursor-pointer" target="_blank" rel="noopener noreferrer">
                                    Penomoran Ijazah dan Sertifikat Nasional (PISN)
                                </Link>
                            </li>
                            <li>
                                <Link href="https://pddikti.kemdiktisaintek.go.id/" className="hover:underline cursor-pointer" target="_blank" rel="noopener noreferrer">
                                    Pangkalan Data Pendidikan Tinggi (PDDikti)
                                </Link>
                            </li>
                            <li>
                                <Link href="https://kemdiktisaintek.go.id/" className="hover:underline cursor-pointer" target="_blank" rel="noopener noreferrer">
                                    Kemendiktisaintek
                                </Link>
                            </li>
                            <li>
                                <Link href="https://kemendikdasmen.go.id/" className="hover:underline cursor-pointer" target="_blank" rel="noopener noreferrer">
                                    Kemendikdasmen 
                                </Link>
                            </li>
                            <li>
                                <Link href="https://sapto.banpt.or.id/" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                                    Sistem Akreditasi Perguruan Tinggi Online
                                </Link>
                            </li>
                            <li>
                                <Link href="https://sinta.kemdiktisaintek.go.id/" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                                    Sinta (Science and Technology Index)
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="lg:hidden mt-8 pt-8  justify-items-center text-sm text-white grid grid-cols-2 gap-4 md:flex md:items-center md:justify-between">
                    <Image
                        src="/logo/ramah-ori-bordered.png"
                        alt="Kemendikdasmen Ramah"
                        width={120}
                        height={40}
                    />
                    <Image
                        src="/logo/pendidikan-ori-bordered.png"
                        alt="Pendidikan Bermutu"
                        width={120}
                        height={40}
                    />
                </div>

                <div className="mt-8 pt-8  text-start text-sm text-white flex items-end justify-between space-between">
                    <div>
                        <p>© {new Date().getFullYear()} BGTK NTT</p>
                    </div>
                    <div className="ml-4 justify-center items-center flex gap-4">
                        <Link href="https://www.facebook.com/balaigurupenggerakntt/" target="_blank" rel="noopener noreferrer">
                            <Facebook className="inline-block hover:cursor-pointer" />
                        </Link>
                        <Link href="https://twitter.com/BGTK_NTT" target="_blank" rel="noopener noreferrer">
                            <Image
                            
                                src="/logo/x-social-media-white-icon.svg"
                                alt="Twitter BGTK NTT"
                                width={25}
                                height={25}
                                className="inline-block hover:cursor-pointer color-white"
                            />
                        </Link>
                        <Link href="https://www.instagram.com/bgtkntt/" target="_blank" rel="noopener noreferrer">
                            <Instagram className="inline-block hover:cursor-pointer" />
                        </Link>
                        <Link href="https://www.tiktok.com/@bgtkntt" target="_blank" rel="noopener noreferrer">
                           <Image 
                            src="/logo/tiktok-outline-svgrepo-com.svg"
                            alt="TikTok BGTK NTT"
                            width={25}
                            height={25}
                            className="inline-block hover:cursor-pointer"
                           />
                        </Link>
                        <Link href="https://www.youtube.com/@bgtkntt/" target="_blank" rel="noopener noreferrer">
                            <Youtube className="inline-block hover:cursor-pointer h-7 w-7" />
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
