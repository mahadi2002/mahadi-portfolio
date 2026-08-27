import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { List, X, DownloadSimple } from "@phosphor-icons/react";
import { nav, profile } from "../data";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <header
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
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-zinc-100 transition-colors hover:border-amber-400/50 hover:text-amber-300"
          >
            <DownloadSimple size={16} weight="bold" />
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-zinc-100 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-zinc-950 px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base text-zinc-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-zinc-100"
            >
              <DownloadSimple size={16} weight="bold" />
              Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
