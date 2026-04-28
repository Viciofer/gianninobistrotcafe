import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  lat: number;
  lng: number;
  label: string;
  zoom?: number;
};

export function InteractiveMap({ lat, lng, label, zoom = 16 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom,
      scrollWheelZoom: true,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: "",
      html: `<div style="
        width:18px;height:18px;border-radius:9999px;
        background:var(--accent,#b8895a);
        border:3px solid #fff;
        box-shadow:0 0 0 2px var(--accent,#b8895a),0 4px 12px rgba(0,0,0,.35);
      "></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    L.marker([lat, lng], { icon })
      .addTo(map)
      .bindPopup(label)
      .openPopup();

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, zoom, label]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}