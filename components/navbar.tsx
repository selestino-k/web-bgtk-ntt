import Link from "next/link"
import Image from "next/image";
import NavDropdown from "./nav-dropdown";
import NavMenu from "./nav-menu";
import { NavSheet } from "./nav-sheet";

export default async function NavBar() {
  
  return (
    <header className="shadow-lg fixed top-0 z-20 w-full py-2 bg-secondary/80 dark:bg-gray-950/80">
      <div className="flex h-16 max-w-screen items-center text-primary justify-between px-6 md:px-4" >
        <Link href="/" className="flex items-center gap-2 hover:text-sidebar-primary" prefetch={false}>
          <Image src="/logo/kemdikdasmen.svg" alt="Balai GTK Logo" width={48} height={48} />
          <div className="grid grid-flow-col grid-rows-2 mt-2">
            <span className="text-2xl font-black font-inter mt-2 sm:text-md sm:text-[14px]">Balai GTK</span>
            <span className="text-sm font-geist font-bold sm:text-xs xs:text-[8px]">Provinsi NTT</span>
          </div>
        </Link>
        
        <div className="grid justify-items-center py-1">
          <NavMenu />
        </div>

        <div className="md:hidden sm:xs:flex">
          <NavSheet />
        </div>


        <div className="hidden md:flex items-center sm:xs:md:hidden">
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

      </div>
    </header>
  )

}