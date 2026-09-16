/* =========================================================
   SERVICES PAGE DATA
========================================================= */

export type ServiceItem = {
  slug: string;
  number: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type WhyKinsfolkItem = {
  number: string;
  title: string;
  description: string;
};

export const servicesPageData = {
  /* =======================================================
     HERO
  ======================================================= */

  hero: {
    eyebrow: "SERVICES",

    title:
      "Technology-led services built for the way your business works.",

    description:
      "We combine advisory expertise, implementation capabilities, modernization, managed services, and custom engineering to help organizations simplify IT and accelerate digital transformation.",

    primaryCta: {
      label: "Explore Services",
      href: "#all-services",
    },

    secondaryCta: {
      label: "Talk to Our Experts",
      href: "/contact",
    },
  },

  /* =======================================================
     TRUSTED TECHNOLOGY
  ======================================================= */

  trust: {
    eyebrow: "TRUSTED TECHNOLOGY ECOSYSTEM",

    title: "Technology expertise backed by leading platforms.",

    description:
      "We work across enterprise platforms and technologies to help organizations modernize, integrate, automate, and operate with confidence.",

    logos: [
      {
        name: "BMC",
        image: "/images/trust/bmc.webp",
      },
      {
        name: "ServiceNow",
        image: "/images/trust/servicenow.webp",
      },
      {
        name: "AWS",
        image: "/images/trust/aws.webp",
      },
      {
        name: "Red Hat",
        image: "/images/trust/redhat.webp",
      },
      {
        name: "AutomationEdge",
        image: "/images/trust/automationedge.webp",
      },
      {
        name: "Dynatrace",
        image: "/images/trust/dynatrace.webp",
      },
    ],
  },

  /* =======================================================
     SERVICES
  ======================================================= */

  services: [
    {
      number: "01",
      slug: "advisory-services",
      title: "Advisory Services",
      description:
        "Expert guidance to assess your current environment, define transformation priorities, and build a practical technology roadmap aligned to business goals.",
      image: "/images/services/advisory.png",
      href: "/services/advisory-services",
    },

    {
      number: "02",
      slug: "implementation-and-integrations",
      title: "Implementation & Integration",
      description:
        "End-to-end deployment and integration of enterprise technologies with a focus on accuracy, speed, scalability, and seamless adoption.",
      image: "/images/services/implementation.png",
      href: "/services/implementation-and-integrations",
    },

    {
      number: "03",
      slug: "migration-and-upgrade",
      title: "Migration & Upgrade",
      description:
        "Securely transition platforms, applications, and data to modern environments while minimizing disruption and protecting business continuity.",
      image: "/images/services/migration-upgrade.png",
      href: "/services/migration-and-upgrade",
    },

    {
      number: "04",
      slug: "managed-services",
      title: "Managed Services",
      description:
        "Proactive monitoring, support, optimization, and operational management that keeps your technology environment stable, secure, and performing.",
      image: "/images/services/managed-services.png",
      href: "/services/managed-services",
    },

    {
      number: "05",
      slug: "custom-development-services",
      title: "Custom Development",
      description:
        "Purpose-built applications, integrations, and digital experiences engineered around your unique business requirements and technology ecosystem.",
      image: "/images/services/custom-development.png",
      href: "/services/custom-development-services",
    },

    {
      number: "06",
      slug: "resource-augmentation",
      title: "Resource Augmentation",
      description:
        "Access experienced technology professionals on a flexible model to strengthen delivery teams, accelerate projects, and meet changing business demands.",
      image: "/images/services/resource-augmentation.png",
      href: "/services/resource-augmentation",
    },
  ] satisfies ServiceItem[],

  /* =======================================================
     WHY KINSFOLK
  ======================================================= */

  whyKinsfolk: {
    eyebrow: "WHY KINSFOLK",

    title:
      "Technology expertise that delivers lasting business value.",

    description:
      "Our experienced teams combine certified expertise, business-focused consulting, scalable architecture, seamless integrations, and dependable support to help organizations achieve better technology outcomes.",

    items: [
      {
        number: "01",
        title: "Certified Resources",
        description:
          "Our team consists of certified consultants with hands-on experience across ITSM, ITOM, and Cloud platforms ensuring best practice implementations from day one.",
      },

      {
        number: "02",
        title: "ROI-Driven Consulting",
        description:
          "We focus on measurable business outcomes—helping you optimize licensing, reduce operational overhead, and maximize return on your investments.",
      },

      {
        number: "03",
        title: "Scalable, Future-Ready Design",
        description:
          "Our solutions are architected for growth, enabling seamless scaling, cloud readiness, and long-term adaptability as your business evolves.",
      },

      {
        number: "04",
        title: "Seamless Integrations",
        description:
          "Reducing manual workload and improving service response through connected platforms, applications, and automated workflows.",
      },

      {
        number: "05",
        title: "Proven Expertise",
        description:
          "Helping businesses reduce costs, improve productivity, and accelerate service transformation through proven technology expertise.",
      },

      {
        number: "06",
        title: "24×7 Support",
        description:
          "Our 24×7 global support team helps maintain operational continuity, resolve issues quickly, and keep critical technology environments performing reliably.",
      },
    ] satisfies WhyKinsfolkItem[],
  },

  /* =======================================================
     SOLUTIONS
  ======================================================= */

  solutions: {
    eyebrow: "OUR SOLUTIONS",

    title:
      "Solutions that turn technology complexity into business value.",

    description:
      "From AI-led operations and automation to observability, security, data, and modernization, our solutions are designed around measurable business outcomes.",

    ctaLabel: "Explore Solutions",

    ctaHref: "/solutions",
  },

  /* =======================================================
     FINAL CTA
  ======================================================= */

  cta: {
    eyebrow: "LET'S BUILD WHAT'S NEXT",

    title: "Ready to transform your IT operations?",

    description:
      "Talk to our experts about your technology challenges, transformation goals, and the right path forward.",

    buttonLabel: "Talk to Our Experts",

    buttonHref: "/contact",
  },
};