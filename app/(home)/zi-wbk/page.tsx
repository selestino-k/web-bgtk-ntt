import { PrescenceMotion } from "@/components/motion/presence-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";


export default function ZIWBKPage() {
    return (
        <PrescenceMotion>
            <div id="faq" className="mt-20 w-full max-w-7xl place-items-start px-10">
                <main className="relative z-10 flex flex-col gap-3 p-8 w-full">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Beranda</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                ZI-WBK
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Area Perubahan</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="text-left">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Area Perubahan ZI-WBK
                        </h2>

                        <Image
                            src="/images/zi-wbk-area-perubahan.jpg"
                            alt="Area Perubahan ZI-WBK"
                            width={800}
                            height={400}
                            className="w-full h-auto rounded-lg mt-4"
                        />

                        <p className="text-balance md:text-base font-inter mt-4">
                            Pimpinan dan pegawai di Satuan Kerja perlu memahami dan berkomitmen mengenai substansi dari enam area perubahan menuju Reformasi Birokrasi yang di dalamnya ada yang dinamakan Zona Integritas Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM). Hal itu dilakukan melalui keterlibatan pimpinan secara aktif dalam melakukan monitoring dan evaluasi pembangunan ZI. Selain itu, pimpinan juga harus berdialog dengan seluruh pegawai secara berjenjang.
                        </p>
                        <p className="text-balance md:text-base font-inter mt-4">
                            Enam area perubahan tersebut meliputi:
                        </p>
                        <ol className="list-decimal list-inside mt-4 space-y-2 text-balance md:text-base font-inter">
                            <li>
                                <span className="font-bold">Manajemen Perubahan:</span> Melibatkan perubahan pola pikir dan budaya kerja pegawai untuk mendukung reformasi birokrasi.
                            </li>
                            <li>
                                <span className="font-bold">Penataan Tata Laksana:</span> Melakukan penyederhanaan proses bisnis dan prosedur kerja untuk meningkatkan efisiensi dan efektivitas pelayanan publik.
                            </li>
                            <li>
                                <span className="font-bold">Penataan Sistem Manajemen SDM:</span> Meningkatkan kompetensi, integritas, dan profesionalisme pegawai melalui pelatihan dan pengembangan karir.
                            </li>
                            <li>
                                <span className="font-bold">Penguatan Akuntabilitas Kinerja:</span> Menerapkan sistem pengukuran kinerja yang transparan dan akuntabel untuk memastikan pencapaian tujuan organisasi.
                            </li>
                            <li>
                                <span className="font-bold">Penguatan Pengawasan:</span> Meningkatkan fungsi pengawasan internal dan eksternal untuk mencegah penyimpangan dan korupsi.
                            </li>
                            <li>
                                <span className="font-bold">Peningkatan Kualitas Pelayanan Publik:</span> Meningkatkan aksesibilitas, kecepatan, dan kualitas pelayanan kepada masyarakat.
                            </li>
                        </ol>
                        <p className="text-balance md:text-base font-inter mt-4">
                        </p>

                    </div>
                </main>
            </div>
        </PrescenceMotion>
    );
}