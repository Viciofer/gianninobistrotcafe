import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-sala.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Storia — Tenuta Corsini" },
      { name: "description", content: "La storia della Tenuta Corsini, dal 1924: tradizione toscana, cucina del focolare e ospitalità." },
      { property: "og:title", content: "Storia — Tenuta Corsini" },
      { property: "og:description", content: "Dal 1924 custodi di una tradizione toscana fatta di rito, cura e tempo." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <article className="px-6 md:px-16 lg:px-24 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
            Capitolo I — Identità
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-balance text-foreground mb-10">
            Il peso del tempo,<br />
            <em className="text-accent">la leggerezza del lino.</em>
          </h1>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground font-light max-w-[58ch]">
            <p className="text-pretty">
              Dal 1924, le mura di questa tenuta custodiscono molto più che semplici ricette.
              Ogni piatto che esce dalla nostra cucina è un frammento di storia toscana, un atto
              di devozione verso una terra aspra e generosa. Non chiediamo ai nostri ospiti di
              consumare un pasto, ma di partecipare a un rito di famiglia.
            </p>
            <p className="text-pretty">
              Il focolare a legna, l'argenteria d'epoca, le tovaglie in lino grezzo: non sono
              vezzi estetici ma ancore sensoriali che legano il presente al nostro passato.
              Ogni membro dello staff è un custode silenzioso di questa atmosfera.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-px bg-border border border-border">
            {[
              { k: "Fondazione", v: "1924" },
              { k: "Coperti", v: "45" },
              { k: "Etichette", v: "1.480" },
            ].map((s) => (
              <div key={s.k} className="bg-card p-5">
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{s.k}</div>
                <div className="font-serif text-2xl text-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure className="relative p-3 border border-border bg-card shadow-2xl shadow-foreground/10">
            <img
              src={heroImg}
              alt="Sala interna della Tenuta Corsini al tramonto"
              width={1024}
              height={1280}
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-3 bg-accent/10 mix-blend-overlay pointer-events-none" />
            <figcaption className="mt-3 text-center text-xs tracking-[0.25em] uppercase text-muted-foreground italic font-serif">
              Sala dei Ritratti
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}
