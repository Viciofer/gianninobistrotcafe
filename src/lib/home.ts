import { supabase } from "@/integrations/supabase/client";

export type HomeContent = { id: string; title_html: string; body_html: string; carousel_enabled: boolean; carousel_interval: number };
export type HomeImage = { id: string; url: string; path: string | null; alt: string; sort_order: number; visible: boolean };
export type EventRow = { id: string; title: string; description: string; event_date: string; event_time: string; image_url: string | null; image_path: string | null; visible: boolean };

export async function fetchHomeData() {
  const [c, i, e] = await Promise.all([
    supabase.from("home_content").select("*").limit(1).maybeSingle(),
    supabase.from("home_images").select("*").eq("visible", true).order("sort_order"),
    supabase.from("events").select("*").eq("visible", true).gte("event_date", new Date().toISOString().slice(0, 10)).order("event_date"),
  ]);
  return {
    content: (c.data as HomeContent | null) ?? null,
    images: (i.data as HomeImage[] | null) ?? [],
    events: (e.data as EventRow[] | null) ?? [],
  };
}

/** Upload to the private bucket and return a long-lived signed URL. */
export async function uploadHomeMedia(file: File) {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const up = await supabase.storage.from("home-media").upload(path, file, { contentType: file.type });
  if (up.error) throw up.error;
  const s = await supabase.storage.from("home-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 20);
  if (s.error || !s.data) throw s.error ?? new Error("URL non disponibile");
  return { path, url: s.data.signedUrl };
}

export async function removeHomeMedia(path: string | null) {
  if (path) await supabase.storage.from("home-media").remove([path]);
}

export function formatEventDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
