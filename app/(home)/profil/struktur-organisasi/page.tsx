import { PrescenceMotion } from "@/components/motion/presence-motion";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";


export const metadata = {
    title: "Struktur Organisasi | BGTK Provinsi NTT",
    description: "Halaman Struktur Organisasi BGTK NTT",
};

export default function StrukturOrg() {
    return (
        <PrescenceMotion>

            <div id="struktur-organisasi" className="mt-20 w-full px-10">
                <main className="relative z-10 flex flex-row gap-3 p-8 w-full justify-items-center">
                   
                    <div className="flex flex-col gap-5 w-full">
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
                                <BreadcrumbPage>Struktur Organisasi</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                        <h2 className="text-4xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                            Struktur Organisasi
                        </h2>
                        <Image
                            src="/images/struktur-org.png"
                            alt="Struktur Organisasi BGTK NTT"
                            width={2000}
                            height={1000}
                            className="rounded-lg shadow-lg border border-primary-700"
                        />
                    </div>
                </main>
            </div>
        </PrescenceMotion>
    );
}