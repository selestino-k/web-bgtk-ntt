// app/api/increment/route.ts
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  const { slug, deviceType } = await req.json();
  if (!slug) return new NextResponse("Missing slug", { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
             req.headers.get("x-real-ip") || 
             "127.0.0.1";
  
  // Create a unique key for this user/post combo
  const deduplicateKey = `viewed:${ip}:${slug}`;

  const isNewView = await redis.set(deduplicateKey, true, { 
    nx: true,
    ex: 86400, // Expire after 24 hours (1 day)
  });

  if (isNewView) {
    // Increment total views
    await redis.incr(`views:post:${slug}`);
    
    // Increment device-specific views
    if (deviceType === 'mobile') {
      await redis.incr(`views:post:${slug}:mobile`);
    } else {
      await redis.incr(`views:post:${slug}:desktop`);
    }

    // Track daily, monthly, and yearly stats
    const now = new Date();
    const dateKey = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const yearKey = now.getFullYear().toString();

    await Promise.all([
      redis.incr(`views:daily:${dateKey}`),
      redis.incr(`views:monthly:${monthKey}`),
      redis.incr(`views:yearly:${yearKey}`),
      redis.incr(`views:daily:${dateKey}:${deviceType}`),
      redis.incr(`views:monthly:${monthKey}:${deviceType}`),
      redis.incr(`views:yearly:${yearKey}:${deviceType}`),
    ]);
  }

  return new NextResponse(null, { status: 202 });
}