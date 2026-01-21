import MobileNewsCarousel from "@/components/mobile-news-carousel";
import { PrescenceMotion } from "@/components/motion/presence-motion";
import NewsCarousel from "@/components/news-carousel";
import ProgramCardList from "@/components/program-card";
import prisma from "@/lib/prisma";
import { HomeCarousel } from "@/components/home-carousel";
import { KataSambutan } from "./profil/sambutan-kata/page";
import Image from "next/image";
import Link from "next/link";

async function getLatestPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return posts.map(post => ({
      ...post,
      id: post.id.toString(),
      tags: post.tags.map(tagRelation => ({
        ...tagRelation,
        postId: tagRelation.postId.toString(),
        tag: tagRelation.tag,
      })),
    }));
  } catch {
    return [];
  }
}

async function getCarouselPhotos() {
  try {
    const photos = await prisma.carouselPhoto.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return photos;
  } catch {
    return [];
  }
}

export default async function Home() {
  const latestPosts = await getLatestPosts();
  const carouselPhotos = await getCarouselPhotos();

  return (
    <div className="grid w-full min-h-dvh overflow-hidden gap-10 justify-items-center">
      <PrescenceMotion>
        <div id="home" className="relative z-10 flex justify-center h-screen w-screen">
          <div className="absolute inset-0 z-10">
            <HomeCarousel photos={carouselPhotos} />
          </div>
          <main className="z-10 flex flex-col w-full justify-center text-justify justify-items-center items-center h-screen mt-15 px-10 pb-10">
            <h1 className="lg:text-8xl text-4xl sm:text-wrap text-white font-semibold xs:text-xs font-geist">
              Selamat Datang
            </h1>
            <p className="mt-5 lg:text-4xl text-md font-semibold font-montserrat text-white">
              di Situs Web Resmi
            </p>
            <p className="mt-3 lg:text-4xl text-md font-semibold font-montserrat text-white">
              Balai Guru dan Tenaga Kependidikan
            </p>
            <p className="text-md lg:text-4xl font-semibold font-montserrat text-white">
              Provinsi Nusa Tenggara Timur
            </p>
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="program" className="flex relative w-full max-w-7xl items-center mb-5 min-h-dvh">
          <main className="relative z-10 flex flex-col gap-3 p-8 justify-center w-full">
            <div className="text-center">
              <h2 className="md:text-5xl text-3xl font-semibold sm:tracking-tight font-geist text-primary">
                Program Prioritas
              </h2>
            </div>
            <ProgramCardList />
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="sambutan" className="flex relative w-full max-w-7xl items-center mb-10">
          <main className="relative z-10 flex flex-col gap-3 p-8 justify-center w-full">
            <div className="text-center">
              <h2 className="md:text-5xl text-3xl font-semibold sm:tracking-tight mt-2 font-geist text-primary mb-10">
                Sambutan Kata
              </h2>
              <div className="max-w-7xl grid md:flex mx-auto font-montserrat">
                <div className="w-full md:w-3/4 text-left md:mb-5 md:mr-10 relative px-4 md:px-0 mb-14">
                  <Image
                    src="/images/kepala-bgtk-ntt.png"
                    alt="Kepala BGTK NTT"
                    width={1250}
                    height={250}
                    className="rounded-lg w-full h-auto"
                  />
                  <div id="kepala-bgtk-ntt" className="absolute -bottom-12 sm:-bottom-14 md:-bottom-16 left-4 right-4 md:left-0 md:right-0 text-center w-auto md:w-full font-medium bg-primary text-white px-2 sm:px-3 py-2 rounded-lg">
                    <p className="text-xs sm:text-sm">Kepala Balai Guru dan Tenaga Kependidikan</p>
                    <p className="text-xs sm:text-sm">Provinsi Nusa Tenggara Timur</p>
                    <p className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base">Dr. Teguh Rahayu Slamet, M.Si.</p>
                  </div>
                </div>
                <KataSambutan />
              </div>

            </div>
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="berita" className="hidden sm:flex items-center relative mb-10 w-full max-w-7xl">
          <main className="relative z-10 flex flex-col gap-3 justify-center">
            <div className="text-center">
              <h2 className="text-5xl font-semibold sm:tracking-tight mt-2 font-geist text-primary mb-5">

                <Link
                  href="/publikasi/berita-terkini"
                  className="hover:text-primary/70 transition-colors"
                >

                  Berita Terkini
                </Link>
              </h2>
            </div>
            <NewsCarousel initialPosts={latestPosts} />
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="berita-mobile" className="sm:hidden flex items-center relative mb-10 max-w-xs">
          <main className="relative z-10 flex flex-col gap-3 p-8 w-full justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                Berita Terkini
              </h2>
            </div>
            <MobileNewsCarousel initialPosts={latestPosts} />
          </main>
        </div>
      </PrescenceMotion>

    </div>
  );
}
