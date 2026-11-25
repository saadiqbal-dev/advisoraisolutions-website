import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { engagements, pillars, stack } from "@/lib/copy";
import { getFaqs } from "@/lib/content";
import { faqJsonLd, serviceJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Visibility, outreach, authority, and pipeline systems for architecture, engineering, construction, and green building firms.",
  path: "/services",
});

export default function ServicesPage() {
  const faqs = getFaqs().filter((faq) => [1, 5, 10, 12].includes(faq.id));
  return (
    <main id="main" className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <JsonLd data={serviceJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <p className="eyebrow">The AI Growth System</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
        More qualified opportunities. Less manual work. A pipeline that runs without you.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Four pillars, named once and mapped to the work they actually contain. Built only for architecture, engineering,
        construction, and green building firms.
      </p>

      <div className="mt-16 space-y-16">
        {pillars.map((pillar) => (
          <article key={pillar.number} className="grid gap-6 border-t border-line pt-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-sm text-gold">{pillar.number} — {pillar.name}</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">{pillar.title}</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-muted">{pillar.body}</p>
              <ul className="mt-5 space-y-2">
                {pillar.items.map((item) => (
                  <li key={item} className="border-b border-line py-2 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <p className="eyebrow">Stack</p>
        <h2 className="mt-3 font-serif text-3xl">Tools, named plainly.</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {stack.map((tool) => (
            <li key={tool} className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {tool}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <p className="eyebrow">Engagement options</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {engagements.map((offer) => (
            <article key={offer.name} className={`border p-6 ${offer.popular ? "border-gold" : "border-line"}`}>
              {offer.popular && <p className="eyebrow">Most popular</p>}
              <h2 className="mt-2 font-serif text-3xl">{offer.name}</h2>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.14em] text-gold">{offer.price}</p>
              <p className="mt-4 text-sm text-muted">{offer.body}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {offer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={offer.href} className="mt-6 inline-block text-sm text-gold">
                {offer.cta}
              </a>
            </article>
          ))}
        </div>
        {/* [CONFIRM] .com published "$3,500 setup + $2,800/month, plus 10% commission". Not shown until confirmed. */}
      </section>

      <section className="mt-16 border border-line bg-card p-6 md:p-10">
        {/* [CONFIRM: guarantee still offered] */}
        <h2 className="font-serif text-3xl">About the 90-day target</h2>
        <p className="mt-4 max-w-3xl text-muted">
          The previous .com site described a target of 15 or more qualified project consultation calls in 90 days, with
          continued work at no added cost until that mark. Treat that as a question for the discovery call, not a
          published promise, until it is confirmed.
        </p>
        <a href={site.calendly} className="mt-6 inline-flex min-h-11 items-center bg-gold px-5 text-sm font-medium text-background">
          Book a discovery call
        </a>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 font-serif text-3xl">Questions</h2>
        <FaqList faqs={faqs} />
      </section>
    </main>
  );
}
