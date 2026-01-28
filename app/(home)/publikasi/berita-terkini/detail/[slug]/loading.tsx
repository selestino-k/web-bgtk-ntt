import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function BeritaDetailLoading() {
  return (
    <div id="berita-terkini-detail" className="mt-20 flex place-items-start w-full px-10">
      <main className="relative z-10 gap-8 p-8 md:flex w-full animate-pulse">
        <div className="text-left w-full md:w-3/4 md:pr-8">
          {/* Breadcrumb Skeleton */}
          <div className="mb-4 flex items-center space-x-2">
            <Skeleton className="h-4 w-16 bg-gray-300" />
            <Skeleton className="h-4 w-4 bg-gray-300" />
            <Skeleton className="h-4 w-24 bg-gray-300" />
            <Skeleton className="h-4 w-4 bg-gray-300" />
            <Skeleton className="h-4 w-32 bg-gray-300" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="h-12 w-full mb-2 bg-gray-300" />
          <Skeleton className="h-12 w-3/4 mb-5 bg-gray-300" />

          {/* Meta Information Skeleton */}
          <div className="mb-6 flex space-x-4">
            <Skeleton className="h-4 w-24 bg-gray-300" />
            <Skeleton className="h-4 w-28 bg-gray-300" />
            <Skeleton className="h-4 w-20 bg-gray-300" />
            <Skeleton className="h-4 w-24 bg-gray-300" />
          </div>

          {/* Thumbnail Skeleton */}
          <Skeleton className="w-full h-[300px] md:h-[450px] rounded-lg mb-6 bg-gray-300" />

          {/* Document Card Skeleton */}
          <Card className="mb-6 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-gray-300" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2 bg-gray-300" />
                    <Skeleton className="h-3 w-48 bg-gray-300" />
                  </div>
                </div>
                <Skeleton className="h-9 w-24 bg-gray-300" />
              </div>
            </CardContent>
          </Card>

          {/* Content Skeleton */}
          <div className="mt-6 space-y-4">
            <Skeleton className="h-4 w-full bg-gray-300" />
            <Skeleton className="h-4 w-full bg-gray-300" />
            <Skeleton className="h-4 w-5/6 bg-gray-300" />
            <Skeleton className="h-4 w-full bg-gray-300" />
            <Skeleton className="h-4 w-4/6 bg-gray-300" />
            
            <div className="my-6">
              <Skeleton className="h-6 w-48 mb-3 bg-gray-300" />
              <Skeleton className="h-4 w-full bg-gray-300" />
              <Skeleton className="h-4 w-full bg-gray-300" />
              <Skeleton className="h-4 w-3/4 bg-gray-300" />
            </div>

            <Skeleton className="h-4 w-full bg-gray-300" />
            <Skeleton className="h-4 w-full bg-gray-300" />
            <Skeleton className="h-4 w-5/6 bg-gray-300" />
            <Skeleton className="h-4 w-full bg-gray-300" />
            <Skeleton className="h-4 w-2/3 bg-gray-300" />
          </div>

          {/* Bottom Download Button Skeleton */}
          <div className="mt-8 flex justify-center">
            <Skeleton className="h-11 w-56 bg-gray-300" />
          </div>

          {/* Tags Skeleton */}
          <div className="mt-10 flex items-center space-x-2">
            <Skeleton className="h-4 w-8 bg-gray-300" />
            <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
            <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
            <Skeleton className="h-6 w-16 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <aside className="w-full md:w-1/4 mt-8 md:mt-0">
          <div className="space-y-4">
            <Skeleton className="h-8 w-40 mb-4 bg-gray-300" />
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-32 w-full bg-gray-300" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-300" />
                    <Skeleton className="h-4 w-5/6 bg-gray-300" />
                    <Skeleton className="h-3 w-24 mt-2 bg-gray-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}