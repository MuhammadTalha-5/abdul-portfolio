# Abdul — Portfolio (Headless WordPress + Next.js 16)

A light, minimal, scroll-animated portfolio. Content is editable in WordPress
(ACF + WPGraphQL) and rendered by Next.js with ISR, deployed on Vercel.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS v4** — design tokens in `app/globals.css`
- **Framer Motion** — reveals, parallax, count-ups, nav transitions
- **GSAP + ScrollTrigger** — scroll-driven timeline (Experience)
- **Lenis** — smooth scrolling (synced with GSAP)
- **WPGraphQL + ACF (free)** — content from `cms.qarigroup.com`

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

### Environment variables (`.env.local`)

| Variable             | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `WORDPRESS_API_URL`  | WPGraphQL endpoint, e.g. `https://cms.qarigroup.com/graphql` |
| `REVALIDATE_SECRET`  | Shared secret for the on-demand revalidation webhook   |

## How content flows

`lib/queries.js` (GraphQL) → `lib/wp.js` (fetch + normalize, with an 8s abort
timeout and graceful fallback to `lib/fallback.js`) → `app/page.js` (server,
`revalidate = 60`) → section components in `components/sections/`.

If the CMS is empty or unreachable, placeholder content renders so the site
never breaks. Real WordPress content always takes precedence.

## Structure

```
app/
  layout.js            Fonts, metadata, SmoothScroll + ScrollProgress
  page.js              Fetches data, renders all sections (ISR)
  blog/[slug]/page.js  Single blog post (SSG + ISR)
  api/revalidate/      On-demand revalidation webhook
components/
  SmoothScroll, Reveal, Nav, Footer, ScrollProgress, SectionHeading
  sections/            Hero, About, Experience, Achievements,
                       Certifications, Projects, Blog, Contact
lib/
  site.js  queries.js  wp.js  fallback.js
```

## Keeping the site fresh (on-demand revalidation)

The site refreshes every 60s automatically. To update instantly when you
publish in WordPress, call the webhook with your secret:

```
https://abdul.qarigroup.com/api/revalidate?secret=YOUR_SECRET
```

Easiest setup: install the **WP Webhooks** plugin and fire this URL on
post create/update, or add a small `save_post` snippet in WordPress.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it on Vercel.
3. Add `WORDPRESS_API_URL` and `REVALIDATE_SECRET` as Environment Variables.
4. Deploy, then add the custom domain `abdul.qarigroup.com` and point its
   DNS (CNAME) at Vercel in Hostinger.

> Note: `next.config.mjs` whitelists `cms.qarigroup.com` (and `*.qarigroup.com`)
> for `next/image`. Add any other media host there if needed.
