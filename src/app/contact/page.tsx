import { CalendlyButton } from "@/components/calendly";
import { ContactForm } from "@/components/contact-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description: "Book a 30-minute discovery call or write Jordan Salvador at Advisor AI Solutions. AEC firms only.",
  path: "/contact",
});

const nextSteps = [
  "Jordan reviews your inquiry.",
  "We schedule a 30-minute discovery call.",
  "You receive a tailored view of the gaps.",
  "We walk through what a 90-day system would include.",
];

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <p className="eyebrow">Contact</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl md:text-6xl">Start with a straight conversation.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        30 minutes. No commitment. We look at your AI visibility and sketch what a 90-day growth system would be for
        your firm.
      </p>
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-serif text-2xl">Write to Jordan</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
        <aside className="lg:col-span-5">
          <h2 className="font-serif text-2xl">Direct</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a className="text-gold" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="text-gold" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="text-gold" href={site.linkedin}>
                LinkedIn
              </a>
            </li>
            <li>
              <a className="text-gold" href={site.youtube}>
                YouTube
              </a>
            </li>
          </ul>
          <h2 className="mt-10 font-serif text-2xl">What happens next</h2>
          <ol className="mt-4 space-y-3">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm text-muted">
                <span className="font-mono text-gold">0{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-serif text-3xl">Or book the call directly</h2>
        <p className="mt-2 mb-5 text-sm text-muted">The calendar stays unloaded until you ask for it.</p>
        <CalendlyButton />
      </section>
    </main>
  );
}
