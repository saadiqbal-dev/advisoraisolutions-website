"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { submitInquiry, type InquiryState } from "@/actions/inquiry";
import { CalendlyButton } from "@/components/calendly";
import { firmTypes, systems } from "@/lib/copy";

const initial: InquiryState | null = null;

export function AssessmentForm() {
  const [step, setStep] = useState(1);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [state, action, pending] = useActionState(submitInquiry, initial);

  useEffect(() => {
    if (state?.mailto) window.location.href = state.mailto;
  }, [state]);

  const summary = useMemo(() => {
    const scored = systems.map((system) => ({ ...system, score: ratings[system.id] ?? 0 }));
    const total = scored.reduce((sum, system) => sum + system.score, 0);
    const lowest = [...scored].sort((a, b) => a.score - b.score)[0];
    return { scored, total, average: total / systems.length, lowest };
  }, [ratings]);

  function nextFrom(current: number, form: HTMLFormElement) {
    const data = new FormData(form);
    if (current === 1) {
      const name = String(data.get("name") ?? "").trim();
      const company = String(data.get("company") ?? "").trim();
      if (name.length < 2 || !company) {
        setError("Add your name and company to continue.");
        return;
      }
    }
    if (current === 2) {
      const email = String(data.get("email") ?? "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Enter a valid work email to continue.");
        return;
      }
    }
    if (current === 3) {
      const missing = systems.some((system) => !ratings[system.id]);
      if (missing) {
        setError("Rate all five systems to see the summary.");
        return;
      }
    }
    setError("");
    setStep(current + 1);
  }

  const details = summary.scored.map((system) => `${system.name}: ${system.score}/5`).join("; ");

  return (
    <div>
      <p className="eyebrow">Step {step} of 4</p>
      <div className="mt-3 h-px w-full bg-line">
        <div className="h-px bg-gold" style={{ width: `${(step / 4) * 100}%` }} />
      </div>
      <form
        className="mt-8 space-y-6"
        action={step === 4 ? action : undefined}
        onSubmit={(event) => {
          if (step < 4) {
            event.preventDefault();
            nextFrom(step, event.currentTarget);
          }
        }}
      >
        <input type="hidden" name="kind" value="assessment" />
        <input type="hidden" name="details" value={step === 4 ? `Average ${summary.average.toFixed(1)} of 5. ${details}` : ""} />
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="company_fax">Fax</label>
          <input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={step === 1 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" autoComplete="name" required={step === 1} />
          </div>
          <div className="field">
            <label htmlFor="role">Role</label>
            <input id="role" name="role" autoComplete="organization-title" />
          </div>
          <div className="field">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" autoComplete="organization" required={step === 1} />
          </div>
          <div className="field">
            <label htmlFor="firmType">Firm type</label>
            <select id="firmType" name="firmType" defaultValue="Architecture">
              {firmTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={step === 2 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
          <div className="field sm:col-span-2">
            <label htmlFor="email">Work email</label>
            <input id="email" name="email" type="email" autoComplete="email" required={step === 2} />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="field">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="url" autoComplete="url" placeholder="https://" />
          </div>
        </div>

        <fieldset className={step === 3 ? "space-y-6" : "hidden"}>
          <legend className="font-serif text-2xl">Rate the five systems</legend>
          <p className="text-sm text-muted">1 is weak. 5 is strong. This is your own read, not an audit.</p>
          {systems.map((system) => (
            <fieldset key={system.id} className="border border-line p-4">
              <legend className="px-1 font-serif text-lg">{system.name}</legend>
              <p className="mb-3 text-sm text-muted">{system.question}</p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <label key={score} className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center border border-line px-3 has-[:checked]:border-gold has-[:checked]:bg-gold has-[:checked]:text-background">
                    <input
                      className="sr-only"
                      type="radio"
                      name={`rate-${system.id}`}
                      value={score}
                      checked={ratings[system.id] === score}
                      onChange={() => setRatings((current) => ({ ...current, [system.id]: score }))}
                    />
                    <span>{score}</span>
                    <span className="sr-only">
                      {system.name} score {score} of 5
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </fieldset>

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="font-serif text-3xl">Your self-assessment</h2>
            <p className="text-muted">
              Average {summary.average.toFixed(1)} of 5. The lowest score you gave is {summary.lowest.name}. That is a
              place to start the conversation, not a verdict.
            </p>
            <ul className="divide-y divide-line border-y border-line">
              {summary.scored.map((system) => (
                <li key={system.id} className="flex items-center justify-between py-3">
                  <span>{system.name}</span>
                  <span className="font-mono text-teal">{system.score} / 5</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">
              Send the summary so it is not lost, then book the 30-minute working session if you want it walked through.
            </p>
          </div>
        )}

        {error && (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          {step > 1 && step < 4 && (
            <button type="button" className="min-h-11 border border-line px-5 text-sm" onClick={() => setStep((value) => value - 1)}>
              Back
            </button>
          )}
          {step < 4 ? (
            <button type="submit" className="min-h-11 bg-gold px-5 text-sm font-medium text-background">
              Continue
            </button>
          ) : (
            <button type="submit" className="min-h-11 bg-gold px-5 text-sm font-medium text-background" disabled={pending}>
              {pending ? "Sending…" : "Email this summary"}
            </button>
          )}
        </div>
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
      {step === 4 && (
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="font-serif text-2xl">Book the working session</h3>
          <p className="mt-2 mb-5 text-sm text-muted">The calendar loads only after you ask for it.</p>
          <CalendlyButton label="Book a discovery call" />
        </div>
      )}
    </div>
  );
}
