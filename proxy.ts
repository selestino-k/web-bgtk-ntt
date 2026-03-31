import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// 60 requests per minute for (home) pages
const homeLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  analytics: true,
  prefix: "rl:home",
});

// 20 requests per minute for API routes
const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  analytics: true,
  prefix: "rl:api",
});

export async function proxy(req: Request) {
  const { pathname } = new URL(req.url);

  const limiter = pathname.startsWith("/api/") ? apiLimiter : homeLimiter;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1";

  const { success, limit, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  }

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

