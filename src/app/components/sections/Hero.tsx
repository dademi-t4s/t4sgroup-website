'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" data-phase={0} className="relative">
      <div className="ic-fh-section">
        <div
          className="max-w-[1400px] mx-auto w-full"
          style={{ paddingTop: '6vh' }}
        >
          <motion.h1
            className="ic-typ-h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              delay: 2.7,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            Strategic by Design
            <br />
            Systemic by Code
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 3.1,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mt-10 max-w-[640px]"
          >
            <p className="ic-typ-p">
              T4S Group® è una società svizzera di consulenza tecnologica al
              servizio delle PMI. Implementiamo CRM, integrazioni dati e
              sistemi AI applicati su misura dei processi reali — soluzioni
              concrete, scalabili e senza vendor-lock.
            </p>

            <a href="#horizons" className="ic-btn mt-8 inline-flex">
              Esplora i nostri Horizons
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#horizons"
        aria-label="Scroll down"
        className="ic-scroll-down"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 3.4 }}
      >
        <motion.span
          className="block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="22"
            height="34"
            viewBox="0 0 22 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M11 1V31M11 31L1 21M11 31L21 21"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </motion.a>

      <div className="ic-header-gradient" />
    </section>
  );
}
