import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import { usePreferences } from '../lib/preferences';

const particles = Array.from({ length: 24 }, (_, i) => i);

export default function SplashIntro() {
  const { t } = usePreferences();
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#071f1a] text-[#f7f0e2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(224,170,63,.16),transparent_28%),radial-gradient(circle_at_20%_78%,rgba(34,124,105,.16),transparent_30%),linear-gradient(145deg,#071f1a,#09271f_55%,#061914)]" />
      <div className="grain-overlay absolute inset-0 opacity-35" />
      <div className="absolute -right-36 -top-36 h-[32rem] w-[32rem] rounded-full border border-[#d9a53f]/15" />
      <div className="absolute -bottom-36 -left-36 h-[32rem] w-[32rem] rounded-full border border-[#2e8b78]/15" />

      {particles.map((i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#f0c35e]/60"
          style={{ left: `${8 + ((i * 31) % 84)}%`, top: `${8 + ((i * 47) % 76)}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, .75, .12], scale: [0, 1.3, .55], y: [8, -14, -20] }}
          transition={{ duration: 1.7 + (i % 5) * .13, delay: (i % 9) * .06, ease: 'easeOut' }}
        />
      ))}

      <motion.div initial={{ opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65 }} className="relative text-center">
        <motion.div
          animate={{ y: [3, -5, 0], rotate: [-2, 2, 0] }}
          transition={{ duration: 1.55, ease: 'easeInOut' }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-[#e7b54f]/20 bg-[#0d392f]/80 shadow-[0_0_80px_rgba(229,177,68,.14)] backdrop-blur-xl"
        >
          <Compass size={48} className="text-[#f0c35e]" strokeWidth={1.8} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">Udaan</h1>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm tracking-wide text-[#f7f0e2]/65"><Sparkles size={14} className="text-[#f0c35e]" /> {t('splashLine')}</p>
        </motion.div>
        <div className="mx-auto mt-8 h-[3px] w-52 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#2e8b78] via-[#c7aa5d] to-[#f0b84d]" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.75, delay: .15, ease: 'easeInOut' }} />
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: .58 }} transition={{ delay: .8 }} className="mt-3 text-[10px] uppercase tracking-[.35em] text-[#f7f0e2]">Loading a brighter tomorrow</motion.p>
      </motion.div>
    </div>
  );
}
