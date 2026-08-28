import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  XLogo,
  InstagramLogo,
  ThreadsLogo,
  FacebookLogo,
  type IconProps,
} from "@phosphor-icons/react";
import { profile, socials, nav } from "../data";

const socialIcons: Record<string, React.ComponentType<IconProps>> = {
  X: XLogo,
  Instagram: InstagramLogo,
  Threads: ThreadsLogo,
  Facebook: FacebookLogo,
};

function IconLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<IconProps>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
    >
      <Icon size={18} />
    </a>
  );
}

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

        <div className="flex flex-wrap items-center justify-center gap-1 text-ink-dim">
          <IconLink href={profile.github} label="GitHub" icon={GithubLogo} />
          <IconLink href={profile.linkedin} label="LinkedIn" icon={LinkedinLogo} />
          {socials.map((s) => (
            <IconLink key={s.label} href={s.href} label={s.label} icon={socialIcons[s.label]} />
          ))}
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
