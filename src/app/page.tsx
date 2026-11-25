import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { audiences, engagements, pillars, principles, steps, timeline } from "@/lib/copy";
import { getEpisodes, getFaqs, getPosts, getUnconfirmedFaqs, proofGuests } from "@/lib/content";
import { faqJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { FaqList } from "@/components/faq-list";

export const metadata = {
  ...pageMeta({
    title: "Advisor AI Solutions | AI Growth for AEC Firms",
    description:
      "Operator-built AI growth systems for architecture, engineering, construction, and green building firms. Get found, fill the calendar, and run one pipeline.",
    path: "/",
  }),
  title: { absolute: "Advisor AI Solutions | AI Growth for AEC Firms" },
};

export default function HomePage() {
  const episodes = getEpisodes().filter((episode) => !episode.placeholder).slice(0, 4);
  const posts = getPosts().filter((post) => post.source === "published").slice(0, 3);
  const faqs = [
    getFaqs().find((faq) => faq.id === 1)!,
    getFaqs().find((faq) => faq.id === 8)!,
    ...getUnconfirmedFaqs(),
  ];

  return (
    <main id="main">
      <JsonLd data={faqJsonLd(faqs.filter((faq) => !faq.placeholder))} />
      <section className="hero-wash">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12">
          <div className="rise lg:col-span-7">
            <p className="eyebrow">AEC-exclusive AI growth systems</p>
            <h1 className="mt-4 max-w-3xl font-serif text-[2.5rem] leading-[1.05] text-foreground sm:text-5xl lg:text-[3.5rem]">
              Your prospects are asking AI where to find you. Do you show up?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#d5dbe3]">
              Operator-built AI growth systems for architecture, engineering, construction and green building firms.
              Get found by AI search, fill your calendar with qualified conversations, and run your pipeline from one
              system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.calendly} className="inline-flex min-h-12 w-full items-center justify-center bg-gold px-5 text-sm font-medium text-background hover:bg-gold-2 sm:w-auto">
                Book a 30-min Discovery Call
              </a>
              <a href="/assessment" className="inline-flex min-h-12 w-full items-center justify-center border border-gold/50 px-5 text-sm font-medium hover:border-gold sm:w-auto">
                Get your free AI Visibility Score
              </a>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.08em] text-muted">
              No commitment · 30 minutes · AEC firms only
            </p>
          </div>
          <figure className="rise border border-line bg-card p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:col-span-5" aria-label="Illustrative AI answer. Not a live result.">
            <figcaption className="eyebrow">Illustrative · not a live answer</figcaption>
            <p className="mt-5 font-serif text-[1.7rem] leading-snug">Who are the best structural engineers in Denver?</p>
            <ol className="mt-6 space-y-3 text-sm">
              <li className="flex items-center justify-between border-b border-line pb-3 text-muted">
                <span>01 · A firm the model cites</span>
                <span className="font-mono text-xs uppercase tracking-widest text-teal">Cited</span>
              </li>
              <li className="flex items-center justify-between border-b border-line pb-3 text-muted">
                <span>02 · Another cited firm</span>
                <span className="font-mono text-xs uppercase tracking-widest text-teal">Cited</span>
              </li>
              <li className="border border-gold/40 bg-background px-4 py-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold">03</p>
                <p className="mt-1 font-serif text-2xl">Your firm?</p>
                <p className="text-sm text-muted">Not cited yet.</p>
              </li>
            </ol>
          </figure>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="guests-heading">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8">
          <p className="eyebrow">In conversation with</p>
          <h2 id="guests-heading" className="mt-3 max-w-3xl font-serif text-3xl md:text-4xl">
            AEC leaders on the Advisor AI Solutions Podcast · {getEpisodes().filter((e) => !e.placeholder).length} episodes
          </h2>
          <p className="mt-3 text-sm text-muted">Podcast guests, not clients.</p>
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {proofGuests.map((guest) => (
              <li key={guest.slug} className="bg-background">
                <a href={`/podcast/${guest.slug}`} className="block px-4 py-5 hover:bg-surface">
                  <span className="block font-serif text-xl">{guest.firm}</span>
                  <span className="mt-1 block text-sm text-muted">{guest.name} · Podcast guest</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 py-20 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">The problem</p>
            {/* The previous homepage cited "73% of B2B buyers…" with no source, and an average visibility score that is unconfirmed. Both are omitted until sourced. */}
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
              The firms winning work today aren&apos;t just the best builders. They&apos;re the most visible ones.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted lg:col-span-5 lg:pt-10">
            When a prospect asks AI where to find a structural engineer, a developer, or an architect, your firm either
            shows up or it doesn&apos;t. Most AEC firms are invisible to the tools their clients use to find vendors.
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl md:text-5xl">AEC firms with work worth talking about.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            We partner exclusively with sustainable construction, engineering, and green building firms that have proven
            project delivery and deep industry expertise. If you don&apos;t yet have happy clients, focus on fulfillment first.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item) => (
              <li key={item.title} className="border border-line bg-card p-5">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-surface" id="system">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8">
          <p className="eyebrow">The AI Growth System</p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl md:text-5xl">Four pillars. One pipeline.</h2>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
            {pillars.map((pillar) => (
              <article key={pillar.number} className="bg-surface p-6 md:p-8">
                <p className="font-mono text-sm text-gold">{pillar.number} — {pillar.name}</p>
                <h3 className="mt-3 font-serif text-3xl">{pillar.title}</h3>
                <p className="mt-3 text-muted">{pillar.body}</p>
              </article>
            ))}
          </div>
          <blockquote className="mt-10 max-w-3xl border-l-2 border-gold pl-5 font-serif text-2xl leading-snug md:text-3xl">
            You stay focused on the work you do best. The growth engine runs in the background.
          </blockquote>
          <a href="/services" className="mt-6 inline-block text-sm text-gold hover:text-gold-2">
            See the system in detail
          </a>
        </div>
      </section>

      <section className="border-t border-line" id="process">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">From map to partnership.</h2>
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {steps.map((step) => (
              <li key={step.number} className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline">
                <p className="font-mono text-sm text-gold md:col-span-1">{step.number}</p>
                <h3 className="font-serif text-2xl md:col-span-4">{step.title}</h3>
                <p className="text-muted md:col-span-5">{step.body}</p>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold md:col-span-2 md:text-right">
                  [PLACEHOLDER: duration]
                </p>
              </li>
            ))}
          </ol>
          <a href="/how-it-works" className="mt-6 inline-block text-sm text-gold">
            Read the full process
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-card">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8">
          {/* [CONFIRM: guarantee still offered] The .com site published a 15+ calls / 90 days promise. Copy here stays soft until Jordan confirms it is current. */}
          <p className="eyebrow">A note on the guarantee</p>
          <p className="mt-4 max-w-3xl font-serif text-2xl leading-snug md:text-3xl">
            An earlier version of this site described a target of 15 or more qualified project consultation calls in 90
            days, with work continuing at no added cost until that mark. Ask on the discovery call whether that
            guarantee is part of the current engagement.
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8">
          <p className="eyebrow">Engagement options</p>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">Start with a conversation. Scope comes after.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {engagements.map((offer) => (
              <article key={offer.name} className={`border p-6 ${offer.popular ? "border-gold bg-card" : "border-line"}`}>
                {offer.popular && <p className="eyebrow">Most popular</p>}
                <h3 className="mt-2 font-serif text-3xl">{offer.name}</h3>
                <p className="mt-2 font-mono text-sm uppercase tracking-[0.14em] text-gold">{offer.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{offer.body}</p>
                <a href={offer.href} className="mt-6 inline-block text-sm text-gold">
                  {offer.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-surface">
        <div className="pointer-events-none absolute -right-10 top-8 text-gold opacity-[0.08]" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="size-64">
            <path d="M32 5.5c1 0 1.9.5 2.4 1.4L57.2 50.2c1 1.8-.3 4-2.4 4H9.2c-2.1 0-3.4-2.2-2.4-4L29.6 6.9c.5-.9 1.4-1.4 2.4-1.4Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
          </svg>
        </div>
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-20 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Built by an operator</p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">Jordan Salvador</h2>
            <p className="mt-4 text-muted">
              Before this, nearly a decade in power engineering and another as an independent advisor. Systems first.
              Straight talk. AEC firms only.
            </p>
            <div className="mt-6 flex aspect-[4/5] max-w-xs items-end border border-dashed border-line p-4" role="img" aria-label="Placeholder for a portrait of Jordan Salvador">
              <p className="text-sm text-muted">[PLACEHOLDER: headshot of Jordan]</p>
            </div>
            <p className="mt-4 text-sm text-muted">
              [CONFIRM: founding year 2024 or 2025. The career timeline on the about page starts the company in 2025.
              An older organization record said 2024.]
            </p>
            <a href="/about" className="mt-4 inline-block text-sm text-gold">
              Jordan&apos;s full story
            </a>
          </div>
          <div className="lg:col-span-7">
            <ol className="space-y-6">
              {timeline.map((item) => (
                <li key={item.years} className="border-t border-line pt-5">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">{item.years}</p>
                  <h3 className="mt-1 font-serif text-2xl">{item.title}</h3>
                  <p className="text-sm text-muted">{item.place}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {principles.map((item) => (
                <li key={item.title}>
                  <h3 className="font-serif text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Podcast</p>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl">Latest conversations</h2>
            </div>
            <a href={site.youtubeSubscribe} className="text-sm text-gold">
              Subscribe on YouTube
            </a>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {episodes.map((episode) => (
              <li key={episode.slug}>
                <a href={`/podcast/${episode.slug}`} className="group block">
                  <div className="relative aspect-video border border-line bg-surface">
                    <Image src={episode.thumb} alt="" fill sizes="(max-width: 768px) 100vw, 280px" className="object-cover" />
                  </div>
                  <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold">Episode {episode.ep}</p>
                  <h3 className="mt-1 font-serif text-xl leading-snug group-hover:text-gold">{episode.title}</h3>
                  <p className="mt-2 text-sm text-muted">Podcast guest · {episode.guest}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">From the blog</p>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl">Notes from the work</h2>
            </div>
            <a href="/blog" className="text-sm text-gold">
              All articles
            </a>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="border border-line bg-background p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold">
                  {post.category} · {post.dateLabel}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug">
                  <a href={`/blog/${post.slug}`} className="hover:text-gold">
                    {post.title}
                  </a>
                </h3>
                <p className="mt-3 line-clamp-4 text-sm text-muted">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 mb-8 font-serif text-3xl md:text-5xl">Straight answers.</h2>
          <FaqList faqs={faqs} />
          <a href="/faq" className="mt-6 inline-block text-sm text-gold">
            All questions
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-card">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8">
          <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Your pipeline shouldn&apos;t depend on you being everywhere at once.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Book a 30-minute discovery call. We&apos;ll audit your current AI visibility, identify the biggest gaps, and
            map out what a 90-day growth system looks like for your firm.
          </p>
          <a href={site.calendly} className="mt-8 inline-flex min-h-12 items-center bg-gold px-5 text-sm font-medium text-background hover:bg-gold-2">
            Book your discovery call
          </a>
        </div>
      </section>
    </main>
  );
}
