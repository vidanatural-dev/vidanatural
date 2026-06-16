'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.23, 1, 0.32, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className = '',
  as = 'div',
  amount = 'some',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
  amount?: 'some' | 'all' | number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className = '',
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 'some', margin: '0px 0px -8% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = '',
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
