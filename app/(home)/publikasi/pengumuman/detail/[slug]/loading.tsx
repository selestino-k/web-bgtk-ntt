import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PengumumanDetailLoading() {
  return (
    <div id="pengumuman-detail" className="mt-20 flex place-items-start w-full px-10">
      <main className="relative z-10 gap-8 p-8 md:flex w-full">
        <div className="text-left w-full">
          {/* Breadcrumb Skeleton */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="h-8 md:h-12 w-3/4 mb-4" />

          {/* Metadata Skeleton */}
          <div className="mb-4 flex space-x-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Thumbnail Skeleton */}
          <div className="relative max-w-2xl h-auto items-center mx-auto mb-6">
            <Skeleton className="w-full h-[450px] rounded-lg" />
          </div>

          {/* Document Card Skeleton */}
          <Card className="mb-6 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <Skeleton className="h-9 w-24" />
              </div>
            </CardContent>
          </Card>

          {/* Content Skeleton */}
          <div className="mt-6 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            
            <div className="pt-4">
              <Skeleton className="h-6 w-48 mb-3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          {/* Bottom Download Button Skeleton */}
          <div className="mt-8 flex justify-center">
            <Skeleton className="h-11 w-56" />
          </div>

          {/* Tags Skeleton */}
          <div className="mt-10 flex items-center gap-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </main>
    </div>
  );
}