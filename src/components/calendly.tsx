"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function CalendlyButton({ label = "Load the scheduling calendar" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="inline-flex min-h-11 items-center bg-gold px-5 text-sm font-medium tracking-wide text-background hover:bg-gold-2"
        aria-expanded={open}
        aria-controls="calendly-frame"
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      <a className="ml-4 text-sm text-gold hover:text-gold-2" href={site.calendly}>
        Open the calendar in a new tab
      </a>
      {open && (
        <iframe
          id="calendly-frame"
          title="Schedule a discovery call with Advisor AI Solutions"
          src={site.calendly}
          className="mt-6 h-[720px] w-full border border-line bg-surface"
        />
      )}
    </div>
  );
}
