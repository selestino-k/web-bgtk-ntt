"use client";

import { useEffect } from "react";
import { useIsMobile } from "./use-mobile";

export function useViewCounter(slug: string) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile === undefined) return;

    const deviceType = isMobile ? 'mobile' : 'desktop';

    fetch("/api/increment", {
      method: "POST",
      body: JSON.stringify({ slug, deviceType }),
      headers: { "Content-Type": "application/json" },
    }).catch(err => console.error("Failed to track view:", err));
  }, [slug, isMobile]);
}