const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function fetchFromWordPress(
  query: string,
  variables: Record<string, unknown> = {}
) {
  if (!WORDPRESS_API_URL) {
    throw new Error(
      "NEXT_PUBLIC_WORDPRESS_API_URL is not configured"
    );
  }

  const response = await fetch(
    WORDPRESS_API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `WordPress API error: ${response.status}`
    );
  }

  const result = await response.json();

  if (result.errors) {
    console.error(
      "WordPress GraphQL errors:",
      result.errors
    );

    throw new Error(
      "WordPress GraphQL request failed"
    );
  }

  return result.data;
}