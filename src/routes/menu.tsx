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

type Dish = { name: string; desc?: string; price: string };
const sezioni: { titolo: string; orario?: string; piatti: Dish[]; nota?: string }[] = [
  {
    titolo: "Colazione",
    piatti: [
      { name: "Crostone di pane", desc: "Uova strapazzate, avocado, philadelphia, bacon croccante.", price: "6,50" },
      { name: "Croissant salato", desc: "Salmone marinato all'erbette, avocado e philadelphia.", price: "5,50" },
      { name: "Croissant cunzato", desc: "Prosciutto cotto, pomodoro, misticanza, formaggio.", price: "5,50" },
      { name: "Croissant", desc: "Cioccolato, marmellata e crema.", price: "1,50" },
      { name: "Pancake", desc: "Con crema alla nocciola e frutta fresca.", price: "5,50" },
      { name: "French toast", desc: "Miele di ape nera, mandorle tostate e frutti di bosco.", price: "5,50" },
      { name: "Torta del bistrot", price: "3,00" },
    ],
  },
  {
    titolo: "Insalate & Antipasti",
    orario: "Dalle 12:00 alle 15:00",
    piatti: [
      { name: "Caprese", desc: "Mozzarella di bufala, pomodoro cuore di bue e olio al basilico.", price: "10,00" },
      { name: "Tonno sott'olio al pepe", desc: "Pomodorino rosso e giallo, capperi, patate novelle, cipolla rossa e vinaigrette alle olive verdi.", price: "12,00" },
      { name: "Insalata di Cesare", desc: "Pollo grigliato, misticanza, crostini di pane, scaglie di parmigiano, yogurt all'erbette.", price: "12,00" },
      { name: "Crostone dell'artigiano", desc: "Pane ai cereali con gambero, hummus di ceci e pomodorino confit.", price: "15,00" },
    ],
    nota: "Coperto 2,00",
  },
  {
    titolo: "Club Sandwich & Panini",
    orario: "Dalle 12:00 alle 15:00",
    piatti: [
      { name: "Gran toast alla mediterranea", desc: "Prosciutto cotto alla brace, asiago, misticanza e pomodoro.", price: "6,00" },
      { name: "Club sandwich al salmone marinato", desc: "Formaggio fresco, misticanza e guacamole, con patate fritte.", price: "12,00" },
      { name: "Hamburger di scottona 200gr", desc: "Cicoria ripassata e scamorza affumicata, con patate fritte.", price: "10,00" },
    ],
    nota: "Coperto 2,00",
  },
  {
    titolo: "Apericena",
    orario: "Dalle 18:00 alle 21:00",
    piatti: [
      { name: "Bruschette del bistrot", desc: "3 pezzi.", price: "6,00" },
      { name: "Caprino in carrozza e miele", desc: "3 pezzi.", price: "6,00" },
      { name: "Arancine", desc: "3 pezzi.", price: "4,50" },
      { name: "Bon bon", desc: "Di baccalà fritto e maionese alle olive, 3 pezzi.", price: "7,00" },
      { name: "Selezione di salumi siciliani per 2 persone", desc: "Mortadella di bufala, pancetta coppata, porchetta di suino nero e verdure croccanti.", price: "22,00" },
    ],
  },
  {
    titolo: "Secondi & Contorni",
    orario: "Dalle 18:00 alle 21:00",
    piatti: [
      { name: "1974", desc: "Suprema di pollo, con salsa alla Giuseppina e patate novelle al timo.", price: "15,00" },
      { name: "Polpo alla griglia", desc: "Con pesto di zucchine, porro croccante e olio al basilico.", price: "16,00" },
      { name: "Entrecote di vitello", desc: "Scaglie di piacentino ennese e cicoria ripassata.", price: "16,00" },
      { name: "Sandwich", desc: "Maialino nero dei Nebrodi, insalata, salsa bbq, con patate fritte.", price: "10,00" },
      { name: "Insalata", desc: "Pomodoro, misticanza, crostini di pane, mozzarella di bufala, tonno sott'olio al pepe.", price: "12,00" },
    ],
    nota: "Coperto 2,00",
  },
];

function MenuPage() {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader title="Menù" />
      <div className="space-y-14">
        {sezioni.map((s) => (
          <section key={s.titolo}>
            <div className="mb-6">
              <h2 className="font-serif text-3xl text-foreground">
                {s.titolo}
              </h2>
              {s.orario && (
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-2 ml-8">
                  {s.orario}
                </p>
              )}
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {s.piatti.map((p) => (
                <li key={p.name} className="py-5 flex items-baseline gap-6">
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
                    {p.desc && (
                      <p className="text-sm text-muted-foreground mt-1 font-light">{p.desc}</p>
                    )}
                  </div>
                  <div className="font-serif text-xl text-accent tabular-nums">€ {p.price}</div>
                </li>
              ))}
            </ul>
            {s.nota && (
              <p className="text-xs italic text-muted-foreground mt-3 text-right">{s.nota}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}