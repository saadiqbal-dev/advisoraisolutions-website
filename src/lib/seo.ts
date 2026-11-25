import type { Metadata } from "next";
import { clip, site } from "@/lib/site";

export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const desc = clip(description, 155);
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: desc,
      url: path,
      siteName: site.name,
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
    },
  };
}
