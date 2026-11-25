"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { TOPIC_FILTERS, episodeTopics, type Episode } from "@/lib/content";

export function PodcastBrowser({ episodes }: { episodes: Episode[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [topic, setTopic] = useState(params.get("topic") ?? "All");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return episodes.filter((episode) => {
      const topics = episodeTopics(episode);
      if (topic !== "All" && !topics.includes(topic) && !episode.placeholder) return false;
      if (topic !== "All" && episode.placeholder) return false;
      if (!needle) return true;
      const blob = [episode.title, episode.guest, episode.guestRole, episode.description, episode.tag, ...episode.tags]
        .join(" ")
        .toLowerCase();
      return blob.includes(needle);
    });
  }, [episodes, query, topic]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="field max-w-md flex-1">
          <label htmlFor="episode-search">Search episodes</label>
          <input
            id="episode-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Guest, firm, or topic"
            type="search"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {TOPIC_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              className={`min-h-10 border px-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] ${topic === item ? "border-gold bg-gold text-background" : "border-line text-muted hover:text-foreground"}`}
              onClick={() => setTopic(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {visible.length} episode{visible.length === 1 ? "" : "s"}
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((episode) => (
          <li key={episode.slug}>
            <a href={`/podcast/${episode.slug}`} className="group block h-full overflow-hidden rounded-3xl border border-line bg-card transition-colors hover:border-[#C5A55A]">
              <div className="relative aspect-video bg-surface">
                {episode.thumb ? (
                  <Image src={episode.thumb} alt="" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted">No published video</div>
                )}
              </div>
              <div className="p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold">
                  {episode.placeholder ? "Placeholder" : `Episode ${episode.ep}`}
                  {episode.tag && !episode.placeholder ? ` · ${episode.tag}` : ""}
                </p>
                <h2 className="mt-2 font-serif text-xl leading-snug group-hover:text-gold">{episode.title}</h2>
                {episode.guest && (
                  <p className="mt-3 text-sm text-muted">
                    Podcast guest · {episode.guest}
                  </p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="mt-8 text-muted">No episodes match that search.</p>}
    </div>
  );
}
