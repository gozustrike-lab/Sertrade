'use client';

import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Counter from './Counter';
import ScrollReveal from './ScrollReveal';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
  isActive?: boolean;
}

export default function StatCard({
  icon: Icon,
  value,
  suffix = '',
  prefix = '',
  label,
  delay = 0,
  isActive = false,
}: StatCardProps) {
  return (
    <ScrollReveal animation="fade-up" delay={delay} duration={1.2}>
      <motion.div
        className="stat-card"
        animate={{
          backgroundColor: isActive ? '#ffffff' : '#004691',
          boxShadow: isActive
            ? '0 10px 25px rgba(0, 0, 0, 0.1)'
            : '0 15px 35px rgba(0, 28, 61, 0.08)',
          y: isActive ? -4 : 0,
        }}
        transition={{
          type: 'tween',
          duration: 0.5,
          ease: 'easeInOut',
        }}
        style={{
          borderColor: isActive ? '#e8eaed' : 'transparent',
        }}
      >
        {/* Icon — ALWAYS gold #D4AF37, independent of card state */}
        <div
          className="stat-card-icon"
          style={{ color: '#D4AF37' }}
        >
          <Icon size={36} strokeWidth={1.5} />
        </div>

        {/* Animated Counter — white by default, blue on active */}
        <div
          className={`stat-card-value transition-colors duration-300 ${isActive ? 'text-[#004691]' : 'text-white'}`}
        >
          <Counter
            target={value}
            prefix={prefix}
            suffix={suffix}
            duration={3.5}
          />
        </div>

        {/* Label — white by default, gray on active */}
        <div
          className={`stat-card-label transition-colors duration-300 ${isActive ? 'text-gray-600' : 'text-white'}`}
        >
          {label}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
