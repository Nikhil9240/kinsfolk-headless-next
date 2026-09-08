"use client";

import { useEffect, useRef } from "react";
import "./TestingHero.css";

export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = scene.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      scene.style.setProperty("--mouseX", `${x * 16}px`);
      scene.style.setProperty("--mouseY", `${y * 16}px`);
    };

    const handleMouseLeave = () => {
      scene.style.setProperty("--mouseX", "0px");
      scene.style.setProperty("--mouseY", "0px");
    };

    scene.addEventListener("mousemove", handleMouseMove);
    scene.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scene.removeEventListener("mousemove", handleMouseMove);
      scene.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="heroScene" ref={sceneRef}>
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="sceneGlow sceneBlueGlow" />
      <div className="sceneGlow sceneOrangeGlow" />

      {/* =====================================
          MAIN AI CORE + ORBIT SYSTEM
      ====================================== */}
      <div className="aiCore">
        {/* MAIN GLASS BLOB */}
        <div className="mainGlassBlob">
          <div className="blobInnerGlow" />

          <div className="blobHighlight blobHighlightOne" />
          <div className="blobHighlight blobHighlightTwo" />
          <div className="blobHighlight blobHighlightThree" />

          {/* K LOGO */}
          <div className="blobLogo">
            <span className="kLeft" />
            <span className="kTop" />
            <span className="kBottom" />
          </div>
        </div>

        {/* BLUE ORBIT */}
        <div className="orbit orbitBlue">
          <span className="orbitParticle orbitBlueParticleOne" />
          <span className="orbitParticle orbitBlueParticleTwo" />
        </div>

        {/* ORANGE ORBIT */}
        <div className="orbit orbitOrange">
          <span className="orbitParticle orbitOrangeParticleOne" />
          <span className="orbitParticle orbitOrangeParticleTwo" />
        </div>
      </div>

      {/* =====================================
          3D GLASS / AI DATA CUBE
      ====================================== */}
      <div className="cubeWrapper">
        <div className="glassCube">
          <div className="cubeFace cubeFront" />
          <div className="cubeFace cubeBack" />
          <div className="cubeFace cubeRight" />
          <div className="cubeFace cubeLeft" />
          <div className="cubeFace cubeTop" />
          <div className="cubeFace cubeBottom" />
        </div>
      </div>

      {/* =====================================
          FLOATING SPHERES
      ====================================== */}

      {/* TOP BLUE */}
      <div className="floatingSphere sphereBlueTop">
        <span />
      </div>

      {/* BOTTOM LEFT BLUE */}
      <div className="floatingSphere sphereBlueBottom">
        <span />
      </div>

      {/* SMALL ORANGE */}
      <div className="floatingSphere sphereOrangeLeft">
        <span />
      </div>

      {/* LARGE ORANGE */}
      <div className="floatingSphere sphereOrangeRight">
        <span />
      </div>

      {/* =====================================
          AI DATA PARTICLES
      ====================================== */}

      <div className="smallParticle particleBlue particleBlueOne" />
      <div className="smallParticle particleBlue particleBlueTwo" />

      <div className="smallParticle particleOrange particleOrangeOne" />
      <div className="smallParticle particleOrange particleOrangeTwo" />

      <span className="lightParticle lightParticleOne" />
      <span className="lightParticle lightParticleTwo" />
      <span className="lightParticle lightParticleThree" />
      <span className="lightParticle lightParticleFour" />

      {/* =====================================
          DIGITAL DOT GRID
      ====================================== */}
      <div className="sceneDots">
        {Array.from({ length: 30 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}