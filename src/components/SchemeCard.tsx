import { ScoredScheme } from "../lib/matching";
import { ArrowRight, ExternalLink, Bookmark } from "lucide-react";

interface Props {
  item: ScoredScheme;
  onOpen: (item: ScoredScheme) => void;
  onSave?: (item: ScoredScheme) => void;
  rank: number;
}

function scoreColor(score: number) {
  if (score >= 75) return "#0F5257";
  if (score >= 50) return "#E8A33D";
  return "#C1502E";
}

export default function SchemeCard({ item, onOpen, onSave, rank }: Props) {
  const { scheme, score, reasons } = item;
  const circleColor = scoreColor(score);

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            {rank <= 3 && (
              <span className="mb-2 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-terracotta">
                Top Match #{rank}
              </span>
            )}
            <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-teal transition">
              {scheme.shortName}
            </h3>
            <p className="mt-1 text-xs font-medium text-ink/45">{scheme.provider}</p>
          </div>

          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#eee2c8" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke={circleColor} strokeWidth="3" strokeDasharray={`${(score / 100) * 97.4} 97.4`} strokeLinecap="round" />
            </svg>
            <span className="absolute font-display text-sm font-bold text-ink">{score}%</span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink/60">{scheme.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {reasons.slice(0, 2).map((r) => (
            <span key={r} className="rounded-full bg-teal/8 px-2.5 py-1 text-[11px] font-semibold text-teal-dark">{r}</span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-ink/10 pt-4">
        <a href={scheme.applyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:text-teal-dark transition">
          Govt Portal <ExternalLink size={12} />
        </a>
        <div className="flex items-center gap-2">
          {onSave && (
            <button onClick={() => onSave(item)} className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-1.5 text-xs font-bold text-teal-dark hover:bg-teal/20">
              <Bookmark size={12} /> Save
            </button>
          )}
          <button onClick={() => onOpen(item)} className="flex items-center gap-1 text-sm font-bold text-terracotta transition group-hover:gap-2">
            Details <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
