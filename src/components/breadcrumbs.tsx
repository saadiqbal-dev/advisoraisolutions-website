import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/schema";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {last ? (
                  <span aria-current="page" className="text-gold">
                    {item.name}
                  </span>
                ) : (
                  <a className="hover:text-foreground" href={item.path}>
                    {item.name}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
