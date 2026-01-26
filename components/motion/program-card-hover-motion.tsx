"use client"

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  title?: string;
  description?: string;
  link?: string;
}

export function FeatureCard({ title, description,link }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="flex flex-col items-center p-6 rounded-lg backdrop-blur-sm text-center shadow-lg hover:shadow-xl/20 transition-shadow duration-300 h-full border border-primary/30 dark:border-gray-700">
      <Link href={link || "#"}>
      <div className="mt-4">
        <ArrowUpRight className="absolute top-4 right-4 text-primary w-5 h-5" />
        <h3 className="text-2xl text-primary font-bold font-montserrat mb-2 mt-5">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 font-medium font-montserrat">{description}</p>
        
      </div>
      </Link>
    </motion.div>
  );
}