import { PrescenceMotion } from "@/components/motion/presence-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AwardIcon, Download, Globe, LetterText, LineChart, NotebookPen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HoverMotion } from "@/components/motion/hover-motion";


export default function PPIDPage() {
    return (
        <PrescenceMotion>
            <div id="ppid" className=" mt-20 w-full max-w-7xl place-items-start px-10">
                <main className="relative z-10 flex flex-col gap-3 p-8 w-full">

                    <div id="ppid-main" className="text-left">
                        <h2 className="text-2xl md:text-5xl font-bold font-montserrat sm:tracking-tight mb-1 md:mb-5 text-primary">
                            Pejabat Pengelola Informasi dan Dokumentasi (PPID)
                        </h2>
                        <p className="text-balance md:text-base mt-4 font-inter">
                            PPID adalah kepanjangan dari Pejabat Pengelola Informasi dan Dokumentasi. PPID berfungsi sebagai pengelola dan penyampai dokumen yang dimiliki oleh badan publik sesuai dengan amanat UU 14/2008 tentang Keterbukaan Informasi Publik. Dengan keberadaan PPID, maka masyarakat yang akan menyampaikan permohonan informasi lebih mudah dan tidak berbelit-belit karena dilayani melalui satu pintu.
                        </p>

                        <div className="w-full grid lg:flex mt-10 items-center gap-10">

                            <div className="w-1/2 flex justify-center">
                                <Image
                                    src="/images/maklumat-pelayanan-bbgtk-jateng1759111258.jpg"
                                    alt="Maklumat Pelayanan PPID BGTK NTT"
                                    width={300}
                                    height={200}
                                    className="w-full h-auto rounded-lg shadow-md mt-10"
                                />
                            </div>
                            <div className="w-1/2 pr-4 grid">
                                <h2 className="text-2xl lg:text-5xl font-bold font-montserrat sm:tracking-tight mb-1 text-primary">
                                    Maklumat Pelayanan
                                </h2>
                                <h3 className="text-md lg:text-2xl font-semibold font-montserrat sm:tracking-tight mb-1 md:mb-5 pr-3  text-primary">
                                    Balai Guru dan Tenaga Kependidikan (BGTK) Provinsi NTT
                                </h3>
                                <Button variant="default" className="w-max flex">
                                    <Download className="mr-2" />
                                    <Link href="/maklumat-pelayanan-ppid-bbgtk-ntt" className="text-sm lg:text-base font-montserrat">
                                        Unduh Maklumat Pelayanan
                                    </Link>
                                </Button>
                            </div>
                        </div>



                    </div>
                    <div id="ppid-item" className="xl:mt-15 mb-9 flex flex-col justify-center relative max-w-7xl items-center">
                        <div className="text-center">
                            <h2 className="md:text-3xl lg:text-5xl text-3xl font-bold font-montserrat sm:tracking-tight font-montserrat text-primary">
                                Informasi
                            </h2>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-10 items-stretch font-montserrat gap-6">
                            <HoverMotion>
                                <Link href="/ppid/rencana-strategis">

                                    <Card className="h-full p-6 border-primary/50">
                                        <NotebookPen className="left-4 text-primary w-10 h-10" />
                                        <h3 className="text-xl font-semibold mb-2 text-primary">Rencana Strategis</h3>
                                    </Card>
                                </Link>
                            </HoverMotion>

                            <HoverMotion>
                                <Link href="/ppid/perjanjian-kinerja">
                                    <Card className="h-full p-6 border-primary/50">
                                        <LetterText className="left-4 text-primary w-10 h-10" />
                                        <h3 className="text-xl font-semibold mb-2 text-primary">Perjanjian Kinerja</h3>
                                    </Card>
                                </Link>
                            </HoverMotion>

                            <HoverMotion>
                                <Link href="/ppid/laporan-kinerja">
                                    <Card className="h-full p-6 border-primary/50">
                                        <LineChart className="left-4 text-primary w-10 h-10" />
                                        <h3 className="text-xl font-semibold mb-2 text-primary">Laporan Kinerja</h3>
                                    </Card>
                                </Link>
                            </HoverMotion>

                            <HoverMotion>
                                <Link href="/ppid/penghargaan">
                                    <Card className="h-full p-6 border-primary/50">
                                        <AwardIcon className="left-4 text-primary w-10 h-10" />
                                        <h3 className="text-xl font-semibold mb-2 text-primary">Penghargaan</h3>
                                    </Card>
                                </Link>
                            </HoverMotion>

                            <HoverMotion>
                                <Link href="https://ppid.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer">
                                    <Card className="h-full p-6 border-primary/50">
                                        <Globe className="left-4 text-primary w-10 h-10" />
                                        <h3 className="text-md font-semibold mb-2 text-primary">PPID Kemendikdasmen</h3>
                                    </Card>
                                </Link>
                            </HoverMotion>
                        </div>

                    </div>
                </main>
            </div>
        </PrescenceMotion>
    );

}