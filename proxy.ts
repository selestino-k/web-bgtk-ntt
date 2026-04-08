import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const redis = Redis.fromEnv();

const limiters = {
  guest: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(200, "1 m"),
    analytics: true,
    prefix: "rl:guest",
  }),
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(300, "1 m"),
    analytics: true,
    prefix: "rl:auth",
  }),
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    analytics: true,
    prefix: "rl:api",
  }),
  authApi: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"), // brute-force protection
    analytics: true,
    prefix: "rl:auth-api",
  }),
};

const SEO_BOT_UA = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i;

function tooManyRequests(limit: number, remaining: number, reset: number) {
  return new NextResponse("Too Many Requests", {
    status: 429,
    headers: {
      "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
    },
  });
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
  const ua = req.headers.get("user-agent") ?? "";

  // SEO bots — bypass rate limiting entirely
  if (SEO_BOT_UA.test(ua)) {
    return NextResponse.next();
  }

  // /api/auth/* — strict brute-force protection
  if (pathname.startsWith("/api/auth/")) {
    const { success, limit, remaining, reset } = await limiters.authApi.limit(ip);
    if (!success) return tooManyRequests(limit, remaining, reset);
    return NextResponse.next();
  }

  // /api/* — standard API limit
  if (pathname.startsWith("/api/")) {
    const { success, limit, remaining, reset } = await limiters.api.limit(ip);
    if (!success) return tooManyRequests(limit, remaining, reset);
    return NextResponse.next();
  }

  // Home routes — differentiate authenticated vs guest
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const limiter = token ? limiters.auth : limiters.guest;
  const key = token ? `${token.sub ?? ip}` : ip;

  const { success, limit, remaining, reset } = await limiter.limit(key);
  if (!success) return tooManyRequests(limit, remaining, reset);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/ppid/:path*",
    "/profil/:path*",
    "/program/:path*",
    "/publikasi/:path*",
    "/ssd/:path*",
    "/ult/:path*",
    "/zi-wbk/:path*",
    "/api/:path*",
  ],
};