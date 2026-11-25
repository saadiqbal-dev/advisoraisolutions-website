"use client";

import { useActionState, useEffect } from "react";
import { submitInquiry, type InquiryState } from "@/actions/inquiry";
import { firmTypes } from "@/lib/copy";

const initial: InquiryState | null = null;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-danger">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);

  useEffect(() => {
    if (state?.mailto) window.location.href = state.mailto;
  }, [state]);

  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="kind" value="contact" />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_fax">Fax</label>
        <input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!state?.errors?.name} aria-describedby={state?.errors?.name ? "name-error" : undefined} />
          <FieldError id="name-error" message={state?.errors?.name} />
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" autoComplete="organization" required aria-invalid={!!state?.errors?.company} aria-describedby={state?.errors?.company ? "company-error" : undefined} />
          <FieldError id="company-error" message={state?.errors?.company} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!state?.errors?.email} aria-describedby={state?.errors?.email ? "email-error" : undefined} />
          <FieldError id="email-error" message={state?.errors?.email} />
        </div>
        <div className="field">
          <label htmlFor="firmType">Firm type</label>
          <select id="firmType" name="firmType" defaultValue="Architecture" required>
            {firmTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">What do you want to talk through?</label>
        <textarea id="message" name="message" rows={5} required aria-invalid={!!state?.errors?.message} aria-describedby={state?.errors?.message ? "message-error" : undefined} />
        <FieldError id="message-error" message={state?.errors?.message} />
      </div>
      <button type="submit" className="inline-flex min-h-11 items-center bg-gold px-5 text-sm font-medium text-background hover:bg-gold-2" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
      <div aria-live="polite" className="text-sm text-muted">
        {state?.message}
        {state?.mailto && (
          <>
            {" "}
            <a className="text-gold underline" href={state.mailto}>
              Open the email
            </a>
          </>
        )}
      </div>
    </form>
  );
}
