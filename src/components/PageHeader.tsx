export function PageHeader({ chapter, title, subtitle }: { chapter?: string; title: string; subtitle?: string }) {
  return (
    <header className="mb-12 md:mb-16">
      {chapter && (
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{chapter}</span>
      )}
      <h1 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-foreground mt-4 text-balance">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-6 text-muted-foreground font-light max-w-2xl text-pretty">{subtitle}</p>
      )}
      <div className="mt-8 h-px w-16 bg-accent" />
    </header>
  );
}