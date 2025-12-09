import { PrescenceMotion } from "@/components/motion/presence-motion";
import NewsCarousel  from "@/components/news-carousel";
import ProgramCardList from "@/components/program-card";
import Image from "next/image";


export default function Home() {
  return (
  <div className="grid w-full justify-items-center min-h-dvh">
      <PrescenceMotion>
      <div id="home" className="relative z-10 flex justify-center min-h-screen w-full">      
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/intro-web.png" 
            alt="Banner Balai GTK NTT" 
            fill
            className="object-cover opacity-70 xs:opacity-30"
            priority
          />
        </div>
        <main className="relative z-10 flex flex-1 flex-col content-around mt-30 text-center w-full px-4">
          <h1 className="text-8xl text-primary font-semibold xs:text-xs font-geist sm:tracking-tight"> 
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

      <div id="program" className="flex items-center relative w-full max-w-7xl">
        <main className="relative z-10 flex flex-col gap-3 p-8">
            <div className="text-center">
                <h2 className="text-2xl font-semibold sm:tracking-tight mt-2 font-geist text-primary max-w-vw-screen">
                    Program Prioritas
                </h2>  
              </div>
            <ProgramCardList/>
        </main>
      </div>

      <PrescenceMotion>
      <div id="berita" className="flex items-center relative mb-10 w-full max-w-7xl">
          <main className="relative z-10 flex flex-col gap-3 p-8">
              <div className="text-center">
                  <h2 className="text-2xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                      Berita Terkini
                  </h2>  
              </div>  
                <NewsCarousel/>
          </main>
      </div>
      </PrescenceMotion>
    
  </div>
  );

}
