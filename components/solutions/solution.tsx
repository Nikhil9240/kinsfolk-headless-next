"use client";

import "./solution.css";
import Link from "next/link";
import { useState } from "react";

import {
  Bot,
  BrainCircuit,
  ClipboardCheck,
  ChartNoAxesCombined,
  Boxes,
  Workflow,
  Database,
  ShieldCheck,
  Cloud,
  ArrowUpRight,
  ArrowRight,
  Minus,
  Plus,
  LucideIcon,
} from "lucide-react";

type Solution = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  Icon: LucideIcon;
};

const solutions: Solution[] = [
  {
    number: "01",
    title: "Agentic AI",
    description:
      "Governed AI agents that investigate, decide and resolve — not just answer.",
    tags: ["ESM", "Automation", "Service"],
    href: "/solutions/Agentic%20AI",
    Icon: Bot,
  },
  {
    number: "02",
    title: "Gen AI Driven Operations",
    description:
      "Gen AI turns your logs, metrics and traces into answers your teams can act on.",
    tags: ["AIOps", "Observability", "Monitoring"],
    href: "/solutions/Gen%20AI%20Driven%20Operations",
    Icon: BrainCircuit,
  },
  {
    number: "03",
    title: "AI Service Management",
    description:
      "Automation that takes a request from raised to resolved, across IT, HR and finance.",
    tags: ["CSM", "Customer", "Automation"],
    href: "/solutions/AI%20Service%20Management",
    Icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "AIOps & Full Stack Observability",
    description:
      "Turn logs, metrics, traces and alerts into plain answers your teams can act on, with Gen AI on top of full stack observability.",
    tags: ["Logs", "Metrics", "Traces"],
    href: "/solutions/AIOps%20&%20Full%20Stack%20Observability",
    Icon: ChartNoAxesCombined,
  },
  {
    number: "05",
    title: "AI Asset Management",
    description:
      "From servers to licences, see what you own, what it costs and what is really in use.",
    tags: ["Assets", "Security", "Risk"],
    href: "/solutions/AI-Based%20Asset%20Management",
    Icon: Boxes,
  },
  {
    number: "06",
    title: "Hyper Automation",
    description:
      "Automate the whole process, not just the tasks inside it.",
    tags: ["Process", "Automation", "Efficiency"],
    href: "/solutions/Hyper%20Automation",
    Icon: Workflow,
  },
  {
    number: "07",
    title: "Enterprise Data Management",
    description:
      "The AI-ready, governed data foundation every model you fund depends on.",
    tags: ["AI", "Automation", "Gen AI"],
    href: "/solutions/Enterprise%20Data%20Management",
    Icon: Database,
  },
  {
    number: "08",
    title: "AI Driven Security",
    description:
      "Machine speed defence across identity, endpoint and cloud, backed by AI-led detection and response.",
    tags: ["Data", "Analytics", "Insights"],
    href: "/solutions/AI-Led%20Security%20&%20Cyber%20Defense",
    Icon: ShieldCheck,
  },
  {
    number: "09",
    title: "Cloud & Infrastructure",
    description:
      "Modernize infrastructure with scalable cloud solutions, resilient platforms and intelligent infrastructure operations.",
    tags: ["Cloud", "Infrastructure", "IT"],
    href: "/solutions/cloud-infrastructure",
    Icon: Cloud,
  },
];

export default function Solutions() {
  // 3 म्हणजे Default index '04' उघडा राहील (इमेजप्रमाणे)
  const [activeIndex, setActiveIndex] = useState<number | null>(3);

  const handleSolutionClick = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="solutionsSection">
      <div className="solutionsContainer">
        {/* SECTION HEADER */}
        <div className="solutionsHeader">
          <div className="solutionsHeading">
            <span className="solutionsEyebrow">+ OUR SOLUTIONS +</span>
            <h2>
              Solutions tailored to your
              <br />
              business needs
            </h2>
          </div>

          <Link href="/solutions" className="moreSolutionsBtn">
            <span>More Solutions</span>
            <span className="moreSolutionsIcon">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>

        {/* ACCORDION */}
        <div
          className={`solutionsAccordion ${
            activeIndex !== null ? "hasActive" : ""
          }`}
        >
          {solutions.map((solution, index) => {
            const Icon = solution.Icon;
            const isActive = activeIndex === index;

            return (
              <article
                key={solution.title}
                className={`solutionItem ${isActive ? "active" : ""}`}
                onClick={() => handleSolutionClick(index)}
              >
                {/* ICON */}
                <div className="solutionIcon">
                  <Icon size={25} strokeWidth={1.7} />
                </div>

                {/* EXPANDED CONTENT (फक्त Active असल्यास Render होईल) */}
                {isActive && (
                  <div className="expandedContent">
                    <span className="solutionNumber">{solution.number}</span>
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>

                    <div className="solutionTags">
                      {solution.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <Link
                      href={solution.href}
                      className="exploreSolution"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <span>Explore Solution</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )}

                {/* COLLAPSED VERTICAL TITLE (फक्त Active नसेल तेव्हाच Render होईल) */}
                {!isActive && (
                  <div className="collapsedContent">
                    <span className="solutionNumberSmall">
                      {solution.number}
                    </span>
                    <h3>{solution.title}</h3>
                  </div>
                )}

                {/* OPEN / CLOSE BUTTON */}
                <button
                  type="button"
                  className="solutionToggle"
                  aria-label={
                    isActive
                      ? `Close ${solution.title}`
                      : `Open ${solution.title}`
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSolutionClick(index);
                  }}
                >
                  {isActive ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}