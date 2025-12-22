"use client";

import { FeatureCard } from "@/components/motion/program-card-hover-motion";

export const features = [
{
    imageurl: "/images/program/pgp-trans.png"
  },
  {
    imageurl: "/images/program/psp-trans.png"
  },
  {
    imageurl: "/images/program/ikm-trans.png"
  },
  {
    imageurl: "/images/program/ppg-trans.png"
  },
  {
    imageurl: "/images/program/pkb-trans.png"
  },
];
 export default function ProgramCardList() {
    return (
        <div className="grid  md:grid-cols-2 lg:grid-cols-5 gap-6 w-full mx-auto mt-5 items-center">
        {features.map((feature, index) => (
            <FeatureCard
            key={index}
            imageurl={feature.imageurl}
            />
        ))}
        </div>
    );
}