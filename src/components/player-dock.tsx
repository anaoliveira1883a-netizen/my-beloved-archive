import { usePlayer, youtubeId } from "@/lib/player-context";

export function PlayerDock() {
  const { track, playing, minimized, toggle, stop, setMinimized, audioRef, frameRef, setPlaying } =
    usePlayer();

  if (!track) return null;

  const ytId = track.kind === "youtube" ? youtubeId(track.url) : null;

  return (
    <div className="fixed right-3 top-1/2 z-[70] -translate-y-1/2">
      <div
        className={`overflow-hidden rounded-xl border border-border bg-card/95 backdrop-blur transition-all duration-300 ${
          minimized ? "w-[4.5rem] p-2" : "w-[15rem] p-3 shadow-lg"
        }`}
      >
        <div className={minimized ? "flex justify-center" : "flex items-center gap-3"}>
          <button
            onClick={() => (minimized ? setMinimized(false) : toggle())}
            aria-label={minimized ? "Abrir player" : playing ? "Pausar" : "Tocar"}
            className={`grid size-12 shrink-0 place-items-center rounded-full border border-border bg-secondary ${
              playing ? "disc-spin" : ""
            }`}
          >
            <span className="grid size-4 place-items-center rounded-full bg-foreground/70" />
          </button>
          {!minimized ? (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{track.title}</p>
              {track.subtitle ? (
                <p className="truncate text-xs text-muted-foreground">{track.subtitle}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        {ytId ? (
          <div
            className={
              minimized
                ? "h-0 w-0 overflow-hidden"
                : "mt-3 overflow-hidden rounded-md border border-border"
            }
          >
            <iframe
              ref={frameRef}
              title={track.title}
              className="aspect-video w-full"
              src={`https://www.youtube.com/embed/${ytId}?enablejsapi=1&autoplay=1&playsinline=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : null}

        {track.kind === "audio" ? (
          <audio
            ref={audioRef}
            src={track.url}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            className="hidden"
          />
        ) : null}

        {!minimized ? (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={toggle}
              className="press flex-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              {playing ? "pausar" : "tocar"}
            </button>
            <button
              onClick={() => setMinimized(true)}
              className="press rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground"
            >
              min
            </button>
            <button
              onClick={stop}
              aria-label="Fechar player"
              className="press rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground"
            >
              ✕
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
