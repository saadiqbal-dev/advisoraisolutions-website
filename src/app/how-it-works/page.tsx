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
      <ol className="mt-14 space-y-12">
        {steps.map((step) => (
          <li key={step.number} className="grid gap-4 border-t border-line pt-8 md:grid-cols-12">
            <p className="font-mono text-gold md:col-span-2">{step.number}</p>
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl md:text-4xl">{step.title}</h2>
              <p className="mt-4 text-muted">{step.body}</p>
            </div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold md:col-span-2">
              [PLACEHOLDER: duration]
            </p>
          </li>
        ))}
      </ol>
      <section className="mt-16 border border-line p-6 md:p-8">
        <h2 className="font-serif text-3xl">What you bring</h2>
        <p className="mt-4 max-w-2xl text-muted">
          A firm that already delivers work people are glad they bought. Access to the people who know the projects,
          the pipeline, and the buyers. We do not replace fulfillment.
        </p>
        <a href={site.calendly} className="mt-6 inline-flex min-h-11 items-center bg-gold px-5 text-sm font-medium text-background">
          Book a discovery call
        </a>
      </section>
    </main>
  );
}
