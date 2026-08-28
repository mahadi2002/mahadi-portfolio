import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { profile, nav } from "../data";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-zinc-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-ink-dim">
          {profile.name} - {new Date().getFullYear() /* build-time constant, not a live clock */}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-ink-dim transition-colors hover:text-zinc-200">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-ink-dim">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <GithubLogo size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <LinkedinLogo size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <EnvelopeSimple size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
