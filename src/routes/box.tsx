import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { catMeta, type Item } from "@/lib/archive";
import { useArchive } from "@/lib/archive-context";
import { EmptyDrawer } from "@/components/archive-ui";

export const Route = createFileRoute("/box")({
  head: () => ({
    meta: [
      { title: "Memory Box — Archive" },
      {
        name: "description",
        content: "Abra a caixa de lembranças e tire uma memória aleatória do arquivo.",
      },
      { property: "og:title", content: "Memory Box — Archive" },
      { property: "og:description", content: "Uma caixa antiga cheia de pequenas lembranças." },
    ],
  }),
  component: MemoryBox,
});

function MemoryBox() {
  const { items } = useArchive();
  const [picked, setPicked] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  function surprise() {
    if (!items.length) return;
    setOpen(false);
    const next = items[Math.floor(Math.random() * items.length)]!;
    setTimeout(() => {
      setPicked(next);
      setOpen(true);
    }, 120);
  }

  return (
    <main className="px-4 pt-6">
      <Link to="/" className="label-chip press">
        ← arquivo
      </Link>
      <h1 className="mt-3 text-2xl font-bold">Memory Box</h1>
      <p className="font-hand text-lg text-muted-foreground">
        uma caixa antiga com pedacinhos guardados.
      </p>

      <div className="card-object mt-5 overflow-hidden bg-secondary">
        <div className="border-b border-border px-4 py-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
          caixa nº 01 · {items.length} lembranças
        </div>
        <div className="grid place-items-center gap-4 px-4 py-8">
          <div className="text-5xl">{open ? "📭" : "📦"}</div>
          <button
            onClick={surprise}
            className="press rounded-[var(--radius)] bg-primary px-5 py-3 font-medium text-primary-foreground"
          >
            Surprise me ♡
          </button>
        </div>
      </div>

      <div className="mt-4">
        {items.length === 0 ? (
          <EmptyDrawer text="A caixa ainda está vazia ♡" />
        ) : picked && open ? (
          <Link
            to="/item/$id"
            params={{ id: picked.id }}
            key={picked.id}
            className="polaroid anim-box block rotate-[-1deg]"
          >
            <div className="grid aspect-[4/3] place-items-center bg-secondary text-4xl">
              {catMeta(picked.category).emoji}
            </div>
            <p className="mt-2 text-center font-hand text-xl">{picked.title}</p>
            <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
              {new Date(picked.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </Link>
        ) : null}
      </div>
    </main>
  );
}
