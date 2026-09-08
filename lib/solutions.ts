// ============================================================
// Solution Content Data
// ------------------------------------------------------------
// Central data source for all dynamic solution detail pages.
// The [slug] route reads this file and renders the same UI/UX
// with different content for every solution.
// Replace dummy content here later with final website copy.
// ============================================================

export type SolutionOEM = {
  slug: string;
  name: string;
};

export type SolutionProofPoint = {
  number: string;
  text: string;
};

export type SolutionExpertise = {
  number: string;
  name: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
};

export type SolutionOffering = {
  number: string;
  title: string;
  description: string;
};

export type Solution = {
  slug: string;
  title: string;
  description: string;
  heroVisual: string;

  // Hero content
  heroEyebrow: string;
  heroText: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;

  // Solution overview
  overview: {
    label: string;
    title: string;
    lead: string;
    body: string;
  };

  // Four proof/benefit cards
  proofPoints: SolutionProofPoint[];

  // Partner / expertise section
  expertise: {
    label: string;
    title: string;
    intro: string;
    items: SolutionExpertise[];
  };

  // Solution offerings
  offerings: {
    label: string;
    title: string;
    intro: string;
    items: SolutionOffering[];
  };

  // Final CTA
  cta: {
    label: string;
    title: string;
    body: string;
  };

  // Technology ecosystem
  oems: SolutionOEM[];
};

export const solutions: Solution[] = [
  // ==========================================================
  // 01. AGENTIC AI - Page Content 
  // ==========================================================
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    description:
      "Intelligent AI agents designed to transform enterprise operations.",
    heroVisual: "agentic-ai",

    heroEyebrow: "ENTERPRISE Ai SOLUTION",
    heroText:
      "Deploy intelligent AI agents that understand enterprise workflows, automate repetitive tasks, and help teams make faster operational decisions.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEw",
      title: "Intelligent Agents Built for Enterprise Operations.",
      lead:
        "Agentic AI helps enterprises move from assisted workflows to intelligent autonomous operations.",
      body:
        "Our approach combines AI agents, enterprise systems, business rules, and operational data to create intelligent workflows that can reason, act, and continuously improve.",
    },

    proofPoints: [
      {
        number: "01",
        text: "Intelligent agents designed around real enterprise workflows.",
      },
      {
        number: "02",
        text: "Automated decision support across complex operational processes.",
      },
      {
        number: "03",
        text: "Integration with existing enterprise platforms and data.",
      },
      {
        number: "04",
        text: "Scalable architecture designed for secure enterprise adoption.",
      },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "Technology Expertise for Intelligent Operations.",
      intro:
        "Connect AI capabilities with proven enterprise platforms to build practical, scalable automation.",
      items: [
        {
          number: "01",
          name: "Motadata",
          description:
            "Intelligent IT operations and automation capabilities for enterprise environments.",
          image: "/images/parthners/motadata.webp",
          href: "/solutions/agentic-ai/motadata",
          tags: ["AIOps", "Automation", "IT Operations"],
        },
        {
          number: "02",
          name: "ServiceNow",
          description:
            "AI-enabled workflows that connect service operations with intelligent automation.",
          image: "/images/parthners/servicenow.webp",
          href: "/solutions/agentic-ai/servicenow",
          tags: ["ITSM", "Workflow", "AI"],
        },
        {
          number: "03",
          name: "BMC Helix",
          description:
            "Intelligent service management and automation for modern enterprise operations.",
          image: "/images/parthners/bmc-helix.webp",
          href: "/solutions/agentic-ai/bmc-helix",
          tags: ["ITSM", "Automation", "AI"],
        },
      ],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "Agentic AI Capabilities for Modern Enterprises.",
      intro:
        "Build intelligent workflows that reduce operational effort and improve business responsiveness.",
      items: [
        {
          number: "01",
          title: "AI Agent Design",
          description:
            "Design purpose-built AI agents around specific enterprise workflows.",
        },
        {
          number: "02",
          title: "Workflow Automation",
          description:
            "Automate multi-step operational processes using intelligent agents.",
        },
        {
          number: "03",
          title: "Enterprise Integration",
          description:
            "Connect agents with enterprise applications, APIs, and operational data.",
        },
        {
          number: "04",
          title: "Decision Intelligence",
          description:
            "Enable faster decisions through contextual AI-driven insights.",
        },
        {
          number: "05",
          title: "AI Governance",
          description:
            "Create controlled and measurable frameworks for enterprise AI adoption.",
        },
        {
          number: "06",
          title: "Managed AI Operations",
          description:
            "Continuously monitor and optimize intelligent enterprise workflows.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready to bring intelligent agents into your enterprise?",
      body:
        "Start with a focused AI use case and build toward a scalable intelligent operations ecosystem.",
    },

    oems: [
      { slug: "motadata", name: "Motadata" },
      { slug: "servicenow", name: "ServiceNow" },
      { slug: "bmc-helix", name: "BMC Helix" },
    ],
  },

  // ==========================================================
  // 02. GEN AI DRIVEN OPERATIONS - Page Content 
  // ==========================================================
  {
    slug: "gen-ai-driven-operations",
    title: "Gen AI Driven Operations",
    description:
      "Service management that predicts, routes and resolves on its own — across IT, HR, finance and facilities, on the platform you already run.",
    heroVisual: "gen-ai",

    heroEyebrow: "GENERATIVE AI SOLUTION",
    heroText:
      "Turn a decade of tickets, runbooks, logs and legacy code into answers your teams can act on generative AI applied inside the operational workflows you run every day",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Your Operational Data Is Already the Best Training Ground You Have",
      lead:
        "Every enterprise sits on a decade of operational knowledge it cannot use. Ten years of incident tickets nobody has read since they closed. Runbooks written by an engineer who left in 2019. A knowledge base where the top article was last accurate two platform upgrades ago. Six million lines of code that only three people understand. Generative AI is the first technology that can read all of it and give it back to you as something usable.",
      body:
        "Kinsfolk applies generative AI to that estate — not as a chatbot bolted onto a portal, but inside the workflows where operational work actually happens. Engineers get root-cause narratives written while the bridge call is still running. Service desk agents get answers grounded in your own resolved tickets. Knowledge managers get articles that write and refresh themselves. Modernization teams get legacy code explained, documented and test-covered before anyone touches it.",
    },

    proofPoints: [
      { number: "01", text: "Context-aware operational intelligence." },
      { number: "02", text: "Faster information discovery and response." },
      { number: "03", text: "AI-assisted enterprise workflows." },
      { number: "04", text: "Scalable generative AI adoption framework." },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "Generative AI Expertise.",
      intro:
        "Build practical Gen AI experiences that connect enterprise knowledge with daily operations.",
      items: [],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "Gen AI Capabilities for Enterprise Teams.",
      intro:
        "Introduce generative AI across knowledge, service, and operational workflows.",
      items: [
        {
          number: "01",
          title: "Enterprise AI Assistants",
          description: "AI assistants designed around enterprise knowledge and workflows.",
        },
        {
          number: "02",
          title: "Knowledge Intelligence",
          description: "Turn enterprise information into accessible, contextual insights.",
        },
        {
          number: "03",
          title: "AI Workflow Support",
          description: "Use Gen AI to accelerate repetitive operational activities.",
        },
        {
          number: "04",
          title: "Intelligent Search",
          description: "Improve enterprise information discovery with natural language.",
        },
        {
          number: "05",
          title: "AI Content Generation",
          description: "Generate operational summaries, reports, and responses.",
        },
        {
          number: "06",
          title: "AI Governance",
          description: "Establish responsible controls for enterprise Gen AI usage.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready to put Generative AI to work?",
      body:
        "Identify the right operational use cases and create a practical roadmap for enterprise Gen AI adoption.",
    },

    oems: [],
  },

  // ==========================================================
  // 03. AI SERVICE MANAGEMENT
  // ==========================================================
  {
    slug: "ai-service-management",
    title: "AI Service Management",
    description:
      "AI-powered service management for modern enterprises.",
    heroVisual: "ai-service-management",

    heroEyebrow: "AI SERVICE MANAGEMENT",
    heroText:
      "Modernize service operations with AI-powered workflows, intelligent assistance, and proactive service management.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Smarter Service Management with AI.",
      lead:
        "Transform service delivery from reactive ticket handling to intelligent operations.",
      body:
        "AI-powered service management brings automation, contextual insights, and intelligent assistance into enterprise service workflows.",
    },

    proofPoints: [
      { number: "01", text: "AI-assisted service resolution." },
      { number: "02", text: "Automated service workflows." },
      { number: "03", text: "Improved employee and customer experience." },
      { number: "04", text: "Proactive service operations." },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "AI-Powered Service Management Expertise.",
      intro:
        "Connect service platforms with intelligent automation to improve operational efficiency.",
      items: [],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "AI Service Management Capabilities.",
      intro:
        "Modernize service operations with intelligent workflows and automation.",
      items: [
        {
          number: "01",
          title: "Intelligent Ticketing",
          description: "Use AI to classify, prioritize, and route service requests.",
        },
        {
          number: "02",
          title: "AI Service Desk",
          description: "Provide intelligent assistance throughout the service lifecycle.",
        },
        {
          number: "03",
          title: "Incident Automation",
          description: "Accelerate incident identification and resolution workflows.",
        },
        {
          number: "04",
          title: "Knowledge Automation",
          description: "Create and surface relevant knowledge automatically.",
        },
        {
          number: "05",
          title: "Self-Service Experience",
          description: "Enable users to resolve common service requests faster.",
        },
        {
          number: "06",
          title: "Service Analytics",
          description: "Use operational data to improve service performance.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready to modernize your service operations?",
      body:
        "Build an AI-powered service management experience designed around your enterprise needs.",
    },

    oems: [],
  },

  // ==========================================================
  // 04. AIOPS & FULL STACK OBSERVABILITY
  // ==========================================================
  {
    slug: "aiops-full-stack-observability",
    title: "AIOps & Full Stack Observability",
    description:
      "Full-stack visibility and intelligent IT operations.",
    heroVisual: "aiops",

    heroEyebrow: "AIOPS & OBSERVABILITY",
    heroText:
      "Gain unified visibility across applications, infrastructure, services, and digital experiences with intelligent IT operations.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Intelligent Visibility Across the Full Technology Stack.",
      lead:
        "Bring monitoring, observability, and AI-driven operations together.",
      body:
        "A unified observability approach helps technology teams identify issues faster, understand dependencies, and improve the reliability of critical enterprise services.",
    },

    proofPoints: [
      { number: "01", text: "Unified application and infrastructure visibility." },
      { number: "02", text: "Intelligent event correlation." },
      { number: "03", text: "Faster incident detection and response." },
      { number: "04", text: "Proactive performance optimization." },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "Full-Stack Observability Expertise.",
      intro:
        "Connect telemetry, monitoring platforms, and AI-driven operations into one intelligent view.",
      items: [],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "AIOps & Observability Capabilities.",
      intro:
        "Improve visibility, reliability, and operational response across complex environments.",
      items: [
        {
          number: "01",
          title: "Application Observability",
          description: "Monitor application performance and service dependencies.",
        },
        {
          number: "02",
          title: "Infrastructure Monitoring",
          description: "Gain visibility across infrastructure and compute environments.",
        },
        {
          number: "03",
          title: "Event Intelligence",
          description: "Correlate operational events to reduce noise and accelerate response.",
        },
        {
          number: "04",
          title: "Performance Analytics",
          description: "Identify trends and performance bottlenecks.",
        },
        {
          number: "05",
          title: "Incident Intelligence",
          description: "Use contextual insights to improve incident resolution.",
        },
        {
          number: "06",
          title: "Proactive Operations",
          description: "Move toward predictive and preventative IT operations.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready for intelligent observability?",
      body:
        "Create a unified operational view across your technology ecosystem and improve service reliability.",
    },

    oems: [],
  },

  // ==========================================================
  // 05. AI-BASED ASSET MANAGEMENT
  // ==========================================================
  {
    slug: "ai-based-asset-management",
    title: "AI-Based Asset Management",
    description:
      "Intelligent enterprise asset management.",
    heroVisual: "asset-management",

    heroEyebrow: "AI ASSET MANAGEMENT",
    heroText:
      "Use AI and automation to create better visibility, governance, and lifecycle management across enterprise assets.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Intelligent Control Across the Asset Lifecycle.",
      lead:
        "Create a trusted and intelligent view of enterprise assets.",
      body:
        "AI-based asset management helps organizations discover assets, understand relationships, improve governance, and optimize lifecycle decisions.",
    },

    proofPoints: [
      { number: "01", text: "Improved asset visibility." },
      { number: "02", text: "Automated asset discovery and classification." },
      { number: "03", text: "Better lifecycle governance." },
      { number: "04", text: "Data-driven asset optimization." },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "Intelligent Asset Management Expertise.",
      intro:
        "Combine asset intelligence, automation, and operational data for better lifecycle decisions.",
      items: [],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "AI Asset Management Capabilities.",
      intro:
        "Build a more accurate and intelligent asset management ecosystem.",
      items: [
        {
          number: "01",
          title: "Asset Discovery",
          description: "Automatically identify assets across enterprise environments.",
        },
        {
          number: "02",
          title: "Asset Classification",
          description: "Organize assets using intelligent classification techniques.",
        },
        {
          number: "03",
          title: "Lifecycle Management",
          description: "Manage assets from onboarding through retirement.",
        },
        {
          number: "04",
          title: "Dependency Intelligence",
          description: "Understand relationships between assets and services.",
        },
        {
          number: "05",
          title: "Asset Governance",
          description: "Improve compliance and operational governance.",
        },
        {
          number: "06",
          title: "Optimization Analytics",
          description: "Identify opportunities to improve asset utilization.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready to make your assets intelligent?",
      body:
        "Create a trusted asset foundation that supports smarter operational and business decisions.",
    },

    oems: [],
  },

  // ==========================================================
  // 06. HYPER AUTOMATION
  // ==========================================================
  {
    slug: "hyper-automation",
    title: "Hyper Automation",
    description:
      "Automate complex enterprise workflows with intelligent automation.",
    heroVisual: "hyper-automation",

    heroEyebrow: "HYPER AUTOMATION",
    heroText:
      "Combine automation, AI, and intelligent workflows to simplify complex enterprise processes and improve operational efficiency.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Automate Complex Workflows at Enterprise Scale.",
      lead:
        "Move beyond isolated automation toward connected intelligent processes.",
      body:
        "Hyper automation brings together process automation, AI, orchestration, and enterprise integrations to reduce manual effort and improve process consistency.",
    },

    proofPoints: [
      { number: "01", text: "Connected enterprise automation." },
      { number: "02", text: "Reduced manual operational effort." },
      { number: "03", text: "Faster and more consistent workflows." },
      { number: "04", text: "Scalable automation architecture." },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "Enterprise Automation Expertise.",
      intro:
        "Design connected automation journeys across applications, teams, and business processes.",
      items: [],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "Hyper Automation Capabilities.",
      intro:
        "Automate repetitive and complex workflows with intelligent orchestration.",
      items: [
        {
          number: "01",
          title: "Process Automation",
          description: "Automate repetitive business and IT processes.",
        },
        {
          number: "02",
          title: "Intelligent Orchestration",
          description: "Coordinate workflows across multiple enterprise systems.",
        },
        {
          number: "03",
          title: "AI Automation",
          description: "Combine AI decision-making with process automation.",
        },
        {
          number: "04",
          title: "API Integration",
          description: "Connect enterprise applications through reusable integrations.",
        },
        {
          number: "05",
          title: "Workflow Optimization",
          description: "Identify and improve inefficient operational processes.",
        },
        {
          number: "06",
          title: "Automation Governance",
          description: "Create scalable frameworks for enterprise automation.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready to automate what slows your business down?",
      body:
        "Identify high-impact processes and build an intelligent automation roadmap around them.",
    },

    oems: [],
  },

  // ==========================================================
  // 07. ENTERPRISE DATA MANAGEMENT
  // ==========================================================
  {
    slug: "enterprise-data-management",
    title: "Enterprise Data Management",
    description:
      "Modern data management solutions for enterprise environments.",
    heroVisual: "data-management",

    heroEyebrow: "ENTERPRISE DATA MANAGEMENT",
    heroText:
      "Create a reliable data foundation that helps enterprises manage, govern, integrate, and use information more effectively.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Build a Trusted Foundation for Enterprise Data.",
      lead:
        "Make enterprise data more accessible, governed, and useful.",
      body:
        "Modern data management brings together data quality, integration, governance, and intelligence to support reliable enterprise decision-making.",
    },

    proofPoints: [
      { number: "01", text: "Trusted enterprise data foundation." },
      { number: "02", text: "Improved data quality and governance." },
      { number: "03", text: "Connected data across business systems." },
      { number: "04", text: "Better access to actionable information." },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "Enterprise Data Expertise.",
      intro:
        "Create scalable data foundations that support modern applications and intelligent operations.",
      items: [],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "Enterprise Data Management Capabilities.",
      intro:
        "Improve the way enterprise data is collected, governed, integrated, and consumed.",
      items: [
        {
          number: "01",
          title: "Data Integration",
          description: "Connect data across applications and enterprise platforms.",
        },
        {
          number: "02",
          title: "Data Governance",
          description: "Establish clear controls and ownership across enterprise data.",
        },
        {
          number: "03",
          title: "Data Quality",
          description: "Improve accuracy, consistency, and reliability of critical data.",
        },
        {
          number: "04",
          title: "Data Architecture",
          description: "Design scalable foundations for modern enterprise data.",
        },
        {
          number: "05",
          title: "Data Intelligence",
          description: "Turn enterprise information into useful operational insights.",
        },
        {
          number: "06",
          title: "Data Modernization",
          description: "Modernize legacy data environments for evolving business needs.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready to build a stronger data foundation?",
      body:
        "Create a modern data ecosystem that supports operational excellence and intelligent decision-making.",
    },

    oems: [],
  },

  // ==========================================================
  // 08. AI-LED SECURITY & CYBER DEFENSE
  // ==========================================================
  {
    slug: "ai-led-security-cyber-defense",
    title: "AI-Led Security & Cyber Defense",
    description:
      "AI-powered security and cyber defense solutions.",
    heroVisual: "cyber-defense",

    heroEyebrow: "AI SECURITY & CYBER DEFENSE",
    heroText:
      "Strengthen enterprise security with intelligent detection, automated response, and AI-driven cyber defense capabilities.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Intelligent Defense for a Changing Threat Landscape.",
      lead:
        "Use AI to improve visibility, detection, and response across enterprise security environments.",
      body:
        "AI-led cyber defense helps security teams process large volumes of signals, identify suspicious behavior, and respond to threats with greater speed and context.",
    },

    proofPoints: [
      { number: "01", text: "AI-assisted threat detection." },
      { number: "02", text: "Faster security response workflows." },
      { number: "03", text: "Improved visibility across security signals." },
      { number: "04", text: "Proactive cyber defense capabilities." },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "AI-Powered Cyber Defense Expertise.",
      intro:
        "Combine security intelligence, automation, and AI to strengthen enterprise defense.",
      items: [],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "AI Security & Cyber Defense Capabilities.",
      intro:
        "Improve security operations with intelligent monitoring, detection, and response.",
      items: [
        {
          number: "01",
          title: "Threat Detection",
          description: "Identify suspicious activity using intelligent security analysis.",
        },
        {
          number: "02",
          title: "Security Analytics",
          description: "Correlate security signals to improve threat understanding.",
        },
        {
          number: "03",
          title: "Incident Response",
          description: "Accelerate response through automated security workflows.",
        },
        {
          number: "04",
          title: "Vulnerability Intelligence",
          description: "Prioritize vulnerabilities based on operational context.",
        },
        {
          number: "05",
          title: "Security Automation",
          description: "Automate repeatable security operations and responses.",
        },
        {
          number: "06",
          title: "Cyber Resilience",
          description: "Build stronger processes for responding to evolving threats.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready to strengthen your cyber defense?",
      body:
        "Build an intelligent security operations approach that improves visibility, response, and resilience.",
    },

    oems: [],
  },

  // ==========================================================
  // 09. CLOUD & INFRASTRUCTURE
  // ==========================================================
  {
    slug: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    description:
      "Build scalable, secure, and high-performance cloud infrastructure.",
    heroVisual: "cloud-infrastructure",

    heroEyebrow: "ENTERPRISE CLOUD SOLUTION",
    heroText:
      "Design, modernize, and operate resilient cloud infrastructure built for enterprise scale, security, performance, and continuous growth.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Cloud Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Resilient Cloud Foundations, Engineered for Enterprise Scale.",
      lead:
        "Build secure and scalable cloud environments that support modern enterprise workloads.",
      body:
        "Our cloud approach combines architecture, migration, automation, cost optimization, and managed operations to create reliable cloud foundations across evolving enterprise environments.",
    },

    proofPoints: [
      {
        number: "01",
        text: "Scalable cloud architecture across modern enterprise environments.",
      },
      {
        number: "02",
        text: "Infrastructure automation using repeatable deployment practices.",
      },
      {
        number: "03",
        text: "Cloud cost visibility and optimization across workloads.",
      },
      {
        number: "04",
        text: "Continuous monitoring and managed cloud operations.",
      },
    ],

    expertise: {
      label: "OUR EXPERTISE",
      title: "Cloud Technology Expertise.",
      intro:
        "Work with leading cloud and observability technologies to build resilient enterprise environments.",
      items: [
        {
          number: "01",
          name: "Dynatrace",
          description:
            "Full-stack observability and intelligent monitoring for modern cloud environments.",
          image: "/images/parthners/datacorp.webp",
          href: "/solutions/cloud-infrastructure/dynatrace",
          tags: ["Observability", "Monitoring", "AIOps"],
        },
        {
          number: "02",
          name: "Moveworks",
          description:
            "AI-powered enterprise assistance and automation for modern operations.",
          image: "/images/parthners/moveworks.webp",
          href: "/solutions/cloud-infrastructure/moveworks",
          tags: ["AI", "Automation", "Enterprise"],
        },
        {
          number: "03",
          name: "Motadata",
          description:
            "Intelligent monitoring and IT operations capabilities for enterprise environments.",
          image: "/images/parthners/motadata.webp",
          href: "/solutions/cloud-infrastructure/motadata",
          tags: ["AIOps", "Monitoring", "IT Operations"],
        },
      ],
    },

    offerings: {
      label: "OUR CAPABILITIES",
      title: "Cloud Capabilities Built for Enterprise Scale.",
      intro:
        "Modernize infrastructure while improving reliability, performance, governance, and operational efficiency.",
      items: [
        {
          number: "01",
          title: "Cloud Migration & Modernization",
          description:
            "Move workloads to modern cloud architectures with a structured migration approach.",
        },
        {
          number: "02",
          title: "Cloud Infrastructure Architecture",
          description:
            "Design secure, resilient, and scalable infrastructure foundations.",
        },
        {
          number: "03",
          title: "DevOps & CI/CD Pipelines",
          description:
            "Automate delivery workflows for faster and more reliable releases.",
        },
        {
          number: "04",
          title: "Containerization & Kubernetes",
          description:
            "Build portable and scalable container-based application environments.",
        },
        {
          number: "05",
          title: "FinOps & Cloud Cost Optimization",
          description:
            "Improve cloud cost visibility, governance, and resource efficiency.",
        },
        {
          number: "06",
          title: "24/7 Cloud Operations & Managed Services",
          description:
            "Continuously monitor and manage cloud environments for operational reliability.",
        },
      ],
    },

    cta: {
      label: "LET'S BUILD",
      title: "Ready to optimize your cloud infrastructure?",
      body:
        "Build a resilient cloud foundation designed for performance, security, scalability, and continuous improvement.",
    },

    oems: [],
  },
];

// ============================================================
// Default/fallback solution used when a component needs a
// solution collection without importing the page-specific data.
// ============================================================

export const DEFAULT_SOLUTIONS = solutions.map((solution) => ({
  id: solution.slug,
  title: solution.title,
  description: solution.description,
}));

// ============================================================
// Default statistics used by reusable solution components.
// ============================================================

export const DEFAULT_STATS = [
  {
    value: "9",
    label: "Enterprise Solutions",
  },
  {
    value: "24/7",
    label: "Operational Support",
  },
  {
    value: "360°",
    label: "Technology Visibility",
  },
  {
    value: "AI",
    label: "Driven Innovation",
  },
];