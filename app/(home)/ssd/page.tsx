import { PrescenceMotion } from "@/components/motion/presence-motion";
import { FAQAccordion } from "./faq-accordion";

export default function SSDPage() {
    return (
        <PrescenceMotion>
            <div id="ssd" className="mt-20 w-full max-w-7xl place-items-start px-10">
                <main className="relative z-10 flex flex-col gap-3 p-8 w-full">
                    <div className="text-left">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            SSD 
                        </h2>
                        <h3 className="text-md md:text-xl sm:tracking-tight mb-5 md:mb-10 font-geist">
                            Soal Sering Ditanya
                        </h3>
                        <FAQAccordion />
                    </div>
                </main>
            </div>
        </PrescenceMotion>
    );
}