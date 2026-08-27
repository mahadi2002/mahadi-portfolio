import { motion, useReducedMotion } from "motion/react";
import { LockSimple } from "@phosphor-icons/react";
import { productSeries } from "../data";

export function Products() {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-white/8 bg-zinc-950 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl"
        >
          Product series
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-[65ch] text-sm leading-relaxed text-zinc-500"
        >
          {productSeries.intro}
        </motion.p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productSeries.products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-50">{product.name}</h3>
                  <p className="mt-0.5 text-sm text-zinc-500">{product.nameBn}</p>
                </div>
                <span
                  title="Private repository"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 text-zinc-500"
                >
                  <LockSimple size={14} />
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{product.tagline}</p>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {product.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-500"
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
