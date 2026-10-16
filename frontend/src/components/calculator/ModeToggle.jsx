import { cn } from "@/lib/utils";

const modes = [
  { id: "finance", label: "Finance" },
  { id: "lease", label: "Lease" },
];

export const ModeToggle = ({ mode, onChange }) => (
  <div role="group" aria-label="Payment type" className="grid grid-cols-2 gap-1 rounded-md border border-border bg-muted p-1">
    {modes.map((m) => (
      <button
        key={m.id}
        type="button"
        aria-pressed={mode === m.id}
        onClick={() => onChange(m.id)}
        data-testid={`calc-mode-${m.id}`}
        className={cn(
          "rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors",
          mode === m.id ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {m.label}
      </button>
    ))}
  </div>
);
