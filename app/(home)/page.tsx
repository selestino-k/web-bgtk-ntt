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
    <div className="grid w-full md:lg:xlmax-w-full overflow-hidden justify-items-center">

      <PrescenceMotion>
        <div id="home" className="flex relative w-screen mb-5">
          <main className="relative z-10 flex md:lg:xl:-mt-64 w-full">
            <HomeCarousel photos={carouselPhotos} />
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="program" className="xl:-mt-20 mt-10 flex relative max-w-2xl xl:max-w-7xl items-center min-h-dvh">
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
        <div id="sambutan" className="flex relative xl:w-full max-w-2xl xl:max-w-7xl items-center mb-10 xl:mb-20">
          <main className="relative z-10 flex flex-col gap-3 p-8 justify-center w-full">
            <div className="text-center">
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
        <div id="berita" className="hidden xl:flex items-center relative mb-10 mt-10 w-full xl:max-w-7xl">
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
