import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{    
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <img 
                    src={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/opengraph-image.png`}
                    alt="OG Image BGTK NTT"
                    width="1200"
                    height="630"
                />
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}