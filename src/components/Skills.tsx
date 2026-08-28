import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../lib/motion";
import { skills } from "../data";

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="border-b border-white/8 bg-zinc-900/30 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl"
        >
          Tools and technologies
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {skills.map((group, i) => (
            <motion.div
              key={group.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE_OUT }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, itemIndex) => (
                  <span
                    key={item}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:border-amber-400/40 hover:text-amber-200 ${
                      itemIndex < 4
                        ? "border-white/10 bg-white/[0.02] text-zinc-300"
                        : "border-white/[0.06] text-ink-dim"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
