import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../lib/motion";
import {
  MagnifyingGlass,
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  FileText,
  Check,
  type IconProps,
} from "@phosphor-icons/react";
import { nav, profile } from "../data";

type Action = {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  perform: () => void | Promise<void>;
};

export function CommandPalette() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = [
    ...nav.map((item) => ({
      id: item.href,
      label: `Go to ${item.label}`,
      icon: ArrowRight,
      perform: () => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });
      },
    })),
    {
      id: "resume",
      label: "Open resume / CV",
      icon: FileText,
      perform: () => {
        window.location.href = "/cv";
      },
    },
    {
      id: "email",
      label: `Copy email (${profile.email})`,
      icon: copied ? Check : EnvelopeSimple,
      perform: async () => {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      },
    },
    {
      id: "github",
      label: "Open GitHub profile",
      icon: GithubLogo,
      perform: () => window.open(profile.github, "_blank", "noreferrer"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn profile",
      icon: LinkedinLogo,
      perform: () => window.open(profile.linkedin, "_blank", "noreferrer"),
    },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const action = filtered[activeIndex];
      if (action) {
        action.perform();
        setOpen(false);
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-xs text-ink-dim transition-colors hover:border-amber-400/50 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 lg:flex"
        aria-label="Open quick actions"
      >
        <MagnifyingGlass size={14} />
        <kbd className="font-mono text-[10px]">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[15vh]"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Quick actions"
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <MagnifyingGlass size={18} className="shrink-0 text-ink-dim" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Jump to a section or run a command..."
                  aria-label="Search quick actions"
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-ink-dim focus:outline-none"
                />
                <kbd className="shrink-0 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-ink-dim">
                  Esc
                </kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-ink-dim">No matches</li>
                )}
                {filtered.map((action, i) => (
                  <li key={action.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => {
                        action.perform();
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === activeIndex ? "bg-amber-400/10 text-amber-200" : "text-zinc-300"
                      }`}
                    >
                      <action.icon size={16} className="shrink-0" />
                      {action.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
