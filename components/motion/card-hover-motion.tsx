"use client"

import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  imageurl: string;
}

export function FeatureCard({ title, imageurl }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center p-6 rounded-lg backdrop-blur-sm text-center shadow-lg hover:shadow-xl/20 transition-shadow duration-300 h-full border border-primary/30 dark:border-gray-700">
        <Image src={imageurl} alt={title} width={180} height={90} />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
    </motion.div>
  );
}