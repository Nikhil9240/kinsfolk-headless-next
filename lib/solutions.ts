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

export type SolutionOfferingPoint = {
  title: string;
  description: string;
};

export type SolutionOffering = {
  id: string;
  number: string;
  tabTitle: string;
  title: string;
  description: string;
  points: SolutionOfferingPoint[];
  ctaLabel: string;
  ctaHref: string;
  icon?: "chart" | "network" | "gear" | "shield" | "document" | "users";
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

    heroEyebrow: "ENTERPRISE AI SOLUTION",
    heroText:
      "Move beyond copilots that suggest. Deploy governed AI agents that investigate, decide and resolve across your service, operations and security estate.",
    primaryButtonLabel: "Book a Discovery Call",
    secondaryButtonLabel: "Explore Capabilities",
    secondaryButtonHref: "#offerings",

    overview: {
      label: "SOLUTION OVERVIEW",
      title: "Agents That Act on Your Estate,Not Just Talk About It",
      lead:
        "Most enterprise AI stops at the answer. A chatbot summarises a knowledge article; a copilot drafts a reply; a human still opens the console, checks the CMDB, approves the change and closes the ticket. Agentic AI closes that gap. An agent is given a goal, the tools to pursue it, the guardrails it must stay inside, and the authority to act then it works the problem the way your best engineer would.",
      body:
        "Kinsfolk builds agentic AI where it pays back fastest: on top of the ITSM, ITOM and security platforms you already run. Because we have implemented and managed those platforms across Indian banking, insurance and manufacturing for over a decade, our agents inherit a working CMDB, real service models, clean automation runbooks and an audit trail — the four things that make the difference between an agent that resolves incidents and an agent that hallucinates confidently.",
    },

    proofPoints: [
      {
        number: "01",
        text: "Grounded in your data, not a generic model Agents are wired to your CMDB, knowledge base, monitoring telemetry and ticket history, so decisions reflect your estate rather than the public internet.",
      },
      {
        number: "02",
        text: "Guardrails before autonomy. Every agent ships with scoped permissions, human-in-the-loop approval gates on high-risk actions, and a full decision log your auditor can read.",
      },
      {
        number: "03",
        text: "Built on platforms you already own. BMC HelixGPT, ServiceNow AI Agents, Moveworks and AutomationEdge — we extend your existing licences before we propose new ones.",
      },
      {
        number: "04",
        text: "Measured on resolution, not conversation. Success is tickets closed without human touch, not messages exchanged.",
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
          tags: ["IT Service Management", "IT Asset Management", "Project Management" , "Patch Management"],
        },
        {
          number: "02",
          name: "ServiceNow",
          description:
            "Purpose-built agents that operate inside ITSM, ITOM and HR Service Delivery workflows.",
          image: "/images/parthners/servicenow.webp",
          href: "/solutions/agentic-ai/servicenow",
          tags: ["IT Service Management", "IT Operations Management", "IT Asset Management", "HR Service Delivery"],
        },
        {
          number: "03",
          name: "BMC Helix",
          description:
            "Agentic AI embedded directly in the ServiceOps platform running your enterprise.",
          image: "/images/parthners/bmc-helix.webp",
          href: "/solutions/agentic-ai/bmc-helix",
          tags: ["Helix ITSM", "Business Workflows", "Digital Workplace","HelixGPT"],
        },
      ],
    },

    offerings: {
      label: "OUR OFFERINGS",
      title: "Agentic AI Capabilities.",
      intro:
        "Build intelligent workflows that reduce operational effort and improve business responsiveness.",
      items: [
        {
          id: "agentic-readiness",
          number: "01",
          tabTitle: "Agentic Readiness Assessment",
          title: "Agentic Readiness Assessment",
          description:
            "Gartner expects over 40% of agentic AI projects to be cancelled by the end of 2027 because of escalating cost, unclear value and inadequate risk controls. We start by making sure yours is not one of them.",
          points: [
            { title: "Use-case triage against real ticket data.", description: "We analyse 6–12 months of your incident, request and change volume to find the workflows where agents pay back inside two quarters — and the ones where they will not." },
            { title: "Data and CMDB readiness scoring.", description: "Agents are only as good as the service model underneath them. We assess CMDB completeness, knowledge quality and telemetry coverage before we design anything." },
            { title: "Platform fit and licence review.", description: "We check what agentic capability you already own inside Helix, ServiceNow or Moveworks so you buy only the gap." },
            { title: "A costed roadmap with a stop condition.", description: "Each phase has a defined success metric and an explicit criterion for stopping, so a failing pilot ends cheaply." },
          ],
          ctaLabel: "Get an Agentic Readiness Assessment",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "agent-design", number: "02", tabTitle: "Agent Design & Orchestration", title: "Agent Design & Orchestration",
          description: "Single agents solve narrow problems. Enterprise value comes from agents that hand work to one another under supervision.",
          points: [
            { title: "Goal and tool definition.", description: "We specify precisely what each agent is allowed to pursue and which systems, APIs and automations it may call to get there." },
            { title: "Multi-agent orchestration.", description: "A triage agent classifies, a diagnostic agent investigates, a remediation agent acts and a communication agent updates the requester — coordinated, logged and interruptible." },
            { title: "Grounding and retrieval design.", description: "Agents retrieve from your CMDB, runbooks, knowledge base and monitoring data, with source attribution on every decision." },
            { title: "Fallback and escalation paths.", description: "When confidence drops below threshold, the agent stops and routes to a named human queue with its full working shown." },
          ],
          ctaLabel: "Talk to an Agent Architect", ctaHref: "/contact", icon: "network",
        },
        {
          id: "autonomous-service", number: "03", tabTitle: "Autonomous Service Operations", title: "Autonomous Service Operations",
          description: "The highest-volume, lowest-judgement work in your service desk is where agents earn their keep first.",
          points: [
            { title: "Access and provisioning requests resolved end to end.", description: "Including entitlement checks, approval routing and fulfilment in the target system." },
            { title: "Password, unlock and MFA-reset journeys.", description: "Handled conversationally in Teams or Slack with identity verification enforced." },
            { title: "Automated ticket classification, prioritisation and routing.", description: "Removes the manual triage queue from your L1 team's day." },
            { title: "Agent-generated resolution notes and knowledge articles.", description: "Every closed ticket improves the next one instead of disappearing." },
          ],
          ctaLabel: "Request a Service Desk Demo", ctaHref: "/contact", icon: "gear",
        },
        {
          id: "aiops-remediation", number: "04", tabTitle: "Agentic AIOps & Remediation", title: "Agentic AIOps & Remediation",
          description: "Detection is largely solved. What still costs you money is the hour between alert and fix.",
          points: [
            { title: "Autonomous investigation on alert.", description: "The agent gathers logs, metrics, traces, recent changes and topology, then produces a ranked hypothesis with evidence attached." },
            { title: "Guarded auto-remediation.", description: "For known failure signatures — service restarts, disk reclamation, certificate rotation, scaling actions — the agent executes an approved runbook and verifies recovery." },
            { title: "Change-correlated root cause.", description: "Agents cross-reference incidents against recent change records to identify the change that broke production." },
            { title: "Narrated incident timelines.", description: "Written automatically for the bridge call, the post-incident review and the regulator." },
          ],
          ctaLabel: "Discuss Your Incident Workflow", ctaHref: "/contact", icon: "chart",
        },
        {
          id: "governance", number: "05", tabTitle: "Governance, Guardrails & Assurance", title: "Governance, Guardrails & Assurance",
          description: "This is the section that gets you through your bank's risk committee. It is also the section most vendors skip.",
          points: [
            { title: "Scoped, least-privilege agent identities.", description: "Separate credentials per agent and per environment, integrated with your IAM." },
            { title: "Human-in-the-loop gates on defined risk classes.", description: "Production change, financial impact, customer data access, privileged access grant." },
            { title: "Full decision audit trail.", description: "The goal, the retrieved context, the tools called, the action taken and the outcome are retained and exportable." },
            { title: "Model and prompt version control.", description: "Evaluation suites are run before any agent behaviour changes in production." },
            { title: "Alignment with Indian regulatory expectations.", description: "Including RBI IT governance guidance, the DPDP Act and CERT-In incident reporting timelines." },
          ],
          ctaLabel: "Review Your Governance Model", ctaHref: "/contact", icon: "shield",
        },
        {
          id: "managed-agent", number: "06", tabTitle: "Scale & Managed Agent Operations", title: "Scale & Managed Agent Operations",
          description: "An agent is not a project. It is a system that needs owners, metrics and continuous tuning.",
          points: [
            { title: "Agent performance monitoring.", description: "Containment rate, resolution accuracy, escalation rate, cost per resolution and time saved, reported monthly." },
            { title: "Continuous grounding refresh.", description: "As your knowledge base, CMDB and estate change." },
            { title: "Drift and regression detection.", description: "So a model or prompt update never silently degrades resolution quality." },
            { title: "24×7 managed operations.", description: "From our support team across six offices, with defined SLAs on agent availability and accuracy." },
          ],
          ctaLabel: "Explore Managed Agent Operations", ctaHref: "/contact", icon: "users",
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
      { number: "01", text: "Grounded, cited answers. Every generated response points back to the ticket, runbook, log or document it came from, so a human can verify it in one click." },
      { number: "02", text: "Inside the tools, not beside them. GenAI surfaces in Helix, ServiceNow, Teams and your IDE — not in a separate window nobody opens." },
      { number: "03", text: "Built on your platform’s native AI first. BMC HelixGPT, ServiceNow generative AI and Moveworks before any bespoke build." },
      { number: "04", text: "Enterprise controls from day one. Data residency, PII redaction, prompt logging and content filtering configured before the first pilot user." },
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
      title: "Gen AI Capabilities",
      intro:
        "Introduce generative AI across knowledge, service, and operational workflows.",
      items: [
        {
          id: "enterprise-ai-assistants",
          number: "01",
          tabTitle: "Operational Knowledge Intelligence",
          title: "Operational Knowledge Intelligence",
          description: "Your knowledge base is not failing because nobody writes articles. It is failing because nobody maintains them.",
          points: [
            { title: "Auto-generated knowledge from resolved tickets", description: "When a novel incident closes, a draft article is written from the actual resolution path and queued for a subject-matter expert to approve in under two minutes" },
            { title: "Staleness detection", description: "Articles are cross-checked against recent resolutions and flagged when the estate has moved on, so your engineers stop following instructions for a decommissioned system" },
            { title: "Unified retrieval across silos", description: "One query searches ITSM knowledge, Confluence, SharePoint, runbooks and vendor documentation together, with source citations." },
            { title: "Gap analysis from unanswered questions", description: "The questions your assistant could not answer become a ranked backlog of knowledge to create." },
          ],
          ctaLabel: "Talk to a Knowledge Architect",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "AI-Generated Root Cause & Incident Narratives",
          number: "02",
          tabTitle: "AI-Generated Root Cause ",
          title: "AI-Generated Root Cause ",
          description: "The hour after a P1 is resolved is spent writing up what happened. That hour is now free.",
          points: [
            { title: "Live incident summarisation", description: "Anyone joining the bridge call at minute 40 reads a current, accurate summary instead of scrolling 300 chat messages." },
            { title: "Evidence-linked RCA drafts", description: "The narrative assembles alerts, log excerpts, topology, change records and remediation steps into a structured draft with every claim linked to its source." },
            { title: "Regulator- and board-ready formatting", description: "Separate outputs for the technical post-incident review, the executive summary and the regulatory notification." },
             { title: "Pattern detection across incident history", description: "Recurring root causes surfaced from years of tickets that no human has time to read" },
             
          ],
          ctaLabel: "Discuss Your Incident Workflow",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "Generative Service Desk Support",
          number: "03",
          tabTitle: "Generative Service Desk Support",
          title: "Generative Service Desk Support",
          description: "Use Gen AI to accelerate repetitive operational activities.",
          points: [
            { title: "AI Workflow Support", description: "Use Gen AI to accelerate repetitive operational activities." },
            { title: "Implementation focus", description: "Use Gen AI to accelerate repetitive operational activities." },
          ],
          ctaLabel: "Explore AI Workflow Support",
          ctaHref: "/contact",
          icon: "gear",
        },
        {
          id: "intelligent-search",
          number: "04",
          tabTitle: "Intelligent Search",
          title: "Intelligent Search",
          description: "Improve enterprise information discovery with natural language.",
          points: [
            { title: "Intelligent Search", description: "Improve enterprise information discovery with natural language." },
            { title: "Implementation focus", description: "Improve enterprise information discovery with natural language." },
          ],
          ctaLabel: "Explore Intelligent Search",
          ctaHref: "/contact",
          icon: "shield",
        },
        {
          id: "ai-content-generation",
          number: "05",
          tabTitle: "AI Content Generation",
          title: "AI Content Generation",
          description: "Generate operational summaries, reports, and responses.",
          points: [
            { title: "AI Content Generation", description: "Generate operational summaries, reports, and responses." },
            { title: "Implementation focus", description: "Generate operational summaries, reports, and responses." },
          ],
          ctaLabel: "Explore AI Content Generation",
          ctaHref: "/contact",
          icon: "document",
        },
        {
          id: "ai-governance",
          number: "06",
          tabTitle: "AI Governance",
          title: "AI Governance",
          description: "Establish responsible controls for enterprise Gen AI usage.",
          points: [
            { title: "AI Governance", description: "Establish responsible controls for enterprise Gen AI usage." },
            { title: "Implementation focus", description: "Establish responsible controls for enterprise Gen AI usage." },
          ],
          ctaLabel: "Explore AI Governance",
          ctaHref: "/contact",
          icon: "users",
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
          id: "intelligent-ticketing",
          number: "01",
          tabTitle: "Intelligent Ticketing",
          title: "Intelligent Ticketing",
          description: "Use AI to classify, prioritize, and route service requests.",
          points: [
            { title: "Intelligent Ticketing", description: "Use AI to classify, prioritize, and route service requests." },
            { title: "Implementation focus", description: "Use AI to classify, prioritize, and route service requests." },
          ],
          ctaLabel: "Explore Intelligent Ticketing",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "ai-service-desk",
          number: "02",
          tabTitle: "AI Service Desk",
          title: "AI Service Desk",
          description: "Provide intelligent assistance throughout the service lifecycle.",
          points: [
            { title: "AI Service Desk", description: "Provide intelligent assistance throughout the service lifecycle." },
            { title: "Implementation focus", description: "Provide intelligent assistance throughout the service lifecycle." },
          ],
          ctaLabel: "Explore AI Service Desk",
          ctaHref: "/contact",
          icon: "network",
        },
        {
          id: "incident-automation",
          number: "03",
          tabTitle: "Incident Automation",
          title: "Incident Automation",
          description: "Accelerate incident identification and resolution workflows.",
          points: [
            { title: "Incident Automation", description: "Accelerate incident identification and resolution workflows." },
            { title: "Implementation focus", description: "Accelerate incident identification and resolution workflows." },
          ],
          ctaLabel: "Explore Incident Automation",
          ctaHref: "/contact",
          icon: "gear",
        },
        {
          id: "knowledge-automation",
          number: "04",
          tabTitle: "Knowledge Automation",
          title: "Knowledge Automation",
          description: "Create and surface relevant knowledge automatically.",
          points: [
            { title: "Knowledge Automation", description: "Create and surface relevant knowledge automatically." },
            { title: "Implementation focus", description: "Create and surface relevant knowledge automatically." },
          ],
          ctaLabel: "Explore Knowledge Automation",
          ctaHref: "/contact",
          icon: "shield",
        },
        {
          id: "self-service-experience",
          number: "05",
          tabTitle: "Self-Service Experience",
          title: "Self-Service Experience",
          description: "Enable users to resolve common service requests faster.",
          points: [
            { title: "Self-Service Experience", description: "Enable users to resolve common service requests faster." },
            { title: "Implementation focus", description: "Enable users to resolve common service requests faster." },
          ],
          ctaLabel: "Explore Self-Service Experience",
          ctaHref: "/contact",
          icon: "document",
        },
        {
          id: "service-analytics",
          number: "06",
          tabTitle: "Service Analytics",
          title: "Service Analytics",
          description: "Use operational data to improve service performance.",
          points: [
            { title: "Service Analytics", description: "Use operational data to improve service performance." },
            { title: "Implementation focus", description: "Use operational data to improve service performance." },
          ],
          ctaLabel: "Explore Service Analytics",
          ctaHref: "/contact",
          icon: "users",
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
          id: "application-observability",
          number: "01",
          tabTitle: "Application Observability",
          title: "Application Observability",
          description: "Monitor application performance and service dependencies.",
          points: [
            { title: "Application Observability", description: "Monitor application performance and service dependencies." },
            { title: "Implementation focus", description: "Monitor application performance and service dependencies." },
          ],
          ctaLabel: "Explore Application Observability",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "infrastructure-monitoring",
          number: "02",
          tabTitle: "Infrastructure Monitoring",
          title: "Infrastructure Monitoring",
          description: "Gain visibility across infrastructure and compute environments.",
          points: [
            { title: "Infrastructure Monitoring", description: "Gain visibility across infrastructure and compute environments." },
            { title: "Implementation focus", description: "Gain visibility across infrastructure and compute environments." },
          ],
          ctaLabel: "Explore Infrastructure Monitoring",
          ctaHref: "/contact",
          icon: "network",
        },
        {
          id: "event-intelligence",
          number: "03",
          tabTitle: "Event Intelligence",
          title: "Event Intelligence",
          description: "Correlate operational events to reduce noise and accelerate response.",
          points: [
            { title: "Event Intelligence", description: "Correlate operational events to reduce noise and accelerate response." },
            { title: "Implementation focus", description: "Correlate operational events to reduce noise and accelerate response." },
          ],
          ctaLabel: "Explore Event Intelligence",
          ctaHref: "/contact",
          icon: "gear",
        },
        {
          id: "performance-analytics",
          number: "04",
          tabTitle: "Performance Analytics",
          title: "Performance Analytics",
          description: "Identify trends and performance bottlenecks.",
          points: [
            { title: "Performance Analytics", description: "Identify trends and performance bottlenecks." },
            { title: "Implementation focus", description: "Identify trends and performance bottlenecks." },
          ],
          ctaLabel: "Explore Performance Analytics",
          ctaHref: "/contact",
          icon: "shield",
        },
        {
          id: "incident-intelligence",
          number: "05",
          tabTitle: "Incident Intelligence",
          title: "Incident Intelligence",
          description: "Use contextual insights to improve incident resolution.",
          points: [
            { title: "Incident Intelligence", description: "Use contextual insights to improve incident resolution." },
            { title: "Implementation focus", description: "Use contextual insights to improve incident resolution." },
          ],
          ctaLabel: "Explore Incident Intelligence",
          ctaHref: "/contact",
          icon: "document",
        },
        {
          id: "proactive-operations",
          number: "06",
          tabTitle: "Proactive Operations",
          title: "Proactive Operations",
          description: "Move toward predictive and preventative IT operations.",
          points: [
            { title: "Proactive Operations", description: "Move toward predictive and preventative IT operations." },
            { title: "Implementation focus", description: "Move toward predictive and preventative IT operations." },
          ],
          ctaLabel: "Explore Proactive Operations",
          ctaHref: "/contact",
          icon: "users",
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
          id: "asset-discovery",
          number: "01",
          tabTitle: "Asset Discovery",
          title: "Asset Discovery",
          description: "Automatically identify assets across enterprise environments.",
          points: [
            { title: "Asset Discovery", description: "Automatically identify assets across enterprise environments." },
            { title: "Implementation focus", description: "Automatically identify assets across enterprise environments." },
          ],
          ctaLabel: "Explore Asset Discovery",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "asset-classification",
          number: "02",
          tabTitle: "Asset Classification",
          title: "Asset Classification",
          description: "Organize assets using intelligent classification techniques.",
          points: [
            { title: "Asset Classification", description: "Organize assets using intelligent classification techniques." },
            { title: "Implementation focus", description: "Organize assets using intelligent classification techniques." },
          ],
          ctaLabel: "Explore Asset Classification",
          ctaHref: "/contact",
          icon: "network",
        },
        {
          id: "lifecycle-management",
          number: "03",
          tabTitle: "Lifecycle Management",
          title: "Lifecycle Management",
          description: "Manage assets from onboarding through retirement.",
          points: [
            { title: "Lifecycle Management", description: "Manage assets from onboarding through retirement." },
            { title: "Implementation focus", description: "Manage assets from onboarding through retirement." },
          ],
          ctaLabel: "Explore Lifecycle Management",
          ctaHref: "/contact",
          icon: "gear",
        },
        {
          id: "dependency-intelligence",
          number: "04",
          tabTitle: "Dependency Intelligence",
          title: "Dependency Intelligence",
          description: "Understand relationships between assets and services.",
          points: [
            { title: "Dependency Intelligence", description: "Understand relationships between assets and services." },
            { title: "Implementation focus", description: "Understand relationships between assets and services." },
          ],
          ctaLabel: "Explore Dependency Intelligence",
          ctaHref: "/contact",
          icon: "shield",
        },
        {
          id: "asset-governance",
          number: "05",
          tabTitle: "Asset Governance",
          title: "Asset Governance",
          description: "Improve compliance and operational governance.",
          points: [
            { title: "Asset Governance", description: "Improve compliance and operational governance." },
            { title: "Implementation focus", description: "Improve compliance and operational governance." },
          ],
          ctaLabel: "Explore Asset Governance",
          ctaHref: "/contact",
          icon: "document",
        },
        {
          id: "optimization-analytics",
          number: "06",
          tabTitle: "Optimization Analytics",
          title: "Optimization Analytics",
          description: "Identify opportunities to improve asset utilization.",
          points: [
            { title: "Optimization Analytics", description: "Identify opportunities to improve asset utilization." },
            { title: "Implementation focus", description: "Identify opportunities to improve asset utilization." },
          ],
          ctaLabel: "Explore Optimization Analytics",
          ctaHref: "/contact",
          icon: "users",
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
          id: "process-automation",
          number: "01",
          tabTitle: "Process Automation",
          title: "Process Automation",
          description: "Automate repetitive business and IT processes.",
          points: [
            { title: "Process Automation", description: "Automate repetitive business and IT processes." },
            { title: "Implementation focus", description: "Automate repetitive business and IT processes." },
             { title: "Implementation focus", description: "Automate repetitive business and IT processes." },
          ],
          ctaLabel: "Explore Process Automation",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "intelligent-orchestration",
          number: "02",
          tabTitle: "Intelligent Orchestration",
          title: "Intelligent Orchestration",
          description: "Coordinate workflows across multiple enterprise systems.",
          points: [
            { title: "Intelligent Orchestration", description: "Coordinate workflows across multiple enterprise systems." },
            { title: "Implementation focus", description: "Coordinate workflows across multiple enterprise systems." },
             { title: "Implementation focus", description: "Coordinate workflows across multiple enterprise systems." },
          ],
          ctaLabel: "Explore Intelligent Orchestration",
          ctaHref: "/contact",
          icon: "network",
        },
        {
          id: "ai-automation",
          number: "03",
          tabTitle: "AI Automation",
          title: "AI Automation",
          description: "Combine AI decision-making with process automation.",
          points: [
            { title: "AI Automation", description: "Combine AI decision-making with process automation." },
            { title: "Implementation focus", description: "Combine AI decision-making with process automation." },
          ],
          ctaLabel: "Explore AI Automation",
          ctaHref: "/contact",
          icon: "gear",
        },
        {
          id: "api-integration",
          number: "04",
          tabTitle: "API Integration",
          title: "API Integration",
          description: "Connect enterprise applications through reusable integrations.",
          points: [
            { title: "API Integration", description: "Connect enterprise applications through reusable integrations." },
            { title: "Implementation focus", description: "Connect enterprise applications through reusable integrations." },
          ],
          ctaLabel: "Explore API Integration",
          ctaHref: "/contact",
          icon: "shield",
        },
        {
          id: "workflow-optimization",
          number: "05",
          tabTitle: "Workflow Optimization",
          title: "Workflow Optimization",
          description: "Identify and improve inefficient operational processes.",
          points: [
            { title: "Workflow Optimization", description: "Identify and improve inefficient operational processes." },
            { title: "Implementation focus", description: "Identify and improve inefficient operational processes." },
          ],
          ctaLabel: "Explore Workflow Optimization",
          ctaHref: "/contact",
          icon: "document",
        },
        {
          id: "automation-governance",
          number: "06",
          tabTitle: "Automation Governance",
          title: "Automation Governance",
          description: "Create scalable frameworks for enterprise automation.",
          points: [
            { title: "Automation Governance", description: "Create scalable frameworks for enterprise automation." },
            { title: "Implementation focus", description: "Create scalable frameworks for enterprise automation." },
          ],
          ctaLabel: "Explore Automation Governance",
          ctaHref: "/contact",
          icon: "users",
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
          id: "data-integration",
          number: "01",
          tabTitle: "Data Integration",
          title: "Data Integration",
          description: "Connect data across applications and enterprise platforms.",
          points: [
            { title: "Data Integration", description: "Connect data across applications and enterprise platforms." },
            { title: "Implementation focus", description: "Connect data across applications and enterprise platforms." },
          ],
          ctaLabel: "Explore Data Integration",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "data-governance",
          number: "02",
          tabTitle: "Data Governance",
          title: "Data Governance",
          description: "Establish clear controls and ownership across enterprise data.",
          points: [
            { title: "Data Governance", description: "Establish clear controls and ownership across enterprise data." },
            { title: "Implementation focus", description: "Establish clear controls and ownership across enterprise data." },
          ],
          ctaLabel: "Explore Data Governance",
          ctaHref: "/contact",
          icon: "network",
        },
        {
          id: "data-quality",
          number: "03",
          tabTitle: "Data Quality",
          title: "Data Quality",
          description: "Improve accuracy, consistency, and reliability of critical data.",
          points: [
            { title: "Data Quality", description: "Improve accuracy, consistency, and reliability of critical data." },
            { title: "Implementation focus", description: "Improve accuracy, consistency, and reliability of critical data." },
          ],
          ctaLabel: "Explore Data Quality",
          ctaHref: "/contact",
          icon: "gear",
        },
        {
          id: "data-architecture",
          number: "04",
          tabTitle: "Data Architecture",
          title: "Data Architecture",
          description: "Design scalable foundations for modern enterprise data.",
          points: [
            { title: "Data Architecture", description: "Design scalable foundations for modern enterprise data." },
            { title: "Implementation focus", description: "Design scalable foundations for modern enterprise data." },
          ],
          ctaLabel: "Explore Data Architecture",
          ctaHref: "/contact",
          icon: "shield",
        },
        {
          id: "data-intelligence",
          number: "05",
          tabTitle: "Data Intelligence",
          title: "Data Intelligence",
          description: "Turn enterprise information into useful operational insights.",
          points: [
            { title: "Data Intelligence", description: "Turn enterprise information into useful operational insights." },
            { title: "Implementation focus", description: "Turn enterprise information into useful operational insights." },
          ],
          ctaLabel: "Explore Data Intelligence",
          ctaHref: "/contact",
          icon: "document",
        },
        {
          id: "data-modernization",
          number: "06",
          tabTitle: "Data Modernization",
          title: "Data Modernization",
          description: "Modernize legacy data environments for evolving business needs.",
          points: [
            { title: "Data Modernization", description: "Modernize legacy data environments for evolving business needs." },
            { title: "Implementation focus", description: "Modernize legacy data environments for evolving business needs." },
          ],
          ctaLabel: "Explore Data Modernization",
          ctaHref: "/contact",
          icon: "users",
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
          id: "threat-detection",
          number: "01",
          tabTitle: "Threat Detection",
          title: "Threat Detection",
          description: "Identify suspicious activity using intelligent security analysis.",
          points: [
            { title: "Threat Detection", description: "Identify suspicious activity using intelligent security analysis." },
            { title: "Implementation focus", description: "Identify suspicious activity using intelligent security analysis." },
          ],
          ctaLabel: "Explore Threat Detection",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "security-analytics",
          number: "02",
          tabTitle: "Security Analytics",
          title: "Security Analytics",
          description: "Correlate security signals to improve threat understanding.",
          points: [
            { title: "Security Analytics", description: "Correlate security signals to improve threat understanding." },
            { title: "Implementation focus", description: "Correlate security signals to improve threat understanding." },
          ],
          ctaLabel: "Explore Security Analytics",
          ctaHref: "/contact",
          icon: "network",
        },
        {
          id: "incident-response",
          number: "03",
          tabTitle: "Incident Response",
          title: "Incident Response",
          description: "Accelerate response through automated security workflows.",
          points: [
            { title: "Incident Response", description: "Accelerate response through automated security workflows." },
            { title: "Implementation focus", description: "Accelerate response through automated security workflows." },
          ],
          ctaLabel: "Explore Incident Response",
          ctaHref: "/contact",
          icon: "gear",
        },
        {
          id: "vulnerability-intelligence",
          number: "04",
          tabTitle: "Vulnerability Intelligence",
          title: "Vulnerability Intelligence",
          description: "Prioritize vulnerabilities based on operational context.",
          points: [
            { title: "Vulnerability Intelligence", description: "Prioritize vulnerabilities based on operational context." },
            { title: "Implementation focus", description: "Prioritize vulnerabilities based on operational context." },
          ],
          ctaLabel: "Explore Vulnerability Intelligence",
          ctaHref: "/contact",
          icon: "shield",
        },
        {
          id: "security-automation",
          number: "05",
          tabTitle: "Security Automation",
          title: "Security Automation",
          description: "Automate repeatable security operations and responses.",
          points: [
            { title: "Security Automation", description: "Automate repeatable security operations and responses." },
            { title: "Implementation focus", description: "Automate repeatable security operations and responses." },
          ],
          ctaLabel: "Explore Security Automation",
          ctaHref: "/contact",
          icon: "document",
        },
        {
          id: "cyber-resilience",
          number: "06",
          tabTitle: "Cyber Resilience",
          title: "Cyber Resilience",
          description: "Build stronger processes for responding to evolving threats.",
          points: [
            { title: "Cyber Resilience", description: "Build stronger processes for responding to evolving threats." },
            { title: "Implementation focus", description: "Build stronger processes for responding to evolving threats." },
          ],
          ctaLabel: "Explore Cyber Resilience",
          ctaHref: "/contact",
          icon: "users",
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
          id: "cloud-migration-modernization",
          number: "01",
          tabTitle: "Cloud Migration & Modernization",
          title: "Cloud Migration & Modernization",
          description: "Move workloads to modern cloud architectures with a structured migration approach.",
          points: [
            { title: "Cloud Migration & Modernization", description: "Move workloads to modern cloud architectures with a structured migration approach." },
            { title: "Implementation focus", description: "Move workloads to modern cloud architectures with a structured migration approach." },
          ],
          ctaLabel: "Explore Cloud Migration & Modernization",
          ctaHref: "/contact",
          icon: "chart",
        },
        {
          id: "cloud-infrastructure-architecture",
          number: "02",
          tabTitle: "Cloud Infrastructure Architecture",
          title: "Cloud Infrastructure Architecture",
          description: "Design secure, resilient, and scalable infrastructure foundations.",
          points: [
            { title: "Cloud Infrastructure Architecture", description: "Design secure, resilient, and scalable infrastructure foundations." },
            { title: "Implementation focus", description: "Design secure, resilient, and scalable infrastructure foundations." },
          ],
          ctaLabel: "Explore Cloud Infrastructure Architecture",
          ctaHref: "/contact",
          icon: "network",
        },
        {
          id: "devops-ci-cd-pipelines",
          number: "03",
          tabTitle: "DevOps & CI/CD Pipelines",
          title: "DevOps & CI/CD Pipelines",
          description: "Automate delivery workflows for faster and more reliable releases.",
          points: [
            { title: "DevOps & CI/CD Pipelines", description: "Automate delivery workflows for faster and more reliable releases." },
            { title: "Implementation focus", description: "Automate delivery workflows for faster and more reliable releases." },
          ],
          ctaLabel: "Explore DevOps & CI/CD Pipelines",
          ctaHref: "/contact",
          icon: "gear",
        },
        {
          id: "containerization-kubernetes",
          number: "04",
          tabTitle: "Containerization & Kubernetes",
          title: "Containerization & Kubernetes",
          description: "Build portable and scalable container-based application environments.",
          points: [
            { title: "Containerization & Kubernetes", description: "Build portable and scalable container-based application environments." },
            { title: "Implementation focus", description: "Build portable and scalable container-based application environments." },
          ],
          ctaLabel: "Explore Containerization & Kubernetes",
          ctaHref: "/contact",
          icon: "shield",
        },
        {
          id: "finops-cloud-cost-optimization",
          number: "05",
          tabTitle: "FinOps & Cloud Cost Optimization",
          title: "FinOps & Cloud Cost Optimization",
          description: "Improve cloud cost visibility, governance, and resource efficiency.",
          points: [
            { title: "FinOps & Cloud Cost Optimization", description: "Improve cloud cost visibility, governance, and resource efficiency." },
            { title: "Implementation focus", description: "Improve cloud cost visibility, governance, and resource efficiency." },
          ],
          ctaLabel: "Explore FinOps & Cloud Cost Optimization",
          ctaHref: "/contact",
          icon: "document",
        },
        {
          id: "24-7-cloud-operations-managed-services",
          number: "06",
          tabTitle: "24/7 Cloud Operations & Managed Services",
          title: "24/7 Cloud Operations & Managed Services",
          description: "Continuously monitor and manage cloud environments for operational reliability.",
          points: [
            { title: "24/7 Cloud Operations & Managed Services", description: "Continuously monitor and manage cloud environments for operational reliability." },
            { title: "Implementation focus", description: "Continuously monitor and manage cloud environments for operational reliability." },
          ],
          ctaLabel: "Explore 24/7 Cloud Operations & Managed Services",
          ctaHref: "/contact",
          icon: "users",
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