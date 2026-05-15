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
        {/* Icon */}
        <div
          className="stat-card-icon"
          style={{ color: isActive ? '#004691' : '#C5960C' }}
        >
          <Icon size={36} strokeWidth={1.5} />
        </div>

        {/* Animated Counter */}
        <div
          className="stat-card-value"
          style={{ color: isActive ? '#004691' : '#ffffff' }}
        >
          <Counter
            target={value}
            prefix={prefix}
            suffix={suffix}
            duration={3.5}
          />
        </div>

        {/* Label */}
        <div
          className="stat-card-label"
          style={{ color: isActive ? '#4A4A4A' : '#F3F4F6' }}
        >
          {label}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
