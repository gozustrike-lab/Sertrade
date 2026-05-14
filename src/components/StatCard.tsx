'use client';

import { type LucideIcon } from 'lucide-react';
import Counter from './Counter';
import ScrollReveal from './ScrollReveal';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}

export default function StatCard({
  icon: Icon,
  value,
  suffix = '',
  prefix = '',
  label,
  delay = 0,
}: StatCardProps) {
  return (
    <ScrollReveal animation="fade-up" delay={delay} duration={1.2}>
      <div className="stat-card">
        {/* Icon */}
        <div className="stat-card-icon">
          <Icon size={36} strokeWidth={1.5} />
        </div>

        {/* Animated Counter */}
        <div className="stat-card-value">
          <Counter
            target={value}
            prefix={prefix}
            suffix={suffix}
            duration={3.5}
          />
        </div>

        {/* Label */}
        <div className="stat-card-label">
          {label}
        </div>
      </div>
    </ScrollReveal>
  );
}
