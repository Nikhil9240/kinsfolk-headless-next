"use client";

import Link from "next/link";
import styles from "./IndustryHero.module.css";

type IndustryHeroProps = {
  title: string;
  description: string;
};

export default function IndustryHero({
  title,
  description,
}: IndustryHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlowOne} aria-hidden="true" />
      <div className={styles.heroGlowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Hero Content */}
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span
                className={styles.eyebrowDot}
                aria-hidden="true"
              />
              INDUSTRIES
            </div>

            {/* One H1 per page */}
            <h1>{title}</h1>

            <p className={styles.heroText}>
              {description}
            </p>

            {/* Two Hero Actions */}
            <div className={styles.heroButtons}>
              <Link
                href="#solutions"
                className={styles.primaryButton}
              >
                <span>Explore Our Solutions</span>

                <span
                  className={styles.buttonArrow}
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                href="/contact"
                className={styles.secondaryButton}
              >
                <span>Contact Us</span>

                <span
                  className={styles.buttonArrow}
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right side intentionally blank */}
          <div
            className={styles.heroVisual}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}