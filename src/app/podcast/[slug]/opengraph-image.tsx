import { getEpisode, getEpisodes } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Advisor AI Solutions Podcast episode";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getEpisodes().map((episode) => ({ slug: episode.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  return renderOg({
    eyebrow: episode && !episode.placeholder ? `Episode ${episode.ep}` : "Podcast",
    title: episode?.title ?? "Advisor AI Solutions Podcast",
  });
}
