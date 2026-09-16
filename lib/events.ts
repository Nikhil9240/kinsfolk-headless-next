const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;

async function fetchWordPress(query: string) {
  const response = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress data");
  }

  const result = await response.json();

  if (result.errors) {
    console.error("WordPress GraphQL Error:", result.errors);
    throw new Error("WordPress GraphQL request failed");
  }

  return result.data;
}

export async function getUpcomingEvents() {
  const query = `
    query UpcomingEvents {
      posts(
        first: 5
        where: {
          categoryName: "upcoming-events"
        }
      ) {
        nodes {
          id
          title
          slug
          eventDetails {
            eventDate
          }
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

  const data = await fetchWordPress(query);

  return data.posts.nodes;
}

export async function getPastEvents() {
  const query = `
    query PastEvents {
      posts(
        first: 20
        where: {
          categoryName: "past-events"
        }
      ) {
        nodes {
          id
          title
          slug
          eventDetails {
            eventDate
          }
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

  const data = await fetchWordPress(query);

  return data.posts.nodes;
}