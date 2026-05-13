'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* =============================================
   HEXAGONAL LOGO SVG (matches Header.tsx)
   ============================================= */
function HexLogoWhite({ size = 120 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <polygon
        points="32,4 56.6,18 56.6,46 32,60 7.4,46 7.4,18"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line x1="19" y1="11" x2="45" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="11" x2="19" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="53" x2="45" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="53" x2="19" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="32" x2="51" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <polygon
        points="32,22 40.4,26.5 40.4,37.5 32,42 23.6,37.5 23.6,26.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /* Lock body scroll while preloader is visible */
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: '#004691' }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: {
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
        >
          {/* Logo: Fade In + Scale (0.2s) → Hold (0.2s) → Fade Out (0.2s) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.95],
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.33, 0.67, 1],
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <HexLogoWhite size={120} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
