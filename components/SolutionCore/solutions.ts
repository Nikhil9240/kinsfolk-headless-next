/**
 * Content for the Kinsfolk Solution Core.
 * Each entry becomes one block in the 3D core.
 *
 * title  full name, shown in the white panel
 * short  short name printed on the 3D block face (keep it under about 22 characters)
 * sub    one line qualifier under the title
 * desc   two or three lines of plain copy
 * steps  exactly four process steps, these light up one by one inside the block
 */
export type Solution = {
  title: string;
  short?: string;
  sub: string;
  desc: string;
  steps: string[];
};

export type Stat = { value: string; label: string };

export const DEFAULT_SOLUTIONS: Solution[] = [
  {
    title: 'Agentic AI',
    short: 'Agentic AI',
    sub: 'AI that acts, not just answers',
    desc: 'We put AI agents inside your operations with clear guardrails, so routine work gets done without a person having to start it.',
    steps: [
      'Watch the estate and pick up the signal',
      'Decide the next action against your policy',
      'Act through the systems already in place',
      'Learn from the outcome and improve',
    ],
  },
  {
    title: 'Gen AI and GPT Driven Operations',
    short: 'Gen AI Operations',
    sub: 'Plain language on top of your stack',
    desc: 'Your teams ask a question the way they would ask a colleague, and get an answer grounded in your own data instead of a generic model.',
    steps: [
      'Ground the model on your own content',
      'Pull the right context for the question',
      'Draft the answer or the action',
      'Hand to a person when the call is close',
    ],
  },
  {
    title: 'AI Service Management',
    short: 'AI Service Management',
    sub: 'Enterprise and IT service management',
    desc: 'Service desks that resolve on their own. We rebuild ESM and ITSM around intent, so tickets get classified, routed and closed with far less human touch.',
    steps: [
      'Capture intent from any channel',
      'Classify and route without a queue owner',
      'Auto resolve the requests that repeat',
      'Feed what was learned back to knowledge',
    ],
  },
  {
    title: 'AIOps and Full Stack Observability',
    short: 'AIOps and FSO',
    sub: 'One signal, click to database',
    desc: 'Metrics, logs and traces from every layer land in one place, so noise turns into a single incident with a probable cause attached.',
    steps: [
      'Ingest metrics, logs and traces',
      'Correlate the noise into one incident',
      'Point to the probable cause',
      'Trigger the fix and confirm recovery',
    ],
  },
  {
    title: 'Hyper Automation',
    short: 'Hyper Automation',
    sub: 'Digital business automation and RPA',
    desc: 'Cross functional processes that run themselves. We automate the work that crosses teams and systems, not just single tasks.',
    steps: [
      'Map the process end to end',
      'Orchestrate people, bots and systems',
      'Automate the manual steps with RPA',
      'Measure the cycle time and tune it',
    ],
  },
  {
    title: 'Full Stack Automation',
    short: 'Full Stack Automation',
    sub: 'Orchestration and workload automation',
    desc: 'Every job, every dependency, every platform on one schedule. Batch, cloud and mainframe run as one flow with the SLA in view.',
    steps: [
      'Model the jobs and their dependencies',
      'Schedule across cloud, open systems and mainframe',
      'Run with the SLA watched in real time',
      'Recover, rerun and report',
    ],
  },
  {
    title: 'AI Based Asset Management',
    short: 'Asset Management',
    sub: 'Know what you own and what it costs',
    desc: 'A live view of hardware, software and cloud, with the cost, licence position and risk attached to each item.',
    steps: [
      'Discover every asset in the estate',
      'Normalise and enrich the records',
      'Track cost, licence and risk',
      'Plan the refresh and reclaim what is idle',
    ],
  },
  {
    title: 'Enterprise Data Management',
    short: 'Data Management',
    sub: 'Trusted data, ready to use',
    desc: 'We connect the sources, clean them and govern them, so the business works from data it can defend in an audit.',
    steps: [
      'Connect the sources across the business',
      'Clean, match and govern',
      'Serve data products teams can trust',
      'Prove lineage and compliance',
    ],
  },
  {
    title: 'AI Led Security and Cyber Defense',
    short: 'AI Led Security',
    sub: 'Including software bill of materials',
    desc: 'See the real attack surface, know which findings matter, and close them automatically instead of adding them to a backlog.',
    steps: [
      'See the full attack surface',
      'Score what actually matters, SBOM included',
      'Remediate automatically at scale',
      'Keep the evidence audit ready',
    ],
  },
];

export const DEFAULT_STATS: Stat[] = [
  { value: '12+', label: 'Years delivering' },
  { value: '150+', label: 'Projects' },
  { value: '450+', label: 'People' },
];
