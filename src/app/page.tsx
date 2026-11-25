import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { Parallax } from "@/components/parallax";
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

const tones = [
  "border border-line bg-card text-foreground",
  "bg-[#C5A55A] text-[#060D1A]",
  "border border-line bg-card text-foreground",
  "bg-[#C5A55A] text-[#060D1A]",
  "border border-line bg-card text-foreground",
  "bg-[#C5A55A] text-[#060D1A]",
];

function AnswerCard() {
  return (
    <figure className="tile rounded-3xl bg-[#141B30] p-5 text-left" aria-label="Illustrative AI answer. Not a live result.">
      <figcaption className="eyebrow">Illustrative · not a live answer</figcaption>
      <p className="mt-4 text-2xl font-bold leading-tight tracking-tight">Who are the best structural engineers in Denver?</p>
      <ol className="mt-5 space-y-3 text-sm">
        <li className="flex items-center justify-between border-b border-white/10 pb-3 text-muted">
          <span>01 · A firm the model cites</span>
          <span className="font-mono text-xs uppercase tracking-widest text-teal">Cited</span>
        </li>
        <li className="flex items-center justify-between border-b border-white/10 pb-3 text-muted">
          <span>02 · Another cited firm</span>
          <span className="font-mono text-xs uppercase tracking-widest text-teal">Cited</span>
        </li>
        <li className="rounded-2xl bg-[#C5A55A] px-4 py-4 text-[#060D1A]">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em]">03</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">Your firm?</p>
          <p className="text-sm">Not cited yet.</p>
        </li>
      </ol>
    </figure>
  );
}

export default function HomePage() {
  const episodes = getEpisodes().filter((episode) => !episode.placeholder).slice(0, 4);
  const posts = getPosts().filter((post) => post.source === "published").slice(0, 3);
  const faqs = [
    getFaqs().find((faq) => faq.id === 1)!,
    getFaqs().find((faq) => faq.id === 8)!,
    ...getUnconfirmedFaqs(),
  ];
  const episodeCount = getEpisodes().filter((episode) => !episode.placeholder).length;

  return (
    <main id="main">
      <JsonLd data={faqJsonLd(faqs.filter((faq) => !faq.placeholder))} />

      <section className="hero-stage relative overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl text-center lg:py-16">
            <p className="eyebrow">AEC-exclusive AI growth systems</p>
            <h1 className="mt-4 text-[2.6rem] font-bold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[4.4rem]">
              Your prospects are asking AI where to find you. Do you show up?
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#d5dbe3]">
              Operator-built AI growth systems for architecture, engineering, construction and green building firms.
              Get found by AI search, fill your calendar with qualified conversations, and run your pipeline from one
              system.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={site.calendly} className="btn-pop w-full sm:w-auto">
                Book a 30-min Discovery Call
              </a>
              <a href="/assessment" className="btn-ghost w-full sm:w-auto">
                Get your free AI Visibility Score
              </a>
            </div>
            <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              No commitment · 30 minutes · AEC firms only
            </p>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 lg:hidden">
            <div className="tile tile-hover relative aspect-[4/3] bg-[#C5A55A] p-1.5">
              <Image src="/visuals/ai-search.webp" alt="Illustrative AI answer showing the firm is not cited yet" fill sizes="50vw" className="rounded-[0.9rem] object-cover" />
            </div>
            <div className="tile tile-hover relative aspect-[4/3]">
              <Image src="/visuals/microphone.webp" alt="Studio microphone, standing in for the podcast" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="tile tile-hover relative col-span-2 aspect-[16/9]">
              <Image src="/visuals/calendar.webp" alt="Illustrative calendar with discovery calls booked" fill sizes="100vw" className="object-cover" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <Parallax speed={-0.04} className="absolute left-0 top-10 w-56">
              <div className="tile float relative -rotate-3 border-4 border-[#C5A55A] bg-[#060D1A]">
                <Image src="/visuals/ai-search.webp" alt="" width={448} height={280} sizes="224px" className="h-36 w-56 object-contain" />
              </div>
            </Parallax>
            <Parallax speed={0.05} className="absolute right-0 top-2 w-64">
              <div className="tile float-slow relative rotate-2 border-4 border-[#C5A55A]">
                <Image src="/visuals/calendar.webp" alt="" width={256} height={176} sizes="256px" className="h-44 w-64 object-cover" />
              </div>
            </Parallax>
            <Parallax speed={0.03} className="absolute bottom-8 left-2 w-40">
              <div className="tile float relative">
                <Image src="/visuals/microphone.webp" alt="" width={160} height={160} sizes="160px" className="h-40 w-40 object-cover" />
              </div>
            </Parallax>
            <Parallax speed={-0.03} className="absolute bottom-12 right-6 w-52">
              <div className="tile float-slow relative rotate-2 border-4 border-[#C5A55A]">
                <Image src="/visuals/waveform.webp" alt="" width={208} height={144} sizes="208px" className="h-36 w-52 object-cover" />
              </div>
            </Parallax>
          </div>
        </div>
        <div className="relative z-10 mx-auto hidden w-full max-w-md px-8 pb-16 lg:block">
          <AnswerCard />
        </div>
      </section>

      <section className="border-t border-line bg-surface" aria-labelledby="guests-heading">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 py-14 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">In conversation with</p>
            <h2 id="guests-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              AEC leaders on the Advisor AI Solutions Podcast · {episodeCount} episodes
            </h2>
            <p className="mt-3 text-sm text-muted">Podcast guests, not clients.</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:col-span-8 lg:grid-cols-4">
            {proofGuests.map((guest) => (
              <li key={guest.slug}>
                <a href={`/podcast/${guest.slug}`} className="tile-hover block rounded-2xl border border-line bg-card px-4 py-4 hover:border-[#C5A55A]">
                  <span className="block text-lg font-bold tracking-tight">{guest.firm}</span>
                  <span className="mt-1 block text-sm text-muted">{guest.name} · Podcast guest</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 py-16 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">The problem</p>
            {/* The previous homepage cited "73% of B2B buyers…" with no source, and an average visibility score that is unconfirmed. Both are omitted until sourced. */}
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              The firms winning work today aren&apos;t just the best builders. They&apos;re the most visible ones.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              When a prospect asks AI where to find a structural engineer, a developer, or an architect, your firm either
              shows up or it doesn&apos;t. Most AEC firms are invisible to the tools their clients use to find vendors.
            </p>
          </div>
          <div className="tile tile-hover relative aspect-[4/3] border-4 border-[#C5A55A] lg:col-span-6">
            <Image src="/visuals/ai-search.webp" alt="Illustrative AI answer. Not a live result." fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">AEC firms with work worth talking about.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            We partner exclusively with sustainable construction, engineering, and green building firms that have proven
            project delivery and deep industry expertise. If you don&apos;t yet have happy clients, focus on fulfillment first.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item, index) => (
              <li key={item.title} className={`tile tile-hover p-5 ${tones[index]}`}>
                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-black/10" aria-hidden="true">
                  <span className="font-mono text-sm font-bold">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-90">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#0d1324]" id="system">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8">
          <p className="eyebrow">The AI Growth System</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">Four pillars. One pipeline.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {pillars.map((pillar) => (
              <article key={pillar.number} className="tile tile-hover grid gap-4 bg-[#141B30] p-5 sm:grid-cols-5">
                <div className="sm:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#C5A55A]">{pillar.number} — {pillar.name}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </div>
                <div className="sm:col-span-2">
                  {pillar.number === "01" && (
                    <div className="rounded-2xl bg-[#060D1A] p-3 text-xs" aria-hidden="true">
                      <p className="text-muted">AI answer</p>
                      <p className="mt-2 font-bold">Your firm</p>
                      <p className="mt-1 text-teal">Cited in the reply</p>
                    </div>
                  )}
                  {pillar.number === "02" && (
                    <div className="relative aspect-square overflow-hidden rounded-2xl">
                      <Image src="/visuals/inbox.webp" alt="" fill sizes="240px" className="object-cover" />
                    </div>
                  )}
                  {pillar.number === "03" && (
                    <div className="relative aspect-square overflow-hidden rounded-2xl">
                      <Image src="/visuals/microphone.webp" alt="" fill sizes="200px" className="object-cover" />
                    </div>
                  )}
                  {pillar.number === "04" && (
                    <div className="flex h-full items-end gap-2 rounded-2xl bg-[#060D1A] p-3" aria-hidden="true">
                      {[40, 65, 48, 80, 92].map((height) => (
                        <span key={height} className="flex-1 rounded-t bg-[#C5A55A]" style={{ height }} />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <blockquote className="mt-10 max-w-3xl text-2xl font-bold leading-snug tracking-tight md:text-3xl">
            You stay focused on the work you do best. The growth engine runs in the background.
          </blockquote>
          <a href="/services" className="mt-6 inline-block text-sm font-semibold text-[#C5A55A]">
            See the system in detail
          </a>
        </div>
      </section>

      <section id="process">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">How it works</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">From map to partnership.</h2>
            </div>
            <div className="tile relative aspect-[4/3] lg:col-span-5">
              <Image src="/visuals/workflow.webp" alt="Illustrative automation workflow" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" />
            </div>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {steps.map((step) => (
              <li key={step.number} className="tile tile-hover flex flex-col bg-[#141B30] p-4">
                <p className="font-mono text-sm text-[#C5A55A]">{step.number}</p>
                <h3 className="mt-3 text-lg font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{step.body}</p>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#C5A55A]">
                  [PLACEHOLDER: duration]
                </p>
              </li>
            ))}
          </ol>
          <a href="/how-it-works" className="mt-6 inline-block text-sm font-semibold text-[#C5A55A]">
            Read the full process
          </a>
        </div>
      </section>

      <section className="bg-[#C5A55A] text-[#060D1A]">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 py-14 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* [CONFIRM: guarantee still offered] The .com site published a 15+ calls / 90 days promise. Copy here stays soft until Jordan confirms it is current. */}
            <p className="font-mono text-xs uppercase tracking-[0.16em]">A note on the guarantee</p>
            <p className="mt-4 text-2xl font-bold leading-snug tracking-tight text-[#060D1A] md:text-3xl">
              An earlier version of this site described a target of 15 or more qualified project consultation calls in 90
              days, with work continuing at no added cost until that mark. Ask on the discovery call whether that
              guarantee is part of the current engagement.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl lg:col-span-4">
            <Image src="/visuals/waveform.webp" alt="" fill sizes="320px" className="object-cover" />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8">
          <p className="eyebrow">Engagement options</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Start with a conversation. Scope comes after.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {engagements.map((offer) => (
              <article
                key={offer.name}
                className={`tile tile-hover p-6 ${offer.popular ? "bg-[#C5A55A] text-[#060D1A]" : "bg-[#141B30]"}`}
              >
                {offer.popular && <p className="font-mono text-xs uppercase tracking-[0.16em]">Most popular</p>}
                <h3 className={`mt-2 text-3xl font-bold tracking-tight ${offer.popular ? "text-[#060D1A]" : ""}`}>{offer.name}</h3>
                <p className={`mt-2 font-mono text-sm uppercase tracking-[0.14em] ${offer.popular ? "text-[#060D1A]" : "text-[#C5A55A]"}`}>
                  {offer.price}
                </p>
                <p className={`mt-4 text-sm leading-relaxed ${offer.popular ? "text-[#060D1A]/80" : "text-muted"}`}>{offer.body}</p>
                <a href={offer.href} className={`mt-6 inline-block text-sm font-bold ${offer.popular ? "text-[#060D1A]" : "text-[#C5A55A]"}`}>
                  {offer.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d1324]">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-16 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Built by an operator</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Jordan Salvador</h2>
            <p className="mt-4 text-muted">
              Before this, nearly a decade in power engineering and another as an independent advisor. Systems first.
              Straight talk. AEC firms only.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image src="/visuals/dashboard.webp" alt="Illustrative pipeline dashboard, not reported results" fill sizes="240px" className="object-cover" />
              </div>
              <div className="flex aspect-[4/5] items-end rounded-3xl border border-dashed border-white/30 p-4" role="img" aria-label="Placeholder for a portrait of Jordan Salvador">
                <p className="text-sm text-muted">[PLACEHOLDER: headshot of Jordan]</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              [CONFIRM: founding year 2024 or 2025. The career timeline on the about page starts the company in 2025.
              An older organization record said 2024.]
            </p>
            <a href="/about" className="mt-4 inline-block text-sm font-semibold text-[#C5A55A]">
              Jordan&apos;s full story
            </a>
          </div>
          <div className="lg:col-span-7">
            <ol className="space-y-4">
              {timeline.map((item) => (
                <li key={item.years} className="rounded-2xl border border-white/10 bg-[#141B30] p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#C5A55A]">{item.years}</p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted">{item.place}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {principles.map((item) => (
                <li key={item.title} className="rounded-2xl bg-[#C5A55A] p-4 text-[#060D1A]">
                  <h3 className="text-xl font-bold tracking-tight text-[#060D1A]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#060D1A]/80">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Podcast</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Latest conversations</h2>
            </div>
            <a href={site.youtubeSubscribe} className="text-sm font-semibold text-[#C5A55A]">
              Subscribe on YouTube
            </a>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {episodes.map((episode) => (
              <li key={episode.slug}>
                <a href={`/podcast/${episode.slug}`} className="tile tile-hover group block bg-[#141B30]">
                  <div className="relative aspect-video">
                    <Image src={episode.thumb} alt="" fill sizes="(max-width: 768px) 100vw, 280px" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#C5A55A]">Episode {episode.ep}</p>
                    <h3 className="mt-1 text-xl font-bold leading-snug tracking-tight group-hover:text-[#C5A55A]">{episode.title}</h3>
                    <p className="mt-2 text-sm text-muted">Podcast guest · {episode.guest}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#0d1324]">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">From the blog</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Notes from the work</h2>
            </div>
            <a href="/blog" className="text-sm font-semibold text-[#C5A55A]">
              All articles
            </a>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {posts.map((post, index) => (
              <li key={post.slug} className={`tile tile-hover p-5 ${index === 0 ? "bg-[#C5A55A] text-[#060D1A]" : "bg-[#141B30]"}`}>
                <p className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] ${index === 0 ? "text-[#060D1A]" : "text-[#C5A55A]"}`}>
                  {post.category} · {post.dateLabel}
                </p>
                <h3 className={`mt-3 text-2xl font-bold leading-snug tracking-tight ${index === 0 ? "text-[#060D1A]" : ""}`}>
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className={`mt-3 line-clamp-4 text-sm ${index === 0 ? "text-[#060D1A]/80" : "text-muted"}`}>{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 py-16 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Straight answers.</h2>
            <div className="tile relative mt-6 hidden aspect-square lg:block">
              <Image src="/visuals/player.webp" alt="" fill sizes="320px" className="object-cover" />
            </div>
            <a href="/faq" className="mt-6 inline-block text-sm font-semibold text-[#C5A55A]">
              All questions
            </a>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#141B30]">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 py-20 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Your pipeline shouldn&apos;t depend on you being everywhere at once.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Book a 30-minute discovery call. We&apos;ll audit your current AI visibility, identify the biggest gaps, and
              map out what a 90-day growth system looks like for your firm.
            </p>
            <a href={site.calendly} className="btn-pop mt-8">
              Book your discovery call
            </a>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl lg:col-span-4">
            <Image src="/visuals/inbox.webp" alt="" fill sizes="360px" className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
