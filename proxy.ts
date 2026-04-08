import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "1 m"), // 60 requests per minute
  analytics: true,
});

const HOME_ROUTE_PATTERN = /^\/(ppid|profil|program|publikasi|ssd|ult|zi-wbk|$)/;

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!HOME_ROUTE_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  }

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
  ],
};