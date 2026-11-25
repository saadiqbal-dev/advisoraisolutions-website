"use client";

import { useState } from "react";
import Image from "next/image";

export function YouTube({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden border border-line bg-surface">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="group absolute inset-0 block text-left" onClick={() => setPlay(true)}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-[#060D1A]/25 transition-colors group-hover:bg-[#060D1A]/40" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-background">
            <svg viewBox="0 0 24 24" className="ml-1 size-6" aria-hidden="true">
              <polygon points="6 4 20 12 6 20" fill="currentColor" />
            </svg>
          </span>
          <span className="sr-only">Play video: {title}</span>
        </button>
      )}
    </div>
  );
}
