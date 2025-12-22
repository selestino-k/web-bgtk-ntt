import { PrescenceMotion } from "@/components/motion/presence-motion";

export default function VisiMisi() {
    return (
        <PrescenceMotion>
            <div id="sambutan" className="mt-20 w-full max-w-7xl place-items-start px-10">
                <main className="relative z-10 flex flex-col gap-3 p-8 w-full">
                    <div className="text-left">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Visi Misi
                        </h2>
                        <h3 className="text-md md:text-xl sm:tracking-tight mb-1 md:mb-3 font-geist">
                            Visi
                        </h3>
                        <p className="mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify mb-3 md:mb-6 ">
                            Menjadi pusat keunggulan dalam membangun ekosistem pembelajaran Guru dan Tenaga Kependidikan berlandaskan gotong royong untuk terciptanya Pelajar Pancasila demi mewujudkan Indonesia maju

                        </p>
                        <h3 className="text-md md:text-xl sm:tracking-tight mb-1 md:mb-3 font-geist">
                            Misi
                        </h3>
                        <ul className="list-decimal ml-5 mt-3 text-sm md:text-base font-medium font-inter text-wrap text-justify">
                            <li>
                                Meningkatkan profesionalisme Guru dan Tenaga Kependidikan melipiti aspek Penguasaan pengetahuan, praktik pembelajaran, dan pengembangan profesi berkelanjutanyag berorientasi kepada siswa.
                            </li>
                            <li>
                                Mengembangkan inovasi pembelajaran yang berorientasi kepada siswa sesuai dengan kodrat alam dan kodrat zaman.
                            </li>
                            <li>
                                Membangun ekosistem pembelajaran berlandaskan gotong royong yang berorientasi kepada siswa.
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </PrescenceMotion>
    );
}