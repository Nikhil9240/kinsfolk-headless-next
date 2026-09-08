import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { solutions } from "@/lib/solutions";
import BlogSection from "@/components/BlogSection/BlogSection";
import Solutions from "@/components/solutions/solution";
import Services from "@/components/Services/Services";

import styles from "./page.module.css";

// Dynamic route parameters for /solutions/[slug]
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Client logos used by the trusted technology ecosystem slider.
// This section remains common across all solution pages.
const partners = [
  {
    name: "Aditya Birla Capital",
    image: "/images/client/Aditya-Birla.webp",
  },
  {
    name: "Apar",
    image: "/images/client/Apar.webp",
  },
  {
    name: "Axis Bank",
    image: "/images/client/axis-bank.webp",
  },
  {
    name: "Bandhan Bank",
    image: "/images/client/Bandhan-Bank.webp",
  },
  {
    name: "Bank of India",
    image: "/images/client/bank-of-india.webp",
  },
  {
    name: "Entuity",
    image: "/images/client/Enquity.webp",
  },
  {
    name: "Future Generali",
    image: "/images/client/future.webp",
  },
  {
    name: "ICICI Bank",
    image: "/images/client/Icici-bank.webp",
  },
  {
    name: "ICICI Lombard",
    image: "/images/client/Icici-Lombard.webp",
  },
  {
    name: "ICICI Prudential",
    image: "/images/client/Icici-P.webp",
  },
  {
    name: "Indian Overseas Bank",
    image: "/images/client/indian-overseas-bank.webp",
  },
  {
    name: "J&K Bank",
    image: "/images/client/JK-Bank.webp",
  },
  {
    name: "Magnoos",
    image: "/images/client/magnoos.webp",
  },
  {
    name: "Mphasis",
    image: "/images/client/mphisis.png",
  },
  {
    name: "Persistent",
    image: "/images/client/Persistant.webp",
  },
  {
    name: "SBI Life",
    image: "/images/client/Sbi-Life.webp",
  },
  {
    name: "State Bank of India",
    image: "/images/client/SBI.webp",
  },
  {
    name: "UCO Bank",
    image: "/images/client/uco-bank.webp",
  },
  {
    name: "Union Bank of India",
    image: "/images/client/union-bank.webp",
  },
  {
    name: "Volkswagen",
    image: "/images/client/volkswagaon.webp",
  },
];

// Dynamic Hero Visual component.
// The visual design stays the same for each solution type,
// while the selected visual changes according to solution.heroVisual.
function HeroVisual({ visual }: { visual?: string }) {
  // Agentic AI
  if (visual === "agentic-ai") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.orbitLarge}>
          <span className={styles.orbitNodeOne} />
          <span className={styles.orbitNodeTwo} />
        </div>

        <div className={styles.orbitSmall}>
          <span />
        </div>

        <div className={styles.aiCore}>
          <div className={styles.aiCoreInner}>
            <span>AI</span>
          </div>
        </div>

        <div className={styles.visualCardOne}>
          <span>01</span>
          <strong>Understand</strong>
        </div>

        <div className={styles.visualCardTwo}>
          <span>02</span>
          <strong>Decide</strong>
        </div>

        <div className={styles.visualCardThree}>
          <span>03</span>
          <strong>Act</strong>
        </div>

        <div className={styles.visualParticleOne} />
        <div className={styles.visualParticleTwo} />
        <div className={styles.visualParticleThree} />
        <div className={styles.visualParticleFour} />
      </div>
    );
  }

  // Generative AI
  if (visual === "gen-ai") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.genAiOrb}>
          <div className={styles.genAiInner}>GEN</div>
        </div>

        <div className={styles.genCardOne}>
          <span>01</span>
          <strong>Create</strong>
        </div>

        <div className={styles.genCardTwo}>
          <span>02</span>
          <strong>Analyse</strong>
        </div>

        <div className={styles.genCardThree}>
          <span>03</span>
          <strong>Automate</strong>
        </div>

        <div className={styles.genParticleOne} />
        <div className={styles.genParticleTwo} />
        <div className={styles.genParticleThree} />
      </div>
    );
  }

  // AI Service Management
  if (visual === "ai-service-management") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.serviceLineOne} />
        <div className={styles.serviceLineTwo} />
        <div className={styles.serviceLineThree} />
        <div className={styles.serviceLineFour} />

        <div className={styles.serviceHub}>
          <span>AI</span>
          <strong>Service</strong>
        </div>

        <div className={styles.serviceNodeOne}>ITSM</div>
        <div className={styles.serviceNodeTwo}>HR</div>
        <div className={styles.serviceNodeThree}>Support</div>
        <div className={styles.serviceNodeFour}>Ops</div>
      </div>
    );
  }

  // AIOps
  if (visual === "aiops") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.aiopsRingOne} />
        <div className={styles.aiopsRingTwo} />

        <div className={styles.aiopsCore}>AIOps</div>

        <div className={styles.aiopsMetricOne}>
          <span>24/7</span>
          <small>Monitoring</small>
        </div>

        <div className={styles.aiopsMetricTwo}>
          <span>AI</span>
          <small>Detection</small>
        </div>

        <div className={styles.aiopsMetricThree}>
          <span>Auto</span>
          <small>Remediation</small>
        </div>
      </div>
    );
  }

  // AI Asset Management
  if (visual === "asset-management") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.assetOrbit} />

        <div className={styles.assetCore}>
          <span>AI</span>
          <strong>Assets</strong>
        </div>

        <div className={styles.assetCardOne}>
          <span>TRACK</span>
          <strong>Assets</strong>
        </div>

        <div className={styles.assetCardTwo}>
          <span>MANAGE</span>
          <strong>Lifecycle</strong>
        </div>

        <div className={styles.assetCardThree}>
          <span>OPTIMISE</span>
          <strong>Spend</strong>
        </div>
      </div>
    );
  }

  // Hyper Automation
  if (visual === "hyper-automation") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.automationFlow}>
          <div className={styles.automationStep}>01</div>
          <div className={styles.automationLine} />
          <div className={styles.automationStep}>02</div>
          <div className={styles.automationLine} />
          <div className={styles.automationStep}>03</div>
        </div>

        <div className={styles.automationCenter}>
          <span>AI</span>
          <strong>AUTOMATE</strong>
        </div>

        <div className={styles.automationCardOne}>Discover</div>
        <div className={styles.automationCardTwo}>Orchestrate</div>
        <div className={styles.automationCardThree}>Execute</div>
      </div>
    );
  }

  // Enterprise Data Management
  if (visual === "data-management") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.dataLayerOne} />
        <div className={styles.dataLayerTwo} />
        <div className={styles.dataLayerThree} />

        <div className={styles.dataCore}>DATA</div>

        <div className={styles.dataNodeOne} />
        <div className={styles.dataNodeTwo} />
        <div className={styles.dataNodeThree} />
        <div className={styles.dataNodeFour} />
      </div>
    );
  }

  // AI Security & Cyber Defense
  if (visual === "cyber-defense") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.securityRingOne} />
        <div className={styles.securityRingTwo} />

        <div className={styles.securityShield}>
          <span>AI</span>
          <strong>DEFENSE</strong>
        </div>

        <div className={styles.securityNodeOne}>Detect</div>
        <div className={styles.securityNodeTwo}>Protect</div>
        <div className={styles.securityNodeThree}>Respond</div>
      </div>
    );
  }

  // Cloud & Infrastructure
  if (visual === "cloud-infrastructure") {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.visualGrid} />

        <div className={styles.cloudOrbitOne} />
        <div className={styles.cloudOrbitTwo} />

        <div className={styles.cloudMain}>
          <span className={styles.cloudIcon}>☁</span>
          <strong>CLOUD</strong>
          <small>INFRASTRUCTURE</small>
        </div>

        <div className={styles.customCloudCard}>
          <div className={styles.cardIconBox}>☁️</div>

          <div className={styles.cardTextBox}>
            <span>Scale</span>
            <strong>Without Limits</strong>
          </div>
        </div>

        <div className={styles.cloudCardOne}>
          <span>01</span>
          <strong>Compute</strong>
        </div>

        <div className={styles.cloudCardTwo}>
          <span>02</span>
          <strong>Network</strong>
        </div>

        <div className={styles.cloudCardThree}>
          <span>03</span>
          <strong>Scale</strong>
        </div>

        <div className={styles.cloudNodeOne} />
        <div className={styles.cloudNodeTwo} />
        <div className={styles.cloudNodeThree} />
        <div className={styles.cloudNodeFour} />
      </div>
    );
  }

  // Generic fallback visual
  return (
    <div className={styles.heroVisual}>
      <div className={styles.visualGrid} />

      <div className={styles.aiCore}>
        <div className={styles.aiCoreInner}>
          <span>AI</span>
        </div>
      </div>
    </div>
  );
}

// Main dynamic solution page.
export default async function SolutionPage({ params }: Props) {
  // Read the dynamic [slug] value from the URL.
  const { slug } = await params;

  // Find the matching solution from the central solution data file.
  const solution = solutions.find((item) => item.slug === slug);

  // Show Next.js 404 page when an invalid solution slug is requested.
  if (!solution) {
    notFound();
  }

  return (
    <main className={styles.solutionPage}>
      {/* ======================================================
          HERO
      ====================================================== */}
      <section className={styles.hero}>
        <div className={styles.heroGlowOne} />
        <div className={styles.heroGlowTwo} />

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                {solution.heroEyebrow}
              </div>

              <h1>{solution.title}</h1>

              <p className={styles.heroText}>{solution.heroText}</p>

              <div className={styles.heroButtons}>
                <Link href="/contact" className={styles.primaryButton}>
                  {solution.primaryButtonLabel}
                  <span>→</span>
                </Link>

                <Link
                  href={solution.secondaryButtonHref}
                  className={styles.secondaryButton}
                >
                  {solution.secondaryButtonLabel}
                  <span>↓</span>
                </Link>
              </div>
            </div>

            <HeroVisual visual={solution.heroVisual} />
          </div>
        </div>
      </section>

      {/* ======================================================
          TRUSTED TECHNOLOGY ECOSYSTEM
      ====================================================== */}
      <section className={styles.trustedSection}>
        <div className={styles.container}>
          <div className={styles.trustedHeader}>
            <div className={styles.sectionLabel}>
              TRUSTED TECHNOLOGY ECOSYSTEM
            </div>

            <p>
              Trusted by India&apos;s leading banks, insurers and enterprises
            </p>
          </div>
        </div>

        <div className={styles.partnerSlider}>
          <div className={styles.partnerTrack}>
            {[...partners, ...partners].map((partner, index) => (
              <div
                className={styles.partnerLogo}
                key={`${partner.name}-${index}`}
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={160}
                  height={70}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          ONE CONNECTED EXPERIENCE
          Replaces the previous Solution Overview section.
      ====================================================== */}
      <section className={styles.connectedExperience}>
        <div className={styles.container}>
          <div className={styles.connectedExperienceGrid}>
            <div>
              <span className={styles.esmEyebrow}>
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

            <div className={styles.connectedExperienceContent}>
              <p>
                We empower enterprises with intelligent, AI-driven Enterprise
                Service Management solutions that enhance service delivery,
                automate workflows and improve operational efficiency.
              </p>

              <div className={styles.esmOutcomes}>
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

      {/* ======================================================
          CORE CAPABILITIES
          Replaces the previous Our Expertise + Offerings sections.
      ====================================================== */}
      <section
        id="capabilities"
        className={styles.coreCapabilities}
      >
        <div className={styles.container}>
          <div className={styles.coreCapabilitiesHeader}>
            <div>
              <span className={styles.esmEyebrow}>
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

          <div className={styles.coreCapabilityGrid}>
            <article className={styles.coreCapabilityCard}>
              <span className={styles.coreCapabilityNumber}>01</span>

              <div className={styles.coreCapabilityContent}>
                <h3>IT Service Management</h3>

                <p>
                  Build smarter, faster and more efficient enterprise service
                  operations.
                </p>

                <span className={styles.coreCapabilityArrow}>→</span>
              </div>
            </article>

            <article className={styles.coreCapabilityCard}>
              <span className={styles.coreCapabilityNumber}>02</span>

              <div className={styles.coreCapabilityContent}>
                <h3>Service Automation</h3>

                <p>
                  Automate repetitive service workflows and improve operational
                  efficiency.
                </p>

                <span className={styles.coreCapabilityArrow}>→</span>
              </div>
            </article>

            <article className={styles.coreCapabilityCard}>
              <span className={styles.coreCapabilityNumber}>03</span>

              <div className={styles.coreCapabilityContent}>
                <h3>IT Asset Management</h3>

                <p>
                  Gain complete visibility and control across your enterprise
                  technology assets.
                </p>

                <span className={styles.coreCapabilityArrow}>→</span>
              </div>
            </article>

            <article className={styles.coreCapabilityCard}>
              <span className={styles.coreCapabilityNumber}>04</span>

              <div className={styles.coreCapabilityContent}>
                <h3>Digital Workplace</h3>

                <p>
                  Create seamless digital experiences for employees across the
                  enterprise.
                </p>

                <span className={styles.coreCapabilityArrow}>→</span>
              </div>
            </article>

            <article className={styles.coreCapabilityCard}>
              <span className={styles.coreCapabilityNumber}>05</span>

              <div className={styles.coreCapabilityContent}>
                <h3>Analytics &amp; Reporting</h3>

                <p>
                  Turn service data into actionable insights and measurable
                  outcomes.
                </p>

                <span className={styles.coreCapabilityArrow}>→</span>
              </div>
            </article>

            <article className={styles.coreCapabilityCard}>
              <span className={styles.coreCapabilityNumber}>06</span>

              <div className={styles.coreCapabilityContent}>
                <h3>Process Optimization</h3>

                <p>
                  Simplify processes, remove bottlenecks and continuously
                  improve service delivery.
                </p>

                <span className={styles.coreCapabilityArrow}>→</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ======================================================
          WHY KINSFOLK
      ====================================================== */}
      <section className={styles.whyKinsfolk}>
        <div className={styles.container}>
          <div className={styles.whyKinsfolkHeader}>
            <span className={styles.esmEyebrowGreen}>
              WHY KINSFOLK
            </span>

            <h2>
              Built for Outcomes.
              <br />
              Designed for <span>Scale.</span>
            </h2>
          </div>

          <div className={styles.whyKinsfolkGrid}>
            <article className={styles.whyKinsfolkCard}>
              <span>01</span>

              <div>
                <h3>Certified Resources</h3>

                <p>
                  Experienced consultants with hands-on expertise across
                  enterprise service management platforms.
                </p>
              </div>
            </article>

            <article className={styles.whyKinsfolkCard}>
              <span>02</span>

              <div>
                <h3>ROI-Driven Consulting</h3>

                <p>
                  We focus on measurable business outcomes, operational
                  efficiency and long-term value.
                </p>
              </div>
            </article>

            <article className={styles.whyKinsfolkCard}>
              <span>03</span>

              <div>
                <h3>Scalable Architecture</h3>

                <p>
                  Solutions designed to scale with your organization,
                  technology and future business needs.
                </p>
              </div>
            </article>

            <article className={styles.whyKinsfolkCard}>
              <span>04</span>

              <div>
                <h3>Seamless Integrations</h3>

                <p>
                  Connect enterprise applications, data and workflows to
                  create a unified service ecosystem.
                </p>
              </div>
            </article>

            <article className={styles.whyKinsfolkCard}>
              <span>05</span>

              <div>
                <h3>Proven Expertise</h3>

                <p>
                  Practical experience helping organizations modernize service
                  delivery and accelerate transformation.
                </p>
              </div>
            </article>

            <article className={styles.whyKinsfolkCard}>
              <span>06</span>

              <div>
                <h3>24×7 Support</h3>

                <p>
                  Reliable support to help keep your enterprise services
                  stable, secure and performing.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ======================================================
          SERVICES
      ====================================================== */}
      <div className={styles.servicesWrapper}>
        <Services />
      </div>

      {/* ======================================================
          RELATED SOLUTIONS + BLOG
      ====================================================== */}
      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <div className={styles.solutionsWrapper}>
            <Solutions />
          </div>
        </div>

        <div className={styles.BlogWrapper}>
          <BlogSection />
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
      ====================================================== */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />

            <div className={styles.ctaContent}>
              <div className={styles.sectionLabel}>
                {solution.cta.label}
              </div>

              <h2>{solution.cta.title}</h2>

              <p>{solution.cta.body}</p>
            </div>

            <Link href="/contact" className={styles.ctaButton}>
              Book a Discovery Call
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}