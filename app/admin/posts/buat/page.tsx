"use client"
import { PostEditor } from "@/components/cms/post-editor"
import { Metadata } from "next";
import { PostData } from "@/components/cms/post-editor";





export default function NewPostPage() {
    const handleSave = async (data: PostData) => {
    // Save as draft
    console.log("Saving draft:", data)
    // TODO: Call API to save draft
  }

  const handlePublish = async (data: PostData) => {
    // Publish post
    console.log("Publishing post:", data)
    // TODO: Call API to publish post
  }
	return (
		<div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-3 w-full">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
						Postingan Baru
					</h2>
				</div>
				<div className="mt-10 flex">
                     <PostEditor 
                        onSave={handleSave}
                        onPublish={handlePublish}
                        />
					
				</div>
				
			</main>
		</div>
	);
}