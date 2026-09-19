import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import { usePreferences } from '../lib/preferences';

export default function SplashIntro() {
  const { t } = usePreferences();
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-ink text-cream">
      <motion.div className="absolute h-72 w-72 rounded-full bg-gold/20 blur-3xl" animate={{ scale: [0.8, 1.25, 0.95], opacity: [0.2, 0.5, 0.25] }} transition={{ duration: 2.1 }} />
      <motion.div initial={{ opacity: 0, scale: 0.72 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: 'easeOut' }} className="relative text-center">
        <motion.div animate={{ y: [12, -8, 0], rotate: [0, 8, 0] }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-teal shadow-2xl ring-1 ring-white/15">
          <Compass size={40} strokeWidth={2.1} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight">Udaan</h1>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gold-soft"><Sparkles size={14} /> {t('splashLine')}</p>
        </motion.div>
        <motion.div className="mx-auto mt-7 h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gold" initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
