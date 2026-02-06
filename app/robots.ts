// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/admin', '/api/admin', '/api', '/api/upload', '/api/auth','/api/stats','/api/increment' ], // Block all bots from crawling admin paths
    },
  };
}