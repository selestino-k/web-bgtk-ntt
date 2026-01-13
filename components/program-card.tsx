"use client";

import { FeatureCard } from "@/components/motion/program-card-hover-motion";
import { title } from "process";

export const features = [
  {
    title: "Program Guru Penggerak",
    description: "Meningkatkan kompetensi guru melalui pelatihan intensif dan pendampingan berkelanjutan."
  },
  {
    title: "Program Pendidikan Profesi Guru (PPG)",
    description: "Menyediakan pendidikan profesi bagi calon guru untuk memenuhi standar kompetensi nasional."
  },
  {
    title : "Indeks Kepuasan Masyarakat",
    description : "Mengukur tingkat kepuasan masyarakat terhadap layanan yang diberikan oleh Balai GTK NTT."
  },
  {
    title : "Program Pendidikan Profesi Guru (PPG)",
    description : "Menyediakan pendidikan profesi bagi calon guru untuk memenuhi standar kompetensi nasional."
  },
  {
    title : "Program Pengembangan Keprofesian Berkelanjutan (PKB)",
    description : "Menyediakan pelatihan dan workshop untuk guru dalam rangka meningkatkan kompetensi dan profesionalisme."
  },
];
export default function ProgramCardList() {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto mt-5 items-center">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}