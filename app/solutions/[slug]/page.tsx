import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { solutions } from "@/lib/solutions";
import { getBlogPosts } from "@/lib/blog";
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

        <div className={styles.automationCardOne}>
          Discover
        </div>

        <div className={styles.automationCardTwo}>
          Orchestrate
        </div>

        <div className={styles.automationCardThree}>
          Execute
        </div>
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

        <div className={styles.securityNodeOne}>
          Detect
        </div>

        <div className={styles.securityNodeTwo}>
          Protect
        </div>

        <div className={styles.securityNodeThree}>
          Respond
        </div>
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
          <div className={styles.cardIconBox}>
            ☁️
          </div>

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
  const solution = solutions.find(
    (item) => item.slug === slug
  );

  // Show Next.js 404 page when an invalid solution slug is requested.
  if (!solution) {
    notFound();
  }

  // Fetch latest blog posts from WordPress.
  const blogs = await getBlogPosts(6);

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

              <p className={styles.heroText}>
                {solution.heroText}
              </p>

              <div className={styles.heroButtons}>

                <Link
                  href="/contact"
                  className={styles.primaryButton}
                >
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

            {[...partners, ...partners].map(
              (partner, index) => (
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
              )
            )}

          </div>

        </div>

      </section>


      {/* ======================================================
          SOLUTION OVERVIEW
      ====================================================== */}

      <section className={styles.positioning}>

        <div className={styles.container}>

          <div className={styles.positioningGrid}>

            <div>

              <div className={styles.sectionLabel}>
                {solution.overview.label}
              </div>

              <h2>{solution.overview.title}</h2>

            </div>


            <div className={styles.positioningContent}>

              <p className={styles.leadText}>
                {solution.overview.lead}
              </p>

              <p>
                {solution.overview.body}
              </p>

            </div>

          </div>


          {/* Dynamic four proof points */}

          <div className={styles.proofGrid}>

            {solution.proofPoints.map((item) => (
              <article
                className={styles.proofCard}
                key={item.number}
              >
                <span>{item.number}</span>

                <p>{item.text}</p>
              </article>
            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          OUR EXPERTISE
      ====================================================== */}

      <section className={styles.expertiseSection}>

        <div className={styles.container}>

          <div className={styles.sectionTop}>

            <div>

              <div className={styles.sectionLabel}>
                {solution.expertise.label}
              </div>

              <h2>{solution.expertise.title}</h2>

            </div>

            <p>
              {solution.expertise.intro}
            </p>

          </div>


          <div className={styles.expertiseGrid}>

            {solution.expertise.items.map((item) => (

              <article
                className={styles.expertiseCard}
                key={`${solution.slug}-${item.number}`}
              >

                <div className={styles.cardTop}>

                  <div className={styles.expertiseLogo}>

                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={60}
                    />

                  </div>

                  <span className={styles.cardNumber}>
                    {item.number}
                  </span>

                </div>


                <div className={styles.cardContent}>

                  <h3>{item.name}</h3>

                  <p>
                    {item.description}
                  </p>


                  <div className={styles.tags}>

                    {item.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}

                  </div>

                </div>


                <div className={styles.cardFooter}>

                  <Link
                    href={item.href}
                    className={styles.expertiseButton}
                  >
                    Explore Solution
                    <span>→</span>
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          OFFERINGS
      ====================================================== */}

      {solution.offerings.items.length > 0 && (

        <section
          id="offerings"
          className={styles.offeringsSection}
        >

          <div className={styles.container}>

            <div className={styles.sectionTop}>

              <div>

                <div className={styles.sectionLabel}>
                  {solution.offerings.label}
                </div>

                <h2>
                  {solution.offerings.title}
                </h2>

              </div>

              <p>
                {solution.offerings.intro}
              </p>

            </div>


            <div className={styles.offeringsGrid}>

              {solution.offerings.items.map((item) => (

                <article
                  className={styles.offeringCard}
                  key={`${solution.slug}-${item.number}`}
                >

                  <span className={styles.offeringNumber}>
                    {item.number}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className={styles.offeringLine} />

                </article>

              ))}

            </div>

          </div>

        </section>

      )}


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

          {/* WordPress Blog Posts */}

          <BlogSection blogs={blogs} />

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

              <h2>
                {solution.cta.title}
              </h2>

              <p>
                {solution.cta.body}
              </p>

            </div>


            <Link
              href="/contact"
              className={styles.ctaButton}
            >
              Book a Discovery Call
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}