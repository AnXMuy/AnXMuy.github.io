"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const CACHE_TTL = 60 * 60 * 1000;

function repositorySlug(repositoryUrl: string) {
  try {
    const url = new URL(repositoryUrl);
    if (url.hostname !== "github.com") return null;
    const [owner, repository] = url.pathname.split("/").filter(Boolean);
    if (!owner || !repository) return null;
    return `${owner}/${repository.replace(/\.git$/, "")}`;
  } catch {
    return null;
  }
}

function formatCount(count: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(count);
}

export function GitHubStars({ repositoryUrl }: { repositoryUrl: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const slug = repositorySlug(repositoryUrl);
    if (!slug) return;

    const cacheKey = `github-stars:${slug}`;
    const controller = new AbortController();

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { count: number; expiresAt: number };
        if (parsed.expiresAt > Date.now()) {
          setCount(parsed.count);
          return () => controller.abort();
        }
      }
    } catch {
      // Continue without cached data when storage is unavailable.
    }

    fetch(`https://api.github.com/repos/${slug}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
        return response.json() as Promise<{ stargazers_count: number }>;
      })
      .then((data) => {
        setCount(data.stargazers_count);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ count: data.stargazers_count, expiresAt: Date.now() + CACHE_TTL }),
          );
        } catch {
          // The live count remains available even when storage is blocked.
        }
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setCount(null);
      });

    return () => controller.abort();
  }, [repositoryUrl]);

  return (
    <span className="github-stars" aria-label={count === null ? "GitHub stars" : `${count} GitHub stars`}>
      <Star aria-hidden="true" />
      <span>{count === null ? "Stars" : formatCount(count)}</span>
    </span>
  );
}
