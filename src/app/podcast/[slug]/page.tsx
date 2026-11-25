import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { YouTube } from "@/components/youtube";
import { episodeTopics, getEpisode, getEpisodes } from "@/lib/content";
import { podcastEpisodeJsonLd } from "@/lib/schema";
import { clip, site } from "@/lib/site";

export function generateStaticParams() {
  return getEpisodes().map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) return {};
  const description = clip(episode.placeholder ? episode.title : episode.description, 155);
  return {
    title: { absolute: episode.title },
    description,
    alternates: { canonical: `/podcast/${episode.slug}` },
    openGraph: { title: episode.title, description, url: `/podcast/${episode.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title: episode.title, description },
  };
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) notFound();
  const published = getEpisodes().filter((item) => !item.placeholder);
  const index = published.findIndex((item) => item.slug === episode.slug);
  const previous = index > 0 ? published[index - 1] : undefined;
  const next = index >= 0 && index < published.length - 1 ? published[index + 1] : undefined;
  const hostOnly = !episode.guest || episode.guest === site.founder;

  return (
    <main id="main" className="mx-auto w-full max-w-[860px] px-5 py-14 md:px-8 md:py-20">
      {!episode.placeholder && <JsonLd data={podcastEpisodeJsonLd(episode)} />}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Podcast", path: "/podcast" },
          { name: episode.placeholder ? "Episode" : `Episode ${episode.ep}`, path: `/podcast/${episode.slug}` },
        ]}
      />
      <p className="eyebrow">{episode.placeholder ? "Sitemap URL" : `Episode ${episode.ep}`}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{episode.title}</h1>
      {!episode.placeholder && (
        <p className="mt-4 text-sm text-muted">
          {episode.date}
          {episodeTopics(episode).length > 0 ? ` · ${episodeTopics(episode).join(" · ")}` : ""}
        </p>
      )}
      {episode.placeholder ? (
        <p className="mt-8 border-l-2 border-gold pl-4 text-muted">{episode.description}</p>
      ) : (
        <>
          <p className="mt-6 text-lg text-muted">{episode.description}</p>
          <p className="mt-4 text-sm">
            {hostOnly ? (
              <span>Hosted by {site.founder}.</span>
            ) : (
              <span>
                Podcast guest · {episode.guest}
                {episode.guestRole ? `, ${episode.guestRole}` : ""}. Not a client endorsement.
              </span>
            )}
          </p>
          <div className="mt-8">{episode.videoId && <YouTube id={episode.videoId} title={episode.title} />}</div>
          {episode.keyTopics.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl">Topics</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {episode.keyTopics.map((topic) => (
                  <li key={topic} className="border border-line px-3 py-1 text-sm text-muted">
                    {topic}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {episode.takeaways.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl">From the conversation</h2>
              <ul className="mt-4 space-y-3">
                {episode.takeaways.map((item) => (
                  <li key={item} className="border-l-2 border-gold pl-4 text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="mt-10">
            <h2 className="font-serif text-2xl">Transcript</h2>
            <p className="mt-3 border-l-2 border-gold pl-4 text-sm text-muted">
              [PLACEHOLDER: a transcript or full show notes were not published with this episode.]
            </p>
          </section>
        </>
      )}
      <aside className="mt-12 border border-line bg-card p-6">
        <h2 className="font-serif text-2xl">Put the same system behind your firm</h2>
        <p className="mt-2 text-sm text-muted">
          Visibility, outreach, authority, and one pipeline. Built only for AEC firms.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a href="/services" className="text-sm text-gold">
            See the services
          </a>
          <a href={site.calendly} className="text-sm text-gold">
            Book a discovery call
          </a>
        </div>
      </aside>
      {(previous || next) && (
        <nav className="mt-10 grid gap-4 border-t border-line pt-6 sm:grid-cols-2" aria-label="More episodes">
          {next ? (
            <a href={`/podcast/${next.slug}`} className="text-sm">
              <span className="block text-muted">Older</span>
              <span className="font-serif text-lg">{next.title}</span>
            </a>
          ) : (
            <span />
          )}
          {previous ? (
            <a href={`/podcast/${previous.slug}`} className="text-sm sm:text-right">
              <span className="block text-muted">Newer</span>
              <span className="font-serif text-lg">{previous.title}</span>
            </a>
          ) : null}
        </nav>
      )}
    </main>
  );
}
