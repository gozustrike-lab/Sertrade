'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function Counter({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);

    /* Simple spring-like interpolation using requestAnimationFrame */
    const startTime = performance.now();
    const stiffness = 100;
    const damping = 30;

    const springTick = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000; // seconds
      const t = Math.min(elapsed / duration, 1);

      /* Damped spring approximation: (1 - e^(-ζωt)) * (1 + e^(-ζωt) * cos(ωd*t)) */
      const zeta = damping / (2 * Math.sqrt(stiffness));
      const omega = Math.sqrt(stiffness);
      const omegaD = omega * Math.sqrt(Math.abs(1 - zeta * zeta));
      const exponential = Math.exp(-zeta * omega * t);
      const springValue = (1 - exponential) * (1 + exponential * Math.cos(omegaD * t));

      const currentValue = Math.round(springValue * target);

      /* Clamp to avoid overshoot past target */
      setCount(Math.min(currentValue, target));

      if (t < 1) {
        requestAnimationFrame(springTick);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(springTick);
  }, [isInView, hasAnimated, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString('es-PE')}
      {suffix}
    </span>
  );
}
