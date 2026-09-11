'use client';

/**
 * Kinsfolk hero.
 * A 3D core sits behind the headline: orbital rings, a lit centre, and the
 * nine solutions as real points in space with HTML chips pinned to them.
 * Scrolling flies the camera through the core and hands off to the next
 * section.
 *
 * Client component. Three.js is imported lazily inside the effect so it stays
 * out of the server bundle and never blocks first paint.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import styles from './SolutionHero.module.css';
import { DEFAULT_HERO_NODES, type HeroNode } from './heroNodes';

type ThreeModule = typeof import('three');
type T = typeof import('three');

export type SolutionHeroProps = {
  /** Chips floating around the core. Defaults to the nine Kinsfolk solutions. */
  nodes?: HeroNode[];
  /** Small chip above the headline. Pass "" to hide it. */
  badge?: string;
  badgeHref?: string;
  /** Headline, first line. */
  headingTop?: string;
  /** Headline, second line, rendered in the light gradient. */
  headingAccent?: string;
  /** Sub headline. */
  sub?: string;
  primaryLabel?: string;
  primaryHref?: string;
  ghostLabel?: string;
  ghostHref?: string;
  /** How much extra scroll the fly through takes, in vh. 0 turns it off. */
  scrollDepthVh?: number;
  /** Brand colour, any CSS colour. */
  brandColor?: string;
  /** Background colour of the section directly below the hero. The fly through
   *  resolves into this colour so the two sections join with no seam. */
  exitColor?: string;
  /** The section that follows the hero, for example <StatsCounter />.
   *  Pass it here and it scrolls up the moment the fly through finishes, and
   *  lifts into place as it arrives. Leaving it out changes nothing, you can
   *  still put the next section after <SolutionHero /> yourself. */
  children?: ReactNode;
  /** Show the scroll cue at the bottom. */
  showCue?: boolean;
  className?: string;
  id?: string;
};

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

const BASE_CAM_Z = 12;
const FOV = 42;

type SceneEls = {
  canvas: HTMLCanvasElement;
  stage: HTMLElement;
  scroll: HTMLElement;
  content: HTMLElement;
  nodeLayer: HTMLElement;
  cue: HTMLElement | null;
  rail: HTMLElement | null;
  after: HTMLElement | null;
  bloom: HTMLElement | null;
  veil: HTMLElement | null;
};

/* ------------------------------------------------------------------
   Scene
   ------------------------------------------------------------------ */
function createScene(THREE: ThreeModule, els: SceneEls, nodes: HeroNode[], depthPx: () => number): () => void {
  const SOFT = 0x8fb4ff;
  const CYAN = 0x63e6ff;
  const WHITE = 0xffffff;

  const bin: { dispose: () => void }[] = [];
  const narrow = () => window.innerWidth < 900;

  const renderer = new THREE.WebGLRenderer({ canvas: els.canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
  camera.position.set(0, 0, BASE_CAM_Z);

  /* ---- soft light bleed from the top right, gives the scene a source ---- */
  function radialTexture(inner: string, mid: string) {
    const S = 256;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const x = c.getContext('2d')!;
    const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.3, mid);
    g.addColorStop(1, 'rgba(140,180,255,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, S, S);
    const t = new THREE.CanvasTexture(c);
    bin.push(t);
    return t;
  }
  const GLOW = radialTexture('rgba(255,255,255,1)', 'rgba(150,190,255,0.5)');

  const bleedMat = new THREE.SpriteMaterial({
    map: GLOW,
    color: 0xcfe0ff,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });
  const bleed = new THREE.Sprite(bleedMat);
  bleed.scale.set(20, 20, 1);
  bleed.position.set(5.5, 5.4, -8);
  scene.add(bleed);
  bin.push(bleedMat);

  /* ---- orbital rings ---- */
  const rings = new THREE.Group();
  rings.rotation.x = 0.2;
  scene.add(rings);

  const ringSpecs = [
    { r: 2.06, o: 0.15, s: 0.05 },
    { r: 2.7, o: 0.12, s: -0.035 },
    { r: 3.32, o: 0.1, s: 0.024 },
  ];
  const ringParts = ringSpecs.map((spec, i) => {
    const geo = new THREE.TorusGeometry(spec.r, 0.0055, 3, 220);
    const mat = new THREE.MeshBasicMaterial({ color: WHITE, transparent: true, opacity: spec.o, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = i * 0.06;
    mesh.rotation.y = i * 0.09;
    rings.add(mesh);
    bin.push(geo, mat);
    return { mesh, mat, base: spec.o, spin: spec.s };
  });

  /* bright arcs that sweep the rings */
  const arcs = [
    { r: 2.7, len: 0.85, speed: 0.42, color: CYAN, o: 0.42 },
    { r: 3.32, len: 0.5, speed: -0.28, color: SOFT, o: 0.45 },
    { r: 2.06, len: 1.15, speed: 0.2, color: SOFT, o: 0.3 },
  ].map((a) => {
    const geo = new THREE.TorusGeometry(a.r, 0.011, 4, 90, a.len);
    const mat = new THREE.MeshBasicMaterial({ color: a.color, transparent: true, opacity: a.o, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    rings.add(mesh);
    bin.push(geo, mat);
    return { mesh, mat, base: a.o, speed: a.speed };
  });

  /* ---- the core ---- */
  const core = new THREE.Group();
  core.position.z = -2.8;
  scene.add(core);

  const shellGeo = new THREE.IcosahedronGeometry(0.8, 1);
  const shellMat = new THREE.MeshBasicMaterial({ color: SOFT, wireframe: true, transparent: true, opacity: 0.12, depthWrite: false });
  const shell = new THREE.Mesh(shellGeo, shellMat);
  core.add(shell);
  bin.push(shellGeo, shellMat);

  const coreGlowMat = new THREE.SpriteMaterial({
    map: GLOW,
    color: 0x9dc0ff,
    transparent: true,
    opacity: 0.26,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const coreGlow = new THREE.Sprite(coreGlowMat);
  coreGlow.scale.set(7.2, 7.2, 1);
  core.add(coreGlow);
  bin.push(coreGlowMat);

  const seedMat = new THREE.SpriteMaterial({
    map: GLOW,
    color: 0xffffff,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const seed = new THREE.Sprite(seedMat);
  seed.scale.set(0.6, 0.6, 1);
  core.add(seed);
  bin.push(seedMat);

  /* ---- nodes: one per chip ---- */
  const RING_R = 3.32;
  const dotGeo = new THREE.SphereGeometry(0.048, 14, 14);
  const haloGeo = new THREE.TorusGeometry(0.125, 0.006, 6, 40);
  const packGeo = new THREE.SphereGeometry(0.032, 10, 10);
  bin.push(dotGeo, haloGeo, packGeo);

  type NodeBit = {
    group: InstanceType<T['Group']>;
    base: InstanceType<T['Vector3']>;
    phase: number;
    depth: number;
    ndc: { x: number; y: number };
    dotMat: InstanceType<T['MeshBasicMaterial']>;
    haloMat: InstanceType<T['MeshBasicMaterial']>;
    glowMat: InstanceType<T['SpriteMaterial']>;
    spur: InstanceType<T['Line']>;
    spurMat: InstanceType<T['LineBasicMaterial']>;
    packs: InstanceType<T['Mesh']>[];
    packMats: InstanceType<T['MeshBasicMaterial']>[];
    el: HTMLElement | null;
  };

  const bits: NodeBit[] = nodes.map((n, i) => {
    const group = new THREE.Group();

    const dotMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.9, depthWrite: false });
    group.add(new THREE.Mesh(dotGeo, dotMat));

    const haloMat = new THREE.MeshBasicMaterial({ color: SOFT, transparent: true, opacity: 0.4, depthWrite: false });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    group.add(halo);

    const glowMat = new THREE.SpriteMaterial({
      map: GLOW,
      color: 0x8fd8ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.scale.set(0.58, 0.58, 1);
    group.add(glow);
    scene.add(group);
    bin.push(dotMat, haloMat, glowMat);

    /* spur running from the node in towards the outer ring */
    const spurMat = new THREE.LineBasicMaterial({ color: SOFT, transparent: true, opacity: 0.11, depthWrite: false });
    const spurGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const spur = new THREE.Line(spurGeo, spurMat);
    scene.add(spur);
    bin.push(spurMat, spurGeo);

    const packs: InstanceType<T['Mesh']>[] = [];
    const packMats: InstanceType<T['MeshBasicMaterial']>[] = [];
    for (let q = 0; q < 2; q++) {
      const pm = new THREE.MeshBasicMaterial({
        color: WHITE,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(packGeo, pm);
      scene.add(mesh);
      packs.push(mesh);
      packMats.push(pm);
      bin.push(pm);
    }

    return {
      group,
      base: new THREE.Vector3(),
      phase: i * 1.37,
      depth: n.depth,
      ndc: { x: (n.x / 100) * 2 - 1, y: 1 - (n.y / 100) * 2 },
      dotMat,
      haloMat,
      glowMat,
      spur,
      spurMat,
      packs,
      packMats,
      el: null,
    };
  });

  /* ---- dust ---- */
  const dustGroup = new THREE.Group();
  scene.add(dustGroup);
  let dustMat: InstanceType<T['PointsMaterial']> | null = null;
  {
    const n = 700;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = -18 + Math.random() * 24;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color: 0xbcd2ff, size: 0.032, transparent: true, opacity: 0.6, depthWrite: false });
    dustMat = m;
    dustGroup.add(new THREE.Points(g, m));
    bin.push(g, m);
  }

  /* ---- layout: turn the design percentages into real 3D points ---- */
  function layout() {
    const w = els.stage.clientWidth;
    const h = els.stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = narrow() ? 54 : FOV;
    camera.updateProjectionMatrix();

    const isNarrow = narrow();
    rings.scale.setScalar(isNarrow ? 0.82 : 1);

    bits.forEach((b) => {
      const dist = BASE_CAM_Z - b.depth;
      const vh = 2 * Math.tan(((camera.fov / 2) * Math.PI) / 180) * dist;
      const vw = vh * camera.aspect;
      b.base.set((b.ndc.x * vw) / 2, (b.ndc.y * vh) / 2, b.depth);
    });
  }
  layout();

  /* ---- loop ---- */
  const tmp = new THREE.Vector3();
  const proj = new THREE.Vector3();
  let clockT = 0;
  let pointerX = 0;
  let pointerY = 0;
  let camX = 0;
  let camY = 0;
  let running = true;
  let raf = 0;
  let last = performance.now();

  function progress() {
    const box = els.scroll.getBoundingClientRect();
    const span = depthPx();
    if (span <= 0) return 0;
    return clamp(-box.top / span, 0, 1);
  }

  function frame(dt: number) {
    clockT += dt;
    const k = 1 - Math.exp(-6 * dt);
    const p = progress();
    const e = p * p * (3 - 2 * p);

    const stageW = els.stage.clientWidth;
    const stageH = els.stage.clientHeight;

    /* camera flies into the core */
    camX += (pointerX * 0.55 - camX) * k;
    camY += (pointerY * 0.35 - camY) * k;
    camera.position.set(camX, camY, BASE_CAM_Z - 13.2 * e);
    camera.lookAt(camX * 0.35, camY * 0.35, camera.position.z - 12);

    /* rings */
    rings.rotation.z += dt * 0.02;
    rings.rotation.x = 0.2 + camY * 0.05 + Math.sin(clockT * 0.13) * 0.03;
    rings.rotation.y = camX * 0.06;
    const ringFade = 1 - smooth(0.36, 0.76, p);
    ringParts.forEach((r) => {
      r.mesh.rotation.z += dt * r.spin;
      r.mat.opacity = r.base * ringFade;
      r.mesh.scale.setScalar(1 + 1.9 * e);
    });
    arcs.forEach((a) => {
      a.mesh.rotation.z += dt * a.speed;
      a.mat.opacity = a.base * ringFade;
      a.mesh.scale.setScalar(1 + 1.9 * e);
    });

    /* core */
    shell.rotation.y += dt * (0.16 + e * 1.6);
    shell.rotation.x += dt * (0.08 + e * 0.7);
    const coreFade = 1 - 0.35 * smooth(0.9, 1, p);
    core.scale.setScalar(1 + 0.35 * e);
    shellMat.opacity = (0.02 + 0.62 * smooth(0.12, 0.72, p)) * coreFade;
    coreGlowMat.opacity = (0.2 + 0.45 * e) * coreFade;
    coreGlow.scale.setScalar(7.2 + 4.2 * e);
    seedMat.opacity = (0.22 + 0.1 * Math.sin(clockT * 1.6) + 0.5 * e) * coreFade;
    seed.scale.setScalar(0.6 + 1.5 * e);

    /* dust drifts, then rushes past on scroll */
    dustGroup.position.z = e * 9;
    dustGroup.rotation.z = clockT * 0.006;
    if (dustMat) {
      dustMat.size = 0.032 + 0.026 * e;
      dustMat.opacity = 0.6 + 0.3 * e;
    }

    bleedMat.opacity = 0.22 * (1 - smooth(0.25, 0.85, p));
    bleed.position.x = 5.5 + camX * 0.4;

    /* nodes and their chips */
    const push = 1 + 1.45 * e;
    const chipFade = 1 - smooth(0.1, 0.46, p);
    const showNodes = !narrow();
    bits.forEach((b, i) => {
      b.group.visible = showNodes;
      b.spur.visible = showNodes;
      b.packs.forEach((pk) => (pk.visible = showNodes));
      if (!showNodes) return;
      const bob = Math.sin(clockT * 0.42 + b.phase) * 0.1;
      const sway = Math.cos(clockT * 0.31 + b.phase) * 0.07;
      tmp.set(b.base.x * push + sway, b.base.y * push + bob, b.base.z + Math.sin(clockT * 0.25 + b.phase) * 0.25);
      b.group.position.copy(tmp);
      b.group.lookAt(camera.position);

      const pulse = 0.55 + 0.45 * Math.sin(clockT * 1.5 + b.phase);
      b.dotMat.opacity = (0.7 + 0.3 * pulse) * chipFade;
      b.haloMat.opacity = 0.4 * chipFade;
      b.glowMat.opacity = (0.2 + 0.18 * pulse) * chipFade;
      b.group.scale.setScalar(1 + 0.12 * pulse);

      /* spur from the node in towards the ring */
      const inward = tmp.clone().setZ(0).normalize().multiplyScalar(RING_R * (1 + 1.9 * e));
      const arr = (b.spur.geometry.attributes.position as InstanceType<T['BufferAttribute']>).array as Float32Array;
      arr[0] = tmp.x; arr[1] = tmp.y; arr[2] = tmp.z;
      arr[3] = inward.x; arr[4] = inward.y; arr[5] = 0;
      b.spur.geometry.attributes.position.needsUpdate = true;
      b.spurMat.opacity = 0.11 * chipFade;

      /* packets running down the spur */
      b.packs.forEach((pk, q) => {
        const u = (clockT * 0.22 + q * 0.5 + i * 0.11) % 1;
        pk.position.lerpVectors(tmp, inward, u);
        b.packMats[q].opacity = Math.sin(Math.PI * u) * 0.75 * chipFade;
      });

      /* pin the html chip to the projected point */
      const el = b.el;
      if (el) {
        proj.copy(tmp).project(camera);
        const px = (proj.x * 0.5 + 0.5) * stageW;
        const py = (-proj.y * 0.5 + 0.5) * stageH;
        const anchorX = (b.ndc.x * 0.5 + 0.5) * stageW;
        const anchorY = (-b.ndc.y * 0.5 + 0.5) * stageH;
        const scale = clamp(1 + (b.depth - proj.z * 2) * 0.045 + e * 0.5, 0.8, 2.2);
        el.style.transform = `translate(-50%, -50%) translate3d(${px - anchorX}px, ${py - anchorY}px, 0) scale(${scale})`;
        el.style.opacity = String(chipFade);
        el.style.pointerEvents = chipFade > 0.5 ? 'auto' : 'none';
      }
    });

    /* centre column lifts and clears the way */
    const contentFade = 1 - smooth(0.1, 0.48, p);
    els.content.style.opacity = String(contentFade);
    els.content.style.transform = `translateY(${-72 * e}px) scale(${1 + 0.08 * e})`;
    if (els.rail) els.rail.style.opacity = String(contentFade);
    if (els.bloom) els.bloom.style.opacity = String(smooth(0.45, 0.85, p) * 0.92);
    if (els.veil) els.veil.style.opacity = String(smooth(0.72, 0.95, p));

    /* the section below is stacked over the stage and fades up as the wash
       lands, so it is already in place the moment the fly through ends */
    if (els.after) {
      const a = smooth(0.86, 1, p);
      els.after.style.opacity = String(a);
      els.after.style.transform = `translateY(${(1 - a) * 30}px)`;
      els.after.style.pointerEvents = a > 0.9 ? 'auto' : 'none';
    }
    if (els.cue) els.cue.style.opacity = String(1 - smooth(0, 0.18, p));

    renderer.render(scene, camera);
  }

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!running) return;
    frame(dt);
  };
  raf = requestAnimationFrame(loop);

  const onResize = () => layout();
  const onPointer = (ev: PointerEvent) => {
    pointerX = (ev.clientX / window.innerWidth - 0.5) * 2;
    pointerY = -(ev.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointer, { passive: true });

  let io: IntersectionObserver | null = null;
  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver((entries) => {
      running = entries[0].isIntersecting;
    });
    io.observe(els.scroll);
  }

  /* let the component hand us the chip elements */
  (els.nodeLayer as HTMLElement & { __bind?: (i: number, el: HTMLElement | null) => void }).__bind = (i, el) => {
    if (bits[i]) bits[i].el = el;
  };
  Array.from(els.nodeLayer.children).forEach((child, i) => {
    if (bits[i]) bits[i].el = child as HTMLElement;
  });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointer);
    io?.disconnect();
    bin.forEach((d) => d.dispose());
    renderer.dispose();
  };
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */
export default function SolutionHero({
  nodes = DEFAULT_HERO_NODES,
  badge = '',
  badgeHref,
  headingTop = 'Accelerating Enterprise',
  headingAccent = 'AI Innovation',
  sub = 'AI that automates the everyday work and turns your data into decisions you can act on, right across the business.',
  primaryLabel = 'Book a Discovery Call',
  primaryHref = '#contact',
  ghostLabel = 'Explore Our Solutions',
  ghostHref = '#solutions',
  scrollDepthVh = 55,
  exitColor = '#ffffff',
  brandColor,
  showCue = true,
  children,
  className,
  id,
}: SolutionHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const nodeLayerRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const afterRef = useRef<HTMLDivElement | null>(null);

  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !hasWebGL()) {
      setIsStatic(true);
      return;
    }

    let disposed = false;
    let teardown: (() => void) | null = null;

    (async () => {
      try {
        await (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
      } catch {
        /* older browsers, carry on */
      }
      const THREE = await import('three');
      if (disposed) return;
      const els = {
        canvas: canvasRef.current,
        stage: stageRef.current,
        scroll: scrollRef.current,
        content: contentRef.current,
        nodeLayer: nodeLayerRef.current,
        cue: cueRef.current,
        rail: railRef.current,
        bloom: bloomRef.current,
        veil: veilRef.current,
        after: afterRef.current,
      };
      if (!els.canvas || !els.stage || !els.scroll || !els.content || !els.nodeLayer) return;

      const depthPx = () => (scrollDepthVh / 100) * window.innerHeight * (window.innerWidth < 900 ? 0.7 : 1);
      teardown = createScene(THREE, els as SceneEls, nodes, depthPx);
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [nodes, scrollDepthVh]);

  /* the still version has no fly through to drive the reveal, so show it */
  useEffect(() => {
    const el = afterRef.current;
    if (!el) return;
    if (isStatic) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.pointerEvents = 'auto';
    }
  }, [isStatic, children]);

  const rootStyle = useMemo(
    () =>
      ({
        '--kf-depth': isStatic ? '0vh' : `${scrollDepthVh}vh`,
        '--kf-exit': exitColor,
        ...(brandColor ? { '--kf-blue': brandColor } : null),
      }) as React.CSSProperties,
    [scrollDepthVh, brandColor, exitColor, isStatic]
  );

  const Chip = (n: HeroNode, i: number) => {
  const chipKey = n.label;

  const chipProps = {
    className: styles.chip,
    style: {
      left: `${n.x}%`,
      top: `${n.y}%`,
      transform: 'translate(-50%, -50%)',
    } as React.CSSProperties,
  };

  return n.href ? (
    <a
      key={chipKey}
      {...chipProps}
      href={n.href}
    >
      {n.label}
    </a>
  ) : (
    <span
      key={chipKey}
      {...chipProps}
    >
      {n.label}
    </span>
  );
};

  return (
    <section
      id={id}
      className={[styles.root, isStatic ? styles.isStatic : '', className].filter(Boolean).join(' ')}
      style={rootStyle}
    >
      <div className={styles.scroll} ref={scrollRef}>
        <div className={styles.stage} ref={stageRef}>
          <canvas className={styles.canvas} ref={canvasRef} />
          <div className={styles.mesh} />

          {isStatic && (
            <div className={styles.ringsCss} aria-hidden>
              <i style={{ width: 380, height: 380 }} />
              <i style={{ width: 500, height: 500 }} />
              <i style={{ width: 615, height: 615 }} />
            </div>
          )}

          <div className={styles.nodes} ref={nodeLayerRef} aria-hidden>
            {nodes.map(Chip)}
          </div>

          <div className={styles.grain} />
          <div className={styles.bloom} ref={bloomRef} />
          <div className={styles.veil} ref={veilRef} />

          <div className={styles.content} ref={contentRef}>
            {badge &&
              (badgeHref ? (
                <a className={styles.badge} href={badgeHref}>
                  <i className={styles.badgeDot} />
                  {badge}
                </a>
              ) : (
                <div className={styles.badge}>
                  <i className={styles.badgeDot} />
                  {badge}
                </div>
              ))}
            <h1>
              {headingTop}
              <br />
              <span className={styles.lineTwo}>{headingAccent}</span>
            </h1>
            <p>{sub}</p>
            <div className={styles.actions}>
              <a className={styles.ctaPrimary} href={primaryHref}>
                {primaryLabel} <span>&rarr;</span>
              </a>
              <a className={styles.ctaGhost} href={ghostHref}>
                {ghostLabel} <span>&rarr;</span>
              </a>
            </div>
          </div>

          <div className={styles.rail} ref={railRef} aria-hidden>
            <div className={styles.railTrack}>
              {[...nodes, ...nodes].map((n, i) => (
                <span className={styles.railChip} key={`${n.label}-${i}`}>
                  {n.label}
                </span>
              ))}
            </div>
          </div>

          {showCue && (
            <div className={styles.cue} ref={cueRef}>
              <div className={styles.cueBar} />
              <div>Scroll</div>
            </div>
          )}
        </div>
      </div>

      {children ? (
        <div className={styles.after} ref={afterRef}>
          {children}
        </div>
      ) : null}
    </section>
  );
}
