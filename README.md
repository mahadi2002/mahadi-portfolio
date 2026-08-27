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

All copy (bio, education, research, projects, skills, contact details) lives in [`src/data.ts`](src/data.ts) - edit that file to update the site without touching component code.

## CV

There is no static CV file. `/cv` ([`src/CVPage.tsx`](src/CVPage.tsx)) renders a print-ready resume live from the same `src/data.ts`, so it can never drift out of sync with the site - edit `data.ts` once and both the site and the CV update together. Visitors download a PDF via the page's "Download as PDF" button, which calls the browser's native print-to-PDF (`window.print()`).

## Contact form

The contact form has no backend. On submit it builds a `mailto:` link (pre-filled subject and body) and opens the visitor's mail client, addressed to the email in `src/data.ts`. This needs no third-party account or API key.

If you'd rather have submissions land directly in your inbox without a mail-client popup, swap the `handleSubmit` function in [`src/components/Contact.tsx`](src/components/Contact.tsx) for a call to a form backend such as Formspree or EmailJS (both have free tiers and just need an endpoint/key from your own account).

## Deploying

The project is a static Vite build, so it deploys as-is to Vercel, Netlify, GitHub Pages, or any static host. For Vercel: import the repo, framework preset "Vite", no extra config needed.
