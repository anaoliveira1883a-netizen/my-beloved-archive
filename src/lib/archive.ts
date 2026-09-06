export type Category =
  | "music"
  | "playlist"
  | "brand"
  | "clothes"
  | "gift"
  | "food"
  | "film"
  | "anime"
  | "game"
  | "book"
  | "place"
  | "said"
  | "memory"
  | "promise"
  | "note";

export type Item = {
  id: string;
  category: Category;
  title: string;
  subtitle?: string;
  notes?: string;
  reason?: string;
  status?: string;
  rating?: number;
  tags: string[];
  favorite: boolean;
  createdAt: string;
  date?: string;
  place?: string;
  link?: string;
  image?: string;
};

export type CategoryMeta = {
  key: Category;
  label: string;
  emoji: string;
  plural: string;
  empty: string;
  statuses?: string[];
  fields?: { key: keyof Item; label: string; placeholder?: string }[];
};

export const CATEGORIES: CategoryMeta[] = [
  {
    key: "music",
    label: "Música",
    emoji: "🎵",
    plural: "músicas",
    empty: "Nenhuma faixa gravada nesta fita ainda ♡",
    fields: [{ key: "subtitle", label: "Artista / álbum" }],
  },
  {
    key: "playlist",
    label: "Playlist",
    emoji: "📼",
    plural: "playlists",
    empty: "Nenhuma fita montada ainda ♡",
    fields: [{ key: "subtitle", label: "Descrição" }],
  },
  {
    key: "brand",
    label: "Marca",
    emoji: "🏷️",
    plural: "marcas",
    empty: "Nenhuma etiqueta colada aqui ainda ♡",
    fields: [{ key: "subtitle", label: "Categoria (tênis, tech...)" }],
  },
  {
    key: "clothes",
    label: "Roupa",
    emoji: "👕",
    plural: "peças",
    empty: "O guarda-roupa ainda está vazio ♡",
    statuses: ["já tem", "gostaria de ter", "look"],
    fields: [{ key: "subtitle", label: "Marca / tipo / cor" }],
  },
  {
    key: "gift",
    label: "Presente",
    emoji: "🎁",
    plural: "presentes",
    empty: "Nenhuma ideia guardada ainda ♡",
    statuses: ["ideia", "pesquisando", "quero comprar", "comprado", "entregue"],
    fields: [{ key: "subtitle", label: "Loja / preço aproximado" }],
  },
  {
    key: "food",
    label: "Comida",
    emoji: "🍜",
    plural: "sabores",
    empty: "Nada no cardápio ainda ♡",
    statuses: ["ama", "gosta", "talvez", "não gosta", "quer provar"],
    fields: [{ key: "subtitle", label: "Tipo (bebida, sobremesa...)" }],
  },
  {
    key: "film",
    label: "Filme/Série",
    emoji: "🎬",
    plural: "títulos",
    empty: "A fita ainda não foi rebobinada ♡",
    statuses: ["quero assistir", "assistindo", "terminado", "assistimos juntos"],
    fields: [{ key: "subtitle", label: "Gênero" }],
  },
  {
    key: "anime",
    label: "Anime/Mangá",
    emoji: "🌙",
    plural: "obras",
    empty: "Nenhum volume nesta prateleira ainda ♡",
    statuses: ["quero assistir", "assistindo", "terminado", "favorito"],
    fields: [{ key: "subtitle", label: "Gênero / estúdio" }],
  },
  {
    key: "game",
    label: "Jogo",
    emoji: "🕹️",
    plural: "jogos",
    empty: "Insira uma ficha para começar ♡",
    statuses: ["quer jogar", "jogando", "zerado", "jogamos juntos"],
    fields: [{ key: "subtitle", label: "Plataforma / gênero" }],
  },
  {
    key: "book",
    label: "Livro",
    emoji: "📖",
    plural: "livros",
    empty: "A estante ainda está vazia ♡",
    statuses: ["quer ler", "lendo", "lido", "favorito"],
    fields: [{ key: "subtitle", label: "Autor" }],
  },
  {
    key: "place",
    label: "Lugar",
    emoji: "📍",
    plural: "lugares",
    empty: "Nenhum destino marcado no mapa ainda ♡",
    statuses: ["ele gosta", "já fomos", "quer conhecer", "quero levá-lo"],
    fields: [{ key: "subtitle", label: "Endereço / cidade" }],
  },
  {
    key: "said",
    label: "Coisa que ele disse",
    emoji: "💬",
    plural: "comentários",
    empty: "Talvez ele mencione algo que você queira guardar aqui ♡",
    fields: [{ key: "subtitle", label: "Contexto (onde, quando)" }],
  },
  {
    key: "memory",
    label: "Memória",
    emoji: "📸",
    plural: "memórias",
    empty: "Esta gaveta de fotos ainda está vazia ♡",
    fields: [{ key: "subtitle", label: "Pessoas / música do dia" }],
  },
  {
    key: "promise",
    label: "Promessa",
    emoji: "🫶",
    plural: "promessas",
    empty: "Nenhum bilhete dentro da caixa ainda ♡",
    statuses: ["promessa nossa", "promessa pessoal", "algum dia", "cumprida"],
    fields: [{ key: "subtitle", label: "Para quem" }],
  },
  {
    key: "note",
    label: "Nota",
    emoji: "⭐",
    plural: "notas",
    empty: "Nenhuma anotação solta ainda ♡",
    fields: [{ key: "subtitle", label: "Assunto" }],
  },
];

export const catMeta = (key: string) =>
  CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[CATEGORIES.length - 1];

export const THEMES = [
  { key: "cassette", label: "Cassete Vintage" },
  { key: "hifi", label: "Hi-Fi Retro" },
  { key: "soft", label: "Soft Retro" },
  { key: "computer", label: "Retro Computer" },
  { key: "vhs", label: "VHS" },
  { key: "darkvintage", label: "Dark Vintage" },
  { key: "y2k", label: "Y2K Retro" },
  { key: "cozy", label: "Cozy Diary" },
];

export type Settings = {
  archiveName: string;
  personName: string;
  theme: string;
  animations: boolean;
  decorations: boolean;
  privacy: boolean;
  favoriteQuote: string;
  hue: number | null;
};

export const DEFAULT_SETTINGS: Settings = {
  archiveName: "My Archive",
  personName: "ele",
  theme: "cassette",
  animations: true,
  decorations: true,
  privacy: false,
  favoriteQuote: "guardando pequenas partes de você em um lugar só.",
  hue: null,
};

const ITEMS_KEY = "archive.items.v1";
const SETTINGS_KEY = "archive.settings.v1";

export function loadItems(): Item[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ITEMS_KEY) ?? "[]") as Item[];
  } catch {
    return [];
  }
}

export function saveItems(items: Item[]) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    return {
      ...DEFAULT_SETTINGS,
      ...(JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}") as Partial<Settings>),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: Settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export const seedItems = (): Item[] => {
  const now = Date.now();
  const mk = (
    category: Category,
    title: string,
    subtitle: string,
    extra: Partial<Item> = {},
    daysAgo = 0,
  ): Item => ({
    id: uid(),
    category,
    title,
    subtitle,
    tags: [],
    favorite: false,
    createdAt: new Date(now - daysAgo * 86400000).toISOString(),
    ...extra,
  });
  return [
    mk("music", "Blue Moon", "Chet Baker · jazz", { favorite: true, rating: 5, tags: ["nostalgia"], reason: "ele disse que essa toca na cabeça dele em dias de chuva" }, 2),
    mk("music", "Just Like Heaven", "The Cure · pós-punk", { rating: 4, tags: ["rock"] }, 6),
    mk("playlist", "our songs", "as que a gente escuta no carro", { favorite: true, tags: ["fita"] }, 9),
    mk("said", "Queria muito ter um toca-discos antigo", "conversa de domingo, na cozinha", { tags: ["ideias", "presentes"], favorite: true }, 1),
    mk("gift", "Toca-discos vintage", "sebo do centro · ~R$ 700", { status: "quero comprar", tags: ["presentes"] }, 1),
    mk("memory", "Tarde no mirante", "nós dois · céu laranja", { date: "2026-05-11", place: "Mirante do Alto", tags: ["memórias"], favorite: true }, 14),
    mk("promise", "Ver o mar juntos no inverno", "para nós", { status: "algum dia", tags: ["importante"] }, 20),
    mk("food", "Café coado sem açúcar", "bebida", { status: "ama" }, 4),
    mk("place", "Livraria da esquina", "rua das Flores, 121", { status: "já fomos", tags: ["memórias"] }, 30),
  ];
};
