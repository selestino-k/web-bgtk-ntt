"use client"
import Image from "next/image"
import { User, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "./ui/badge"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function NewsCarousel() {
  return (
    <Carousel className="w-full mt-5 mx-auto">
      <CarouselContent className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/4 mb-4">
            <Link href="/publikasi/berita-terkini/detail">
              <div className="p-1">
                <Card className="shadow-lg hover:shadow-xl/20 transition-shadow duration-300 border border-primary/30 dark:border-gray-700">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="h-full"
                  >
                    <CardContent className="flex aspect-square flex-col p-0 rounded-lg backdrop-blur-sm text-start font-geist">
                      <div className="relative aspect-4/3 xs:aspect-square  rounded-t-md xs:hidden">
                        <Image
                          src="/images/placeholder.svg"
                          alt="Placeholder Image"
                          fill
                          sizes="(max-width: 320px) 50px, 50vw"
                          className="object-cover rounded-t-md"
                        />
                      </div>
                      <div className="flex flex-col h-1/2 w-full p-4">
                        <div className="flex space-x-2 text-xs text-gray-500 mb-2">
                          <span className="flex items-center space-x-1">
                            <User className="h-4 w-4 mr-1" />
                            <span>Operator</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>25 November 2025</span>
                          </span>
                        </div>

                        <h3 className="text-lg font-bold mb-1">Judul Berita</h3>
                        <Badge className="self-start">Kategori</Badge>
                        <p className="mt-2 text-xs text-gray-600 flex-grow mb-10">
                          Ringkasan singkat berita atau deskripsi konten yang menarik perhatian pembaca untuk mengklik dan membaca lebih lanjut.
                        </p>

                      </div>
                    </CardContent>
                  </motion.div>
                </Card>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
