import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menù — Giannino Bistrot Cafè" },
      { name: "description", content: "Il menù stagionale della Giannino Bistrot Cafè: antipasti, primi, secondi e dolci della tradizione toscana." },
      { property: "og:title", content: "Menù — Giannino Bistrot Cafè" },
      { property: "og:description", content: "Cucina toscana stagionale, dal focolare al piatto." },
    ],
  }),
  component: MenuPage,
});

type Dish = { name: string; desc: string; price: string };
const sezioni: { titolo: string; piatti: Dish[] }[] = [
  {
    titolo: "Antipasti",
    piatti: [
      { name: "Crostini neri di fegatini", desc: "Pane toscano, fegatini di pollo, capperi e acciughe.", price: "12" },
      { name: "Tagliere del casale", desc: "Salumi del Mugello, pecorino di Pienza, mostarde di stagione.", price: "18" },
      { name: "Carpaccio di Chianina", desc: "Rucola selvatica, scaglie di parmigiano, olio nuovo.", price: "16" },
    ],
  },
  {
    titolo: "Primi",
    piatti: [
      { name: "Pici al ragù bianco di cinta senese", desc: "Pasta tirata a mano, ragù lento di sette ore.", price: "18" },
      { name: "Pappardelle al cinghiale", desc: "Cinghiale di caccia, alloro, ginepro e vino rosso.", price: "20" },
      { name: "Ribollita del giorno", desc: "Cavolo nero, fagioli zolfini, pane raffermo.", price: "14" },
    ],
  },
  {
    titolo: "Secondi",
    piatti: [
      { name: "Bistecca alla fiorentina (per 2)", desc: "Chianina IGP, brace di leccio, fagioli all'uccelletto.", price: "75" },
      { name: "Coniglio in porchetta", desc: "Finocchio selvatico, aglio, vino bianco.", price: "26" },
      { name: "Baccalà alla livornese", desc: "Pomodoro, olive nere, capperi.", price: "24" },
    ],
  },
  {
    titolo: "Dolci",
    piatti: [
      { name: "Cantucci e Vin Santo", desc: "Mandorle di Toscana, Vin Santo del Chianti.", price: "10" },
      { name: "Torta della nonna", desc: "Crema al limone, pinoli tostati.", price: "9" },
    ],
  },
];

function MenuPage() {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader
        chapter="Capitolo II — Cucina"
        title="Menù della stagione"
        subtitle="Le portate cambiano con la luce e con la terra. Ciò che leggete oggi può essere stato raccolto questa mattina."
      />
      <div className="space-y-14">
        {sezioni.map((s) => (
          <section key={s.titolo}>
            <h2 className="font-serif text-3xl text-foreground mb-6 flex items-center gap-4">
              <span className="text-accent">✦</span> {s.titolo}
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {s.piatti.map((p) => (
                <li key={p.name} className="py-5 flex items-baseline gap-6">
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 font-light">{p.desc}</p>
                  </div>
                  <div className="font-serif text-xl text-accent tabular-nums">€ {p.price}</div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}