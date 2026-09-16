import Link from "next/link";
import Image from "next/image";

import { getBlogPosts } from "@/lib/blog";
import { servicesPageData } from "@/lib/services";

import "./services.css";

export default async function ServicesPage() {
  const {
    hero,
    trust,
    services,
    solutions,
    whyKinsfolk,
    cta,
  } = servicesPageData;

  const blogs = await getBlogPosts();

  return (
    <main className="servicesPage">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="servicesHero">

        <div className="servicesContainer heroGrid">

          <div className="heroContent">

            <span className="eyebrow">
              <span className="eyebrowDot" />
              {hero.eyebrow}
            </span>

            <h1>
              {hero.title}
            </h1>

            <p>
              {hero.description}
            </p>

            <div className="heroActions">

              <Link
                href={hero.primaryCta.href}
                className="primaryButton"
              >
                {hero.primaryCta.label}
                <span>→</span>
              </Link>

              <Link
                href={hero.secondaryCta.href}
                className="secondaryButton"
              >
                {hero.secondaryCta.label}
                <span>↗</span>
              </Link>

            </div>

          </div>


          <div className="heroVisual">

            <div className="heroOrb heroOrbOne" />
            <div className="heroOrb heroOrbTwo" />

            <div className="heroMainCard">

              <div className="heroCardTop">
                <span>01</span>
                <span>●</span>
              </div>

              <div className="heroCardIcon">
                ✦
              </div>

              <h3>
                Transform
              </h3>

              <p>
                Modernize your technology ecosystem.
              </p>

            </div>

            <div className="heroMiniCard heroMiniOne">
              <span>02</span>
              <strong>Integrate</strong>
            </div>

            <div className="heroMiniCard heroMiniTwo">
              <span>03</span>
              <strong>Scale</strong>
            </div>

            <div className="heroRing ringOne" />
            <div className="heroRing ringTwo" />

          </div>

        </div>

      </section>


      {/* =====================================================
          TRUSTED TECHNOLOGY
      ===================================================== */}

      <section className="trustSection">

        <div className="servicesContainer">

          <div className="sectionHeading centered">

            <span className="sectionEyebrow">
              {trust.eyebrow}
            </span>

            <h2>
              {trust.title}
            </h2>

            <p>
              {trust.description}
            </p>

          </div>


          <div className="trustLogos">

            {trust.logos.map((logo) => (

              <div
                className="trustLogo"
                key={logo.name}
              >

                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={150}
                  height={70}
                />

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="servicesSection"
        id="all-services"
      >

        <div className="servicesContainer">

          <div className="sectionHeading">

            <span className="sectionEyebrow">
              WHAT WE DO
            </span>

            <h2>
              Services designed around
              <br />
              your business needs.
            </h2>

            <p>
              From strategy and implementation to modernization,
              managed operations, and engineering, our services
              help organizations build, operate, and scale better
              technology environments.
            </p>

          </div>


          <div className="serviceGrid">

            {services.map((service) => (

              <article
                className="serviceCard"
                key={service.slug}
              >

                <div className="serviceCardTop">

                  <span className="serviceNumber">
                    {service.number}
                  </span>

                  <div className="serviceArrow">
                    ↗
                  </div>

                </div>


                <div className="serviceImage">

                  <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={280}
                  />

                </div>


                <div className="serviceCardBody">

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="serviceLink"
                  >
                    Learn More
                    <span>→</span>
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          SOLUTIONS
      ===================================================== */}

      <section className="solutionsSection">

        <div className="servicesContainer">

          <div className="solutionsBox">

            <div className="solutionsContent">

              <span className="sectionEyebrow">
                {solutions.eyebrow}
              </span>

              <h2>
                {solutions.title}
              </h2>

              <p>
                {solutions.description}
              </p>

              <Link
                href={solutions.ctaHref}
                className="primaryButton"
              >
                {solutions.ctaLabel}
                <span>→</span>
              </Link>

            </div>


            <div className="solutionsVisual">

              <div className="solutionCircle circleLarge">
                <span>Technology</span>
              </div>

              <div className="solutionCircle circleMedium">
                <span>Innovation</span>
              </div>

              <div className="solutionCircle circleSmall">
                <span>Value</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY KINSFOLK
      ===================================================== */}

      <section className="whySection">

        <div className="servicesContainer">

          <div className="sectionHeading">

            <span className="sectionEyebrow">
              {whyKinsfolk.eyebrow}
            </span>

            <h2>
              {whyKinsfolk.title}
            </h2>

            <p>
              {whyKinsfolk.description}
            </p>

          </div>


          <div className="whyGrid">

            {whyKinsfolk.items.map((item) => (

              <article
                className="whyCard"
                key={item.number}
              >

                <div className="whyTop">

                  <span className="whyNumber">
                    {item.number}
                  </span>

                  <span className="whyArrow">
                    ↗
                  </span>

                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BLOGS
      ===================================================== */}

      <section className="blogSection">

        <div className="servicesContainer">

          <div className="blogHeader">

            <div>

              <span className="sectionEyebrow">
                INSIGHTS
              </span>

              <h2>
                Latest from Kinsfolk
              </h2>

            </div>

            <Link
              href="/blog"
              className="outlineButton"
            >
              View All Blogs
              <span>→</span>
            </Link>

          </div>


          <div className="blogGrid">

            {blogs?.slice(0, 3).map((blog: any) => (

              <article
                className="blogCard"
                key={blog.id ?? blog.slug}
              >

                {blog.featuredImage?.sourceUrl && (

                  <div className="blogImage">

                    <img
                      src={blog.featuredImage.sourceUrl}
                      alt={
                        blog.featuredImage.altText ||
                        blog.title ||
                        "Blog image"
                      }
                    />

                  </div>

                )}


                <div className="blogBody">

                  <span className="blogDate">
                    {blog.date
                      ? new Date(blog.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : ""}
                  </span>

                  <h3>
                    {blog.title}
                  </h3>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="blogLink"
                  >
                    Read Article
                    <span>→</span>
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="servicesCta">

        <div className="servicesContainer">

          <div className="ctaBox">

            <span className="sectionEyebrow">
              {cta.eyebrow}
            </span>

            <h2>
              {cta.title}
            </h2>

            <p>
              {cta.description}
            </p>

            <Link
              href={cta.buttonHref}
              className="primaryButton ctaButton"
            >
              {cta.buttonLabel}
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}