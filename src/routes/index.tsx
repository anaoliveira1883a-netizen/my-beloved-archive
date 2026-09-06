import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, catMeta } from "@/lib/archive";
import { useArchive } from "@/lib/archive-context";
import { ItemCard, RetroClock, SectionTitle, EmptyDrawer } from "@/components/archive-ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "♡ My Archive — início" },
      {
        name: "description",
        content:
          "A página inicial do seu arquivo pessoal: contadores, favoritos e as últimas lembranças guardadas.",
      },
      { property: "og:title", content: "♡ My Archive — início" },
      {
        property: "og:description",
        content: "Guarde músicas, presentes, promessas e memórias em um só lugar.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { items, settings, ready } = useArchive();
  const recent = items.slice(0, 4);
  const favorites = items.filter((i) => i.favorite).slice(0, 3);
  const counts = CATEGORIES.map((c) => ({
    ...c,
    n: items.filter((i) => i.category === c.key).length,
  })).filter((c) => c.n > 0);
  const last = items[0];

  return (
    <main className="px-4 pt-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
            arquivo pessoal · vol. 01
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            ♡ {settings.archiveName}
          </h1>
          <p className="font-hand text-lg text-muted-foreground">
            {settings.favoriteQuote}
          </p>
        </div>
        <RetroClock />
      </header>

      <section className="mt-5 flex items-stretch gap-3">
        <div className="polaroid w-1/2 rotate-[-1.5deg]">
          <div className="grid aspect-square place-items-center bg-secondary text-4xl">
            📼
          </div>
          <p className="mt-2 text-center font-hand text-base">
            {last ? last.title : "primeira lembrança"}
          </p>
        </div>
        <div className="flex w-1/2 flex-col justify-between gap-3">
          <div className="card-object p-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
              memórias guardadas
            </p>
            <p className="font-mono text-3xl tabular-nums">
              {ready ? String(items.length).padStart(2, "0") : "--"}
            </p>
          </div>
          <div className="card-object p-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
              último registro
            </p>
            <p className="mt-0.5 truncate text-sm">{last ? last.title : "—"}</p>
          </div>
        </div>
      </section>

      {counts.length > 0 ? (
        <section className="mt-5 flex flex-wrap gap-1.5">
          {counts.map((c) => (
            <Link
              key={c.key}
              to="/c/$category"
              params={{ category: c.key }}
              className="label-chip press"
            >
              {c.n} {c.plural}
            </Link>
          ))}
        </section>
      ) : null}

      <section className="mt-6">
        <SectionTitle>gavetas</SectionTitle>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              to="/c/$category"
              params={{ category: c.key }}
              className="card-object flex flex-col items-center gap-1 px-2 py-3 text-center"
            >
              <span className="text-xl">{c.emoji}</span>
              <span className="text-[0.68rem] leading-tight">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle
          action={
            <Link to="/box" className="label-chip press">
              abrir
            </Link>
          }
        >
          memory box
        </SectionTitle>
        <Link to="/box" className="card-object block bg-secondary p-4">
          <p className="font-hand text-xl">Surprise me ♡</p>
          <p className="text-xs text-muted-foreground">
            Abra a caixa e tire uma lembrança aleatória.
          </p>
        </Link>
      </section>

      <section className="mt-6">
        <SectionTitle
          action={
            <Link to="/favorites" className="label-chip press">
              ver tudo
            </Link>
          }
        >
          ♡ favoritos
        </SectionTitle>
        <div className="grid gap-2">
          {favorites.length ? (
            favorites.map((i, n) => <ItemCard key={i.id} item={i} index={n} />)
          ) : (
            <EmptyDrawer text="Nenhum favorito ainda ♡" />
          )}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle>recentemente adicionados</SectionTitle>
        <div className="grid gap-2">
          {recent.length ? (
            recent.map((i, n) => <ItemCard key={i.id} item={i} index={n} />)
          ) : (
            <EmptyDrawer text={catMeta("note").empty} />
          )}
        </div>
      </section>
    </main>
  );
}
