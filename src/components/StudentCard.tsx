import { ScoredScholarship } from "../lib/scholarshipMatching";
import { ArrowRight, ExternalLink, GraduationCap, Building, Bookmark } from "lucide-react";

interface Props {
  item: ScoredScholarship;
  onOpen: (item: ScoredScholarship) => void;
  onSave?: (item: ScoredScholarship) => void;
  rank: number;
}

function scoreColor(score: number) {
  if (score >= 75) return "#0F5257";
  if (score >= 50) return "#E8A33D";
  return "#C1502E";
}

export default function StudentCard({ item, onOpen, onSave, rank }: Props) {
  const { scholarship, score, reasons } = item;
  const circleColor = scoreColor(score);

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-xs transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            {rank <= 3 && <span className="mb-2 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-terracotta">⭐ Top Scholarship #{rank}</span>}
            <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-teal-dark transition">{scholarship.shortName}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-ink/50"><Building size={12} /> {scholarship.ministry}</p>
          </div>
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#eee2c8" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke={circleColor} strokeWidth="3" strokeDasharray={`${(score / 100) * 97.4} 97.4`} strokeLinecap="round" />
            </svg>
            <span className="absolute font-display text-sm font-bold text-ink">{score}%</span>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink/65 line-clamp-2">{scholarship.tagline}</p>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal-dark"><GraduationCap size={14} /> {scholarship.amountLabel}</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {reasons.slice(0, 2).map((r, i) => <span key={i} className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-ink/75">✓ {r}</span>)}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 border-t border-ink/10 pt-4">
        <a href={scholarship.applyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:text-teal-dark transition">
          {scholarship.portalName} <ExternalLink size={12} />
        </a>
        <div className="flex items-center gap-2">
          {onSave && (
            <button onClick={() => onSave(item)} className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-1.5 text-xs font-bold text-teal-dark hover:bg-teal/20">
              <Bookmark size={12} /> Save
            </button>
          )}
          <button onClick={() => onOpen(item)} className="flex items-center gap-1 text-sm font-bold text-terracotta transition group-hover:gap-2">Full Details <ArrowRight size={15} /></button>
        </div>
      </div>
    </div>
  );
}
