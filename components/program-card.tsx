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
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full mx-auto mt-10 items-center">
        {features.map((feature, index) => (
            <FeatureCard
            key={index}
            imageurl={feature.imageurl}
            />
        ))}
        </div>
    );
}