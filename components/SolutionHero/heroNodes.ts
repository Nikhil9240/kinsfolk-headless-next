/**
 * The solution labels that float around the hero core.
 *
 * label   text on the chip
 * href    optional link, leave out for a plain chip
 * x, y    where the chip sits, as a percentage of the stage.
 *         These are the design positions. The component turns them into real
 *         3D points at runtime, so the layout holds on every screen size and
 *         the chips still move in space.
 * depth   how far in front of or behind the core the node sits.
 *         Positive is closer to the viewer. Drives scale and parallax.
 */
export type HeroNode = {
  label: string;
  href?: string;
  x: number;
  y: number;
  depth: number;
};

export const DEFAULT_HERO_NODES: HeroNode[] = [
  { label: 'Agentic AI',                x: 11.6, y: 16, depth: 1.6 },
  { label: 'Gen AI Driven Operations',  x: 8.8,  y: 33, depth: -0.9 },
  { label: 'AI Service Management',     x: 7.2,  y: 50, depth: 0.7 },
  { label: 'AI-Ops',                    x: 8.8,  y: 67, depth: -1.7 },
  { label: 'Full Stack Automation',     x: 11.6, y: 84, depth: 1.1 },
  { label: 'AI Asset Management',       x: 87.2, y: 22, depth: -1.2 },
  { label: 'Hyper Automation',          x: 91.4, y: 43, depth: 1.4 },
  { label: 'Enterprise Data Management',x: 92.0, y: 63, depth: -0.6 },
  { label: 'AI driven Security',        x: 88.4, y: 84, depth: 0.9 },
];
