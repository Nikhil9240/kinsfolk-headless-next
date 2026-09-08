"use client";

import "./HeroBackground.css";

const PILLS = [
  { text: "Agentic AI", className: "hb-pill--automation" },
  { text: "Gen AI Driven Operations", className: "hb-pill--enterprise" },
  { text: "AI Service Management", className: "hb-pill--data" },
  { text: "AI-Ops", className: "hb-pill--predictive" },
  { text: "AI Asset Management", className: "hb-pill--agentic" },
  { text: "Hyper Automation", className: "hb-pill--analytics" },
  { text: "Enterprise Data Management", className: "hb-pill--right" },
  { text: "AI driven Security", className: "hb-pill--integrations" },
] as const;

/**
 * USAGE — wrap this component in a `.hero-section` element so the
 * full-bleed rule in HeroBackground.css can break the rings out of
 * any parent max-width/container. Without this wrapper, if the page
 * embeds HeroBackground inside a narrower layout container, the
 * rings can get hard-clipped at the container's edge.
 *
 *   <section className="hero-section">
 *     <HeroBackground />
 *     <div className="hero-content">...headline, CTAs...</div>
 *   </section>
 */
export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      {/* Background video (optional — hidden by default via CSS) */}
      <video
        className="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark / blue overlay */}
      <div className="hb-overlay" />

      {/* Ambient glow */}
      <div className="hb-glow hb-glow--top" />
      <div className="hb-glow hb-glow--center" />
      <div className="hb-glow hb-glow--bottom" />

      {/* Rotating rings */}
      <div className="hb-rings">
        <span className="hb-ring hb-ring--solid hb-ring--1" />
        <span className="hb-ring hb-ring--arc hb-ring--1" />

        <span className="hb-ring hb-ring--solid hb-ring--2" />
        <span className="hb-ring hb-ring--arc hb-ring--2" />

        <span className="hb-ring hb-ring--solid hb-ring--3" />
        <span className="hb-ring hb-ring--arc hb-ring--3" />

        <span className="hb-ring hb-ring--solid hb-ring--4" />
        <span className="hb-ring hb-ring--arc hb-ring--4" />
      </div>

      <div className="hb-center-glow" />

      {/* Floating pills */}
      <div className="hb-pills">
        {PILLS.map((pill) => (
          <span key={pill.text} className={`hb-pill ${pill.className}`}>
            <span className="hb-pill-dot" />
            {pill.text}
          </span>
        ))}
      </div>
    </div>
  );
}
