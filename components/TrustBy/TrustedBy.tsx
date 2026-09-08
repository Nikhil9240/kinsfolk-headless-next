"use client";

import { useEffect, useState } from "react";
import "./TrustedBy.css";

type Logo = {
  name: string;
  image: string;
};

const logos: Logo[] = [
  {
    name: "Aditya Birla Capital",
    image: "/images/client/Aditya-Birla.webp",
  },
  {
    name: "Apar",
    image: "/images/client/Apar.webp",
  },
  {
    name: "Axis Bank",
    image: "/images/client/axis-bank.webp",
  },
  {
    name: "Bandhan Bank",
    image: "/images/client/Bandhan-Bank.webp",
  },
  {
    name: "Bank of India",
    image: "/images/client/bank-of-india.webp",
  },
  {
    name: "Entuity",
    image: "/images/client/Enquity.webp",
  },
  {
    name: "Future Generali",
    image: "/images/client/future.webp",
  },
  {
    name: "ICICI Bank",
    image: "/images/client/Icici-bank.webp",
  },
  {
    name: "ICICI Lombard",
    image: "/images/client/Icici-Lombard.webp",
  },
  {
    name: "ICICI Prudential",
    image: "/images/client/Icici-P.webp",
  },
  {
    name: "Indian Overseas Bank",
    image: "/images/client/indian-overseas-bank.webp",
  },
  {
    name: "J&K Bank",
    image: "/images/client/JK-Bank.webp",
  },
  {
    name: "Magnoos",
    image: "/images/client/magnoos.webp",
  },
  {
    name: "Mphasis",
    image: "/images/client/mphisis.png",
  },
  {
    name: "Persistent",
    image: "/images/client/Persistant.webp",
  },
  {
    name: "SBI Life",
    image: "/images/client/Sbi-Life.webp",
  },
  {
    name: "State Bank of India",
    image: "/images/client/SBI.webp",
  },
  {
    name: "UCO Bank",
    image: "/images/client/uco-bank.webp",
  },
  {
    name: "Union Bank of India",
    image: "/images/client/union-bank.webp",
  },
  {
    name: "Volkswagen",
    image: "/images/client/volkswagaon.webp",
  },
];

const logosPerSlide = 4;


/* =========================================================
   CREATE SLIDES
========================================================= */

const slides: Logo[][] = [];

for (let i = 0; i < logos.length; i += logosPerSlide) {
  slides.push(
    logos.slice(i, i + logosPerSlide)
  );
}


/* =========================================================
   COMPONENT
========================================================= */

export default function TrustedBy() {

  const [currentSlide, setCurrentSlide] =
    useState<number>(0);


  /* =======================================================
     AUTO SLIDER
  ======================================================= */

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );

    }, 3000);


    return () =>
      clearInterval(interval);

  }, []);


  /* =======================================================
     NEXT
  ======================================================= */

  const nextSlide = () => {

    setCurrentSlide((prev) =>
      prev === slides.length - 1
        ? 0
        : prev + 1
    );

  };


  /* =======================================================
     PREVIOUS
  ======================================================= */

  const previousSlide = () => {

    setCurrentSlide((prev) =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    );

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section className="trusted-section">

      <div className="trusted-container">


        {/* =================================================
            EYEBROW
        ================================================= */}

        <div className="trusted-eyebrow">
          TRUSTED BY
        </div>


        {/* =================================================
            HEADING
        ================================================= */}

        <h2 className="trusted-title">

          Trusted by India’s leading banks,
          insurers and enterprises

        </h2>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p className="trusted-description">

          From core banking and payments to insurance,
          manufacturing and IT services  including India’s
          largest public and private sector banks.

        </p>


        {/* =================================================
            LOGO SLIDER
        ================================================= */}

        <div className="trusted-slider">


          {/* PREVIOUS */}

          <button
            type="button"
            className="trusted-arrow trusted-prev"
            onClick={previousSlide}
            aria-label="Previous logos"
          >
            ←
          </button>


          {/* =================================================
              LOGO GRID
          ================================================= */}

          <div className="trusted-logo-grid">

            {slides[currentSlide].map(
              (logo: Logo) => (

                <div
                  className="trusted-logo"
                  key={logo.name}
                >

                  <img
                    src={logo.image}
                    alt={logo.name}
                    loading="eager"
                    onError={(event) => {

                      console.error(
                        `Logo not found: ${logo.image}`
                      );

                      event.currentTarget.style.display =
                        "none";

                    }}
                  />

                </div>

              )
            )}

          </div>


          {/* =================================================
              NEXT
          ================================================= */}

          <button
            type="button"
            className="trusted-arrow trusted-next"
            onClick={nextSlide}
            aria-label="Next logos"
          >
            →
          </button>


        </div>


        {/* =================================================
            DOTS
        ================================================= */}

        <div className="trusted-dots">

          {slides.map(
            (_slide: Logo[], index: number) => (

              <button
                type="button"
                key={index}
                className={`trusted-dot ${
                  currentSlide === index
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCurrentSlide(index)
                }
                aria-label={
                  `Go to slide ${index + 1}`
                }
              />

            )
          )}

        </div>


        {/* =================================================
            DISCLAIMER
        ================================================= */}

        <p className="trusted-disclaimer">

         

        </p>


      </div>

    </section>

  );
}