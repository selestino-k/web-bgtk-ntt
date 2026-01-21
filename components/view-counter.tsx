"use client";

import { useViewCounter } from "@/hooks/use-view-counter";

export function ReportView({ slug }: { slug: string }) {
  useViewCounter(slug);
  return null;
}