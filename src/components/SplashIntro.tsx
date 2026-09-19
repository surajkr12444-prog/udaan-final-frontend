import { motion } from 'framer-motion';
import { Feather, Sparkles } from 'lucide-react';
import { usePreferences } from '../lib/preferences';

const particles = Array.from({ length: 28 }, (_, i) => i);

export default function SplashIntro() {
  const { t } = usePreferences();
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#030b17] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(38,130,255,.18),transparent_34%),radial-gradient(circle_at_58%_48%,rgba(245,171,61,.08),transparent_24%)]" />
      {particles.map((i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-sky-300/70"
          style={{ left: `${8 + ((i * 31) % 84)}%`, top: `${8 + ((i * 47) % 76)}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, .9, .2], scale: [0, 1.4, .6], y: [10, -16, -22] }}
          transition={{ duration: 1.7 + (i % 5) * .13, delay: (i % 9) * .07, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="absolute h-[28rem] w-[28rem] rounded-full border border-sky-400/20"
        initial={{ scale: .6, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 20 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute h-[23rem] w-[23rem] rounded-full border border-amber-300/20"
        initial={{ scale: .8, opacity: 0, rotate: 35 }}
        animate={{ scale: 1.08, opacity: .8, rotate: -20 }}
        transition={{ duration: 1.7, ease: 'easeOut' }}
      />

      <motion.div initial={{ opacity: 0, scale: .82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65 }} className="relative text-center">
        <motion.div
          animate={{ y: [4, -7, 0], rotate: [-4, 4, 0] }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-sky-300/20 bg-white/[.04] shadow-[0_0_80px_rgba(56,189,248,.25)] backdrop-blur-xl"
        >
          <Feather size={50} className="text-sky-300" strokeWidth={1.7} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .32 }}>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">Udaan</h1>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm tracking-wide text-sky-100/70"><Sparkles size={14} /> {t('splashLine')}</p>
        </motion.div>
        <div className="mx-auto mt-8 h-[3px] w-52 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-400 to-amber-300" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.75, delay: .15, ease: 'easeInOut' }} />
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: .55 }} transition={{ delay: .8 }} className="mt-3 text-[10px] uppercase tracking-[.35em] text-white">Loading a brighter tomorrow</motion.p>
      </motion.div>
    </div>
  );
}
