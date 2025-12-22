import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQAccordion() {
    return (
        <Accordion
            type="single"
            collapsible
            className="max-w-3xl w-full flex flex-col"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className="font-geist text-primary font-semibold text-lg">Apa Itu BGTK NTT?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance md:text-base">
                    <p>
                        BGTK Provinsi NTT adalah singkatan dari Balai Guru dan Tenaga Kependidikan Provinsi Nusa Tenggara Timur. 
                        Lembaga ini merupakan Unit Pelaksana Teknis (UPT) di bawah Direktorat Jenderal Guru, Tenaga Kependidikan dan Pendidikan Guru, Kementerian Pendidikan Dasar dan Menengah yang bertugas untuk melaksanakan pengembangan dan pemberdayaan guru, 
                        kepala sekolah, pendidik lainnya, dan tenaga kependidikan.

                    </p>

                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="font-geist text-primary font-semibold text-lg">Di Mana BGTK NTT Berlokasi?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance md:text-base">
                    <p>
                        BGTK NTT berlokasi di Jl. Perintis Kemerdekaan I, Kayu Putih
                        Kec. Oebobo, Kota Kupang, Nusa Tenggara Timur                     </p>

                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}
