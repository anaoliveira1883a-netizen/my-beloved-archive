import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/archive";

export const Route = createFileRoute("/add")({
  head: () => ({
    meta: [
      { title: "Adicionar ao arquivo — Archive" },
      {
        name: "description",
        content: "Guarde uma música, presente, comentário, memória ou promessa em segundos.",
      },
      { property: "og:title", content: "Adicionar ao arquivo — Archive" },
      {
        property: "og:description",
        content: "Adição rápida de itens ao seu arquivo pessoal.",
      },
    ],
  }),
  component: AddMenu,
});

function AddMenu() {
  return (
    <main className="px-4 pt-6">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
        adição rápida
      </p>
      <h1 className="mt-1 text-2xl font-bold">O que você quer guardar?</h1>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {CATEGORIES.map((c, n) => (
          <Link
            key={c.key}
            to="/new/$category"
            params={{ category: c.key }}
            className="card-object anim-in flex items-center gap-2 p-3"
            style={{ animationDelay: `${n * 20}ms` }}
          >
            <span className="text-lg">{c.emoji}</span>
            <span className="text-sm">{c.label}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
