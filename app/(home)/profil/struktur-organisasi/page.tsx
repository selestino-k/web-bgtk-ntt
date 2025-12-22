import { PrescenceMotion } from "@/components/motion/presence-motion";
import Image from "next/image";

export default function StrukturOrg() {
    return (
        <PrescenceMotion>
            <div id="struktur-organisasi" className="mt-20 w-full px-10">
                <main className="relative z-10 flex flex-row gap-3 p-8 w-full justify-items-center">
                    <div className="flex flex-col gap-5 w-full">
                        <h2 className="text-2xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
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