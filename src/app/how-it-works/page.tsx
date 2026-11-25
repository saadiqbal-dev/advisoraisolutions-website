import { Breadcrumbs } from "@/components/breadcrumbs";
import { MediaRail } from "@/components/media-rail";
import { steps } from "@/lib/copy";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "How it works",
  description:
    "Five steps from market mapping to an ongoing partnership, built around how AEC firms actually win work.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]} />
      <p className="eyebrow">Process</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl md:text-6xl">A structured engagement. No theatre.</h1>
      <MediaRail />
      <p className="mt-6 max-w-2xl text-lg text-muted">
        A model built around how AEC companies win and deliver projects. Durations are not published yet.
      </p>
      <ol className="mt-14 grid gap-4">
        {steps.map((step) => (
          <li key={step.number} className="grid gap-4 rounded-3xl border border-line bg-card p-6 md:grid-cols-12 md:items-start">
            <p className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#C5A55A] font-mono text-sm font-bold text-[#060D1A] md:col-span-1">{step.number}</p>
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl md:text-4xl">{step.title}</h2>
              <p className="mt-3 text-muted">{step.body}</p>
            </div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold md:col-span-3 md:text-right">
              [PLACEHOLDER: duration]
            </p>
          </li>
        ))}
      </ol>
      <section className="mt-8 rounded-3xl border border-line bg-surface p-6 md:p-8">
        <h2 className="font-serif text-3xl">What you bring</h2>
        <p className="mt-4 max-w-2xl text-muted">
          A firm that already delivers work people are glad they bought. Access to the people who know the projects,
          the pipeline, and the buyers. We do not replace fulfillment.
        </p>
        <a href={site.calendly} className="btn-pop mt-6">
          Book a discovery call
        </a>
      </section>
    </main>
  );
}
