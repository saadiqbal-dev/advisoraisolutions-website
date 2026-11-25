import { Logo } from "@/components/logo";
import { footerNav, nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <a href="/" className="inline-flex items-center gap-2.5 text-gold">
            <Logo className="size-8" />
            <span className="font-serif text-lg text-foreground">Advisor AI Solutions</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
          <p className="mt-6 font-serif text-lg italic text-gold/90">“{site.tagline}”</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a className="hover:text-gold" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            {footerNav.map((item) => (
              <li key={item.href}>
                <a className="hover:text-gold" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:text-gold" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-gold" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-gold" href={site.linkedin}>
                LinkedIn
              </a>
            </li>
            <li>
              <a className="hover:text-gold" href={site.youtube}>
                YouTube
              </a>
            </li>
            <li>
              <a className="hover:text-gold" href={site.instagram}>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-5 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Advisor AI Solutions.</p>
          <p>AEC firms only. Architecture, engineering, construction, and green building.</p>
        </div>
      </div>
    </footer>
  );
}
