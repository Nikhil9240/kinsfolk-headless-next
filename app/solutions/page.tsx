import Link from "next/link";
import { solutions } from "@/lib/solutions";

export default function SolutionsPage() {
  return (
    <main>
      <h1>Solutions</h1>

      <div>
        {solutions.map((solution) => (
          <Link
            key={solution.slug}
            href={`/solutions/${solution.slug}`}
          >
            <h2>{solution.title}</h2>
            <p>{solution.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}