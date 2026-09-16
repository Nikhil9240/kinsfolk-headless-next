"use client";

import { useEffect, useMemo, useState } from "react";
import "./OurOfferings.css";

/* =========================================================
   TYPES
========================================================= */

export type OfferingPoint = {
  title: string;
  description: string;
};

export type OfferingItem = {
  id: string;
  number: string;
  tabTitle: string;
  title: string;
  description: string;
  points: OfferingPoint[];
  ctaLabel: string;
  ctaHref: string;

  icon?:
    | "chart"
    | "network"
    | "gear"
    | "shield"
    | "document"
    | "users";
};

type OurOfferingsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;

  /*
   * Dynamic data.
   * कोणत्याही page वरून वेगळा offerings array pass करता येईल.
   */
  offerings?: OfferingItem[];
};

/* =========================================================
   DEFAULT OFFERINGS
   ---------------------------------------------------------
   जर parent component मधून offerings pass केले नाहीत,
   तर हा default content वापरला जाईल.
========================================================= */

const DEFAULT_OFFERINGS: OfferingItem[] = [
  {
    id: "agentic-readiness",
    number: "01",
    tabTitle: "Agentic Readiness Assessment",
    title: "Agentic Readiness Assessment",

    description:
      "Gartner expects over 40% of agentic AI projects to be cancelled by the end of 2027 because of escalating cost, unclear value and inadequate risk controls. We start by making sure yours is not one of them.",

    points: [
      {
        title: "Use-case triage against real ticket data.",
        description:
          "We analyse 6–12 months of your incident, request and change volume to find the workflows where agents pay back inside two quarters — and the ones where they will not.",
      },
      {
        title: "Data and CMDB readiness scoring.",
        description:
          "Agents are only as good as the service model underneath them. We assess CMDB completeness, knowledge quality and telemetry coverage before we design anything.",
      },
      {
        title: "Platform fit and licence review.",
        description:
          "We check what agentic capability you already own inside Helix, ServiceNow or Moveworks so you buy only the gap.",
      },
      {
        title: "A costed roadmap with a stop condition.",
        description:
          "Each phase has a defined success metric and an explicit criterion for stopping, so a failing pilot ends cheaply.",
      },
    ],

    ctaLabel: "Get an Agentic Readiness Assessment",
    ctaHref: "/contact",

    icon: "chart",
  },

  {
    id: "agent-design",
    number: "02",
    tabTitle: "Agent Design & Orchestration",
    title: "Agent Design & Orchestration",

    description:
      "Single agents solve narrow problems. Enterprise value comes from agents that hand work to one another under supervision.",

    points: [
      {
        title: "Goal and tool definition.",
        description:
          "We specify precisely what each agent is allowed to pursue and which systems, APIs and automations it may call to get there.",
      },
      {
        title: "Multi-agent orchestration.",
        description:
          "A triage agent classifies, a diagnostic agent investigates, a remediation agent acts and a communication agent updates the requester — coordinated, logged and interruptible.",
      },
      {
        title: "Grounding and retrieval design.",
        description:
          "Agents retrieve from your CMDB, runbooks, knowledge base and monitoring data, with source attribution on every decision.",
      },
      {
        title: "Fallback and escalation paths.",
        description:
          "When confidence drops below threshold, the agent stops and routes to a named human queue with its full working shown.",
      },
    ],

    ctaLabel: "Talk to an Agent Architect",
    ctaHref: "/contact",

    icon: "network",
  },

  {
    id: "autonomous-service",
    number: "03",
    tabTitle: "Autonomous Service Operations",
    title: "Autonomous Service Operations",

    description:
      "The highest-volume, lowest-judgement work in your service desk is where agents earn their keep first.",

    points: [
      {
        title: "Access and provisioning requests resolved end to end.",
        description:
          "Including entitlement checks, approval routing and fulfilment in the target system.",
      },
      {
        title: "Password, unlock and MFA-reset journeys.",
        description:
          "Handled conversationally in Teams or Slack with identity verification enforced.",
      },
      {
        title: "Automated ticket classification, prioritisation and routing.",
        description:
          "Removes the manual triage queue from your L1 team's day.",
      },
      {
        title: "Agent-generated resolution notes and knowledge articles.",
        description:
          "Every closed ticket improves the next one instead of disappearing.",
      },
    ],

    ctaLabel: "Request a Service Desk Demo",
    ctaHref: "/contact",

    icon: "gear",
  },

  {
    id: "aiops-remediation",
    number: "04",
    tabTitle: "Agentic AIOps & Remediation",
    title: "Agentic AIOps & Remediation",

    description:
      "Detection is largely solved. What still costs you money is the hour between alert and fix.",

    points: [
      {
        title: "Autonomous investigation on alert.",
        description:
          "The agent gathers logs, metrics, traces, recent changes and topology, then produces a ranked hypothesis with evidence attached.",
      },
      {
        title: "Guarded auto-remediation.",
        description:
          "For known failure signatures — service restarts, disk reclamation, certificate rotation, scaling actions — the agent executes an approved runbook and verifies recovery.",
      },
      {
        title: "Change-correlated root cause.",
        description:
          "Agents cross-reference incidents against recent change records to identify the change that broke production.",
      },
      {
        title: "Narrated incident timelines.",
        description:
          "Written automatically for the bridge call, the post-incident review and the regulator.",
      },
    ],

    ctaLabel: "Discuss Your Incident Workflow",
    ctaHref: "/contact",

    icon: "shield",
  },

  {
    id: "governance",
    number: "05",
    tabTitle: "Governance, Guardrails & Assurance",
    title: "Governance, Guardrails & Assurance",

    description:
      "This is the section that gets you through your bank's risk committee. It is also the section most vendors skip.",

    points: [
      {
        title: "Scoped, least-privilege agent identities.",
        description:
          "Separate credentials per agent and per environment, integrated with your IAM.",
      },
      {
        title: "Human-in-the-loop gates on defined risk classes.",
        description:
          "Production change, financial impact, customer data access and privileged access grant are subject to controlled approval.",
      },
      {
        title: "Full decision audit trail.",
        description:
          "The goal, retrieved context, tools called, action taken and outcome are retained and exportable.",
      },
      {
        title: "Model and prompt version control.",
        description:
          "Evaluation suites run before any agent behaviour changes in production.",
      },
      {
        title: "Alignment with Indian regulatory expectations.",
        description:
          "Including RBI IT governance guidance, the DPDP Act and CERT-In incident reporting timelines.",
      },
    ],

    ctaLabel: "Review Your Governance Model",
    ctaHref: "/contact",

    icon: "document",
  },

  {
    id: "managed-agent",
    number: "06",
    tabTitle: "Scale & Managed Agent Operations",
    title: "Scale & Managed Agent Operations",

    description:
      "An agent is not a project. It is a system that needs owners, metrics and continuous tuning.",

    points: [
      {
        title: "Agent performance monitoring.",
        description:
          "Containment rate, resolution accuracy, escalation rate, cost per resolution and time saved, reported monthly.",
      },
      {
        title: "Continuous grounding refresh.",
        description:
          "Your agent grounding stays current as your knowledge base, CMDB and estate change.",
      },
      {
        title: "Drift and regression detection.",
        description:
          "A model or prompt update never silently degrades resolution quality.",
      },
      {
        title: "24×7 managed operations.",
        description:
          "Our support team operates across six offices, with defined SLAs on agent availability and accuracy.",
      },
    ],

    ctaLabel: "Explore Managed Agent Operations",
    ctaHref: "/contact",

    icon: "users",
  },
];

/* =========================================================
   ICON COMPONENT
========================================================= */

function OfferingIcon({
  type = "gear",
}: {
  type?: OfferingItem["icon"];
}) {
  if (type === "chart") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="offering-svg"
      >
        <path d="M9 38V25h7v13H9Zm11 0V16h7v22h-7Zm11 0V8h7v30h-7Z" />
      </svg>
    );
  }

  if (type === "network") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="offering-svg"
      >
        <circle cx="24" cy="10" r="5" />
        <circle cx="10" cy="34" r="5" />
        <circle cx="38" cy="34" r="5" />

        <path d="M21 14 13 29" />
        <path d="M27 14l8 15" />
        <path d="M15 34h18" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="offering-svg"
      >
        <path d="M24 5 39 11v11c0 10-6.5 17-15 21C15.5 39 9 32 9 22V11l15-6Z" />
        <path d="m17 24 5 5 10-11" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="offering-svg"
      >
        <rect x="11" y="6" width="26" height="36" rx="3" />
        <path d="M17 15h14" />
        <path d="M17 22h14" />
        <path d="M17 29h9" />
      </svg>
    );
  }

  if (type === "users") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="offering-svg"
      >
        <circle cx="24" cy="15" r="7" />
        <circle cx="10" cy="21" r="5" />
        <circle cx="38" cy="21" r="5" />

        <path d="M11 40c1-8 6-12 13-12s12 4 13 12" />
        <path d="M4 39c.5-5 3-8 7-9" />
        <path d="M44 39c-.5-5-3-8-7-9" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="offering-svg"
    >
      <circle cx="24" cy="24" r="7" />
      <path d="M24 5v7" />
      <path d="M24 36v7" />
      <path d="M5 24h7" />
      <path d="M36 24h7" />

      <path d="m10.5 10.5 5 5" />
      <path d="m32.5 32.5 5 5" />
      <path d="m37.5 10.5-5 5" />
      <path d="m15.5 32.5-5 5" />
    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function OurOfferings({
  eyebrow = "OUR OFFERINGS",
  title = "Our Offerings",
  description = "From strategy to scale, we help you design, build and operate agentic AI solutions that deliver real business value.",
  offerings,
}: OurOfferingsProps) {
  /*
   * Parent कडून offerings आले तर ते वापरतो.
   * नाही आले तर default content वापरतो.
   */
  const safeOfferings = useMemo(() => {
    if (Array.isArray(offerings) && offerings.length > 0) {
      return offerings;
    }

    return DEFAULT_OFFERINGS;
  }, [offerings]);

  const [activeId, setActiveId] = useState(
    safeOfferings[0]?.id ?? ""
  );

  /*
   * जर page बदलला किंवा नवीन offerings array आला
   * तर active tab valid आहे का check करतो.
   */
  useEffect(() => {
    const exists = safeOfferings.some(
      (item) => item.id === activeId
    );

    if (!exists) {
      setActiveId(safeOfferings[0]?.id ?? "");
    }
  }, [safeOfferings, activeId]);

  /*
   * Active offering
   */
  const activeOffering =
    safeOfferings.find(
      (item) => item.id === activeId
    ) ?? safeOfferings[0];

  /*
   * कोणताही data नसेल तर section render करू नये.
   */
  if (!activeOffering) {
    return null;
  }

  return (
    <section
      className="our-offerings"
      id="our-offerings"
    >
      <div className="offerings-container">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="offerings-header">

          <div className="offerings-heading">

            <div className="offerings-eyebrow">
              <span className="eyebrow-line" />
              {eyebrow}
            </div>

            <h2>{title}</h2>

          </div>

          <p className="offerings-intro">
            {description}
          </p>

        </div>

        {/* ===================================================
            TABS
        =================================================== */}

        <div
          className="offerings-tabs"
          role="tablist"
          aria-label="Our offerings"
        >
          {safeOfferings.map((item) => {
            const isActive =
              item.id === activeOffering.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`offering-panel-${item.id}`}
                className={`offering-tab ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  setActiveId(item.id)
                }
              >
                <span className="offering-tab-icon">
                  <OfferingIcon
                    type={item.icon}
                  />
                </span>

                <span className="offering-tab-title">
                  {item.tabTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===================================================
            ACTIVE OFFERING CONTENT
        =================================================== */}

        <div
          className="offering-content"
          id={`offering-panel-${activeOffering.id}`}
          role="tabpanel"
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="offering-copy">

            <span className="offering-number">
              CAPABILITY {activeOffering.number}
            </span>

            <h3>
              {activeOffering.title}
            </h3>

            <p className="offering-description">
              {activeOffering.description}
            </p>

            {/* ===============================================
                DYNAMIC POINTS
            =============================================== */}

            {Array.isArray(
              activeOffering.points
            ) &&
              activeOffering.points.length > 0 && (
                <div className="offering-points">

                  {activeOffering.points.map(
                    (point, index) => (
                      <div
                        className="offering-point"
                        key={`${activeOffering.id}-${index}`}
                      >

                        <div className="point-icon">
                          <span>
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="point-text">

                          <h4>
                            {point.title}
                          </h4>

                          <p>
                            {point.description}
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

            {/* ===============================================
                CTA
            =============================================== */}

            {activeOffering.ctaLabel && (
              <a
                href={
                  activeOffering.ctaHref || "#"
                }
                className="offering-cta"
              >
                <span>
                  {activeOffering.ctaLabel}
                </span>

                <span
                  className="offering-cta-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            )}

          </div>

          {/* =================================================
              RIGHT VISUAL
          ================================================= */}

          <div
            className="offering-visual"
            aria-hidden="true"
          >

            <div className="visual-glow visual-glow-one" />
            <div className="visual-glow visual-glow-two" />

            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-orbit orbit-three" />

            {/* TOP CARD */}

            <div className="visual-card card-top">
              <div className="visual-card-icon">
                <OfferingIcon
                  type={activeOffering.icon}
                />
              </div>

              <span>
                {activeOffering.number}
              </span>

              <strong>
                Assess
              </strong>
            </div>

            {/* LEFT CARD */}

            <div className="visual-card card-left">

              <span className="visual-small-number">
                01
              </span>

              <strong>
                Analyse
              </strong>

            </div>

            {/* RIGHT CARD */}

            <div className="visual-card card-right">

              <span className="visual-small-number">
                02
              </span>

              <strong>
                Plan
              </strong>

            </div>

            {/* CENTER */}

            <div className="visual-center">

              <div className="center-icon">
                <OfferingIcon
                  type={activeOffering.icon}
                />
              </div>

              <strong>
                {activeOffering.tabTitle}
              </strong>

              <span>
                Technology-led
                <br />
                transformation
              </span>

            </div>

            {/* DOTS */}

            <div className="visual-dot dot-one" />
            <div className="visual-dot dot-two" />
            <div className="visual-dot dot-three" />

          </div>

        </div>

      </div>
    </section>
  );
}