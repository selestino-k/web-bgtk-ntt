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


export default function NavMenu() {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile} className="text-black">
      <NavigationMenuList className="flex-wrap font-geist gap-6">
        <NavigationMenuItem className="hidden md:block ">
          <NavigationMenuTrigger className="text-lg hover:text-primary bg-white-700/20">Profil</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md ">
                  <Link href="/profil/sambutan-kata" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Sambutan Kata</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md ">
                  <Link href="/profil/profil-lembaga" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Profil Lembaga</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/sejarah" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Sejarah</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/struktur-organisasi" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Struktur Organisasi</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/sarana-prasarana" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Sarana dan Prasana</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/tupoksi" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Tugas Pokok dan Fungsi</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/profil/visi-misi" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Visi Misi</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg hover:text-primary bg-white-700/20">Publikasi</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/publikasi/berita-terkini" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Berita Terkini</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/publikasi/pengumuman" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Pengumuman</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/publikasi/peraturan-juknis" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Peraturan dan Juknis</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/publikasi/unduh" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Unduh</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg hover:text-primary bg-white-700/20">ULT</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/ult/permintaan-informasi" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Permintaan Informasi</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/ult/pengaduan" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Pengaduan</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/ult/sp4n-lapor" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">SP4N Lapor</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/ult/wbs-itjen" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">WBS Itjen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/ult/aduan-itjen" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Aduan Itjen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/ult/sippn" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">SIPPN</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg hover:text-primary bg-white-700/20">SAKIP</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/rencana-strategis" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Rencana Strategis</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/laporan-kinerja" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Laporan Kinerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/perjanjian-kinerja" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Perjanjian Kinerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/penghargaan" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Penghargaan</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/wilayah-kerja" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Wilayah Kerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/sakip/visi-misi" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Visi Misi</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg hover:text-primary bg-white-700/20">Aplikasi</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://sinde.kemdikbud.go.id/login" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">SINDE</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/aplikasi/e-skp" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">e-SKP</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://dapo.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Dapodik</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="https://rumah.pendidikan.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Rumah Pendidikan</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg hover:text-primary bg-white-700/20">Lainnya</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-xl/20 border border-primary-500 bg-white/80 ">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/lainnya/faq" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">FAQ</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/lainnya/zi-wbk" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">ZI-WBK</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="/lainnya/survei" className="hover:text-primary hover:bg-gray-700/20 hover:font-semibold">Survei</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

