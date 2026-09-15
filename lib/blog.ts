import { fetchFromWordPress } from "./wordpress";

/* =========================================================
   BLOG POST TYPE
   ---------------------------------------------------------
   WordPress GraphQL मधून blog post ची complete information
   frontend साठी या type मध्ये define केली आहे.
========================================================= */

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;

  // Full blog article content
  content?: string;

  // Featured image
  featuredImage: {
    sourceUrl: string;
    altText: string;
  } | null;
};

/* =========================================================
   WORDPRESS BLOG LIST QUERY
   ---------------------------------------------------------
   Blog listing / homepage / BlogSection साठी posts fetch
   करतो.
========================================================= */

const GET_BLOG_POSTS = `
  query GetBlogPosts($first: Int!) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
        date
        excerpt

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/* =========================================================
   GET BLOG POSTS
   ---------------------------------------------------------
   WordPress response मधील featuredImage.node ला frontend
   friendly featuredImage object मध्ये normalize करतो.
========================================================= */

export async function getBlogPosts(
  first = 10
): Promise<BlogPost[]> {
  const data = await fetchFromWordPress(
    GET_BLOG_POSTS,
    { first }
  );

  /* -------------------------------------------------------
     WordPress कडून posts मिळाले नाहीत तर empty array.
  ------------------------------------------------------- */

  const posts = data?.posts?.nodes ?? [];

  /* -------------------------------------------------------
     WordPress GraphQL response normalize करतो.
  ------------------------------------------------------- */

  return posts.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt,

    featuredImage: post.featuredImage?.node
      ? {
          sourceUrl:
            post.featuredImage.node.sourceUrl ?? "",

          altText:
            post.featuredImage.node.altText ?? "",
        }
      : null,
  }));
}

/* =========================================================
   SINGLE BLOG QUERY
   ---------------------------------------------------------
   /blog/[slug] page साठी specific WordPress post fetch
   करतो.

   Example:
   /blog/enhancing-customer-service-speed-and-consistency-with-real-time-ai

   इथे slug WordPress मधून match केला जातो.
========================================================= */

const GET_BLOG_POST_BY_SLUG = `
  query GetBlogPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      excerpt
      content

      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

/* =========================================================
   GET SINGLE BLOG POST
   ---------------------------------------------------------
   WordPress मधून slug वापरून एक specific blog post fetch
   करतो.

   Return:
   - Blog post सापडला → BlogPost
   - Blog post सापडला नाही → null
========================================================= */

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  /* -------------------------------------------------------
     Empty slug असल्यास unnecessary WordPress request
     करण्याची गरज नाही.
  ------------------------------------------------------- */

  if (!slug) {
    return null;
  }

  /* -------------------------------------------------------
     WordPress GraphQL request.
  ------------------------------------------------------- */

  const data = await fetchFromWordPress(
    GET_BLOG_POST_BY_SLUG,
    { slug }
  );

  /* -------------------------------------------------------
     Post मिळाला नाही तर null return.
  ------------------------------------------------------- */

  const post = data?.post;

  if (!post) {
    return null;
  }

  /* -------------------------------------------------------
     WordPress featuredImage.node response normalize करून
     frontend साठी simple object तयार करतो.
  ------------------------------------------------------- */

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",

    featuredImage: post.featuredImage?.node
      ? {
          sourceUrl:
            post.featuredImage.node.sourceUrl ?? "",

          altText:
            post.featuredImage.node.altText ?? "",
        }
      : null,
  };
}