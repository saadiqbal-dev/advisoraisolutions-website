# Advisor AI Solutions

Marketing site for [Advisor AI Solutions](https://advisoraisolutions.io), an AEC-only AI growth practice founded by Jordan Salvador.

The project is based on the [Mainline Next.js template](https://github.com/shadcnblocks/mainline-nextjs-template) by shadcnblocks (Next.js 15, Tailwind CSS 4, shadcn/ui). That template is MIT plus the Commons Clause: fine to use in a commercial site, not fine to resell as a template. The license notice is in `LICENSE`. The pages, copy, and visual system here are a new site, not the template demo.

## Develop

```bash
npm install
npm run dev
```

`npm run build` produces a standard Next.js app. Deploy it on Vercel with no extra config. Set `NEXT_PUBLIC_SITE_URL` if the canonical host is not `https://advisoraisolutions.io`.

## Forms

Contact and the AI Visibility Score submit through a server action.

- If `CONTACT_FORM_ENDPOINT` is an `https://` URL, the action POSTs JSON there.
- If it is unset, or the endpoint fails, the browser opens a `mailto:` to jordan@advisoraisolutions.com with the answers filled in. Submissions are not dropped.

See `.env.example`. Do not commit secrets.

## Content

Episode, article, and FAQ text comes from the published advisoraisolutions.io app data. Anything that was not in that source is marked `[PLACEHOLDER]` or `[CONFIRM]` on the page and listed in `CONTENT-TODO.md`.
