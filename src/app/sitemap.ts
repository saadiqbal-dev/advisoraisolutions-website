import type { MetadataRoute } from "next";
import { getEpisodes, getPosts } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/how-it-works",
    "/podcast",
    "/blog",
    "/faq",
    "/about",
    "/assessment",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];
  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/blog" || path === "/podcast" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  const episodes: MetadataRoute.Sitemap = getEpisodes().map((episode) => ({
    url: `${site.url}/podcast/${episode.slug}`,
    lastModified: new Date(episode.isoDate),
    changeFrequency: "yearly",
    priority: episode.placeholder ? 0.3 : 0.6,
  }));
  const posts: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: "monthly",
    priority: post.source === "published" ? 0.7 : 0.4,
  }));
  return [...pages, ...episodes, ...posts];
}
