"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
export const SanghaMapDynamic = dynamic(
  () => import("./SanghaMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🗺️</div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading map...</p>
        </div>
      </div>
    ),
  }
);
