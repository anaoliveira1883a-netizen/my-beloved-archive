import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { playableKind, youtubeId, type PlayableKind } from "./player";

export type Track = {
  id: string;
  title: string;
  subtitle?: string | undefined;
  url: string;
  kind: PlayableKind;
};

type Ctx = {
  track: Track | null;
  playing: boolean;
  minimized: boolean;
  play: (t: { id: string; title: string; subtitle?: string | undefined; url: string }) => void;
  toggle: () => void;
  stop: () => void;
  setMinimized: (v: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  frameRef: React.RefObject<HTMLIFrameElement | null>;
  setPlaying: (v: boolean) => void;
};

const PlayerContext = createContext<Ctx | null>(null);

function ytCommand(frame: HTMLIFrameElement | null, func: "playVideo" | "pauseVideo") {
  frame?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const play: Ctx["play"] = useCallback((t) => {
    const kind = playableKind(t.url);
    if (!kind) return;
    setTrack({ ...t, kind });
    setPlaying(true);
    setMinimized(true);
    if (kind === "audio") {
      requestAnimationFrame(() => void audioRef.current?.play().catch(() => setPlaying(false)));
    }
  }, []);

  const toggle = useCallback(() => {
    if (!track) return;
    setPlaying((p) => {
      const next = !p;
      if (track.kind === "audio") {
        if (next) void audioRef.current?.play().catch(() => undefined);
        else audioRef.current?.pause();
      } else {
        ytCommand(frameRef.current, next ? "playVideo" : "pauseVideo");
      }
      return next;
    });
  }, [track]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setTrack(null);
    setPlaying(false);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      track,
      playing,
      minimized,
      play,
      toggle,
      stop,
      setMinimized,
      audioRef,
      frameRef,
      setPlaying,
    }),
    [track, playing, minimized, play, toggle, stop],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

export { youtubeId };
