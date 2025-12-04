"use client"
import Image from "next/image"
import { User, Calendar } from "lucide-react"
import {motion} from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function NewsCarousel() {
  return (
    <Carousel className="max-w-7xl mt-5 sm:max-w-2/3xl md:max-w-4/5 mx-auto">
      <CarouselContent className="flex -ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="-pl-1 sm:md:basis-1/2 lg:basis-1/4 mb-4">
            <div className="p-1">
              <Card className="h-full shadow-lg hover:shadow-xl/20 transition-shadow duration-300 border border-primary/30 dark:border-gray-700">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                <CardContent className="flex aspect-square content-start flex-col p-2 rounded-lg backdrop-blur-sm text-start font-geist">
                    <Image src="/images/news/fotbar-bgtk.jpg" alt="Foto Bareng BGTK" width={700} height={250} className="w-full rounded" />
                    <div className="flex space-x-2" >
                        <span className="flex items-center space-x-1 text-sm mx-2 mt-1">
                            <User className="h-4 w-4 mr-1"/>
                            Operator
                        </span>
                        <span className="flex items-center space-x-1 text-sm mx-2 mt-1">
                            <Calendar className="h-4 w-4 mr-1"/>
                            25 November 2025
                        </span>
                    </div>
                    <h3 className="text-xl font-bold ml-2 mt-2 mb-2">Judul Berita</h3>
                </CardContent>
                </motion.div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
         
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
