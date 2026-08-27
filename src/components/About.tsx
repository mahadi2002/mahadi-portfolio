import { motion, useReducedMotion } from "motion/react";
import { education, languages } from "../data";

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="border-b border-white/8 bg-zinc-950 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-2xl leading-relaxed text-zinc-300 md:text-3xl"
        >
          I'm a computer science undergraduate who splits time between
          shipping full-stack products and probing where AI agents fail. Most
          of my work lives at that intersection: systems that hold up under
          real load, and research into the ones that don't hold up under
          attack.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-1 gap-8 border-t border-white/8 pt-10 sm:grid-cols-3"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-600">Education</p>
            <p className="mt-3 text-base text-zinc-100">{education.degree}</p>
            <p className="mt-1 text-sm text-zinc-500">{education.school}</p>
            <p className="mt-1 text-sm text-zinc-500">{education.period}</p>
            <p className="mt-1 font-mono text-sm text-amber-400/90">{education.gpa}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-600">Languages</p>
            <ul className="mt-3 space-y-1.5">
              {languages.map((l) => (
                <li key={l.name} className="text-sm text-zinc-300">
                  {l.name} <span className="text-zinc-600">- {l.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-600">Based in</p>
            <p className="mt-3 text-sm text-zinc-300">Dhaka, Bangladesh</p>
            <p className="mt-1 text-sm text-zinc-500">Open to remote and on-site roles</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
