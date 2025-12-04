import { PrescenceMotion } from "@/components/motion/presence-motion";
import { NewsCarousel } from "@/components/news-carousel";
import ProgramCardList from "@/components/program-card";


export default function Home() {
  return (
    <div className="grid w-full sm:grid-cols-1 gap-6">
    <PrescenceMotion>
    <div id="home" className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-8xl text-primary font-semibold font-geist">
          Selamat Datang
        </h1>
        <p className="mt-3 text-2xl font-medium font-inter">
          di Situs Web Resmi Balai Guru dan Tenaga Kependidikan 
        </p>
        <p className="text-2xl font-medium font-inter">
          Provinsi Nusa Tenggara Timur
        </p>
      </main>
    </div>
    </PrescenceMotion>
    <PrescenceMotion>
        <div id="program" className="flex items-center justify-center h-full w-full relative">
          <main className="relative z-10 flex flex-col gap-3 items-center p-8 w-full mt-10">
              <div className="text-center w-full">
                  <h2 className="text-2xl md:text-4xl/9 font-semibold sm:tracking-tight mt-2 font-geist text-primary align-left">
                      Program Prioritas
                  </h2>  
                </div>
              <ProgramCardList/>
          </main>
        </div>
      </PrescenceMotion>
      <PrescenceMotion>
      <div id="lainnya" className="flex items-center justify-center h-full w-full relative mb-10">
          <main className="relative z-10 flex flex-col gap-3 items-center p-8 w-full mt-10">
              <div className="text-center w-full">
                  <h2 className="text-2xl md:text-4xl/9 font-semibold sm:tracking-tight mt-2 font-geist text-primary align-left">
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
