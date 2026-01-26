import { PrescenceMotion } from "@/components/motion/presence-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function ProgramPPM() {
    return (
        <PrescenceMotion>
            <div id="sambutan" className="mt-20 w-full max-w-7xl place-items-start px-10">
                
                <main className="relative z-10 flex flex-col gap-3 p-8 w-full">
                    <Breadcrumb className="mb-4 font-geist text-gray-600">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Beranda</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                Program
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>PPM (Program Pembelajaran Mendalam)</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </Breadcrumb>
                    <div className="text-left">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Program Pembelajaran Mendalam
                        </h2>
                        <p className="mt-7 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Pembelajaran Mendalam adalah sebuah pendekatan pembelajaran yang menekankan pada pemahaman utuh, bukan sekadar penguasaan fakta atau hafalan. Dalam pendekatan ini, siswa diajak untuk menyelami konsep secara komprehensif dengan mengaitkannya ke berbagai konteks, memaknai materi, serta mengalami pembelajaran yang menyenangkan dan penuh makna. Pembelajaran ini menggunakan unsur olah pikir (intelektual), olah hati (etika), olah rasa (estetika), dan olah raga (kinestetik) secara terpadu, agar peserta didik tumbuh tidak hanya secara kognitif tetapi juga karakter dan kepekaan sosial.
                        </p>
                        <h3 className="text-xl md:text-3xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary mt-5">
                            Landasan dan Urgensi Pengembangan
                        </h3>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Indonesia menghadapi tantangan serius berupa krisis pembelajaran: capaian literasi, numerasi, dan kemampuan berpikir tinggi peserta didik masih rendah. Untuk menjawab kondisi tersebut, Kemendikdasmen mendorong transformasi pembelajaran agar lebih efektif, bermakna, dan relevan dengan tuntutan abad ke-21. Dalam kebijakan terbaru (Permendikdasmen Nomor 13 Tahun 2025), Pembelajaran Mendalam ditetapkan sebagai pendekatan utama untuk meningkatkan kualitas pembelajaran di satuan pendidikan, baik yang menggunakan Kurikulum 2013 maupun Kurikulum Merdeka.
                        </p>
                        <h3 className="text-xl md:text-3xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary mt-5">
                            Prinsip dasar dan Karakteristik
                        </h3>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Prinsip dalam penerapan Pembelajaran Mendalam adalah berkesadaran (mindful), bermakna (meaningful), dan menggembirakan (joyful) melalui olah pikir, olah hati, olah rasa, dan olah raga secara holistik dan terpadu.

                        </p>
                        <ol className="list-decimal list-inside mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            <li className="mb-2">
                                Berkesadaran (mindful): siswa memahami tujuan pembelajaran, termotivasi secara intrinsik, dan aktif mengatur strategi belajar.
                            </li>
                            <li className="mb-2">
                                Bermakna (meaningful): materi yang diajarkan dihubungkan dengan konteks nyata, agar siswa dapat menerapkan pengetahuan dalam kehidupan sehari-hari.
                            </li>
                            <li className="mb-2">
                                Menggembirakan (joyful): suasana belajar dirancang menyenangkan, menantang, dan memotivasi agar siswa tertarik aktif berpartisipasi.
                            </li>
                        </ol>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Sebagai lembaga yang berperan dalam pengembangan kompetensi guru dan tenaga kependidikan, BGTK Provinsi NTT memiliki posisi strategis dalam mendukung pelaksanaan Pembelajaran Mendalam. Upaya seperti penyusunan modul pelatihan, pendampingan di sekolah, penguatan komunitas belajar guru, dan monitoring lokal akan sangat penting agar gaya pembelajaran ini tidak menjadi wacana semata.

                        </p>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            Dengan kolaborasi yang kuat antara BGTK, sekolah, dan stakeholder lain, diharapkan praktik Pembelajaran Mendalam dapat tumbuh secara bertahap di Nusa Tenggara Timur. Akhirnya, dampaknya diharapkan menghasilkan lulusan yang bukan hanya cerdas secara akademis, tetapi juga matang dalam berpikir kritis, kreatif, punya karakter baik, dan mampu menghadapi tantangan masa depan secara berdaya.

                        </p>
                    </div>
                </main>
            </div>
        </PrescenceMotion>
    );
}