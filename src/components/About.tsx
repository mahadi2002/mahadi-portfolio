import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../lib/motion";
import { certifications, education, languages, projects, productSeries } from "../data";

const stats = [
  { value: String(projects.length + productSeries.products.length), label: "Projects and products shipped" },
  { value: education.gpa.replace("CGPA ", ""), label: "Undergraduate CGPA" },
  { value: "1", label: "Undergraduate thesis, in progress" },
];

/** Counts up to an integer value once it scrolls into view. Non-integer values (e.g. "3.53 / 4.00") render as static text. */
function StatValue({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const target = Number(value);
  const isCountable = Number.isInteger(target) && !reduce;
  const [display, setDisplay] = useState(isCountable ? 0 : value);

  useEffect(() => {
    if (!isCountable || !inView) return;
    const controls = animate(0, target, {
      duration: 1,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(String(Math.round(latest))),
    });
    return () => controls.stop();
  }, [inView, isCountable, target]);

  return (
    <p ref={ref} className="font-mono text-3xl font-medium text-amber-400 md:text-4xl">
      {display}
    </p>
  );
}

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="border-b border-white/8 bg-zinc-950 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-balance text-2xl leading-relaxed text-zinc-300 md:text-3xl"
        >
          I'm a computer science undergraduate who splits time between
          shipping full-stack products and probing where AI agents fail. Most
          of my work lives at that intersection: systems that hold up under
          real load, and research into the ones that don't hold up under
          attack.
        </motion.p>

        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/8 pt-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.06 + i * 0.06, ease: EASE_OUT }}
            >
              <StatValue value={stat.value} />
              <p className="mt-1.5 text-xs leading-snug text-ink-dim md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT }}
          className="mt-14 grid grid-cols-1 gap-8 border-t border-white/8 pt-10 sm:grid-cols-3"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">Education</p>
            <p className="mt-3 text-base text-zinc-100">{education.degree}</p>
            <p className="mt-1 text-sm text-ink-dim">{education.school}</p>
            <p className="mt-1 text-sm text-ink-dim">{education.period}</p>
            <p className="mt-1 font-mono text-sm text-amber-400/90">{education.gpa}</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-dim">{education.notes}</p>
            <ul className="mt-3 space-y-0.5">
              {education.earlier.map((e) => (
                <li key={e.level} className="text-xs text-ink-dim">
                  {e.level} - {e.school}, {e.result}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">Languages</p>
            <ul className="mt-3 space-y-1.5">
              {languages.map((l) => (
                <li key={l.name} className="text-sm text-zinc-300">
                  {l.name} <span className="text-ink-dim">- {l.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">Based in</p>
            <p className="mt-3 text-sm text-zinc-300">Dhaka, Bangladesh</p>
            <p className="mt-1 text-sm text-ink-dim">Open to remote and on-site roles</p>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE_OUT }}
          className="mt-14 border-t border-white/8 pt-10"
        >
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">Certifications</p>
          <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-zinc-300">{certifications.summary}</p>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {certifications.items.map((c) => (
              <li key={c.url} className="flex items-baseline justify-between gap-3 text-sm text-zinc-300">
                <span>{c.name}</span>
                <span className="shrink-0 font-mono text-xs text-ink-dim">{c.date}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
