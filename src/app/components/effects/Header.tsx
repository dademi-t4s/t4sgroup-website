'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { asset } from '@/lib/asset';

const tabs = [
  { href: '#horizons', label: 'Horizons' },
  { href: '#t4s-core', label: 'T4S Core' },
  { href: '#tech-stack', label: 'Stack' },
  { href: '#from-vision', label: 'Processo' },
  { href: '#people', label: 'Team' },
  { href: '#contacts', label: 'Contatti' },
];

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 2.7, ease: [0.6, 0.01, 0, 1] }}
      className="fixed top-0 inset-x-0 z-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-3 md:py-5 grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <Image
            src={asset('/logo.png')}
            alt="T4S Group"
            width={888}
            height={486}
            priority
            // Natural 888×486 wordmark — declare real source size and scale
            // via width while letting height follow with `h-auto` so the logo
            // never gets squashed into a square.
            className="w-[68px] md:w-[100px] h-auto"
          />
        </a>

        {/* Centred tabs */}
        <nav className="hidden md:flex justify-center items-center gap-7">
          {tabs.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="text-[0.86rem] font-medium tracking-[-0.005em] text-white/65 hover:text-white transition-colors relative group"
            >
              {t.label}
              <span
                className="absolute left-0 right-0 -bottom-1.5 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(248,113,113,0.85), transparent)',
                }}
              />
            </a>
          ))}
        </nav>

        {/* Right tagline */}
        <p
          className="text-[0.78rem] leading-[1.25] tracking-[0.05em] text-white/55 text-right hidden sm:block"
          style={{ fontWeight: 300 }}
        >
          The next decade
          <br />
          of IT, today.
        </p>
      </div>
    </motion.header>
  );
}
