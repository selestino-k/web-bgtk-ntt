"use client"

import Link from "next/link"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"


export default function NavMenu() {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile} className="text-black dark:text-white">
      <NavigationMenuList className="flex-wrap font-montserrat gap-6">
        <NavigationMenuItem className="hidden md:block ">
          <NavigationMenuTrigger className="text-base text-primary bg-white-700/20 font-semibold">Profil</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md ">
                  <Link href="/profil/sambutan-kata" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Sambutan Kata</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md ">
                  <Link href="/profil/profil-lembaga" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Profil Lembaga</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/sejarah" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Sejarah</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/struktur-organisasi" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Struktur Organisasi</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/sarana-prasarana" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Sarana dan Prasana</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/tupoksi" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Tugas Pokok dan Fungsi</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/visi-misi" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Visi Misi</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-base text-primary bg-white-700/20 font-semibold">Publikasi</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/publikasi/berita-terkini" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Berita Terkini</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/publikasi/pengumuman" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Pengumuman</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/publikasi/peraturan-juknis" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Peraturan dan Juknis</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/publikasi/dokumen" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Dokumen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://ppid.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">PPID Kemendikdasmen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://kemendikdasmen.go.id/pencarian/siaran-pers" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Siaran Pers Kemendikdasmen</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-base text-primary bg-white-700/20 font-semibold">ULT</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://prod.lapor.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">SP4N Lapor</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://wbs.kemendikdasmen.go.id/" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">WBS Itjen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://posko-pengaduan.itjen.kemendikdasmen.go.id/" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Aduan Itjen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://sippn.menpan.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">SIPPN</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-base text-primary bg-white-700/20 font-semibold">SAKIP</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/rencana-strategis" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Rencana Strategis</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/laporan-kinerja" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Laporan Kinerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/perjanjian-kinerja" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Perjanjian Kinerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/penghargaan" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Penghargaan</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-base text-primary bg-white-700/20 font-semibold">Aplikasi</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://dapo.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Dapodik</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://mail.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">e-Mail Kemendikasmen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://data.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Portal Data Kemendikdasmen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://rumah.pendidikan.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Rumah Pendidikan</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://info.gtk.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Info GTK</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://raporpendidikan.kemendikdasmen.go.id/login" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Rapor Pendidikan</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://sinde.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">SINDE</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://skp.sdm.kemdikbud.go.id/skp/site/login.jsp" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">e-SKP</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://data-sdm.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">SIPdasmen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://sakti.kemenkeu.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">SAKTI Kemenkeu</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://djponline.pajak.go.id/account/login" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">DJP Online</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <Button variant="ghost" className="p-0 m-0 hidden md:block mx-3">
          <Link href="/zi-wbk" className="text-base text-primary font-montserrat font-semibold hover:text-primary/70 transition-colors">ZI-WBK</Link>
        </Button>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-base text-primary bg-white-700/20 font-semibold">Lainnya</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/lainnya/faq" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">FAQ</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/lainnya/survei" className="hover:text-primary font-medium hover:bg-gray-700/20 hover:font-semibold">Survei</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

