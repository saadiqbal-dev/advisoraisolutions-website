import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Terms",
  description: "Terms for using the Advisor AI Solutions website. Engagement terms are agreed separately.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[760px] px-5 py-14 md:px-8 md:py-20">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]} />
      <p className="border-l-2 border-gold pl-4 text-sm text-muted">
        [PLACEHOLDER: legal review] This draft covers the website. A paid engagement is agreed in writing, not by using
        these pages.
      </p>
      <h1 className="mt-6 font-serif text-4xl md:text-5xl">Terms</h1>
      <div className="mt-8 space-y-4 text-muted">
        <p>
          This website describes services from Advisor AI Solutions for architecture, engineering, construction, and
          green building firms. Reading it, booking a call, or sending a form does not create a client relationship.
        </p>
        <p>
          Prices are not listed. An older page mentioned setup, monthly, and commission figures. Those figures are not
          an offer. Scope, fees, and any guarantee are whatever is confirmed on a call and in a written agreement.
        </p>
        <p>
          Podcast guests are guests. Their names and firms appear because they were interviewed. That is not a
          testimonial, a client logo, or a claim about results.
        </p>
        <p>
          The AI answer card on the homepage is labelled illustrative. It is not a live model output and not a ranking.
        </p>
        <p>Questions about these terms: {site.email}.</p>
      </div>
    </main>
  );
}
