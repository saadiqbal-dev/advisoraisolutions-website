import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const allow = { allow: "/" };

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allow },
      { userAgent: "GPTBot", ...allow },
      { userAgent: "ChatGPT-User", ...allow },
      { userAgent: "PerplexityBot", ...allow },
      { userAgent: "Claude-Web", ...allow },
      { userAgent: "anthropic-ai", ...allow },
      { userAgent: "Googlebot", ...allow },
      { userAgent: "Bingbot", ...allow },
      { userAgent: "DuckDuckBot", ...allow },
      { userAgent: "LinkedInBot", ...allow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
