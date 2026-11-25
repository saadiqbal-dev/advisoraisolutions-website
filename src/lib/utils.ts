import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseLooseDate(raw: string): { iso: string; label: string } {
  const label = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(label)) return { iso: label, label };
  if (/^\d{4}$/.test(label)) return { iso: `${label}-01-01`, label };
  const parsed = new Date(`${label} 00:00:00 UTC`);
  if (!Number.isNaN(parsed.getTime())) {
    return { iso: parsed.toISOString().slice(0, 10), label };
  }
  return { iso: "2025-01-01", label };
}
