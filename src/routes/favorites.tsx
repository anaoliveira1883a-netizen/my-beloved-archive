import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/archive";
import { useArchive } from "@/lib/archive-context";
import { EmptyDrawer, ItemCard, SectionTitle, Kao } from "@/components/archive-ui";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favoritos — Archive" },
      {
        name: "description",
        content: "As coisas mais importantes do arquivo, reunidas em um só lugar.",
      },
      { property: "og:title", content: "Favoritos — Archive" },
      { property: "og:description", content: "Os favoritos do seu arquivo pessoal." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { items } = useArchive();
  const favs = items.filter((i) => i.favorite);
  const grouped = CATEGORIES.map((c) => ({
    meta: c,
    list: favs.filter((i) => i.category === c.key),
  })).filter((g) => g.list.length);

  return (
    <main className="px-4 pt-8 sm:px-6">
      <h1 className="text-2xl font-bold">Favoritos</h1>
      <p className="font-hand text-lg text-muted-foreground">
        as coisas que você não quer esquecer.
      </p>

      <div className="mt-5 grid gap-5">
        {grouped.length === 0 ? (
          <EmptyDrawer text="Ainda não há nada com coração aqui ♡" />
        ) : (
          grouped.map((g) => (
            <section key={g.meta.key}>
              <SectionTitle>
<Kao face={g.meta.emoji} className="text-[0.65rem]" /> {g.meta.label}
              </SectionTitle>
              <div className="grid gap-2 lg:grid-cols-2">
                {g.list.map((i, n) => (
                  <ItemCard key={i.id} item={i} index={n} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
