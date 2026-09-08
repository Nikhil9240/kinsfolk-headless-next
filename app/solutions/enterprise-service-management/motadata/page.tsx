import Link from "next/link";
import styles from "./page.module.css";

export default function MotadataPage() {
  return (
    <main className={styles.page}>

      <section className={styles.hero}>
        <div className={styles.container}>

          <span>MOTADATA</span>

          <h1>
            Smarter IT Operations.
            <br />
            <strong>Better Visibility.</strong>
          </h1>

          <p>
            Integrated service management, monitoring and observability
            designed for modern IT environments.
          </p>

          <Link href="/contact-us">
            Talk to a Motadata Expert →
          </Link>

        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <span>MOTADATA CAPABILITIES</span>

          <h2>
            Service management
            <br />
            meets observability.
          </h2>

          <div className={styles.grid}>

            {[
              "IT Service Management",
              "IT Asset Management",
              "Network Monitoring",
              "Infrastructure Monitoring",
            ].map((item) => (
              <div key={item}>
                <small>+</small>
                <h3>{item}</h3>
                <p>
                  Improve visibility, automate operations and deliver
                  reliable IT services.
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to transform with Motadata?</h2>

        <Link href="/contact-us">
          Get Started →
        </Link>
      </section>

    </main>
  );
}