import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";

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

            <AccordionItem value="item-3">
                <AccordionTrigger className="font-geist text-primary font-semibold text-lg">Apa Saja Layanan yang Disediakan oleh BGTK NTT?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance md:text-base">
                    <p>
                        BGTK NTT menyediakan berbagai layanan, antara lain:
                    </p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Pelatihan dan Pengembangan Profesional Guru</li>
                        <li>Workshop dan Seminar Pendidikan</li>
                        <li>Penyediaan Sumber Belajar dan Materi Pendidikan</li>
                        <li>Pendampingan dan Konsultasi bagi Guru dan Tenaga Kependidikan</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="font-geist text-primary font-semibold text-lg">Bagaimana Cara Menghubungi BGTK NTT?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance md:text-base">
                    <p>
                        Anda dapat menghubungi BGTK NTT melalui:
                    </p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Telepon: (0380) 821234</li>
                        <li>Email: bgtkntt@kemendikdasmen.go.id</li>

                    </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger className="font-geist text-primary font-semibold text-lg">Apa itu program Koding dan Kecerdasan Artifisial (KKA)?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance md:text-base">
                    <p>
                        Program Koding dan KA merupakan program peningkatan kompetensi Guru yang diinisiasi oleh Kementerian Pendidikan Dasar dan Menengah Melalui Direktorat Jenderal Guru, Tenaga Kependidikan dan Pendidikan Guru (GTKPG) dalam rangka mendukung program ASTA CITA Presiden dan Wakil Presiden Republik Indonesia
                    </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
                <AccordionTrigger className="font-geist text-primary font-semibold text-lg">Bagaimana cara mendaftar program Koding dan Kecerdasan Artifisial (KKA) </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance md:text-base">
                    <p>
                        Pendaftaran bisa dilakukan melalui website : <span className="hover:underline text-primary"><Link href="https://kodingka.belajar.id" target="_blank">https://kodingka.belajar.id</Link></span> jika mendapati kesulitan dapat menghubungi BGTK NTT melalui kontak yang tersedia.
                    </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
                <AccordionTrigger className="font-geist text-primary font-semibold text-lg">Apa saja persyaratan untuk mengikuti Program Koding dan KA?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance md:text-base">
                    <p>
                        Guru terdaftar di DAPODIK dan memiliki email belajar.id serta direkomendasikan oleh kepala sekolah untuk mengikuti Program Koding dan Kecerdasan Artifisial
                    </p>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}
