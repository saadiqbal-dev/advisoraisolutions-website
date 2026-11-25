import { Breadcrumbs } from "@/components/breadcrumbs";
import { MediaRail } from "@/components/media-rail";
import { JsonLd } from "@/components/json-ld";
import { principles, timeline } from "@/lib/copy";
import { personJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About",
  description:
    "Jordan Salvador spent a decade in power engineering and a decade as an advisor. Advisor AI Solutions builds AI growth systems only for AEC firms.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <JsonLd data={personJsonLd()} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <p className="eyebrow">About Jordan</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
        Operator-built AI systems for the firms that actually build things.
      </h1>
      <MediaRail />
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-lg text-muted">
            I&apos;m Jordan Salvador, founder of Advisor AI Solutions. Before this, I spent nearly a decade in power
            engineering and another decade as an independent advisor, so I think in systems and I talk straight. No
            agency polish, no buzzwords you have to decode.
          </p>
          <p className="mt-4 text-lg text-muted">
            We work exclusively with architecture, engineering, construction, and green building firms. That focus
            matters: the firms winning work today aren&apos;t just the best builders, they&apos;re the most visible ones. When
            a prospect asks AI where to find a structural engineer, a developer, or an architect, your firm either
            shows up or it doesn&apos;t.
          </p>
          <p className="mt-4 text-lg text-muted">
            We make sure you show up, and we build the systems behind it so opportunities don&apos;t slip through the cracks.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="flex aspect-[4/5] items-end border border-dashed border-line p-4" role="img" aria-label="Placeholder for a portrait of Jordan Salvador">
            <p className="text-sm text-muted">[PLACEHOLDER: headshot of Jordan]</p>
          </div>
          <p className="mt-4 text-sm text-muted">
            [CONFIRM: founding year 2024 or 2025. This timeline follows the about page, which starts the company in
            2025. An organization record on the previous site said 2024.]
          </p>
        </div>
      </div>
      <ol className="mt-16 grid gap-6 md:grid-cols-3">
        {timeline.map((item) => (
          <li key={item.years} className="border-t border-line pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">{item.years}</p>
            <h2 className="mt-2 font-serif text-2xl">{item.title}</h2>
            <p className="text-sm text-gold">{item.place}</p>
            <p className="mt-3 text-sm text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
      <section className="mt-16">
        <h2 className="font-serif text-3xl md:text-4xl">How we operate</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {principles.map((item) => (
            <li key={item.title} className="border border-line p-5">
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="mt-2 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <a href={site.calendly} className="mt-12 inline-flex min-h-11 items-center bg-gold px-5 text-sm font-medium text-background">
        Book a discovery call
      </a>
    </main>
  );
}
