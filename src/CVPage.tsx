import { ArrowLeft, DownloadSimple } from "@phosphor-icons/react";
import {
  certifications,
  education,
  languages,
  leadership,
  productSeries,
  profile,
  projects,
  research,
  skills,
} from "./data";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h2 className="border-b border-zinc-300 pb-1 text-xs font-bold uppercase tracking-[0.1em] text-zinc-700">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function CVPage() {
  const generatedOn = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-dvh bg-zinc-200 py-10 print:bg-white print:py-0">
      <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between px-6 print:hidden">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-950">
          <ArrowLeft size={16} />
          Back to portfolio
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
        >
          <DownloadSimple size={16} weight="bold" />
          Print / save as PDF
        </button>
      </div>

      <div className="mx-auto max-w-[820px] bg-white px-10 py-12 text-zinc-800 shadow-xl print:max-w-none print:px-0 print:py-0 print:shadow-none">
        <header className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">{profile.name}</h1>
          <p className="mt-1.5 text-sm text-zinc-600">
            {profile.location} - {profile.phone} - {profile.email}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {profile.linkedinHandle} - {profile.githubHandle}
          </p>
        </header>

        <Section title="Education">
          <p className="text-sm font-semibold text-zinc-900">{education.degree}</p>
          <p className="text-sm text-zinc-600">
            {education.school} - {education.period} - {education.gpa}
          </p>
          <p className="mt-1 text-xs text-zinc-500">{education.notes}</p>
          {education.earlier.map((e) => (
            <p key={e.level} className="text-xs text-zinc-500">
              {e.level}, {e.school}, {e.result}
            </p>
          ))}
        </Section>

        <Section title="Research">
          <p className="text-sm font-semibold text-zinc-900">{research.title}</p>
          <p className="text-xs text-zinc-500">
            {research.role} - Supervisor: {research.supervisor}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            {research.points.map((p) => (
              <li key={p.slice(0, 24)} className="text-sm leading-snug text-zinc-700">
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs italic text-zinc-500">{research.footnote}</p>
        </Section>

        <Section title="Projects">
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-sm font-semibold text-zinc-900">{project.name}</p>
                  <p className="text-xs text-zinc-500">{project.period}</p>
                </div>
                <p className="text-xs text-zinc-500">{project.stack.join(", ")}</p>
                <ul className="mt-1 list-disc space-y-1 pl-4">
                  {project.points.map((p) => (
                    <li key={p.slice(0, 24)} className="text-sm leading-snug text-zinc-700">
                      {p}
                    </li>
                  ))}
                </ul>
                {(project.link || project.sourceLink) && (
                  <p className="mt-1 text-xs text-zinc-500">
                    {[project.link, project.sourceLink]
                      .filter((l): l is NonNullable<typeof l> => Boolean(l))
                      .map((l) => l.href.replace("https://", ""))
                      .join(" - ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Product series">
          <p className="text-xs leading-relaxed text-zinc-500">{productSeries.intro}</p>
          <ul className="mt-2 space-y-1.5">
            {productSeries.products.map((product) => (
              <li key={product.slug} className="text-sm leading-snug text-zinc-700">
                <span className="font-semibold text-zinc-900">{product.name}</span> ({product.nameBn}) -{" "}
                {product.tagline} - {product.link.href.replace("https://", "")}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Technical skills">
          <div className="space-y-1.5">
            {skills.map((group) => (
              <p key={group.label} className="text-sm text-zinc-700">
                <span className="font-semibold text-zinc-900">{group.label}: </span>
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </Section>

        <Section title="Leadership and activities">
          <p className="text-sm font-semibold text-zinc-900">
            {leadership.org} - {leadership.role}{" "}
            <span className="font-normal text-zinc-500">({leadership.period})</span>
          </p>
          <p className="text-sm text-zinc-700">{leadership.point}</p>
        </Section>

        <Section title="Certifications">
          <p className="text-xs text-zinc-500">{certifications.summary}</p>
          <ul className="mt-2 space-y-1">
            {certifications.items.map((c) => (
              <li key={c.url} className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm text-zinc-700">
                <span>{c.name}</span>
                <span className="text-xs text-zinc-500">
                  {c.date} -{" "}
                  <a href={c.url} target="_blank" rel="noreferrer" className="text-zinc-500 underline">
                    verify
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Languages">
          <p className="text-sm text-zinc-700">{languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>
        </Section>

        <p className="mt-8 border-t border-zinc-200 pt-3 text-center text-[10px] text-zinc-400">
          Generated on {generatedOn} from {profile.name}'s portfolio at mahadihasantanmay.com - always current with the live site.
        </p>
      </div>

      <style>{`
        @media print {
          @page { margin: 0.6in; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
