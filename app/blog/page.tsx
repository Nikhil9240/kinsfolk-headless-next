import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import "./blog.css";

/* =========================================================
   BLOG PAGE
   ---------------------------------------------------------
   WordPress is the source of truth for blog posts.

   This page contains:
   - Blog hero
   - Latest published blogs slider
   - Latest 2 blog cards
   - All blog cards
   - Newsletter CTA

   Categories are intentionally NOT used.
========================================================= */

export default async function BlogPage() {
  /* =========================================================
     FETCH BLOG POSTS
     ---------------------------------------------------------
     getBlogPosts() fetches published posts from WordPress.
  ========================================================= */

  const blogs = await getBlogPosts(20);

  /* =========================================================
     LATEST BLOGS
     ---------------------------------------------------------
     First 3 published posts are used for the featured slider.
  ========================================================= */

  const latestBlogs = blogs.slice(0, 3);

  /* =========================================================
     LATEST TWO BLOGS
     ---------------------------------------------------------
     The first two posts are displayed as larger cards.
  ========================================================= */

  const latestTwoBlogs = blogs.slice(0, 2);

  /* =========================================================
     ALL BLOGS
     ---------------------------------------------------------
     Remaining posts are displayed in the blog grid.

     The first two are excluded because they are already shown
     in the Latest section.
  ========================================================= */

  const remainingBlogs = blogs.slice(2);

  return (
    <main className="blog-page">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="blog-hero">
        <div className="blog-hero-inner">

          <div className="blog-hero-content">

            <span className="blog-eyebrow">
              Blogs
            </span>

            <h1>
              Insights & Perspectives </h1>

            <p>
              Explore perspectives, ideas and practical insights
              shaping the future of intelligent technology,
              digital operations and enterprise transformation.
            </p>

          </div>

          {/* =================================================
              HERO VISUAL
          ================================================= */}

          <div className="blog-hero-visual">
            <div className="blog-hero-orbit blog-hero-orbit-one" />
            <div className="blog-hero-orbit blog-hero-orbit-two" />
            <div className="blog-hero-orbit blog-hero-orbit-three" />

            <div className="blog-hero-core">
              <span>INSIGHTS</span>
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          LATEST BLOG SLIDER
      ===================================================== */}

      {latestBlogs.length > 0 && (
        <section className="blog-latest-section">

          <div className="blog-container">

            {/* -----------------------------------------------
                SECTION HEADER
            ------------------------------------------------ */}

            <div className="blog-section-header">

              <div>
                <span className="blog-section-eyebrow">
                  LATEST
                </span>

                <h2>
                  What&apos;s happening now
                </h2>
              </div>

              <Link
                href="#all-blogs"
                className="blog-section-link"
              >
                VIEW ALL
                <span aria-hidden="true">→</span>
              </Link>

            </div>


            {/* -----------------------------------------------
                LATEST BLOG SLIDER
                ------------------------------------------------
                CSS scroll-snap provides smooth horizontal
                scrolling on desktop, tablet and mobile.
            ------------------------------------------------ */}

            <div className="blog-latest-slider">

              {latestBlogs.map((blog) => {

                const imageUrl =
                  blog.featuredImage?.sourceUrl || "";

                return (
                  <article
                    className="blog-featured-card"
                    key={blog.id}
                  >

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="blog-featured-link"
                    >

                      {/* =====================================
                          FEATURED IMAGE
                      ===================================== */}

                      <div className="blog-featured-image">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              blog.featuredImage?.altText ||
                              blog.title
                            }
                          />
                        ) : (
                          <div className="blog-no-image">
                            <span>INSIGHTS</span>
                          </div>
                        )}

                        <div className="blog-image-overlay" />

                        <span className="blog-featured-number">
                          LATEST
                        </span>

                      </div>


                      {/* =====================================
                          FEATURED CONTENT
                      ===================================== */}

                      <div className="blog-featured-content">

                        <span className="blog-date">
                          {formatBlogDate(blog.date)}
                        </span>

                        <h3>
                          {blog.title}
                        </h3>

                        <span className="blog-read-link">
                          READ ARTICLE
                          <strong aria-hidden="true">
                            →
                          </strong>
                        </span>

                      </div>

                    </Link>

                  </article>
                );
              })}

            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          LATEST TWO BLOGS
      ===================================================== */}

      {latestTwoBlogs.length > 0 && (
        <section className="blog-highlight-section">

          <div className="blog-container">

            <div className="blog-section-header">

              <div>
                <span className="blog-section-eyebrow">
                  FEATURED INSIGHTS
                </span>

                <h2>
                  Fresh perspectives
                </h2>
              </div>

            </div>


            <div className="blog-highlight-grid">

              {latestTwoBlogs.map((blog, index) => {

                const imageUrl =
                  blog.featuredImage?.sourceUrl || "";

                return (
                  <article
                    className={`blog-highlight-card ${
                      index === 0
                        ? "blog-highlight-large"
                        : ""
                    }`}
                    key={blog.id}
                  >

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="blog-highlight-link"
                    >

                      {/* ===================================
                          IMAGE
                      =================================== */}

                      <div className="blog-highlight-image">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              blog.featuredImage?.altText ||
                              blog.title
                            }
                          />
                        ) : (
                          <div className="blog-no-image">
                            <span>INSIGHTS</span>
                          </div>
                        )}

                        <div className="blog-image-overlay" />

                      </div>


                      {/* ===================================
                          CONTENT
                      =================================== */}

                      <div className="blog-highlight-content">

                        <span className="blog-date">
                          {formatBlogDate(blog.date)}
                        </span>

                        <h3>
                          {blog.title}
                        </h3>

                        {blog.excerpt && (
                          <div
                            className="blog-excerpt"
                            dangerouslySetInnerHTML={{
                              __html: blog.excerpt,
                            }}
                          />
                        )}

                        <span className="blog-read-link">
                          READ ARTICLE
                          <strong aria-hidden="true">
                            →
                          </strong>
                        </span>

                      </div>

                    </Link>

                  </article>
                );
              })}

            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          ALL BLOGS
      ===================================================== */}

      <section
        className="blog-all-section"
        id="all-blogs"
      >

        <div className="blog-container">

          {/* -----------------------------------------------
              SECTION HEADER
          ------------------------------------------------ */}

          <div className="blog-section-header">

            <div>
              <span className="blog-section-eyebrow">
                EXPLORE
              </span>

              <h2>
                All insights
              </h2>
            </div>

            <span className="blog-count">
              {blogs.length} ARTICLES
            </span>

          </div>


          {/* -----------------------------------------------
              BLOG GRID
          ------------------------------------------------ */}

          {remainingBlogs.length > 0 ? (
            <div className="blog-grid">

              {remainingBlogs.map((blog) => {

                const imageUrl =
                  blog.featuredImage?.sourceUrl || "";

                return (
                  <article
                    className="blog-card"
                    key={blog.id}
                  >

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="blog-card-link"
                    >

                      {/* =================================
                          CARD IMAGE
                      ================================= */}

                      <div className="blog-card-image">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              blog.featuredImage?.altText ||
                              blog.title
                            }
                            loading="lazy"
                          />
                        ) : (
                          <div className="blog-no-image">
                            <span>INSIGHTS</span>
                          </div>
                        )}

                        <div className="blog-image-overlay" />

                      </div>


                      {/* =================================
                          CARD CONTENT
                      ================================= */}

                      <div className="blog-card-content">

                        <span className="blog-date">
                          {formatBlogDate(blog.date)}
                        </span>

                        <h3>
                          {blog.title}
                        </h3>

                        {blog.excerpt && (
                          <div
                            className="blog-excerpt"
                            dangerouslySetInnerHTML={{
                              __html: blog.excerpt,
                            }}
                          />
                        )}

                        <span className="blog-read-link">
                          READ ARTICLE
                          <strong aria-hidden="true">
                            →
                          </strong>
                        </span>

                      </div>

                    </Link>

                  </article>
                );
              })}

            </div>
          ) : (
            /* ---------------------------------------------
               EMPTY STATE
            --------------------------------------------- */

            <div className="blog-empty">
              <span>
                No additional blog posts available.
              </span>
            </div>
          )}

        </div>
      </section>


      {/* =====================================================
          NEWSLETTER CTA
      ===================================================== */}

      <section className="blog-newsletter">

        <div className="blog-container">

          <div className="blog-newsletter-inner">

            <div className="blog-newsletter-content">

              <span className="blog-section-eyebrow">
                STAY AHEAD
              </span>

              <h2>
                Fresh thinking.
                <br />
                Delivered to you.
              </h2>

              <p>
                Stay informed with the latest perspectives
                on AI, automation, digital operations and
                enterprise technology.
              </p>

            </div>

            <Link
              href="/contact"
              className="blog-newsletter-button"
            >
              LET&apos;S TALK
              <span aria-hidden="true">→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   BLOG DATE FORMATTER
   ---------------------------------------------------------
   WordPress ISO date ला readable format मध्ये convert करतो.
========================================================= */

function formatBlogDate(date: string): string {
  if (!date) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "";
  }
}