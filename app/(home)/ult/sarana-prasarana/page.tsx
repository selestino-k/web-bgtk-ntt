import { PrescenceMotion } from "@/components/motion/presence-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { SaranaCard } from "./sarana-card";

const saranaData = [
    {
        title: "Mess Garuda",
        image: "/images/placeholder.svg",
        estimasiBiaya: "Rp 1.500.000 - Rp 3.000.000",
        estimasiSasaran: {
            sd: "SD : 3 Kelas (104 Peserta)",
            smp: "SMP : 2 Kelas (43 Peserta)",
            sma: "SMA/SMK : 1 Kelas (29 Peserta)"
        }
    },
    {
        title: "Mess Nuri",
        image: "/images/placeholder.svg",
        estimasiBiaya: "Rp 1.610.000 - Rp 3.267.000",
        estimasiSasaran: {
            sd: "SD : 6 Kelas (180 Peserta)",
            smp: "SMP : 3 Kelas (84 Peserta)",
            sma: "SMA/SMK : 3 Kelas (48 Peserta)"
        }
    },
    {
        title: "Mess Rajawali",
        image: "/images/placeholder.svg",
        estimasiBiaya: "Rp 1.767.000 - Rp 3.739.000",
        estimasiSasaran: {
            sd: "SD : 2 Kelas (41 Peserta)",
            smp: "SMP : 1 Kelas (22 Peserta)",
            sma: "SMA/SMK : 1 Kelas (10 Peserta)"
        }
    },
    {
        title: "Asrama Pelajar",
        image: "/images/placeholder.svg",
        estimasiBiaya: "Rp 1.500.000 - Rp 3.000.000",
        estimasiSasaran: {
            sd: "SD : 4 Kelas (120 Peserta)",
            smp: "SMP : 2 Kelas (60 Peserta)",
            sma: "SMA/SMK : 2 Kelas (40 Peserta)"
        }
    }
];

export default function SaranaPrasaranaPage() {
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
                                ULT
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Sarana dan Prasarana</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="text-left mb-8">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Sarana dan Prasarana
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {saranaData.map((item, index) => (
                            <SaranaCard
                                key={index}
                                title={item.title}
                                image={item.image}
                                estimasiBiaya={item.estimasiBiaya}
                                estimasiSasaran={item.estimasiSasaran}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </PrescenceMotion>
    );
}