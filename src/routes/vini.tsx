import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/vini")({
  head: () => ({
    meta: [
      { title: "Carta dei Vini — Giannino Bistrot Cafè" },
      { name: "description", content: "Champagne, spumanti, bianchi, rosati e rossi italiani e internazionali selezionati per la Giannino Bistrot Cafè." },
      { property: "og:title", content: "Carta dei Vini — Giannino Bistrot Cafè" },
      { property: "og:description", content: "La nostra selezione di etichette: Champagne, bollicine, bianchi, rosati e rossi." },
    ],
  }),
  component: ViniPage,
});

type Vino = { name: string; desc?: string; price: string };
type SottoSezione = { titolo?: string; vini: Vino[] };
type Macro = { id: string; titolo: string; sottosezioni: SottoSezione[] };

const carta: Macro[] = [
  {
    id: "champagne",
    titolo: "Champagne",
    sottosezioni: [
      {
        vini: [
          { name: "L. Roederer — Brut", desc: "Chardonnay 42%, Pinot Noir 40%, Pinot Meunier 18%", price: "75" },
          { name: "L. Roederer — Brut Rosé", desc: "Pinot Noir 62%, Chardonnay 38%", price: "150" },
          { name: "L. Roederer — Cristal", desc: "Pinot Noir 60%, Chardonnay 40%", price: "350" },
          { name: "Legrand & Fils", desc: "Pinot Meunier 40%, Pinot Noir 30%, Chardonnay 30%", price: "60" },
        ],
      },
    ],
  },
  {
    id: "spumanti",
    titolo: "Spumanti",
    sottosezioni: [
      {
        vini: [
          { name: "Almerita — Brut", desc: "Chardonnay 100%", price: "45" },
          { name: "Almerita — Brut Rosé", desc: "Pinot Nero 100%", price: "55" },
          { name: "Berlucchi — Brut", desc: "Chardonnay 90%, Pinot Nero 10%", price: "40" },
          { name: "Berlucchi — Brut Rosé", desc: "Chardonnay 55%, Pinot Nero 45%", price: "45" },
          { name: "C. Milazzo — Dosaggio Zero Rosé", desc: "Chardonnay, Inzolia", price: "45" },
          { name: "C. Milazzo — Metodo Classico", desc: "Chardonnay, Inzolia", price: "35" },
          { name: "C. Milazzo — Riserva V38AG", desc: "Chardonnay, Inzolia", price: "58" },
          { name: "Casa Grazia — Euforia Brut Rosé", desc: "Frappato 100%", price: "26" },
          { name: "Letrari — Dosaggio Zero Trento DOC", desc: "Chardonnay 85%, Pinot Nero 15%", price: "45" },
          { name: "Miano Brut", desc: "Catarratto 100%", price: "23" },
          { name: "P. Costanzo — Brut", desc: "Carricante 100%", price: "45" },
          { name: "P. Costanzo — Brut Rosé", desc: "Nerello Mascalese 100%", price: "50" },
          { name: "Nino Franco — Prosecco superiore Valdobbiadene", desc: "Glera 100%", price: "25" },
        ],
      },
    ],
  },
  {
    id: "bianchi-sicilia",
    titolo: "Vini Bianchi · Sicilia",
    sottosezioni: [
      {
        vini: [
          { name: "C. Milazzo — Selezione di Famiglia", desc: "Chardonnay 100%", price: "45" },
          { name: "Cristo di Campobello — Adenzia", desc: "Grillo, Inzolia", price: "24" },
          { name: "Cristo di Campobello — CDC", desc: "Grillo, Inzolia, Catarratto, Chardonnay", price: "20" },
          { name: "Cristo di Campobello — Laluci", desc: "Grillo 100%", price: "25" },
          { name: "Hauner — Iancura", desc: "Malvasia delle Lipari, Carricante", price: "32" },
          { name: "Le Casematte — Peloro", desc: "Grillo, Carricante", price: "25" },
          { name: "Sallier de la Tour — Grillo", desc: "Grillo 100%", price: "25" },
          { name: "Sallier de la Tour — Inzolia", desc: "Inzolia 100%", price: "25" },
          { name: "Tasca d'Almerita — Buonsenso", desc: "Catarratto 100%", price: "25" },
          { name: "Tasca d'Almerita — Leone", desc: "Catarratto, Pinot Bianco, Sauvignon Blanc, Traminer Aromatico", price: "24" },
          { name: "Tasca d'Almerita — Mozia", desc: "Grillo 100%", price: "39" },
          { name: "Tasca d'Almerita — Nozze d'Oro", desc: "Inzolia, Sauvignon Tasca", price: "35" },
          { name: "Tasca d'Almerita — Vigna San Francesco", desc: "Chardonnay 100%", price: "64" },
          { name: "Vigna di Paola — Malvasia", desc: "Malvasia di Candia 100%", price: "39" },
        ],
      },
      {
        titolo: "Etna",
        vini: [
          { name: "Maugeri — Contrada Volpare", desc: "Carricante 100%", price: "45" },
          { name: "P. Costanzo — Bianco di Sei", desc: "Carricante 90%, Catarratto 10%", price: "39" },
          { name: "P. Costanzo — Contrada S. Spirito", desc: "Carricante 90%, Catarratto 10%", price: "55" },
          { name: "P. Costanzo — Mofete Bianco", desc: "Carricante 70%, Catarratto 30%", price: "29" },
          { name: "Tasca d'Almerita (Tascante) — Buonora Etna Bianco", desc: "Carricante 100%", price: "38" },
        ],
      },
    ],
  },
  {
    id: "bianchi-nazionali",
    titolo: "Vini Bianchi · Nazionali",
    sottosezioni: [
      { titolo: "Sardegna", vini: [
        { name: "Is Argiolas — Argiolas", desc: "100% Vermentino", price: "30" },
      ]},
      { titolo: "Molise", vini: [
        { name: "Di Majo Norante — Falanghina", desc: "100% Falanghina", price: "25" },
      ]},
      { titolo: "Abruzzo", vini: [
        { name: "La Valentina — Trebbiano d'Abruzzo", desc: "100% Trebbiano", price: "20" },
      ]},
      { titolo: "Marche", vini: [
        { name: "Cherri — Passerina", desc: "100% Passerina", price: "20" },
        { name: "Cherri — Pecorino", desc: "100% Pecorino", price: "22" },
        { name: "Massaccio — Verdicchio Classico Superiore", desc: "100% Verdicchio", price: "29" },
      ]},
      { titolo: "Toscana", vini: [
        { name: "Bibi Graetz — Casamatta Bianco", desc: "60% Vermentino, 30% Trebbiano, 10% Ansonica", price: "38" },
        { name: "Lungocosta — Bolgheri Bianco", desc: "Vermentino, Sauvignon, Trebbiano", price: "40" },
      ]},
      { titolo: "Friuli Venezia Giulia", vini: [
        { name: "Bastianich — Friulano", desc: "100% Friulano", price: "25" },
        { name: "Fondo Indizeno — Ribolla Gialla '24", desc: "100% Ribolla Gialla", price: "25" },
        { name: "Vistorta — Bianca", desc: "100% Friulano", price: "48" },
      ]},
      { titolo: "Veneto", vini: [
        { name: "Siro Merotto — In Un Sol Bianco Frizzante", desc: "100% Glera", price: "20" },
      ]},
      { titolo: "Piemonte", vini: [
        { name: "Marchesi di Gresy — Sauvignon", desc: "100% Sauvignon Blanc", price: "28" },
      ]},
      { titolo: "Valle d'Aosta", vini: [
        { name: "La Crotta di Vegneron — Chambave Muscat", desc: "100% Moscato Bianco", price: "24" },
      ]},
      { titolo: "Trentino Alto Adige", vini: [
        { name: "Pfitscher — Gewürztraminer", desc: "100% Gewürztraminer", price: "30" },
        { name: "Pfitscher — Müller Thurgau", desc: "100% Müller Thurgau", price: "25" },
        { name: "Putzenhof — Kerner '24", desc: "100% Kerner", price: "33" },
      ]},
    ],
  },
  {
    id: "bianchi-internazionali",
    titolo: "Vini Bianchi · Internazionali",
    sottosezioni: [
      { titolo: "Francia", vini: [
        { name: "Chapoutier — Belleruche Côte du Rhône", desc: "Grenache bianco, Clairette, Bourboulenc", price: "20" },
        { name: "De Ladoucette — Pouilly Fumé", desc: "100% Sauvignon Blanc", price: "48" },
        { name: "Delas — Muscat de Beaumes de Venise AOC", desc: "100% Moscato Bianco", price: "36" },
        { name: "Gran Regnard — Chablis", desc: "100% Chardonnay", price: "74" },
        { name: "Regnard — Bourgogne", desc: "100% Chardonnay", price: "40" },
        { name: "Schlumberger — Gewürztraminer (Alsazia)", desc: "100% Gewürztraminer", price: "38" },
      ]},
      { titolo: "Germania", vini: [
        { name: "Karl Loewen — Riesling", desc: "100% Riesling", price: "40" },
      ]},
      { titolo: "Nuova Zelanda", vini: [
        { name: "Craggy Range — Sauvignon Blanc", desc: "100% Sauvignon Blanc", price: "39" },
      ]},
      { titolo: "Australia", vini: [
        { name: "Saint & Scholar — Sauvignon Blanc", desc: "100% Sauvignon Blanc", price: "39" },
      ]},
    ],
  },
  {
    id: "rosati",
    titolo: "Vini Rosati",
    sottosezioni: [
      { vini: [
        { name: "C. Milazzo — Rosé di Rosa Frizzante", desc: "Inzolia Rosa, Chardonnay", price: "22" },
        { name: "Oro d'Etna (Vena Aetna) — Etna Rosato DOC '20", desc: "100% Nerello Mascalese", price: "35" },
        { name: "Tasca d'Almerita — Le Rose", desc: "100% Nerello Mascalese", price: "22" },
        { name: "Contizecca — Venus (Puglia)", desc: "70% Negroamaro, 30% Syrah", price: "20" },
        { name: "Tandem — Rosé (Marocco)", desc: "100% Syrah", price: "22" },
      ]},
    ],
  },
  {
    id: "rossi-sicilia",
    titolo: "Vini Rossi · Sicilia",
    sottosezioni: [
      { vini: [
        { name: "C. Milazzo — Maria Costanza Rosso", desc: "100% Nero d'Avola, 36 mesi in barrique", price: "43" },
        { name: "C. Milazzo — Terre della Baronia", desc: "100% Nero d'Avola", price: "28" },
        { name: "Castellucci Miano — Perricone", desc: "100% Perricone", price: "25" },
        { name: "Castellucci Miano — Syrah", desc: "100% Syrah", price: "22" },
        { name: "Cristo di Campobello — Adenzia", desc: "50% Nero d'Avola, 50% Syrah", price: "25" },
        { name: "CVA — Calio", desc: "100% Frappato", price: "20" },
        { name: "Gulfi — Nerojbleo", desc: "100% Nero d'Avola", price: "30" },
        { name: "Sallier de la Tour — La Monaca '22", desc: "100% Syrah", price: "39" },
        { name: "Sallier de la Tour — Nero d'Avola '23", desc: "100% Nero d'Avola", price: "25" },
        { name: "Tasca d'Almerita — Guarnaccio", desc: "100% Perricone", price: "25" },
        { name: "Tasca d'Almerita — Lamùri", desc: "100% Nero d'Avola", price: "25" },
        { name: "Tasca d'Almerita — Rosso del Conte", desc: "Nero d'Avola e Perricone", price: "50" },
        { name: "Tenuta S. Francesco — Cabernet Sauvignon '21", desc: "100% Cabernet Sauvignon", price: "65" },
      ]},
      { titolo: "Etna", vini: [
        { name: "Montenero — Etna Rosso DOC \"Armonia\" '24", desc: "90% Nerello Mascalese, 10% Nerello Cappuccio", price: "35" },
        { name: "Oro d'Etna (Vena Aetna) — Etna Rosso DOC 2020", desc: "100% Nerello Mascalese", price: "35" },
        { name: "Palmento Costanzo — Mofete Rosso", desc: "80% Nerello Mascalese, 20% Nerello Cappuccio", price: "29" },
        { name: "Palmento Costanzo — Contrada Santo Spirito Rosso", desc: "90% Nerello Mascalese, 10% Nerello Cappuccio", price: "55" },
        { name: "Tasca d'Almerita (Tascante) — Contrada Piano Dario", desc: "98% Nerello Mascalese, 2% Nerello Cappuccio", price: "75" },
        { name: "Tasca d'Almerita (Tascante) — Contrada Rampante", desc: "100% Nerello Mascalese", price: "75" },
        { name: "Tasca d'Almerita (Tascante) — Contrada Sciaranuova", desc: "100% Nerello Mascalese", price: "75" },
      ]},
    ],
  },
  {
    id: "rossi-nazionali",
    titolo: "Vini Rossi · Nazionali",
    sottosezioni: [
      { titolo: "Sardegna", vini: [
        { name: "Antichi Vigneti Manca — Romangia", desc: "100% Cannonau", price: "45" },
        { name: "Podere 45 — Cannonau Alghero Rosso '23", desc: "100% Cannonau", price: "28" },
        { name: "Punica — Barrua Isola dei Nuraghi", desc: "85% Carignano, 10% Cabernet S., 5% Merlot", price: "65" },
      ]},
      { titolo: "Calabria", vini: [
        { name: "Sergio Arcuri — Cirò Riserva", desc: "100% Gaglioppo", price: "45" },
      ]},
      { titolo: "Puglia", vini: [
        { name: "Pietre Giovanni — Primitivo '22", desc: "100% Primitivo", price: "25" },
      ]},
      { titolo: "Campania", vini: [
        { name: "De Conciliis — Donnaluna Aglianico '20", desc: "100% Aglianico", price: "28" },
        { name: "Luigi Tecce — Satyricon", desc: "100% Aglianico", price: "48" },
      ]},
      { titolo: "Abruzzo", vini: [
        { name: "Nicodemi — Montepulciano d'Abruzzo '22", desc: "100% Montepulciano", price: "25" },
      ]},
      { titolo: "Marche", vini: [
        { name: "S. Barbara — Stè Rosso Piceno '24", desc: "50% Montepulciano, 50% Sangiovese", price: "20" },
      ]},
      { titolo: "Toscana", vini: [
        { name: "Fabio Motta — Bolgheri Rosso", desc: "50% Merlot, 25% Cabernet S., 25% Sangiovese", price: "30" },
        { name: "Salcheto — Chianti Biskero '24", desc: "85% Sangiovese, 15% Canaiolo e Mammolo", price: "22" },
        { name: "Salcheto — Nobile di Montepulciano '22", desc: "100% Sangiovese", price: "35" },
        { name: "Salcheto — Rosso di Montepulciano '24", desc: "100% Sangiovese", price: "25" },
        { name: "San Leonino — Chianti Classico", desc: "100% Sangiovese", price: "25" },
        { name: "Tenuta San Guido — Guidalberto", desc: "60% Cabernet S., 40% Merlot", price: "85" },
        { name: "Tenuta San Guido — Le Difese", desc: "55% Sangiovese, 45% Cabernet S.", price: "48" },
      ]},
      { titolo: "Veneto", vini: [
        { name: "Nicolis — Amarone della Valpolicella", desc: "70% Corvina, 20% Rondinella, 10% Molinara", price: "60" },
        { name: "Secondo Marco — Valpolicella Ripasso", desc: "Corvina, Corvinone, Rondinella", price: "38" },
      ]},
      { titolo: "Piemonte", vini: [
        { name: "Francesco Rinaldi — Langhe Nebbiolo '23", desc: "100% Nebbiolo", price: "39" },
        { name: "Luca Leggero — Dolcetto", desc: "100% Dolcetto", price: "25" },
        { name: "Luca Leggero — Nebbiolo", desc: "100% Nebbiolo", price: "28" },
        { name: "Ribote Bruno Porro — Langhe Barbera '21", desc: "100% Barbera", price: "26" },
      ]},
      { titolo: "Trentino Alto Adige", vini: [
        { name: "Foradori — Teroldego", desc: "100% Teroldego", price: "30" },
        { name: "Putzenhof — Lagrein '23", desc: "100% Lagrein", price: "33" },
        { name: "Putzenhof — Pinot Nero '23", desc: "100% Pinot Nero", price: "33" },
      ]},
    ],
  },
  {
    id: "rossi-internazionali",
    titolo: "Vini Rossi · Internazionali",
    sottosezioni: [
      { titolo: "Francia", vini: [
        { name: "Chapoutier — Belleruche Côte du Rhône", desc: "60% Grenache, 40% Syrah", price: "20" },
        { name: "Delas — Côtes du Rhônes AOC \"Saint Esprit\"", desc: "90% Syrah, 10% Grenache", price: "20" },
        { name: "Domaine Chicotot — Bourgogne Côte d'Or", desc: "100% Pinot Nero", price: "50" },
        { name: "Domaine Faiveley — La Framboisière", desc: "100% Pinot Nero", price: "45" },
        { name: "Medeville — Cru Monplaisir", desc: "75% Merlot, 20% Cabernet S., 5% Cabernet F.", price: "25" },
      ]},
      { titolo: "Spagna", vini: [
        { name: "Lopez de Heredia — Viña Tondonia Tinto Reserva", desc: "75% Tempranillo, 15% Garnacha, 10% Graciano e Mazuelo", price: "69" },
      ]},
      { titolo: "USA · California", vini: [
        { name: "Beringer — Classic Cabernet Sauvignon", desc: "100% Cabernet Sauvignon", price: "20" },
      ]},
    ],
  },
];

function ViniPage() {
  return (
    <div className="px-4 md:px-12 lg:px-20 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader
        title="Carta dei Vini"
        subtitle="Una selezione di etichette siciliane, nazionali e internazionali. Champagne, bollicine, bianchi, rosati e rossi scelti per accompagnare ogni piatto della nostra cucina."
      />

      <nav aria-label="Indice carta dei vini" className="mb-16 border-y border-border py-6">
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-3">Indice</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {carta.map((m) => (
            <li key={m.id}>
              <a href={`#${m.id}`} className="text-sm text-foreground/80 hover:text-accent transition-colors underline-offset-4 hover:underline">
                {m.titolo}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-20">
        {carta.map((macro) => (
          <section key={macro.id} id={macro.id} className="scroll-mt-20">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
              {macro.titolo}
            </h2>
            <div className="h-px w-12 bg-accent mb-10" />

            <div className="space-y-10">
              {macro.sottosezioni.map((sotto, i) => (
                <div key={i}>
                  {sotto.titolo && (
                    <h3 className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-5">
                      {sotto.titolo}
                    </h3>
                  )}
                  <ul className="divide-y divide-border/60">
                    {sotto.vini.map((vino) => (
                      <li key={vino.name} className="grid grid-cols-[1fr_auto] gap-x-6 py-4 items-baseline">
                        <div className="min-w-0">
                          <p className="font-serif text-lg text-foreground leading-snug">{vino.name}</p>
                          {vino.desc && (
                            <p className="text-sm text-muted-foreground mt-1 font-light">{vino.desc}</p>
                          )}
                        </div>
                        <span className="font-serif text-lg text-accent tabular-nums whitespace-nowrap">
                          € {vino.price},00
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-20 pt-8 border-t border-border text-xs text-muted-foreground italic">
        I prezzi si intendono per bottiglia. Per disponibilità di annate diverse o calici fuori carta, chiedere al sommelier.
      </p>
    </div>
  );
}