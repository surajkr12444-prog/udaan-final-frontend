import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Wallet,
  Award,
  Check,
  Building,
} from "lucide-react";
import {
  EDUCATION_LEVEL_LABELS,
  STUDENT_CATEGORY_LABELS,
  INCOME_BRACKETS,
  MARKS_BRACKETS,
  EducationLevel,
  StudentCategory,
  Gender,
} from "../data/scholarships";
import { StudentProfile } from "../lib/scholarshipMatching";

interface Props {
  onComplete: (profile: StudentProfile) => void;
  onCancel?: () => void;
}

const TOTAL_STEPS = 5;

export default function StudentWizard({ onComplete, onCancel }: Props) {
  const [step, setStep] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(null);
  const [category, setCategory] = useState<StudentCategory | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [familyIncome, setFamilyIncome] = useState<number | null>(null);
  const [marksPercentage, setMarksPercentage] = useState<number | null>(null);
  const [isSingleGirlChild, setIsSingleGirlChild] = useState(false);
  const [isDisability, setIsDisability] = useState(false);

  const canNext = () => {
    if (step === 0) return educationLevel !== null;
    if (step === 1) return category !== null;
    if (step === 2) return gender !== null;
    if (step === 3) return familyIncome !== null;
    if (step === 4) return marksPercentage !== null;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      if (educationLevel && category && gender && familyIncome !== null && marksPercentage !== null) {
        onComplete({
          studentName: studentName.trim() || undefined,
          educationLevel,
          category,
          gender,
          familyIncome,
          marksPercentage,
          isSingleGirlChild,
          isDisability,
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else if (onCancel) onCancel();
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      {/* Progress Bar & Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink/50">
          <span>
            Student Flow · Step {step + 1} of {TOTAL_STEPS}
          </span>
          <span>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}% Completed</span>
        </div>
        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-black/5">
          <motion.div
            className="h-full bg-teal"
            initial={false}
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Wizard Form Card */}
      <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-sm sm:p-10">
        <AnimatePresence mode="wait">
          {/* STEP 0: Education Level */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                <GraduationCap size={16} /> Academic Level
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                What is your current course or level of education?
              </h2>
              <p className="mt-2 text-sm text-ink/65">
                Central & State scholarships are specifically earmarked by study stage.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(Object.entries(EDUCATION_LEVEL_LABELS) as [EducationLevel, string][]).map(
                  ([key, label]) => {
                    const isSelected = educationLevel === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setEducationLevel(key)}
                        className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                          isSelected
                            ? "border-teal bg-teal/10 text-teal-dark font-bold shadow-xs"
                            : "border-ink/10 hover:border-ink/30 text-ink/80 hover:bg-black/[0.02]"
                        }`}
                      >
                        <span className="text-sm">{label}</span>
                        {isSelected && <Check size={18} className="text-teal shrink-0 ml-2" />}
                      </button>
                    );
                  }
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 1: Social Category & Background */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                <Users size={16} /> Social Category & Reservation
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                Select your social category as per government records
              </h2>
              <p className="mt-2 text-sm text-ink/65">
                Many flagship scholarships have dedicated quotas (e.g. SC/ST Post-Matric, OBC YASASVI, Minority Begum Hazrat).
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(Object.entries(STUDENT_CATEGORY_LABELS) as [StudentCategory, string][]).map(
                  ([key, label]) => {
                    const isSelected = category === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setCategory(key)}
                        className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                          isSelected
                            ? "border-teal bg-teal/10 text-teal-dark font-bold shadow-xs"
                            : "border-ink/10 hover:border-ink/30 text-ink/80 hover:bg-black/[0.02]"
                        }`}
                      >
                        <span className="text-sm">{label}</span>
                        {isSelected && <Check size={18} className="text-teal shrink-0 ml-2" />}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Special Priority Checkboxes */}
              <div className="mt-6 space-y-2.5 rounded-2xl bg-black/[0.03] p-4 border border-black/5">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/60">
                  Special Eligibility Flags:
                </p>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={isSingleGirlChild}
                    onChange={(e) => setIsSingleGirlChild(e.target.checked)}
                    className="h-4 w-4 rounded accent-teal"
                  />
                  <span>I am a Single / Only Girl Child of my parents (UGC Priority)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={isDisability}
                    onChange={(e) => setIsDisability(e.target.checked)}
                    className="h-4 w-4 rounded accent-teal"
                  />
                  <span>I have a benchmark disability certificate (PwD 40%+)</span>
                </label>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Gender & Student Name */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                <Building size={16} /> Personal Details
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                What is your gender & student name?
              </h2>
              <p className="mt-2 text-sm text-ink/65">
                Special schemes like AICTE Pragati are solely for female students in technical streams.
              </p>

              <div className="mt-6">
                <label className="block text-xs font-bold uppercase text-ink/60 mb-2">
                  Student Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma or Rahul Verma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-teal focus:outline-hidden"
                />
              </div>

              <div className="mt-6">
                <label className="block text-xs font-bold uppercase text-ink/60 mb-2">
                  Gender *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "female" as Gender, label: "Female (Girl)" },
                    { id: "male" as Gender, label: "Male" },
                    { id: "any" as Gender, label: "Other" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGender(g.id)}
                      className={`rounded-2xl border p-4 text-center text-sm font-semibold transition ${
                        gender === g.id
                          ? "border-teal bg-teal/10 text-teal-dark font-bold shadow-xs"
                          : "border-ink/10 hover:border-ink/30 text-ink/80 hover:bg-black/[0.02]"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Family Annual Income */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                <Wallet size={16} /> Income Criterion
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                What is your total family annual income?
              </h2>
              <p className="mt-2 text-sm text-ink/65">
                Most government scholarships require an income certificate below ₹2.5L, ₹4.5L, or ₹8.0L.
              </p>

              <div className="mt-6 space-y-3">
                {INCOME_BRACKETS.map((b) => {
                  const isSelected = familyIncome === b.maxIncome;
                  return (
                    <button
                      key={b.label}
                      onClick={() => setFamilyIncome(b.maxIncome)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-teal bg-teal/10 text-teal-dark font-bold shadow-xs"
                          : "border-ink/10 hover:border-ink/30 text-ink/80 hover:bg-black/[0.02]"
                      }`}
                    >
                      <span className="text-sm">{b.label}</span>
                      {isSelected && <Check size={18} className="text-teal shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Academic Marks in Previous Exam */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                <Award size={16} /> Academic Performance
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                What was your percentage in your last qualifying exam?
              </h2>
              <p className="mt-2 text-sm text-ink/65">
                Merit schemes (such as DST INSPIRE or Central Sector PM-USP) require 75% or 80th percentile.
              </p>

              <div className="mt-6 space-y-3">
                {MARKS_BRACKETS.map((m) => {
                  const isSelected = marksPercentage === m.minScore;
                  return (
                    <button
                      key={m.label}
                      onClick={() => setMarksPercentage(m.minScore)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-teal bg-teal/10 text-teal-dark font-bold shadow-xs"
                          : "border-ink/10 hover:border-ink/30 text-ink/80 hover:bg-black/[0.02]"
                      }`}
                    >
                      <span className="text-sm">{m.label}</span>
                      {isSelected && <Check size={18} className="text-teal shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation Buttons */}
        <div className="mt-9 flex items-center justify-between border-t border-ink/10 pt-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold text-ink/70 hover:text-ink transition"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canNext()}
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition shadow-md ${
              canNext()
                ? "bg-teal text-white hover:bg-teal-dark hover:-translate-y-0.5"
                : "bg-black/10 text-black/40 cursor-not-allowed"
            }`}
          >
            {step === TOTAL_STEPS - 1 ? (
              <>
                <Sparkles size={16} /> Find My Scholarships
              </>
            ) : (
              <>
                Next Step <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
