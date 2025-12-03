import Link from "next/link"
import { Book, ChevronDown } from "lucide-react"
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";


export default async function NavBar() {
  
  return (
    <header className="shadow-lg fixed top-0 z-50 w-full py-2 bg-secondary/80 dark:bg-gray-950/80">
      <div className="container mx-auto flex max-w-9xl items-center text-primary justify-between px-2 md:px-6 font-inter" >
        <Link href="/" className="flex items-center gap-2 hover:text-sidebar-primary" prefetch={false}>
          <Book/>
          <div className="grid grid-flow-col grid-rows-2">
            <span className="text-lg font-black font-geist">Balai GTK</span>
            <span className="text-sm font-geist">Provinsi NTT</span>
          </div>
        </Link>
        
        <div className="grid justify-items-center py-1">
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-md font-medium hover:hover:text-sidebar-primary dark:hover:text-gray-50 bg-transparent">
                Profil <ChevronDown className="ml-1 h-4 w-4"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 mt-2">
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Sambutan Kepala Balai GTK NTT
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/struktur-organisasi"
                  >
                    Sejarah
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/pejabat-pimpinan-tinggi"
                  >
                   Visi dan Misi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/layanan"
                  >
                    Tugas Pokok dan Fungsi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/galeri"
                  >
                    Struktur Organisasi
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-md font-medium hover:hover:text-sidebar-primary dark:hover:text-gray-50 bg-transparent">
                ZI-WBK <ChevronDown className="ml-1 h-4 w-4"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white  font-medium dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 mt-2">
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Area Perubahan
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-md font-medium hover:hover:text-sidebar-primary dark:hover:text-gray-50 bg-transparent">
                Unduh <ChevronDown className="ml-1 h-4 w-4"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 mt-2">
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Regulasi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Dokumen
                  </Link>
                </DropdownMenuItem><DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Buku
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

             <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-md font-medium hover:hover:text-sidebar-primary dark:hover:text-gray-50 bg-transparent">
                Informasi <ChevronDown className="ml-1 h-4 w-4"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 mt-2">
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Rumah Pendidikan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Gerakan 7 Kebiasaan Anak Indonesia Hebat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Rapor Pendidikan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    SIMPAN BGTK NTT
                  </Link>
                </DropdownMenuItem>
                    <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Sistem Naskah Dinas Elektronik (SINDE)
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-md font-medium hover:hover:text-sidebar-primary dark:hover:text-gray-50 bg-transparent">
                ULT <ChevronDown className="ml-1 h-4 w-4"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 mt-2">
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    SIPPN
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    SP4N-LAPOR!
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Maklumat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link 
                    href="/profil/tugas-dan-fungsi"
                  >
                    Layanan Sarana Prasarana
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            
          </nav>
        </div>
        <div className="hidden md:flex items-center">
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