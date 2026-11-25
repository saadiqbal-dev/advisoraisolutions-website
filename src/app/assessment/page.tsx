import { AssessmentForm } from "@/components/assessment-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { systems } from "@/lib/copy";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "AI Visibility Score",
  description:
    "A free self-assessment of AI visibility, lead flow, authority, follow-up, and CRM for AEC and green building firms.",
  path: "/assessment",
});

export default function AssessmentPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[860px] px-5 py-14 md:px-8 md:py-20">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "AI Visibility Score", path: "/assessment" }]} />
      <p className="eyebrow">Complimentary · AEC and green building</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
        Is your firm ready to turn AI into more qualified opportunities, not more noise?
      </h1>
      <p className="mt-5 text-lg text-muted">
        Rate five systems. You get a summary of your own scores, then a way to book the 30-minute working session.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {systems.map((system) => (
          <li key={system.id} className="border border-line p-4">
            <h2 className="font-serif text-xl">{system.name}</h2>
            <p className="mt-1 text-sm text-muted">{system.question}</p>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <AssessmentForm />
      </div>
      <noscript>
        <p className="mt-6 text-sm text-muted">
          This scorecard needs JavaScript for the steps. Email {site.email} and we will send the questions.
        </p>
      </noscript>
    </main>
  );
}
