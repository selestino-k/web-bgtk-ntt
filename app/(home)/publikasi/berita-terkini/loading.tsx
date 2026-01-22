import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
            <main className="relative z-10 gap-20 p-8 md:flex w-full block">
                <div className="text-left md:w-5/6 pl-5">
                    <Skeleton className="h-8 md:h-12 w-48 md:w-64 mb-1 md:mb-5" />
                    
                    <div className="flex flex-wrap gap-6 w-full">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="w-full">
                                <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                                    {/* Thumbnail skeleton with image icon */}
                                    <div className="relative h-48 w-full md:w-80">
                                        <Skeleton className="h-full w-full rounded-md bg-gray-300" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg 
                                                className="w-12 h-12 text-gray-400" 
                                                fill="currentColor" 
                                                viewBox="0 0 20 20"
                                            >
                                                <path 
                                                    fillRule="evenodd" 
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                                                    clipRule="evenodd" 
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    {/* Content skeleton */}
                                    <div className="flex-1 space-y-3">
                                        {/* Tags skeleton */}
                                        <div className="flex gap-2">
                                            <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
                                            <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                                        </div>
                                        
                                        {/* Title skeleton */}
                                        <Skeleton className="h-6 w-full bg-gray-300" />
                                        <Skeleton className="h-6 w-3/4 bg-gray-300" />
                                        
                                        {/* Excerpt skeleton */}
                                        <Skeleton className="h-4 w-full bg-gray-300" />
                                        <Skeleton className="h-4 w-full bg-gray-300" />
                                        <Skeleton className="h-4 w-2/3 bg-gray-300" />
                                        
                                        {/* Meta info skeleton */}
                                        <div className="flex gap-4 pt-2">
                                            <Skeleton className="h-4 w-32 bg-gray-300" />
                                            <Skeleton className="h-4 w-24 bg-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination skeleton */}
                    <div className="flex justify-center gap-2 mt-8">
                        <Skeleton className="h-9 w-20 rounded-md bg-gray-300" />
                        <Skeleton className="h-9 w-9 rounded-md bg-gray-300" />
                        <Skeleton className="h-9 w-9 rounded-md bg-gray-300" />
                        <Skeleton className="h-9 w-9 rounded-md bg-gray-300" />
                        <Skeleton className="h-9 w-20 rounded-md bg-gray-300" />
                    </div>
                </div>
                
                <div className="mb-5 md:w-1/6">
                    <Skeleton className="h-6 md:h-8 w-24 md:w-32 mb-1 md:mb-5" />
                    <div className="flex w-full flex-wrap gap-2 px-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-7 w-16 rounded-full bg-gray-300" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}