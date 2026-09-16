"use client";

import { useEffect, useState } from "react";
import "./about.css";

const heroImages = [
  "/images/about/about-hero-1.jpg",
  "/images/about/about-hero-2.webp",
];

export default function AboutUsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <main className="aboutPage">

      {/* =====================================================
          ABOUT HERO — IMAGE SLIDER
      ====================================================== */}

      <section className="aboutHero">

        {/* Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`aboutHeroBackground ${
              index === currentSlide ? "active" : ""
            }`}
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        ))}

        {/* Hero Overlay */}
        <div className="aboutHeroOverlay" />

        {/* Hero Content */}
        <div className="aboutHeroContent">

          <div className="aboutEyebrow">
            ABOUT KINSFOLK
          </div>

          <h1>
            Exceptional people
            <br />
            have options.
          </h1>

          <p>
            We bring together exceptional people, technology,
            and ideas to create meaningful outcomes for our clients.
          </p>

        </div>

        {/* Previous */}
        <button
          type="button"
          className="aboutHeroArrow aboutHeroArrowLeft"
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          &#8592;
        </button>

        {/* Next */}
        <button
          type="button"
          className="aboutHeroArrow aboutHeroArrowRight"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#8594;
        </button>

        {/* Dots */}
        <div className="aboutHeroDots">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`aboutHeroDot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </section>
      
 <section className="about-intro">
        <div className="about-container">

          {/* LEFT CONTENT */}
          <div className="about-content">

            <div className="about-eyebrow">
              <span></span>
              <p>WHO WE ARE</p>
            </div>

            <h1>
              A workplace
              <br />
              built around <em>you</em>
            </h1>

            <p className="about-description">
              Our engineers work with the largest financial institutions
              in the country, on platforms most people only read about.
              Consultants two years in are in rooms with CIOs. And because
              roughly half our clients stay with us for years, you see the
              consequences of your own decisions — which is the only way
              anyone actually learns.
            </p>

            <div className="about-actions">
              <a href="#" className="about-primary-btn">
                Our Story
                <span>→</span>
              </a>

              <a href="#" className="about-secondary-link">
                Join Our Team
                <span></span>
              </a>
            </div>

            <div className="about-stats">

              <div className="about-stat">
                <strong>6+</strong>
                <span>Global Offices</span>
              </div>

              <div className="about-stat">
                <strong>500+</strong>
                <span>Talented People</span>
              </div>

              <div className="about-stat">
                <strong>50%</strong>
                <span>Client Retention</span>
              </div>

            </div>

          </div>


          {/* RIGHT IMAGE COLLAGE */}
          {/* =================================================
              public-images-about
              Replace these image paths with your images
          ================================================== */}

          <div className="about-visual">

            <div className="about-circle-bg about-circle-bg-one"></div>
            <div className="about-circle-bg about-circle-bg-two"></div>

            <div className="about-image-collage">

              {/* TOP */}
              <div className="about-image about-image-top">
                {/* public-images-about */}
                <img
                  src="/images/about/about-hero-1.jpg"
                  alt="Kinsfolk team"
                />
              </div>

              {/* TOP RIGHT */}
              <div className="about-image about-image-top-right">
                {/* public-images-about */}
                <img
                  src="/images/about/about-hero-2.webp"
                  alt="Kinsfolk workplace"
                />
              </div>

              {/* LEFT */}
              <div className="about-image about-image-left">
                {/* public-images-about */}
                <img
                  src="/images/about/image-2.jpg"
                  alt="Kinsfolk team collaboration"
                />
              </div>

              {/* CENTER */}
              <div className="about-image about-image-center">
                {/* public-images-about */}
                <img
                  src="/images/about/image-1.jpg"
                  alt="Kinsfolk employee"
                />
              </div>

              {/* RIGHT */}
              <div className="about-image about-image-right">
                {/* public-images-about */}
                <img
                  src="/images/about/image-3.jpgeg"
                  alt="Kinsfolk office"
                />
              </div>

              {/* BOTTOM LEFT */}
              <div className="about-image about-image-bottom-left">
                {/* public-images-about */}
                <img
                  src="/images/about/image-4.jpg"
                  alt="Kinsfolk team"
                />
              </div>

              {/* BOTTOM RIGHT */}
              <div className="about-image about-image-bottom-right">
                {/* public-images-about */}
                <img
                  src="/images/about/image-5.jpeg"
                  alt="Kinsfolk workplace"
                />
              </div>

            </div>


            {/* DECORATIVE DOTS */}
            <div className="about-dots">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>


            {/* HAND WRITTEN STYLE TEXT */}
            <div className="about-floating-text">
              People
              <br />
              Ideas
              <br />
              Impact
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}