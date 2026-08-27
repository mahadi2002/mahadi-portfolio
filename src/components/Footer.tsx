import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { profile, nav } from "../data";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-zinc-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-zinc-600">
          {profile.name} - {new Date().getFullYear() /* build-time constant, not a live clock */}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-zinc-500 transition-colors hover:text-zinc-200">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-zinc-500">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-amber-300">
            <GithubLogo size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-amber-300">
            <LinkedinLogo size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-amber-300">
            <EnvelopeSimple size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
