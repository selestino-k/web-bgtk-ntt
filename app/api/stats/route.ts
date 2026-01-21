import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '90');
    const type = searchParams.get('type'); // 'chart', 'summary', or 'post'
    const slug = searchParams.get('slug');

    // For chart data
    if (type === 'chart') {
      const chartData = [];
      const now = new Date();

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];

        const [desktop, mobile] = await Promise.all([
          redis.get<number>(`views:daily:${dateKey}:desktop`),
          redis.get<number>(`views:daily:${dateKey}:mobile`),
        ]);

        chartData.push({
          date: dateKey,
          desktop: desktop || 0,
          mobile: mobile || 0,
        });
      }

      return NextResponse.json(chartData);
    }

    // For summary stats (homepage, total visits, etc)
    if (type === 'summary') {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const year = now.getFullYear().toString();

      const [
        // Homepage stats
        homepageTotal,
        homepageMobile,
        homepageDesktop,
        
        // Daily stats
        todayTotal,
        todayMobile,
        todayDesktop,
        
        // Monthly stats
        monthTotal,
        monthMobile,
        monthDesktop,
        
        // Yearly stats
        yearTotal,
        yearMobile,
        yearDesktop,
      ] = await Promise.all([
        redis.get<number>(`views:post:homepage`),
        redis.get<number>(`views:post:homepage:mobile`),
        redis.get<number>(`views:post:homepage:desktop`),
        
        redis.get<number>(`views:daily:${today}`),
        redis.get<number>(`views:daily:${today}:mobile`),
        redis.get<number>(`views:daily:${today}:desktop`),
        
        redis.get<number>(`views:monthly:${month}`),
        redis.get<number>(`views:monthly:${month}:mobile`),
        redis.get<number>(`views:monthly:${month}:desktop`),
        
        redis.get<number>(`views:yearly:${year}`),
        redis.get<number>(`views:yearly:${year}:mobile`),
        redis.get<number>(`views:yearly:${year}:desktop`),
      ]);

      return NextResponse.json({
        homepage: {
          total: homepageTotal || 0,
          mobile: homepageMobile || 0,
          desktop: homepageDesktop || 0,
        },
        today: {
          total: todayTotal || 0,
          mobile: todayMobile || 0,
          desktop: todayDesktop || 0,
        },
        thisMonth: {
          total: monthTotal || 0,
          mobile: monthMobile || 0,
          desktop: monthDesktop || 0,
        },
        thisYear: {
          total: yearTotal || 0,
          mobile: yearMobile || 0,
          desktop: yearDesktop || 0,
        },
      });
    }

    //For 90 days summary 
    if (type === '90d') {
      const chartData = [];
      const now = new Date();
      for (let i = 89; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        const [desktop, mobile] = await Promise.all([
          redis.get<number>(`views:daily:${dateKey}:desktop`),
          redis.get<number>(`views:daily:${dateKey}:mobile`),
        ]);
        chartData.push({
          date: dateKey,
          desktop: desktop || 0,
          mobile: mobile || 0,
        });
      }
      return NextResponse.json({ chartData });
    }

    //For 30 days summary
    if (type === '30d') {
      const chartData = [];
      const now = new Date();
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        const [desktop, mobile] = await Promise.all([
          redis.get<number>(`views:daily:${dateKey}:desktop`),
          redis.get<number>(`views:daily:${dateKey}:mobile`),
        ]);
        chartData.push({
          date: dateKey,
          desktop: desktop || 0,
          mobile: mobile || 0,
        });
      }
      return NextResponse.json({ chartData });
    }

    //For 7 days summary
    if (type === '7d') {
      const chartData = [];
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        const [desktop, mobile] = await Promise.all([
          redis.get<number>(`views:daily:${dateKey}:desktop`),
          redis.get<number>(`views:daily:${dateKey}:mobile`),
        ]); 
        chartData.push({
          date: dateKey,
          desktop: desktop || 0,
          mobile: mobile || 0,
        });
      }
      return NextResponse.json({ chartData });
    }

    // For individual post stats
    if (type === 'post' && slug) {
      const [total, mobile, desktop] = await Promise.all([
        redis.get<number>(`views:post:${slug}`),
        redis.get<number>(`views:post:${slug}:mobile`),
        redis.get<number>(`views:post:${slug}:desktop`),
      ]);

      return NextResponse.json({
        slug,
        total: total || 0,
        mobile: mobile || 0,
        desktop: desktop || 0,
      });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}