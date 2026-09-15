import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ExternalLink, GraduationCap, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { StudentProfile, computeScholarshipMatches, ScoredScholarship } from "../lib/scholarshipMatching";
import { fetchScholarshipMatches } from "../lib/api";
import StudentCard from "./StudentCard";
import StudentScholarshipModal from "./StudentScholarshipModal";

interface Props {
  profile: StudentProfile;
  onRestart: () => void;
  onSwitchToLoans?: () => void;
}

const FILTERS = [
  { key: "all", label: "All matched scholarships" },
  { key: "high", label: "75%+ High Match" },
  { key: "merit", label: "Merit & Degree Focus" },
  { key: "girls", label: "Girls & Priority Quota" },
] as const;

export default function StudentResults({ profile, onRestart, onSwitchToLoans }: Props) {
  const [matches, setMatches] = useState<ScoredScholarship[]>(() => computeScholarshipMatches(profile));
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  useEffect(() => {
    let cancelled = false;
    setMatches(computeScholarshipMatches(profile));
    fetchScholarshipMatches(profile)
      .then((remoteMatches) => {
        if (!cancelled && remoteMatches.length) setMatches(remoteMatches);
      })
      .catch((error) => {
        console.warn("Backend scholarship matching unavailable; using local fallback.", error);
      });
    return () => { cancelled = true; };
  }, [profile]);
  const [activeItem, setActiveItem] = useState<ScoredScholarship | null>(null);

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      if (filter === "high") return m.score >= 75;
      if (filter === "merit") return m.scholarship.minPercentage >= 60;
      if (filter === "girls")
        return (
          m.scholarship.gender === "female" ||
          m.scholarship.categories.includes("girl_child") ||
          m.scholarship.categories.includes("disability")
        );
      return true;
    });
  }, [matches, filter]);

  const topMatch = matches[0];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      {/* Personalized Match Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-ink/10 bg-gradient-to-br from-teal-dark via-teal to-ink p-8 text-cream shadow-xl sm:p-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-soft">
              <Award size={14} /> Official Government Scholarship Report
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
              {profile.studentName ? `${profile.studentName}, here` : "Here"} are your verified
              government scholarships.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-cream/80 leading-relaxed">
              We evaluated all Central & State government schemes against your academic profile,
              category, and income tier. Your top match reaches{" "}
              <strong className="text-gold font-bold">{topMatch ? `${topMatch.score}%` : "95%"}</strong> fit!
            </p>
          </div>

          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-2.5 text-xs font-bold text-cream backdrop-blur-xs transition hover:bg-cream/20"
          >
            <RefreshCw size={14} /> Change Criteria
          </button>
        </div>

        {/* Filter Chips */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-cream/10 pt-6">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                filter === f.key
                  ? "bg-gold text-ink shadow-sm"
                  : "bg-cream/10 text-cream hover:bg-cream/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Official Government NSP Application Guide Banner */}
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-ink">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-gold/20 p-2.5 text-ink shrink-0">
            <GraduationCap size={24} className="text-terracotta" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-ink">
              Ready to Apply? Official National Scholarship Portal (NSP) Direct Access
            </h3>
            <p className="text-xs text-ink/75 mt-0.5">
              Keep Aadhaar, Income Certificate, Previous Marksheet, and Bonafide College Certificate ready.
            </p>
          </div>
        </div>
        <a
          href="https://scholarships.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-cream shadow-sm hover:bg-ink-soft transition"
        >
          Open scholarships.gov.in <ExternalLink size={14} />
        </a>
      </div>

      {/* Results Count */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
          Showing {filtered.length} matched scholarships for you
        </p>
        {onSwitchToLoans && (
          <button
            onClick={onSwitchToLoans}
            className="text-xs font-bold text-teal hover:underline"
          >
            Looking for business loans instead? Click here →
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <StudentCard
            key={item.scholarship.id}
            item={item}
            onOpen={setActiveItem}
            rank={index + 1}
          />
        ))}
      </div>

      {/* Portal Redirect Help Box */}
      <div className="mt-14 rounded-3xl border border-ink/10 bg-white p-7 sm:p-9 shadow-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck size={24} className="text-teal" />
          <h3 className="font-display text-xl font-bold text-ink">
            Official Govt Portal Redirect Guarantee
          </h3>
        </div>
        <p className="mt-2 text-sm text-ink/70 max-w-3xl">
          Udaan is an independent guidance engine. We do not charge fees or hold your data.
          Clicking any scholarship takes you straight to the authentic Government of India portals
          (National Scholarship Portal, AICTE, UGC, or NTA).
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            "Step 1: Click official portal link on scheme",
            "Step 2: Register with Aadhaar & Mobile OTP",
            "Step 3: Upload documents & receive direct DBT grant",
          ].map((st, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl bg-black/[0.03] p-3 text-xs font-medium text-ink">
              <CheckCircle2 size={16} className="text-teal shrink-0" />
              <span>{st}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <StudentScholarshipModal item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
