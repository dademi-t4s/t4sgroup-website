'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

/**
 * Full-screen logo intro shown on first paint. Locks scroll, reveals the
 * logo with blur clear and subtle scale, lingers, then drops away to
 * uncover the site.
 */
export default function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Always start the experience at the top after a refresh — disable
    // the browser's automatic scroll restoration and snap to (0, 0).
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
      // Re-pin the scroll right as the intro lifts so any restore that
      // sneaked through the lock gets overridden.
      window.scrollTo(0, 0);
      // Notify the rest of the app intro finished
      window.dispatchEvent(new Event('intro-done'));
    }, 2600);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#04060a' }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.6, 0.01, 0, 1] } }}
        >
          {/* radial sweep from center */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(239,68,68,0.22) 0%, rgba(127,29,29,0.12) 35%, transparent 65%)',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1.1, 1.4, 1.8] }}
            transition={{ duration: 2.6, ease: 'easeOut' }}
          />

          {/* logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(18px)' }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.92, 1, 1, 1.18],
              filter: [
                'blur(18px)',
                'blur(0px)',
                'blur(0px)',
                'blur(8px)',
              ],
            }}
            transition={{ duration: 2.6, times: [0, 0.32, 0.78, 1], ease: 'easeInOut' }}
          >
            <Image
              src={asset('/logo.png')}
              alt="T4S Group"
              width={130}
              height={130}
              priority
              className="rounded-full"
            />
            <motion.div
              className="mt-6 text-[0.72rem] tracking-[0.4em] uppercase text-white/60"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
              transition={{ duration: 2.6, times: [0, 0.45, 0.78, 1] }}
            >
              T4S Group
            </motion.div>
          </motion.div>

          {/* center hairline */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(252,165,165,0.4) 20%, rgba(239,68,68,0.85) 50%, rgba(127,29,29,0.5) 80%, transparent)',
              boxShadow: '0 0 12px rgba(239,68,68,0.55)',
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: ['0vw', '60vw', '60vw', '0vw'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.6, times: [0, 0.4, 0.7, 1], ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
