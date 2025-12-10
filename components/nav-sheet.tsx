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

export function NavSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg"><Menu size="50"/></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold font-geist text-primary">Menu</SheetTitle>
        </SheetHeader>
        <div className="mx-5 font-geist text-primary" >
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
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                    >
                        Profil Lembaga
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Sejarah
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Struktur Organisasi
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Sarana dan Prasana
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Wilayah Kerja
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Visi Misi
                </Link>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">    
            <AccordionTrigger className="text-lg font-bold">ULT</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                    >
                        Permintaan Informasi
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Pengaduan
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        SP4N Lapor
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        WBS Itjen
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Aduan Itjen
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        SIPPN
                </Link>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-bold">SAKIP</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                    >
                    Rencana Strategis 
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Laporan Kinerja
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Perjanjian Kinerja
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Penghargaan
                </Link>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-bold">Aplikasi</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                    >
                        SINDE
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        e-SKP
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Dapodik
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        Rumah Pendidikan
                </Link>
            </AccordionContent>
            
        </AccordionItem>
        
        <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-bold">Lainnya</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary font-semibold text-md bg-secondary/10 p-2 rounded-md"
                    >
                        FAQ
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-md font-semibold bg-secondary/10 p-2 rounded-md"
                    >
                        ZI-WBK
                </Link>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link 
                    href="/profil/tugas-dan-fungsi"
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
