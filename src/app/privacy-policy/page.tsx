import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy",
  description: "How Advisor AI Solutions handles the details you send through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[760px] px-5 py-14 md:px-8 md:py-20">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy-policy" }]} />
      <p className="border-l-2 border-gold pl-4 text-sm text-muted">
        [PLACEHOLDER: legal review] This is a plain-language draft for this website. It is not a substitute for counsel.
      </p>
      <h1 className="mt-6 font-serif text-4xl md:text-5xl">Privacy</h1>
      <div className="mt-8 space-y-4 text-muted">
        <p>
          Advisor AI Solutions is run by {site.founder}. The contact address is {site.email}. The phone number is{" "}
          {site.phoneDisplay}.
        </p>
        <p>
          If you use the contact form or the AI Visibility Score, we receive the fields you submit: name, company,
          email, firm type, and whatever else you choose to include. If a form endpoint is configured, that submission
          is sent there. If it is not, your browser opens an email to {site.email} with the same details. We do not
          sell this information.
        </p>
        <p>
          Booking a call loads Calendly only after you ask for it. Calendly&apos;s own privacy terms apply once that
          page is open. YouTube videos load only after you press play, from youtube-nocookie.com.
        </p>
        <p>
          The site may use Vercel Analytics, which is intended to count visits without a marketing cookie banner. It
          does not run until the page loads the analytics script.
        </p>
        <p>To ask for a copy of what you sent, or to ask us to delete it, email {site.email}.</p>
      </div>
    </main>
  );
}
