import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Eye, EyeOff, Trash2, Plus, Pencil, ImagePlus, Loader2 } from "lucide-react";
import { SortableList } from "@/components/SortableList";
import { RichTextEditor } from "@/components/RichTextEditor";
import { uploadHomeMedia, removeHomeMedia, formatEventDate, type HomeContent, type HomeImage, type EventRow } from "@/lib/home";

export function HomeManager() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [images, setImages] = useState<HomeImage[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<EventRow> | null>(null);

  const load = useCallback(async () => {
    const [c, i, e] = await Promise.all([
      supabase.from("home_content").select("*").limit(1).maybeSingle(),
      supabase.from("home_images").select("*").order("sort_order"),
      supabase.from("events").select("*").order("event_date", { ascending: false }),
    ]);
    setContent((c.data as HomeContent) ?? { id: "", title_html: "", body_html: "", carousel_enabled: false, carousel_interval: 5 });
    setImages((i.data as HomeImage[]) ?? []);
    setEvents((e.data as EventRow[]) ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const saveContent = async () => {
    if (!content) return;
    setSaving(true);
    const payload = { title_html: content.title_html, body_html: content.body_html, carousel_enabled: content.carousel_enabled, carousel_interval: content.carousel_interval };
    const { error } = content.id
      ? await supabase.from("home_content").update(payload).eq("id", content.id)
      : await supabase.from("home_content").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Home salvata");
    load();
  };

  const addImages = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      let order = images.length;
      for (const f of Array.from(files)) {
        const { path, url } = await uploadHomeMedia(f);
        const { error } = await supabase.from("home_images").insert({ url, path, alt: f.name.replace(/\.[^.]+$/, ""), sort_order: order++ });
        if (error) throw error;
      }
      toast.success("Immagini caricate");
      load();
    } catch (e) { toast.error((e as Error).message); }
    setUploading(false);
  };

  const reorderImages = async (next: HomeImage[]) => {
    setImages(next);
    await Promise.all(next.map((img, idx) => supabase.from("home_images").update({ sort_order: idx }).eq("id", img.id)));
  };

  if (!content) return <p className="text-muted-foreground">Caricamento…</p>;

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-serif text-2xl">Titolo</h2>
        <RichTextEditor value={content.title_html} onChange={(v) => setContent({ ...content, title_html: v })} minHeight={100} />
        <h2 className="font-serif text-2xl pt-4">Testo</h2>
        <RichTextEditor value={content.body_html} onChange={(v) => setContent({ ...content, body_html: v })} minHeight={320} />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif text-2xl">Immagini</h2>
          <label className="inline-flex">
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addImages(e.target.files); e.target.value = ""; }} />
            <span className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm cursor-pointer">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} Aggiungi immagini
            </span>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-6 rounded-md border border-border p-4">
          <div className="flex items-center gap-3">
            <Switch checked={content.carousel_enabled} onCheckedChange={(v) => setContent({ ...content, carousel_enabled: v })} id="car" />
            <Label htmlFor="car">Carosello automatico</Label>
          </div>
          <div className="flex items-center gap-2">
            <Label>Cambio ogni</Label>
            <Input type="number" min={2} max={30} className="w-20" value={content.carousel_interval}
              onChange={(e) => setContent({ ...content, carousel_interval: Math.max(2, Number(e.target.value) || 5) })} />
            <span className="text-sm text-muted-foreground">secondi</span>
          </div>
          <p className="text-xs text-muted-foreground w-full">Con il carosello spento viene mostrata solo la prima immagine visibile. Trascina per cambiare l'ordine.</p>
        </div>
        {images.length === 0 && <p className="text-sm text-muted-foreground">Nessuna immagine: viene mostrata la foto predefinita della sala.</p>}
        <SortableList
          items={images}
          onReorder={reorderImages}
          renderItem={(img) => (
            <div className="flex items-center gap-4 p-2 border border-border rounded-md bg-card">
              <img src={img.url} alt={img.alt} className="h-16 w-16 object-cover rounded" />
              <Input value={img.alt} placeholder="Descrizione"
                onChange={(e) => setImages(images.map((x) => x.id === img.id ? { ...x, alt: e.target.value } : x))}
                onBlur={(e) => supabase.from("home_images").update({ alt: e.target.value }).eq("id", img.id)} />
              <Button variant="ghost" size="icon" title={img.visible ? "Nascondi" : "Mostra"} onClick={async () => {
                await supabase.from("home_images").update({ visible: !img.visible }).eq("id", img.id); load();
              }}>{img.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}</Button>
              <Button variant="ghost" size="icon" title="Elimina" onClick={async () => {
                if (!confirm("Eliminare questa immagine?")) return;
                await supabase.from("home_images").delete().eq("id", img.id); await removeHomeMedia(img.path); load();
              }}><Trash2 className="h-4 w-4" /></Button>
            </div>
          )}
        />
      </section>

      <div className="sticky bottom-4 flex justify-end">
        <Button size="lg" onClick={saveContent} disabled={saving}>{saving ? "Salvataggio…" : "Salva testi e carosello"}</Button>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Eventi</h2>
          <Button onClick={() => setEditingEvent({ title: "", description: "", event_date: new Date().toISOString().slice(0, 10), event_time: "", visible: true })}>
            <Plus className="h-4 w-4 mr-1" /> Nuovo evento
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Gli eventi passati spariscono automaticamente dalla Home il giorno dopo.</p>
        {events.length === 0 && <p className="text-sm text-muted-foreground">Nessun evento.</p>}
        <div className="space-y-2">
          {events.map((ev) => {
            const past = ev.event_date < new Date().toISOString().slice(0, 10);
            return (
              <div key={ev.id} className={`flex items-center gap-4 p-2 border border-border rounded-md bg-card ${past ? "opacity-50" : ""}`}>
                {ev.image_url ? <img src={ev.image_url} alt="" className="h-14 w-14 object-cover rounded" /> : <div className="h-14 w-14 rounded bg-muted" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{ev.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{formatEventDate(ev.event_date)}{ev.event_time ? ` · ${ev.event_time}` : ""}{past ? " · passato" : ""}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={async () => { await supabase.from("events").update({ visible: !ev.visible }).eq("id", ev.id); load(); }}>
                  {ev.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setEditingEvent(ev)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={async () => {
                  if (!confirm("Eliminare questo evento?")) return;
                  await supabase.from("events").delete().eq("id", ev.id); await removeHomeMedia(ev.image_path); load();
                }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            );
          })}
        </div>
      </section>

      {editingEvent && <EventDialog ev={editingEvent} onClose={() => setEditingEvent(null)} onSaved={() => { setEditingEvent(null); load(); }} />}
    </div>
  );
}

function EventDialog({ ev, onClose, onSaved }: { ev: Partial<EventRow>; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState(ev);
  const [busy, setBusy] = useState(false);

  const pickImage = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const { path, url } = await uploadHomeMedia(file);
      setF((p) => ({ ...p, image_url: url, image_path: path }));
    } catch (e) { toast.error((e as Error).message); }
    setBusy(false);
  };

  const save = async () => {
    if (!f.title?.trim() || !f.event_date) return toast.error("Titolo e data sono obbligatori");
    setBusy(true);
    const payload = { title: f.title.trim(), description: f.description ?? "", event_date: f.event_date, event_time: f.event_time ?? "", image_url: f.image_url ?? null, image_path: f.image_path ?? null, visible: f.visible ?? true };
    const { error } = f.id ? await supabase.from("events").update(payload).eq("id", f.id) : await supabase.from("events").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    if (ev.image_path && ev.image_path !== f.image_path) await removeHomeMedia(ev.image_path);
    toast.success("Evento salvato");
    onSaved();
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>{f.id ? "Modifica evento" : "Nuovo evento"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Titolo</Label><Input value={f.title ?? ""} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Data</Label><Input type="date" value={f.event_date ?? ""} onChange={(e) => setF({ ...f, event_date: e.target.value })} /></div>
            <div><Label>Orario</Label><Input placeholder="es. 19:30" value={f.event_time ?? ""} onChange={(e) => setF({ ...f, event_time: e.target.value })} /></div>
          </div>
          <div><Label>Descrizione</Label><Textarea rows={4} value={f.description ?? ""} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <div className="space-y-2">
            <Label>Foto</Label>
            {f.image_url && <img src={f.image_url} alt="" className="h-32 w-full object-cover rounded" />}
            <div className="flex gap-2">
              <Input type="file" accept="image/*" onChange={(e) => pickImage(e.target.files?.[0])} />
              {f.image_url && <Button variant="outline" onClick={() => setF({ ...f, image_url: null, image_path: null })}>Rimuovi</Button>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annulla</Button>
          <Button onClick={save} disabled={busy}>{busy ? "Attendi…" : "Salva"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
