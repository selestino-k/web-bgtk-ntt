"use client";

import { useEffect } from "react";

export function ReportView({ slug }: { slug: string }) {
  useEffect(() => {
    fetch("/api/increment", {
      method: "POST",
      body: JSON.stringify({ slug }),
      headers: { "Content-Type": "application/json" },
    });
  }, [slug]);

  return null; // This component doesn't render anything
}