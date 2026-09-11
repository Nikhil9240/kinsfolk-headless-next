import { fetchFromWordPress } from "@/lib/wordpress";

/* ============================================================
   INDUSTRY TYPE
   ------------------------------------------------------------
   Industry-specific content + visual type इथे define होतो.
============================================================ */

export type Industry = {
  slug: string;
  name: string;

  // Hero
  heroTitle: string;
  heroDescription: string;

  // Intro
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  introDescription2: string;

  // Intro highlights
  highlights: string[];

  // CSS visual type
  visualType:
    | "banking"
    | "fintech"
    | "manufacturing"
    | "pharmaceutical"
    | "telecommunications"
    | "it-services";
};


/* ============================================================
   INDUSTRY CONTENT
   ------------------------------------------------------------
   IMPORTANT:
   Industry page चा actual content इथून control होतो.

   WordPress मध्ये content change करण्याची गरज नाही.

   visualType फक्त page वर कोणता CSS visual दिसेल
   ते ठरवतो.

   कोणतीही image वापरलेली नाही.
============================================================ */

const industryContent: Record<
  string,
  Omit<Industry, "slug" | "name">
> = {

  /* ==========================================================
     BANKING
  ========================================================== */

  "banking-and-financial": {
    heroTitle: "Banking & Financial Services",

    heroDescription:
      "Secure. Scalable. Service-Driven IT for Modern Banking.",

    introEyebrow: "DIGITAL EXCELLENCE",

    introTitle:
      "Technology that moves banking and financial services forward.",

    introDescription:
      "Financial institutions operate in a highly regulated and increasingly digital environment where security, reliability and customer experience are critical.",

    introDescription2:
      "Kinsfolk helps banking and financial organizations modernize IT operations, improve service reliability, strengthen security and accelerate digital transformation.",

    highlights: [
      "Smarter Banking Operations",
      "Secure & Resilient Infrastructure",
      "AI-led Digital Transformation",
    ],

    visualType: "banking",
  },


  /* ==========================================================
     FINTECH
  ========================================================== */

  "financial-technology": {
    heroTitle: "Financial Technology",

    heroDescription:
      "Accelerate innovation, strengthen resilience and deliver better digital experiences.",

    introEyebrow: "DIGITAL EXCELLENCE",

    introTitle:
      "Technology built for the future of FinTech.",

    introDescription:
      "FinTech organizations need to innovate quickly while maintaining security, reliability and customer trust across every digital interaction.",

    introDescription2:
      "Kinsfolk enables FinTech businesses to build intelligent operations, automate critical processes and create scalable technology foundations.",

    highlights: [
      "Intelligent FinTech Operations",
      "Secure Digital Platforms",
      "AI-powered Innovation",
    ],

    visualType: "fintech",
  },


  /* ==========================================================
     MANUFACTURING
  ========================================================== */

  manufacturing: {
    heroTitle: "Manufacturing",

    heroDescription:
      "Connected. Intelligent. Resilient IT for modern manufacturing.",

    introEyebrow: "DIGITAL EXCELLENCE",

    introTitle:
      "Smarter technology for modern manufacturing.",

    introDescription:
      "Manufacturing organizations depend on reliable technology, connected operations and real-time visibility to maintain productivity and competitiveness.",

    introDescription2:
      "Kinsfolk helps manufacturers modernize IT environments, improve operational visibility and automate workflows across the enterprise.",

    highlights: [
      "Connected Operations",
      "Real-time Visibility",
      "Intelligent Automation",
    ],

    visualType: "manufacturing",
  },


  /* ==========================================================
     PHARMACEUTICAL
  ========================================================== */

  pharmaceutical: {
    heroTitle: "Pharmaceutical",

    heroDescription:
      "Secure, compliant and intelligent IT for the pharmaceutical industry.",

    introEyebrow: "DIGITAL EXCELLENCE",

    introTitle:
      "Technology designed for modern pharmaceutical operations.",

    introDescription:
      "Pharmaceutical organizations require secure, reliable and compliant technology to support complex operations and critical business processes.",

    introDescription2:
      "Kinsfolk helps pharmaceutical enterprises strengthen IT resilience, improve visibility and adopt intelligent automation across their digital ecosystem.",

    highlights: [
      "Secure & Compliant Operations",
      "Resilient IT Infrastructure",
      "Intelligent Process Automation",
    ],

    visualType: "pharmaceutical",
  },


  /* ==========================================================
     TELECOMMUNICATIONS
  ========================================================== */

  telecommunications: {
    heroTitle: "Telecommunications",

    heroDescription:
      "High-availability IT operations for always-on networks.",

    introEyebrow: "DIGITAL EXCELLENCE",

    introTitle:
      "Always-on technology for always-on connectivity.",

    introDescription:
      "Telecommunications providers operate complex environments where availability, performance and customer experience directly impact business outcomes.",

    introDescription2:
      "Kinsfolk helps telecom organizations gain real-time visibility, automate operations and build highly resilient technology environments.",

    highlights: [
      "Always-on Operations",
      "Full-stack Observability",
      "AI-driven Network Intelligence",
    ],

    visualType: "telecommunications",
  },


  /* ==========================================================
     IT ENABLED SERVICES
  ========================================================== */

  "it-enabled-services": {
    heroTitle: "IT-Enabled Services",

    heroDescription:
      "Intelligent, scalable IT operations for high-performing service organizations.",

    introEyebrow: "DIGITAL EXCELLENCE",

    introTitle:
      "Technology that powers modern service delivery.",

    introDescription:
      "IT-enabled service organizations need reliable digital infrastructure, efficient workflows and intelligent operations to deliver consistent customer experiences.",

    introDescription2:
      "Kinsfolk helps service organizations simplify IT operations, automate repetitive processes and improve service performance through AI-led solutions.",

    highlights: [
      "Efficient Service Operations",
      "Intelligent Automation",
      "Better Customer Experiences",
    ],

    visualType: "it-services",
  },
};


/* ============================================================
   WORDPRESS QUERY
   ------------------------------------------------------------
   WordPress फक्त page exist आहे का ते verify करतो.

   Actual industry content वरून घेतला जात नाही.
============================================================ */

const GET_INDUSTRY_BY_URI = `
  query GetIndustryByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      slug
      uri
    }
  }
`;


/* ============================================================
   GET INDUSTRY
============================================================ */

export async function getIndustry(
  slug: string
): Promise<Industry | undefined> {

  // WordPress page URI तयार करतो.
  const uri = `/industries/${slug}/`;

  // WordPress page check.
  const data = await fetchFromWordPress(
    GET_INDUSTRY_BY_URI,
    { uri }
  );

  const page = data?.page;

  // WordPress मध्ये page नाही.
  if (!page) {
    return undefined;
  }

  // industries.ts मध्ये content नाही.
  const customContent = industryContent[slug];

  if (!customContent) {
    return undefined;
  }

  // WordPress identity + local content combine.
  return {
    slug: page.slug,
    name: page.title,
    ...customContent,
  };
}