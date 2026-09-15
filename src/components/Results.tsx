import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, SlidersHorizontal } from "lucide-react";
import { UserProfile, computeMatches, ScoredScheme } from "../lib/matching";
import SchemeCard from "./SchemeCard";
import SchemeModal from "./SchemeModal";

interface Props {
  profile: UserProfile;
  onRestart: () => void;
}

const FILTERS = [
  { key: "all", label: "All matches" },
  { key: "top", label: "75%+ match" },
  { key: "grant", label: "No collateral" },
] as const;

export default function Results({ profile, onRestart }: Props) {
  const matches = useMemo(() => computeMatches(profile), [profile]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [active, setActive] = useState<ScoredScheme | null>(null);

  const filtered = matches.filter((m) => {
    if (filter === "top") return m.score >= 75;
    if (filter === "grant")
      return /no collateral|collateral-free|grant/i.test(m.scheme.benefits.join(" "));
    return true;
  });

  const topScore = matches[0]?.score ?? 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-ink/10 bg-gradient-to-br from-teal-dark to-ink p-8 text-cream sm:p-10"
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-soft">
          Your personalised match report
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {profile.businessName ? `${profile.businessName}, here` : "Here"} are your
          best-fit schemes.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-cream/70">
          We scored all 16 schemes against your profile. Your strongest match is a{" "}
          <span className="font-bold text-gold-soft">{topScore}%</span> fit — start there.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                filter === f.key
                  ? "bg-gold text-ink"
                  : "bg-cream/10 text-cream/70 hover:bg-cream/15"
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={onRestart}
            className="ml-auto flex items-center gap-1.5 rounded-full border border-cream/20 px-4 py-2 text-xs font-bold text-cream/80 transition hover:bg-cream/10"
          >
            <RefreshCw size={13} /> Restart
          </button>
        </div>
      </motion.div>

      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink/40">
        <SlidersHorizontal size={13} /> Showing {filtered.length} of {matches.length} schemes,
        ranked by match score
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
          >
            <SchemeCard item={item} onOpen={setActive} rank={i + 1} />
          </motion.div>
        ))}
      </div>

      <SchemeModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}
