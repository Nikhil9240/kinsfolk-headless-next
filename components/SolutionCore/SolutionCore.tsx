'use client';

/**
 * Kinsfolk Solution Core
 * A scroll driven 3D section. A nine block core breaks apart, each block
 * opens up and shows the process that runs inside it.
 *
 * Client component. Three.js is imported lazily inside the effect so it never
 * lands in the server bundle and never blocks first paint.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './SolutionCore.module.css';
import { DEFAULT_SOLUTIONS, DEFAULT_STATS, type Solution, type Stat } from './solutions';

type ThreeModule = typeof import('three');
type T = typeof import('three');

export type SolutionCoreProps = {
  /** The blocks. Defaults to the nine Kinsfolk solutions. */
  solutions?: Solution[];
  /** Small label above the intro heading. */
  eyebrow?: string;
  /** Intro heading, first line. */
  headingTop?: string;
  /** Intro heading, second line, shown in the brand colour. */
  headingAccent?: string;
  /** Intro paragraph. */
  intro?: string;
  /** Closing heading. Use \n for a line break. */
  outroHeading?: string;
  /** Closing paragraph. */
  outroBody?: string;
  /** Numbers shown at the end. Pass an empty array to hide them. */
  stats?: Stat[];
  /** Closing button. Pass ctaHref="" to hide the button. */
  ctaLabel?: string;
  ctaHref?: string;
  /** Brand colour, any CSS colour. Everything else derives from it. */
  brandColor?: string;
  /** Height of one scroll chapter. Lower is faster. Default 115. */
  chapterHeightVh?: number;
  /** Extra class on the section wrapper. */
  className?: string;
  /** Anchor id, handy when you link to the section. */
  id?: string;
};

const pad = (n: number) => (n < 10 ? '0' : '') + n;
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

type FlowNode = {
  group: T['Group']['prototype'];
  dot: T['Mesh']['prototype'];
  ring: T['Mesh']['prototype'];
  ping: T['Mesh']['prototype'];
  glow: T['Sprite']['prototype'];
  num: T['Sprite']['prototype'];
};

type Block = {
  group: T['Group']['prototype'];
  home: T['Vector3']['prototype'];
  ringPos: T['Vector3']['prototype'];
  ringRot: T['Euler']['prototype'];
  shell: T['MeshStandardMaterial']['prototype'];
  edge: T['LineBasicMaterial']['prototype'];
  face: T['MeshBasicMaterial']['prototype'];
  flow: T['Group']['prototype'];
  nodes: FlowNode[];
  lineMat: T['MeshBasicMaterial']['prototype'];
  curve: T['CatmullRomCurve3']['prototype'];
  tube: T['Mesh']['prototype'];
  tubeCount: number;
  pulses: T['Mesh']['prototype'][];
};

type SceneEls = {
  canvas: HTMLCanvasElement;
  stage: HTMLElement;
  scroll: HTMLElement;
  intro: HTMLElement;
  panel: HTMLElement;
  rail: HTMLElement;
  outro: HTMLElement;
};

/* ------------------------------------------------------------------
   Scene. Kept out of the component so the render path stays readable.
   Returns a teardown function.
   ------------------------------------------------------------------ */
function createScene(
  THREE: ThreeModule,
  els: SceneEls,
  solutions: Solution[],
  onChapter: (active: number, step: number) => void
): () => void {
  const BLUE = 0x1f6fff;
  const SOFT = 0x4d92ff;
  const CYAN = 0x45c7ff;
  const LAST = solutions.length;
  const CHAPTERS = LAST + 2;
  const LIGHT = Math.PI; // three r155+ reads light intensity in physical units

  const disposables: { dispose: () => void }[] = [];
  const narrow = () => window.innerWidth < 900;

  const renderer = new THREE.WebGLRenderer({ canvas: els.canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05070d, 14, 32);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
  camera.position.set(0, 0, 13.5);

  scene.add(new THREE.AmbientLight(0x8fb6ff, 0.55 * LIGHT));
  const key = new THREE.DirectionalLight(0xffffff, 0.85 * LIGHT);
  key.position.set(5, 8, 9);
  scene.add(key);
  const fill = new THREE.DirectionalLight(SOFT, 0.6 * LIGHT);
  fill.position.set(-8, -3, 4);
  scene.add(fill);
  const rim = new THREE.PointLight(CYAN, 6, 30, 1);
  rim.position.set(0, 0, 2);
  scene.add(rim);

  const core = new THREE.Group();
  scene.add(core);

  /* inner glow, seen once the core opens */
  const heartGeo = new THREE.IcosahedronGeometry(0.78, 1);
  const heartMat = new THREE.MeshBasicMaterial({ color: SOFT, wireframe: true, transparent: true, opacity: 0 });
  const heart = new THREE.Mesh(heartGeo, heartMat);
  heart.position.z = -5;
  core.add(heart);
  disposables.push(heartGeo, heartMat);

  /* dust */
  {
    const n = 420;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 9 + Math.random() * 13;
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(b) * Math.cos(a);
      pos[i * 3 + 1] = r * Math.sin(b) * Math.sin(a) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(b) * 0.5 - 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color: SOFT, size: 0.055, transparent: true, opacity: 0.55, depthWrite: false });
    scene.add(new THREE.Points(g, m));
    disposables.push(g, m);
  }

  /* ---- textures ---- */
  function faceTexture(index: number, title: string) {
    const S = 1024;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const x = c.getContext('2d')!;
    x.clearRect(0, 0, S, S);

    x.strokeStyle = 'rgba(140,190,255,0.34)';
    x.lineWidth = 4;
    x.strokeRect(40, 40, S - 80, S - 80);

    x.fillStyle = '#8FBBFF';
    x.font = '700 210px Poppins, Helvetica, Arial, sans-serif';
    x.textBaseline = 'top';
    x.fillText(pad(index + 1), 78, 84);

    x.fillStyle = 'rgba(69,199,255,0.95)';
    x.fillRect(80, 330, 150, 8);

    x.fillStyle = '#FFFFFF';
    x.font = '600 104px Poppins, Helvetica, Arial, sans-serif';
    const words = title.split(' ');
    const lines: string[] = [];
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (x.measureText(test).width > S - 160 && line) {
        lines.push(line);
        line = w;
      } else line = test;
    }
    lines.push(line);
    lines.forEach((l, i) => x.fillText(l, 80, 400 + i * 118));

    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    disposables.push(t);
    return t;
  }

  function glowTexture() {
    const S = 128;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const x = c.getContext('2d')!;
    const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(140,225,255,0.55)');
    g.addColorStop(1, 'rgba(140,225,255,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, S, S);
    const t = new THREE.CanvasTexture(c);
    disposables.push(t);
    return t;
  }

  function numTexture(n: number) {
    const S = 128;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const x = c.getContext('2d')!;
    x.fillStyle = '#8FE4FF';
    x.font = '700 88px Poppins, Helvetica, Arial, sans-serif';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText(String(n), S / 2, S / 2 + 4);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    disposables.push(t);
    return t;
  }

  const GLOW_TEX = glowTexture();
  const NUM_TEX = [numTexture(1), numTexture(2), numTexture(3), numTexture(4)];

  /* ---- blocks ---- */
  const SZ = 1.62;
  const GAP = 1.78;
  const boxGeo = new THREE.BoxGeometry(SZ, SZ, SZ);
  const edgeGeo = new THREE.EdgesGeometry(boxGeo);
  const faceGeo = new THREE.PlaneGeometry(SZ * 0.94, SZ * 0.94);
  const dotGeo = new THREE.OctahedronGeometry(0.095, 0);
  const ringGeo = new THREE.TorusGeometry(0.175, 0.014, 8, 44);
  const pingGeo = new THREE.TorusGeometry(0.26, 0.007, 8, 44);
  const pulseGeo = new THREE.SphereGeometry(0.052, 12, 12);
  disposables.push(boxGeo, edgeGeo, faceGeo, dotGeo, ringGeo, pingGeo, pulseGeo);

  const LAY: [number, number, number][] = [
    [-0.42, 0.42, -0.44],
    [0.4, 0.16, -0.15],
    [-0.4, -0.16, 0.15],
    [0.42, -0.42, 0.44],
  ];

  const blocks: Block[] = [];

  solutions.forEach((sol, i) => {
    const grp = new THREE.Group();

    const shell = new THREE.MeshStandardMaterial({
      color: 0x0d1730,
      metalness: 0.45,
      roughness: 0.38,
      emissive: 0x0a2b6b,
      emissiveIntensity: 0.55,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const shellMesh = new THREE.Mesh(boxGeo, shell);
    shellMesh.renderOrder = 1;
    grp.add(shellMesh);

    const edge = new THREE.LineBasicMaterial({ color: SOFT, transparent: true, opacity: 0.5 });
    grp.add(new THREE.LineSegments(edgeGeo, edge));

    const face = new THREE.MeshBasicMaterial({
      map: faceTexture(i, sol.short || sol.title),
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const faceMesh = new THREE.Mesh(faceGeo, face);
    faceMesh.renderOrder = 2;
    faceMesh.position.z = SZ / 2 + 0.012;
    grp.add(faceMesh);
    disposables.push(shell, edge, face);

    /* the process flow that lives inside the block */
    const flow = new THREE.Group();
    const nodes: FlowNode[] = [];
    const pts: InstanceType<T['Vector3']>[] = [];

    for (let k = 0; k < 4; k++) {
      const nodeG = new THREE.Group();
      nodeG.position.set(LAY[k][0], LAY[k][1], LAY[k][2]);

      const dotMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0 });
      const ringMat = new THREE.MeshBasicMaterial({ color: SOFT, transparent: true, opacity: 0 });
      const pingMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0 });
      const glowMat = new THREE.SpriteMaterial({
        map: GLOW_TEX,
        color: 0x8fe4ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        fog: false,
      });
      const numMat = new THREE.SpriteMaterial({ map: NUM_TEX[k], transparent: true, opacity: 0, depthWrite: false, fog: false });
      disposables.push(dotMat, ringMat, pingMat, glowMat, numMat);

      const dot = new THREE.Mesh(dotGeo, dotMat);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      const ping = new THREE.Mesh(pingGeo, pingMat);
      const glow = new THREE.Sprite(glowMat);
      glow.scale.set(0.78, 0.78, 1);
      const num = new THREE.Sprite(numMat);
      num.scale.set(0.24, 0.24, 1);
      num.position.set(0.33, 0.26, 0);

      glow.renderOrder = 3;
      ring.renderOrder = 5;
      ping.renderOrder = 5;
      dot.renderOrder = 6;
      num.renderOrder = 7;

      nodeG.add(glow, ping, ring, dot, num);
      nodeG.scale.setScalar(0.001);
      flow.add(nodeG);
      nodes.push({ group: nodeG, dot, ring, ping, glow, num });
      pts.push(new THREE.Vector3(LAY[k][0], LAY[k][1], LAY[k][2]));
    }

    const lineMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0 });
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, 96, 0.021, 10, false);
    const tube = new THREE.Mesh(tubeGeo, lineMat);
    tube.renderOrder = 4;
    flow.add(tube);
    disposables.push(lineMat, tubeGeo);

    const pulses: InstanceType<T['Mesh']>[] = [];
    for (let q = 0; q < 3; q++) {
      const pm = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        fog: false,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(pulseGeo, pm);
      mesh.renderOrder = 6;
      flow.add(mesh);
      pulses.push(mesh);
      disposables.push(pm);
    }

    flow.visible = false;
    grp.add(flow);

    const col = i % 3;
    const row = Math.floor(i / 3);
    const home = new THREE.Vector3((col - 1) * GAP, (1 - row) * GAP, 0);
    const ang = (i / solutions.length) * Math.PI * 2 + 0.4;
    const ringPos = new THREE.Vector3(Math.cos(ang) * 7.0, Math.sin(ang) * 3.6, -7.0 - (i % 3) * 1.7);

    grp.position.copy(home);
    core.add(grp);

    blocks.push({
      group: grp,
      home,
      ringPos,
      ringRot: new THREE.Euler(Math.sin(i * 1.7) * 0.5, Math.cos(i * 2.1) * 0.7, Math.sin(i) * 0.3),
      shell,
      edge,
      face,
      flow,
      nodes,
      lineMat,
      curve,
      tube,
      tubeCount: tubeGeo.index!.count,
      pulses,
    });
  });

  const cageGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(GAP * 3 + 0.3, GAP * 3 + 0.3, SZ + 0.3));
  const cageMat = new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.25 });
  const cage = new THREE.LineSegments(cageGeo, cageMat);
  core.add(cage);
  disposables.push(cageGeo, cageMat);

  /* ---- choreography ---- */
  const FOCUS_W = new THREE.Vector3(-2.95, 0.15, 4.2);
  const FOCUS_N = new THREE.Vector3(0, 2.2, 5.5);
  const RING_SCALE = 0.62;
  const tmp = new THREE.Vector3();

  let spin = 0;
  let clockT = 0;
  let pointerX = 0;
  let pointerY = 0;
  let camX = 0;
  let camY = 0;
  let lastActive = -2;
  let lastStep = -1;

  function progress() {
    const box = els.scroll.getBoundingClientRect();
    const span = els.scroll.offsetHeight - els.stage.offsetHeight;
    if (span <= 0) return 0;
    return clamp(-box.top / span, 0, 1);
  }

  function step(dt: number) {
    clockT += dt;
    const k = 1 - Math.exp(-9 * dt);
    const c = progress() * CHAPTERS;
    const idx = Math.floor(c);
    const t = c - idx;

    const active = idx >= 1 && idx <= LAST ? idx - 1 : -1;
    const focusAmt = active >= 0 ? smooth(0.05, 0.32, t) * (1 - smooth(0.84, 0.99, t)) : 0;
    const assemble = Math.max(1 - smooth(0.5, 1.05, c), smooth(LAST + 0.85, LAST + 1.25, c));

    const isNarrow = narrow();
    const focusPos = isNarrow ? FOCUS_N : FOCUS_W;
    const focusScale = isNarrow ? 1.5 : 1.85;

    const flowProg = clamp((t - 0.26) / 0.56, 0, 1);
    const stepIdx = clamp(Math.floor(flowProg * 4), 0, 3);

    const introW = 1 - smooth(0.2, 0.9, c);
    const outroW = smooth(LAST + 0.95, LAST + 1.3, c);

    spin += dt * 0.28 * introW;
    spin *= 1 - (1 - introW) * dt * 3;
    core.rotation.y = spin + Math.sin(clockT * 0.15) * 0.05;
    core.rotation.x = 0.1 * introW + Math.sin(clockT * 0.11) * 0.03;

    const side = window.innerWidth >= 1100;
    let coreX = 0;
    let coreY = 0;
    let coreS = 1;
    if (introW > 0) {
      if (side) {
        coreX = 2.75 * introW;
        coreY = -0.15 * introW;
        coreS = 1 - 0.06 * introW;
      } else {
        coreY = -2.05 * introW;
        coreS = 1 - 0.22 * introW;
      }
    }
    if (outroW > 0) {
      coreX = coreX * (1 - outroW);
      coreY = coreY * (1 - outroW) + -2.15 * outroW;
      coreS = coreS * (1 - outroW) + 0.8 * outroW;
    }
    core.position.x += (coreX - core.position.x) * k;
    core.position.y += (coreY - core.position.y) * k;
    core.scale.x += (coreS - core.scale.x) * k;
    core.scale.y = core.scale.z = core.scale.x;

    heart.rotation.y += dt * 0.35;
    heart.rotation.x += dt * 0.18;
    heartMat.opacity += ((1 - assemble) * 0.11 - heartMat.opacity) * k;
    cageMat.opacity += (assemble * 0.18 - cageMat.opacity) * k;

    blocks.forEach((b, i) => {
      const on = i === active;
      tmp.copy(b.ringPos).lerp(b.home, assemble);
      let rx = b.ringRot.x * (1 - assemble);
      let ry = b.ringRot.y * (1 - assemble);
      let rz = b.ringRot.z * (1 - assemble);
      let sc = RING_SCALE + (1 - RING_SCALE) * assemble;

      if (on && focusAmt > 0) {
        tmp.lerp(focusPos, focusAmt);
        rx += (-0.17 - rx) * focusAmt;
        ry += (0.6 - ry) * focusAmt;
        rz += (0.03 - rz) * focusAmt;
        sc += (focusScale - sc) * focusAmt;
      }

      b.group.position.lerp(tmp, k);
      b.group.rotation.x += (rx - b.group.rotation.x) * k;
      b.group.rotation.y += (ry - b.group.rotation.y) * k;
      b.group.rotation.z += (rz - b.group.rotation.z) * k;
      b.group.scale.x += (sc - b.group.scale.x) * k;
      b.group.scale.y = b.group.scale.z = b.group.scale.x;

      const dim = active >= 0 ? focusAmt : 0;
      const shellT = on ? 0.95 + (0.3 - 0.95) * focusAmt : 0.95 + (0.3 - 0.95) * dim;
      const edgeT = on ? 0.5 + (1 - 0.5) * focusAmt : 0.5 + (0.13 - 0.5) * dim;
      const faceT = on ? 0.95 * (1 - smooth(0.14, 0.52, focusAmt)) : 0.95 + (0.16 - 0.95) * dim;
      const emisT = on ? 0.55 + (1.3 - 0.55) * focusAmt : 0.55 + (0.12 - 0.55) * dim;

      b.shell.opacity += (shellT - b.shell.opacity) * k;
      b.edge.opacity += (edgeT - b.edge.opacity) * k;
      b.face.opacity += (faceT - b.face.opacity) * k;
      b.shell.emissiveIntensity += (emisT - b.shell.emissiveIntensity) * k;

      const showFlow = on && focusAmt > 0.12;
      b.flow.visible = showFlow;

      if (showFlow) {
        b.lineMat.opacity += (smooth(0.2, 0.5, focusAmt) * 0.8 - b.lineMat.opacity) * k;

        /* the pipe draws itself as the steps complete */
        const fillAmt = clamp(0.18 + flowProg * 0.86, 0.06, 1);
        b.tube.geometry.setDrawRange(0, Math.max(60, Math.floor(b.tubeCount * fillAmt)));

        /* packets running along the pipe */
        b.pulses.forEach((p, q) => {
          const uu = ((clockT * 0.3 + q * 0.34) % 1) * fillAmt;
          p.position.copy(b.curve.getPointAt(clamp(uu, 0.001, 0.999)));
          (p.material as InstanceType<T['MeshBasicMaterial']>).opacity =
            focusAmt * 0.85 * Math.sin(Math.PI * clamp(uu / Math.max(fillAmt, 0.001), 0, 1));
        });

        const ping = (clockT * 0.85) % 1;
        b.nodes.forEach((nd, n) => {
          const appear = clamp(flowProg * 4 - n + 0.15, 0, 1);
          const live = n === stepIdx;
          const beat = live ? 1 + Math.sin(clockT * 3.4) * 0.09 : 1;
          const sizeF = (0.46 + 0.54 * appear) * (live ? 1.3 : 0.92) * beat;
          nd.group.scale.x += (Math.max(0.001, sizeF * focusAmt) - nd.group.scale.x) * k;
          nd.group.scale.y = nd.group.scale.z = nd.group.scale.x;

          const dm = nd.dot.material as InstanceType<T['MeshBasicMaterial']>;
          const rm = nd.ring.material as InstanceType<T['MeshBasicMaterial']>;
          const pm = nd.ping.material as InstanceType<T['MeshBasicMaterial']>;
          const gm = nd.glow.material as InstanceType<T['SpriteMaterial']>;
          const nm = nd.num.material as InstanceType<T['SpriteMaterial']>;

          dm.opacity += ((0.12 + 0.88 * appear) * focusAmt - dm.opacity) * k;
          rm.opacity += ((0.3 + 0.6 * appear) * focusAmt - rm.opacity) * k;
          nm.opacity += ((0.2 + 0.8 * appear) * focusAmt - nm.opacity) * k;
          gm.opacity += ((live ? 0.55 : 0.1 * appear) * focusAmt - gm.opacity) * k;

          if (live) {
            nd.ping.scale.setScalar(1 + ping * 0.85);
            pm.opacity = (1 - ping) * 0.7 * focusAmt;
          } else {
            pm.opacity += (0 - pm.opacity) * k;
          }

          nd.dot.rotation.y += dt * (live ? 1.6 : 0.5);
          nd.dot.rotation.x += dt * (live ? 0.9 : 0.3);
          nd.group.lookAt(camera.position);
        });
      } else {
        b.lineMat.opacity += (0 - b.lineMat.opacity) * k;
      }
    });

    /* overlays */
    const introO = 1 - smooth(0.12, 0.66, c);
    els.intro.style.opacity = String(introO);
    els.intro.style.transform = `translateY(${-(1 - introO) * 40}px)`;

    const pOn = clamp((focusAmt - 0.14) / 0.34, 0, 1);
    els.panel.style.opacity = String(pOn);
    els.panel.style.transform = narrow()
      ? `translateX(-50%) translateY(${(1 - pOn) * 26}px)`
      : `translateY(-50%) translateX(${(1 - pOn) * 34}px)`;
    els.panel.style.pointerEvents = pOn > 0.6 ? 'auto' : 'none';

    els.rail.style.opacity = c > 0.75 && c < LAST + 1 ? '1' : '0';
    const outroOn = c > LAST + 1.02;
    els.outro.style.opacity = outroOn ? '1' : '0';
    els.outro.style.pointerEvents = outroOn ? 'auto' : 'none';

    if (active !== lastActive || stepIdx !== lastStep) {
      lastActive = active;
      lastStep = stepIdx;
      onChapter(active, stepIdx);
    }

    camX += (pointerX * 0.9 - camX) * (1 - Math.exp(-3 * dt));
    camY += (pointerY * 0.55 - camY) * (1 - Math.exp(-3 * dt));
    camera.position.x = camX;
    camera.position.y = camY;
    camera.lookAt(0, 0, 0);
    rim.position.set(camX * 0.5, camY * 0.5, 3);
  }

  /* ---- loop, resize, visibility ---- */
  function resize() {
    const w = els.stage.clientWidth;
    const h = els.stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = narrow() ? 52 : 42;
    camera.position.z = narrow() ? 15 : 13.5;
    camera.updateProjectionMatrix();
  }
  resize();

  let running = true;
  let raf = 0;
  let last = performance.now();

  const onResize = () => resize();
  const onPointer = (e: PointerEvent) => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    pointerY = -(e.clientY / window.innerHeight - 0.5) * 2;
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

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!running) return;
    step(dt);
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointer);
    io?.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */
export default function SolutionCore({
  solutions = DEFAULT_SOLUTIONS,
  eyebrow = 'Kinsfolk Solutions',
  headingTop = 'One core.',
  headingAccent = 'Nine ways we run it.',
  intro = 'Every engagement we deliver sits on the same operating core. Scroll to break it open and see what runs inside each block.',
  outroHeading = 'Nine practices.\nOne team running them.',
  outroBody = 'The blocks are not separate products. They share the same core, the same data and the same automation layer, which is why the whole estate moves together.',
  stats = DEFAULT_STATS,
  ctaLabel = 'Talk to our team',
  ctaHref = '#contact',
  brandColor,
  chapterHeightVh = 115,
  className,
  id,
}: SolutionCoreProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const outroRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<'pending' | 'webgl' | 'fallback'>('pending');
  const [active, setActive] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const chapters = solutions.length + 2;

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !hasWebGL()) {
      setMode('fallback');
      return;
    }

    let disposed = false;
    let teardown: (() => void) | null = null;

    (async () => {
      /* wait for webfonts so the labels drawn onto the blocks use Poppins */
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
        intro: introRef.current,
        panel: panelRef.current,
        rail: railRef.current,
        outro: outroRef.current,
      };
      if (Object.values(els).some((e) => !e)) return;

      teardown = createScene(THREE, els as SceneEls, solutions, (a, s) => {
        if (a >= 0) setActive(a);
        setStepIdx(s);
      });
      setMode('webgl');
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [solutions]);

  const goToChapter = useCallback((n: number) => {
    const sc = scrollRef.current;
    const st = stageRef.current;
    if (!sc || !st) return;
    const top = sc.getBoundingClientRect().top + window.pageYOffset;
    const span = sc.offsetHeight - st.offsetHeight;
    window.scrollTo({ top: top + span * ((n + 1.5) / chapters), behavior: 'smooth' });
  }, [chapters]);

  const current = solutions[Math.min(active, solutions.length - 1)];

  const rootStyle = useMemo(
    () =>
      ({
        '--kf-chapters': chapters,
        '--kf-ch': `${chapterHeightVh}vh`,
        ...(brandColor ? { '--kf-blue': brandColor } : null),
      }) as React.CSSProperties,
    [chapters, chapterHeightVh, brandColor]
  );

  return (
    <section
      id={id}
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={rootStyle}
    >
      {mode !== 'fallback' && (
        <div className={styles.scroll} ref={scrollRef}>
          <div className={styles.stage} ref={stageRef}>
            <canvas className={styles.canvas} ref={canvasRef} />
            <div className={styles.grid} />
            <div className={styles.vignette} />

            <div className={styles.intro} ref={introRef}>
              <div className={styles.eyebrow}>{eyebrow}</div>
              <h2>
                {headingTop}
                <br />
                <span className={styles.accent}>{headingAccent}</span>
              </h2>
              <p>{intro}</p>
              <div className={styles.hint}>
                <div className={styles.mouse} />
                <div>Scroll</div>
              </div>
            </div>

            <nav className={styles.rail} ref={railRef} aria-label="Solution chapters">
              {solutions.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={s.title}
                  className={i === active ? styles.railOn : undefined}
                  onClick={() => goToChapter(i)}
                >
                  <i />
                  <span>{pad(i + 1)}</span>
                </button>
              ))}
            </nav>

            <aside className={styles.panel} ref={panelRef} aria-live="polite">
              <div className={styles.panelNum}>
                <span>{pad(active + 1)}</span>
                <span className={styles.panelOf}>/ {pad(solutions.length)}</span>
              </div>
              <h3>{current?.title}</h3>
              <p className={styles.panelSub}>{current?.sub}</p>
              <p className={styles.panelDesc}>{current?.desc}</p>
              <div className={styles.flowLabel}>How it runs</div>
              <ol className={styles.steps}>
                {current?.steps.slice(0, 4).map((s, i) => (
                  <li
                    key={s}
                    className={[
                      styles.step,
                      i === stepIdx ? styles.stepActive : '',
                      i < stepIdx ? styles.stepDone : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span className={styles.stepDot}>{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </aside>

            <div className={styles.outro} ref={outroRef}>
              <h3>
                {outroHeading.split('\n').map((l, i) => (
                  <span key={l}>
                    {i > 0 && <br />}
                    {l}
                  </span>
                ))}
              </h3>
              <p>{outroBody}</p>
              {stats.length > 0 && (
                <div className={styles.stats}>
                  {stats.map((s) => (
                    <div key={s.label}>
                      <b>{s.value}</b>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {ctaHref && (
                <a className={styles.cta} href={ctaHref}>
                  {ctaLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {mode === 'fallback' && (
        <div className={styles.fallback}>
          <h2>{`${headingTop} ${headingAccent}`}</h2>
          <p>{intro}</p>
          <div className={styles.cards}>
            {solutions.map((s, i) => (
              <div className={styles.card} key={s.title}>
                <b>{pad(i + 1)}</b>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <ol>
                  {s.steps.slice(0, 4).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
