"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./CaseStudies.css";

type CaseStudy = {
  title: string;
  highlight: string;
  description: string;
  image: string;
  slug: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Transforming Digital Banking Experience",
    highlight: "with AIOps & Observability",
    description:
      "A leading Indian bank partnered with Kinsfolk to modernize enterprise operations by implementing an Observability and AIOps platform across its digital banking ecosystem.",
    image: "/images/case-studies/one-case.png",
    slug: "transforming-digital-banking-experience",
  },

  {
    title: "Reimagined HR Operations",
    highlight: "with BMC Helix Agentic AI",
    description:
      "A leading service firm transformed its manual HR operations by implementing the first BMC Helix Agentic AI solution.",
    image: "/images/case-studies/two-case.png",
    slug: "reimagined-hr-operations",
  },

  {
    title: "Optimizing Software Spend & License Compliance",
    highlight: "for a leading bank",
    description:
      "A leading Indian bank with a rapidly growing digital footprint manages a complex technology estate, requiring greater visibility, governance and control.",
    image: "/images/case-studies/three-case.webp",
    slug: "software-spend-license-compliance",
  },

  {
    title: "Revolutionising IMS Operations",
    highlight: "at Financial Services Organization",
    description:
      "A leading Indian financial services company offers a wide range of financial products and services with technology-driven operations.",
    image: "/images/case-studies/four-case.jpg",
    slug: "ims-operations-financial-services",
  },

  {
    title: "Strengthening Cyber Resilience",
    highlight: "and Regulatory Compliance",
    description:
      "The client is one of India's largest public sector banks, operating through 4,000+ service units and 49 zonal offices across the country.",
    image: "/images/case-studies/five-case.webp",
    slug: "cyber-resilience-regulatory-compliance",
  },

  {
    title: "Securing 77,500+ Endpoints",
    highlight: "with Trend Micro Apex One & Advanced EDR",
    description:
      "A leading public sector bank with a nationwide and international footprint faced increasing cyber threats, ransomware attacks, advanced malware campaigns and compliance challenges.",
    image: "/images/case-studies/six-case.webp",
    slug: "securing-endpoints-trend-micro",
  },
];

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = caseStudies.length;

  const nextIndex = (activeIndex + 1) % total;

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  const goPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? total - 1 : current - 1
    );
  };

  /* ============================================================
     AUTO SLIDER
  ============================================================ */

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const activeCase = caseStudies[activeIndex];
  const nextCase = caseStudies[nextIndex];

  return (
    <section className="case-studies-section">

      <div className="case-studies-container">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="case-studies-header">

          <div className="case-studies-heading">

            <span className="case-studies-eyebrow">
              Customer Impact 
            </span>

            <h2>
              Results, not Roadmaps
              <br />
              
            </h2>

            <p>
              
            </p>

          </div>


          {/* CONTROLS */}

          <div className="case-studies-controls">

            <button
              type="button"
              className="case-control pause-control"
              aria-label={
                isPaused
                  ? "Play case studies"
                  : "Pause case studies"
              }
              onClick={() => setIsPaused((value) => !value)}
            >
              {isPaused ? "▶" : "Ⅱ"}
            </button>


            <button
              type="button"
              className="case-control"
              aria-label="Previous case study"
              onClick={goPrevious}
            >
              ‹
            </button>


            <button
              type="button"
              className="case-control"
              aria-label="Next case study"
              onClick={goNext}
            >
              ›
            </button>

          </div>

        </div>


        {/* ======================================================
            SLIDER
        ====================================================== */}

        <div
          className="case-slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* ACTIVE CARD */}

          <article
            className="case-card case-card-active"
            key={`active-${activeIndex}`}
          >

            <img
              src={activeCase.image}
              alt={activeCase.title}
              className="case-card-image"
            />

            <div className="case-card-overlay" />

            <div className="case-card-content">

              <div className="case-card-label">
                <span className="case-card-icon">
                  ▣
                </span>

                CASE STUDY
              </div>


              <h3>
                {activeCase.title}
              </h3>


              <h4>
                {activeCase.highlight}
              </h4>


              <p>
                {activeCase.description}
              </p>


              <Link
                href={`/case-studies/${activeCase.slug}`}
                className="case-study-link"
              >
                <span>
                  Read Case Study
                </span>

                <strong>
                  →
                </strong>
              </Link>

            </div>

          </article>


          {/* NEXT PREVIEW */}

          <article
            className="case-card case-card-preview"
            key={`preview-${nextIndex}`}
          >

            <img
              src={nextCase.image}
              alt={nextCase.title}
              className="case-card-image"
            />

            <div className="case-card-overlay" />

            <div className="case-card-content">

              <div className="case-card-label">
                <span className="case-card-icon">
                  ▣
                </span>

                CASE STUDY
              </div>


              <h3>
                {nextCase.title}
              </h3>


              <h4>
                {nextCase.highlight}
              </h4>


              <p>
                {nextCase.description}
              </p>


              <Link
                href={`/case-studies/${nextCase.slug}`}
                className="case-study-link"
              >
                <span>
                  Read Case Study
                </span>

                <strong>
                  →
                </strong>
              </Link>

            </div>

          </article>

        </div>


        {/* ======================================================
            PROGRESS
        ====================================================== */}

        <div className="case-progress">

          {caseStudies.map((_, index) => (

            <button
              key={index}
              type="button"
              className={`case-progress-item ${
                index === activeIndex
                  ? "active"
                  : ""
              }`}
              aria-label={`Go to case study ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />

          ))}

        </div>

      </div>

    </section>
  );
}