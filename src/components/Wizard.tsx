import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Users,
  Rocket,
  Factory,
  MapPin,
  Wallet,
} from "lucide-react";
import {
  CATEGORY_LABELS,
  STAGE_LABELS,
  SECTOR_LABELS,
  LOCATION_LABELS,
  FUNDING_BRACKETS,
  Category,
  Stage,
  Sector,
  LocationType,
} from "../data/schemes";
import { UserProfile } from "../lib/matching";

interface Props {
  onComplete: (profile: UserProfile) => void;
}

type StageKey = Exclude<Stage, "any">;
type SectorKey = Exclude<Sector, "any">;
type LocationKey = Exclude<LocationType, "any">;

const TOTAL_STEPS = 5;

export default function Wizard({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stage, setStage] = useState<StageKey | null>(null);
  const [sector, setSector] = useState<SectorKey | null>(null);
  const [location, setLocation] = useState<LocationKey | null>(null);
  const [bracket, setBracket] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState("");

  const toggleCategory = (c: Category) => {
    if (c === "general") {
      setCategories(["general"]);
      return;
    }
    setCategories((prev) => {
      const withoutGeneral = prev.filter((x) => x !== "general");
      return withoutGeneral.includes(c)
        ? withoutGeneral.filter((x) => x !== c)
        : [...withoutGeneral, c];
    });
  };

  const canNext = () => {
    if (step === 0) return categories.length > 0;
    if (step === 1) return stage !== null;
    if (step === 2) return sector !== null;
    if (step === 3) return location !== null;
    if (step === 4) return bracket !== null;
    return true;
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else {
      const b = FUNDING_BRACKETS[bracket!];
      onComplete({
        categories,
        stage: stage!,
        sector: sector!,
        location: location!,
        fundingMin: b.min,
        fundingMax: b.max,
        businessName: businessName.trim() || undefined,
      });
    }
  };

  const back = () => step > 0 && setStep(step - 1);

  const stepIcons = [Users, Rocket, Factory, MapPin, Wallet];
  const StepIcon = stepIcons[step];

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-ink/40">
          <span>Step {step + 1} of {TOTAL_STEPS}</span>
          <span className="flex items-center gap-1.5 text-terracotta">
            <Sparkles size={13} /> AI Matching
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal to-gold"
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-sm sm:p-10">
        <div className="mb-7 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/10 text-teal-dark">
            <StepIcon size={22} />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {[
                "Which of these describe you?",
                "What stage is your business at?",
                "What sector is it in?",
                "Where do you operate from?",
                "How much funding do you need?",
              ][step]}
            </h2>
            <p className="text-sm text-ink/50">
              {[
                "Select all that apply — this unlocks category-specific schemes.",
                "Choose the option closest to your current reality.",
                "Pick the sector that best fits your core activity.",
                "This affects scheme availability (some are urban or rural only).",
                "We'll surface schemes whose loan range fits your need.",
              ][step]}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {step === 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleCategory(c)}
                    className={`rounded-2xl border-2 px-4 py-4 text-left text-sm font-semibold transition ${
                      categories.includes(c)
                        ? "border-teal bg-teal/8 text-teal-dark"
                        : "border-ink/10 text-ink/70 hover:border-ink/25"
                    }`}
                  >
                    {CATEGORY_LABELS[c]}
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(Object.keys(STAGE_LABELS) as StageKey[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStage(s)}
                    className={`rounded-2xl border-2 px-4 py-4 text-left text-sm font-semibold transition ${
                      stage === s
                        ? "border-teal bg-teal/8 text-teal-dark"
                        : "border-ink/10 text-ink/70 hover:border-ink/25"
                    }`}
                  >
                    {STAGE_LABELS[s]}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(Object.keys(SECTOR_LABELS) as SectorKey[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSector(s)}
                    className={`rounded-2xl border-2 px-3 py-4 text-center text-sm font-semibold transition ${
                      sector === s
                        ? "border-teal bg-teal/8 text-teal-dark"
                        : "border-ink/10 text-ink/70 hover:border-ink/25"
                    }`}
                  >
                    {SECTOR_LABELS[s]}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {(Object.keys(LOCATION_LABELS) as LocationKey[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocation(l)}
                    className={`rounded-2xl border-2 px-4 py-6 text-center text-sm font-semibold transition ${
                      location === l
                        ? "border-teal bg-teal/8 text-teal-dark"
                        : "border-ink/10 text-ink/70 hover:border-ink/25"
                    }`}
                  >
                    {LOCATION_LABELS[l]}
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {FUNDING_BRACKETS.map((b, i) => (
                    <button
                      key={b.label}
                      onClick={() => setBracket(i)}
                      className={`rounded-2xl border-2 px-4 py-4 text-left text-sm font-semibold transition ${
                        bracket === i
                          ? "border-teal bg-teal/8 text-teal-dark"
                          : "border-ink/10 text-ink/70 hover:border-ink/25"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-ink/40">
                    Business name (optional)
                  </label>
                  <input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Sundari Handlooms"
                    className="mt-2 w-full rounded-xl border-2 border-ink/10 px-4 py-3 text-sm font-medium text-ink outline-none transition focus:border-teal"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-9 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink/50 transition disabled:opacity-0 hover:text-ink"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={next}
            disabled={!canNext()}
            className="flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-cream shadow-[0_4px_0_0_rgba(0,0,0,0.2)] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {step === TOTAL_STEPS - 1 ? "See My Matches" : "Continue"} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
