import MobileNewsCarousel from "@/components/mobile-news-carousel";
import { PrescenceMotion } from "@/components/motion/presence-motion";
import NewsCarousel from "@/components/news-carousel";
import ProgramCardList from "@/components/program-card";
import prisma from "@/lib/prisma";
import { HomeCarousel } from "@/components/home-carousel";
import { KataSambutan } from "./profil/sambutan-kata/page";
import Image from "next/image";
import Link from "next/link";
import PengumumanSidebar from "@/components/pengumuman-sidebar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/(home)/publikasi/dokumen/home-columns";
import { ArrowRightIcon } from "lucide-react";

async function getDocsData() {
  return await prisma.document.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

async function getLatestNews() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        tags: {
          some: {
            tag: {
              type: 'CATEGORY',
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
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


export const dynamic = 'force-dynamic';

export default async function Home() {
  const carouselPhotos = await getCarouselPhotos();
  const latestPosts = await getLatestNews();
  const docsData = await getDocsData();
  const docsDataWithTableNumber = docsData.map((doc, index) => ({
    ...doc,
    tableNumber: index + 1
  }))

  return (
    <div className="grid w-full xs:sm:max-w-screen md:lg:xl:max-w-full overflow-hidden justify-items-center">

      <PrescenceMotion>
        <div id="home" className="flex relative w-screen mb-5">
          <main className="relative z-10 flex md:lg:xl:mt-20 w-full">
            <HomeCarousel photos={carouselPhotos} />
          </main>
        </div>

        <div id="sambutan" className="flex relative w-full xs:sm:max-w-md items-center mb-3 ">
          <main className="relative z-10 flex flex-col gap-3 p-8 px-4 sm:px-0 items-center justify-items-center w-full lg:w-full">
            <div className="text-center">
              <div className="max-w-full mx-auto lg:mx-8 xl:flex font-montserrat">

                <div id="sambutan-video-mobile" className="md:hidden sm:grid justify-items-center mb-6">
                  <div className="rounded-lg overflow-hidden shadow-lg ">
                    <iframe
                      width="300"
                      height="170"
                      src="https://www.youtube-nocookie.com/embed/kWEl6wepuO4?si=hdhp-Gjd-cRPK4x4"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>

                <div id="sambutan-video-tablet" className="hidden md:grid lg:hidden justify-items-center mb-6">
                  <div className="rounded-lg overflow-hidden shadow-lg ">
                    <iframe
                      width="480"
                      height="270"
                      src="https://www.youtube-nocookie.com/embed/kWEl6wepuO4?si=hdhp-Gjd-cRPK4x4"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>

                <div id="sambutan-video-laptop" className="hidden lg:grid xl:hidden justify-items-center mb-6">
                  <div className="rounded-lg overflow-hidden shadow-lg ">
                    <iframe
                      width="480"
                      height="270"
                      src="https://www.youtube-nocookie.com/embed/kWEl6wepuO4?si=hdhp-Gjd-cRPK4x4"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>

                <div id="sambutan-text" className="lg:grid xl:flex mb-6 flex-1">
                  <div className="w-full xs:sm:grid md:lg:px-8 xs:sm:max-w-md lg:max-w-full justify-items-center items-center">
                    <Image
                      src="/images/foto-pak-kepala+textbox.png"
                      alt="Kepala BGTK NTT"
                      width={400}
                      height={400}
                      className="rounded-lg md:float-start w-[50vw] lg:float-start mr-4 mb-1 md:lg:mb-4 md:w-[20vw] h-auto items-center object-cover"
                    />
                    <KataSambutan />
                  </div>
                </div>

                <div id="sambutan-video-desktop" className="hidden xl:w-2/5 xl:ml-2 xl:flex justify-center items-start">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      width="540"
                      height="540"
                      src="https://www.youtube-nocookie.com/embed/kWEl6wepuO4?si=hdhp-Gjd-cRPK4x4"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>

              </div>
            </div>
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="program" className="xl:mt-5 mt-10 mb-5 lg:mb-10 flex relative max-w-7xl items-center">
          <main className="relative z-10 flex flex-col gap-3 justify-center">
            <div className="text-center mb-8">
              <h2 className="md:text-3xl lg:text-5xl text-3xl font-semibold font-montserrat sm:tracking-tight text-primary">
                Program Prioritas
              </h2>
            </div>
            <ProgramCardList />
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="berita" className="hidden lg:flex items-center relative mb-10 mt-10 w-full lg:max-w-7xl">
          <main className="relative z-10 flex flex-col gap-3 justify-center">
            <div className="flex" >
              <div className="w-3/4 pr-6">
                <h2 className="text-5xl font-semibold font-montserrat sm:tracking-tight mt-2 font-montserrat text-primary mb-3">
                  Berita Terkini
                </h2>
                <h4 className="text-lg text-gray-500 mb-6 font-inter dark:text-gray-400">
                  Dapatkan informasi terbaru seputar kegiatan, program, dan inovasi BGTK Provinsi NTT.
                </h4>
                <NewsCarousel initialPosts={latestPosts} />
                <h4 className="text-md font-semibold font-montserrat text-primary hover:text-primary/70 transition-colors mb-6 items-center gap-2 mt-5 flex justify-center">
                  <Link href="/publikasi/berita-terkini" className="hover:text-primary/70 transition-colors flex items-center gap-2">
                    Lainnya
                    <ArrowRightIcon className="h-5 w-5 text-primary hover:text-primary/70" />
                  </Link>
                </h4>
              </div>
              <div className="flex w-1/4 gap-6">
                <PengumumanSidebar />
              </div>
            </div>
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="berita-mobile" className="xl:hidden sm:md:lg:flex items-center relative mb-10 max-w-xs sm:md:max-w-xl lg:max-w-3xl">
          <main className="relative z-10 flex flex-col gap-3 p-8 justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-semibold sm:tracking-tight mt-2 font-montserrat text-primary">
                Berita Terkini
              </h2>
              <MobileNewsCarousel initialPosts={latestPosts} />
              <h4 className="text-md font-semibold font-montserrat text-primary mb-6 items-center gap-2 mt-5 md:hidden flex justify-center">
                <Link href="/publikasi/berita-terkini" className="hover:text-primary/70 transition-colors flex items-center gap-2">
                  Lainnya
                  <ArrowRightIcon className="h-5 w-5 text-primary hover:text-primary/70" />
                </Link>
              </h4>
            </div>
            <div className="mt-6">
              <PengumumanSidebar />
            </div>
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="documents" className="flex relative mb-10 items-center overflow-x-scroll xl:overflow-x-hidden xl:w-full max-w-2xl xl:max-w-7xl">
          <main className="relative z-10 flex flex-col gap-3 p-8 justify-center w-full">
            <div className="text-center">
              <h2 className="md:text-5xl text-3xl font-semibold sm:tracking-tight font-montserrat text-primary">
                <Link href="/publikasi/dokumen" className="hover:text-primary/70 transition-colors flex items-center gap-2 justify-center">
                Dokumen
                </Link>
              </h2>
            </div>
            <div className="md:max-w-full max-w-xs mx-auto overflow-x-scroll xl:overflow-x-hidden font-inter">
              <DataTable columns={columns} data={docsDataWithTableNumber} />
            </div>
          </main>
        </div>
      </PrescenceMotion>

    </div>
  );
}