import MobileNewsCarousel from "@/components/mobile-news-carousel";
import { PrescenceMotion } from "@/components/motion/presence-motion";
import NewsCarousel from "@/components/news-carousel";
import ProgramCardList from "@/components/program-card";
import prisma from "@/lib/prisma";
import { HomeCarousel } from "@/components/home-carousel";

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
  } catch (error) {
    console.error("Error fetching posts:", error);
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
  } catch (error) {
    console.error("Error fetching carousel photos:", error);
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
          <main className="z-10 flex flex-col w-full justify-center text-justify justify-items-start items-start h-screen px-10 mt-35 pb-10">
            <h1 className="lg:text-9xl text-5xl sm:text-wrap text-white font-semibold xs:text-xs font-geist">
              Selamat 
            </h1>
             <h1 className="lg:text-9xl text-5xl sm:text-wrap text-white font-semibold xs:text-xs font-geist">
              Datang
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
        <div id="program" className="flex relative w-full max-w-7xl items-center mb-10">
          <main className="relative z-10 flex flex-col gap-3 p-8 justify-center w-full">
            <div className="text-center">
              <h2 className="text-5xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
                Program Prioritas
              </h2>
            </div>
            <ProgramCardList />
          </main>
        </div>
      </PrescenceMotion>

      <PrescenceMotion>
        <div id="berita" className="hidden sm:flex items-center relative mb-10w-full">
          <main className="relative z-10 flex flex-col gap-3 justify-center">
            <div className="text-center">
              <h2 className="text-5xl font-semibold sm:tracking-tight mt-2 font-geist text-primary mb-5">
                Berita Terkini
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
              <h2 className="text-2xl font-semibold sm:tracking-tight mt-2 font-geist text-primary">
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
