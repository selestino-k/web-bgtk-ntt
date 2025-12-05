"use client";

import { FeatureCard } from "@/components/motion/card-hover-motion";

export const features = [
{
    title: "Program Guru Penggerak",
    imageurl: "/images/program/pgp-trans.png"
  },
  {
    title: "Program Sekolah Penggerak",
    imageurl: "/images/program/psp-trans.png"
  },
  {
    title: "Implementasi Kurikulum Merdeka",
    imageurl: "/images/program/ikm-trans.png"
  },
  {
    title: "Pendidikan Profesi Guru",
    imageurl: "/images/program/ppg-trans.png"
  },
  {
    title: "Pengembangan Keprofesian Berkelanjutan",
    imageurl: "/images/program/pkb-trans.png"
  },
];
 export default function ProgramCardList() {
    return (
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-screen mx-auto mt-10 items-center">
        {features.map((feature, index) => (
            <FeatureCard
            key={index}
            title={feature.title}
            imageurl={feature.imageurl}
            />
        ))}
        </div>
    );
}