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
      <div className="text-center p-6 sm:p-8 rounded-[12px] bg-[#f7f8fa] hover:bg-[#004691] group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 hover:border-[#004691]">
        {/* Icon */}
        <div className="w-14 h-14 rounded-[10px] bg-[#004691]/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/15 transition-all duration-500">
          <Icon
            size={40}
            strokeWidth={1.5}
            className="text-[#004691] group-hover:text-[#d4a017] transition-colors duration-500"
          />
        </div>

        {/* Animated Counter */}
        <div className="text-3xl sm:text-4xl font-bold text-[#004691] group-hover:text-white transition-colors duration-500 mb-2 tabular-nums">
          <Counter
            target={value}
            prefix={prefix}
            suffix={suffix}
            duration={3.5}
          />
        </div>

        {/* Label */}
        <div className="text-xs sm:text-sm text-[#4A4A4A] group-hover:text-white/70 transition-colors duration-500 font-medium tracking-wide uppercase">
          {label}
        </div>
      </div>
    </ScrollReveal>
  );
}
