import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ClientOnly } from "@tanstack/react-router";
import { InteractiveMap } from "@/components/InteractiveMap";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — Giannino Bistrot Cafè" },
      { name: "description", content: "Contatti, indirizzo e mappa della Giannino Bistrot Cafè a Santo Stefano di Camastra (ME)." },
      { property: "og:title", content: "Contatti — Giannino Bistrot Cafè" },
      { property: "og:description", content: "Vieni a trovarci in Via Nazionale 34, Santo Stefano di Camastra (ME)." },
    ],
  }),
  component: ContattiPage,
});

const indirizzo = "Via Nazionale, 34, 98077 Santo Stefano di Camastra ME";
const telefono = "0921 995719";
const email = "info@tenutacorsini.it";

// Coordinate Via Nazionale 34, Santo Stefano di Camastra (ME)
const LAT = 38.0179;
const LNG = 14.3528;
const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(indirizzo);

function ContattiPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <PageHeader
        chapter="Capitolo V"
        title="Contatti"
        subtitle="Per prenotazioni, eventi privati o semplicemente per salutarci. Saremo lieti di accogliervi."
      />

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="space-y-10">
          <div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-accent mt-1 shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                  Dove siamo
                </p>
                <p className="font-serif text-xl text-foreground leading-snug">
                  Via Nazionale, 34
                </p>
                <p className="font-serif text-xl text-foreground leading-snug">
                  98077 Santo Stefano di Camastra (ME)
                </p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-xs tracking-[0.2em] uppercase text-accent hover:underline underline-offset-4"
                >
                  Indicazioni stradali →
                </a>
              </div>
            </div>
          </div>

          <div className="h-px w-16 bg-accent" />

          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-accent mt-1 shrink-0" />
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                Telefono
              </p>
              <a
                href={`tel:${telefono.replace(/\s/g, "")}`}
                className="font-serif text-xl text-foreground hover:text-accent transition-colors"
              >
                {telefono}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-accent mt-1 shrink-0" />
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="font-serif text-xl text-foreground hover:text-accent transition-colors"
              >
                {email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="h-5 w-5 text-accent mt-1 shrink-0" />
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                Orari
              </p>
              <ul className="font-serif text-base text-foreground space-y-1">
                <li>Martedì – Domenica · 12:30 – 15:00</li>
                <li>Martedì – Domenica · 19:30 – 23:00</li>
                <li className="text-muted-foreground text-sm pt-1">Lunedì chiuso</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            La nostra posizione
          </p>
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden border border-border bg-muted z-0">
            <ClientOnly fallback={<div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">Caricamento mappa…</div>}>
              <InteractiveMap
                lat={LAT}
                lng={LNG}
                label="Giannino Bistrot Cafè · Via Nazionale 34"
              />
            </ClientOnly>
          </div>
          <a
            href={mapsLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-xs tracking-[0.2em] uppercase text-accent hover:underline underline-offset-4"
          >
            Apri in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}
