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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg"><Menu size="50"/></Button>
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
                    href="/publikasi/unduh"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Unduh
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
                    href="/ult/wbs-itjen" className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        WBS Itjen
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/ult/aduan-itjen"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Aduan Itjen
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/ult/sippn"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        SIPPN
                </Link>
            </AccordionContent>
            {/* <AccordionItem value="item-4"> */}
{/* 
            <AccordionTrigger className="text-lg font-bold">SAKIP</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/sakip/rencana-strategis"
                    className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                    >
                        Rencana Strategis
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/sakip/laporan-kinerja"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Laporan Kinerja
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/sakip/perjanjian-kinerja"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Perjanjian Kinerja
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/sakip/penghargaan"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Penghargaan
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/sakip/wilayah-kerja"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Wilayah Kerja
                </Link>
            </AccordionContent> */}
            
            
        {/* </AccordionItem> */}
            
        </AccordionItem>
        <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-bold">Aplikasi</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="https://sinde.kemdikbud.go.id/"
                    target="_blank"
                    className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                    >
                        SINDE
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="https://skp.sdm.kemdikbud.go.id/skp/site/login.jsp"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        e-SKP
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="https://dapo.kemendikdasmen.go.id/"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Dapodik
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="https://rumah.pendidikan.go.id/"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Rumah Pendidikan
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="https://raporpendidikan.kemendikdasmen.go.id/"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Rapor Pendidikan 
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="https://info.gtk.kemendikdasmen.go.id/"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        GTK
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="https://raporpendidikan.kemendikdasmen.go.id/login"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Rapor Pendidikan
                </Link>
            </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
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
                    href="/lainnya/zi-wbk"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        ZI-WBK
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
  )
}
