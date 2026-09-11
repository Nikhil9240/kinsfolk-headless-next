"use client";

import {
  Activity,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Cloud,
  Code2,
  Database,
  FileText,
  Menu,
  Network,
  Plus,
  Server,
  Settings2,
  Shield,
  Sparkles,
  Users,
  Workflow,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "@/lib/navigation";

type HeaderClientProps = {
  menuItems?: MenuItem[];
};

type MenuLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const solutionIconMap: Record<string, React.ReactNode> = {
  "Agentic AI": <Sparkles size={19} />,
  "Gen AI Driven Operations": <Bot size={19} />,
  "AI Service Management": <Settings2 size={19} />,
  "AI-Based Asset Management": <Database size={19} />,
  "AIOps & Full Stack Observability": <Activity size={19} />,
  "Enterprise Data Management": <Server size={19} />,
  "AI-Led Security & Cyber Defense": <Shield size={19} />,
  "Hyper Automation": <Workflow size={19} />,
};

const serviceItems = [
  { title: "Advisory Services", href: "/services", icon: <Users size={18} /> },
  { title: "Implementation", href: "/services", icon: <Settings2 size={18} /> },
  { title: "Migration & Upgrade", href: "/services", icon: <Cloud size={18} /> },
  { title: "Managed Services", href: "/services", icon: <Shield size={18} /> },
  { title: "Custom Development", href: "/services", icon: <Code2 size={18} /> },
  { title: "Resource Augmentation", href: "/services", icon: <Plus size={18} /> },
];

const caseStudies = [
  {
    title: "Enterprise AI",
    href: "/case-studies",
    type: "CASE STUDY",
    visual: "ai",
    icon: <Bot size={32} />,
  },
  {
    title: "Digital Operations",
    href: "/case-studies",
    type: "CASE STUDY",
    visual: "operations",
    icon: <Cloud size={32} />,
  },
];

const blogCards = [
  {
    title: "The Future of AI in Enterprise Operations",
    href: "/blog",
    image: "/images/blog/ai-enterprise.jpg",
  },
  {
    title: "Building a Resilient Digital Enterprise",
    href: "/blog",
    image: "/images/blog/digital-enterprise.jpg",
  },
];

const eventCards = [
  {
    date: "25",
    month: "SEP",
    title: "AI & Automation Summit 2026",
    location: "Mumbai, India",
    href: "/events",
    image: "/images/events/ai-automation.jpg",
  },
  {
    date: "10",
    month: "OCT",
    title: "Digital Operations Forum",
    location: "Bengaluru, India",
    href: "/events",
    image: "/images/events/digital-operations.jpg",
  },
];

function toNextRoute(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/$/, "");
    return path || "/";
  } catch {
    return url || "/";
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Static fallbacks: used only when the WordPress menu doesn't return a
// top-level item named "Solutions" / "About Kinsfolk" / "Resources" (or
// that item has no children). This keeps the nav from silently
// disappearing if CMS data is missing or mislabeled.
const fallbackSolutionItems: MenuLink[] = Object.keys(solutionIconMap).map(
  (title) => ({
    title,
    href: `/solutions/${slugify(title)}`,
    icon: solutionIconMap[title],
  })
);

const fallbackAboutItems: MenuLink[] = [
  {
    title: "Our Team",
    href: "/about/our-team",
    icon: <BriefcaseBusiness size={19} />,
  },
];

const fallbackResourceItems: MenuLink[] = [
  { title: "Blog", href: "/blog", icon: <FileText size={18} /> },
  { title: "Events", href: "/events", icon: <CalendarDays size={18} /> },
];

function getChildren(items: MenuItem[], parentId: string) {
  return items.filter((item) => item.parentId === parentId);
}

function findMenuItem(items: MenuItem[], label: string) {
  const matches = items.filter(
    (item) =>
      item.parentId === null &&
      item.label.trim().toLowerCase() === label.trim().toLowerCase()
  );

  if (!matches.length) {
    return undefined;
  }

  const clean = matches.find(
    (item) => !item.url.includes("page_id=") && !item.url.includes("?")
  );

  return clean ?? matches[0];
}

function CaseStudyCard({ item }: { item: (typeof caseStudies)[number] }) {
  return (
    <Link href={item.href} className="case-study-card">
      <div className={`case-study-visual ${item.visual}-visual`}>
        <div className="case-study-symbol">{item.icon}</div>
      </div>

      <div className="case-study-content">
        <small>{item.type}</small>
        <strong>{item.title}</strong>
      </div>
    </Link>
  );
}

function BlogCard({ item }: { item: (typeof blogCards)[number] }) {
  return (
    <Link href={item.href} className="insight-card">
      <div className="insight-card-image">
        <img src={item.image} alt="" />
      </div>

      <div className="insight-card-content">
        <small>BLOG</small>
        <strong>{item.title}</strong>
      </div>
    </Link>
  );
}

function EventCard({ item }: { item: (typeof eventCards)[number] }) {
  return (
    <Link href={item.href} className="event-card">
      <div className="event-card-image">
        <img src={item.image} alt="" />
      </div>

      <div className="event-card-body">
        <div className="event-date">
          <strong>{item.date}</strong>
          <span>{item.month}</span>
        </div>

        <div className="event-card-info">
          <strong>{item.title}</strong>
          <small>
            <Network size={12} />
            {item.location}
          </small>
        </div>
      </div>
    </Link>
  );
}

export default function HeaderClient({ menuItems = [] }: HeaderClientProps) {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const safeMenuItems = Array.isArray(menuItems) ? menuItems : [];

  /*
   * Transparent header at the top of the page.
   * Once the user scrolls, the header becomes white
   * (and the logo swaps from white back to its full-color version — see header.css).
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solutionsParent = findMenuItem(safeMenuItems, "Solutions");

  const aboutParent =
    findMenuItem(safeMenuItems, "About Kinsfolk") ??
    findMenuItem(safeMenuItems, "About");

  const resourcesParent = findMenuItem(safeMenuItems, "Resources");

  const solutionItemsFromCms: MenuLink[] = solutionsParent
    ? getChildren(safeMenuItems, solutionsParent.id).map((item) => ({
        title: item.label,
        href: toNextRoute(item.url),
        icon: solutionIconMap[item.label] ?? <Sparkles size={19} />,
      }))
    : [];

  const solutionItems: MenuLink[] =
    solutionItemsFromCms.length > 0 ? solutionItemsFromCms : fallbackSolutionItems;

  const aboutItemsAll: MenuLink[] = aboutParent
    ? getChildren(safeMenuItems, aboutParent.id).map((item) => ({
        title: item.label,
        href: toNextRoute(item.url),
        icon:
          item.label === "Life at Kinsfolk" ? (
            <Users size={19} />
          ) : (
            <BriefcaseBusiness size={19} />
          ),
      }))
    : [];

  // "Life at Kinsfolk" is now its own top-level nav item, so it's
  // pulled out of the About mega menu's list rather than shown twice.
  const lifeAtKinsfolkFromAbout = aboutItemsAll.find(
    (item) => item.title.trim().toLowerCase() === "life at kinsfolk"
  );

  const aboutItemsFromCms: MenuLink[] = aboutItemsAll.filter(
    (item) => item.title.trim().toLowerCase() !== "life at kinsfolk"
  );

  const aboutItems: MenuLink[] =
    aboutItemsFromCms.length > 0 ? aboutItemsFromCms : fallbackAboutItems;

  const lifeAtKinsfolkTopLevel = findMenuItem(safeMenuItems, "Life at Kinsfolk");

  const lifeAtKinsfolkHref =
    (lifeAtKinsfolkTopLevel && toNextRoute(lifeAtKinsfolkTopLevel.url)) ??
    lifeAtKinsfolkFromAbout?.href ??
    "/about/life-at-kinsfolk";

  const contactParent = findMenuItem(safeMenuItems, "Contact");
  const contactHref = contactParent ? toNextRoute(contactParent.url) : "/contact";

  const resourceItemsFromCms: MenuLink[] = resourcesParent
    ? getChildren(safeMenuItems, resourcesParent.id).map((item) => ({
        title: item.label,
        href: toNextRoute(item.url),
        icon:
          item.label === "Events" ? (
            <CalendarDays size={18} />
          ) : (
            <FileText size={18} />
          ),
      }))
    : [];

  const resourceItems: MenuLink[] =
    resourceItemsFromCms.length > 0 ? resourceItemsFromCms : fallbackResourceItems;

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const toggleMenu = (menu: string) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`site-header ${isScrolled ? "is-scrolled" : "is-transparent"}`}
    >
      <div className="header-inner">
        {/* ==================================================
            LOGO
        ================================================== */}

        <Link href="/" className="header-logo" onClick={closeMenus}>
          <img src="/images/kinsfolk-logo.webp" alt="Kinsfolk" />
        </Link>

        {/* ==================================================
            DESKTOP NAV

            Final order: Solutions | About | Resources |
            Life at Kinsfolk | Contact
        ================================================== */}

        <nav className="header-nav" aria-label="Main navigation">
          {/* ============ SOLUTIONS ============ */}

          <div
            className={`header-dropdown ${
              openMenu === "solutions" ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className={`header-link ${
                pathname.startsWith("/solutions") ? "active" : ""
              }`}
              onClick={() => toggleMenu("solutions")}
            >
              Solutions
              <span className="dropdown-arrow">
                {openMenu === "solutions" ? "⌃" : "⌄"}
              </span>
            </button>

            <div className="mega-menu solutions-mega">
              <div className="mega-inner">
                <section className="mega-section">
                  <div className="mega-heading">
                    <span>EXPLORE</span>
                    <h3>Solutions</h3>
                  </div>

                  <div className="solution-list">
                    {solutionItems.slice(0, 8).map((item) => (
                      <Link
                        href={item.href}
                        className="solution-item"
                        key={item.title}
                        onClick={closeMenus}
                      >
                        <span className="solution-icon">{item.icon}</span>
                        <span className="solution-title">{item.title}</span>
                        <span className="solution-arrow">
                          <ArrowRight size={15} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="mega-section">
                  <div className="mega-heading">
                    <span>OUR SERVICES</span>
                    <h3>Services</h3>
                  </div>

                  <div className="service-menu-grid">
                    {serviceItems.map((item) => (
                      <Link
                        href={item.href}
                        className="service-menu-card"
                        key={item.title}
                        onClick={closeMenus}
                      >
                        <span className="service-menu-icon">{item.icon}</span>
                        <span className="service-menu-title">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="mega-section">
                  <div className="mega-heading">
                    <span>SUCCESS STORIES</span>
                    <h3>Case Studies</h3>
                  </div>

                  <div className="case-study-grid">
                    {caseStudies.map((item) => (
                      <CaseStudyCard key={item.title} item={item} />
                    ))}
                  </div>

                  <Link
                    href="/case-studies"
                    className="view-all-cases"
                    onClick={closeMenus}
                  >
                    View all case studies
                    <ArrowRight size={15} />
                  </Link>
                </section>
              </div>
            </div>
          </div>

          {/* ============ ABOUT ============ */}

          <div
            className={`header-dropdown ${
              openMenu === "about" ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className={`header-link ${
                pathname.startsWith("/about") ? "active" : ""
              }`}
              onClick={() => toggleMenu("about")}
            >
              About Us
              <span className="dropdown-arrow">
                {openMenu === "about" ? "⌃" : "⌄"}
              </span>
            </button>

            <div className="mega-menu about-mega">
              <div className="mega-inner">
                <section className="mega-section">
                  <div className="mega-heading">
                    <span>ABOUT US</span>
                    <h3>About Kinsfolk</h3>
                  </div>

                  <div className="about-menu-list">
                    {aboutItems.map((item) => (
                      <Link
                        href={item.href}
                        className="about-menu-item"
                        key={item.title}
                        onClick={closeMenus}
                      >
                        <span className="about-menu-icon">{item.icon}</span>
                        <strong>{item.title}</strong>
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="mega-section">
                  <div className="mega-heading">
                    <span>INSIGHTS</span>
                    <h3>Insights</h3>
                  </div>

                  <div className="insight-tabs">
                    <button type="button" className="active">
                      Blog
                    </button>
                    <button type="button">News</button>
                  </div>

                  <div className="insight-grid">
                    {blogCards.map((item) => (
                      <BlogCard key={item.title} item={item} />
                    ))}
                  </div>

                  <Link href="/blog" className="view-all-cases" onClick={closeMenus}>
                    View all blogs
                    <ArrowRight size={15} />
                  </Link>
                </section>

                <section className="mega-section">
                  <div className="mega-heading">
                    <span>SUCCESS STORIES</span>
                    <h3>Case Studies</h3>
                  </div>

                  <div className="case-study-grid">
                    {caseStudies.map((item) => (
                      <CaseStudyCard key={item.title} item={item} />
                    ))}
                  </div>

                  <Link
                    href="/case-studies"
                    className="view-all-cases"
                    onClick={closeMenus}
                  >
                    View all case studies
                    <ArrowRight size={15} />
                  </Link>
                </section>
              </div>
            </div>
          </div>

          {/* ============ RESOURCES ============ */}

          <div
            className={`header-dropdown ${
              openMenu === "resources" ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className={`header-link ${
                pathname.startsWith("/resources") ? "active" : ""
              }`}
              onClick={() => toggleMenu("resources")}
            >
              Resources
              <span className="dropdown-arrow">
                {openMenu === "resources" ? "⌃" : "⌄"}
              </span>
            </button>

            <div className="mega-menu resources-mega">
              <div className="mega-inner">
                <section className="mega-section">
                  <div className="mega-heading">
                    <span>RESOURCES</span>
                    <h3>Resources</h3>
                  </div>

                  <div className="resource-menu-list">
                    {resourceItems.map((item) => (
                      <Link
                        href={item.href}
                        className="resource-menu-item"
                        key={item.title}
                        onClick={closeMenus}
                      >
                        <span className="resource-menu-icon">{item.icon}</span>
                        <strong>{item.title}</strong>
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>

                  <Link href="/resources" className="view-all-cases" onClick={closeMenus}>
                    View all
                    <ArrowRight size={15} />
                  </Link>
                </section>

                <section className="mega-section">
                  <div className="mega-heading">
                    <span>UPCOMING EVENTS</span>
                    <h3>Events</h3>
                  </div>

                  <div className="event-grid">
                    {eventCards.map((item) => (
                      <EventCard key={item.title} item={item} />
                    ))}
                  </div>

                  <Link href="/events" className="view-all-cases" onClick={closeMenus}>
                    View all events
                    <ArrowRight size={15} />
                  </Link>
                </section>

                <section className="mega-section">
                  <div className="mega-heading">
                    <span>INSIGHTS</span>
                    <h3>Blog</h3>
                  </div>

                  <div className="insight-tabs">
                    <button type="button" className="active">
                      Blog
                    </button>
                    <button type="button">News</button>
                  </div>

                  <div className="insight-grid">
                    {blogCards.map((item) => (
                      <BlogCard key={item.title} item={item} />
                    ))}
                  </div>

                  <Link href="/blog" className="view-all-cases" onClick={closeMenus}>
                    View all blogs
                    <ArrowRight size={15} />
                  </Link>
                </section>
              </div>
            </div>
          </div>

          {/* ============ LIFE AT KINSFOLK ============ */}

          <Link
            href={lifeAtKinsfolkHref}
            className={`header-link ${
              pathname.startsWith(lifeAtKinsfolkHref) ? "active" : ""
            }`}
            onClick={closeMenus}
          >
            Life at Kinsfolk
          </Link>

          {/* ============ CONTACT ============ */}

          <Link
            href={contactHref}
            className={`header-link ${
              pathname.startsWith(contactHref) ? "active" : ""
            }`}
            onClick={closeMenus}
          >
            Contact
          </Link>
        </nav>

        {/* ==================================================
            MOBILE BUTTON
        ================================================== */}

        <button
          type="button"
          className={`mobile-menu-btn ${mobileOpen ? "is-active" : ""}`}
          onClick={() => setMobileOpen((current) => !current)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* ==================================================
          MOBILE NAV
      ================================================== */}

      <div className={`mobile-nav ${mobileOpen ? "is-open" : ""}`}>
        <div className="mobile-nav-inner">
          {/* SOLUTIONS */}

          <div className="mobile-dropdown">
            <button
              type="button"
              className="mobile-dropdown-trigger"
              onClick={() => toggleMenu("mobile-solutions")}
            >
              Solutions
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
                openMenu === "mobile-solutions" ? "is-open" : ""
              }`}
            >
              {solutionItems.map((item) => (
                <Link href={item.href} key={item.title} onClick={closeMenus}>
                  <span>{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* ABOUT */}

          <div className="mobile-dropdown">
            <button
              type="button"
              className="mobile-dropdown-trigger"
              onClick={() => toggleMenu("mobile-about")}
            >
              About Us
              <span
                className={
                  openMenu === "mobile-about" ? "mobile-arrow rotate" : "mobile-arrow"
                }
              >
                ⌄
              </span>
            </button>

            <div
              className={`mobile-dropdown-content ${
                openMenu === "mobile-about" ? "is-open" : ""
              }`}
            >
              {aboutItems.map((item) => (
                <Link href={item.href} key={item.title} onClick={closeMenus}>
                  <span>{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* RESOURCES */}

          <div className="mobile-dropdown">
            <button
              type="button"
              className="mobile-dropdown-trigger"
              onClick={() => toggleMenu("mobile-resources")}
            >
              Resources
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
                openMenu === "mobile-resources" ? "is-open" : ""
              }`}
            >
              {resourceItems.map((item) => (
                <Link href={item.href} key={item.title} onClick={closeMenus}>
                  <span>{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* LIFE AT KINSFOLK */}

          <Link
            href={lifeAtKinsfolkHref}
            className="mobile-nav-link"
            onClick={closeMenus}
          >
            Life at Kinsfolk
          </Link>

          {/* CONTACT */}

          <Link href={contactHref} className="mobile-nav-link" onClick={closeMenus}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
