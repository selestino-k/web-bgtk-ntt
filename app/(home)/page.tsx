import { PrescenceMotion } from "@/components/motion/presence-motion";
import NewsCarousel  from "@/components/news-carousel";
import ProgramCardList from "@/components/program-card";
import Image from "next/image";


export default function Home() {
  return (
  <div className="grid xs:w-xs w-full justify-items-center min-h-dvh sm:flex-col">

    <PrescenceMotion>
    <div id="home" className="relative z-10 flex flex-col items-center justify-center h-screen xs:h-[60vh] w-screen xs:w-xs xs:sm:overflow-visible">
        <div className="absolute inset-0 z-10">
          <Image 
            src="/images/intro-web.png" 
            alt="Banner Balai GTK NTT" 
            fill
            className="object-cover opacity-70 xs:opacity-30"
            priority
          />
        </div>
        <main className="z-10 flex flex-1 flex-col content-around mt-40 text-center w-screen xs:w-xs px-4">
          <h1 className="text-8xl text-primary font-semibold xs:text-xs font-geist ">
            Selamat Datang
          </h1>
          <p className="mt-3 text-2xl xs:text-xs font-medium font-inter">
            di Situs Web Resmi Balai Guru dan Tenaga Kependidikan 
          </p>
          <p className="text-2xl xs:text-xs font-medium font-inter">
            Provinsi Nusa Tenggara Timur
          </p>
        </main>
      </div>
      </PrescenceMotion>

      <PrescenceMotion>
      <div id="program" className="flex items-center relative">
        <main className="relative z-10 flex flex-col gap-3 p-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-4xl/9 font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                    Program Prioritas
                </h2>  
              </div>
            <ProgramCardList/>
        </main>
      </div>
      </PrescenceMotion>

      <PrescenceMotion>
      <div id="berita" className="flex items-center relative mb-10 max-w-vw-screen">
          <main className="relative z-10 flex flex-col gap-3 p-8">
              <div className="text-center">
                  <h2 className="text-2xl md:text-4xl/9 font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                      Berita Terkini
                  </h2>  
              </div>  
              <div className="w-full flex justify-center mt-2">
                <NewsCarousel/>
              </div>
          </main>
      </div>
      </PrescenceMotion>
    
  </div>
  );
}
