"use client"

import { motion } from "framer-motion";

interface FeatureCardProps {
  title?: string;
  description?: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="flex flex-col items-center p-6 rounded-lg backdrop-blur-sm text-center shadow-lg hover:shadow-xl/20 transition-shadow duration-300 h-full border border-primary/30 dark:border-gray-700">
        <div className="mt-4">
          <h3 className="text-2xl text-primary font-bold font-montserrat mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 font-medium font-montserrat">{description}</p>
        </div>
    </motion.div>
  );
}