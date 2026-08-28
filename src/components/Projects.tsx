import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../lib/motion";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { projects, type Project } from "../data";

const backgrounds: Record<Project["accent"], string> = {
  amber:
    "bg-[radial-gradient(120%_120%_at_0%_0%,rgba(251,191,36,0.16),transparent_60%),linear-gradient(155deg,#151109_0%,#0c0a08_60%)]",
  zinc: "bg-[radial-gradient(120%_120%_at_100%_0%,rgba(161,161,170,0.14),transparent_60%),linear-gradient(155deg,#131316_0%,#0a0a0b_60%)]",
  line: "bg-[linear-gradient(155deg,#111113_0%,#09090b_65%)]",
};

function LinkButton({ link }: { link: Project["link"] }) {
  if (!link) return null;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${link.label}`}
      title={link.label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 text-zinc-400 transition-colors hover:border-amber-400/50 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
    >
      {link.href.includes("github.com") ? <GithubLogo size={16} /> : <ArrowUpRight size={16} />}
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const isLarge = project.size === "lg";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT }}
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-white/10 p-7 transition duration-200 hover:border-white/20 motion-safe:hover:-translate-y-1 ${backgrounds[project.accent]} ${
        isLarge ? "md:col-span-2 md:p-9" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-semibold tracking-tight text-zinc-50 ${isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {project.name}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{project.tagline}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LinkButton link={project.link} />
          <LinkButton link={project.sourceLink} />
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-ink-dim">{project.period}</p>

      <ul className={`mt-4 space-y-2 ${isLarge ? "md:max-w-2xl" : ""}`}>
        {project.points.map((point) => (
          <li key={point.slice(0, 20)} className="text-sm leading-relaxed text-zinc-400">
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 pt-7">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="border-b border-white/8 bg-zinc-950 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl"
        >
          Selected work
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
