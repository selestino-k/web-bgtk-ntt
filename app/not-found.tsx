"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { HoverMotion } from "@/components/motion/hover-motion";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="grid w-full">
            <div className="flex items-center justify-center h-screen w-full relative">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/bgtk-background.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-95 grayscale dark:brightness-30"
                        priority
                    />
                </div>
                <main className="relative z-10 flex flex-col gap-3 text-white items-center p-8 w-full">
                    <Image
                        src="/logo/logo-web-bgtk-ntt.svg"
                        alt="Logo BGTK"
                        width={500}
                        height={100}
                        className="dark:hidden"
                    />
                    <Image
                        src="/logo/logo-web-bgtk-ntt-dark.svg"
                        alt="Logo BGTK"
                        width={500}
                        height={100}
                        className="hidden dark:block"
                    />
                    <div className="text-center w-full">
                        <h1 className="sm:text:2xl text-4xl  md:text-4xl lg:text-9xl font-bold font-montserrat sm:tracking-tight mt-2 text-primary">
                            404
                        </h1>
                        <h3 className="text-2xl lg:text-4xl mt-2 text-primary font-bold font-montserrat">
                            Error
                        </h3>
                        <h2 className="text-2xl mt-4 mb-6 font-semibold text-black dark:text-white font-montserrat">
                            Maaf, halaman yang Anda  cari tidak ditemukan.
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 gap-x-4 font-montserrat">
                        <HoverMotion>
                            <Button
                                onClick={() => router.back()}
                                className="h-12 text-lg px-6"
                                variant="secondary"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Kembali
                            </Button>
                        </HoverMotion>
                        <HoverMotion>
                            <Button asChild className="h-12 text-lg px-6" variant="default">
                                <Link href="/" className="flex items-center gap-2">
                                    <Home className="w-5 h-5" />
                                    Beranda
                                </Link>
                            </Button>
                        </HoverMotion>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NotFound;

