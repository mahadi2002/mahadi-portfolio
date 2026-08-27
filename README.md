# Mahadi Hasan Tanmay - Portfolio

Personal portfolio site built with React, Vite, and Tailwind CSS v4.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

All copy (bio, projects, skills, contact details) lives in [`src/data.ts`](src/data.ts) - edit that file to update the site without touching component code. The downloadable CV is served from `public/Mahadi_Hasan_Tanmay_CV.pdf`; replace that file to update the download.

## Contact form

The contact form has no backend. On submit it builds a `mailto:` link (pre-filled subject and body) and opens the visitor's mail client, addressed to the email in `src/data.ts`. This needs no third-party account or API key.

If you'd rather have submissions land directly in your inbox without a mail-client popup, swap the `handleSubmit` function in [`src/components/Contact.tsx`](src/components/Contact.tsx) for a call to a form backend such as Formspree or EmailJS (both have free tiers and just need an endpoint/key from your own account).

## Deploying

The project is a static Vite build, so it deploys as-is to Vercel, Netlify, GitHub Pages, or any static host. For Vercel: import the repo, framework preset "Vite", no extra config needed.
