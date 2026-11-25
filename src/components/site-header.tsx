"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070b16]/80 backdrop-blur-md">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="relative mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <a href="/" className="flex items-center gap-2.5 text-gold">
          <Logo className="size-8 shrink-0" />
          <span className="text-[1.05rem] font-semibold leading-none tracking-tight text-foreground">
            Advisor AI Solutions
          </span>
        </a>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-line text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex w-4 flex-col gap-1.5">
            <span className="h-px w-full bg-foreground" />
            <span className="h-px w-full bg-foreground" />
            <span className="h-px w-full bg-foreground" />
          </span>
        </button>
        <nav
          id="site-nav"
          aria-label="Primary"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b border-line bg-background px-5 py-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
        >
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`py-2 text-sm ${active ? "text-gold" : "text-foreground/90 hover:text-gold"}`}
              >
                {item.label}
              </a>
            );
          })}
          <Button asChild className="mt-2 md:mt-0 md:ml-2">
            <a href={site.calendly}>Book a Call</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
