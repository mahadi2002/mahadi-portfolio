import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../lib/motion";
import { research } from "../data";

export function Research() {
  const reduce = useReducedMotion();

  return (
    <section id="research" className="relative border-b border-white/8 bg-zinc-900/30 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="font-mono text-xs uppercase tracking-[0.14em] text-amber-400/90"
        >
          Research
        </motion.p>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT }}
          className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-zinc-50 md:text-5xl"
        >
          {research.title}
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="mt-4 text-sm text-ink-dim"
        >
          {research.role} - supervised by {research.supervisor}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {research.points.map((point, i) => (
            <motion.div
              key={point.slice(0, 24)}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
              className="border-t border-white/10 pt-5"
            >
              <p className="text-sm leading-relaxed text-zinc-400">{point}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 max-w-[65ch] text-sm leading-relaxed text-ink-dim">{research.footnote}</p>
      </div>
    </section>
  );
}
