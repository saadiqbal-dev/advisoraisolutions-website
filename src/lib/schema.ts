import { absoluteUrl, site } from "@/lib/site";
import type { Episode, Faq, Post } from "@/lib/content";

const orgId = `${site.url}/#organization`;
const personId = `${site.url}/#jordan-salvador`;
const websiteId = `${site.url}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: absoluteUrl("/icon"),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phoneTel,
    founder: { "@id": personId },
    address: { "@type": "PostalAddress", addressCountry: "CA" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneTel,
      email: site.email,
      contactType: "sales",
      availableLanguage: "English",
      areaServed: "North America",
    },
    sameAs: [site.linkedin, site.linkedinCompany, site.youtube, site.instagram],
    areaServed: { "@type": "AdministrativeArea", name: "North America" },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": orgId },
    inLanguage: "en-US",
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.founder,
    jobTitle: "Founder",
    worksFor: { "@id": orgId },
    url: absoluteUrl("/about"),
    email: site.email,
    telephone: site.phoneTel,
    description:
      "Jordan Salvador spent a decade as a power engineer in oil and gas and a decade as an independent advisor before founding Advisor AI Solutions, an AI growth system built exclusively for AEC and green building firms.",
    sameAs: [site.linkedin, site.youtube],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((faq) => !faq.placeholder)
      .map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services#service`,
    name: "AI Growth System for AEC Firms",
    serviceType: "AI visibility, outreach, authority, and pipeline systems",
    url: absoluteUrl("/services"),
    provider: { "@id": orgId },
    areaServed: { "@type": "AdministrativeArea", name: "North America" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Architecture, engineering, construction, and green building firms",
    },
    description:
      "Four connected systems — visibility, outreach, authority, and pipeline — built only for AEC and green building firms.",
  };
}

export function podcastSeriesJsonLd(count: number) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": `${site.url}/podcast#series`,
    name: "Advisor AI Solutions Podcast",
    description:
      "Conversations with architecture, engineering, construction, and green-building leaders on AI, innovation, and how firms win work.",
    url: absoluteUrl("/podcast"),
    author: { "@id": personId },
    publisher: { "@id": orgId },
    webFeed: site.youtube,
    sameAs: [site.youtube],
    numberOfEpisodes: count,
  };
}

export function podcastEpisodeJsonLd(ep: Episode) {
  const url = absoluteUrl(`/podcast/${ep.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `${url}#episode`,
    name: ep.title,
    url,
    description: ep.description,
    episodeNumber: ep.ep || undefined,
    datePublished: ep.isoDate,
    image: ep.thumb || undefined,
    partOfSeries: { "@id": `${site.url}/podcast#series`, name: "Advisor AI Solutions Podcast" },
    author: { "@id": personId },
    publisher: { "@id": orgId },
    ...(ep.videoId
      ? {
          associatedMedia: {
            "@type": "VideoObject",
            name: ep.title,
            description: ep.description,
            thumbnailUrl: ep.thumb,
            uploadDate: ep.isoDate,
            embedUrl: `https://www.youtube-nocookie.com/embed/${ep.videoId}`,
            url: ep.youtubeUrl,
          },
        }
      : {}),
    ...(ep.guest && ep.guest !== site.founder
      ? {
          actor: {
            "@type": "Person",
            name: ep.guest,
            description: `Podcast guest. ${ep.guestRole}`.trim(),
          },
        }
      : {}),
  };
}

export function articleJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt || post.title,
    url,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: { "@id": personId },
    publisher: { "@id": orgId },
    articleSection: post.category,
    inLanguage: "en-US",
    mainEntityOfPage: url,
  };
}
