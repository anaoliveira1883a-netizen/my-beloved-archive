import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { catMeta, type Item } from "@/lib/archive";
import { useArchive } from "@/lib/archive-context";

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-2 flex items-end justify-between gap-3">
      <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="label-chip">{children}</span>;
}

export function HeartButton({ item }: { item: Item }) {
  const { toggleFavorite } = useArchive();
  return (
    <button
      aria-label={item.favorite ? "Remover dos favoritos" : "Favoritar"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(item.id);
      }}
      className="press shrink-0 rounded-full px-1.5 py-1 text-base leading-none"
    >
      <span className={item.favorite ? "text-primary" : "text-muted-foreground"}>
        {item.favorite ? "♥" : "♡"}
      </span>
    </button>
  );
}

export function ItemCard({ item, index = 0 }: { item: Item; index?: number }) {
  const meta = catMeta(item.category);
  return (
    <Link
      to="/item/$id"
      params={{ id: item.id }}
      className="card-object anim-in block p-3"
      style={{ animationDelay: `${Math.min(index, 8) * 30}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-border bg-secondary text-lg">
          {meta.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium leading-tight">{item.title}</p>
          {item.subtitle ? (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.subtitle}</p>
          ) : null}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Chip>{meta.label}</Chip>
            {item.status ? <Chip>{item.status}</Chip> : null}
            {item.tags.slice(0, 2).map((t) => (
              <span key={t} className="font-hand text-sm text-accent-foreground/80">
                #{t}
              </span>
            ))}
          </div>
        </div>
        <HeartButton item={item} />
      </div>
    </Link>
  );
}

export function EmptyDrawer({ text }: { text: string }) {
  return (
    <div className="card-object flex flex-col items-center gap-2 px-6 py-10 text-center">
      <div className="text-3xl opacity-70">🗄️</div>
      <p className="font-hand text-xl">{text}</p>
      <p className="max-w-[16rem] text-xs text-muted-foreground">
        Toque em “+” para guardar a primeira coisa nesta gaveta.
      </p>
    </div>
  );
}

export function RetroClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <div className="h-[3.1rem]" />;
  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  return (
    <div className="rounded-[var(--radius-sm)] border border-border bg-secondary px-3 py-1.5 text-right">
      <p className="font-mono text-xl leading-none tabular-nums">{time}</p>
      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
        {date}
      </p>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-[var(--radius-sm)] border border-border bg-paper px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary";
