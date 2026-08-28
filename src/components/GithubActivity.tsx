import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GithubLogo } from "@phosphor-icons/react";
import { EASE_OUT } from "../lib/motion";
import { profile } from "../data";

type Activity = {
  publicRepos: number;
  lastRepoName: string;
  lastPushedAt: string;
};

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function GithubActivity() {
  const reduce = useReducedMotion();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/mahadi2002"),
          fetch("https://api.github.com/users/mahadi2002/repos?sort=pushed&per_page=1"),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");
        const user = await userRes.json();
        const repos = await reposRes.json();
        if (cancelled) return;
        setActivity({
          publicRepos: user.public_repos,
          lastRepoName: repos[0]?.name ?? "",
          lastPushedAt: repos[0]?.pushed_at ?? user.updated_at,
        });
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "error") return null;

  return (
    <div className="border-b border-white/8 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3 text-xs">
        {status === "loading" ? (
          <div className="h-4 w-64 max-w-full animate-pulse rounded bg-white/5" aria-hidden="true" />
        ) : (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-2 text-ink-dim"
          >
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>
              <span className="text-zinc-300">{activity?.publicRepos} public repos on GitHub</span>
              {activity?.lastRepoName && (
                <>
                  {" "}
                  · last shipped to{" "}
                  <a
                    href={`${profile.github}/${activity.lastRepoName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400/90 hover:text-amber-300"
                  >
                    {activity.lastRepoName}
                  </a>{" "}
                  {relativeTime(activity.lastPushedAt)}
                </>
              )}
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="ml-auto hidden shrink-0 items-center gap-1.5 text-ink-dim transition-colors hover:text-amber-300 sm:flex"
            >
              <GithubLogo size={14} />
              Live from GitHub
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
