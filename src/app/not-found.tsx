import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not on Advisor AI Solutions.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[60vh] w-full max-w-[720px] flex-col justify-center px-5 py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-5xl">This page is not here.</h1>
      <p className="mt-4 text-muted">The address does not match a page on this site.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="/" className="inline-flex min-h-11 items-center bg-gold px-5 text-sm font-medium text-background">
          Back home
        </a>
        <a href="/contact" className="inline-flex min-h-11 items-center border border-line px-5 text-sm">
          Contact
        </a>
      </div>
    </main>
  );
}
