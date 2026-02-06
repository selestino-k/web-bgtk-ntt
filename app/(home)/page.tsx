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

        <div id="sambutan" className="flex relative w-full xs:sm:max-w-md items-center mb-10 ">
          <main className="relative z-10 flex flex-col gap-3 p-8 px-4 sm:px-0 items-center justify-items-center w-full lg:w-full">
            <div className="text-center">
              <div className="max-w-full mx-auto lg:mx-8 lg:flex font-montserrat">

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

                <div className="md:lg:xl:w-3/5 xs:sm:grid md:lg:px-8 xs:sm:max-w-md md:max-w-2xl lg:max-w-full justify-items-center items-center">
                  <Image
                    src="/images/foto-pak-kepala+textbox.png"
                    alt="Kepala BGTK NTT"
                    width={400}
                    height={400}
                    className="rounded-lg md:float-start lg:float-start mr-4 mb-1 md:lg:mb-4 md:w-[20vw] xs:sm:w-[80vw] h-auto sm:items-center object-cover"
                  />
                  <KataSambutan />
                </div>

                <div id="sambutan-video-desktop" className="hidden lg:w-2/5 lg:ml-2 lg:flex justify-center items-start">
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
        <div id="program" className="xl:mt-5 mt-10 flex relative max-w-2xl xl:max-w-7xl items-center min-h-dvh">
          <main className="relative z-10 flex flex-col gap-3 p-8 justify-center">
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
        <div id="berita" className="hidden lg:flex items-center relative mb-10 mt-10 w-full lg:max-w-7xl">
          <main className="relative z-10 flex flex-col gap-3 justify-center">
            <div className="flex" >
              <div className="w-3/4 pr-6">
                <h2 className="text-5xl font-semibold sm:tracking-tight mt-2 font-geist text-primary mb-5">
                  <Link href="/publikasi/berita-terkini" className="hover:text-primary/70 transition-colors">
                    Berita Terkini
                  </Link>
                </h2>
                <NewsCarousel initialPosts={latestPosts} />
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
              <h2 className="text-3xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                <Link href="/publikasi/berita-terkini" className="hover:text-primary/70 transition-colors">
                  Berita Terkini
                </Link>
              </h2>
              <MobileNewsCarousel initialPosts={latestPosts} />
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
              <h2 className="md:text-5xl text-3xl font-semibold sm:tracking-tight font-geist text-primary">
                Dokumen
              </h2>
            </div>
            <div className="md:max-w-full max-w-xs mx-auto overflow-x-scroll xl:overflow-x-hidden">
              <DataTable columns={columns} data={docsDataWithTableNumber} />
            </div>
          </main>
        </div>
      </PrescenceMotion>

    </div>
  );
}
