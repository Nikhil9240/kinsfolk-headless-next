import Link from "next/link";
import { fetchFromWordPress } from "@/lib/wordpress";

const GET_SOLUTIONS = `
  query GetSolutions {
    pages(
      where: {
        parent: 0
      }
      first: 100
    ) {
      nodes {
        title
        slug
        uri
        content
      }
    }
  }
`;

export default async function SolutionsPage() {
  const data = await fetchFromWordPress(GET_SOLUTIONS);

  const solutions = data?.pages?.nodes ?? [];

  return (
    <main>
      <h1>Solutions</h1>

      <div>
        {solutions.map((solution: any) => (
          <Link
            key={solution.slug}
            href={`/solutions/${solution.slug}`}
          >
            <h2>{solution.title}</h2>
            <p>
              {solution.content
                ?.replace(/<[^>]*>/g, "")
                .slice(0, 160)}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}