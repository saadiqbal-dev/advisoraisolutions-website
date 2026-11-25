# Content still to confirm

Visible placeholders on the site are repeated here so they can be cleared in one pass.

## Confirm with Jordan

- Founding year. The about-page timeline starts the company in 2025. An older organization record said 2024. Both are noted on the homepage and about page. Schema does not publish a founding date.
- The 90-day / 15-call guarantee from advisoraisolutions.com. The site describes it as a past published line and tells visitors to ask on the call. It is not stated as a current promise. Code comments are marked `[CONFIRM: guarantee still offered]`.
- Dollar figures from the .com page ($3,500 setup, $2,800/month, 10% commission) are not shown. A code comment on the services page records them.
- Whether guest firm names on the homepage are OK. They are labelled “Podcast guests, not clients.”
- Voice widget. The Thinkr “Talk to me” widget is not loaded. A commented slot is in `src/app/layout.tsx`.
- Analytics. Vercel Analytics is included and loads once. Umami from the old site is not.
- Canonical domain. Metadata uses `https://advisoraisolutions.io` unless `NEXT_PUBLIC_SITE_URL` is set. Pointing DNS, and whether .com should 301 to .io, is a separate decision. `www` redirects to the apex in middleware.
- Form destination. Set `CONTACT_FORM_ENDPOINT` when a GoHighLevel, n8n, or email webhook exists. Until then, forms open a mailto.
- Headshot of Jordan. Marked on the homepage and about page.
- Step durations in “How it works.” Each step shows `[PLACEHOLDER: duration]`.
- Privacy policy and terms. Drafts, marked for legal review. The live /privacy-policy and /terms URLs were serving the homepage.

## Missing source text

- Four podcast URLs are on the live sitemap but not in the episode data. They render with the title taken from the URL and a placeholder note, and no invented guest:
  - /podcast/the-energy-incentive-playbook-for-developers
  - /podcast/is-ai-really-the-future-of-engineering-systems-thinking-and-the-limits-of-llms
  - /podcast/the-real-reason-contractors-struggle-to-scale
  - /podcast/prioritizing-systems-for-rapid-growth-in-a-company
- Thirty older podcast slugs 301 to the current slug for the same episode.
- Nine blog URLs are on the live sitemap but were not in the article data. They are placeholder pages (no invented body):
  - /blog/why-visibility-ai-search-new-seo-aec-firms
  - /blog/podcast-led-gtm-strategy-converts-guests-clients
  - /blog/how-to-build-ai-sdr-books-meetings-while-you-sleep
  - /blog/gohighlevel-aec-complete-setup-guide-2026
  - /blog/four-pillar-ai-growth-framework-construction-firms
  - /blog/zero-to-aec-authority-linkedin-90-days
  - /blog/7-ai-tools-every-aec-business-owner-should-use-2026
  - /blog/discovery-call-framework-closes-aec-deals
  - /blog/what-is-aeo-why-it-matters-more-than-seo-2026
- Most older blog posts in the app data have an excerpt only. The page shows the excerpt and says the rest was not published.
- Full articles that were in the source: “I Interviewed 21 AEC Founders…”, “The AEC AI Paradox…”, and “What a 1997 Email Client Teaches AEC Leaders…”. The third was filtered out of the live blog index (`id !== 22`) but the body is real, so it is published here.
- Episode transcripts were not in the source. Each episode has a transcript placeholder. Takeaways that were published are shown.
- FAQ answers that exist on the .io insights page are used. Four questions from the .com page had no answer text and are marked placeholder. Unsourced homepage stats (“73% of B2B buyers…”, “< 30 average AI visibility score”) are omitted.
- No testimonials, client logos, or result claims were invented. There were none on either live site.

## Redirects

- /insights → /faq
- /ai-readiness-assessment → /assessment
