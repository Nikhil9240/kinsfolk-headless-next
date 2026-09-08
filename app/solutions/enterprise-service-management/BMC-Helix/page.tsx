import Link from "next/link";
import styles from "./page.module.css";

export default function BmcHelixPage() {
  return (
    <main className={styles.page}>

      <section className={styles.hero}>
        <div className={styles.container}>

          <span>BMC HELIX</span>

          <h1>
            Intelligent Service
            <br />
            Management with <strong>AI.</strong>
          </h1>

          <p>
            Unlock intelligent, automated and connected enterprise service
            management with BMC Helix.
          </p>

          <Link href="/contact-us">
            Talk to a BMC Helix Expert →
          </Link>

        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <span>WHY BMC HELIX</span>

          <h2>
            Transform service operations
            <br />
            with intelligent automation.
          </h2>

          <div className={styles.grid}>

            {[
              "Helix ITSM",
              "Digital Workplace",
              "Business Workflows",
              "AI-powered Service Management",
            ].map((item) => (
              <div key={item}>
                <small>+</small>
                <h3>{item}</h3>
                <p>
                  Create faster, smarter and more connected enterprise
                  service experiences.
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to transform with BMC Helix?</h2>
        <Link href="/contact-us">
          Get Started →
        </Link>
      </section>

    </main>
  );
}