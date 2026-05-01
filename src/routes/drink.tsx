import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/drink")({
  head: () => ({
    meta: [
      { title: "Drink List — Giannino Bistrot Cafè" },
      { name: "description", content: "Caffetteria, bibite, birre, cocktail, gin, whisky, rum, vodka, mezcal, grappe, liquori e amari." },
      { property: "og:title", content: "Drink List — Giannino Bistrot Cafè" },
      { property: "og:description", content: "La selezione completa di drink, distillati e caffetteria della Giannino Bistrot Cafè." },
    ],
  }),
  component: DrinkPage,
});

type Item = { name: string; desc?: string; price?: string };
type Section = { id: string; title: string; subtitle?: string; items: Item[]; note?: string };
type Group = { id: string; title: string; sections: Section[] };

const groups: Group[] = [
  {
    id: "acque-bibite",
    title: "Acque e Bibite",
    sections: [
      {
        id: "acque",
        title: "Acque Minerali",
        subtitle: "Mineral Waters",
        items: [
          { name: "Acqua naturale (vetro)", price: "2,50" },
          { name: "Acqua frizzante (vetro)", price: "2,50" },
          { name: "Acqua lete (vetro)", price: "2,50" },
          { name: "Acqua naturale 0,5l", price: "1,50" },
          { name: "Acqua frizzante 0,5l", price: "1,50" },
        ],
      },
      {
        id: "bibite",
        title: "Bibite",
        subtitle: "Soft Drink",
        items: [
          { name: "Coca cola", price: "2,50" },
          { name: "Coca cola zero", price: "2,50" },
          { name: "Crodino", price: "3,00" },
          { name: "Camparino", price: "3,00" },
          { name: "Spremuta di agrumi", price: "4,00" },
          { name: "Succo di frutta", price: "2,50" },
          { name: "The freddo", price: "2,50" },
          { name: "Redbull", price: "3,00" },
          { name: "Polara aranciata", price: "2,50" },
          { name: "Polara chinotto", price: "2,50" },
          { name: "Polara gassosa", price: "2,50" },
          { name: "Polara spuma", price: "2,50" },
          { name: "Polara mandarino verde", price: "2,50" },
          { name: "Polara pompelmo rosa", price: "2,50" },
          { name: "Schweppes tonica", price: "2,50" },
          { name: "Schweppes lemon", price: "2,50" },
        ],
      },
    ],
  },
  {
    id: "birre",
    title: "Birre",
    sections: [
      {
        id: "birre-list",
        title: "Birre",
        subtitle: "Beers",
        items: [
          { name: "Forst pils 0,2l", price: "3,00" },
          { name: "Forst pils 0,4l", price: "4,00" },
          { name: "Forst sixtus 0,3l", price: "3,50" },
          { name: "Weihenstephaner weiss 0,3l", price: "3,50" },
          { name: "Weihenstephaner weiss 0,5l", price: "5,00" },
          { name: "Corona 33cl", price: "4,00" },
          { name: "Birra analcolica 33cl", price: "4,00" },
          { name: "Birra gluten free 33cl", price: "4,00" },
        ],
      },
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    sections: [
      {
        id: "signature",
        title: "Signature Drink",
        items: [
          { name: "Testa di moro", desc: "Ingredienti segreti della casa", price: "9,00" },
        ],
      },
      {
        id: "mixology",
        title: "Mixology",
        items: [
          { name: "Aperol spritz", desc: "Aperol, Prosecco, Soda", price: "6,00" },
          { name: "Campari spritz", desc: "Campari, Prosecco, Soda", price: "6,00" },
          { name: "Limoncello spritz", desc: "Limoncello, Prosecco, Soda", price: "6,00" },
          { name: "Hugo spritz", desc: "Sciroppo di sambuco, Prosecco, Soda, Menta", price: "7,00" },
          { name: "Americano", desc: "Campari, Vermouth Rosso, Soda", price: "7,00" },
          { name: "Negroni", desc: "Gin, Campari, Vermouth Rosso", price: "7,00" },
          { name: "Negroni sbagliato", desc: "Campari, Vermouth Rosso, Prosecco", price: "7,00" },
          { name: "Gin tonic", desc: "Gin, Acqua Tonica", price: "7,00" },
          { name: "Gin lemon", desc: "Gin, Lemon Soda", price: "7,00" },
          { name: "Vodka tonic", desc: "Vodka, Acqua Tonica", price: "7,00" },
          { name: "Vodka lemon", desc: "Vodka, Lemon Soda", price: "7,00" },
          { name: "Mojito", desc: "Rum Bianco, Lime, Zucchero di canna, Menta, Soda", price: "7,00" },
          { name: "Margarita", desc: "Tequila, Triple Sec, Succo di lime", price: "7,00" },
          { name: "Daiquiri", desc: "Rum Bianco, Succo di lime, Sciroppo di zucchero", price: "7,00" },
          { name: "Paloma", desc: "Tequila, succo di lime, soda al pompelmo rosa", price: "8,00" },
          { name: "Moscow mule", desc: "Vodka, Ginger Beer, Succo di lime, Zenzero", price: "8,00" },
          { name: "Cosmopolitan", desc: "Vodka, Triple Sec, Succo di mirtillo rosso, Succo di lime", price: "8,00" },
          { name: "Boulevardier", desc: "Bourbon, Campari, Vermouth Rosso", price: "9,00" },
        ],
      },
      {
        id: "mixology-zero",
        title: "Mixology Zero",
        items: [
          { name: "Spritz zero", desc: "Analcolico biondo, Soda, Arancia", price: "7,00" },
          { name: "Gin tonic zero", desc: "Gin analcolico, Acqua Tonica", price: "7,00" },
          { name: "Mojito zero", desc: "Lime, Zucchero di canna, Menta, Soda, Ginger Ale", price: "7,00" },
        ],
      },
    ],
  },
  {
    id: "gin",
    title: "Gin",
    sections: [
      {
        id: "gin-list",
        title: "Gin",
        items: [
          { name: "Gin mare", price: "9,00" },
          { name: "Bulldog", price: "9,00" },
          { name: "Hendrick's", price: "9,00" },
          { name: "London dry no. 3", price: "9,00" },
          { name: "Acqueverdi", price: "9,00" },
          { name: "Brockman's", price: "9,00" },
          { name: "Gin del professore", price: "9,00" },
          { name: "Gold 999.9 (mandarino)", price: "9,00" },
          { name: "Tanqueray ten", price: "10,00" },
          { name: "Portofino", price: "10,00" },
          { name: "Panarea", price: "10,00" },
        ],
      },
    ],
  },
  {
    id: "distillati",
    title: "Whisky, Rum, Vodka & Tequila",
    sections: [
      {
        id: "whisky",
        title: "Whisky & Bourbon",
        items: [
          { name: "J&b", price: "5,00" },
          { name: "Amrut indian" },
          { name: "Clan campbell" },
          { name: "Glenfiddich 12" },
          { name: "Jim beam" },
          { name: "Kavalan" },
          { name: "Macallan amber" },
          { name: "Nikka from the barrel" },
          { name: "Nikka taketsuru" },
          { name: "Nikka yoichi" },
          { name: "Port askaig 8" },
          { name: "The balvenie 14" },
          { name: "Wild turkey" },
        ],
      },
      {
        id: "rum",
        title: "Rum & Rum Agricoli",
        items: [
          { name: "Depaz agricole" },
          { name: "Diplomatico" },
          { name: "Don papa" },
          { name: "Eldorado 12" },
          { name: "Forsyths white" },
          { name: "Hampden 2010" },
          { name: "Kingston 62 gold" },
          { name: "Kingston 62 white" },
          { name: "Marie galante" },
          { name: "Marie galante - capovilla" },
          { name: "Saint james" },
        ],
      },
      {
        id: "vodka",
        title: "Vodka",
        items: [{ name: "Vodka cîroc", price: "10,00" }],
      },
      {
        id: "mezcal",
        title: "Mezcal & Tequila",
        items: [
          { name: "Montelobos" },
          { name: "Espolon blanco" },
          { name: "Espolon reposado" },
          { name: "Herradura" },
          { name: "Xaman espadin" },
        ],
      },
    ],
  },
  {
    id: "grappe-liquori",
    title: "Grappe, Liquori & Amari",
    sections: [
      {
        id: "grappe",
        title: "Grappe",
        items: [
          { name: "Grappa caffo", price: "4,00" },
          { name: "Grappa barrique", price: "4,00" },
          { name: "Marzadro barrique", price: "4,00" },
          { name: "Grappa bianca", price: "5,00" },
          { name: "Marzadro bianca", price: "5,00" },
          { name: "Grappa al miele", price: "5,00" },
          { name: "Francoli barrique", price: "7,00" },
          { name: "Marzadro diciotto lune", price: "7,00" },
          { name: "Romano levi bianca" },
          { name: "Romano levi camomilla" },
          { name: "Romano levi moscato" },
        ],
      },
      {
        id: "liquori",
        title: "Liquori",
        items: [
          { name: "Limoncello", price: "4,00" },
          { name: "Liquore alla Cannella", price: "4,00" },
          { name: "Liquore al Cioccolato", price: "4,00" },
          { name: "Liquore alla Liquirizia", price: "4,00" },
          { name: "Martini Bianco", price: "5,00" },
          { name: "Sambuca Molinari", price: "5,00" },
          { name: "Shottino", price: "4,00" },
        ],
      },
      {
        id: "amari",
        title: "Amari",
        items: [
          { name: "Del Capo", price: "4,00" },
          { name: "Dell'Etna", price: "4,00" },
          { name: "Maliquo", price: "4,00" },
          { name: "Averna", price: "4,00" },
          { name: "Borsci S. Marzano", price: "4,00" },
          { name: "Dente di Leone", price: "4,00" },
          { name: "Jagermeister", price: "4,00" },
          { name: "Montenegro", price: "4,00" },
          { name: "Petrus", price: "4,00" },
        ],
      },
    ],
  },
];

function DrinkPage() {
  return (
    <div className="px-4 md:px-12 lg:px-20 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader
        title="Drink List"
        subtitle="Bibite, cocktail d'autore, gin, distillati, grappe e amari. Una selezione costruita giorno dopo giorno."
      />

      <nav aria-label="Indice drink list" className="mb-16 border-y border-border py-6">
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-3">Indice</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {groups.map((g) => (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                className="text-sm text-foreground/80 hover:text-accent transition-colors underline-offset-4 hover:underline"
              >
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-20">
        {groups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-20">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
              {group.title}
            </h2>
            <div className="h-px w-12 bg-accent mb-10" />

            <div className="space-y-10">
              {group.sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-20">
                  {section.title && section.title !== group.title && (
                    <h3 className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-5">
                      {section.title}
                    </h3>
                  )}
                  <ul className="divide-y divide-border/60">
                    {section.items.map((item, i) => (
                      <li key={i} className="grid grid-cols-[1fr_auto] gap-x-6 py-4 items-baseline">
                        <div className="min-w-0">
                          <p className="font-serif text-lg text-foreground leading-snug">{item.name}</p>
                          {item.desc && (
                            <p className="text-sm text-muted-foreground mt-1 font-light">{item.desc}</p>
                          )}
                        </div>
                        {item.price && (
                          <span className="font-serif text-lg text-accent tabular-nums whitespace-nowrap">
                            € {item.price}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

    </div>
  );
}
