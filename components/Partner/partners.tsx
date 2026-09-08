"use client";

import { useEffect, useState } from "react";
import "./Partners.css";

type Logo = {
  name: string;
  image: string;
};

const logos: Logo[] = [
  {
    name: "BMC Helix",
    image: "/images/parthners/Bmc-helix.webp",
  },
  {
    name: "Motadata",
    image: "/images/parthners/motadata.webp",
  },
  {
    name: "BMC",
    image: "/images/parthners/bmc.webp",
  },
  {
    name: "HCL",
    image: "/images/parthners/hcl.webp",
  },
  {
    name: "Dynatrace",
    image: "/images/parthners/dynatrace.webp",
  },
  {
    name: "VuNet",
    image: "/images/parthners/vunet.webp",
  },
  {
    name: "Entuity",
    image: "/images/parthners/entuity.webp",
  },
  {
    name: "Trend",
    image: "/images/parthners/trend.webp",
  },
  {
    name: "Silverfort",
    image: "/images/parthners/silverfort.webp",
  },
  {
    name: "Automation Edge",
    image: "/images/parthners/automation.webp",
  },
  {
    name: "Moveworks",
    image: "/images/parthners/moveworks.webp",
  },
  {
    name: "Cisco",
    image: "/images/parthners/cisco.webp",
  },
  {
    name: "IBM",
    image: "/images/parthners/ibm.webp",
  },
  {
    name: "Flexera",
    image: "/images/parthners/flexera.webp",
  },
];

const logosPerSlide = 4;

const slides: Logo[][] = [];

for (let i = 0; i < logos.length; i += logosPerSlide) {
  const slide: Logo[] = [];

  for (let j = 0; j < logosPerSlide; j++) {
    slide.push(logos[(i + j) % logos.length]);
  }

  slides.push(slide);
}

export default function Partners() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="partners-section">

      <div className="partners-container">

        <div className="partners-eyebrow">
          OUR PARTNERS
        </div>

        <h2 className="partners-title">
          Bringing together the best of our partner network
          <span> to create competitive advantage for your business.
</span>
        </h2>

        <p className="partners-description">
          We partner with leading technology platforms and
          innovators to deliver secure, scalable and
          future-ready solutions for enterprises.
        </p>

        <div className="partners-slider">

          <button
            type="button"
            className="partners-arrow partners-prev"
            onClick={previousSlide}
            aria-label="Previous partners"
          >
            ←
          </button>

          <div className="partners-logo-grid">

            {slides[currentSlide].map((logo) => (
              <div
                className="partners-logo"
                key={`${currentSlide}-${logo.name}`}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  loading="eager"
                />
              </div>
            ))}

          </div>

          <button
            type="button"
            className="partners-arrow partners-next"
            onClick={nextSlide}
            aria-label="Next partners"
          >
            →
          </button>

        </div>

        <div className="partners-dots">

          {slides.map((_slide, index) => (
            <button
              type="button"
              key={index}
              className={`partners-dot ${
                currentSlide === index ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to partner slide ${index + 1}`}
            />
          ))}

        </div>

        <p className="partners-disclaimer">
          Partner logos are property of their respective owners.
        </p>

      </div>

    </section>
  );
}