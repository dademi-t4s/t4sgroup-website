'use client';

import { motion, Variants } from 'framer-motion';
import { Children, ReactNode } from 'react';

const subtleVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.05, ease: [0.215, 0.61, 0.355, 1] },
  },
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  mode?: 'subtle' | 'rise';
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  once = true,
  mode = 'subtle',
}: Props) {
  if (mode === 'rise') {
    // Rise mode: each direct child observes the viewport on its own and
    // animates from y:90 → 0 with a staggered delay. Avoids variant
    // inheritance edge cases when the wrapper has no explicit display.
    return (
      <div className={className}>
        {Children.map(children, (child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 90 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin: '-10%' }}
            transition={{
              duration: 1.15,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.13,
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  // Subtle mode — single block reveal, no stagger.
  return (
    <motion.div
      variants={subtleVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-12%' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
