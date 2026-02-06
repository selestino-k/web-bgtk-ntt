"use client"

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FeatureCardProps {
  title?: string;
  link?: string;
  imageUrl?: string;
}

export function FeatureCard({ title, link, imageUrl }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="flex flex-col items-center p-6 xl:min-w-[300px] md:min-w-[200px] w-full rounded-lg backdrop-blur-sm text-center shadow-lg hover:shadow-xl/20 transition-shadow duration-300 h-full border border-primary/30 dark:border-gray-700">
      <Link href={link || "#"}>
        <div className="mt-2">
          <ArrowUpRight className="absolute top-4 right-4 text-primary w-5 h-5" />
          <Image src={imageUrl || "/images/placeholder.svg"}
            alt={title || "Program Image"}
            width={800}
            height={800}
            className="rounded-md mb-4 object-cover xl:h-60 h-40 md:h-50 w-full"
          />

        </div>
      </Link>
    </motion.div>
  );
}