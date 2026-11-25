export const site = {
  name: "Advisor AI Solutions",
  shortName: "AAIS",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://advisoraisolutions.io",
  description:
    "Operator-built AI growth systems for architecture, engineering, construction, and green building firms.",
  email: "jordan@advisoraisolutions.com",
  phoneDisplay: "+1 (403) 585-6036",
  phoneTel: "+14035856036",
  calendly: "https://calendly.com/advisoraisolutions/intro",
  youtube: "https://www.youtube.com/@advisoraisolutions",
  youtubeSubscribe: "https://www.youtube.com/@advisoraisolutions?sub_confirmation=1",
  linkedin: "https://www.linkedin.com/in/jordansalvador",
  linkedinCompany: "https://www.linkedin.com/company/advisor-ai-solutions",
  instagram: "https://www.instagram.com/advisorai.solutions/",
  founder: "Jordan Salvador",
  tagline: "Automate the ordinary. Scale the extraordinary.",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/podcast", label: "Podcast" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  { href: "/faq", label: "FAQ" },
  { href: "/assessment", label: "AI Visibility Score" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function clip(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}
