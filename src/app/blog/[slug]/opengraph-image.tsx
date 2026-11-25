import { getPost, getPosts } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Advisor AI Solutions article";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg({ eyebrow: post?.category ?? "Blog", title: post?.title ?? "Advisor AI Solutions" });
}
