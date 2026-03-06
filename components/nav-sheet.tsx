"use client"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { AdminModeToggle } from "./admin/admin-dark-switch"
import { useState } from "react"

export function NavSheet() {
    const [open, setOpen] = useState(false)

    const handleLinkClick = () => {
        setOpen(false)
    }

    return (
            <Sheet open={open} onOpenChange={setOpen}> 
                <SheetTrigger asChild>
                    <Button variant="outline" size="lg"><Menu size="50" /></Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-scroll" side="left">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold font-montserrat text-primary mb-5">Menu</SheetTitle> <AdminModeToggle />
                    </SheetHeader>
                    <div className="mx-5 font-montserrat text-primary" >
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            defaultValue="item-1"
                        >

                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-bold">Profil</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/sambutan-kata"
                                        className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Sambutan Kata
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/sejarah"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Sejarah
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/struktur-organisasi"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Struktur Organisasi
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/tupoksi"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Tugas Pokok dan Fungsi
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/visi-misi"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Visi Misi
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-bold">Publikasi</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/publikasi/berita-terkini"
                                        className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Berita Terkini
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/publikasi/pengumuman"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Pengumuman
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/publikasi/dokumen"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Dokumen
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/publikasi/sakip"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        SAKIP
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://kemendikdasmen.go.id/pencarian/siaran-pers" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Siaran Pers Kemendikdasmen
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-bold">ULT</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/ult/sarana-prasarana"
                                        className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Sarana dan Prasarana
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://s.id/ult-bgtkntt" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Survei Kepuasan Masyarakat (SKM)
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://prod.lapor.go.id"
                                        target="_blank"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        SP4N Lapor
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://wbs.kemendikdasmen.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        WBS Itjen
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://posko-pengaduan.itjen.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Aduan Itjen
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://posko-pengaduan.itjen.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        SIPPN
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="py-4">
                                <Link href="/ppid" className="text-lg font-bold" onClick={handleLinkClick}>
                                PPID
                                </Link>
                            </AccordionItem>   


                            <AccordionItem value="item-5">
                                <AccordionTrigger className="text-lg font-bold">Aplikasi</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://dapo.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>Dapodik</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://mail.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>e-Mail Kemendikdasmen</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://data.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>Portal Data Kemendikdasmen</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://rumah.pendidikan.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>Rumah Pendidikan</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://info.gtk.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>Info GTK</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://raporpendidikan.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>Rapor Pendidikan</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://sinde.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>SINDE</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://skp.sdm.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>e-SKP</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://data-sdm.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>SIPdasmen</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://sakti.kemenkeu.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>SAKTI Kemenkeu</Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link href="https://djponline.pajak.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md" onClick={handleLinkClick}>DJP Online</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6" className="py-4">
                                <Link href="/zi-wbk" className="text-lg font-bold" onClick={handleLinkClick}>
                                ZI-WBK
                                </Link>
                            </AccordionItem>   

                            <AccordionItem value="item-7" className="py-4">
                                <Link href="/ssd" className="text-lg font-bold" onClick={handleLinkClick}>
                                SSD
                                </Link>
                            </AccordionItem>
                            
                        </Accordion>
                    </div>
                </SheetContent>
            </Sheet>
    )
}