"use client"
import Image from "next/image"
import { User, Calendar } from "lucide-react"
import {motion} from "framer-motion"
import {Badge} from "./ui/badge"

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
    <Carousel className="max-w-screen mt-5 sm:max-w-2/3xl mx-auto">
      <CarouselContent className="flex -ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="-pl-1 sm:md:basis-1/2 lg:basis-1/4 mb-4">
            <div className="p-1">
              <Card className="h-full shadow-lg hover:shadow-xl/20 transition-shadow duration-300 border border-primary/30 dark:border-gray-700">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                <CardContent className="flex aspect-square flex-col p-0 rounded-lg backdrop-blur-sm text-start font-geist">
                    {/* 1. Image Wrapper (Top Half) */}
                    <div className="relative h-1/2 w-full">
                        <Image 
                            src="/images/news/fotbar-bgtk.jpg" 
                            alt="Foto Bareng BGTK" 
                            fill 
                            className="rounded-t-lg object-cover" 
                        />
                    </div>

                    {/* 2. Text Content (Bottom Half) */}
                    <div className="flex flex-col h-1/2 w-full p-4">
                        {/* Author and Date */}
                        <div className="flex space-x-2 text-sm text-gray-500 mb-2">
                            <span className="flex items-center space-x-1">
                                <User className="h-4 w-4 mr-1"/>
                                <span>Operator</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4 mr-1"/>
                                <span>25 November 2025</span>
                            </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold mb-2">Judul Berita</h3>
                        
                        {/* Category Badge */}
                        <Badge className="self-start">Kategori</Badge>
                    </div>
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
