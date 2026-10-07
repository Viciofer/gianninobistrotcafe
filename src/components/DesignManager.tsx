import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, RotateCcw, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadHomeMedia } from "@/lib/home";
import { applyDesign, DESIGN_DEFAULTS, DESIGN_FONTS, DESIGN_PAGES, DESIGN_PRESETS, PALETTE_GROUPS, PRESET_LABELS, fetchDesign, type DesignSettings } from "@/lib/site-design";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DesignPreview } from "@/components/DesignPreview";

const colors: { key: keyof DesignSettings; label: string }[] = [
  { key: "background", label: "Sfondo del sito" }, { key: "surface", label: "Superfici" },
  { key: "foreground", label: "Testo principale" }, { key: "muted", label: "Testo secondario" },
  { key: "accent", label: "Colore d'accento" }, { key: "border", label: "Bordi" },
  { key: "sidebar", label: "Menù laterale" }, { key: "sidebarText", label: "Testo del menù" },
];

export function DesignManager() {
  const [settings, setSettings] = useState<DesignSettings>(DESIGN_DEFAULTS);
  const [id, setId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<"logo" | "background" | null>(null);

  useEffect(() => {
    fetchDesign().then(({ id, settings }) => { setId(id); setSettings(settings); }).catch(() => toast.error("Impossibile caricare il design"));
  }, []);

  const update = (patch: Partial<DesignSettings>) => setSettings((prev) => ({ ...prev, ...patch }));

  const save = async () => {
    setBusy(true);
    const payload = { settings: JSON.parse(JSON.stringify(settings)), updated_at: new Date().toISOString() };
    const result = id
      ? await supabase.from("site_design").update(payload).eq("id", id).select("id").single()
      : await supabase.from("site_design").insert(payload).select("id").single();
    setBusy(false);
    if (result.error) return toast.error(result.error.message);
    setId(result.data?.id ?? null);
    applyDesign(settings);
    window.dispatchEvent(new Event("site-design-changed"));
    toast.success("Design applicato a tutto il sito");
  };

  const upload = async (file: File | undefined, target: "logo" | "background") => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Scegli un'immagine");
    if (file.size > 10 * 1024 * 1024) return toast.error("Dimensione massima: 10 MB");
    setUploading(target);
    try {
      const { path, url } = await uploadHomeMedia(file);
      update(target === "logo" ? { logoUrl: url, logoPath: path } : { backgroundImage: url, backgroundPath: path });
      toast.success("Immagine pronta: premi Salva per applicarla");
    } catch (error) { toast.error((error as Error).message); }
    setUploading(null);
  };

  const reset = () => {
    if (confirm("Ripristinare il design originale? Le modifiche non saranno applicate finché non premi Salva.")) setSettings({ ...DESIGN_DEFAULTS, pageBackgrounds: {} });
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <h2 className="min-w-0 font-serif text-2xl">Design del sito</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={reset}><RotateCcw className="h-4 w-4 mr-2" />Ripristina</Button>
          <Button onClick={save} disabled={busy}><Save className="h-4 w-4 mr-2" />{busy ? "Salvataggio…" : "Salva e applica"}</Button>
        </div>
      </div>

      <DesignPreview settings={settings} />

      <section className="space-y-4 border-t border-border pt-6">
        <h3 className="font-serif text-xl">Stili</h3>
        <p className="text-sm text-muted-foreground">Ogni stile cambia insieme colori, caratteri e sfondo.</p>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {(Object.keys(DESIGN_PRESETS) as DesignSettings["preset"][]).map((preset) => {
            const p = DESIGN_PRESETS[preset];
            return (
              <button key={preset} type="button" onClick={() => update({ ...p, preset })} className={`rounded-md border p-3 text-left transition ${settings.preset === preset ? "border-accent ring-2 ring-accent" : "border-border hover:border-accent"}`} style={{ background: p.background, color: p.foreground }}>
                <span className="block text-lg leading-tight" style={{ fontFamily: `"${p.headingFont}", serif` }}>{PRESET_LABELS[preset]}</span>
                <span className="block text-xs mt-1" style={{ fontFamily: `"${p.bodyFont}", sans-serif`, color: p.muted }}>{p.headingFont} · {p.bodyFont}</span>
                <span className="mt-2 flex gap-1">{[p.sidebar, p.accent, p.surface].map((c, i) => <span key={i} className="h-3 w-6 rounded-sm border border-border" style={{ background: c }} />)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-5 border-t border-border pt-6">
        <h3 className="font-serif text-xl">Palette di colori</h3>
        <p className="text-sm text-muted-foreground">Cambia solo i colori, mantenendo caratteri e sfondo.</p>
        {PALETTE_GROUPS.map(({ group, palettes }) => (
          <div key={group} className="space-y-2">
            <h4 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{group}</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {palettes.map(({ name, colors: c }) => {
                const active = c.background === settings.background && c.accent === settings.accent && c.foreground === settings.foreground;
                return (
                  <button key={name} type="button" onClick={() => update(c)} className={`rounded-md border overflow-hidden text-left transition ${active ? "border-accent ring-2 ring-accent" : "border-border hover:border-accent"}`}>
                    <div className="flex h-10">{[c.background, c.surface, c.accent, c.muted, c.foreground, c.sidebar].map((col, i) => <span key={i} className="flex-1" style={{ background: col }} />)}</div>
                    <div className="px-3 py-2 text-sm" style={{ background: c.background, color: c.foreground }}>{name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-5 border-t border-border pt-6">
        <h3 className="font-serif text-xl">Colori</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={`design-${key}`}>{label}</Label>
              <div className="flex items-center gap-2 border border-border bg-card px-2 py-1 rounded-sm">
                <input id={`design-${key}`} type="color" value={String(settings[key])} onChange={(e) => update({ [key]: e.target.value })} className="h-9 w-11 cursor-pointer border-0 bg-transparent" />
                <span className="text-sm font-mono text-muted-foreground">{String(settings[key]).toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5 border-t border-border pt-6">
        <h3 className="font-serif text-xl">Caratteri</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {([ ["headingFont", "Titoli"], ["bodyFont", "Testi"] ] as const).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{label}</Label>
              <select id={key} value={settings[key]} onChange={(e) => update({ [key]: e.target.value })} className="h-10 w-full rounded-sm border border-input bg-background px-3 text-foreground">
                {DESIGN_FONTS.map((font) => <option value={font} key={font}>{font}</option>)}
              </select>
            </div>
          ))}
          {([ ["headingSize", "Dimensione titoli", 70, 150], ["bodySize", "Dimensione testi", 80, 130] ] as const).map(([key, label, min, max]) => (
            <div key={key} className="space-y-3">
              <Label>{label} · {settings[key]}%</Label>
              <Slider value={[settings[key]]} min={min} max={max} step={5} onValueChange={([value]) => { if (value !== undefined) update({ [key]: value }); }} aria-label={label} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5 border-t border-border pt-6">
        <h3 className="font-serif text-xl">Sfondi</h3>
        <div className="flex flex-wrap gap-2">
          {([ ["plain", "Tinta unita"], ["paper", "Carta"], ["lines", "Righe sottili"], ["dots", "Puntinato"], ["grid", "Griglia"] ] as const).map(([value, label]) => (
            <Button key={value} variant={settings.backgroundStyle === value ? "default" : "outline"} onClick={() => update({ backgroundStyle: value })}>{label}</Button>
          ))}
        </div>
        <ImageControl title="Immagine di sfondo" url={settings.backgroundImage} uploading={uploading === "background"} onUpload={(file) => upload(file, "background")} onRemove={() => update({ backgroundImage: "", backgroundPath: "" })} />
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Sfondo per pagina</h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DESIGN_PAGES.map(({ path, label }) => (
              <div key={path} className="flex items-center justify-between gap-3 border-b border-border py-2">
                <Label htmlFor={`page-${label}`}>{label}</Label>
                <div className="flex gap-1 items-center">
                  <input id={`page-${label}`} type="color" value={settings.pageBackgrounds[path] || settings.background} onChange={(e) => update({ pageBackgrounds: { ...settings.pageBackgrounds, [path]: e.target.value } })} className="h-8 w-10 cursor-pointer" />
                  {settings.pageBackgrounds[path] && <Button size="icon" variant="ghost" title="Usa sfondo generale" onClick={() => { const next = { ...settings.pageBackgrounds }; delete next[path]; update({ pageBackgrounds: next }); }}><RotateCcw className="h-4 w-4" /></Button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5 border-t border-border pt-6">
        <h3 className="font-serif text-xl">Logo</h3>
        <ImageControl title="Logo nell'intestazione e nel menù" url={settings.logoUrl} uploading={uploading === "logo"} onUpload={(file) => upload(file, "logo")} onRemove={() => update({ logoUrl: "", logoPath: "" })} />
      </section>

      <div className="flex justify-end border-t border-border pt-6"><Button onClick={save} disabled={busy}><Save className="h-4 w-4 mr-2" />Salva e applica</Button></div>
    </div>
  );
}

function ImageControl({ title, url, uploading, onUpload, onRemove }: { title: string; url: string; uploading: boolean; onUpload: (file?: File) => void; onRemove: () => void }) {
  return (
    <div className="space-y-2">
      <Label>{title}</Label>
      <div className="flex flex-wrap items-center gap-4">
        {url && <img src={url} alt={title} className="h-20 w-20 object-contain border border-border bg-card" />}
        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="sr-only" onChange={(e) => { onUpload(e.target.files?.[0]); e.target.value = ""; }} />
          <span className="inline-flex h-9 items-center gap-2 border border-border px-3 text-sm rounded-sm hover:bg-muted"><ImagePlus className="h-4 w-4" />{uploading ? "Caricamento…" : url ? "Sostituisci" : "Carica immagine"}</span>
        </label>
        {url && <Button variant="ghost" size="icon" title="Rimuovi immagine" onClick={onRemove}><Trash2 className="h-4 w-4" /></Button>}
      </div>
    </div>
  );
}