// Só para a demonstração: no sistema, a página entra no layout que já existe.
import type { ReactNode } from "react";
import { Bell, ChevronRight, PanelLeft, Search } from "lucide-react";

export function AppShell({ trail, children }: { trail: string[]; children: ReactNode }) {
  return (
    <>
      <header className="flex h-12 items-center gap-3 border-b border-border bg-card px-4">
        <PanelLeft className="size-4 text-muted-foreground" />
        <nav className="flex items-center gap-1.5 text-xs">
          {trail.map((t, i) => (
            <span key={t} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 text-muted-foreground" />}
              <span className={i === trail.length - 1 ? "text-foreground" : "text-muted-foreground"}>{t}</span>
            </span>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button className="hidden h-8 w-48 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-xs text-muted-foreground sm:flex">
            <Search className="size-3.5" /> Buscar...
            <kbd className="ml-auto rounded border border-border bg-muted px-1.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <Bell className="size-4" />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
