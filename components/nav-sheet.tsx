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

export function NavSheet() {
    return (
        <div className="overflow-visible" >
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="lg"><Menu size="50" /></Button>
                </SheetTrigger>
                <SheetContent className="overflow-visible">
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
                                    >
                                        Sambutan Kata
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/sejarah"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Sejarah
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/struktur-organisasi"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Struktur Organisasi
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/tupoksi"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Tugas Pokok dan Fungsi
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/profil/visi-misi"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
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
                                    >
                                        Berita Terkini
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/publikasi/pengumuman"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Pengumuman
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/publikasi/peraturan-juknis"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Peraturan dan Juknis
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/publikasi/dokumen"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Dokumen
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://ppid.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        PPID Kemendikdasmen
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://kemendikdasmen.go.id/pencarian/siaran-pers" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Siaran Pers Kemendikdasmen
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-bold">ULT</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://prod.lapor.go.id"
                                        target="_blank"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        SP4N Lapor
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://wbs.kemendikdasmen.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        WBS Itjen
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://posko-pengaduan.itjen.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Aduan Itjen
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="https://posko-pengaduan.itjen.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        SIPPN
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-lg font-bold">SAKIP</AccordionTrigger>
                                <AccordionContent className="text-md">
                                    <Link href="/sakip/rencana-strategis" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Rencana Strategis</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="/sakip/laporan-kinerja" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Laporan Kinerja</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="/sakip/perjanjian-kinerja" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Perjanjian Kinerja</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="/sakip/penghargaan" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Penghargaan</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger className="text-lg font-bold">Aplikasi</AccordionTrigger>
                                <AccordionContent className="text-md">
                                    <Link href="https://dapo.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Dapodik</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://mail.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">e-Mail Kemendikdasmen</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://data.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Portal Data Kemendikdasmen</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://rumah.pendidikan.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Rumah Pendidikan</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://info.gtk.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Info GTK</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://raporpendidikan.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Rapor Pendidikan</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://sinde.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">SINDE</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://skp.sdm.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">e-SKP</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://data-sdm.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">SIPdasmen</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://sakti.kemenkeu.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">SAKTI Kemenkeu</Link>
                                </AccordionContent>
                                <AccordionContent className="text-md">
                                    <Link href="https://djponline.pajak.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">DJP Online</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6">
                                <Link href="/zi-wbk">
                                <AccordionTrigger className="text-lg font-bold">ZI-WBK</AccordionTrigger>
                                </Link>
                            </AccordionItem>

                            <AccordionItem value="item-7">
                                <AccordionTrigger className="text-lg font-bold">Lainnya</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/lainnya/faq"
                                        className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                                    >
                                        FAQ
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <Link
                                        href="/lainnya/survei"
                                        className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                                    >
                                        Survei
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
