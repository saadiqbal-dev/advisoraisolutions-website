import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MediaRail } from "@/components/media-rail";
import { JsonLd } from "@/components/json-ld";
import { PodcastBrowser } from "@/components/podcast-browser";
import { getEpisodes } from "@/lib/content";
import { podcastSeriesJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Podcast",
  description:
    "Conversations with architecture, engineering, construction, and green-building leaders. Guests are labelled as podcast guests, not clients.",
  path: "/podcast",
});

export default function PodcastPage() {
  const episodes = getEpisodes();
  const published = episodes.filter((episode) => !episode.placeholder);
  return (
    <main id="main" className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <JsonLd data={podcastSeriesJsonLd(published.length)} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Podcast", path: "/podcast" }]} />
      <p className="eyebrow">Advisor AI Solutions Podcast</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl md:text-6xl">In conversation with people who build.</h1>
      <MediaRail set="show" />
      <p className="mt-6 max-w-2xl text-lg text-muted">
        {published.length} episodes with named guests. Everyone listed here appeared as a podcast guest. That is not a
        client list.
      </p>
      <a href={site.youtubeSubscribe} className="mt-4 inline-block text-sm text-gold">
        Subscribe on YouTube
      </a>
      <div className="mt-12">
        <Suspense fallback={<p className="text-muted">Loading episodes…</p>}>
          <PodcastBrowser episodes={episodes} />
        </Suspense>
      </div>
    </main>
  );
}
