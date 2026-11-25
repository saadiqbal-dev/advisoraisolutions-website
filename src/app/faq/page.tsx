import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { getFaqs, getUnconfirmedFaqs } from "@/lib/content";
import { faqJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "FAQ",
  description: "Straight answers on AI visibility, lead generation, the podcast method, and how an engagement with Advisor AI Solutions works.",
  path: "/faq",
});

export default function FaqPage() {
  const confirmed = getFaqs();
  const pending = getUnconfirmedFaqs();
  return (
    <main id="main" className="mx-auto w-full max-w-[860px] px-5 py-14 md:px-8 md:py-20">
      <JsonLd data={faqJsonLd(confirmed)} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <p className="eyebrow">FAQ</p>
      <h1 className="mt-3 font-serif text-4xl md:text-6xl">Answered straight.</h1>
      <p className="mt-5 text-lg text-muted">
        These answers are from the published insights page. Questions from the older site that had no answer text are
        marked.
      </p>
      <div className="mt-10">
        <FaqList faqs={confirmed} />
      </div>
      <h2 className="mt-16 font-serif text-3xl">Still waiting on an answer</h2>
      <div className="mt-6">
        <FaqList faqs={pending} />
      </div>
      <p className="mt-10 text-muted">
        A specific firm needs a specific conversation.{" "}
        <a className="text-gold" href={site.calendly}>
          Book a discovery call
        </a>
        .
      </p>
    </main>
  );
}
