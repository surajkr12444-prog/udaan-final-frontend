import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileCheck2, BadgeCheck, GraduationCap, Building } from "lucide-react";
import { ScoredScholarship } from "../lib/scholarshipMatching";
import { openPortalWithGuide } from "../lib/portalGuide";
import { usePreferences } from "../lib/preferences";

interface Props {
  item: ScoredScholarship | null;
  onClose: () => void;
}

export default function StudentScholarshipModal({ item, onClose }: Props) {
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
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Ministry Tag */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: item.scholarship.colorTag }}
            >
              <Building size={12} /> {item.scholarship.ministry}
            </div>

            {/* Scholarship Name */}
            <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              {item.scholarship.name}
            </h2>

            {/* Match score & amount badges */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal-dark px-4 py-1.5 text-sm font-bold text-cream">
                {item.score}% Match
              </span>
              <span className="rounded-full bg-gold/20 px-3.5 py-1 text-sm font-bold text-ink">
                🎓 {item.scholarship.amountLabel}
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-relaxed text-ink/75">
              {item.scholarship.description}
            </p>

            {/* Two columns: Why matched & Required documents */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/70 p-4 border border-ink/5">
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-teal-dark">
                  <BadgeCheck size={15} /> Why you are eligible
                </p>
                <ul className="mt-3 space-y-2">
                  {item.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-ink/80">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white/70 p-4 border border-ink/5">
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-terracotta">
                  <FileCheck2 size={15} /> Documents needed for portal
                </p>
                <ul className="mt-3 space-y-2">
                  {item.scholarship.documents.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-ink/80">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key benefits list */}
            <div className="mt-5 rounded-2xl bg-cream-soft p-5 border border-ink/5">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-dark">
                Key scheme benefits & coverage
              </p>
              <ul className="mt-3 space-y-2">
                {item.scholarship.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink/75">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {b}
                  </li>
                ))}
              </ul>
              {item.scholarship.deadlineNotice && (
                <p className="mt-3 text-xs font-semibold text-ink/60">
                  ℹ️ {item.scholarship.deadlineNotice}
                </p>
              )}
            </div>

            {/* Official Portal Redirect CTA */}
            <div className="mt-7">
              <button
                onClick={() => openPortalWithGuide({ title: item.scholarship.name, portalName: item.scholarship.portalName, url: item.scholarship.applyUrl, kind: 'scholarship' })}
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-terracotta py-4 text-sm font-bold text-cream shadow-[0_4px_0_0_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:translate-y-0"
              >
                <GraduationCap size={18} /> {t('openOfficial')} <ExternalLink size={16} />
              </button>
              <p className="mt-2 text-center text-[11px] text-ink/50">
                The official portal opens in a new tab. Keep Udaan open so the AI guide can walk you through the steps.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
