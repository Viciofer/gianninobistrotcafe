import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

type ContactInfo = {
  address_line1: string;
  address_line2: string;
  phone: string;
  email: string;
  instagram_handle: string;
  instagram_url: string;
  maps_pin_address: string;
  schedule_main: string;
  schedule_note: string;
};

const FALLBACK: ContactInfo = {
  address_line1: "Via Nazionale, 34",
  address_line2: "98077 Santo Stefano di Camastra (ME)",
  phone: "0921 995719",
  email: "gianninobistrotcafe@gmail.com",
  instagram_handle: "@giannino.bistrot",
  instagram_url: "https://www.instagram.com/giannino.bistrot/",
  maps_pin_address: "Via Nazionale, 38, 98077 Santo Stefano di Camastra ME",
  schedule_main: "Lunedì – Domenica",
  schedule_note: "Giovedì chiuso",
};

function ContattiPage() {
  const [info, setInfo] = useState<ContactInfo>(FALLBACK);

  useEffect(() => {
    supabase
      .from("contact_info")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setInfo(data as ContactInfo);
      });
  }, []);

  const query = encodeURIComponent(info.maps_pin_address);
  const mapsEmbed = "https://maps.google.com/maps?q=" + query + "&t=&z=18&ie=UTF8&iwloc=&output=embed";
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=" + query;

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <PageHeader title="Contatti" />

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="space-y-10">
          <div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-accent mt-1 shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                  Dove siamo
                </p>
                {info.address_line1 && (
                  <p className="font-serif text-xl text-foreground leading-snug">{info.address_line1}</p>
                )}
                {info.address_line2 && (
                  <p className="font-serif text-xl text-foreground leading-snug">{info.address_line2}</p>
                )}
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

          {info.phone && (
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-accent mt-1 shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                  Telefono
                </p>
                <a
                  href={`tel:${info.phone.replace(/\s/g, "")}`}
                  className="font-serif text-xl text-foreground hover:text-accent transition-colors"
                >
                  {info.phone}
                </a>
              </div>
            </div>
          )}

          {info.email && (
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-accent mt-1 shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${info.email}`}
                  className="font-serif text-xl text-foreground hover:text-accent transition-colors"
                >
                  {info.email}
                </a>
              </div>
            </div>
          )}

          {info.instagram_handle && (
            <div className="flex items-start gap-4">
              <Instagram className="h-5 w-5 text-accent mt-1 shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                  Instagram
                </p>
                <a
                  href={info.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-serif text-xl text-foreground hover:text-accent transition-colors"
                >
                  {info.instagram_handle}
                </a>
              </div>
            </div>
          )}

          {(info.schedule_main || info.schedule_note) && (
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-accent mt-1 shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                  Quando siamo aperti
                </p>
                <ul className="font-serif text-base text-foreground space-y-1">
                  {info.schedule_main && <li>{info.schedule_main}</li>}
                  {info.schedule_note && (
                    <li className="text-muted-foreground text-sm pt-1">{info.schedule_note}</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            La nostra posizione
          </p>
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden border border-border bg-muted">
            <iframe
              title="Mappa Giannino Bistrot Cafè"
              src={mapsEmbed}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
