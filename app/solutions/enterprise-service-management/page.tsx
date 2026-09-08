import type { Metadata } from "next";
import Link from "next/link";
import styles from "./esm.module.css";

export const metadata: Metadata = {
  title: "Enterprise Service Management | Kinsfolk",
  description:
    "Transform enterprise service experiences with intelligent Enterprise Service Management, automation and connected workflows.",
};

const oems = [
  {
    number: "01",
    name: "BMC Helix",
    title: "AI-powered enterprise service management",
    description:
      "Transform service operations with intelligent workflows, automation and connected enterprise experiences.",
    link: "/solutions/enterprise-service-management/bmc-helix",
  },
  {
    number: "02",
    name: "ServiceNow",
    title: "Connected workflows for the enterprise",
    description:
      "Bring people, processes and technology together with powerful service management and workflow automation.",
    link: "/solutions/enterprise-service-management/servicenow",
  },
  {
    number: "03",
    name: "Motadata",
    title: "Integrated IT service management",
    description:
      "Modernize IT operations with integrated service management, monitoring and observability capabilities.",
    link: "/solutions/enterprise-service-management/motadata",
  },
];

const capabilities = [
  {
    number: "01",
    title: "IT Service Management",
    text: "Build smarter, faster and more efficient enterprise service operations.",
  },
  {
    number: "02",
    title: "Service Automation",
    text: "Automate repetitive service workflows and improve operational efficiency.",
  },
  {
    number: "03",
    title: "IT Asset Management",
    text: "Gain complete visibility and control across your enterprise technology assets.",
  },
  {
    number: "04",
    title: "Digital Workplace",
    text: "Create seamless digital experiences for employees across the enterprise.",
  },
  {
    number: "05",
    title: "Analytics & Reporting",
    text: "Turn service data into actionable insights and measurable outcomes.",
  },
  {
    number: "06",
    title: "Process Optimization",
    text: "Simplify processes, remove bottlenecks and continuously improve service delivery.",
  },
];

const approach = [
  {
    number: "01",
    title: "Discover",
    text: "Understand your current service landscape and identify opportunities.",
  },
  {
    number: "02",
    title: "Design",
    text: "Design service experiences aligned with your business goals.",
  },
  {
    number: "03",
    title: "Integrate",
    text: "Connect people, platforms, applications and enterprise data.",
  },
  {
    number: "04",
    title: "Automate",
    text: "Automate workflows and eliminate repetitive manual activities.",
  },
  {
    number: "05",
    title: "Optimize",
    text: "Use insights and analytics to continuously improve operations.",
  },
  {
    number: "06",
    title: "Manage",
    text: "Keep your services secure, scalable and continuously optimized.",
  },
];

const reasons = [
  {
    number: "01",
    title: "Certified Resources",
    text: "Experienced consultants with hands-on expertise across enterprise service management platforms.",
  },
  {
    number: "02",
    title: "ROI-Driven Consulting",
    text: "We focus on measurable business outcomes, operational efficiency and long-term value.",
  },
  {
    number: "03",
    title: "Scalable Architecture",
    text: "Solutions designed to scale with your organization, technology and future business needs.",
  },
  {
    number: "04",
    title: "Seamless Integrations",
    text: "Connect enterprise applications, data and workflows to create a unified service ecosystem.",
  },
  {
    number: "05",
    title: "Proven Expertise",
    text: "Practical experience helping organizations modernize service delivery and accelerate transformation.",
  },
  {
    number: "06",
    title: "24×7 Support",
    text: "Reliable support to help keep your enterprise services stable, secure and performing.",
  },
];

export default function EnterpriseServiceManagementPage() {
  return (
    <main className={styles.esmPage}>

      {/* ================= HERO ================= */}

      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>

        <div className={styles.container}>
          <div className={styles.heroGrid}>

            <div className={styles.heroContent}>
              <span className={styles.eyebrowLight}>
                ENTERPRISE SERVICE MANAGEMENT
              </span>

              <h1>
                  Enterprise Service
                
                
                
                <span>Management</span>
              </h1>

              <p>
                  Streamline IT and business operations with intelligent service automation, improving efficiency and user experience across your enterprise.
                
              </p>

              <div className={styles.heroButtons}>
                <Link
                  href="/contact-us"
                  className={styles.primaryButton}
                >
                  Talk to an Expert
                  <span>→</span>
                </Link>

                <a
                  href="#capabilities"
                  className={styles.secondaryButton}
                >
                  Explore ESM
                </a>
              </div>
            </div>

            {/* HERO VISUAL */}

            <div className={styles.heroVisual}>

              <div
                className={`${styles.orbit} ${styles.orbitOne}`}
              ></div>

              <div
                className={`${styles.orbit} ${styles.orbitTwo}`}
              ></div>

              <div
                className={`${styles.orbit} ${styles.orbitThree}`}
              ></div>

              <div className={styles.visualCenter}>
                <span>ESM</span>

                <small>
                  CONNECTED
                  <br />
                  ENTERPRISE
                </small>
              </div>

              <div
                className={`${styles.node} ${styles.nodeTop}`}
              >
                ITSM
              </div>

              <div
                className={`${styles.node} ${styles.nodeRight}`}
              >
                AUTOMATION
              </div>

              <div
                className={`${styles.node} ${styles.nodeBottom}`}
              >
                ITAM
              </div>

              <div
                className={`${styles.node} ${styles.nodeLeft}`}
              >
                DIGITAL
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= INTRO ================= */}

      <section className={styles.intro}>
        <div className={styles.container}>

          <div className={styles.introGrid}>

            <div>
              <span className={styles.eyebrow}>
                ONE CONNECTED EXPERIENCE
              </span>

              <h2>
                Unify Service
                <br />
                Experiences Across
                <br />
                the <span>Enterprise.</span>
              </h2>
            </div>

            <div className={styles.introContent}>

              <p>
                We empower enterprises with intelligent, AI-driven Enterprise
                Service Management solutions that enhance service delivery,
                automate workflows and improve operational efficiency.
              </p>

              <div className={styles.outcomes}>

                <div>
                  <strong>01</strong>
                  <span>Break down operational silos</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>Accelerate service delivery</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Improve employee experience</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= OEM ================= */}

      <section className={styles.oemSection}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <div>
              <span className={styles.eyebrow}>
                OUR EXPERTISE
              </span>

              <h2>
                Built Around Leading
                <br />
                ESM <span>Platforms.</span>
              </h2>
            </div>

            <p>
              Our expertise spans leading Enterprise Service Management
              platforms, helping organizations select, implement and optimize
              the right technology.
            </p>

          </div>


          <div className={styles.oemGrid}>

            {oems.map((oem) => (
              <article
                key={oem.name}
                className={styles.oemCard}
              >

                <div className={styles.oemTop}>

                  <span className={styles.cardNumber}>
                    {oem.number}
                  </span>

                  <div className={styles.oemIcon}>
                    +
                  </div>

                </div>

                <div className={styles.oemBody}>

                  <h3>{oem.name}</h3>

                  <h4>{oem.title}</h4>

                  <p>{oem.description}</p>

                  <Link href={oem.link}>
                    Explore {oem.name}
                    <span>→</span>
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* ================= CAPABILITIES ================= */}

      <section
        id="capabilities"
        className={styles.capabilities}
      >

        <div className={styles.container}>

          <div className={styles.capabilityHeader}>

            <div>
              <span className={styles.eyebrow}>
                CORE CAPABILITIES
              </span>

              <h2>
                ESM capabilities
                <br />
                built for <span>scale.</span>
              </h2>
            </div>

            <p>
              From service management to automation and analytics, build a
              connected operating model for your enterprise.
            </p>

          </div>


          <div className={styles.capabilityGrid}>

            {capabilities.map((item) => (
              <article
                key={item.number}
                className={styles.capabilityCard}
              >

                <span className={styles.capabilityNumber}>
                  {item.number}
                </span>

                <div className={styles.capabilityCardContent}>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  <span className={styles.arrow}>
                    →
                  </span>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* ================= APPROACH ================= */}

      <section className={styles.approach}>

        <div className={styles.container}>

          <div className={styles.approachHeader}>

            <span className={styles.eyebrow}>
              OUR APPROACH
            </span>

            <h2>
              From Strategy
              <br />
              to <span>Success.</span>
            </h2>

          </div>


          <div className={styles.approachGrid}>

            {approach.map((item) => (
              <div
                key={item.number}
                className={styles.approachItem}
              >

                <div className={styles.approachCircle}>
                  {item.number}
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* ================= WHY KINSFOLK ================= */}

      <section className={styles.whySection}>

        <div className={styles.container}>

          <div className={styles.whyHeader}>

            <span className={styles.eyebrowGreen}>
              WHY KINSFOLK
            </span>

            <h2>
              Built for Outcomes.
              <br />
              Designed for <span>Scale.</span>
            </h2>

          </div>


          <div className={styles.reasonGrid}>

            {reasons.map((reason) => (
              <article
                key={reason.number}
                className={styles.reasonCard}
              >

                <span>
                  {reason.number}
                </span>

                <div>

                  <h3>{reason.title}</h3>

                  <p>{reason.text}</p>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}

      <section className={styles.cta}>

        <div className={styles.ctaGlow}></div>

        <div className={styles.container}>

          <span>
            START YOUR TRANSFORMATION
          </span>

          <h2>
            Ready to build a smarter
            <br />
            service experience?
          </h2>

          <p>
            Let&apos;s create a connected, intelligent and scalable enterprise
            service ecosystem.
          </p>

          <Link
            href="/contact-us"
            className={styles.ctaButton}
          >
            Talk to an ESM Expert
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>
  );
}