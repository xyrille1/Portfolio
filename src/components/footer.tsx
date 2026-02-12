import { LocalTime } from './local-time';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-4xl mx-auto px-8 pb-20 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground/50 text-[9px] uppercase tracking-[0.4em] font-bold">
      <span>&copy; {currentYear} Xyrille Navora</span>
      <div className="flex gap-8">
        <span>Manaoag, PH</span>
        <LocalTime />
      </div>
    </footer>
  );
}
