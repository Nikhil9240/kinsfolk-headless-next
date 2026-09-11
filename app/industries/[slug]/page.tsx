import { notFound } from "next/navigation";

import { getIndustry } from "@/lib/industries";
import { getBlogPosts } from "@/lib/blog";

import Trust from "@/components/trust/trust";
import SolutionCore from "@/components/solutions/solution";
import Services from "@/components/Services/Services";
import BlogSection from "@/components/BlogSection/BlogSection";


import styles from "./page.module.css";

/* ============================================================
   PAGE PROPS
============================================================ */

type Props = {
  params: Promise<{
    slug: string;
  }>;
};


/* ============================================================
   INDUSTRY DETAIL PAGE
============================================================ */

export default async function IndustryPage({
  params,
}: Props) {

  /* ----------------------------------------------------------
     URL मधून industry slug घेतो.

     Example:
     /industries/manufacturing/

     slug = manufacturing
  ---------------------------------------------------------- */

  const { slug } = await params;


  /* ----------------------------------------------------------
     industries.ts मधून industry data घेतो.
  ---------------------------------------------------------- */

  const industry = await getIndustry(slug);


  /* ----------------------------------------------------------
     Industry सापडली नाही तर 404.
  ---------------------------------------------------------- */

  if (!industry) {
    notFound();
  }


  /* ----------------------------------------------------------
     WordPress मधून latest 6 blog posts घेतो.

     हे blogs:
     - सर्व Industry pages वर
     - BlogSection मध्ये
     वापरले जातील.
  ---------------------------------------------------------- */

  const blogs = await getBlogPosts(6);


  return (
    <main className={styles.page}>


      {/* ======================================================
          1. HERO SECTION
      ====================================================== */}

      <section className={styles.hero}>

        <div className={styles.heroContainer}>

          {/* ==================================================
              HERO CONTENT
          ================================================== */}

          <div className={styles.heroContent}>

            <div className={styles.heroEyebrow}>
              INDUSTRIES
            </div>


            {/* Dynamic Industry Title */}

            <h1 className={styles.heroTitle}>
              {industry.heroTitle}
            </h1>


            {/* Dynamic Industry Description */}

            <p className={styles.heroDescription}>
              {industry.heroDescription}
            </p>


            {/* Hero CTA */}

            <a
              href="/contact"
              className={styles.darkButton}
            >
              Talk to Our Experts

              <span>
                →
              </span>
            </a>

          </div>


          {/* ==================================================
              INDUSTRY-SPECIFIC CSS VISUAL

              IMPORTANT:
              कोणतीही image नाही.

              visualType industries.ts मधून येतो.
          ================================================== */}

          <div
            className={styles.heroVisual}
          >


            {/* =================================================
                BANKING VISUAL
            ================================================= */}

            {industry.visualType === "banking" && (

              <div className={styles.bankingVisual}>

                <div className={styles.bankCircle}>
                  BANK
                </div>


                <span
                  className={`${styles.bankNode} ${styles.bankNode1}`}
                />

                <span
                  className={`${styles.bankNode} ${styles.bankNode2}`}
                />

                <span
                  className={`${styles.bankNode} ${styles.bankNode3}`}
                />

                <span
                  className={`${styles.bankNode} ${styles.bankNode4}`}
                />


                <span
                  className={`${styles.bankLine} ${styles.bankLine1}`}
                />

                <span
                  className={`${styles.bankLine} ${styles.bankLine2}`}
                />

                <span
                  className={`${styles.bankLine} ${styles.bankLine3}`}
                />

                <span
                  className={`${styles.bankLine} ${styles.bankLine4}`}
                />


                <div className={styles.bankBadge}>

                  <strong>
                    99.9%
                  </strong>

                  <small>
                    Reliability
                  </small>

                </div>

              </div>

            )}


            {/* =================================================
                FINTECH VISUAL
            ================================================= */}

            {industry.visualType === "fintech" && (

              <div className={styles.fintechVisual}>

                <div className={styles.fintechCard}>

                  <small>
                    TRANSACTION FLOW
                  </small>

                  <strong>
                    ₹ 8,42,600
                  </strong>


                  <div className={styles.fintechGraph}>

                    <i />
                    <i />
                    <i />
                    <i />
                    <i />

                  </div>

                </div>


                <div className={styles.paymentNode}>
                  $
                </div>


                <div className={styles.paymentNodeTwo}>
                  ✓
                </div>


                <span
                  className={styles.fintechLine}
                />

              </div>

            )}


            {/* =================================================
                MANUFACTURING VISUAL
            ================================================= */}

            {industry.visualType === "manufacturing" && (

              <div className={styles.manufacturingVisual}>

                <div className={styles.factoryGrid}>


                  <div className={styles.factoryBox}>

                    <span />

                    <strong>
                      01
                    </strong>

                  </div>


                  <div className={styles.factoryBox}>

                    <span />

                    <strong>
                      02
                    </strong>

                  </div>


                  <div className={styles.factoryBox}>

                    <span />

                    <strong>
                      03
                    </strong>

                  </div>


                  <div className={styles.factoryBox}>

                    <span />

                    <strong>
                      04
                    </strong>

                  </div>


                </div>


                <div className={styles.factoryCore}>

                  <span>
                    AI
                  </span>

                </div>


                <div className={styles.factoryStatus}>

                  <b />

                  LIVE PRODUCTION

                </div>

              </div>

            )}


            {/* =================================================
                PHARMACEUTICAL VISUAL
            ================================================= */}

            {industry.visualType === "pharmaceutical" && (

              <div className={styles.pharmaVisual}>

                <div className={styles.moleculeCore}>

                  <span />

                </div>


                <span
                  className={`${styles.moleculeNode} ${styles.molecule1}`}
                />

                <span
                  className={`${styles.moleculeNode} ${styles.molecule2}`}
                />

                <span
                  className={`${styles.moleculeNode} ${styles.molecule3}`}
                />

                <span
                  className={`${styles.moleculeNode} ${styles.molecule4}`}
                />

                <span
                  className={`${styles.moleculeNode} ${styles.molecule5}`}
                />


                <span
                  className={`${styles.moleculeBond} ${styles.bond1}`}
                />

                <span
                  className={`${styles.moleculeBond} ${styles.bond2}`}
                />

                <span
                  className={`${styles.moleculeBond} ${styles.bond3}`}
                />

                <span
                  className={`${styles.moleculeBond} ${styles.bond4}`}
                />


                <div className={styles.pharmaBadge}>
                  SECURE
                </div>

              </div>

            )}


            {/* =================================================
                TELECOMMUNICATION VISUAL
            ================================================= */}

            {industry.visualType === "telecommunications" && (

              <div className={styles.telecomVisual}>

                <div className={styles.signalCore}>

                  <span />

                </div>


                <div
                  className={`${styles.signalRing} ${styles.signalRing1}`}
                />

                <div
                  className={`${styles.signalRing} ${styles.signalRing2}`}
                />

                <div
                  className={`${styles.signalRing} ${styles.signalRing3}`}
                />


                <div className={styles.signalTower}>

                  <span />
                  <span />
                  <span />

                </div>


                <div className={styles.networkBadge}>
                  24/7 NETWORK
                </div>

              </div>

            )}


            {/* =================================================
                IT-ENABLED SERVICES VISUAL
            ================================================= */}

            {industry.visualType === "it-services" && (

              <div className={styles.itServicesVisual}>

                <div className={styles.itWindow}>


                  <div className={styles.itWindowHeader}>

                    <span />
                    <span />
                    <span />

                  </div>


                  <div className={styles.itWindowBody}>

                    <div />
                    <div />
                    <div />
                    <div />

                  </div>

                </div>


                <div className={styles.itCloud}>
                  AI
                </div>


                <div className={styles.itBadge}>
                  SMART OPERATIONS
                </div>

              </div>

            )}

          </div>

        </div>

      </section>



      {/* ======================================================
          2. ESTEEMED CLIENTS

          Existing Trust component.
      ====================================================== */}

      <Trust />



      {/* ======================================================
          3. DIGITAL EXCELLENCE / INTRO
      ====================================================== */}

      <section
        id="industry-intro"
        className={styles.introSection}
      >

        <div className={styles.container}>

          <div className={styles.introLayout}>


            {/* =================================================
                INTRO VISUAL
            ================================================= */}

            <div className={styles.introVisual}>

              <div className={styles.dashboardCard}>


                {/* Dashboard Header */}

                <div className={styles.dashboardHeader}>

                  <div>

                    <span />
                    <span />
                    <span />

                  </div>

                  <small>
                    LIVE OPERATIONS
                  </small>

                </div>


                {/* Dashboard Body */}

                <div className={styles.dashboardBody}>

                  <div className={styles.dashboardMainValue}>
                    98.7%
                  </div>


                  <div className={styles.dashboardLabel}>
                    Service Reliability
                  </div>


                  {/* Graph */}

                  <div className={styles.dashboardGraph}>

                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />

                  </div>

                </div>


                {/* Dashboard Stats */}

                <div className={styles.dashboardStats}>

                  <div>

                    <strong>
                      24/7
                    </strong>

                    <small>
                      Monitoring
                    </small>

                  </div>


                  <div>

                    <strong>
                      AI
                    </strong>

                    <small>
                      Insights
                    </small>

                  </div>


                  <div>

                    <strong>
                      99%
                    </strong>

                    <small>
                      Uptime
                    </small>

                  </div>

                </div>

              </div>


              {/* Floating Card */}

              <div className={styles.floatingCard}>

                <span className={styles.floatingIcon}>
                  ✓
                </span>


                <div>

                  <strong>
                    Intelligent Operations
                  </strong>

                  <small>
                    Real-time visibility
                  </small>

                </div>

              </div>

            </div>



            {/* =================================================
                DYNAMIC INTRO CONTENT
            ================================================= */}

            <div className={styles.introContent}>


              {/* Eyebrow */}

              <div className={styles.eyebrow}>

                <span />

                {industry.introEyebrow}

              </div>


              {/* Intro Title */}

              <h2>
                {industry.introTitle}
              </h2>


              {/* Paragraph 1 */}

              <p>
                {industry.introDescription}
              </p>


              {/* Paragraph 2 */}

              <p>
                {industry.introDescription2}
              </p>


              {/* =================================================
                  HIGHLIGHTS
              ================================================= */}

              <div className={styles.introHighlights}>

                {industry.highlights.map(
                  (highlight, index) => (

                    <div
                      key={highlight}
                      className={styles.highlightItem}
                    >

                      <span
                        className={styles.highlightNumber}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>


                      <strong>
                        {highlight}
                      </strong>

                    </div>

                  )
                )}

              </div>


              {/* Intro CTA */}

              <a
                href="/contact"
                className={styles.darkButton}
              >
                Learn More

                <span>
                  →
                </span>

              </a>

            </div>

          </div>

        </div>

      </section>



      {/* ======================================================
          4. SOLUTIONS

          Existing 8 Solutions component.
      ====================================================== */}

      <section
        id="solutions"
        className={styles.solutionsSection}
      >

        <div className={styles.container}>

          <div className={styles.sectionHeading}>

            <div className={styles.eyebrow}>

             

             

            </div>


            

          </div>

        </div>

        
     

      </section>



      {/* ======================================================
          5. PARTNER ECOSYSTEM
      ====================================================== */}

      <section className={styles.partnersSection}>

        <div className={styles.container}>


          <div className={styles.sectionHeading}>

            <div className={styles.eyebrow}>

              <span />

              OUR PARTNER ECOSYSTEM

            </div>


            <h2>
              Technology partnerships that create impact.
            </h2>


            <p>
              We work with leading technology platforms to
              deliver scalable, secure and intelligent
              enterprise solutions.
            </p>

          </div>


          <div className={styles.partnerGrid}>


            {/* BMC */}

            <div className={styles.partnerCard}>

              <div className={styles.partnerLogo}>
                BMC
              </div>

              <span>
                Intelligent IT Operations
              </span>

            </div>


            {/* ServiceNow */}

            <div className={styles.partnerCard}>

              <div className={styles.partnerLogo}>
                ServiceNow
              </div>

              <span>
                Service Management
              </span>

            </div>


            {/* Dynatrace */}

            <div className={styles.partnerCard}>

              <div className={styles.partnerLogo}>
                Dynatrace
              </div>

              <span>
                Full-stack Observability
              </span>

            </div>


            {/* Informatica */}

            <div className={styles.partnerCard}>

              <div className={styles.partnerLogo}>
                Informatica
              </div>

              <span>
                Enterprise Data
              </span>

            </div>


            {/* Trend Micro */}

            <div className={styles.partnerCard}>

              <div className={styles.partnerLogo}>
                Trend Micro
              </div>

              <span>
                Cyber Security
              </span>

            </div>


            {/* AWS */}

            <div className={styles.partnerCard}>

              <div className={styles.partnerLogo}>
                AWS
              </div>

              <span>
                Cloud Infrastructure
              </span>

            </div>

          </div>

        </div>

      </section>



      {/* ======================================================
          6. SERVICES
      ====================================================== */}

      <section className={styles.servicesSection}>

        <div className={styles.container}>

          <div className={styles.sectionHeading}>

            <div className={styles.eyebrow}>

              <span />

              OUR SERVICES

            </div>


            <h2>
              From strategy to execution.
            </h2>


            <p>
              Build, modernize and manage your technology
              ecosystem with our end-to-end services.
            </p>

          </div>

        </div>


        <Services />

      </section>



      {/* ======================================================
          7. RESOURCES

          Blog data comes from WordPress.
      ====================================================== */}

      <section className={styles.resourcesSection}>

        <div className={styles.container}>

          <div className={styles.sectionHeading}>

            <div className={styles.eyebrow}>

              <span />

              RESOURCES FOR YOU

            </div>


            <h2>
              Insights for the digital enterprise.
            </h2>


            <p>
              Explore our latest insights, ideas and
              perspectives on enterprise technology.
            </p>

          </div>

        </div>


        {/* WordPress latest 6 blogs */}

        <BlogSection blogs={blogs} />

      </section>



      {/* ======================================================
          8. FINAL CTA
      ====================================================== */}

      <section className={styles.ctaSection}>

        <div className={styles.container}>

          <div className={styles.ctaBox}>


            <div>

              <div className={styles.ctaEyebrow}>
                LET'S BUILD WHAT'S NEXT
              </div>


              <h2>
                Ready to transform your{" "}
                {industry.name}?
              </h2>


              <p>
                Let's explore how intelligent technology
                can help your organization operate smarter,
                faster and more securely.
              </p>

            </div>


            <a
              href="/contact"
              className={styles.ctaButton}
            >
              Talk to Our Experts

              <span>
                →
              </span>

            </a>

          </div>

        </div>

      </section>

    </main>
  );
}