"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"

interface CarouselPhoto {
    id: bigint
    caption: string | null
    imageUrl: string
    createdAt: Date
}

interface HomeCarouselProps {
    photos: CarouselPhoto[]
}

export function HomeCarousel({ photos }: HomeCarouselProps) {
    const Plugin = React.useRef([
        Autoplay({ delay: 5000, stopOnInteraction: false }),
    ])
    const autoplayRef = React.useRef<typeof Autoplay.prototype | null>(null)
    const [, setApi] = React.useState<CarouselApi>()

   


    return (
        <Carousel
            plugins={Plugin.current}
            className="w-full max-w-screen bg-black"
            opts={{
                loop: true,
                dragFree: false,
            }}
            setApi={(carouselApi) => {
                setApi(carouselApi)
                autoplayRef.current = carouselApi?.plugins().autoplay
            }}
        >
            <CarouselContent>
                {photos.map((photo) => (
                    <CarouselItem key={photo.id}>
                        <div className="relative w-full h-screen overflow-hidden">
                            <Image
                                src={photo.imageUrl}
                                alt={photo.caption || `Carousel image ${photo.id}`}
                                fill
                                className="object-cover carousel-item-zoom opacity-50"
                                priority={photo.id === photos[0]?.id}
                            />
                            
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

        
        </Carousel>
    )
}