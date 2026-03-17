import { ImageResponse } from "next/og";
import { db } from "@/lib/db/db";
import { readFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

async function getPostBySlug(slug: string) {
    try {
        const result = await db.query.post.findFirst({
            where: (p, { eq: eqFn, and: andFn }) =>
                andFn(eqFn(p.slug, slug), eqFn(p.published, true)),
            columns: {
                id: true,
                title: true,
                thumbnail: true,
            },
        });

        if (!result) return null;

        return {
            ...result,
            id: result.id.toString(),
        };
    } catch {
        return null;
    }
}

export default async function OGImage({ params }: { params: { slug: string } }) {
    const postData = await getPostBySlug(params.slug);

    if (!postData) {
        return new Response("Postingan tidak ditemukan", { status: 404 });
    }

    // If post has thumbnail, redirect to it instead of generating image
    if (postData.thumbnail) {
        return Response.redirect(postData.thumbnail, 302);
    }

    const postTitleTruncated = postData.title.length > 100 ? postData.title.slice(0, 97) + "..." : postData.title;

    // Read the background image from public folder
    const imagePath = join(process.cwd(), 'public', 'images', 'bgtk-background.png');
    let backgroundImage = '';

    try {
        const imageBuffer = await readFile(imagePath);
        const base64Image = imageBuffer.toString('base64');
        backgroundImage = `data:image/png;base64,${base64Image}`;
    } catch (error) {
        console.error('Error reading background image:', error);
        backgroundImage = '';
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#ffffff",
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "40px",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        display: "flex",
                    }}
                />
                <h1
                    style={{
                        fontSize: "56px",
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                        color: "#297bbf",
                        marginBottom: "20px",
                        textAlign: "center",
                        zIndex: 1,
                        maxWidth: "90%",
                        lineHeight: 1.2,
                    }}
                >
                    {postTitleTruncated}
                </h1>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}