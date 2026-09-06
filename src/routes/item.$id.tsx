import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { catMeta, type Category } from "@/lib/archive";
import { useArchive } from "@/lib/archive-context";
import { Chip, Field, HeartButton, inputClass } from "@/components/archive-ui";

export const Route = createFileRoute("/item/$id")({
  head: () => ({
    meta: [
      { title: "Detalhe do registro — Archive" },
      { name: "description", content: "Veja e edite os detalhes deste item do arquivo." },
      { property: "og:title", content: "Detalhe do registro — Archive" },
      { property: "og:description", content: "Um pedacinho guardado no arquivo pessoal." },
    ],
  }),
  component: ItemDetail,
});

function ItemDetail() {
  const { id } = Route.useParams();
  const { items, updateItem, removeItem, addItem, ready } = useArchive();
  const navigate = useNavigate();
  const item = items.find((i) => i.id === id);

  if (!ready) return <main className="px-4 pt-10 text-sm text-muted-foreground">abrindo…</main>;
  if (!item)
    return (
      <main className="px-4 pt-10">
        <p className="font-hand text-xl">Esse registro não está mais no arquivo.</p>
        <Link to="/" className="label-chip press mt-3 inline-block">
          voltar
        </Link>
      </main>
    );

  const meta = catMeta(item.category);

  return (
    <main className="anim-box px-4 pt-6">
      <div className="flex items-center justify-between">
        <button onClick={() => history.back()} className="label-chip press">
          ← voltar
        </button>
        <HeartButton item={item} />
      </div>

      <div className="card-object mt-4 p-4">
        <Chip>{meta.label}</Chip>
        <h1 className="mt-2 text-2xl font-bold leading-tight">{item.title}</h1>
        {item.subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.status ? <Chip>{item.status}</Chip> : null}
          {item.date ? <Chip>{item.date}</Chip> : null}
          {item.place ? <Chip>{item.place}</Chip> : null}
          {item.tags.map((t) => (
            <span key={t} className="font-hand text-base">
              #{t}
            </span>
          ))}
        </div>
        {item.rating ? (
          <p className="mt-3 text-lg text-primary">{"★".repeat(item.rating)}</p>
        ) : null}
      </div>

      {item.reason ? (
        <div className="card-object mt-3 bg-secondary p-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
            por que importa
          </p>
          <p className="mt-1 font-hand text-lg">{item.reason}</p>
        </div>
      ) : null}

      <div className="mt-3 grid gap-3">
        <Field label="Observações">
          <textarea
            rows={4}
            className={inputClass}
            value={item.notes ?? ""}
            onChange={(e) => updateItem(item.id, { notes: e.target.value })}
            placeholder="escreva aqui..."
          />
        </Field>
      </div>

      {item.category === "said" ? (
        <button
          onClick={() => {
            const gift = addItem({
              category: "gift" as Category,
              title: item.title,
              subtitle: "vindo de um comentário dele",
              status: "ideia",
              tags: ["presentes"],
            });
            navigate({ to: "/item/$id", params: { id: gift.id } });
          }}
          className="press mt-3 w-full rounded-[var(--radius)] bg-primary px-4 py-3 font-medium text-primary-foreground"
        >
          🎁 Transformar em ideia de presente
        </button>
      ) : null}

      <button
        onClick={() => {
          removeItem(item.id);
          navigate({ to: "/" });
        }}
        className="press mt-3 w-full rounded-[var(--radius)] border border-border px-4 py-3 text-sm text-muted-foreground"
      >
        Remover do arquivo
      </button>
    </main>
  );
}
