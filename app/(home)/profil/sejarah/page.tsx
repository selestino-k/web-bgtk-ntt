import { PrescenceMotion } from "@/components/motion/presence-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";


export const metadata = {
    title: "Sejarah | BGTK Provinsi NTT",
    description: "Halaman Sejarah Berdirinya Balai Guru dan Tenaga Kependidikan (BGTK) NTT",
};

export default function Sejarah() {
    return (
        <PrescenceMotion>

            <div id="sambutan" className="mt-20 w-full max-w-7xl place-items-start px-10">
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
                                Profil
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Sejarah</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="text-left">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Sejarah
                        </h2>
                        <h3 className="text-md md:text-xl sm:tracking-tight mb-5 md:mb-10 font-geist">
                            Sejarah Berdirinya Balai Guru dan Tenaga Kependidikan (BGTK) NTT
                        </h3>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Balai Pengembangan Pendidikan Anak Usia Dini dan Pendidikan Masyarakat Nusa Tenggara Timur (BP PAUD dan Dikmas NTT) pada awalnya bernama Balai Pendidikan Masyarakat. Secara operasional diresmikan oleh Dirjen Pendidikan Luar Sekolah Pemuda dan Olahraga (Diklusepora) Prof. Dr. W. P. Napitupulu, pada tahun 1987.  Secara kelembagaan Balai Pendidikan Masyarakat waktu itu berada dibawah pembinaan Bidang Pendidikan Masyarakat pada Kanwil Depdikbud Propinsi Nusa Tenggara Timur.
                            Dalam melaksanakan fungsinya tersebut maka dibentuk 4 (empat) kelompok kerja dan masing-masing pokja bertanggung jawab langsung kepada Kepala Bidang Pendidikan Masyarakat yang waktu itu dijabat oleh Drs. Jefta Fanggidae.
                            Pada tahun 1990 Drs. Jefta Fanggidae selaku Kepala Bidang Pendidikan masyarakat meninggal dunia, semenjak itu tepatnya tahun 1990-1992 ditunjuk pelaksana harian Kepala Balai Pendidikan Masyarakat yaitu Kasi Sarana pada Bidang Pendidikan Masyarakat yaitu Saudara Drs. Benyamin F. Benggu.
                        </p>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Berdasarkan Surat Keputusan Mendikbud Nomor : 022/O/1991 nama Balai Pendidikan Masyarakat dirubah menjadi Balai Pengembangan Kegiatan Belajar (BPKB) Nusa Tenggara Timur yang wilayah kerja meliputi Propinsi Nusa Tenggara Timur, Timor-Timur, Irian Jaya dan Maluku, dan secara kelembagaan merupakan UPT Ditjen Diklusepora yang berada didaerah dan secara teknis bertanggung jawab kepada Dirjen Diklusepora dan secara administratif bertanggung jawab kepada Kakanwil Depdikbud Propinsi Nusa Tenggara Timur. Di akhir tahun 1992 ditunjuk Kepala Balai Pengembangan Kegiatan Belajar (BPKB) Nusa Tenggara Timur defenitif yaitu Ny. Jeane A. Doko, BA, yang menjabat sampai dengan bulan Agustus 1996 karena memasuki masa purna bakti. Sambil menunggu pimpinan defenitif maka Kepala Kantor Wilayah Depdikbud Propinsi Nusa Tenggara Timur menunjuk Kepala Bidang Pembinaan Generasi Muda yang waktu itu dijabat oleh Drs. S.A.E. Dethan selaku Pelaksana harian Kepala BPKB Nusa Tenggara Timur, tugas ini dijalani selama 3 bulan dan digantikan oleh pejabat defenitif Kepala BPKB Nusa Tenggara Timur yaitu Poltak Pasaribu, SH yang sebelumnya sebagai Kasub. Kepegawaian pada Direktorat Pendidikan Tenaga Teknis Ditjen Diklusepora Depdiknas. Seiring dengan pelaksanaan otonomi daerah tepatnya tahun 2001 terjadi perubahan struktural kelembagaan, menyebabkan nama Balai Pengembangan Kegiatan Belajar (BPKB) Nusa Tenggara Timur berubah menjadi UPTD Pengembangan Kegiatan Belajar Dinas Pendidikan dan Kebudayaan Propinsi Nusa Tenggara Timur yang ditetapkan berdasarkan Peraturan Daerah Pemerintah Propinsi Nusa Tenggara Timur nomor 5 tahun 2001 tanggal 11 Juni 2001, tentang Pembentukan Oraganisasi dan Tata Kerja UPTD Propinsi Nusa Tenggara Timur.                       </p>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Pada tahun 2004, Poltak Pasaribu, SH dimutasikan menjadi Kepala Sub Dinas Pendidikan Luar Sekolah pada Dinas Pendidikan dan Kebudayaan Propinsi Nusa Tenggara Timur dan digantikan oleh Drs. Melkianus Lima tahun 2004 bulan Maret 2006, seiring dengan waktu dan mutasi di tingkat Provinsi Nusa Tenggara Timur maka tahun 2006 sampai bulan Maret 2009 oleh Dra. Yohanna Lingu Lango yang sebelumnya menjabat sebagai Kepala Seksi PAUD dan Pendidikan Perempuan pada Sub Dinas Bina Pendidkan Luar Sekolah Dinas Pendidikan dan Kebudayaan Propinsi Nusa Tenggara Timur kemudian diganti oleh Dra. Maria patricia Sumarni,MM yang menjabat samapai dengan saai ini. Dra Maria patricia Sumarni,MM sebelumnya sebagai Koordinator Pamong Belajar Pada UPTD Pengembangan Kegiatan Belajar, dan Nama UPTD Pengembangan Kegiatan Belajar Dinas Pendidikan dan Kebudayaan Provinsi Nusa Tenggara Timur telah berubah nama menjadi UPT Pengembangan Pendidikan Nonformal Dan Informal Dinas Pendidikan, Pemuda Dan Olahraga Provinsi Nusa Tenggara Timur. Sesuai Dengan Peraturan Pemerintah Nomor 41.

                            Terhitung 24 Oktober 2016 hingga saat ini BP PAUD dan Dikmas NTT menjadi Instansi Vertikal dibawah Ditjen PAUD dan Dikmas Kementerian Pendidikan dan Kebudayaan Republik Indonesia dibawah kepemimpinan Ibu Maria B. Advensia, SH.M.Hum. Sesuai dengan Berita Acara Serah Terima (BAST) dari Pemerintah Daerah ke Kementerian Pendidikan dan Kebudayaan RI, No. 62765/A.A4/HK/2016.
                        </p>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Dan Pada Bulan Juni Tahun 2022 sesuai Permendikbudristek RI No.14 Tahun 2022 Berdirilah Balai Guru Penggerak Provinsi NTT yang semula BP PAUD dan Dikmas NTT, perubahan nomenklatur tersebut dialami oleh semua Unit Pelaksana Teknis di Seluruh Indonesia, dan kepala BGP Provinsi NTT yakni Bapak Dr. Wirman Kasmayadi, S.Pd, M.Si dan pada Bulan Oktober 2024 hingga Tanggal 3 Februari 2025 ada pergantian Kepala BGP Provinsi NTT yakni Dr. Subandi, M.M. dan hingga saat ini Plt. Kepala Balai yakni Bapak Dr. Teguh Rahayu Slamet. M.Si.                        </p>
                    </div>
                </main>
            </div>
        </PrescenceMotion>
    );
}