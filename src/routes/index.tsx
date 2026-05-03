import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-sala.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Giannino Bistrot Cafè" },
      { name: "description", content: "La storia della Giannino Bistrot Cafè, dal 1974: tradizione toscana, cucina del focolare e ospitalità." },
      { property: "og:title", content: "Home — Giannino Bistrot Cafè" },
      { property: "og:description", content: "Dal 1974 custodi di una tradizione toscana fatta di rito, cura e tempo." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <article className="px-6 md:px-16 lg:px-24 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-balance text-foreground mb-10">
            Stesse radici,<br />
            <em className="text-accent">nuovo orizzonte.</em>
          </h1>
          <div className="font-serif space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground font-light max-w-[58ch]">
            <p className="text-pretty font-light">
              Accanto alla tradizione, nasce un nuovo gusto.
            </p>
            <p className="text-pretty">
              C'est la Trattoria che conoscete da cinquant'anni, e da oggi c'è un nuovo posto dove incontrarsi.
            </p>
            <p className="text-pretty text-justify">
              Siamo orgogliosi di presentarvi il nostro Bistrot: il luogo dove la nostra storia dal 1974 incontra la contemporaneità.
            </p>
            <p className="text-pretty text-justify">
              Colazione, brunch, pranzo, lounge e aperitivi. Atmosfera curata, sapori ricercati e un'accoglienza che ti fa sentire sempre al posto giusto.
            </p>
            <p className="text-pretty text-justify">
              Benvenuti a questa tavola di antiche radici, nate nel lontano 1974 dal garbo di Giannino e dal cuore di Maria. Qui, dove l'arte della ceramica incontra la passione per la buona cucina, la Musa dipinta sui nostri tavoli si fa custode dei nostri segreti e porta con grazia sul capo i simboli della nostra storia: il polpo, ricordo di Giannino giovanissimo pescatore; il pollo, protagonista dei sui celebri spiedi; le mani infarinate di Maria, pilastro della nostra cucina, che trasformava gesti semplici in riti immortali.
            </p>
            <p className="text-pretty text-justify">
              Da lei abbiamo imparato l'arte delle torte della nonna e la sapienza della storica salsa alla Giuseppina, una ricetta che profuma ancora oggi i nostri piatti di famiglia. Qui, tra i vecchi ricordi di sarde, pomodori e cannoli o tra le pennellate di verderame e ocra del nostro design, potete gustare, un boccone alla volta, l'evoluzione gentile della nostra cucina, cultura del gusto e simbolo d'ospitalità.
            </p>
            <p className="text-pretty italic text-right">
              Elena e Mario
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure className="relative p-3 border border-border bg-card shadow-2xl shadow-foreground/10">
            <img
              src={heroImg}
              alt="Sala interna della Giannino Bistrot Cafè al tramonto"
              width={1024}
              height={1280}
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-3 bg-accent/10 mix-blend-overlay pointer-events-none" />
          </figure>
        </div>
      </div>
    </article>
  );
}
