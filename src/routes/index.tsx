import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import heroImg from "@/assets/hero-sala.jpg";
import { fetchHomeData, formatEventDate, type HomeImage } from "@/lib/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Giannino Bistrot Cafè" },
      { name: "description", content: "La storia della Giannino Bistrot Cafè, dal 1974: tradizione, cucina del focolare e ospitalità." },
      { property: "og:title", content: "Home — Giannino Bistrot Cafè" },
      { property: "og:description", content: "Dal 1974 custodi di una tradizione fatta di rito, cura e tempo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => fetchHomeData(),
  errorComponent: () => <p className="p-12 text-muted-foreground">Impossibile caricare la pagina.</p>,
  notFoundComponent: () => <p className="p-12">Pagina non trovata.</p>,
  component: Index,
});

function useSafe(html: string) {
  const [out, setOut] = useState(html);
  useEffect(() => { setOut(DOMPurify.sanitize(html)); }, [html]);
  return out;
}

function Gallery({ images, carousel, interval }: { images: HomeImage[]; carousel: boolean; interval: number }) {
  const list = images.length ? images : [{ id: "d", url: heroImg, alt: "Sala interna della Giannino Bistrot Cafè", path: null, sort_order: 0, visible: true }];
  const shown = carousel ? list : list.slice(0, 1);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (shown.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % shown.length), Math.max(2, interval) * 1000);
    return () => clearInterval(t);
  }, [shown.length, interval]);
  return (
    <figure className="relative p-3 border border-border bg-card shadow-2xl shadow-foreground/10">
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        {shown.map((img, idx) => (
          <img key={img.id} src={img.url} alt={img.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
      {shown.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {shown.map((s, idx) => (
            <button key={s.id} aria-label={`Immagine ${idx + 1}`} onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full ${idx === i ? "bg-card" : "bg-card/50"}`} />
          ))}
        </div>
      )}
    </figure>
  );
}

function Index() {
  const { content, images, events } = Route.useLoaderData();
  const title = useSafe(content?.title_html ?? "<p>Stesse radici,<br><em>nuovo orizzonte.</em></p>");
  const body = useSafe(content?.body_html ?? "");

  return (
    <article className="px-6 md:px-16 lg:px-24 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="rich-content rich-title font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-foreground mb-10"
            dangerouslySetInnerHTML={{ __html: title }} />
          <div className="rich-content font-serif space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground font-light max-w-[58ch]"
            dangerouslySetInnerHTML={{ __html: body }} />
        </div>
        <div className="lg:col-span-5">
          <Gallery images={images} carousel={!!content?.carousel_enabled} interval={content?.carousel_interval ?? 5} />
        </div>
      </div>

      {events.length > 0 && (
        <section className="mt-20 md:mt-28">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Prossimamente</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mt-3">Eventi</h2>
          <div className="mt-6 h-px w-16 bg-accent" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <div key={ev.id} className="border border-border bg-card shadow-lg shadow-foreground/5">
                {ev.image_url && <img src={ev.image_url} alt={ev.title} className="w-full aspect-[4/3] object-cover" />}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-accent capitalize">{formatEventDate(ev.event_date)}{ev.event_time ? ` · ${ev.event_time}` : ""}</p>
                  <h3 className="font-serif text-2xl mt-2">{ev.title}</h3>
                  {ev.description && <p className="mt-3 text-muted-foreground whitespace-pre-line">{ev.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
