import { motion, useReducedMotion } from "motion/react";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { profile } from "../data";
import { NetworkGraph } from "./NetworkGraph";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden border-b border-white/8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0)_0%,rgba(9,9,11,0.6)_100%)]" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs tracking-[0.14em] text-amber-400/90">
            CSE UNDERGRADUATE, UIU / DHAKA
          </p>

          <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-50 md:text-6xl">
            Full-stack engineer.
            <br />
            Agentic AI security researcher.
          </h1>

          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-zinc-400">
            Building production web systems and studying where autonomous AI
            agents break under attack, in industrial and cyber-physical
            settings.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98] hover:bg-amber-300"
            >
              View projects
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-100 transition-colors active:scale-[0.98] hover:border-amber-400/50 hover:text-amber-300"
            >
              Download CV
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5 text-zinc-500">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="transition-colors hover:text-amber-300"
            >
              <GithubLogo size={20} weight="regular" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors hover:text-amber-300"
            >
              <LinkedinLogo size={20} weight="regular" />
            </a>
            <span className="font-mono text-xs text-zinc-600">{profile.location}</span>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative aspect-square w-full max-w-md justify-self-center lg:justify-self-end"
        >
          <div className="absolute inset-0 rounded-2xl border border-white/8 bg-zinc-900/40" />
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <NetworkGraph />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
        </motion.div>
      </div>
    </section>
  );
}
