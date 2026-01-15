import Link from "next/link"
import Image from "next/image";
import NavMenu from "./nav-menu";
import { NavSheet } from "./nav-sheet";

export default async function NavBar() {

  return (
    <header className="shadow-lg fixed top-0 z-20 w-full py-2 bg-secondary/90 dark:bg-gray-950/80">
      <div className="flex h-16 max-w-screen items-center text-primary justify-between px-6 md:px-4" >
        <Link href="/" className="flex items-center gap-2 hover:text-sidebar-primary" prefetch={false}>
          <Image src="/logo/logo-web-bgtk-ntt.png" alt="Balai GTK Logo" width={250} height={48} />
        </Link>

        <div className="grid justify-items-center py-1">
          <NavMenu />
        </div>

        <div className="md:hidden sm:xs:flex">
          <NavSheet />
        </div>


        <div className="hidden md:flex items-center sm:xs:md:hidden">
          <Image
            src="/logo/Ramah-ori.png"
            alt="Kemendikdasmen Ramah"
            width={120}
            height={40}
          />
          <Image
            src="/logo/pendidikan-bermutu-ori.png"
            alt="Pendidikan Bermutu"
            width={120}
            height={40}
          />
        </div>

      </div>
    </header>
  )

}