"use client";

import "./TestingHero.css";

import {
  ArrowRight,
  ArrowDown,
  Sparkles,
  Users,
  ShieldCheck,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import HeroScene from "./HeroScene";

export default function TestingHero() {
  return (
    <section className="testingHero">
      {/* =========================
          BACKGROUND
      ========================== */}
      <div className="heroBgGlow heroBgGlowBlue" />
      <div className="heroBgGlow heroBgGlowOrange" />
      <div className="heroGridDots" />

      {/* =========================
          MAIN CONTAINER
      ========================== */}
      <div className="testingHeroContainer">
        
        {/* =========================
            LEFT CONTENT
        ========================== */}
        <div className="testingHeroContent">
          
          {/* Eyebrow */}
          <div className="testingHeroEyebrow">
            <Sparkles size={15} />
            <span>AI-DRIVEN INNOVATION</span>
          </div>

          {/* Heading */}
          <h1>
            Intelligent solutions
            <br />
            for a smarter
            <br />
            <span>tomorrow.</span>
          </h1>

          {/* Description */}
          <p className="testingHeroDescription">
            We help enterprises unlock the power of AI, cloud,
            <br className="desktopBreak" />
            and data to automate, optimize, and accelerate
            <br className="desktopBreak" />
            business growth.
          </p>

          {/* Buttons */}
          <div className="testingHeroButtons">
            <a
              href="#solutions"
              className="testingHeroPrimaryBtn"
            >
              <span>Explore Solutions</span>
              <ArrowRight size={20} />
            </a>

            <a
              href="#services"
              className="testingHeroSecondaryBtn"
            >
              <span>Our Services</span>
              <ArrowRight size={20} />
            </a>
          </div>

          {/* =========================
              STATS
          ========================== */}
          <div className="testingHeroStats">

            {/* Stat 1 */}
            <div className="heroStat">
              <div className="statIcon">
                <Users size={23} />
              </div>

              <div className="statText">
                <strong>500+</strong>
                <span>Happy Clients</span>
              </div>
            </div>

            <div className="statDivider" />

            {/* Stat 2 */}
            <div className="heroStat">
              <div className="statIcon">
                <ShieldCheck size={23} />
              </div>

              <div className="statText">
                <strong>99.9%</strong>
                <span>Reliability</span>
              </div>
            </div>

            <div className="statDivider" />

            {/* Stat 3 */}
            <div className="heroStat">
              <div className="statIcon">
                <ChartNoAxesColumnIncreasing size={23} />
              </div>

              <div className="statText">
                <strong>10+</strong>
                <span>Years of Impact</span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================
            RIGHT SIDE 3D SCENE

            HeroScene मध्ये:
            - Main glass/blob object
            - Blue spheres
            - Orange spheres
            - Glass cube
            - Blue orbit ring
            - Orange orbit ring
            - Glow particles
        ========================== */}
        <div className="testingHeroVisual">
          <HeroScene />
        </div>

      </div>

      {/* =========================
          BOTTOM SCROLL INDICATOR
      ========================== */}
      <div className="testingHeroScroll">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={18} />
      </div>

    </section>
  );
}