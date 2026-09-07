export type PlayableKind = "youtube" | "audio";

export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host.endsWith("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(embed|shorts|v)\/([^/?]+)/);
      if (m) return m[2] ?? null;
    }
    return null;
  } catch {
    return null;
  }
}

export function isAudioUrl(url: string): boolean {
  return /\.(mp3|m4a|aac|ogg|oga|wav|flac|webm)(\?|#|$)/i.test(url.trim());
}

export function playableKind(url?: string | null): PlayableKind | null {
  if (!url) return null;
  if (youtubeId(url)) return "youtube";
  if (isAudioUrl(url)) return "audio";
  if (/^https?:\/\//i.test(url.trim())) return "audio";
  return null;
}
