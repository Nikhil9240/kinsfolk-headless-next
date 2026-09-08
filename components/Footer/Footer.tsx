"use client";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="kinsfolk-footer">

      {/* =====================================================
          CTA SECTION
      ===================================================== */}

      <section className="footer-cta">

        <div className="footer-cta-inner">

          <div className="footer-cta-icon">
            ▤
          </div>

          <h2>
            Ready to Transform Your IT Landscape?
            <br />
            
          </h2>

          <p>
           Let’s design a smarter, more resilient digital future together.
          </p>

          <div className="footer-signup">

            <input
              type="email"
              placeholder="Enter Your Mail.."
              aria-label="Email address"
            />

            <button type="button">
              <span>Sign Up</span>
              <strong>→</strong>
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHITE FOOTER PANEL
      ===================================================== */}

      <section className="footer-panel">

        <div className="footer-panel-top">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="footer-brand">

            <a
              href="/"
              className="footer-logo"
            >
              <img
                src="/images/kinsfolk-logo.webp"
                alt="Kinsfolk"
              />
            </a>

            <h3>
              Simplifying IT
              <br />
              for a complex
              <br />
              world.
            </h3>

            <a
              href="/contact"
              className="footer-contact-btn"
            >
              Get In Touch
              <span>→</span>
            </a>

          </div>


          {/* =================================================
              SOLUTIONS
          ================================================= */}

          <div className="footer-links-column">

            <h4>Solutions</h4>

            <a href="/solutions/agentic-ai">
              Agentic AI
            </a>

            <a href="/solutions/gen-ai-driven-operations">
              Gen AI Driven Operations
            </a>

            <a href="/solutions/aiops-full-stack-observability">
              AIOps &amp; Full Stack Observability
            </a>

            <a href="/solutions/ai-based-asset-management">
              AI-Based Asset Management
            </a>

            <a href="/solutions/hyper-automation">
              Hyper Automation
            </a>

            <a href="/solutions/enterprise-data-management">
              Enterprise Data Management
            </a>

            <a href="/solutions/ai-led-security-cyber-defense">
              AI-Led Security &amp; Cyber Defense
            </a>

            <a href="/solutions/cloud-infrastructure">
              Cloud &amp; Infrastructure
            </a>

          </div>


          {/* =================================================
              MORE
          ================================================= */}

          <div className="footer-links-column">

            <h4>More</h4>

            <a href="/solutions/application-modernization">
              Application Modernization
            </a>

            <a href="/solutions/mobile-internet-banking">
              Mobile &amp; Internet Banking
            </a>

            <a href="/solutions/software-bill-of-material">
              Software Bill Of Material
            </a>

            <a href="/industries">
              Industries
            </a>

            <a href="/services">
              Services
            </a>

          </div>


          {/* =================================================
              COMPANY
          ================================================= */}

          <div className="footer-links-column">

            <h4>Company</h4>

            <a href="/company/about-us">
              About Us
            </a>

            <a href="/company/partnerships">
              Partnerships
            </a>

            <a href="/company/careers">
              Careers
            </a>

            <a href="/case-studies">
              Case Studies
            </a>

            <a href="/insights">
              Insights
            </a>

            <a href="/client-support">
              Client Support
            </a>

          </div>


          {/* =================================================
              CONNECT
          ================================================= */}

          <div className="footer-links-column footer-connect">

            <h4>Connect</h4>

            <a href="tel:+912025653148">
              +91 20-2565-3148
            </a>

            <a href="mailto:info@kinsfolk.ai">
              info@kinsfolk.ai
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

          </div>

        </div>


        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <div className="footer-panel-bottom">

          <div className="footer-bottom-left">

            <a href="/privacy-policy">
              Privacy Policy
            </a>

            <a href="/terms">
              Terms of Use
            </a>

            <a href="/cookie-policy">
              Cookie Consent
            </a>

          </div>

          <p>
            © 2026 Kinsfolk Technology Private Limited.
            All rights reserved.
          </p>

        </div>

      </section>

    </footer>
  );
}