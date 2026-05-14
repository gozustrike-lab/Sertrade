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
      <div className="text-center p-6 sm:p-7 rounded-[8px] bg-[#004691] group cursor-pointer border border-transparent shadow-[0_4px_15px_rgba(0,70,145,0.2)] transition-all duration-[300ms] ease-in-out hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-[#e8eaed] active:bg-white active:shadow-[0_10px_25px_rgba(0,0,0,0.1)] active:-translate-y-1">
        {/* Icon — Gold, no container */}
        <Icon
          size={36}
          strokeWidth={1.5}
          className="mx-auto mb-4 text-[#D4AF37] group-hover:text-[#004691] transition-colors duration-[300ms]"
        />

        {/* Animated Counter — White → Blue on hover */}
        <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#004691] transition-colors duration-[300ms] mb-1.5 tabular-nums">
          <Counter
            target={value}
            prefix={prefix}
            suffix={suffix}
            duration={3.5}
          />
        </div>

        {/* Label — Light gray → Dark gray on hover */}
        <div className="text-xs sm:text-[13px] text-[#F3F4F6] group-hover:text-[#4A4A4A] transition-colors duration-[300ms] font-medium tracking-wide uppercase">
          {label}
        </div>
      </div>
    </ScrollReveal>
  );
}
