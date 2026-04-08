"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface YouTubeFacadeProps {
  videoId: string
  className?: string
}

export function YouTubeFacade({ videoId, className }: YouTubeFacadeProps) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setLoaded(true)}
        variant="ghost"
        className="absolute inset-0 w-full h-full p-0 rounded-none bg-black hover:bg-black"
        aria-label="Play video"
      >
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt="Video thumbnail"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      </Button>
    </div>
  )
}