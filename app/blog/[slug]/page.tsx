import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";
import styles from "./BlogDetail.module.css";

/* =========================================================
   BLOG DETAIL PAGE
   ---------------------------------------------------------
   WordPress मधून slug वापरून specific blog post fetch
   करतो.

   URL:
   /blog/[slug]

   Example:
   /blog/enhancing-customer-service-speed-and-consistency-with-real-time-ai
========================================================= */

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   BLOG DETAIL PAGE
========================================================= */

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  /* -------------------------------------------------------
     URL मधून blog slug मिळवतो.
  ------------------------------------------------------- */

  const { slug } = await params;

  /* -------------------------------------------------------
     WordPress मधून specific blog fetch करतो.
  ------------------------------------------------------- */

  const blog = await getBlogPostBySlug(slug);

  /* -------------------------------------------------------
     Blog सापडला नाही तर Next.js 404 page दाखवतो.
  ------------------------------------------------------- */

  if (!blog) {
    notFound();
  }

  return (
    <main className={styles.page}>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>

        <div className={styles.heroInner}>

          {/* -------------------------------------------------
              DATE
          ------------------------------------------------- */}

          <time
            className={styles.date}
            dateTime={blog.date}
          >
            {new Date(blog.date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </time>

          {/* -------------------------------------------------
              BLOG TITLE
          ------------------------------------------------- */}

          <h1 className={styles.title}>
            {blog.title}
          </h1>

          {/* -------------------------------------------------
              EXCERPT
          ------------------------------------------------- */}

          {blog.excerpt && (
            <div
              className={styles.excerpt}
              dangerouslySetInnerHTML={{
                __html: blog.excerpt,
              }}
            />
          )}

        </div>

      </section>

      {/* =====================================================
          FEATURED IMAGE
      ===================================================== */}

      {blog.featuredImage?.sourceUrl && (
        <section className={styles.featuredImageSection}>

          <div className={styles.featuredImageWrap}>

            <img
              src={blog.featuredImage.sourceUrl}
              alt={
                blog.featuredImage.altText ||
                blog.title
              }
              className={styles.featuredImage}
            />

          </div>

        </section>
      )}

      {/* =====================================================
          BLOG CONTENT
          -----------------------------------------------------
          WordPress मधून आलेला complete HTML content इथे
          render केला जातो.
      ===================================================== */}

      <section className={styles.contentSection}>

        <article
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: blog.content || "",
          }}
        />

      </section>

    </main>
  );
}