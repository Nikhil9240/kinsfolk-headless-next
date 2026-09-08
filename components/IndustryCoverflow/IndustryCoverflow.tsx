"use client";

import { useState } from "react";
import "./industry-coverflow.css";

const industries = [
  {
    id: 1,
    title: "Banking & Financial",
    slug: "banking-financial-services",
    image: "/images/industry/banking.webp",
    description:
      "In today’s highly regulated BFSI landscape, agility, security, and compliance are non-negotiable. Kinsfolk delivers enterprise-grade IT solutions enabling modernization and resilience.",
  },
  {
    id: 2,
    title: "Financial Technology",
    slug: "fintech",
    image: "/images/industry/fintech.webp",
    description:
      "Fintech demand speed, scalability, and resilience. Kinsfolk supports cloud-first, always-on operations with secure IT platforms.",
  },
  {
    id: 3,
    title: "Pharmaceutical",
    slug: "pharmaceutical",
    image: "/images/industry/pharmaceutical.webp",
    description:
      "Pharma enterprises require audit-ready, compliant, and automated IT operations supporting R&D, manufacturing, and supply chains.",
  },
  {
    id: 4,
    title: "IT-Enabled Services",
    slug: "it-enabled-services",
    image: "/images/industry/it-enabled.webp",
    description:
      "ITES organizations thrive on efficiency and uptime. Kinsfolk modernizes platforms and enables scalable delivery models.",
  },
  {
    id: 5,
    title: "Telecommunications",
    slug: "telecommunications",
    image: "/images/industry/telecommunications.webp",
    description:
      "Telecom operators require high availability and performance with automation-driven, resilient IT operations.",
  },
  {
    id: 6,
    title: "Manufacturing",
    slug: "manufacturing",
    image: "/images/industry/manufacturing.webp",
    description:
      "Manufacturers face pressure to reduce downtime and modernize systems. Kinsfolk enables smart factory transformation.",
  },
];

export default function IndustryCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = industries.length;

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? total - 1 : current - 1
    );
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const getPosition = (index: number) => {
    let position = index - activeIndex;

    if (position > total / 2) {
      position -= total;
    }

    if (position < -total / 2) {
      position += total;
    }

    return position;
  };

  const openIndustry = (slug: string) => {
    window.location.assign(`/industries/${slug}`);
  };

  return (
    <section className="industry-coverflow-section">
      {/* HEADER */}
      <div className="industry-coverflow-header">
        <span className="industry-eyebrow">
          INDUSTRIES
        </span>

        <h2>
          Proven in Regulated,
          <span> High Stakes Industries </span>
        </h2>

        <p>
          Where downtime gets reported and every security finding reaches the board.
        </p>
      </div>

      {/* COVERFLOW */}
      <div className="industry-coverflow">
        <button
          type="button"
          className="industry-arrow industry-arrow-left"
          onClick={prevSlide}
          aria-label="Previous industry"
        >
          ‹
        </button>

        <div className="industry-track">
          {industries.map((industry, index) => {
            const position = getPosition(index);
            const isActive = position === 0;

            const visible =
              position >= -2 && position <= 2;

            if (!visible) {
              return null;
            }

            return (
              <article
                key={industry.id}
                className={`industry-card ${
                  isActive ? "is-active" : ""
                } position-${position}`}
                onClick={() => openIndustry(industry.slug)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    openIndustry(industry.slug);
                  }
                }}
                role="link"
                tabIndex={0}
                aria-label={`Explore ${industry.title}`}
              >
                <div className="industry-card-image">
                  <img
                    src={industry.image}
                    alt={industry.title}
                  />

                  <div className="industry-image-overlay" />
                </div>

                <div className="industry-card-content">
                  <span className="industry-card-number">
                    {String(industry.id).padStart(2, "0")}
                  </span>

                  <h3>{industry.title}</h3>

                  <p>{industry.description}</p>

                  <a
                    href={`/industries/${industry.slug}`}
                    className="industry-card-link"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    Explore Industry
                    <span>→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="industry-arrow industry-arrow-right"
          onClick={nextSlide}
          aria-label="Next industry"
        >
          ›
        </button>
      </div>

      {/* DOTS */}
      <div className="industry-dots">
        {industries.map((industry, index) => (
          <button
            key={industry.id}
            type="button"
            aria-label={`Go to ${industry.title}`}
            className={`industry-dot ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* MOBILE / TABLET TITLE */}
      <div className="industry-active-info">
        <span>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>

        <strong>
          {industries[activeIndex].title}
        </strong>
      </div>
    </section>
  );
}
