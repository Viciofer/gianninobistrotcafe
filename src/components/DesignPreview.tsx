import { useCallback, useEffect, useRef, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DesignSettings } from "@/lib/site-design";

export function DesignPreview({ settings }: { settings: DesignSettings }) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [availableWidth, setAvailableWidth] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const width = device === "desktop" ? 1440 : 390;
  const scale = Math.min(1, availableWidth / width);
  const height = device === "desktop" ? 900 : 844;

  const updatePreview = useCallback(() => {
    frame.current?.contentWindow?.postMessage({ type: "giannino-design-preview", settings }, window.location.origin);
  }, [settings]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setAvailableWidth(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    updatePreview();
    const ready = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.source === frame.current?.contentWindow && event.data?.type === "giannino-preview-ready") updatePreview();
    };
    window.addEventListener("message", ready);
    return () => window.removeEventListener("message", ready);
  }, [updatePreview]);

  return (
    <section className="space-y-4 border-t border-border pt-6" aria-label="Anteprima della homepage">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h3 className="min-w-0 font-serif text-xl">Anteprima Home</h3>
        <div className="flex shrink-0 gap-1" role="group" aria-label="Formato anteprima">
          <Button size="sm" variant={device === "desktop" ? "default" : "outline"} aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")} title="Anteprima desktop">
            <Monitor /><span className="hidden sm:inline">Desktop</span>
          </Button>
          <Button size="sm" variant={device === "mobile" ? "default" : "outline"} aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")} title="Anteprima mobile">
            <Smartphone /><span className="hidden sm:inline">Mobile</span>
          </Button>
        </div>
      </div>
      <div ref={container} className="w-full min-w-0 overflow-hidden rounded-md border border-border bg-muted">
        <div className="relative mx-auto overflow-hidden" style={{ width: availableWidth ? width * scale : "100%", height: availableWidth ? height * scale : 320 }}>
          <iframe ref={frame} src="/" title="Anteprima Home Giannino" onLoad={updatePreview} className="absolute left-0 top-0 border-0 bg-background" style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left", visibility: availableWidth ? "visible" : "hidden" }} />
        </div>
      </div>
    </section>
  );
}