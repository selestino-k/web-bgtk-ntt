"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
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
    const [api, setApi] = React.useState<CarouselApi>()
    const [, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])
    return (
        <Carousel
            plugins={Plugin.current}
            className="w-full max-w-screen h-auto bg-black overflow-hidden relative"
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
                        <div className="relative w-full h-auto overflow-hidden">
                            <Image
                                src={photo.imageUrl}
                                alt={photo.caption || `Carousel image ${photo.id}`}
                                width ={1920}
                                height={960}
                                className="aspect-video object-cover carousel-item-zoom opacity-80"
                                priority={photo.id === photos[0]?.id}
                            />

                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* Navigation Arrows and Pagination Dots Container */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">

                {/* Pagination Dots */}
                <div className="flex gap-2">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === api?.selectedScrollSnap()
                                ? "bg-white w-8"
                                : "bg-white/50 hover:bg-white/70"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                <CarouselPrevious className="relative bg-white/20 hover:bg-white/50 text-white border-white/50 left-0 translate-y-0" />
                <CarouselNext className="relative bg-white/20 hover:bg-white/50 text-white border-white/50 right-0 translate-y-0" />
            </div>

        </Carousel>
    )
}