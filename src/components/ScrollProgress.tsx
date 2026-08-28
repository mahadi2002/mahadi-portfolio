import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin progress bar under the fixed header, tracking scroll position through the page. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  if (reduce) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-amber-400"
      aria-hidden="true"
    />
  );
}
