import { Fragment } from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { comparison, plans, type Cell } from "@/data/pricing";
import { cn } from "@/lib/cn";

function Value({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-success" aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-ink-faint" aria-label="Not included" />;
  return <span className="text-sm text-ink">{v}</span>;
}

/** Feature matrix. Scrolls inside its own box, with a sticky header row and sticky feature column. */
export function ComparisonTable() {
  return (
    <div className="panel max-h-[75vh] overflow-auto" data-lenis-prevent>
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            <th className="sticky left-0 top-0 z-20 border-b border-line bg-surface px-5 py-4 text-sm font-medium text-ink-muted">Features</th>
            {plans.map((p) => (
              <th key={p.key} className={cn("sticky top-0 z-10 border-b border-line bg-surface px-5 py-4 text-center font-display text-base font-semibold", p.recommended && "text-violet-soft")}>
                {p.name}
                {p.recommended && <span className="mx-auto mt-1 block h-0.5 w-8 rounded bg-brand-gradient" />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((g) => (
            <Fragment key={g.group}>
              <tr>
                <td colSpan={5} className="sticky left-0 bg-elevated/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">{g.group}</td>
              </tr>
              {g.rows.map((r, i) => (
                <motion.tr
                  key={r.feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="group transition-colors hover:bg-white/[0.03]"
                >
                  <td className="sticky left-0 border-b border-line bg-surface px-5 py-3.5 text-sm text-ink-muted transition-colors group-hover:text-ink">{r.feature}</td>
                  {r.values.map((v, j) => (
                    <td key={j} className={cn("border-b border-line px-5 py-3.5 text-center", plans[j].recommended && "bg-violet/[0.05]")}>
                      <Value v={v} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
