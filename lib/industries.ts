export type Industry = {
  slug: string;
  name: string;
  heroTitle: string;
  heroDescription: string;
};

export const industries: Industry[] = [
  {
    slug: "banking-financial-services",
    name: "Banking & Financial Services",
    heroTitle: "Banking & Financial Services",
    heroDescription:
      "Secure. Scalable. Service-Driven IT for Modern Banking.",
  },

  {
    slug: "fintech",
    name: "Financial Technology",
    heroTitle: "Financial Technology",
    heroDescription:
      "Unlock growth, strengthen resilience, and earn customer trust with AI-powered AI Ops.",
  },

  {
    slug: "manufacturing",
    name: "Manufacturing",
    heroTitle: "Manufacturing",
    heroDescription:
      "Secure. Scalable. Service-Driven IT for Modern Banking.",
  },

  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    heroTitle: "Pharmaceutical",
    heroDescription:
      "Secure. Scalable. Service-Driven IT for Modern Banking.",
  },

  {
    slug: "telecommunications",
    name: "Telecommunications",
    heroTitle: "Telecommunications",
    heroDescription:
      "High-Availability IT Operations for Always-On Networks.",
  },

  {
    slug: "it-enabled-services",
    name: "IT-Enabled Services",
    heroTitle: "IT-Enabled Services",
    heroDescription:
      "High-Availability IT Operations for Always-On Networks.",
  },
];

/**
 * Returns the industry data for the requested dynamic slug.
 *
 * Example:
 * /industries/fintech
 * → getIndustry("fintech")
 */
export function getIndustry(
  slug: string
): Industry | undefined {
  return industries.find(
    (industry) => industry.slug === slug
  );
}