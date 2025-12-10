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
      <NavigationMenuList className="flex-wrap font-geist">
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg hover:text-primary">Profil</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md ">
                  <Link href="#">Profil Lembaga</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Sejarah</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Struktur Organisasi</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Sarana dan Prasana</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Wilayah Kerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Visi Misi</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg">ULT</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Permintaan Informasi</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Pengaduan</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">SP4N Lapor</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">WBS Itjen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Aduan Itjen</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">SIPPN</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg">SAKIP</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Rencana Strategis</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Laporan Kinerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Perjanjian Kinerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Penghargaan</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Wilayah Kerja</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Visi Misi</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg">Aplikasi</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">SINDE</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">e-SKP</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Dapodik</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Rumah Pendidikan</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg">Lainnya</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">FAQ</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">ZI-WBK</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Survei</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="text-md">
                  <Link href="#">Rumah Pendidikan</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

