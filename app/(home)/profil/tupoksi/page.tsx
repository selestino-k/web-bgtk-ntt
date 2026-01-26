import { PrescenceMotion } from "@/components/motion/presence-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function TuPoksi() {
    return (
        <PrescenceMotion>
            <div className="flex justify-center items-center min-h-screen w-full">
                <div id="sambutan" className="mt-20 w-full max-w-7xl place-items-start px-10">
                    <main className="relative z-10 flex flex-col gap-3 p-8 w-full">
                        <Breadcrumb className="mb-4 font-geist text-gray-600">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Beranda</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    Profil
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Tugas Pokok dan Fungsi</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="text-left">
                            <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                                Tugas Pokok dan Fungsi
                            </h2>
                            <h3 className="text-md md:text-xl sm:tracking-tight mb-1 md:mb-3 font-geist">
                                Tugas
                            </h3>
                            <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify mb-3 md:mb-6 ">
                                Melaksanakan pengembangan dan pemberdayaan guru, pendidik lainnya, tenaga kependidikan, calon kepala sekolah, kepala sekolah, calon pengawas sekolah, dan pengawas sekolah.
                            </p>
                            <h3 className="text-md md:text-xl sm:tracking-tight mb-1 md:mb-3 font-geist">
                                Fungsi
                            </h3>
                            <ul className="list-disc ml-5 mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                                <li>
                                    Pelaksanaan pemetaan kompetensi guru, pendidik lainnya, tenaga kependidikan, calon kepala sekolah, kepala sekolah, calon pengawas sekolah, dan pengawas sekolah.
                                </li>
                                <li>
                                    Pengembangan model peningkatan kompetensi guru, pendidik lainnya, tenaga kependidikan, calon kepala sekolah, kepala sekolah, calon pengawas sekolah, dan pengawas sekolah.
                                </li>
                                <li>
                                    Pelaksanaan peningkatan kompetensi guru, pendidik lainnya, tenaga kependidikan, calon kepala sekolah, kepala sekolah, calon pengawas sekolah, dan pengawas sekolah.
                                </li>
                                <li>
                                    Pelaksanaan fasilitasi peningkatan kompetensi guru, pendidik lainnya, tenaga kependidikan, calon kepala sekolah, kepala sekolah, calon pengawas sekolah, dan pengawas sekolah.
                                </li>
                                <li>
                                    Pelaksanaan supervisi peningkatan kompetensi guru, pendidik lainnya, tenaga kependidikan, calon kepala sekolah, kepala sekolah, calon pengawas sekolah, dan pengawas sekolah.
                                </li>
                                <li>
                                    Pelaksanaan pemantauan dan evaluasi pengembangan dan pemberdayaan guru, pendidik lainnya, tenaga kependidikan, calon kepala sekolah, kepala sekolah, calon pengawas sekolah, dan pengawas sekolah.
                                </li>
                                <li>
                                    Pelaksanaan kemitraan di bidang pengembangan dan pemberdayaan guru, pendidik lainnya, tenaga kependidikan, calon kepala sekolah, kepala sekolah, calon pengawas sekolah, dan pengawas sekolah.
                                </li>
                                <li>
                                    Pelaksanaan urusan administrasi.
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </PrescenceMotion>
    );
}