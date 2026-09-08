"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";

const solutionItems = [
  {
    title: "Agentic AI",
    href: "/solutions/agentic-ai",
    icon: "✦",
  },
  {
    title: "Gen AI Driven Operations",
    href: "/solutions/gen-ai-driven-operations",
    icon: "✧",
  },
  {
    title: "AIOps & Full Stack Observability",
    href: "/solutions/aiops-full-stack-observability",
    icon: "◉",
  },
  {
    title: "AI-Based Asset Management",
    href: "/solutions/ai-based-asset-management",
    icon: "◇",
  },
  {
    title: "Hyper Automation",
    href: "/solutions/hyper-automation",
    icon: "⚡",
  },
  {
    title: "Enterprise Data Management",
    href: "/solutions/enterprise-data-management",
    icon: "▦",
  },
  {
    title: "AI-Led Security & Cyber Defense",
    href: "/solutions/ai-led-security-cyber-defense",
    icon: "◈",
  },
  {
    title: "Cloud & Infrastructure",
    href: "/solutions/cloud-infrastructure",
    icon: "☁",
  },
];

const challengeItems = [
  {
    title: "Digital Transformation",
    text: "Modernize processes and accelerate business growth.",
    icon: "↗",
  },
  {
    title: "Security",
    text: "Protect your enterprise with modern security.",
    icon: "◉",
  },
  {
    title: "Automation",
    text: "Automate operations and improve productivity.",
    icon: "⚡",
  },
  {
    title: "Gaining Efficiency",
    text: "Improve efficiency across your organization.",
    icon: "▣",
  },
];

const companyItems = [
  {
    title: "About Us",
    href: "/company/about-us",
  },
  {
    title: "Careers",
    href: "/company/careers",
  },
  {
    title: "Partners",
    href: "/company/partners",
  },
  {
    title: "Awards",
    href: "/company/awards",
  },
];

const resourceItems = [
  {
    title: "Blogs",
    href: "/blog",
  },
  {
    title: "Events",
    href: "/events",
  },
];

export default function Header() {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu((current) =>
      current === menu ? null : menu
    );
  };

  const closeAllMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    closeAllMenus();
  }, [pathname]);

  return (
    <header
      className="site-header"
      ref={headerRef}
    >
      <div className="header-inner">

        {/* ===============================
            LOGO
        =============================== */}
        <Link
          href="/"
          className="header-logo"
          onClick={closeAllMenus}
        >
          <img
            src="/images/kinsfolk-logo.webp"
            alt="Kinsfolk"
          />
        </Link>

        {/* ===============================
            DESKTOP NAVIGATION
        =============================== */}
        <nav
          className="header-nav"
          aria-label="Main navigation"
        >
          {/* HOME */}
          <Link
            href="/"
            className={`header-link ${
              pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>

          {/* SOLUTIONS */}
          <div
            className={`header-dropdown solutions-dropdown ${
              openMenu === "solutions" ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className={`header-link dropdown-trigger ${
                pathname.startsWith("/solutions")
                  ? "active"
                  : ""
              }`}
              onClick={() => toggleMenu("solutions")}
              aria-expanded={openMenu === "solutions"}
              aria-haspopup="true"
            >
              Solutions

              <span className="dropdown-arrow">
                ⌄
              </span>
            </button>

            <div className="mega-menu">
              <div className="mega-inner">

                {/* COLUMN 1 */}
                <div className="mega-section solutions-section">
                  <div className="mega-heading">
                    <span>EXPLORE</span>
                    <h3>Solutions</h3>
                  </div>

                  <div className="solution-list">
                    {solutionItems.map((item) => (
                      <Link
                        href={item.href}
                        className="solution-item"
                        key={item.title}
                        onClick={closeAllMenus}
                      >
                        <span className="solution-icon">
                          {item.icon}
                        </span>

                        <span className="solution-title">
                          {item.title}
                        </span>

                        <span className="solution-arrow">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* COLUMN 2 */}
                <div className="mega-section challenge-section">
                  <div className="mega-heading">
                    <span>BY BUSINESS NEED</span>
                    <h3>Business Challenges</h3>
                  </div>

                  <div className="challenge-grid">
                    {challengeItems.map((item) => (
                      <Link
                        href="/solutions"
                        className="challenge-card"
                        key={item.title}
                        onClick={closeAllMenus}
                      >
                        <div className="challenge-icon">
                          {item.icon}
                        </div>

                        <div className="challenge-content">
                          <strong>
                            {item.title}
                          </strong>

                          <small>
                            {item.text}
                          </small>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* COLUMN 3 */}
                <div className="mega-section case-section">
                  <div className="mega-heading">
                    <span>SUCCESS STORIES</span>
                    <h3>Case Studies</h3>
                  </div>

                  <div className="case-study-grid">
                    <Link
                      href="/case-studies"
                      className="case-study-card case-study-ai"
                      onClick={closeAllMenus}
                    >
                      <div className="case-study-visual ai-visual">
                        <div className="ai-orbit">
                          <span>AI</span>
                        </div>
                      </div>

                      <div className="case-study-content">
                        <small>CASE STUDY</small>
                        <strong>Enterprise AI</strong>
                      </div>
                    </Link>

                    <Link
                      href="/case-studies"
                      className="case-study-card case-study-ops"
                      onClick={closeAllMenus}
                    >
                      <div className="case-study-visual ops-visual">
                        <div className="cloud-shape">
                          ☁
                        </div>
                      </div>

                      <div className="case-study-content">
                        <small>CASE STUDY</small>
                        <strong>Digital Operations</strong>
                      </div>
                    </Link>
                  </div>

                  <Link
                    href="/case-studies"
                    className="view-all-cases"
                    onClick={closeAllMenus}
                  >
                    View all case studies →
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* COMPANY */}
          <div
            className={`header-dropdown simple-dropdown-wrapper ${
              openMenu === "company" ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className={`header-link dropdown-trigger ${
                pathname.startsWith("/company")
                  ? "active"
                  : ""
              }`}
              onClick={() => toggleMenu("company")}
              aria-expanded={openMenu === "company"}
            >
              Company

              <span className="dropdown-arrow">
                ⌄
              </span>
            </button>

            <div className="simple-dropdown">
              {companyItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  onClick={closeAllMenus}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* CASE STUDIES */}
          <Link
            href="/case-studies"
            className={`header-link ${
              pathname.startsWith("/case-studies")
                ? "active"
                : ""
            }`}
          >
            Case studies
          </Link>

          {/* RESOURCES */}
          <div
            className={`header-dropdown simple-dropdown-wrapper ${
              openMenu === "resources" ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className={`header-link dropdown-trigger ${
                pathname.startsWith("/blog")
                  ? "active"
                  : ""
              }`}
              onClick={() => toggleMenu("resources")}
              aria-expanded={openMenu === "resources"}
            >
              Resources

              <span className="dropdown-arrow">
                ⌄
              </span>
            </button>

            <div className="simple-dropdown">
              {resourceItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  onClick={closeAllMenus}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* ===============================
            RIGHT SIDE button and support number 
        =============================== */}
        

        {/* ===============================
            MOBILE MENU BUTTON
        =============================== */}
        <button
          type="button"
          className={`mobile-menu-btn ${
            mobileOpen ? "is-active" : ""
          }`}
          onClick={() =>
            setMobileOpen((current) => !current)
          }
          aria-label={
            mobileOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ===============================
          MOBILE MENU
      =============================== */}
      <div
        className={`mobile-nav ${
          mobileOpen ? "is-open" : ""
        }`}
      >
        <div className="mobile-nav-inner">

          <Link
            href="/"
            className={
              pathname === "/"
                ? "mobile-nav-link active"
                : "mobile-nav-link"
            }
            onClick={closeAllMenus}
          >
            Home
          </Link>

          {/* MOBILE SOLUTIONS */}
          <div className="mobile-dropdown">
            <button
              type="button"
              onClick={() => toggleMenu("mobile-solutions")}
              className="mobile-dropdown-trigger"
            >
              <span>Solutions</span>

              <span
                className={
                  openMenu === "mobile-solutions"
                    ? "mobile-arrow rotate"
                    : "mobile-arrow"
                }
              >
                ⌄
              </span>
            </button>

            <div
              className={`mobile-dropdown-content ${
                openMenu === "mobile-solutions"
                  ? "is-open"
                  : ""
              }`}
            >
              <Link
                href="/solutions"
                onClick={closeAllMenus}
                className="mobile-all-link"
              >
                View All Solutions →
              </Link>

              {solutionItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  onClick={closeAllMenus}
                >
                  <span>{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* MOBILE COMPANY */}
          <div className="mobile-dropdown">
            <button
              type="button"
              onClick={() => toggleMenu("mobile-company")}
              className="mobile-dropdown-trigger"
            >
              <span>Company</span>

              <span
                className={
                  openMenu === "mobile-company"
                    ? "mobile-arrow rotate"
                    : "mobile-arrow"
                }
              >
                ⌄
              </span>
            </button>

            <div
              className={`mobile-dropdown-content ${
                openMenu === "mobile-company"
                  ? "is-open"
                  : ""
              }`}
            >
              {companyItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  onClick={closeAllMenus}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/case-studies"
            className="mobile-nav-link"
            onClick={closeAllMenus}
          >
            Case studies
          </Link>

          {/* MOBILE RESOURCES */}
          <div className="mobile-dropdown">
            <button
              type="button"
              onClick={() => toggleMenu("mobile-resources")}
              className="mobile-dropdown-trigger"
            >
              <span>Resources</span>

              <span
                className={
                  openMenu === "mobile-resources"
                    ? "mobile-arrow rotate"
                    : "mobile-arrow"
                }
              >
                ⌄
              </span>
            </button>

            <div
              className={`mobile-dropdown-content ${
                openMenu === "mobile-resources"
                  ? "is-open"
                  : ""
              }`}
            >
              {resourceItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  onClick={closeAllMenus}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          

         

        </div>
      </div>
    </header>
  );
}