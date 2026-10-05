import { supabase } from "@/integrations/supabase/client";

export type DesignSettings = {
  preset: "classico" | "editoriale" | "contemporaneo";
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
  backgroundStyle: "plain" | "paper" | "lines";
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
};

export const DESIGN_PAGES = [
  { path: "/", label: "Home" }, { path: "/menu", label: "Menù" }, { path: "/caffetteria", label: "Caffetteria" },
  { path: "/drink", label: "Drink List" }, { path: "/vini", label: "Carta dei Vini" },
  { path: "/contatti", label: "Contatti" }, { path: "/sezione", label: "Altre sezioni" },
];

export const DESIGN_FONTS = ["Georgia", "Cormorant Garamond", "Playfair Display", "Lora", "Libre Baskerville", "Inter", "Montserrat"];
const colorOk = (value: unknown): value is string => typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
const imageOk = (value: unknown): value is string => typeof value === "string" && (value === "" || /^https:\/\//.test(value));

export function normalizeDesign(input: unknown): DesignSettings {
  const raw = input && typeof input === "object" ? input as Partial<DesignSettings> : {};
  const result: DesignSettings = { ...DESIGN_DEFAULTS, pageBackgrounds: {} };
  for (const key of ["background", "foreground", "muted", "surface", "accent", "sidebar", "sidebarText", "border"] as const) {
    if (colorOk(raw[key])) result[key] = raw[key];
  }
  if (raw.preset && raw.preset in DESIGN_PRESETS) result.preset = raw.preset;
  if (raw.backgroundStyle === "plain" || raw.backgroundStyle === "paper" || raw.backgroundStyle === "lines") result.backgroundStyle = raw.backgroundStyle;
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