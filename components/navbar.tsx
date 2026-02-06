import Link from "next/link"
import Image from "next/image";
import NavMenu from "./nav-menu";
import { NavSheet } from "./nav-sheet";

export default async function NavBar() {

  return (
    <header className="shadow-lg fixed top-0 z-20 w-full py-2 bg-secondary/85 dark:bg-gray-950/85 blur-effect">
      <div className="flex h-16 max-w-screen items-center text-primary xl:justify-between px-4 md:px-4" >
        
        <div className="xl:hidden flex">
          <NavSheet />
        </div>
        
        <Link href="/" className="flex lg:flex lg:items-start xl:items-start xl:px-2 px-6 items-center gap-1" prefetch={false}>
          <Image src="/logo/logo-web-bgtk-ntt.svg" alt="Balai GTK Logo" width={220} height={48} />
        </Link>

        <div className="xl:grid justify-items-center py-0 hidden">
          <NavMenu />
        </div>

        <div className="hidden xl:flex items-center gap-4">
          <Image
            src="/logo/Ramah-ori.png"
            alt="Kemendikdasmen Ramah"
            width={110}
            height={40}
          />
          <Image
            src="/logo/pendidikan-bermutu-ori.png"
            alt="Pendidikan Bermutu"
            width={110}
            height={40}
          />
        </div>

      </div>
    </header>
  )

}