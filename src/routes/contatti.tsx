import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import {
  MapPin, Phone, Mail, Clock, Instagram, Info,
  Facebook, Globe, MessageCircle, Calendar, User, Star, Heart, Tag,
  type LucideIcon,
} from "lucide-react";
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
  maps_pin_address: string;
};

type ContactItem = {
  id: string;
  label: string;
  value: string;
  href: string | null;
  icon: string;
  sort_order: number;
};

const FALLBACK_INFO: ContactInfo = {
  address_line1: "Via Nazionale, 34",
  address_line2: "98077 Santo Stefano di Camastra (ME)",
  maps_pin_address: "Via Nazionale, 38, 98077 Santo Stefano di Camastra ME",
};

export const ICON_MAP: Record<string, LucideIcon> = {
  Phone, Mail, Instagram, Clock, Info, MapPin,
  Facebook, Globe, MessageCircle, Calendar, User, Star, Heart, Tag,
};

function ContattiPage() {
  const [info, setInfo] = useState<ContactInfo>(FALLBACK_INFO);
  const [items, setItems] = useState<ContactItem[]>([]);

  useEffect(() => {
    supabase
      .from("contact_info")
      .select("address_line1,address_line2,maps_pin_address")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setInfo(data as ContactInfo);
      });
    supabase
      .from("contact_items")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setItems(data as ContactItem[]);
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

          {items.length > 0 && <div className="h-px w-16 bg-accent" />}

          {items.map((it) => {
            const Icon = ICON_MAP[it.icon] ?? Info;
            const content = (
              <span className="font-serif text-xl text-foreground hover:text-accent transition-colors">
                {it.value}
              </span>
            );
            return (
              <div key={it.id} className="flex items-start gap-4">
                <Icon className="h-5 w-5 text-accent mt-1 shrink-0" />
                <div>
                  {it.label && (
                    <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                      {it.label}
                    </p>
                  )}
                  {it.href ? (
                    <a
                      href={it.href}
                      target={it.href.startsWith("http") ? "_blank" : undefined}
                      rel={it.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              </div>
            );
          })}
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
