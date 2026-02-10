"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { FeatureCard } from "@/components/motion/program-card-hover-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

export const features = [
    {
        title: "Program Pembelajaran Mendalam (PM)",
        link: "/program/ppm",
        imageUrl: "/logo/pm.png"
    },
    {
        title: "Koding dan Kecerdasan Artifisial (KKA)",
        link: "/program/kka",
        imageUrl: "/logo/kka.png"
    },
    {
        title: "Program Pendidikan Profesi Guru (PPG)",
        link: "/program/ppg",
        imageUrl: "/logo/ppg.png"

    },
    {
        title: "Program Pengembangan Keprofesian Guru (PKG) - Bahasa Inggris",
        link: "/program/pkb",
        imageUrl: "/logo/pkg-bi.png"
    },

    {
        title: "Program Pengembangan Keprofesian Guru (PKG) - Bimbingan Konseling",
        link: "/program/pkm",
        imageUrl: "/logo/pkg-bk.png"
    },
    {
        title: "Program Bakal Calon Kepala Sekolah (BCKS)",
        link: "/program/bcks",
        imageUrl: "/logo/bcks.png"
    },
];

export default function ProgramCardList() {
    const Plugin = React.useRef([
        Autoplay({ delay: 3000, stopOnInteraction: true }),
    ]);
    const [api, setApi] = React.useState<CarouselApi>();

    React.useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            // Handle selection if needed
        });
    }, [api]);

    return (
        <div className="w-full max-w-7xl px-8">
            <Carousel
                plugins={Plugin.current}
                className="w-full"
                opts={{
                    loop: true,
                    align: "start",
                }}
                setApi={setApi}
            >
                <CarouselContent className="-ml-4">
                    {features.map((feature, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="h-full flex items-center justify-center">
                                <FeatureCard
                                    title={feature.title}
                                    link={feature.link}
                                    imageUrl={feature.imageUrl}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white/20 hover:bg-white/50 border-gray-300" />
                <CarouselNext className="bg-white/20 hover:bg-white/50 border-gray-300" />
            </Carousel>

            
        </div>
    );
}