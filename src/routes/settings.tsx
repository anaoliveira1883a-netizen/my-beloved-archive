import { createFileRoute } from "@tanstack/react-router";
import { THEMES } from "@/lib/archive";
import { useArchive } from "@/lib/archive-context";
import { Field, SectionTitle, inputClass } from "@/components/archive-ui";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Configurações — Archive" },
      {
        name: "description",
        content: "Escolha temas, personalize cores, ajuste privacidade e exporte seus dados.",
      },
      { property: "og:title", content: "Configurações — Archive" },
      { property: "og:description", content: "Aparência, privacidade e dados do seu arquivo." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, updateSettings, items, resetAll } = useArchive();

  function exportData() {
    const blob = new Blob([JSON.stringify({ items, settings }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "archive-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="px-4 pt-6">
      <h1 className="text-2xl font-bold">Configurações</h1>

      <section className="mt-5 grid gap-3">
        <SectionTitle>arquivo</SectionTitle>
        <Field label="Nome do arquivo">
          <input
            className={inputClass}
            value={settings.archiveName}
            onChange={(e) => updateSettings({ archiveName: e.target.value })}
          />
        </Field>
        <Field label="Frase favorita">
          <input
            className={inputClass}
            value={settings.favoriteQuote}
            onChange={(e) => updateSettings({ favoriteQuote: e.target.value })}
          />
        </Field>
      </section>

      <section className="mt-6">
        <SectionTitle>tema</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.key}
              onClick={() => updateSettings({ theme: t.key })}
              className={`card-object p-3 text-left text-sm ${
                settings.theme === t.key ? "border-primary" : ""
              }`}
            >
              <span className="block">{t.label}</span>
              <span className="mt-1 block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted-foreground">
                {settings.theme === t.key ? "em uso" : "aplicar"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle>cor principal</SectionTitle>
        <div className="card-object p-4">
          <input
            type="range"
            min={0}
            max={360}
            value={settings.hue ?? 30}
            onChange={(e) => updateSettings({ hue: Number(e.target.value) })}
            className="w-full accent-[var(--primary)]"
          />
          <div className="mt-3 flex items-center gap-3">
            <span className="size-8 rounded-full bg-primary" />
            <button
              onClick={() => updateSettings({ hue: null })}
              className="label-chip press"
            >
              usar cor do tema
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-2">
        <SectionTitle>preferências</SectionTitle>
        <Toggle
          label="Animações e microinterações"
          on={settings.animations}
          onChange={(v) => updateSettings({ animations: v })}
        />
        <Toggle
          label="Decorações (adesivos, selos, fitas)"
          on={settings.decorations}
          onChange={(v) => updateSettings({ decorations: v })}
        />
        <Toggle
          label="Modo privado (ocultar prévias)"
          on={settings.privacy}
          onChange={(v) => updateSettings({ privacy: v })}
        />
      </section>

      <section className="mt-6 grid gap-2">
        <SectionTitle>dados</SectionTitle>
        <button onClick={exportData} className="card-object press p-3 text-left text-sm">
          Exportar backup (.json)
        </button>
        <button
          onClick={() => {
            if (confirm("Apagar tudo do arquivo? Isso não pode ser desfeito.")) resetAll();
          }}
          className="card-object press p-3 text-left text-sm text-destructive"
        >
          Apagar todos os dados
        </button>
        <p className="px-1 text-xs text-muted-foreground">
          Tudo fica salvo apenas neste dispositivo.
        </p>
      </section>
    </main>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="card-object press flex items-center justify-between p-3 text-left text-sm"
    >
      <span>{label}</span>
      <span
        className={`grid h-6 w-11 items-center rounded-full border border-border px-0.5 ${
          on ? "bg-primary" : "bg-secondary"
        }`}
      >
        <span
          className={`size-5 rounded-full bg-card transition-transform ${
            on ? "translate-x-5" : ""
          }`}
        />
      </span>
    </button>
  );
}
