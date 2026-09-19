import { UserRoundCog, Cpu, ListChecks } from "lucide-react";
import { usePreferences } from '../lib/preferences';

export default function HowItWorks() {
  const { language } = usePreferences();
  const content = language === 'hi' ? {
    label: 'यह कैसे काम करता है', title: 'तीन आसान स्टेप में confusion से clear action plan तक।',
    steps: [
      ['अपनी प्रोफ़ाइल बताएँ', 'अपनी पढ़ाई/बिज़नेस, श्रेणी, स्टेज और जरूरत की जानकारी आसान form में दें।'],
      ['Matching engine eligibility जाँचता है', 'Udaan category, income, sector, education और funding जैसी शर्तों से relevant अवसर rank करता है।'],
      ['Ranked result और apply guide पाएँ', 'Match %, documents और official portal link के साथ step-by-step guidance पाएँ।'],
    ]
  } : language === 'hinglish' ? {
    label: 'Kaise kaam karta hai', title: '3 easy steps me confusion se clear action plan tak.',
    steps: [
      ['Apni profile batao', 'Education/business, category, stage aur need friendly form me share karo.'],
      ['Matching engine eligibility check karta hai', 'Udaan category, income, sector, education aur funding rules ke basis par opportunities rank karta hai.'],
      ['Ranked result + apply guide pao', 'Match %, documents aur official portal link ke saath step-by-step guidance pao.'],
    ]
  } : {
    label: 'How it works', title: 'From confusion to a clear action plan in three steps.',
    steps: [
      ['Tell us your profile', 'Share your education or business background, category, stage and need through a friendly form.'],
      ['The matching engine checks eligibility', 'Udaan ranks opportunities using category, income, sector, education and funding criteria.'],
      ['Get ranked results and an apply guide', 'See match %, required documents and an official portal link with step-by-step guidance.'],
    ]
  };
  const icons = [UserRoundCog, Cpu, ListChecks];

  return <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
    <div className="max-w-2xl"><span className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">{content.label}</span><h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{content.title}</h2></div>
    <div className="mt-14 grid gap-6 md:grid-cols-3">{content.steps.map(([title,body],i)=>{const Icon=icons[i];return <div key={title} className="group relative rounded-3xl border border-ink/10 bg-white/60 p-8 transition hover:-translate-y-1 hover:shadow-xl"><span className="font-display text-6xl font-semibold text-ink/5 transition group-hover:text-gold/30">0{i+1}</span><div className="-mt-9 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal text-cream shadow-sm"><Icon size={22}/></div><h3 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/60">{body}</p></div>})}</div>
  </section>;
}
