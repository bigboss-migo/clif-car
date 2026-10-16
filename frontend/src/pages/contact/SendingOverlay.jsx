import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Securing your details",
  "Searching our dealer network",
  "Matching your vehicle and spec",
  "Checking funding options",
  "Sending it to the team",
];
export const OVERLAY_STEP_MS = 900;
export const OVERLAY_MIN_MS = 4800;

export const SendingOverlay = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => Math.min(c + 1, STEPS.length - 1)), OVERLAY_STEP_MS);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearInterval(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sending-title"
      data-testid="sending-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-5 backdrop-blur-lg"
    >
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-2xl">
        <Loader2 aria-hidden="true" className="h-8 w-8 animate-spin rounded-full text-primary" />
        <h2 id="sending-title" className="mt-5 text-2xl">Working on it</h2>
        <div className="mt-5 h-1 w-full bg-border" aria-hidden="true">
          <div
            className="h-full bg-primary transition-[width] duration-700"
            style={{ width: `${((current + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <ol aria-live="polite" className="mt-6 space-y-3">
          {STEPS.map((s, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <li
                key={s}
                data-testid={`sending-step-${i + 1}`}
                data-state={done ? "done" : active ? "active" : "pending"}
                className={cn(
                  "flex items-center gap-3 text-sm transition-opacity",
                  done && "text-foreground",
                  active && "font-bold text-foreground",
                  !done && !active && "opacity-40",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                    done ? "border-primary bg-primary text-primary-foreground" : active ? "border-primary" : "border-border",
                  )}
                >
                  {done && <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />}
                  {active && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />}
                </span>
                {s}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
