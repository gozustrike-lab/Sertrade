'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { setIsLoading(false); document.body.style.overflow = ''; }, 600);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, []);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div className="fixed inset-0 z-[10000] flex items-center justify-center" style={{ backgroundColor: 'var(--brand-primary, #004691)' }}
          initial={{ opacity: 1 }} exit={{ opacity: 0, y: '-100%', transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.95] }} transition={{ duration: 0.6, times: [0, 0.33, 0.67, 1] }}>
            <img src="/logo-white.svg" alt="" width={120} height={120} className="brightness-0 invert object-contain block" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
