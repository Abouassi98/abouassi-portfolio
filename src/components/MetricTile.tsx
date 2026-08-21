import type { Metric } from '../content/types';

/**
 * Renders one headline number.
 *
 * The `context` branch appends the employer, because the fact ledger requires
 * borrowed scale to name whose scale it is. That obligation lives in the
 * `Attribution` union, so this switch has to handle it to compile.
 */
export function MetricTile({ metric }: { readonly metric: Metric }) {
  const attribution = metric.attribution;
  const note =
    attribution.kind === 'context' ? `${metric.note} · ${attribution.employer}` : metric.note;

  return (
    <div className="card h-full p-4">
      <div className="font-mono text-2xl font-semibold text-white">
        <bdi dir="ltr">{metric.value}</bdi>
      </div>
      <div className="mt-1 text-sm text-slate-300">{metric.label}</div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted">{note}</p>
    </div>
  );
}
