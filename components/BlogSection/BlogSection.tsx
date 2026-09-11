"use client";

import { useRef } from "react";
import "./BlogSection.css";
import type { BlogPost } from "@/lib/blog";

type BlogSectionProps = {
  blogs: BlogPost[];
};

export default function BlogSection({
  blogs,
}: BlogSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <section className="blog-section">

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
            <span>→</span>
          </a>

        </div>

        {/* =====================================================
            ARROWS
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

        {blogs.map((blog) => (

          <article
            className="blog-card"
            key={blog.id}
          >

            <a
              href={`/blog/${blog.slug}`}
              className="blog-card-link"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="blog-image-wrap">

                {blog.featuredImage ? (
                  <img
                    src={blog.featuredImage.sourceUrl}
                    alt={
                      blog.featuredImage.altText ||
                      blog.title
                    }
                    className="blog-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="blog-image-placeholder">
                    <span>Blog</span>
                  </div>
                )}

                <div className="blog-image-overlay" />

                <span className="blog-category">
                  Insights
                </span>

              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="blog-content">

                <span className="blog-read">
                  READ ARTICLE
                </span>

                <h3>
                  {blog.title}
                </h3>

                <span className="blog-explore">
                  Explore
                  <strong>→</strong>
                </span>

              </div>

            </a>

          </article>

        ))}

      </div>

    </section>
  );
}