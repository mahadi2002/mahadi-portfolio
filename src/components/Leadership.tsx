import { motion, useReducedMotion } from "motion/react";
import { Camera } from "@phosphor-icons/react";
import { leadership } from "../data";

export function Leadership() {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-white/8 bg-zinc-950 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-6 sm:flex-row sm:items-center"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-amber-400">
            <Camera size={20} weight="light" />
          </div>
          <div>
            <p className="text-base text-zinc-200">
              <span className="font-medium text-zinc-50">{leadership.org}</span> - {leadership.role}
              <span className="ml-2 font-mono text-xs text-zinc-600">{leadership.period}</span>
            </p>
            <p className="mt-1.5 max-w-[65ch] text-sm leading-relaxed text-zinc-500">{leadership.point}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
