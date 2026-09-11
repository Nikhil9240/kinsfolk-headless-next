import { fetchFromWordPress } from "./wordpress";

/*
 * Blog post data coming from WordPress.
 *
 * WordPress is the source of truth.
 * Next.js only receives and displays the data.
 */
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;

  featuredImage: {
    sourceUrl: string;
    altText: string;
  } | null;
};

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

/*
 * Fetch blog posts from WordPress.
 *
 * Reusable for:
 * - Homepage BlogSection
 * - Industry BlogSection
 * - /blog page
 */
export async function getBlogPosts(
  first = 10
): Promise<BlogPost[]> {
  const data = await fetchFromWordPress(
    GET_BLOG_POSTS,
    { first }
  );

  return data?.posts?.nodes ?? [];
}