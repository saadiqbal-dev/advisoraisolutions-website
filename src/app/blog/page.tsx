import { Breadcrumbs } from "@/components/breadcrumbs";
import { MediaRail } from "@/components/media-rail";
import { getPosts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog",
  description: "Notes on AI visibility, outreach, and pipeline systems for architecture, engineering, and construction firms.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();
  return (
    <main id="main" className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <p className="eyebrow">Journal</p>
      <h1 className="mt-3 font-serif text-4xl md:text-6xl">From the work.</h1>
      <MediaRail set="pipeline" />
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Articles are published only where the source text exists. Everything else is marked.
      </p>
      <ul className="mt-12 divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className="grid gap-2 rounded-2xl px-2 py-6 transition-colors hover:bg-card md:grid-cols-12 md:items-baseline">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-gold md:col-span-3">
                {post.dateLabel}
              </span>
              <span className="md:col-span-7">
                <span className="block font-serif text-2xl leading-snug">{post.title}</span>
                {post.excerpt && <span className="mt-2 block text-sm text-muted">{post.excerpt}</span>}
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted md:col-span-2 md:text-right">
                {post.source === "published" ? post.category : post.source === "excerpt" ? "Excerpt only" : "Placeholder"}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
