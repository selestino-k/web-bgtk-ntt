import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

export default function NavDropdown() {
    return (
    <div className="grid justify-items-center py-1">
        <nav className="z-50 hidden md:flex items-center space-x-8 font-inter text-gray-800 hover:text-bold text-lg gap-6 md:gap-6 md:text-md">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-md font-medium hover:text-primary text-bold dark:hover:text-gray-50">
                Profil <ChevronDown className="ml-1 h-4 w-4"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl p-2 mt-2">
                <DropdownMenuItem >
                    <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                    >
                    Sambutan Kepala Balai GTK NTT
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link 
                    href="/profil/struktur-organisasi"
                    className="hover:text-primary text-base"
                    >
                    Sejarah
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link 
                    href="/profil/pejabat-pimpinan-tinggi"
                    className="hover:text-primary text-base"
                    >
                    Visi dan Misi
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link 
                    href="/profil/layanan"
                    className="hover:text-primary text-base"
                    >
                    Tugas Pokok dan Fungsi
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link 
                    href="/profil/galeri"   
                    className="hover:text-primary text-base"
                    >
                    Struktur Organisasi
                    </Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-md font-medium hover:text-primary text-bold dark:hover:text-gray-50">
                ZI-WBK <ChevronDown className="ml-1 h-4 w-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl p-2 mt-2">
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    Area Perubahan
                </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-md font-medium hover:text-primary text-bold dark:hover:text-gray-50">
                Unduh <ChevronDown className="ml-1 h-4 w-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl p-2 mt-2">
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    Regulasi
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    Dokumen
                </Link>
                </DropdownMenuItem><DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    Buku
                </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-md font-medium hover:text-primary text-bold dark:hover:text-gray-50">
                Informasi <ChevronDown className="ml-1 h-4 w-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl p-2 mt-2">
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    Rumah Pendidikan
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    Gerakan 7 Kebiasaan Anak Indonesia Hebat
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    Rapor Pendidikan
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    SIMPAN BGTK NTT
                </Link>
                </DropdownMenuItem>
                    <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    Sistem Naskah Dinas Elektronik (SINDE)
                </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-md font-medium hover:text-primary text-bold dark:hover:text-gray-50">
                ULT <ChevronDown className="ml-1 h-4 w-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white font-medium dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl p-2 mt-2">
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    SIPPN
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi"
                    className="hover:text-primary text-base"
                >
                    SP4N-LAPOR!
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi" 
                    className="hover:text-primary text-base"
                >
                    Maklumat
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link 
                    href="/profil/tugas-dan-fungsi" 
                    className="hover:text-primary text-base"
                >
                    Layanan Sarana Prasarana
                </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    </div>
)
}
