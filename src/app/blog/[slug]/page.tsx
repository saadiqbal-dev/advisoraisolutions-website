import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getPost, getPosts } from "@/lib/content";
import { articleJsonLd } from "@/lib/schema";
import { clip, site } from "@/lib/site";
import { slugify } from "@/lib/utils";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const description = clip(post.excerpt || `${post.title}. Full article text was not in the published source.`, 155);
  return {
    title: { absolute: post.title },
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description, url: `/blog/${post.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title: post.title, description },
  };
}

function headingText(paragraph: string) {
  if (paragraph.startsWith("**") && paragraph.endsWith("**") && paragraph.slice(2, -2).indexOf("**") === -1) {
    return paragraph.slice(2, -2);
  }
  return null;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>,
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const headings = post.body.map(headingText).filter((item): item is string => Boolean(item));
  const startsWithExcerpt = post.body[0] && post.excerpt && post.body[0].startsWith(post.excerpt.slice(0, 80));

  return (
    <main id="main" className="mx-auto w-full max-w-[860px] px-5 py-14 md:px-8 md:py-20">
      <JsonLd data={articleJsonLd(post)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: "Article", path: `/blog/${post.slug}` },
        ]}
      />
      <p className="eyebrow">{post.category}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-sm text-muted">
        {post.dateLabel}
        {post.readTime ? ` · ${post.readTime}` : ""} · {site.founder}
      </p>
      {post.source !== "published" && (
        <p className="mt-6 border-l-2 border-gold pl-4 text-sm text-muted">
          {post.source === "excerpt"
            ? "[PLACEHOLDER: the live source included this excerpt only. The rest of the article was not published in the page data.]"
            : "[PLACEHOLDER: this URL is on the live sitemap, but the article body was not in the published source.]"}
        </p>
      )}
      {post.excerpt && !startsWithExcerpt && <p className="mt-8 text-lg text-muted">{post.excerpt}</p>}
      {headings.length > 0 && (
        <nav aria-label="On this page" className="mt-8 border border-line p-5">
          <p className="eyebrow">On this page</p>
          <ol className="mt-3 space-y-2 text-sm">
            {headings.map((heading) => (
              <li key={heading}>
                <a className="hover:text-gold" href={`#${slugify(heading)}`}>
                  {heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <article className="mt-10 space-y-5 text-[1.05rem] leading-relaxed">
        {post.body.map((paragraph, index) => {
          const heading = headingText(paragraph);
          if (heading) {
            return (
              <h2 id={slugify(heading)} key={index} className="pt-4 font-serif text-3xl">
                {heading}
              </h2>
            );
          }
          return (
            <p key={index} className="text-foreground/95">
              {renderInline(paragraph)}
            </p>
          );
        })}
      </article>
      <aside className="mt-12 border border-line bg-card p-6">
        <p className="eyebrow">Author</p>
        <h2 className="mt-2 font-serif text-2xl">{site.founder}</h2>
        <p className="mt-2 text-sm text-muted">
          Founder of Advisor AI Solutions. A decade in power engineering, a decade as an independent advisor, now
          building AI growth systems only for AEC firms.
        </p>
        <a href="/about" className="mt-3 inline-block text-sm text-gold">
          Read the story
        </a>
        {post.linkedinUrl && (
          <a href={post.linkedinUrl} className="mt-2 block text-sm text-gold">
            Also on LinkedIn
          </a>
        )}
      </aside>
    </main>
  );
}
