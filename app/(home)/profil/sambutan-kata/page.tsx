import { PrescenceMotion } from "@/components/motion/presence-motion";

export function KataSambutan() {
    return (
        <div>
            <p className="mt-3 text-sm md:text-base font-medium text-wrap text-justify">
                Selamat datang di laman resmi Balai Guru dan Tenaga Kependidikan (BGTK) Provinsi Nusa Tenggara Timur (NTT). Sebagai wujud komitmen kami dalam mendukung peningkatan kualitas pendidikan di NTT, BGTK hadir sebagai mitra strategis bagi para pendidik, tenaga kependidikan, dan pemangku kepentingan pendidikan lainnya.
            </p>
            <p className="mt-3 text-sm md:text-base font-medium  text-wrap text-justify">
                Melalui website ini, kami menyediakan berbagai informasi layanan yang dapat diakses oleh seluruh guru, kepala sekolah, pengawas sekolah, dan masyarakat umum. Layanan kami dirancang untuk mendukung pengembangan kompetensi guru, inovasi pembelajaran, serta penguatan kepemimpinan pendidikan dalam rangka mewujudkan Pendidikan Bermutu Untuk Semua.
            </p>
            <p className="mt-3 text-sm md:text-base font-medium  text-wrap text-justify">
                Kami mengundang Anda untuk menjelajahi setiap layanan yang tersedia, mengikuti program-program unggulan, dan memanfaatkan sumber daya yang kami sediakan. Bersama-sama, mari kita wujudkan pendidikan NTT yang berkualitas, inovatif, dan berdaya saing.
            </p>
            <p className="mt-3 text-sm md:text-base font-medium  text-wrap text-justify">
                Terima kasih atas kunjungan Anda. Untuk informasi lebih lanjut, silakan hubungi kami melalui kontak yang tersedia.
            </p>
        </div>
    );
}

export default function SambutanKata() {
    return (
        <PrescenceMotion>
            <div id="sambutan" className="mt-20 w-full max-w-7xl place-items-start px-10">
                <main className="relative z-10 flex flex-col gap-3 p-8 w-full">
                    <div className="text-left">
                        <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                            Sambutan Kata
                        </h2>
                        <h3 className="text-md md:text-xl sm:tracking-tight mb-5 md:mb-10 font-geist">
                            Dari Kepala BGTK NTT
                        </h3>
                    </div>
                    <KataSambutan />

                </main>
            </div>
        </PrescenceMotion>
    );
}