import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { EASE_OUT } from "../lib/motion";
import { List, X, DownloadSimple } from "@phosphor-icons/react";
import { nav } from "../data";
import { CommandPalette } from "./CommandPalette";

export function Nav() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveHref(`#${topMost.target.id}`);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const navLinkClass = (href: string) =>
    `text-sm transition-colors ${activeHref === href ? "text-amber-300" : "text-zinc-400 hover:text-zinc-50"}`;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-white/8 bg-zinc-950/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight text-zinc-50">
          MT<span className="text-amber-400">.</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={navLinkClass(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CommandPalette />
          <a
            href="/cv"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-zinc-100 transition-colors active:scale-[0.98] hover:border-amber-400/50 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <DownloadSimple size={16} weight="bold" />
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-zinc-100 transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: reduce ? "auto" : 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: reduce ? "auto" : 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.25, ease: EASE_OUT }}
            className="overflow-hidden border-t border-white/8 bg-zinc-950 lg:hidden"
          >
            <nav className="flex flex-col gap-5 px-6 py-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-base ${activeHref === item.href ? "text-amber-300" : "text-zinc-300"}`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/cv"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-zinc-100 transition-transform active:scale-[0.98]"
              >
                <DownloadSimple size={16} weight="bold" />
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
