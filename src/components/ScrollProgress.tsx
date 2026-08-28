import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Thin progress bar under the fixed header, tracking scroll position through the page.
 * Scroll-driven, not autonomous motion, so it stays under prefers-reduced-motion, just
 * without the spring smoothing, mapping 1:1 to scroll position instead.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: reduce ? scrollYProgress : smoothed }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-amber-400"
      aria-hidden="true"
    />
  );
}
