import { notFound } from "next/navigation";
import { solutions } from "@/lib/solutions";

type Props = {
  params: Promise<{
    slug: string;
    oem: string;
  }>;
};

export default async function OEMPage({ params }: Props) {
  const { slug, oem } = await params;

  const solution = solutions.find(
    (item) => item.slug === slug
  );

  if (!solution) {
    notFound();
  }

  const partner = solution.oems?.find(
    (item) => item.slug === oem
  );

  if (!partner) {
    notFound();
  }

  return (
    <main>
      <h1>{partner.name}</h1>

      <p>
        {partner.name} solution for{" "}
        {solution.title}
      </p>
    </main>
  );
}