// app/api/increment/route.ts
import {Redis} from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug) return new NextResponse("Missing slug", { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "127.0.0.1";
  // Create a unique key for this user/post combo
  const deduplicateKey = `viewed:${ip}:${slug}`;

  const isNewView = await redis.set(deduplicateKey, true, { 
    nx: true, // Only set if it doesn't exist
  });

  if (isNewView) {
    await redis.incr(`views:post:${slug}`);
  }

  return new NextResponse(null, { status: 202 });
}