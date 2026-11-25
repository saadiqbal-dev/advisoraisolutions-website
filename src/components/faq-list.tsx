import type { Faq } from "@/lib/content";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.id} className="group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-serif text-xl leading-snug md:text-2xl">
            <span>{faq.question}</span>
            <span aria-hidden="true" className="mt-1 font-mono text-gold group-open:rotate-45">
              +
            </span>
          </summary>
          <div className={`max-w-3xl pb-6 leading-relaxed ${faq.placeholder ? "border-l-2 border-gold pl-4 text-sm text-muted" : "text-muted"}`}>
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
