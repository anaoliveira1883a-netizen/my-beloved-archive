import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { catMeta } from "@/lib/archive";
import { useArchive } from "@/lib/archive-context";
import { EmptyDrawer, ItemCard, SectionTitle, Kao } from "@/components/archive-ui";

export const Route = createFileRoute("/c/$category")({
  head: () => ({
    meta: [
      { title: "Gaveta do arquivo — Archive" },
      { name: "description", content: "Todos os itens guardados nesta categoria do arquivo." },
      { property: "og:title", content: "Gaveta do arquivo — Archive" },
      { property: "og:description", content: "Coleção organizada por categoria." },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const meta = catMeta(category);
  const { items } = useArchive();
  const [view, setView] = useState<"list" | "grid">("list");
  const [status, setStatus] = useState<string>("");

  const list = items
    .filter((i) => i.category === meta.key)
    .filter((i) => (status ? i.status === status : true));

  return (
    <main className="px-4 pt-8 sm:px-6">
      <Link to="/" className="label-chip press">
        ← arquivo
      </Link>
      <h1 className="mt-3 flex items-center gap-2 text-2xl font-bold">
<Kao face={meta.emoji} className="text-sm" /> {meta.label}
      </h1>
      <p className="text-xs text-muted-foreground">
        {list.length} {meta.plural}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setView(view === "list" ? "grid" : "list")}
          className="label-chip press bg-card"
        >
          {view === "list" ? "ver capas" : "ver lista"}
        </button>
        {meta.statuses?.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s === status ? "" : s)}
            className={`press label-chip ${
              s === status ? "bg-primary text-primary-foreground" : "bg-card"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {list.length === 0 ? (
          <EmptyDrawer text={meta.empty} />
        ) : view === "list" ? (
          <div className="grid gap-2 lg:grid-cols-2">
            {list.map((i, n) => (
              <ItemCard key={i.id} item={i} index={n} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((i, n) => (
              <Link
                key={i.id}
                to="/item/$id"
                params={{ id: i.id }}
                className="folder anim-in block px-3 py-4"
                style={{ animationDelay: `${n * 25}ms` }}
              >
                <span className="folder-tab-label">{meta.plural}</span>
                <Kao face={meta.emoji} className="text-[0.65rem]" />
                <p className="mt-2 truncate text-sm">{i.title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <SectionTitle>adicionar aqui</SectionTitle>
        <Link
          to="/new/$category"
          params={{ category: meta.key }}
          className="press block rounded-[var(--radius)] bg-primary px-4 py-3 text-center font-medium text-primary-foreground"
        >
          + novo em {meta.label}
        </Link>
      </div>
    </main>
  );
}
