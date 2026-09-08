"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function FlowingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= 160; i++) {
      const t = (i / 160) * Math.PI * 2;

      const x = Math.sin(t) * 2.35;
      const y = Math.sin(t * 2) * 0.95;
      const z = Math.cos(t) * 0.45;

      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal",
      0.5
    );

    return new THREE.TubeGeometry(
      curve,
      220,
      0.48,
      32,
      true
    );
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    meshRef.current.rotation.y =
      Math.sin(time * 0.35) * 0.12;

    meshRef.current.rotation.x =
      Math.sin(time * 0.28) * 0.06;

    meshRef.current.position.y =
      Math.sin(time * 0.6) * 0.08;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[0.35, -0.35, -0.15]}
      scale={1.05}
    >
      <meshPhysicalMaterial
        color="#238bd0"
        metalness={0.35}
        roughness={0.16}
        transmission={0.18}
        thickness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.08}
        iridescence={0.8}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[100, 450]}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={4}
      />

      <directionalLight
        position={[-4, -2, 3]}
        intensity={2.5}
        color="#55cfff"
      />

      <pointLight
        position={[2, 1, 4]}
        intensity={3}
        color="#ff72d2"
      />

      <FlowingShape />

      <Environment preset="studio" />
    </>
  );
}

export default function IndustryHero3D() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 42,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <Scene />
    </Canvas>
  );
}