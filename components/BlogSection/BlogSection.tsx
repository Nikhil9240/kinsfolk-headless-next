"use client";

import { useRef } from "react";
import "./BlogSection.css";
import type { BlogPost } from "@/lib/blog";

type BlogSectionProps = {
  blogs?: BlogPost[] | null;
};

/* =========================================================
   WORDPRESS IMAGE URL
========================================================= */

function getImageUrl(sourceUrl: string): string {
  if (!sourceUrl) {
    return "";
  }

  try {
    const url = new URL(sourceUrl);

    if (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1"
    ) {
      return `${url.origin}${url.pathname}${url.search}`;
    }

    return sourceUrl;
  } catch {
    return sourceUrl;
  }
}

export default function BlogSection({
  blogs,
}: BlogSectionProps) {

  /* =========================================================
     ALWAYS SAFE BLOG ARRAY
  ========================================================= */

  const safeBlogs: BlogPost[] = Array.isArray(blogs)
    ? blogs
    : [];

  const sliderRef = useRef<HTMLDivElement>(null);


  /* =========================================================
     NEXT
  ========================================================= */

  const scrollNext = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left:
        sliderRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };


  /* =========================================================
     PREVIOUS
  ========================================================= */

  const scrollPrev = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left:
        -sliderRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };


  /* =========================================================
     DEBUG
  ========================================================= */

  console.log(
    "BlogSection received blogs:",
    blogs
  );

  console.log(
    "BlogSection safeBlogs:",
    safeBlogs
  );


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
            <span aria-hidden="true">
              →
            </span>
          </a>

        </div>


        {/* ===================================================
            CONTROLS
        =================================================== */}

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

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {safeBlogs.length === 0 ? (

          <div className="blog-empty">
            <span>
              No blog posts available.
            </span>
          </div>

        ) : (

          safeBlogs.map((blog) => {

            /* ===============================================
               IMAGE URL
            =============================================== */

            const imageUrl =
              blog.featuredImage?.sourceUrl
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

                  {/* =========================================
                      IMAGE
                  ========================================= */}

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

                      <div className="blog-image-placeholder">
                        <span>
                          Blog
                        </span>
                      </div>

                    )}


                    {/* IMAGE OVERLAY */}

                    <div className="blog-image-overlay" />


                    {/* CATEGORY */}

                    <span className="blog-category">
                      Insights
                    </span>

                  </div>


                  {/* =========================================
                      CONTENT
                  ========================================= */}

                  <div className="blog-content">

                    <span className="blog-read">
                      READ ARTICLE
                    </span>

                    <h3>
                      {blog.title}
                    </h3>

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