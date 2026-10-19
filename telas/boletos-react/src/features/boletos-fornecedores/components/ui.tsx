// Peças pequenas do Infortec Design usadas nesta tela.
import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export function Card({ title, subtitle, actions, children, className, ...rest }: {
  title: string; subtitle: ReactNode; actions?: ReactNode; children: ReactNode;
} & Omit<ComponentProps<"section">, "title">) {
  return (
    <section className={cx("min-w-0 rounded-lg border border-border bg-card p-4", className)} {...rest}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

export function Button({ variant = "outline", icon: Icon, children, className, ...rest }: {
  variant?: "outline" | "primary"; icon?: LucideIcon;
} & ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cx(
        "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md border px-3 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary"
          ? "border-primary bg-primary text-primary-foreground hover:bg-primary-hover"
          : "border-border bg-card hover:bg-muted",
        className,
      )}
      {...rest}
    >
      {Icon && <Icon className="size-3.5" />}
      {children}
    </button>
  );
}

export function IconButton({ icon: Icon, label, ...rest }: { icon: LucideIcon; label: string } & ComponentProps<"button">) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="grid size-7 place-items-center rounded-md border border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
      {...rest}
    >
      <Icon className="size-3.5" />
    </button>
  );
}

export function KpiStat({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub: string; icon: LucideIcon; color: string }) {
  return (
    <div className="relative min-w-0 rounded-lg border border-border bg-card p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-xl font-bold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
      <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-lg text-white" style={{ background: color }}>
        <Icon className="size-4" />
      </span>
    </div>
  );
}

export function Segmented<T extends string>({ options, value, onChange }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex flex-wrap rounded-md border border-border bg-muted p-0.5" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          onClick={() => onChange(o.value)}
          className={cx(
            "h-6 rounded px-2.5 text-[11px] font-medium",
            o.value === value ? "bg-card text-foreground shadow-[0_1px_2px_rgb(16_24_16/.08)]" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export type Tom = "ok" | "warn" | "bad";

export function Note({ tone, children }: { tone: Tom; children: ReactNode }) {
  const Icon = tone === "ok" ? CheckCircle2 : AlertCircle;
  return (
    <div
      role={tone === "bad" ? "alert" : "status"}
      className={cx(
        "flex items-start gap-2 rounded-md px-2.5 py-2 text-xs [&_b]:font-semibold",
        tone === "ok" && "bg-brand-soft text-primary",
        tone === "warn" && "bg-warn-soft text-warn-fg",
        tone === "bad" && "bg-danger-soft text-danger-fg",
      )}
    >
      <Icon className="mt-px size-3.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function Field({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={cx("grid min-w-0 gap-1", className)}>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export const inputClass = (auto = false, mono = false) =>
  cx(
    "h-8 w-full min-w-0 rounded-md border px-2.5 text-[13px] focus:border-brand focus:outline-none focus:ring-3 focus:ring-brand/15",
    auto ? "border-brand-border bg-brand-soft" : "border-border bg-card",
    mono && "font-mono tabular-nums",
  );

export { cx };
