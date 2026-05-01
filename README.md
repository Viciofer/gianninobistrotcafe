# Giannino Bistrot Cafè — Documentazione del Progetto

Benvenuti nella documentazione tecnica e descrittiva del progetto **Giannino Bistrot Cafè**. Questo documento fornisce una panoramica completa dell'architettura, della storia e della struttura dell'applicazione.

## 1. Identità e Storia
Giannino Bistrot Cafè non è solo un ristorante, ma il custode di una tradizione toscana che risale al **1974**. Fondato dal garbo di **Giannino** e dal cuore di **Maria**, il progetto oggi rappresenta l'evoluzione gentile di quella storia, dove l'arte della ceramica incontra la passione per la buona cucina.

### Simbolismo
Il design e l'identità visiva sono ricchi di significati:
- **Il Polpo:** Ricordo di Giannino come giovane pescatore.
- **Il Pollo:** Protagonista dei suoi celebri spiedi.
- **Le Mani di Maria:** Simbolo dei riti immortali della cucina e delle sue celebri torte.
- **La Musa:** Custode dei segreti, dipinta sui tavoli del bistrot.

---

## 2. Architettura Tecnica
L'applicazione è costruita con tecnologie moderne per garantire prestazioni elevate, SEO optimization e una gestione fluida dello stato.

### Stack Tecnologico
- **Framework:** [TanStack Start](https://tanstack.com/router/v1/docs/guide/start/overview) (React Full-stack con TanStack Router).
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) per un design moderno e reattivo.
- **Componenti UI:** [Shadcn UI](https://ui.shadcn.com/) (basato su Radix UI) per componenti accessibili e personalizzabili.
- **Icone:** [Lucide React](https://lucide.dev/).
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) gestito tramite Wrangler.
- **Linguaggio:** TypeScript per la massima sicurezza del codice.

---

## 3. Struttura del Progetto
La directory principale è organizzata come segue:

- `/src/routes/`: Contiene le pagine e la logica di navigazione (TanStack Router).
- `/src/components/`: Componenti riutilizzabili e moduli UI.
- `/src/assets/`: Risorse statiche come immagini (es. logo, hero images).
- `/src/lib/`: Funzioni di utilità (es. gestione delle classi CSS).
- `/src/styles.css`: Punto di ingresso per gli stili globali di Tailwind.

---

## 4. Percorsi e Contenuti (I Capitoli)
L'applicazione è strutturata in "Capitoli", riflettendo la narrazione del brand:

### Capitolo I — Identità (`/`)
La homepage che racconta le radici del 1974 e la visione attuale di Elena e Mario.

### Capitolo II — Cucina (`/menu`)
Il menù stagionale organizzato per fasce orarie:
- **Colazione:** Croissant, pancake, toast e torte della casa.
- **Insalate & Antipasti:** Prodotti freschi mediterranei (12:00-15:00).
- **Club Sandwich & Panini:** Proposte gourmet (12:00-15:00).
- **Apericena:** Bruschette, arancine e selezioni di salumi siciliani (18:00-21:00).
- **Secondi e Contorni:** Piatti iconici come la "1974" (Suprema di pollo con salsa alla Giuseppina).

### Capitolo III — Cantina (`/vini`)
Una selezione curata di etichette che rappresentano il territorio e l'eccellenza vitivinicola.

### Capitolo IV — Miscelazione (`/drink`)
La drink list dedicata agli aperitivi e al dopocena.

### Capitolo V — Incontro (`/contatti`)
Informazioni su dove trovarci, orari di apertura e contatti diretti.

---

## 5. Caratteristiche Gestionali
L'applicazione include un "Manuale Operativo" (Gestionale) accessibile tramite una barra laterale (`AppSidebar`), progettato per facilitare la consultazione delle informazioni da parte del personale del bistrot.

---

## 6. Configurazione e Sviluppo
Il progetto utilizza **Bun** come gestore di pacchetti (opzionale, supporta anche npm/yarn).

### Comandi principali:
- `npm run dev`: Avvia il server di sviluppo.
- `npm run build`: Genera la build per la produzione (Cloudflare).
- `npm run lint`: Esegue il controllo della qualità del codice.
- `npm run format`: Formatta il codice secondo le regole di Prettier.
