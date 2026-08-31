import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { EASE_OUT, SPRING_HOVER, SPRING_TAP } from "../lib/motion";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { profile } from "../data";
import { NetworkGraph } from "./NetworkGraph";

export function Hero() {
  const reduce = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-7, 7]);

  function handlePortraitMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPortraitTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden border-b border-white/8">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <NetworkGraph />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
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
            <motion.a
              href="#projects"
              whileTap={reduce ? undefined : { scale: 0.96, transition: SPRING_TAP }}
              className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300"
            >
              View projects
            </motion.a>
            <motion.a
              href="/cv"
              whileTap={reduce ? undefined : { scale: 0.96, transition: SPRING_TAP }}
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-100 transition-colors hover:border-amber-400/50 hover:text-amber-300"
            >
              Resume
            </motion.a>
          </div>

          <div className="mt-10 flex items-center gap-2 text-ink-dim">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              <GithubLogo size={20} weight="regular" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              <LinkedinLogo size={20} weight="regular" />
            </a>
            <span className="ml-1 font-mono text-xs text-ink-dim">{profile.location}</span>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={reduce ? undefined : { scale: 1.02, transition: SPRING_HOVER }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
          onMouseMove={handlePortraitMove}
          onMouseLeave={resetPortraitTilt}
          style={{ rotateX, rotateY, transformPerspective: 800 }}
          className="relative aspect-square w-full max-w-md justify-self-center lg:justify-self-end"
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
            <img
              src="/mahadi.jpg"
              alt="Mahadi Hasan Tanmay"
              className="h-full w-full object-cover object-[50%_15%]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
        </motion.div>
      </div>
    </section>
  );
}
