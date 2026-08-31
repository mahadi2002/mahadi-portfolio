import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, SPRING_HOVER } from "../lib/motion";
import { GithubLogo } from "@phosphor-icons/react";
import { productSeries } from "../data";

const cardBackgrounds = [
  "bg-[radial-gradient(140%_140%_at_0%_0%,rgba(251,191,36,0.08),transparent_60%)]",
  "bg-[radial-gradient(140%_140%_at_100%_0%,rgba(161,161,170,0.08),transparent_60%)]",
  "",
];

export function Products() {
  const reduce = useReducedMotion();

  return (
    <section id="products" className="border-b border-white/8 bg-zinc-950 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl"
        >
          Product series
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE_OUT }}
          className="mt-4 max-w-[70ch] text-sm leading-relaxed text-ink-dim"
        >
          {productSeries.intro}
        </motion.p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productSeries.products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={reduce ? undefined : { y: -4, transition: SPRING_HOVER }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
              className={`flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-200 hover:border-white/20 ${cardBackgrounds[i % cardBackgrounds.length]}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-50">{product.name}</h3>
                  <p className="mt-0.5 text-sm text-ink-dim">{product.nameBn}</p>
                </div>
                <a
                  href={product.link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={product.link.label}
                  title={product.link.label}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 text-zinc-400 transition-colors hover:border-amber-400/50 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  <GithubLogo size={14} />
                </a>
              </div>

              <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-200">{product.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{product.detail}</p>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {product.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ink-dim"
                  >
                    {tech}
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
