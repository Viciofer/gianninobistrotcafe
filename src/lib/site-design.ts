import { supabase } from "@/integrations/supabase/client";

export type DesignSettings = {
  preset: "classico" | "editoriale" | "contemporaneo" | "parigino" | "lounge" | "enoteca" | "moderna";
  background: string;
  foreground: string;
  muted: string;
  surface: string;
  accent: string;
  sidebar: string;
  sidebarText: string;
  border: string;
  headingFont: string;
  bodyFont: string;
  headingSize: number;
  bodySize: number;
  backgroundStyle: "plain" | "paper" | "lines" | "dots" | "grid";
  backgroundImage: string;
  backgroundPath: string;
  logoUrl: string;
  logoPath: string;
  pageBackgrounds: Record<string, string>;
};

export const DESIGN_DEFAULTS: DesignSettings = {
  preset: "classico", background: "#faf7f1", foreground: "#302824", muted: "#75685e",
  surface: "#fdfbf7", accent: "#c79e63", sidebar: "#302824", sidebarText: "#eee8dc", border: "#ded8cf",
  headingFont: "Georgia", bodyFont: "Inter", headingSize: 100, bodySize: 100,
  backgroundStyle: "plain", backgroundImage: "", backgroundPath: "", logoUrl: "", logoPath: "", pageBackgrounds: {},
};

export const DESIGN_PRESETS: Record<DesignSettings["preset"], Partial<DesignSettings>> = {
  classico: { background: "#faf7f1", foreground: "#302824", muted: "#75685e", surface: "#fdfbf7", accent: "#c79e63", sidebar: "#302824", sidebarText: "#eee8dc", border: "#ded8cf", headingFont: "Georgia", bodyFont: "Inter", backgroundStyle: "plain" },
  editoriale: { background: "#f4f5f2", foreground: "#24342c", muted: "#5f7067", surface: "#ffffff", accent: "#a45339", sidebar: "#24342c", sidebarText: "#f4f5f2", border: "#cbd4ca", headingFont: "Playfair Display", bodyFont: "Lora", backgroundStyle: "paper" },
  contemporaneo: { background: "#f3f5f6", foreground: "#202d38", muted: "#657581", surface: "#ffffff", accent: "#a34c46", sidebar: "#202d38", sidebarText: "#f3f5f6", border: "#d4dde1", headingFont: "Montserrat", bodyFont: "Inter", backgroundStyle: "lines" },
  parigino: { background: "#f7f0e3", foreground: "#3a2a1f", muted: "#7a6352", surface: "#fbf6ec", accent: "#b8893a", sidebar: "#3a2a1f", sidebarText: "#f3e9d6", border: "#e1d3bb", headingFont: "Cormorant Garamond", bodyFont: "EB Garamond", backgroundStyle: "paper" },
  lounge: { background: "#16171b", foreground: "#ece6da", muted: "#a59c8c", surface: "#202127", accent: "#c9a45c", sidebar: "#0e0f12", sidebarText: "#ece6da", border: "#33343b", headingFont: "Playfair Display", bodyFont: "Montserrat", backgroundStyle: "plain" },
  enoteca: { background: "#f6efe9", foreground: "#3b1620", muted: "#7d5560", surface: "#fbf7f3", accent: "#8c2a3c", sidebar: "#3b1620", sidebarText: "#f6efe9", border: "#e3d2cc", headingFont: "Libre Baskerville", bodyFont: "Lora", backgroundStyle: "dots" },
  moderna: { background: "#fafafa", foreground: "#1d1d1f", muted: "#6e6e73", surface: "#ffffff", accent: "#c0703a", sidebar: "#1d1d1f", sidebarText: "#fafafa", border: "#e2e2e5", headingFont: "Oswald", bodyFont: "Open Sans", backgroundStyle: "grid" },
};

export const PRESET_LABELS: Record<DesignSettings["preset"], string> = {
  classico: "Classico", editoriale: "Editoriale", contemporaneo: "Contemporaneo", parigino: "Bistrot Parigino",
  lounge: "Cocktail Lounge", enoteca: "Enoteca Nobile", moderna: "Caffetteria Moderna",
};

type Palette = { name: string; colors: Pick<DesignSettings, "background" | "surface" | "foreground" | "muted" | "accent" | "border" | "sidebar" | "sidebarText"> };
const pal = (name: string, background: string, surface: string, foreground: string, muted: string, accent: string, border: string, sidebar: string, sidebarText: string): Palette =>
  ({ name, colors: { background, surface, foreground, muted, accent, border, sidebar, sidebarText } });

export const PALETTE_GROUPS: { group: string; palettes: Palette[] }[] = [
  { group: "Bistrot & Caffetteria", palettes: [
    pal("Bistrot Tradizionale", "#faf7f1", "#fdfbf7", "#302824", "#75685e", "#c79e63", "#ded8cf", "#302824", "#eee8dc"),
    pal("Torrefazione & Cacao", "#f5ede3", "#faf5ee", "#2e1d14", "#6f5546", "#a8693a", "#dfcfbd", "#2e1d14", "#f1e6d7"),
    pal("Ambra & Miele", "#fbf5ea", "#fffaf1", "#3d2b18", "#80654a", "#d99a2b", "#eadcc3", "#4a331c", "#fbefd9"),
  ]},
  { group: "Serale & Lounge", palettes: [
    pal("Notte & Champagne", "#1b1b1e", "#25252a", "#efe9dd", "#a8a092", "#c9a45c", "#38383e", "#111113", "#efe9dd"),
    pal("Speakeasy Velluto", "#1c1512", "#271d19", "#efe3d6", "#a99282", "#b8673d", "#3d2e27", "#120d0b", "#efe3d6"),
    pal("Midnight Blue", "#121a2b", "#1a2438", "#ebeef4", "#9aa5b8", "#d2b06a", "#2c3850", "#0b1120", "#ebeef4"),
  ]},
  { group: "Vini & Cantina", palettes: [
    pal("Borgogna & Amarone", "#f7f0ea", "#fcf8f4", "#3b1620", "#7d5560", "#8c2a3c", "#e3d2cc", "#3b1620", "#f7f0ea"),
    pal("Rosé & Perlage", "#fbf1ef", "#fff8f6", "#4a2028", "#8a5e66", "#b3485a", "#efd9d6", "#5a2731", "#fbefed"),
  ]},
  { group: "Natura & Mediterraneo", palettes: [
    pal("Salvia & Ulivo", "#f1f3ec", "#f9faf6", "#26332a", "#62705f", "#b2633e", "#d4dacb", "#26332a", "#eef1e8"),
    pal("Costiera & Terracotta", "#f6f3ee", "#fdfbf8", "#1d3047", "#5f6f80", "#c2603b", "#dcd6cc", "#1d3047", "#f2efe8"),
  ]},
  { group: "Minimal & Grafico", palettes: [
    pal("Nordic Slate", "#f2f4f5", "#ffffff", "#232b31", "#69737a", "#4d6b7a", "#d7dde0", "#232b31", "#f2f4f5"),
    pal("Monocromo Puro", "#ffffff", "#fafafa", "#111111", "#6b6b6b", "#3a3a3a", "#e3e3e3", "#111111", "#ffffff"),
  ]},
];

export const DESIGN_PAGES = [
  { path: "/", label: "Home" }, { path: "/menu", label: "Menù" }, { path: "/caffetteria", label: "Caffetteria" },
  { path: "/drink", label: "Drink List" }, { path: "/vini", label: "Carta dei Vini" },
  { path: "/contatti", label: "Contatti" }, { path: "/sezione", label: "Altre sezioni" },
];

export const DESIGN_FONTS = ["Georgia", "Cormorant Garamond", "Playfair Display", "Lora", "Libre Baskerville", "Merriweather", "EB Garamond", "Dancing Script", "Great Vibes", "Inter", "Montserrat", "Roboto", "Open Sans", "Oswald"];
const colorOk = (value: unknown): value is string => typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
const imageOk = (value: unknown): value is string => typeof value === "string" && (value === "" || /^https:\/\//.test(value));

export function normalizeDesign(input: unknown): DesignSettings {
  const raw = input && typeof input === "object" ? input as Partial<DesignSettings> : {};
  const result: DesignSettings = { ...DESIGN_DEFAULTS, pageBackgrounds: {} };
  for (const key of ["background", "foreground", "muted", "surface", "accent", "sidebar", "sidebarText", "border"] as const) {
    if (colorOk(raw[key])) result[key] = raw[key];
  }
  if (raw.preset && raw.preset in DESIGN_PRESETS) result.preset = raw.preset;
  if (raw.backgroundStyle === "plain" || raw.backgroundStyle === "paper" || raw.backgroundStyle === "lines" || raw.backgroundStyle === "dots" || raw.backgroundStyle === "grid") result.backgroundStyle = raw.backgroundStyle;
  if (raw.headingFont && DESIGN_FONTS.includes(raw.headingFont)) result.headingFont = raw.headingFont;
  if (raw.bodyFont && DESIGN_FONTS.includes(raw.bodyFont)) result.bodyFont = raw.bodyFont;
  if (typeof raw.headingSize === "number" && raw.headingSize >= 70 && raw.headingSize <= 150) result.headingSize = raw.headingSize;
  if (typeof raw.bodySize === "number" && raw.bodySize >= 80 && raw.bodySize <= 130) result.bodySize = raw.bodySize;
  if (imageOk(raw.backgroundImage)) result.backgroundImage = raw.backgroundImage;
  if (imageOk(raw.logoUrl)) result.logoUrl = raw.logoUrl;
  if (typeof raw.backgroundPath === "string") result.backgroundPath = raw.backgroundPath;
  if (typeof raw.logoPath === "string") result.logoPath = raw.logoPath;
  if (raw.pageBackgrounds && typeof raw.pageBackgrounds === "object") {
    for (const page of DESIGN_PAGES) {
      const color = raw.pageBackgrounds[page.path];
      if (colorOk(color)) result.pageBackgrounds[page.path] = color;
    }
  }
  return result;
}

export async function fetchDesign(): Promise<{ id: string | null; settings: DesignSettings }> {
  const { data, error } = await supabase.from("site_design").select("id,settings").limit(1).maybeSingle();
  if (error) throw error;
  return { id: data?.id ?? null, settings: normalizeDesign(data?.settings) };
}

export function applyDesign(settings: DesignSettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const pairs: Record<string, string> = {
    "--background": settings.background, "--foreground": settings.foreground, "--card": settings.surface,
    "--card-foreground": settings.foreground, "--popover": settings.surface, "--popover-foreground": settings.foreground,
    "--primary": settings.foreground, "--primary-foreground": settings.background,
    "--secondary": settings.surface, "--secondary-foreground": settings.foreground,
    "--muted": settings.surface, "--muted-foreground": settings.muted,
    "--accent": settings.accent, "--accent-foreground": settings.foreground,
    "--border": settings.border, "--input": settings.border, "--ring": settings.accent,
    "--sidebar": settings.sidebar, "--sidebar-foreground": settings.sidebarText,
    "--sidebar-primary": settings.accent, "--sidebar-primary-foreground": settings.sidebar,
    "--sidebar-accent": settings.foreground, "--sidebar-accent-foreground": settings.sidebarText,
    "--sidebar-border": settings.muted, "--sidebar-ring": settings.accent,
    "--font-serif": `"${settings.headingFont}", Georgia, serif`,
    "--font-sans": `"${settings.bodyFont}", system-ui, sans-serif`,
    "--design-heading-scale": String(settings.headingSize / 100),
    "--design-body-scale": String(settings.bodySize / 100),
  };
  for (const [key, value] of Object.entries(pairs)) root.style.setProperty(key, value);
  root.dataset.designStyle = settings.backgroundStyle;
  root.dataset.pageColors = JSON.stringify(settings.pageBackgrounds);
  const image = settings.backgroundImage;
  root.style.setProperty("--design-image", image ? `url("${image.replace(/["\\]/g, "")}")` : "none");
  const path = window.location.pathname;
  const page = path.startsWith("/sezione/") ? "/sezione" : path === "/admin" || path.startsWith("/admin/") ? "" : path;
  root.style.setProperty("--design-page-background", settings.pageBackgrounds[page] || settings.background);
  window.dispatchEvent(new CustomEvent("site-design-applied", { detail: settings }));
}