import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, SlidersHorizontal, ExternalLink, Calculator, Building2 } from "lucide-react";
import { UserProfile, computeMatches, ScoredScheme } from "../lib/matching";
import { fetchEntrepreneurMatches, saveScheme } from "../lib/api";
import { useAuth } from "../lib/auth";
import SchemeCard from "./SchemeCard";
import SchemeModal from "./SchemeModal";
import { openPortalWithGuide } from "../lib/portalGuide";

interface Props {
  profile: UserProfile;
  onRestart: () => void;
  onOpenEmi?: () => void;
  onSwitchToStudents?: () => void;
  onRequestLogin?: () => void;
}

const FILTERS = [
  { key: "all", label: "All matches" },
  { key: "top", label: "75%+ match" },
  { key: "grant", label: "No collateral" },
] as const;

export default function Results({ profile, onRestart, onOpenEmi, onSwitchToStudents, onRequestLogin }: Props) {
  const { user } = useAuth();
  const [notice, setNotice] = useState("");
  const [matches, setMatches] = useState<ScoredScheme[]>(() => computeMatches(profile));
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  useEffect(() => {
    let cancelled = false;
    setMatches(computeMatches(profile));
    fetchEntrepreneurMatches(profile)
      .then((remoteMatches) => {
        if (!cancelled && remoteMatches.length) setMatches(remoteMatches);
      })
      .catch((error) => {
        console.warn("Backend entrepreneur matching unavailable; using local fallback.", error);
      });
    return () => { cancelled = true; };
  }, [profile, user?.id]);
  const [active, setActive] = useState<ScoredScheme | null>(null);

  const filtered = matches.filter((m) => {
    if (filter === "top") return m.score >= 75;
    if (filter === "grant")
      return /no collateral|collateral-free|grant/i.test(m.scheme.benefits.join(" "));
    return true;
  });

  const topScore = matches[0]?.score ?? 0;

  async function handleSave(item: ScoredScheme) {
    if (!user) { onRequestLogin?.(); return; }
    try {
      await saveScheme(item.scheme.id);
      setNotice(`${item.scheme.shortName} saved to your dashboard.`);
      setTimeout(() => setNotice(""), 2500);
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "Could not save scheme");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
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

        <div className="mt-6 flex flex-wrap items-center gap-2">
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

      {/* Official Government Direct Access Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-ink">
        <div className="flex items-center gap-3">
          <Building2 size={20} className="text-terracotta shrink-0" />
          <p className="text-xs font-medium text-ink">
            <strong>Direct Official Portals:</strong> You can apply directly on{" "}
            <button onClick={() => openPortalWithGuide({ title: 'JanSamarth credit-linked schemes', portalName: 'JanSamarth', url: 'https://www.jansamarth.in/', kind: 'scheme' })} className="font-bold text-terracotta hover:underline">JanSamarth.in</button>{" "}
            or{" "}
            <button onClick={() => openPortalWithGuide({ title: 'MUDRA / Stand-Up India', portalName: 'Udyami Mitra', url: 'https://www.udyamimitra.in/', kind: 'scheme' })} className="font-bold text-teal-dark hover:underline">UdyamiMitra.in</button>
            . Zero middlemen or broker fees.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onOpenEmi && (
            <button
              onClick={onOpenEmi}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink shadow-xs hover:bg-black/5 transition"
            >
              <Calculator size={13} className="text-teal" /> Calculate EMI
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs font-semibold text-ink/50">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={13} /> Showing {filtered.length} of {matches.length} schemes, ranked by match score
        </div>
        {onSwitchToStudents && (
          <button
            onClick={onSwitchToStudents}
            className="text-teal hover:underline font-bold"
          >
            Looking for Student Scholarships? Switch here →
          </button>
        )}
      </div>

      {notice && <div className="mt-5 rounded-2xl border border-teal/20 bg-teal/10 px-4 py-3 text-xs font-bold text-teal-dark">{notice}</div>}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
          >
            <SchemeCard item={item} onOpen={setActive} onSave={handleSave} rank={i + 1} />
          </motion.div>
        ))}
      </div>

      <SchemeModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}
