import articlesJson from "@/content/articles.json";
import episodesJson from "@/content/episodes.json";
import faqsJson from "@/content/faqs.json";
import { parseLooseDate } from "@/lib/utils";

export type Faq = {
  id: number;
  question: string;
  answer: string;
  category: string;
  placeholder?: boolean;
};

type RawEpisode = {
  ep: number;
  title: string;
  slug: string;
  videoId: string;
  youtubeUrl: string;
  thumbnail: string;
  guest: string;
  guestRole: string;
  tags: string[];
  tag: string;
  date: string;
  description: string;
  keyTopics: string[];
  takeaways: string[];
  featured?: boolean;
};

type RawArticle = {
  id: number;
  title: string;
  slug: string;
  category: string;
  tag: string;
  date: string;
  readTime?: string;
  linkedinUrl?: string;
  excerpt?: string;
  keyTopics?: string[];
  body?: string[];
};

export type Episode = RawEpisode & {
  isoDate: string;
  placeholder: boolean;
  thumb: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  isoDate: string;
  readTime?: string;
  linkedinUrl?: string;
  keyTopics: string[];
  body: string[];
  /** published = full body, excerpt = lede only, missing = sitemap URL with no source text */
  source: "published" | "excerpt" | "missing";
};

const PLACEHOLDER_NOTE =
  "[PLACEHOLDER: this URL is on the live site, but the full text was not in the published source. Nothing below was written to fill the gap.]";

const MISSING_POSTS: Array<{ slug: string; title: string; iso: string; category: string }> = [
  {
    slug: "why-visibility-ai-search-new-seo-aec-firms",
    title: "Why Visibility in AI Search Is the New SEO for AEC Firms",
    iso: "2026-06-01",
    category: "AI Visibility",
  },
  {
    slug: "podcast-led-gtm-strategy-converts-guests-clients",
    title: "Podcast-Led GTM Strategy",
    iso: "2026-05-15",
    category: "Strategy",
  },
  {
    slug: "how-to-build-ai-sdr-books-meetings-while-you-sleep",
    title: "How to Build an AI SDR That Books Meetings",
    iso: "2026-05-01",
    category: "Automation",
  },
  {
    slug: "gohighlevel-aec-complete-setup-guide-2026",
    title: "GoHighLevel for AEC Firms: Setup Guide",
    iso: "2026-04-15",
    category: "CRM",
  },
  {
    slug: "four-pillar-ai-growth-framework-construction-firms",
    title: "The Four-Pillar AI Growth Framework for Construction Firms",
    iso: "2026-04-01",
    category: "Strategy",
  },
  {
    slug: "zero-to-aec-authority-linkedin-90-days",
    title: "Zero to AEC Authority on LinkedIn",
    iso: "2026-03-15",
    category: "Authority",
  },
  {
    slug: "7-ai-tools-every-aec-business-owner-should-use-2026",
    title: "7 AI Tools Every AEC Business Owner Should Use",
    iso: "2026-03-01",
    category: "Tools",
  },
  {
    slug: "discovery-call-framework-closes-aec-deals",
    title: "A Discovery Call Framework for AEC Firms",
    iso: "2026-02-15",
    category: "Sales",
  },
  {
    slug: "what-is-aeo-why-it-matters-more-than-seo-2026",
    title: "What Is AEO, and Why It Matters More Than SEO",
    iso: "2026-02-01",
    category: "AI Visibility",
  },
];

const MISSING_EPISODES: Array<{ slug: string; title: string; iso: string }> = [
  {
    slug: "the-energy-incentive-playbook-for-developers",
    title: "The Energy Incentive Playbook for Developers",
    iso: "2026-06-14",
  },
  {
    slug: "is-ai-really-the-future-of-engineering-systems-thinking-and-the-limits-of-llms",
    title: "Is AI Really the Future of Engineering? Systems Thinking and the Limits of LLMs",
    iso: "2026-04-19",
  },
  {
    slug: "the-real-reason-contractors-struggle-to-scale",
    title: "The Real Reason Contractors Struggle to Scale",
    iso: "2026-04-19",
  },
  {
    slug: "prioritizing-systems-for-rapid-growth-in-a-company",
    title: "Prioritizing Systems for Rapid Growth",
    iso: "2026-03-20",
  },
];

function thumbFor(videoId: string) {
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";
}

function topicBlob(ep: Pick<Episode, "title" | "tag" | "tags" | "keyTopics">) {
  return [ep.title, ep.tag, ...ep.tags, ...ep.keyTopics].join(" ").toLowerCase();
}

export function episodeTopics(ep: Pick<Episode, "title" | "tag" | "tags" | "keyTopics">) {
  const blob = topicBlob(ep);
  const topics: string[] = [];
  if (blob.includes("architect")) topics.push("Architecture");
  if (blob.includes("engineer")) topics.push("Engineering");
  if (blob.includes("modular") || blob.includes("prefab")) topics.push("Modular");
  if (blob.includes("energy") || blob.includes("solar") || blob.includes("biogas")) topics.push("Energy");
  if (blob.includes("housing") || blob.includes("residential")) topics.push("Housing");
  if (/\bai\b/.test(blob) || blob.includes("automation")) topics.push("AI");
  return topics;
}

const publishedEpisodes: Episode[] = (episodesJson as RawEpisode[]).map((ep) => {
  const { iso } = parseLooseDate(ep.date);
  return {
    ...ep,
    tags: ep.tags ?? [],
    keyTopics: ep.keyTopics ?? [],
    takeaways: ep.takeaways ?? [],
    guest: ep.guest ?? "",
    guestRole: ep.guestRole ?? "",
    description: ep.description ?? "",
    isoDate: iso,
    placeholder: false,
    thumb: thumbFor(ep.videoId),
  };
});

const placeholderEpisodes: Episode[] = MISSING_EPISODES.map((ep) => ({
  ep: 0,
  title: ep.title,
  slug: ep.slug,
  videoId: "",
  youtubeUrl: "",
  thumbnail: "",
  guest: "",
  guestRole: "",
  tags: [],
  tag: "Unconfirmed",
  date: ep.iso,
  description: PLACEHOLDER_NOTE,
  keyTopics: [],
  takeaways: [],
  featured: false,
  isoDate: ep.iso,
  placeholder: true,
  thumb: "",
}));

const episodes: Episode[] = [...publishedEpisodes, ...placeholderEpisodes].sort((a, b) => {
  if (a.placeholder !== b.placeholder) return a.placeholder ? 1 : -1;
  if (b.ep !== a.ep) return b.ep - a.ep;
  return b.isoDate.localeCompare(a.isoDate);
});

const publishedPosts: Post[] = (articlesJson as RawArticle[]).map((article) => {
  const { iso, label } = parseLooseDate(article.date);
  const body = (article.body ?? []).map((p) => p.trim()).filter(Boolean);
  const linkedin =
    article.linkedinUrl && article.linkedinUrl.startsWith("https://") ? article.linkedinUrl : undefined;
  return {
    slug: article.slug,
    title: article.title,
    excerpt: (article.excerpt ?? "").trim(),
    category: article.category || article.tag || "Notes",
    dateLabel: label,
    isoDate: iso,
    readTime: article.readTime,
    linkedinUrl: linkedin,
    keyTopics: article.keyTopics ?? [],
    body,
    source: body.length > 0 ? "published" : "excerpt",
  };
});

const missingPosts: Post[] = MISSING_POSTS.map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: "",
  category: post.category,
  dateLabel: post.iso,
  isoDate: post.iso,
  keyTopics: [],
  body: [],
  source: "missing",
}));

const posts: Post[] = [...publishedPosts, ...missingPosts].sort((a, b) =>
  b.isoDate.localeCompare(a.isoDate),
);

export function getEpisodes() {
  return episodes;
}

export function getEpisode(slug: string) {
  return episodes.find((ep) => ep.slug === slug);
}

export function getPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getFaqs(): Faq[] {
  return faqsJson as Faq[];
}

/** Questions from advisoraisolutions.com whose answers were not in the HTML. */
export function getUnconfirmedFaqs(): Faq[] {
  return [
    {
      id: 101,
      question: 'What makes an opportunity "qualified"?',
      answer:
        "[PLACEHOLDER: this question is on the previous site. The answer text was not in the published HTML.]",
      category: "Engagement",
      placeholder: true,
    },
    {
      id: 102,
      question: "What's required from me during onboarding?",
      answer:
        "[PLACEHOLDER: this question is on the previous site. The answer text was not in the published HTML.]",
      category: "Engagement",
      placeholder: true,
    },
    {
      id: 103,
      question: "How does the commission structure work?",
      answer:
        "[PLACEHOLDER: the previous .com page listed a commission on closed project contracts. The explanation, and whether that structure is current, was not published as answer text. Dollar amounts are intentionally not shown.]",
      category: "Engagement",
      placeholder: true,
    },
    {
      id: 104,
      question: "Can I pause or end the partnership?",
      answer:
        "[PLACEHOLDER: this question is on the previous site. The answer text was not in the published HTML.]",
      category: "Engagement",
      placeholder: true,
    },
  ];
}

export const proofGuests = [
  { name: "Marvin DeJong", firm: "DDA Architecture", slug: "if-you-can-see-a-toilet-from-your-kitchen-island-thats-a-fail" },
  { name: "Anthony Dente", firm: "Verdant Structural Engineering", slug: "how-verdant-structural-engineering-builds-greener-smarter-buildings" },
  { name: "TJ Hammerstrom", firm: "Hopewell360", slug: "the-45m-revolution-in-modular-construction-how-hopewell360-is-building-smarter-greener-homes" },
  { name: "Andy Whaley", firm: "Essayons Engineers", slug: "how-essayons-engineers-scales-surveying-engineering-boundary-surveys-land-development-and-growth" },
  { name: "Brent Constantz", firm: "Blue Planet Systems", slug: "blue-planet-systems-turning-co2-into-net-zero-concrete" },
  { name: "Thomas Gaffney", firm: "OFA Group", slug: "future-proofing-design-how-ofa-group-blends-ai-and-sustainability" },
  { name: "Carlos A. Monsalve", firm: "Mon.Archi", slug: "biophilic-architecture-explained-how-monarchi-designs-healthier-human-centered-spaces" },
  { name: "Navy McKee", firm: "Kai Pono Solutions", slug: "how-kai-pono-solutions-is-reinventing-stormwater-filtration-to-protect-our-oceans" },
] as const;

export const TOPIC_FILTERS = ["All", "Architecture", "Engineering", "Modular", "Energy", "Housing", "AI"] as const;
