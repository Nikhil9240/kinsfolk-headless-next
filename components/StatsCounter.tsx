"use client";

import { useEffect, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  {
    value: 5,
    suffix: "+",
    label: "years of proven delivery",
  },
  {
    value: 15,
    suffix: "+",
    label: "OEM partnership",
  },
  {
    value: 150,
    suffix: "+",
    label: "successful implementations",
  },
  {
    value: 450,
    suffix: "+",
    label: " specialists across six offices",
  },
];

type CounterProps = {
  value: number;
  suffix: string;
  label: string;
};

function Counter({
  value,
  suffix,
  label,
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 700;
    const startTime = performance.now();

    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const currentValue = Math.floor(
        value * progress
      );

      setCount(currentValue);

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <div className="statBox">
      <div className="statNumber">
        {count}
        {suffix}
      </div>

      <div className="statLabel">
        {label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <div className="statsGrid">
      {stats.map((stat) => (
        <Counter
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
        />
      ))}
    </div>
  );
}