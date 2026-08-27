import { motion, useReducedMotion } from "motion/react";
import { certifications, education, languages, projects, productSeries } from "../data";

const stats = [
  { value: String(projects.length + productSeries.products.length), label: "Projects and products shipped" },
  { value: education.gpa.replace("CGPA ", ""), label: "Undergraduate CGPA" },
  { value: "1", label: "Undergraduate thesis, in progress" },
];

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
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-3 gap-6 border-t border-white/8 pt-10"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-3xl font-medium text-amber-400 md:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-xs leading-snug text-zinc-500 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-1 gap-8 border-t border-white/8 pt-10 sm:grid-cols-3"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-600">Education</p>
            <p className="mt-3 text-base text-zinc-100">{education.degree}</p>
            <p className="mt-1 text-sm text-zinc-500">{education.school}</p>
            <p className="mt-1 text-sm text-zinc-500">{education.period}</p>
            <p className="mt-1 font-mono text-sm text-amber-400/90">{education.gpa}</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600">{education.notes}</p>
            <ul className="mt-3 space-y-0.5">
              {education.earlier.map((e) => (
                <li key={e.level} className="text-xs text-zinc-600">
                  {e.level} - {e.school}, {e.result}
                </li>
              ))}
            </ul>
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

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-zinc-600">Certifications</p>
            <ul className="mt-3 space-y-1.5">
              {certifications.map((c) => (
                <li key={c} className="text-sm text-zinc-300">
                  {c}
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
