import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  IndianRupee,
  Percent,
  Calendar,
  Sparkles,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface Props {
  onFindSchemes?: (amountInLakhs: number) => void;
  onClose?: () => void;
}

export default function EmiCalculator({ onFindSchemes, onClose }: Props) {
  // Amount in INR
  const [amount, setAmount] = useState<number>(500000);
  // Annual interest rate in %
  const [interestRate, setInterestRate] = useState<number>(8.5);
  // Tenure in years
  const [tenureYears, setTenureYears] = useState<number>(5);
  // Optional subsidy percentage from government scheme (0 - 35%)
  const [subsidyPercent, setSubsidyPercent] = useState<number>(0);

  // Quick amount presets
  const presets = [
    { label: "₹50K (SVANidhi)", val: 50000 },
    { label: "₹5L (Mudra Kishore)", val: 500000 },
    { label: "₹10L (Mudra Tarun)", val: 1000000 },
    { label: "₹25L (PMEGP Max)", val: 2500000 },
    { label: "₹50L (Stand-Up India)", val: 5000000 },
    { label: "₹1 Cr (MSME)", val: 10000000 },
  ];

  // Benchmark interest rates
  const interestBenchmarks = [
    { label: "0% - 4% (Govt Subsidized / NMDFC)", rate: 4 },
    { label: "8.5% (Avg. Mudra / Bank Loan)", rate: 8.5 },
    { label: "11% (Commercial Business Loan)", rate: 11 },
  ];

  // Calculation logic
  const calculation = useMemo(() => {
    // Principal after government subsidy deduction
    const effectivePrincipal = Math.max(0, amount * (1 - subsidyPercent / 100));
    const subsidyAmount = amount - effectivePrincipal;

    const r = interestRate / (12 * 100); // monthly interest rate
    const n = tenureYears * 12; // total months

    let emi = 0;
    let totalPayable = 0;
    let totalInterest = 0;

    if (r === 0) {
      emi = effectivePrincipal / n;
      totalPayable = effectivePrincipal;
      totalInterest = 0;
    } else {
      const factor = Math.pow(1 + r, n);
      emi = (effectivePrincipal * r * factor) / (factor - 1);
      totalPayable = emi * n;
      totalInterest = totalPayable - effectivePrincipal;
    }

    const principalShare = totalPayable > 0 ? (effectivePrincipal / totalPayable) * 100 : 100;
    const interestShare = totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 0;

    return {
      effectivePrincipal,
      subsidyAmount,
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      principalShare: Math.round(principalShare),
      interestShare: Math.round(interestShare),
      totalMonths: n,
    };
  }, [amount, interestRate, tenureYears, subsidyPercent]);

  // Format currency in Indian numbering system
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "INR",
    }).format(val);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-ink/10 bg-gradient-to-r from-ink via-teal-dark to-ink p-6 text-cream shadow-xl sm:p-9"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-soft">
              <Calculator size={14} /> Official Scheme & Loan EMI Calculator
            </span>
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Calculate Your Business or Education Loan EMI
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-cream/75">
              Estimate monthly payments, interest outgo, and see how government subsidies under
              PMEGP or Mudra can significantly reduce your monthly liability.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full bg-cream/10 px-4 py-2 text-xs font-semibold text-cream hover:bg-cream/20 transition"
            >
              Back
            </button>
          )}
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left Column: Sliders & Controls */}
        <div className="space-y-6 rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
          {/* Loan Amount */}
          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-bold text-ink">
                <IndianRupee size={16} className="text-teal" /> Loan Required Amount
              </label>
              <span className="font-display text-lg font-bold text-teal-dark">
                {formatINR(amount)}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={10000000}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/10 accent-teal"
            />
            {/* Quick Presets */}
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.val}
                  onClick={() => setAmount(p.val)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                    amount === p.val
                      ? "bg-teal text-white shadow-xs"
                      : "bg-black/5 text-ink/70 hover:bg-black/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="border-t border-ink/5 pt-5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-bold text-ink">
                <Percent size={16} className="text-terracotta" /> Annual Interest Rate (% p.a.)
              </label>
              <span className="font-display text-lg font-bold text-terracotta">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/10 accent-terracotta"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {interestBenchmarks.map((b) => (
                <button
                  key={b.rate}
                  onClick={() => setInterestRate(b.rate)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                    interestRate === b.rate
                      ? "bg-terracotta text-white shadow-xs"
                      : "bg-black/5 text-ink/70 hover:bg-black/10"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tenure */}
          <div className="border-t border-ink/5 pt-5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-bold text-ink">
                <Calendar size={16} className="text-gold" /> Loan Tenure
              </label>
              <span className="font-display text-lg font-bold text-ink">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/10 accent-gold"
            />
            <div className="mt-3 flex gap-2">
              {[1, 3, 5, 7, 10].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTenureYears(yr)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    tenureYears === yr
                      ? "bg-ink text-white"
                      : "bg-black/5 text-ink/70 hover:bg-black/10"
                  }`}
                >
                  {yr} {yr === 1 ? "Year" : "Years"}
                </button>
              ))}
            </div>
          </div>

          {/* Govt Subsidy Simulation */}
          <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-dark">
                <Sparkles size={15} /> Govt Scheme Subsidy Simulation (e.g. PMEGP)
              </div>
              <span className="font-bold text-teal-dark">{subsidyPercent}% Subsidy</span>
            </div>
            <p className="mt-1 text-xs text-ink/65">
              Select an applicable government capital subsidy to see how it cuts your loan amount.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "No Subsidy (0%)", val: 0 },
                { label: "15% (Urban General)", val: 15 },
                { label: "25% (Rural / Woman)", val: 25 },
                { label: "35% (Special / SC-ST / Rural)", val: 35 },
              ].map((sub) => (
                <button
                  key={sub.val}
                  onClick={() => setSubsidyPercent(sub.val)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    subsidyPercent === sub.val
                      ? "bg-teal-dark text-cream shadow-xs"
                      : "bg-white text-ink/70 border border-teal/20 hover:bg-teal/10"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Output Summary Card */}
        <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
              Estimated Monthly Payment
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <h2 className="font-display text-4xl font-extrabold text-teal-dark sm:text-5xl">
                {formatINR(calculation.monthlyEmi)}
              </h2>
              <span className="text-sm font-semibold text-ink/60">/ month</span>
            </div>

            {subsidyPercent > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal-dark">
                <TrendingDown size={14} /> Govt Subsidy saves {formatINR(calculation.subsidyAmount)} upfront!
              </div>
            )}

            {/* Breakdown Stats */}
            <div className="mt-6 space-y-3 rounded-2xl bg-cream p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-ink/60">Principal Amount:</span>
                <span className="font-bold text-ink">{formatINR(calculation.effectivePrincipal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Total Interest Outgo:</span>
                <span className="font-bold text-terracotta">{formatINR(calculation.totalInterest)}</span>
              </div>
              <div className="border-t border-ink/10 pt-2 flex justify-between">
                <span className="font-semibold text-ink">Total Payable ({calculation.totalMonths} months):</span>
                <span className="font-display font-bold text-ink">{formatINR(calculation.totalPayable)}</span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-semibold text-ink/60">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal" /> Principal (
                  {calculation.principalShare}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-terracotta" /> Interest (
                  {calculation.interestShare}%)
                </span>
              </div>
              <div className="mt-2 flex h-3 w-full overflow-hidden rounded-full bg-black/10">
                <div
                  className="bg-teal transition-all duration-300"
                  style={{ width: `${calculation.principalShare}%` }}
                />
                <div
                  className="bg-terracotta transition-all duration-300"
                  style={{ width: `${calculation.interestShare}%` }}
                />
              </div>
            </div>

            {/* Official Portals Guarantee Note */}
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-black/5 bg-black/[0.02] p-3 text-xs text-ink/70">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal" />
              <span>
                <strong>Govt Subsidized Rate Guarantee:</strong> Schemes like PM SVANidhi offer 7% interest subsidy, while Mudra loans do not require any collateral up to ₹10 Lakh.
              </span>
            </div>
          </div>

          {/* Action to find matching schemes */}
          {onFindSchemes && (
            <button
              onClick={() => onFindSchemes(amount / 100000)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-terracotta py-4 text-sm font-bold text-cream shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              <Building2 size={16} /> Check Eligible Loans for {formatINR(amount)} <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
