import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileCheck2, BadgeCheck } from "lucide-react";
import { ScoredScheme } from "../lib/matching";
import { openPortalWithGuide } from "../lib/portalGuide";
import { usePreferences } from "../lib/preferences";

interface Props {
  item: ScoredScheme | null;
  onClose: () => void;
}

export default function SchemeModal({ item, onClose }: Props) {
  const { t } = usePreferences();
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-cream p-7 shadow-2xl sm:rounded-3xl sm:p-9"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
            >
              <X size={18} />
            </button>

            <div
              className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: item.scheme.colorTag }}
            >
              {item.scheme.provider}
            </div>

            <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              {item.scheme.name}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal-dark px-4 py-1.5 text-sm font-bold text-cream">
                {item.score}% match
              </span>
              <span className="text-sm font-semibold text-ink/60">{item.scheme.amountLabel}</span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink/70">{item.scheme.description}</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-teal-dark">
                  <BadgeCheck size={14} /> Why it matches you
                </p>
                <ul className="mt-3 space-y-2">
                  {item.reasons.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-ink/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-teal-dark">
                  <FileCheck2 size={14} /> Documents typically needed
                </p>
                <ul className="mt-3 space-y-2">
                  {item.scheme.documents.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-ink/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-cream-soft p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-dark">Key benefits</p>
              <ul className="mt-3 space-y-2">
                {item.scheme.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold text-ink/50">Interest / structure: {item.scheme.interest}</p>
            </div>

            <button
              onClick={() => openPortalWithGuide({ title: item.scheme.name, portalName: item.scheme.provider || 'Official Government Portal', url: item.scheme.applyUrl, kind: 'scheme' })}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-terracotta py-4 text-base font-bold text-cream shadow-[0_4px_0_0_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5"
            >
              {t('openOfficial')} <ExternalLink size={16} />
            </button>
            <p className="mt-2 text-center text-[11px] text-ink/50">The government site opens in a new tab; Udaan AI stays here to guide each step.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
