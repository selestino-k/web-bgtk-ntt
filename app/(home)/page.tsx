import MobileNewsCarousel from "@/components/mobile-news-carousel";
import { PrescenceMotion } from "@/components/motion/presence-motion";
import NewsCarousel from "@/components/news-carousel";
import ProgramCardList from "@/components/program-card";
import Image from "next/image";


export default function Home() {
  return (
    <div className="grid w-full justify-items-center min-h-dvh overflow-hidden">
      <PrescenceMotion>
        <div id="home" className="relative z-10 flex justify-center h-screen w-screen">
          <div className="absolute inset-0 z-10">
            <Image
              src="/images/intro-web.png"
              alt="Banner Balai GTK NTT"
              fill
              className="object-cover opacity-70 xs:opacity-90"
              preload
            />
          </div>
          <main className="z-10 flex flex-1 flex-col content-around mt-30 text-center px-4">
            <h1 className="lg:text-8xl text-5xl sm:text-wrap text-primary font-bold xs:text-xs font-geist">
              Selamat Datang
            </h1>
            <p className="mt-3 lg:text-2xl text-md font-medium font-inter dark:text-black">
              di Situs Web Resmi Balai Guru dan Tenaga Kependidikan
            </p>
            <p className="text-md lg:text-xl font-medium font-inter dark:text-black">
              Provinsi Nusa Tenggara Timur
            </p>
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="program" className="flex relative w-full max-w-7xl">
          <main className="relative z-10 flex flex-col gap-3 p-8 justify-center w-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                Program Prioritas
              </h2>
            </div>
            <ProgramCardList />
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="berita" className="hidden sm:flex items-center relative mb-10 max-w-7xl">
          <main className="relative z-10 flex flex-col gap-3 p-8 w-full justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                Berita Terkini
              </h2>
            </div>
            <NewsCarousel />
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="berita-mobile" className="sm:hidden flex items-center relative mb-10 max-w-xs">
          <main className="relative z-10 flex flex-col gap-3 p-8 w-full justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                Berita Terkini
              </h2>
            </div>
            <MobileNewsCarousel />
          </main>
        </div>
      </PrescenceMotion>




    </div>
  );

}
