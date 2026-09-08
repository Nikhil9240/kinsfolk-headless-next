"use client";

import "./StatsCounter.css";

import {
  Trophy,
  BriefcaseBusiness,
  Handshake,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useEffect, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  Icon: LucideIcon;
};

const stats: Stat[] = [
  {
    value: 5,
    suffix: "+",
    label: "Partner of the year awards",
    Icon: Trophy,
  },
  {
    value: 12,
    suffix: "+",
    label: "Years of proven delivery",
    Icon: BriefcaseBusiness,
  },
  {
    value: 15,
    suffix: "+",
    label: "OEM partnerships",
    Icon: Handshake,
  },
  {
    value: 150,
    suffix: "+",
    label: "Successful implementations",
    Icon: Rocket,
  },
  {
    value: 450,
    suffix: "+",
    label: "Specialists across six offices",
    Icon: Users,
  },
];

type CounterProps = {
  value: number;
  suffix: string;
  label: string;
  Icon: LucideIcon;
};

function Counter({
  value,
  suffix,
  label,
  Icon,
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 900;
    const startTime = performance.now();

    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setCount(
        Math.floor(value * easedProgress)
      );

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
      <div className="statIcon">
        <Icon />
      </div>

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
    <section className="statsSection">
      <div className="statsContainer">
        {/* Section heading */}
        <div className="statsHeading">
          <div className="statsEyebrow">
            <center>OUR IMPACT</center>
          </div>

          <div className="statsHeadingContent">
            <h2>
              Transforming Ideas Into Impact
            </h2>

            <p>
              Simplify workflows, accelerate outcomes,
              and deliver measurable impact across your
              business.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="statsGrid">
          {stats.map((stat) => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              Icon={stat.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}