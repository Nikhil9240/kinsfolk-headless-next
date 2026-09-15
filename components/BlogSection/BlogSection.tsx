"use client";

import { useRef } from "react";
import "./BlogSection.css";
import type { BlogPost } from "@/lib/blog";

type BlogSectionProps = {
  blogs: BlogPost[];
};

/* =========================================================
   WORDPRESS IMAGE URL
   ---------------------------------------------------------
   WordPress featured image कधी कधी localhost URL देऊ शकतो.

   Example:
   http://localhost/headless-wp/wp-content/uploads/...

   Frontend दुसऱ्या host वर चालत असेल तर image URL normalize
   करण्यासाठी हा helper वापरला आहे.
========================================================= */

function getImageUrl(sourceUrl: string): string {
  if (!sourceUrl) {
    return "";
  }

  try {
    const url = new URL(sourceUrl);

    /* -------------------------------------------------------
       Local WordPress URL
       -------------------------------------------------------
       Local development मध्ये WordPress:
       http://localhost/headless-wp/

       असल्यास browser ला WordPress च्या actual origin वरून
       image load करण्यासाठी path preserve केला जातो.
    ------------------------------------------------------- */

    if (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1"
    ) {
      return `${url.origin}${url.pathname}${url.search}`;
    }

    return sourceUrl;
  } catch {
    /* -------------------------------------------------------
       Invalid URL असल्यास original value return करतो.
    ------------------------------------------------------- */

    return sourceUrl;
  }
}

export default function BlogSection({
  blogs,
}: BlogSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     BLOG SLIDER - NEXT
     ---------------------------------------------------------
     पुढील blog cards कडे smooth scroll करतो.
  ========================================================= */

  const scrollNext = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  /* =========================================================
     BLOG SLIDER - PREVIOUS
     ---------------------------------------------------------
     मागील blog cards कडे smooth scroll करतो.
  ========================================================= */

  const scrollPrev = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DEBUG BLOG DATA
     ---------------------------------------------------------
     WordPress कडून featuredImage येत आहे का हे browser
     console मध्ये verify करण्यासाठी.
  ========================================================= */

  console.log("BLOG DATA:", blogs);

  return (
    <section
      className="blog-section"
      aria-label="Insights & Perspectives"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="blog-header">
        <div className="blog-heading-wrap">
          <h2 className="blog-title">
            Insights & Perspectives
          </h2>

          <a
            href="/blog"
            className="blog-view-all"
          >
            VIEW ALL
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* =====================================================
            SLIDER CONTROLS
        ===================================================== */}

        <div className="blog-controls">
          <button
            type="button"
            className="blog-arrow"
            onClick={scrollPrev}
            aria-label="Previous blogs"
          >
            ←
          </button>

          <button
            type="button"
            className="blog-arrow"
            onClick={scrollNext}
            aria-label="Next blogs"
          >
            →
          </button>
        </div>
      </div>

      {/* =====================================================
          BLOG SLIDER
      ===================================================== */}

      <div
        ref={sliderRef}
        className="blog-slider"
      >
        {/* -----------------------------------------------------
            EMPTY STATE
            -----------------------------------------------------
            WordPress मधून कोणतेही posts आले नाहीत तर blank
            section ठेवण्याऐवजी message दाखवतो.
        ----------------------------------------------------- */}

        {blogs.length === 0 ? (
          <div className="blog-empty">
            <span>No blog posts available.</span>
          </div>
        ) : (
          blogs.map((blog) => {
            /* -------------------------------------------------
               FEATURED IMAGE URL
               ------------------------------------------------- */

            const imageUrl = blog.featuredImage?.sourceUrl
              ? getImageUrl(
                  blog.featuredImage.sourceUrl
                )
              : "";

            return (
              <article
                className="blog-card"
                key={blog.id}
              >
                <a
                  href={`/blog/${blog.slug}`}
                  className="blog-card-link"
                >
                  {/* =============================================
                      FEATURED IMAGE
                  ============================================= */}

                  <div className="blog-image-wrap">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={
                          blog.featuredImage?.altText ||
                          blog.title
                        }
                        className="blog-image"
                        loading="lazy"
                        onError={(event) => {
                          /* ---------------------------------------
                             Image load failed असल्यास broken image
                             icon न दाखवता placeholder दाखवतो.
                          --------------------------------------- */

                          event.currentTarget.style.display =
                            "none";

                          const parent =
                            event.currentTarget.parentElement;

                          if (parent) {
                            parent.classList.add(
                              "blog-image-error"
                            );
                          }
                        }}
                      />
                    ) : (
                      /* -------------------------------------------
                         NO FEATURED IMAGE
                         ------------------------------------------- */

                      <div className="blog-image-placeholder">
                        <span>Blog</span>
                      </div>
                    )}

                    {/* ---------------------------------------------
                        IMAGE OVERLAY
                    --------------------------------------------- */}

                    <div className="blog-image-overlay" />

                    {/* ---------------------------------------------
                        BLOG CATEGORY
                    --------------------------------------------- */}

                    <span className="blog-category">
                      Insights
                    </span>
                  </div>

                  {/* =============================================
                      BLOG CONTENT
                  ============================================= */}

                  <div className="blog-content">
                    <span className="blog-read">
                      READ ARTICLE
                    </span>

                    <h3>{blog.title}</h3>

                    <span className="blog-explore">
                      Explore
                      <strong aria-hidden="true">
                        →
                      </strong>
                    </span>
                  </div>
                </a>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}