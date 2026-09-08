import "./home.css";
import "./hero.css";

import { SolutionHero } from "@/components/SolutionHero";
import StatsCounter from "@/components/StatsCounter/StatsCounter";
import TrustedBy from "../components/TrustBy/TrustedBy";
import CaseStudies from "../components/CaseStudies/CaseStudies";
import Partners from "../components/Partner/partners";
import Services from "../components/Services/Services";
import IndustryCoverflow from "../components/IndustryCoverflow/IndustryCoverflow";
import BlogSection from "../components/BlogSection/BlogSection";
import { SolutionCore } from "@/components/SolutionCore";

async function getSiteData() {
  const query = `
    query {
      generalSettings {
        title
        url
        description
      }
    }
  `;

  const response = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress data");
  }

  const result = await response.json();

  if (result.errors) {
    console.error("WordPress GraphQL Error:", result.errors);
    throw new Error("WordPress GraphQL request failed");
  }

  return result.data.generalSettings;
}

export default async function Home() {
  const site = await getSiteData();

  return (
    <main className="home-page">

      {/* =========================================
          SECTION 1 — NEW 3D SOLUTION HERO
          Replaces the old HeroBackground hero.
      ========================================= */}

      <SolutionHero id="hero" />


      {/* =========================================
          SECTION 2 — IMPACT COUNTERS
      ========================================= */}

      <section
        className="statsBar"
        id="stats"
      >
        <div className="statsContainer">

          <div className="statsHeading">
            <h2></h2>
            <p></p>
          </div>

          <StatsCounter />

        </div>
      </section>


      {/* =========================================
          SECTION 3 — TRUSTED BY
      ========================================= */}

      <TrustedBy />


      {/* =========================================
          SECTION 4 — SOLUTION CORE
          Main interactive 3D solutions section.
      ========================================= */}

      <SolutionCore id="solutions" />


      {/* =========================================
          SECTION 5 — CASE STUDIES
      ========================================= */}

      <CaseStudies />


      {/* =========================================
          SECTION 6 — PARTNERS
      ========================================= */}

      <Partners />


      {/* =========================================
          SECTION 7 — SERVICES
      ========================================= */}

      <Services />


      {/* =========================================
          SECTION 8 — INDUSTRIES
      ========================================= */}

      <IndustryCoverflow />


      {/* =========================================
          SECTION 9 — BLOGS
      ========================================= */}

      <BlogSection />

    </main>
  );
}